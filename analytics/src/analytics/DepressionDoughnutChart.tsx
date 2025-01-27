import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useAppSelector } from '../store';
import { getColorFromType } from '../utils';
// import { useAppSelector } from './hooks';

ChartJS.register(ArcElement, Tooltip, Legend);

const DepressionDoughnutChart: React.FC = () => {
    const data = useAppSelector((state) => state.core.cleanData);

    const depressionCounts = new Array(6).fill(0); // For levels: 0 to 5

    data.forEach(item => {
        depressionCounts[item.depressionLevel]++;
    });

    const total = data.length;
    const percentages = depressionCounts.map(count => ((count / total) * 100).toFixed(2));
    const levels = ['Normal', 'Mild', 'Borderline', 'Moderate', 'Severe', 'Extreme'];
    const chartData = {
        labels: levels,
        datasets: [{
            data: percentages,
            backgroundColor: levels.map((_, i) => getColorFromType(i)),
        }],
    };

    return (
        <div>
            <Doughnut data={chartData} />
        </div>
    );
};

export default DepressionDoughnutChart;
