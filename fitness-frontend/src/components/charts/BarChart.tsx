"use client";

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import type { ChartData, ChartOptions } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface BarChartProps {
  data: ChartData<"bar">;
  options?: ChartOptions<"bar">;
}

export const BarChart = ({ data, options }: BarChartProps) => {
  return <Bar data={data} options={options} />;
};
