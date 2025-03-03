import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale);

const QuarterlyEarningsChart = () => {
  const data = {
    labels: ["Enero", "Febrero", "Marzo"],
    datasets: [
      {
        label: "Ganancias Trimestrales",
        data: [25000, 32000, 28000],
        backgroundColor: "rgba(255, 159, 64, 0.6)",
      },
    ],
  };

  return (
    <div className="card p-3">
      <h4 className="text-center">📊 Ganancias del Trimestre</h4>
      <Bar data={data} />
    </div>
  );
};

export default QuarterlyEarningsChart;
