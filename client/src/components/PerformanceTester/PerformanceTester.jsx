import { useState } from 'react';
import axios from 'axios';
import './PerformanceTester.css'
import SkeletonBar from '../skeletonBarGraph/SkeletonBar';
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

export default function PerformanceTester() {
    const [url, setUrl] = useState('https://myportfoliovscodetheme.netlify.app/Home');
    const [auditData, setAuditData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleAudit = async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await axios.post(`${getBackendUrl()}/audit`, { url });
            setAuditData(res.data);
            console.log(res.data);
        } catch (e) {
            setError(e.message || 'Audit failed');
        } finally {
            setLoading(false);
        }
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
                <button onClick={handleAudit} className="analyse-button">
                    {loading ? "Analysing" : "Run Audit"}
                </button>
            </div>

            <div className="bar-graph-scores">
                {loading && <SkeletonBar />}

                {error && <p style={{ color: 'red' }}>{error}</p>}

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

            <div >{!loading && auditData?.metrics && (<Metrics metrics={auditData.metrics} />)}</div>

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