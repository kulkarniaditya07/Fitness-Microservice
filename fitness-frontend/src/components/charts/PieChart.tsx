"use client";

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import type { ChartData, ChartOptions } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  data: ChartData<"pie">;
  options?: ChartOptions<"pie">;
}

export const PieChart = ({ data, options }: PieChartProps) => {
  return <Pie data={data} options={options} />;
};
