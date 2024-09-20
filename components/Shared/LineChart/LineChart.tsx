'use client'
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

interface LineChartProps {
    clientData: number[];
    professionalData: number[];
    labels: string[];
}

const LineChart: React.FC<LineChartProps> = ({ clientData, professionalData, labels }) => {
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'CLIENTS',
                data: clientData,
                borderColor: '#1e293b',
                backgroundColor: '#1e293b',
                fill: false,
                tension: 0.4,
                pointRadius: 0, // Hide points
                borderWidth: 2,
            },
            {
                label: 'PROFESSIONALS',
                data: professionalData,
                borderColor: '#f5c32e',
                backgroundColor: '#f5c32e',
                fill: false,
                tension: 0.4,
                pointRadius: 0, // Hide points
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true, // Allow resizing
        maintainAspectRatio: false, // Allow resizing with parent
        plugins: {
            legend: {
                display: false, // Disable the legend if you don't want it
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
            },
        },
    };

    return (
        <div className="rounded-lg w-full h-full">
            <div className="relative h-64 w-full">
                <Line data={data} options={options} />
            </div>
        </div>
    );
};

export default LineChart;
