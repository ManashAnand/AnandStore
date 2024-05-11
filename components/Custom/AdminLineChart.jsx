"use client";

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
const AdminLineChart = () => {

    
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' ,
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
    aspectRatio: 2,
  };

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Mobile User',
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        data: [65, 59, 80, 81, 56, 55, 40],
      },
      {
        label: 'PC User',
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        data: [28, 48, 40, 19, 86, 27, 90],
        },
    ],
  };
  
  return (
    <>
    <div className="hidden md:block ">
         <Line data={data} style={{height:"20rem",width:"46rem"}} />
    </div>
    </>
  
  )
}

export default AdminLineChart