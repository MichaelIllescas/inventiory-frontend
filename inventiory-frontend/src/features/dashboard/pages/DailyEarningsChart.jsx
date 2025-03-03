import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const DailyEarningsChart = () => {
  const data = {
    labels: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
    datasets: [
      {
        label: "Ganancias Diarias",
        data: [1200, 1500, 1300, 1800, 2500, 3000, 2000],
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
      },
    ],
  };

  return (
    <div className="card p-3">
      <h4 className="text-center">📈 Ganancias del Día</h4>
      <Line data={data} />
    </div>
  );
};

export default DailyEarningsChart;
