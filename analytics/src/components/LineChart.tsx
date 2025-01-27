import React, { useEffect, useRef } from "react";
import { Chart, LineElement, PointElement, LineController, LinearScale, Title, Tooltip, CategoryScale } from "chart.js";

Chart.register(LineElement, PointElement, LineController, LinearScale, Title, Tooltip, CategoryScale);

interface LineGraphProps {
  data: number[]; // Array of numbers for plotting
}

const LineGraph: React.FC<LineGraphProps> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [ "", "0 - 10", "11 - 16", "17 - 20", "21 - 30", "31 - 40", "41 - 63", "" ],
        datasets: [
          {
            label: "Scores",
            data,
            borderColor: "rgba(0, 123, 255, 1)", // Line color
            borderWidth: 3, // Line thickness
           
            pointRadius: 0, // Show dot only at the highlightIndex
    
            tension: 0.4, // Smooth the line
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => `Value: ${tooltipItem.raw}`,
            },
          },
        },

      },
      plugins: [
        {
          id: "backgroundPlugin",
          beforeDraw: (chart) => {
            const { ctx, chartArea, scales } = chart;
            const xScale = scales.x;
      
            const sections = [
              { start: 0.5, end: 1.5, color: "rgba(173, 216, 230, 0.2)", label: "Normal" },
              { start: 1.5, end: 2.5, color: "rgba(144, 238, 144, 0.2)", label: "Mild" },
              { start: 2.5, end: 3.5, color: "rgba(255, 255, 0, 0.2)", label: "Borderline" },
              { start: 3.5, end: 4.5, color: "rgba(255, 165, 0, 0.2)", label: "Moderate" },
              { start: 4.5, end: 5.5, color: "rgba(255, 99, 71, 0.2)", label: "Severe" },
              { start: 5.5, end: 6.5, color: "rgba(255, 0, 0, 0.2)", label: "Extreme" },
            ];
      
            sections.forEach((section) => {
              const startX = xScale.getPixelForValue(section.start);
              const endX = xScale.getPixelForValue(section.end);
      
              // Draw the background rectangle without any border
              ctx.save(); // Save current state
              ctx.fillStyle = section.color; // Set background color
              ctx.lineWidth = 0; // Ensure no border width is applied
              ctx.strokeStyle = "transparent"; // Ensure stroke is transparent
              ctx.fillRect(startX, chartArea.top, endX - startX, chartArea.bottom - chartArea.top); // Fill the section
              ctx.restore(); // Restore state
      
              // Add section label
              ctx.fillStyle = "rgba(255, 255, 255, 0.8)"; // Label color
              ctx.font = "20px Arial"; // Label font
              ctx.textAlign = "center"; // Center alignment
              ctx.fillText(
                section.label,
                (startX + endX) / 2,
                chartArea.top + 20 // Adjust vertical positioning for the label
              );
            });
          },
        },
      ],
      
    });

    return () => {
      chart.destroy();
    };
  }, [data]);

  return <canvas ref={canvasRef}></canvas>;
};

export default LineGraph;
