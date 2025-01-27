import { useAppSelector } from "../store";
import BarChart from "./BarChart";

const ScoreAvg = () => {
    const conversations = useAppSelector(state => state.core.conversations);
    
    const data = new Array(21).fill(0);
    let cnt = 0;
    conversations.filter(c => c.isFinished)
        .forEach(c => {
            cnt++;
            for (let i = 0; i < 21; i++) {
                data[i] += c.scores[i].score;
            }
        });
    for (let i = 0; i < 21; i++) {
        data[i] /= cnt;
    }

    const labels = data.map((_, index) => `${index + 1}`);

    // Generate background and border colors dynamically
    const backgroundColors = data.map(() => "rgba(75, 192, 192, 0.5)");
    const borderColors = data.map(() => "rgba(75, 192, 192, 1)");

    const barChartData = {
        labels: labels, // Labels for the bars
        datasets: [
            {
                label: "Data Values",
                data: data,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1,
            },
        ],
    };

    const barChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
                labels: {
                    font: {
                        size: 40,
                    },
                    color: 'black' // Ensure the legend text is black
                }
            },
            tooltip: {
                enabled: true,
                bodyFont: {
                    size: 40,
                },
                callbacks: {
                    labelColor: function(_:any) {
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
                    text: "Question Number",
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
                }
            },
            y: {
                title: {
                    display: true,
                    text: "Average Score",
                    font: {
                        size: 40,
                    },
                    color: 'black' // Ensure the y-axis title is black
                },
                ticks: {
                    beginAtZero: true,
                    font: {
                        size: 40,
                    },
                    color: 'black' // Ensure the y-axis ticks are black
                }
            }
        }
    };

    return (
        <div style={{ width: "80%", margin: "auto" }}>
            <BarChart data={barChartData} options={barChartOptions} />
        </div>
    );
};

export default ScoreAvg;
