import React from "react";
import PieChart from "../components/PieChart";
import { useAppSelector } from "../store";
import { depressionTypeFromScore, getColorFromType } from "../utils";
import { getDarkmodeColor } from "../utils/colorGenerator";
import { cleanData } from "../utils/cleanData";

const Distribution: React.FC = () => {
  const conversations = useAppSelector(state => state.core.conversations);
  const scores = conversations.filter(con => con.isFinished === true).map(con => con.obtainedScore);

  cleanData(conversations);

  const data = new Array<number>(6).fill(0);
  scores.forEach(s => {
    const type = depressionTypeFromScore(s);
    if(type >= data.length || type < 0) {
        throw new Error("Depression type cannot be more than 5 or negative ")
    }
    data[type] += 1;
  });

  for(let i = 0; i < 6; ++i){
    data[i] = (data[i] * 100 ) / scores.length;
  }

  const chartData = [
    // { label: "Red", value: 30, color: "#FF6384" },
    // { label: "Blue", value: 20, color: "#36A2EB" },
    // { label: "Yellow", value: 50, color: "#FFCE56" },
    { color: getColorFromType(0), label: "Normal", value: data[0] },
    { color: getColorFromType(1), label: "Mild", value: data[1] },
    { color: getColorFromType(2), label: "Borderline", value: data[2] },
    { color: getColorFromType(3), label: "Moderate", value: data[3] },
    { color: getColorFromType(4), label: "Severe", value: data[4] },
    { color: getColorFromType(5), label: "Extreme", value: data[5] },
  ];


  return (
    <div>
      <PieChart data={chartData} />
    </div>
  );
};

export default Distribution;
