import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { useAppSelector } from '../store';
// import { useAppSelector } from './hooks';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const AvgTimeToCompleteChart: React.FC = () => {
    const data = useAppSelector((state) => state.core.cleanData);

    const times = {
        Male: { total: 0, count: 0 },
        Female: { total: 0, count: 0 },
    };

    data.forEach(item => {
        if (item.demographicInfo.Gender === 'Male') {
            times.Male.total += item.timeToComplete;
            times.Male.count++;
        } else {
            times.Female.total += item.timeToComplete;
            times.Female.count++;
        }
    });

    const avgTimeMale = times.Male.total / times.Male.count || 0;
    const avgTimeFemale = times.Female.total / times.Female.count || 0;

    const chartData = {
        labels: ['Male', 'Female'],
        datasets: [
            {
                label: 'Average Time to Complete (Minutes)',
                data: [avgTimeMale, avgTimeFemale],
                backgroundColor: ['#42a5f5', '#f48fb1'],
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
                labels: {
                    font: {
                        size: 40
                    },
                    color: 'black' // Ensure the legend text is black
                }
            },
            tooltip: {
                enabled: true,
                bodyFont: {
                    size: 40
                },
                callbacks: {
                    labelColor: function(context) {
                        return {
                            borderColor: 'black',
                            backgroundColor: 'black'
                        };
                    },
                    labelTextColor: function() {
                        return 'black';
                    }
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Gender",
                    font: {
                        size: 40
                    },
                    color: 'black' // Ensure the x-axis title is black
                },
                ticks: {
                    font: {
                        size: 40
                    },
                    color: 'black' // Ensure the x-axis ticks are black
                }
            },
            y: {
                title: {
                    display: true,
                    text: "Average Time (Minutes)",
                    font: {
                        size: 40
                    },
                    color: 'black' // Ensure the y-axis title is black
                },
                ticks: {
                    beginAtZero: true,
                    font: {
                        size: 40
                    },
                    color: 'black' // Ensure the y-axis ticks are black
                }
            }
        }
    };

    return (
        <div>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default AvgTimeToCompleteChart;
