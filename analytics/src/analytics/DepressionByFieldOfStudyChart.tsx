import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { useAppSelector } from "../store";
import { getColorFromType } from "../utils";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const DepressionByFieldOfStudyChart = () => {

    const data = useAppSelector(state => state.core.cleanData)

  const fieldsOfStudy = [
    "Arts and Humanities", "Social Sciences", "Natural Sciences", "Engineering and Technology", 
    "Business and Economics", "Medical and Health Sciences"
  ];
  const depressionCategories = ["Normal", "Mild", "Borderline", "Moderate", "Severe", "Extreme"];

  const depressionByField = fieldsOfStudy.map((field) =>
    depressionCategories.map(
      (_, level) =>
        data.filter(
          (entry) => entry.demographicInfo.fieldOfStudy === field && entry.depressionLevel === level
        ).length
    )
  );

  const chartData = {
    labels: fieldsOfStudy,
    datasets: depressionCategories.map((category, index) => ({
      label: category,
      data: depressionByField.map((counts) => counts[index]),
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
          text: "Field of Study",
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of People",
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", maxWidth: "800px", margin: "0 auto" }}>
      <h2>Depression Levels by Field of Study</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default DepressionByFieldOfStudyChart;
