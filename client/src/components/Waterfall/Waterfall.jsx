import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// Canonical type colors
const colorMap = {
  document:  '#42a5f5', // blue
  script:    '#66bb6a', // green
  stylesheet:'#ffa726', // orange
  image:     '#ab47bc', // purple
  font:      '#26c6da', // teal
  fetch:     '#ef5350', // red
  other:     '#8d6e63', // brown
};

// --- helpers ----------------------------------------------------
const sanitizeMs = (v) => {
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 ? n : 0;
};

function guessType(item = {}) {
  // 1) explicit resourceType (from backend / LH)
  const rt = (item.resourceType || '').toString().trim().toLowerCase();
  if (rt && rt !== 'other' && rt !== 'unknown') return rt;

  // 2) mimeType sniff
  const mt = (item.mimeType || '').toLowerCase();
  if (mt.startsWith('image/')) return 'image';
  if (mt.includes('javascript')) return 'script';
  if (mt.includes('css')) return 'stylesheet';
  if (mt.includes('font') || mt.includes('woff') || mt.includes('ttf') || mt.includes('otf')) return 'font';
  if (mt.includes('html')) return 'document';
  if (mt.includes('json') || mt.includes('fetch') || mt.includes('text/plain')) return 'fetch';

  // 3) URL extension sniff
  const u = (item.url || '').split('?')[0].toLowerCase();
  if (u.endsWith('.js')) return 'script';
  if (u.endsWith('.css')) return 'stylesheet';
  if (u.match(/\.(png|jpe?g|gif|webp|svg|avif)$/)) return 'image';
  if (u.match(/\.(woff2?|ttf|otf|eot)$/)) return 'font';
  if (u.endsWith('.html') || u.endsWith('/') || u.includes('/home')) return 'document';
  if (u.endsWith('.json') || u.includes('collect')) return 'fetch';

  return 'other';
}

// ----------------------------------------------------------------

export default function Waterfall({ data, debug = false }) {
  if (!data || data.length === 0) return <p>No waterfall data</p>;

  // Process & sort
  const processed = useMemo(() => {
    const arr = data.map((d) => {
      const start = sanitizeMs(d.startTime);
      const end   = sanitizeMs(d.endTime);
      const duration = Math.max(end - start, 0);
      const type = guessType(d);
      return {
        ...d,
        startTime: start,
        endTime: start + duration, // ensure non-negative
        duration,
        _type: type,
      };
    });
    arr.sort((a, b) => a.startTime - b.startTime);
    return arr;
  }, [data]);

  if (debug) {
    // eslint-disable-next-line no-console
    console.table(
      processed.map(({ url, startTime, endTime, _type, mimeType, resourceType }) => ({
        url,
        start: startTime,
        end: endTime,
        type: _type,
        mimeType,
        resourceType,
      }))
    );
  }

  // Labels
  const labels = processed.map((item) => {
    const url = (item.url || '').split('?')[0];
    return url.split('/').pop() || url || '(unknown)';
  });

  // Data arrays
  const startTimes = processed.map((i) => i.startTime);
  const durations = processed.map((i) => i.duration);

  // Chart datasets (scriptable color)
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Start Time',
        data: startTimes,
        backgroundColor: 'rgba(0,0,0,0)',
      },
      {
        label: 'Duration',
        data: durations,
        backgroundColor: (ctx) => {
          const type = processed[ctx.dataIndex]?._type;
          return colorMap[type] || colorMap.other;
        },
        borderRadius: 4,
        barThickness: 12,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          title: (ctx) => processed[ctx[0].dataIndex]?.url ?? '',
          label: (ctx) => {
            if (ctx.dataset.label !== 'Duration') return null;
            const item = processed[ctx.dataIndex];
            const start = item.startTime.toFixed(2);
            const dur = item.duration.toFixed(2);
            const size =
              item.transferSize != null
                ? (item.transferSize / 1024).toFixed(1) + ' KB'
                : '—';
            return `Type: ${item._type} | Start: ${start} ms | Duration: ${dur} ms | Size: ${size}`;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        title: { display: true, text: 'Time (ms)' },
        grid: { color: '#eee' },
      },
      y: {
        stacked: true,
        ticks: { autoSkip: false },
        grid: { color: '#f5f5f5' },
      },
    },
  };

  const heightPx = Math.min(Math.max(processed.length * 25, 200), 800);

  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <div style={{ height: `${heightPx}px` }}>
        <Bar data={chartData} options={options} />
      </div>

      {/* Legend */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          marginTop: '10px',
          justifyContent: 'center',
          fontSize: '14px',
        }}
      >
        {Object.entries(colorMap).map(([type, color]) => (
          <div key={type} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span
              style={{
                width: '15px',
                height: '15px',
                backgroundColor: color,
                borderRadius: '3px',
                display: 'inline-block',
              }}
            />
            <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
