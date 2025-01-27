import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { useAppDispatch, useAppSelector } from "../store";
import { getColorFromType } from "../utils";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const areas = ["Urban (city)", "Suburban (town/mufassil)", "Rural (village)"];

const DepressionByAreaChart = () => {
  const data = useAppSelector((state) => state.core.cleanData);

  const depressionCategories = ["Normal", "Mild", "Borderline", "Moderate", "Severe", "Extreme"];

  // Calculate the total number of people in each area
  const totalByArea = areas.map(
    (area) => data.filter((entry) => entry.demographicInfo.growingArea === area).length
  );

  // Calculate the count of depression levels for each area
  const depressionByArea = areas.map((area) =>
    depressionCategories.map(
      (_, level) =>
        data.filter(
          (entry) => entry.demographicInfo.growingArea === area && entry.depressionLevel === level
        ).length
    )
  );

  // Normalize the data by dividing the count for each depression level by the total number of people in that area
  const normalizedData = depressionByArea.map((counts, index) =>
    counts.map((count) => (count / totalByArea[index]) * 100)
  );

  const chartData = {
    labels: areas,
    datasets: depressionCategories.map((category, index) => ({
      label: category,
      data: normalizedData.map((counts) => counts[index]),
      backgroundColor: getColorFromType(index),
    })),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Area of Upbringing",
          font: {
            size: 20,
            color: "rgba(255, 255, 255, 0.9)",
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Percentage",
          font: {
            size: 20,
            color: "rgba(255, 255, 255, 0.9)",
          },
        },
        ticks: {
          beginAtZero: true,
          max: 100,
          stepSize: 10,
          font: {
            size: 16,
            color: "rgba(255, 255, 255, 0.9)",
          },
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", maxWidth: "800px", margin: "0 auto" }}>
      <h2>Depression Levels by Area of Upbringing (Normalized in %)</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default DepressionByAreaChart;
