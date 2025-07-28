import { useState } from 'react';
import axios from 'axios';
import './PerformanceTester.css';
import Opportunities from '../Opportunities/Opportunities';
import Diagnostics from '../Diagnostics/Diagnostic';
import Metrics from '../metrics/Metrics';
import Score from '../score/Score';
import PageLoadFilmstrip from '../PreLoadFilmStrip/PreLoadFilmStrip';
import ResouceDoughnutChart from '../DonutChart/ResouceDoughnutChart';
import Waterfall from '../Waterfall/Waterfall';
import Accessibility from '../Accessibilty/Accessibility';
import BestPracticesCards from '../BestPractice/BestPracticesCards';
import React from 'react';
import getBackendUrl from '../../utils/getBackendUrl';
import StillLoading from '../../Layout/StillLoading/StillLoading';
import AuditProgressSteps from '../AuditStepsLoading/AuditProgressSteps';
import html2pdf from 'html2pdf.js';

export default function PerformanceTester() {
    const [url, setUrl] = useState('https://myportfoliovscodetheme.netlify.app/Home');
    const [auditData, setAuditData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [duration, setDuration] = useState(null);

    const isValidUrl = (string) => {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    };

    const handleAudit = async () => {
        if (!isValidUrl(url)) {
            setError("❌ Please enter a valid URL including https://");
            return;
        }

        setLoading(true);
        setError(null);
        setAuditData(null); // 🧹 Clear old data immediately
        setDuration(null);

        const start = Date.now();

        try {
            const res = await axios.post(`${getBackendUrl()}/audit`, { url }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setAuditData(res.data);
            console.log(typeof res.data);

            console.log(res.data);
            const end = Date.now();
            setDuration(((end - start) / 1000).toFixed(2));
        } catch (e) {
            const errorMessage = e.response?.data?.error ||
                e.response?.data?.message ||
                e.message ||
                'Audit failed';
            setError(errorMessage);
            console.error('Full error:', e.response?.data || e);
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadJSON = () => {
        const jsonString = JSON.stringify(auditData, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });


        // Step 3: Create a temporary URL for the Blob
        const url = URL.createObjectURL(blob);

        // Step 4: Create a hidden <a> tag to trigger download
        const a = document.createElement('a');
        a.href = url;
        a.download = 'audit-results.json'; // Filename
        document.body.appendChild(a);
        a.click(); // Trigger download

        // Step 5: Clean up (revoke the Blob URL)
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url); // Free memory
        }, 100);
    }

    const downloadPDF = () => {
        console.log('Download pdf clicked');

        const element = document.getElementsByClassName('performace-tester')[0];

        // Hide elements with class 'no-print'
        const noPrintEls = document.querySelectorAll('.no-print');
        noPrintEls.forEach(el => el.style.display = 'none');

        const options = {
            margin: 0,
            filename: 'lighthouse-report.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().set(options).from(element).save().then(() => {
            // Restore hidden elements after PDF is saved
            noPrintEls.forEach(el => el.style.display = '');
        });
    };



    return (
        <div className="performace-tester">
            <div className='input-and-button no-print'>
                <input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter URL like https://XYZ.com"
                    className="border px-3 py-2 w-full rounded"
                />
                <button onClick={handleAudit} disabled={loading} className="analyse-button">
                    {loading ? "Analysing..." : "Run Audit"}
                </button>

                {
                    auditData && (
                        <>
                            <button
                                onClick={() => handleDownloadJSON()}
                                className="analyse-button"
                            >Download JSON</button>

                        </>
                    )
                }

                {
                    auditData && (
                        <button onClick={downloadPDF} className="analyse-button">
                            Download PDF Report
                        </button>
                    )
                }
            </div>

            <div className="bar-graph-scores">
                {loading && (
                    <>
                        <StillLoading />
                    </>
                )}
                {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

                {duration && !loading && (
                    <p style={{ marginTop: '10px', color: '#4CAF50' }}>
                        ✅ Audit completed in <strong>{duration}</strong> seconds
                    </p>
                )}

















                {auditData?.screenshot && (
                    <div className="report-card">
                        <h2 className="report-title">SpeedVitals Performance Report for</h2>
                        <h3 className="report-url">{url}</h3>
                        <div className='report-card-inner'>
                            <img
                                src={auditData.screenshot}
                                alt="SpeedVitals Report"
                                className="report-image"
                            />
                            <button
                                className="report-btn"
                                onClick={() => window.open(url, '_blank')}
                            >
                                View Website
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {auditData?.scores && <Score data={auditData.scores} />}
            {auditData && <PageLoadFilmstrip filmstrip={auditData.filmstrip} />}
            {auditData?.resourceSizes && <ResouceDoughnutChart data={auditData.resourceSizes} />}
            {!loading && auditData?.metrics && <Metrics metrics={auditData.metrics} />}
            {auditData?.opportunities && <Opportunities data={auditData.opportunities} />}
            {auditData?.diagnostics && <Diagnostics data={auditData.diagnostics} />}
            {auditData?.waterfall && <Waterfall data={auditData.waterfall} />}
            {auditData?.accessibilityIssues && <Accessibility data={auditData.accessibilityIssues} />}
            {auditData?.bestPracticesIssues && (
                <BestPracticesCards issues={auditData.bestPracticesIssues} />
            )}
        </div>
    );
}
