import React, { useState } from 'react';
import Chart from 'react-apexcharts';

function ReportCharts() {
  const [data, setData] = useState({
    series: [
      {
        name: 'ORO 1',
        data: [4345562, 6982240, 2847228, 5928351, 6928442, 5213382, 6321456],
      },
      {
        name: 'ORO 2',
        data: [5426642, 1582240, 3689228, 3489351, 5214442, 6145382, 4024456],
      },
      {
        name: 'ORO 3',
        data: [1154562, 7423240, 8136228, 5189351, 6124442, 4999382, 2804456],
      },
      {
        name: 'ORO 4',
        data: [2123456, 4234240, 1859228, 5639351, 6234442, 5123382, 8221456],
      },
      {
        name: 'ORO 5',
        data: [6526642, 2682240, 6789228, 3589351, 5314442, 6245382, 3124456],
      },
      {
        name: 'ORO 6',
        data: [7224562, 3523240, 2236228, 5289351, 6224442, 5099382, 7904456],
      },
      {
        name: 'ORO 7',
        data: [4423456, 8434240, 4959228, 5739351, 6334442, 5223382, 6321456],
      },
      {
        name: 'ORO 8',
        data: [5626642, 7782240, 1889228, 3689351, 5414442, 6345382, 5224456],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'area',
        toolbar: {
          show: false,
        },
      },
      markers: {
        size: 4,
      },
      colors: ['#4154f1', '#2eca6a', '#ff771d', '#ff4560', '#775dd0', '#00e396', '#008ffb', '#feb019'],
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.3,
          opacityTo: 0.4,
          stops: [0, 90, 100],
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      xaxis: {
        type: 'category',
        categories: [
          '2018',
          '2019',
          '2020',
          '2021',
          '2022',
          '2023',
          '2024',
        ],
      },
      tooltip: {
        x: {
          format: 'yyyy', // Tooltip to display year only
        },
        y: {
          formatter: function (value) {
            return '₱' + value.toLocaleString();
          }
        }
      },
    },
  });

  return (
    <Chart
      options={data.options}
      series={data.series}
      type={data.options.chart.type}
      height={data.options.chart.height}
    />
  );
}

export default ReportCharts;
