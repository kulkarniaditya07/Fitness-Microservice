"use client";

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import type { ChartData, ChartOptions } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

interface LineChartProps {
  data: ChartData<"line">;
  options?: ChartOptions<"line">;
}

export const LineChart = ({ data, options }: LineChartProps) => {
  return <Line data={data} options={options} />;
};
