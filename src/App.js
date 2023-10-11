import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';

const initialData = {
  year: {
    labels: ['2019', '2020', '2021', '2022', '2023'],
    datasets: [
      {
        label: 'Yearly Data',
        data: [200, 250, 300, 400, 350],
      },
    ],
  },
  month: {
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
  },
  week: {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Weekly Data',
        data: [5, 10, 15, 12],
      },
    ],
  },
  day: {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
    datasets: [
      {
        label: 'Daily Data',
        data: [2, 4, 6, 8, 10],
      },
    ],
  },
  hour: {
    labels: ['Hour 1', 'Hour 2', 'Hour 3', 'Hour 4', 'Hour 5'],
    datasets: [
      {
        label: 'Hourly Data',
        data: [1, 2, 3, 4, 5],
      },
    ],
  },
};

const BarChartZoom = () => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState(initialData.year);
  const [dataType, setDataType] = useState('year');
  const [timeRange, setTimeRange] = useState('full');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');

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
    if (dataType === 'year') {
      setChartData(initialData.month);
      setDataType('month');
    } else if (dataType === 'month') {
      setChartData(initialData.week);
      setDataType('week');
    } else if (dataType === 'week') {
      setChartData(initialData.day);
      setDataType('day');
    } else if (dataType === 'day') {
      setChartData(initialData.hour);
      setDataType('hour');
    }
  };

  const handleZoomOut = () => {
    if (dataType === 'hour') {
      setChartData(initialData.day);
      setDataType('day');
    } else if (dataType === 'day') {
      setChartData(initialData.week);
      setDataType('week');
    } else if (dataType === 'week') {
      setChartData(initialData.month);
      setDataType('month');
    } else if (dataType === 'month') {
      setChartData(initialData.year);
      setDataType('year');
    }
  };

  const handleDataTypeChange = (event) => {
    const selectedDataType = event.target.value;
    setChartData(initialData[selectedDataType]);
    setDataType(selectedDataType);
  };

  const handleTimeRangeChange = (event) => {
    const selectedTimeRange = event.target.value;
    setTimeRange(selectedTimeRange);
  };

  const handleCustomTimeRangeChange = () => {
    if (customStartDate && customEndDate) {
      const filteredData = { ...initialData[dataType] };
      const startIndex = filteredData.labels.indexOf(customStartDate);
      const endIndex = filteredData.labels.indexOf(customEndDate);
      filteredData.labels = filteredData.labels.slice(startIndex, endIndex + 1);
      filteredData.datasets[0].data = filteredData.datasets[0].data.slice(startIndex, endIndex + 1);
      setChartData(filteredData);
    }
  };

  return (
    <div style={{width : "50%"}}>
      <canvas ref={chartRef} />
      <button onClick={handleZoomIn}>Zoom In</button>
      <button onClick={handleZoomOut}>Zoom Out</button>
      <div>
        <label>Data Type:</label>
        <select onChange={handleDataTypeChange} value={dataType}>
          <option value="year">Yearly</option>
          <option value="month">Monthly</option>
          <option value="week">Weekly</option>
          <option value="day">Daily</option>
          <option value="hour">Hourly</option>
        </select>
      </div>
      <div>
        <label>Time Range:</label>
        <select onChange={handleTimeRangeChange} value={timeRange}>
          <option value="full">Full</option>
          <option value="custom">Custom</option>
        </select>
      </div>
      {timeRange === 'custom' && (
        <div>
          <label>Custom Start Date:</label>
          <input type="text" value={customStartDate} onChange={(e) => setCustomStartDate(e.target.value)} />
          <label>Custom End Date:</label>
          <input type="text" value={customEndDate} onChange={(e) => setCustomEndDate(e.target.value)} />
          <button onClick={handleCustomTimeRangeChange}>Apply</button>
        </div>
      )}
    </div>
  );
};

export default BarChartZoom;
