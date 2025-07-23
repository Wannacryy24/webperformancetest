const express = require('express');
const lighthouse = require('lighthouse').default;
const cors = require('cors');
const { URL } = require('url');
const extractBestPracticesIssues = require('./utils/extractBestPractice');
const puppeteer = require('puppeteer');

const app = express();

app.use(cors({
  origin: ['https://webpilot.onrender.com', 'http://localhost:3001', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

app.options('*', cors());
app.use(express.json());

app.post('/audit', async (req, res) => {
  const { url } = req.body;

  if (!url || !url.startsWith('http')) {
    return res.status(400).json({ error: 'Invalid or missing URL' });
  }

  let browser;

  try {
    browser = await puppeteer.launch({
      headless: true, // ✅ always use `true` on Render
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });


    const page = await browser.newPage();
    const client = await page.createCDPSession();
    await client.send('Network.enable');

    const requests = new Map();

    client.on('Network.requestWillBeSent', ({ requestId, request, timestamp, type }) => {
      requests.set(requestId, { url: request.url, type, startTs: timestamp });
    });

    client.on('Network.responseReceived', ({ requestId, response }) => {
      const rec = requests.get(requestId);
      if (rec) {
        rec.status = response.status;
        rec.mimeType = response.mimeType;
        rec.timing = response.timing || null;
      }
    });

    client.on('Network.loadingFinished', ({ requestId, timestamp, encodedDataLength }) => {
      const rec = requests.get(requestId);
      if (rec) {
        rec.endTs = timestamp;
        rec.encodedDataLength = encodedDataLength;
        rec.failed = false;
      }
    });

    client.on('Network.loadingFailed', ({ requestId, timestamp, errorText }) => {
      const rec = requests.get(requestId);
      if (rec) {
        rec.endTs = timestamp;
        rec.errorText = errorText;
        rec.failed = true;
      }
    });

    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

    let minStart = Infinity;
    for (const r of requests.values()) {
      if (typeof r.startTs === 'number' && r.startTs < minStart) {
        minStart = r.startTs;
      }
    }
    if (!isFinite(minStart)) minStart = 0;

    const safePhase = v => (typeof v === 'number' && v >= 0 ? v : 0);

    const extractPhases = (timing) => {
      if (!timing) return { dns: 0, connect: 0, ssl: 0, ttfb: 0 };
      const dns = safePhase(timing.dnsEnd - timing.dnsStart);
      const connect = safePhase(timing.connectEnd - timing.connectStart);
      const ssl = safePhase(timing.sslEnd - timing.sslStart);
      const ttfb = safePhase(timing.receiveHeadersEnd - timing.sendEnd);
      return { dns, connect, ssl, ttfb };
    };

    const networkEvents = [];
    for (const rec of requests.values()) {
      const startMs = (rec.startTs - minStart) * 1000;
      const endMs = (rec.endTs - minStart) * 1000;
      const total = endMs - startMs;
      const { dns, connect, ssl, ttfb } = extractPhases(rec.timing);
      const download = total > 0 ? Math.max(total - (dns + connect + ssl + ttfb), 0) : 0;

      networkEvents.push({
        url: rec.url,
        status: rec.status,
        mimeType: rec.mimeType,
        startTime: startMs,
        endTime: endMs,
        dns, connect, ssl, ttfb, download, total,
        failed: !!rec.failed,
      });
    }

    const waterfallLimited = networkEvents.slice(0, 40);
    const port = new URL(browser.wsEndpoint()).port;

    const result = await lighthouse(url, {
      port,
      output: 'json',
      logLevel: 'info',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      formFactor: 'desktop',
      screenEmulation: {
        mobile: false,
        width: 1350,
        height: 940,
        deviceScaleFactor: 1,
        disabled: false,
      },
    });

    const { lhr } = result;
    const { categories, audits } = lhr;

    const finalScreenshot = audits['final-screenshot']?.details?.data;
    const diagnostics = audits['diagnostics']?.details?.items?.[0];
    const filmstrip = audits['screenshot-thumbnails']?.details?.items || [];

    const resourceSummary = audits['resource-summary']?.details?.items || [];
    const resourceSizes = {};
    let totalSizeBytes = 0;
    let totalRequestCount = 0;

    const bestPracticesIssues = extractBestPracticesIssues(audits, categories['best-practices']);

    resourceSummary.forEach(item => {
      const label = item.label;
      const bytes = item.totalBytes || 0;
      const count = item.requestCount || 0;

      totalSizeBytes += bytes;
      totalRequestCount += count;

      resourceSizes[label] = {
        size: (bytes / 1024).toFixed(1) + ' KB',
        count,
      };
    });

    resourceSizes['Total'] = {
      size: (totalSizeBytes / 1024).toFixed(1) + ' KB',
      count: totalRequestCount,
    };

    const opportunities = Object.values(audits)
      .filter(a => a.details?.type === 'opportunity')
      .map(a => ({
        id: a.id,
        title: a.title,
        description: a.description,
        savingsMs: a.details.overallSavingsMs,
      }));

    const accessibilityIssues = Object.entries(audits)
      .filter(([id, audit]) =>
        audit.score !== 1 &&
        !['notApplicable', 'manual', 'informative'].includes(audit.scoreDisplayMode)
      )
      .map(([id, audit]) => ({
        id,
        title: audit.title,
        description: audit.description,
        score: audit.score,
        tip: audit.helpText,
        displayValue: audit.displayValue || null,
        nodes: audit.details?.items?.map(i => i.node).filter(Boolean) || [],
      }));

    res.json({
      scores: {
        performance: categories.performance.score * 100,
        accessibility: categories.accessibility.score * 100,
        bestPractices: categories['best-practices'].score * 100,
        seo: categories.seo.score * 100,
      },
      metrics: {
        firstContentfulPaint: audits['first-contentful-paint'].displayValue,
        largestContentfulPaint: audits['largest-contentful-paint'].displayValue,
        totalBlockingTime: audits['total-blocking-time'].displayValue,
        cumulativeLayoutShift: audits['cumulative-layout-shift'].displayValue,
        speedIndex: audits['speed-index'].displayValue,
        interactive: audits['interactive'].displayValue,
      },
      opportunities,
      diagnostics,
      screenshot: finalScreenshot,
      filmstrip,
      resourceSizes,
      waterfall: waterfallLimited,
      accessibilityIssues,
      bestPracticesIssues
    });

  } catch (error) {
    console.error('Lighthouse error:', error.message);
    res.status(500).json({ error: 'Audit failed' });
  } finally {
    if (browser) await browser.close();
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
