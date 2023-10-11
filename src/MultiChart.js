import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

const MultiChart = () => {
  const chartRef = useRef(null);
  let chartInstance = null;

  const [chartData, setChartData] = useState({
    labels: ['Type 1', 'Type 2', 'Type 3', 'Type 4', 'Type 5'],
    datasets: [
      {
        label: 'Bar Chart Data',
        type: 'bar',
        data: [100, 200, 150, 250, 300],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Line Chart Data',
        type: 'line',
        data: [50, 60, 70, 80, 90],
        fill: false,
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
      },
      {
        label: 'Area Chart Data',
        type: 'line',
        data: [30, 40, 20, 50, 60],
        fill: true,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
      },
    ],
  });

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    if (chartInstance) {
      chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: {
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, [chartData]);

  return (
    <div>
      <canvas ref={chartRef} width="400" height="200" />
    </div>
  );
};

export default MultiChart;
