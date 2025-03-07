"use client";

import {Doughnut} from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Registrera nödvändiga element
ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
  const data = {
    datasets: [
      {
        label: "Banks",
        data: [55560, 49802, 13323],
        backgroundColor: ["#0747b6", "#2265d8", "#2f91fa"],
      },
    ],
    labels: ["Konto 1", "Konto 2", "Konto 3"],
   
    
  };
  return <Doughnut data={data} 
  options={{
    cutout: "60%",
    plugins: {
      legend: {
        display: false,
      },
    }
  }}
  />
}

export default DoughnutChart
