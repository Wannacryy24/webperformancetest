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

    const handleClearAudit = () => {
        setAuditData(null);
        setDuration(null);
        setError(null);
    };

    return (
        <div className="performace-tester">
            <div className='input-and-button'>
                <input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter URL like https://XYZ.com"
                    className="border px-3 py-2 w-full rounded"
                />
                <button onClick={handleAudit} disabled={loading} className="analyse-button">
                    {loading ? "Analysing..." : "Run Audit"}
                </button>
                
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
