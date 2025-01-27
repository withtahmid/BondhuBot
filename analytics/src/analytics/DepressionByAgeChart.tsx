import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { useAppSelector } from "../store";
import { getColorFromType } from "../utils";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);


const DepressionByAgeChart = () => {

const data = useAppSelector(state => state.core.cleanData);
  // Extract unique age groups
  const ageGroups = ["Under 18", "18 - 20", "21 - 24", "25 - 30", "Over 30"];
  const depressionCategories = ["Normal", "Mild", "Borderline", "Moderate", "Severe", "Extreme"];

  // Count depression levels by age group
  const depressionByAge = ageGroups.map((ageGroup) =>
    depressionCategories.map(
      (_, level) =>
        data.filter(
          (entry) => entry.demographicInfo.Age === ageGroup && entry.depressionLevel === level
        ).length
    )
  );

  // Chart.js data structure
  const chartData = {
    labels: ageGroups,
    datasets: depressionCategories.map((category, index) => ({
      label: category,
      data: depressionByAge.map((counts) => counts[index]),
      backgroundColor: getColorFromType(index),
    })),
  };

  // Chart.js options
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
          text: "Age Groups",
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
    <div style={{ width: "100%", maxWidth: "1500px", margin: "0 auto" }}>
      <h2>Depression Levels by Age Group</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default DepressionByAgeChart;
