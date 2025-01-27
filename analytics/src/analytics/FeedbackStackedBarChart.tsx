import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { useAppSelector } from '../store';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const FeedbackStackedBarChart: React.FC = () => {
  const data = useAppSelector((state) => state.core.cleanData);

  const feedbackPoints = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
  ];

  const feedbackCounts = Array(feedbackPoints.length)
    .fill(null)
    .map(() => Array(5).fill(0)); // 5 is for responses: 0 to 4

  // Count the number of each response (0-4) for each question
  data.forEach((user) => {
    user.feedback.forEach((response, index) => {
      feedbackCounts[index][response]++;
    });
  });

  const totalResponsesPerQuestion = feedbackCounts.map((counts) =>
    counts.reduce((acc, val) => acc + val, 0)
  );

  // Normalize counts to percentages
  const feedbackPercentages = feedbackCounts.map((counts, i) =>
    counts.map((count) => (count / totalResponsesPerQuestion[i]) * 100)
  );

  const chartData = {
    labels: feedbackPoints,
    datasets: [
      {
        label: 'Strongly Disagree',
        data: feedbackPercentages.map((q) => q[0]),
        backgroundColor: '#ff5722',
      },
      {
        label: 'Disagree',
        data: feedbackPercentages.map((q) => q[1]),
        backgroundColor: '#ff9800',
      },
      {
        label: 'Neutral',
        data: feedbackPercentages.map((q) => q[2]),
        backgroundColor: '#ffeb3b',
      },
      {
        label: 'Agree',
        data: feedbackPercentages.map((q) => q[3]),
        backgroundColor: '#8bc34a',
      },
      {
        label: 'Strongly Agree',
        data: feedbackPercentages.map((q) => q[4]),
        backgroundColor: '#4caf50',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: 25
          },
          color: 'black' // Ensure the legend text is black
        }
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw.toFixed(2)}%`;
          },
        },
        bodyFont: {
          size: 25,
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: 'Feedback Questions',
          font: {
            size: 25
          },
          color: 'black' // Ensure the x-axis title is black
        },
        ticks: {
          font: {
            size: 25
          },
          color: 'black' // Ensure the x-axis ticks are black
        }
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: 'Percentage (%)',
          font: {
            size: 25
          },
          color: 'black' // Ensure the y-axis title is black
        },
        ticks: {
          font: {
            size: 25
          },
          color: 'black' // Ensure the y-axis ticks are black
        }
      }
    }
  };

  return (
    <div>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default FeedbackStackedBarChart;
