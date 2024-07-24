import React, { useEffect, useRef, useState } from 'react';
import Chart from 'react-apexcharts';

function OroBranchesChart() {
  const [options, setOptions] = useState({
    series: [44, 55, 41, 17, 15],
    chart: {
      width: 380,
      type: 'donut',
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: 'gradient',
    },
    legend: {
      formatter: function(val, opts) {
        return `Jul. ${opts.seriesIndex + 1} - ${opts.w.globals.series[opts.seriesIndex]}`;
      },
    },
    title: {
      text: '',
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: 'bottom',
        },
      },
    }],
    tooltip: {
      enabled: true,
      y: {
        formatter: function(val) {
          return `Jul.: ${val}`;
        }
      }
    },
  });
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current && chartRef.current.updateOptions) {
      chartRef.current.updateOptions(options, false);
    }
  }, [options]);

  return (
    <div className='app'>
      <Chart
        options={options}
        series={[44, 55, 41, 17, 15, 32, 20, 16]}
        type='donut'
        width='100%'
        height='400px'
        ref={chartRef}
      />
    </div>
  );
}

export default OroBranchesChart;
