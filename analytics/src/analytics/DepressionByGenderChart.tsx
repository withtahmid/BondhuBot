import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { useAppSelector } from "../store";
import { getColorFromType } from "../utils";
; // assuming you are using Redux with useAppSelector

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const DepressionByGenderChart: React.FC = () => {
  const data = useAppSelector((state) => state.core.cleanData);
  const genderTypes = ["Male", "Female"];
  const depressionCategories = ["Normal", "Mild", "Borderline", "Moderate", "Severe", "Extreme"];

  // Calculate total count for each gender
  const totalByGender = genderTypes.map(
    (gender) => data.filter((entry) => entry.demographicInfo.Gender === gender).length
  );

  // Calculate the count of depression levels for each gender
  const depressionByGender = genderTypes.map((gender) =>
    depressionCategories.map(
      (_, level) =>
        data.filter(
          (entry) => entry.demographicInfo.Gender === gender && entry.depressionLevel === level
        ).length
    )
  );

  // Normalize data by calculating percentage
  const normalizedData = depressionByGender.map((counts, index) =>
    counts.map((count) => (count / totalByGender[index]) * 100)
  );

  const chartData = {
    labels: genderTypes,
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
            labels: {
                font: {
                    size: 40 // Change this to the desired font size
                },
                color: '#0' // Change this to the desired font color
            }
        },
        tooltip: {
            enabled: true,
            bodyFont: {
                size: 40 // Change this to the desired font size
            }
        }
    },
    scales: {
        x: {
            title: {
                display: true,
                text: "Gender",
                font: {
                    size: 40 // Change this to the desired font size
                },
                color: '#0' // Change this to the desired font color
            },
            ticks: {
                font: {
                    size: 40 // Change this to the desired font size
                },
                color: '#0' // Change this to the desired font color
            }
        },
        y: {
            title: {
                display: true,
                text: "Percentage",
                font: {
                    size: 40 // Change this to the desired font size
                },
                color: '#0' // Change this to the desired font color
            },
            ticks: {
                beginAtZero: true,
                max: 100,
                stepSize: 10,
                font: {
                    size: 40 // Change this to the desired font size
                },
                color: '#0' // Change this to the desired font color
            }
        }
    }
};


  return (
    <div style={{ width: "100%", maxWidth: "2000px", margin: "0 auto" }}>

      <Bar data={chartData} options={options} />
    </div>
  );
};

export default DepressionByGenderChart;
