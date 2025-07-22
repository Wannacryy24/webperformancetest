import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './ResouceDoughnutChart.css'
ChartJS.register(ArcElement, Tooltip, Legend);

export default function ResouceDoughnutChart({ data }) {
    const {
        Script, Font, Image, Stylesheet,
        Other, Document, Media, ThirdParty,
        Total
    } = data || {};

    // Helpers
    const getSize = (type) => parseFloat(data?.[type]?.size) || 0;
    const getCount = (type) => parseInt(data?.[type]?.count) || 0;

    const types = ['Script', 'Font', 'Image', 'Stylesheet', 'Other', 'Document', 'Media', 'ThirdParty'];
    const labels = ['Script', 'Font', 'Image', 'Stylesheet', 'Other', 'Document', 'Media', 'Third-party'];
    const colors = [
        '#ff6384', '#36a2eb', '#ffce56', '#4bc0c0',
        '#9966ff', '#c9cbcf', '#ff9f40', '#8dd17e'
    ];

    const sizeData = types.map(getSize);
    const countData = types.map(getCount);

    const commonDatasetProps = {
        backgroundColor: colors,
        borderWidth: 1,
        cutout: '70%',
    };

    const sizeChart = {
        labels,
        datasets: [{
            ...commonDatasetProps,
            data: sizeData,
            label: 'Resource Size (KB)'
        }]
    };

    const countChart = {
        labels,
        datasets: [{
            ...commonDatasetProps,
            data: countData,
            label: 'Resource Count'
        }]
    };

    const chartOptions = {
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    usePointStyle: true,
                    boxWidth: 10
                }
            }
        },
        maintainAspectRatio: false,
    };

    const totalSize = Total?.size || '0 KB';
    const totalCount = Total?.count || '0';

    return (
        <div 
            className='ResouceDoughnut-div'>
            {/* Size Doughnut */}
            <div 
                className='ResouceDoughnut-inner-div-left'
            style={{ position: 'relative', width: '260px', height: '260px' }}>
                <div >
                    {totalSize}
                    <div >Total Size</div>
                </div>
                <Doughnut data={sizeChart} options={chartOptions} />
            </div>

            {/* Count Doughnut */}
            <div 
                className='ResouceDoughnut-inner-div-left'
           >
                <div >
                    {totalCount}
                    <div >Total Count</div>
                </div>
                <Doughnut data={countChart} options={chartOptions} />
            </div>
        </div>
    );
}


