import React from 'react';
import { Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import { useAppSelector } from '../store';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend, Title);

interface ScatterChartProps {
  timeData: number[]; // Normalized average time to answer each question
  scoreData: number[]; // Normalized average score for each question
}

const ScatterChart = () => {
  const conversations = useAppSelector(state => state.core.conversations);
  const timeData = new Array(21).fill(0);
  let cnt = 0;
  conversations.filter(c => c.isFinished === true)
    .forEach(c => {
      cnt++;
      for (let i = 0; i < 21; i++) {
        timeData[i] += Math.min(60, ((c.scores[i].endTime - c.scores[i].startTime) / 1000));
        // data[i] = i;
      }
    });

  const scoreData = new Array(21).fill(0);
  conversations.filter(c => c.isFinished)
    .forEach(c => {
      for (let i = 0; i < 21; i++) {
        scoreData[i] += c.scores[i].score;
      }
    });

  for (let i = 0; i < 21; i++) {
    timeData[i] /= cnt;
    scoreData[i] /= cnt;
  }
  const maxTime = Math.max(...timeData);
  const maxScore = Math.max(...scoreData);

  const normalizedTimeData = timeData.map((value) => (value / maxTime) * 100);
  const normalizedScoreData = scoreData.map((value) => (value / maxScore) * 100);

  const chartData = {
    datasets: [
      {
        label: 'Questions (Normalized)',
        data: normalizedTimeData.map((time, index) => ({
          x: time, // X-axis: normalized time
          y: normalizedScoreData[index], // Y-axis: normalized score
        })),
        backgroundColor: '#42a5f5',
        borderColor: '#1e88e5',
        pointRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide legend since we have a single dataset
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            const { x, y } = tooltipItem.raw;
            return `Time: ${x.toFixed(2)}%, Score: ${y.toFixed(2)}%`;
          },
        },
        bodyFont: {
          size: 40,
          color: 'black' // Ensure the tooltip text is black
        }
      },
      title: {
        display: true,
        text: 'Scatter Plot of Normalized Time vs Score',
        font: {
          size: 40,
        },
        color: 'black' // Ensure the title text is black
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Normalized Time (%)',
          font: {
            size: 40,
          },
          color: 'black' // Ensure the x-axis title is black
        },
        ticks: {
          font: {
            size: 40,
          },
          color: 'black' // Ensure the x-axis ticks are black
        },
        min: 0,
        max: 100, // Normalize scale
      },
      y: {
        title: {
          display: true,
          text: 'Normalized Score (%)',
          font: {
            size: 40,
          },
          color: 'black' // Ensure the y-axis title is black
        },
        ticks: {
          font: {
            size: 40,
          },
          color: 'black' // Ensure the y-axis ticks are black
        },
        min: 0,
        max: 100, // Normalize scale
      },
    },
  };

  return (
    <div>
      <Scatter data={chartData} options={chartOptions} />
    </div>
  );
};

export default ScatterChart;
