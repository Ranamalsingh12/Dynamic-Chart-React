import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';

const initialYearData = {
  labels: ['2019', '2020', '2021', '2022', '2023'],
  datasets: [
    {
      label: 'Yearly Data',
      data: [200, 250, 300, 400, 350],
    },
  ],
};

const initialMonthData = {
  labels: [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ],
  datasets: [
    {
      label: 'Monthly Data',
      data: [20, 30, 40, 50, 45, 60, 70, 80, 70, 65, 75, 85],
    },
  ],
};

const initialWeekData = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [
    {
      label: 'Weekly Data',
      data: [5, 10, 15, 12],
    },
  ],
};

const initialDayData = {
  labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
  datasets: [
    {
      label: 'Daily Data',
      data: [2, 4, 6, 8, 10],
    },
  ],
};

const initialHourData = {
  labels: ['Hour 1', 'Hour 2', 'Hour 3', 'Hour 4', 'Hour 5'],
  datasets: [
    {
      label: 'Hourly Data',
      data: [1, 2, 3, 4, 5],
    },
  ],
};

const BarChartZoom = () => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState(initialYearData);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    const chart = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: {
        plugins: {
          zoom: {
            pan: {
              enabled: true,
              mode: 'x',
            },
            zoom: {
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: true,
              },
              limits: {
                max: 10,
              },
            },
          },
        },
      },
    });
    return () => {
      chart.destroy();
    };
  }, [chartData]);

  const handleZoomIn = () => {
    if (chartData === initialYearData) {
      setChartData(initialMonthData);
    } else if (chartData === initialMonthData) {
      setChartData(initialWeekData);
    } else if (chartData === initialWeekData) {
      setChartData(initialDayData);
    } else if (chartData === initialDayData) {
      setChartData(initialHourData);
    }
  };

  const handleZoomOut = () => {
    if (chartData === initialHourData) {
      setChartData(initialDayData);
    } else if (chartData === initialDayData) {
      setChartData(initialWeekData);
    } else if (chartData === initialWeekData) {
      setChartData(initialMonthData);
    } else if (chartData === initialMonthData) {
      setChartData(initialYearData);
    }
  };

  return (
    <div style={{width : "50%"}}>
      <canvas ref={chartRef} />
      <button onClick={handleZoomIn}>Zoom In</button>
      <button onClick={handleZoomOut}>Zoom Out</button>
    </div>
  );
};

export default BarChartZoom;
