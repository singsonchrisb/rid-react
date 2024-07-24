import { Area, AreaChart, Tooltip, XAxis } from "recharts";
import { Button, Icon } from "semantic-ui-react";

export const HistoricalSales = () => {
  const dataArea = [
    {
      name: " ",
      new: 5000,
      "on-going": 5000,
      certified: 5000,
    },
    {
      name: "Jan",
      new: 4000,
      "on-going": 2400,
      certified: 2400,
    },
    {
      name: "Feb",
      new: 3000,
      "on-going": 1398,
      certified: 2210,
    },
    {
      name: "Mar",
      new: 2000,
      "on-going": 9800,
      certified: 2290,
    },
    {
      name: "Apr",
      new: 2780,
      "on-going": 3908,
      certified: 2000,
    },
    {
      name: "May",
      new: 1890,
      "on-going": 4800,
      certified: 2181,
    },
    {
      name: "Jun",
      new: 2390,
      "on-going": 3800,
      certified: 2500,
    },
    {
      name: "Jul",
      new: 2490,
      "on-going": 4300,
      certified: 2100,
    },
    {
      name: "Aug",
      new: 5490,
      "on-going": 4600,
      certified: 2200,
    },
    {
      name: "Sep",
      new: 3490,
      "on-going": 4000,
      certified: 2300,
    },
    {
      name: "Oct",
      new: 2590,
      "on-going": 4800,
      certified: 2600,
    },
    {
      name: "Nov",
      new: 1450,
      "on-going": 4100,
      certified: 4100,
    },
    {
      name: "Dec",
      new: 2750,
      "on-going": 4500,
      certified: 2900,
    },
  ];
  return (
    <div className="historical-sales">
      <div className="content">
        <p className="label">
          Historical Sales
          <Button className="chart-button1">Year</Button>
          <Button className="chart-button">Month</Button>
          <Button className="chart-button">Week</Button>
          <Button className="chart-button">Day</Button>
        </p>
        <p className="label1">Jan. 2021 - Dec. 2021</p>
        <p>
          <Icon name="square" className="icon" />
          <span className="label3">New</span>
          <Icon name="square" className="icon1" />
          <span className="label3">On-Going</span>
          <Icon name="square" className="icon2" />
          <span className="label3">Certified</span>
        </p>
        <AreaChart
          width={550}
          height={250}
          data={dataArea}
          className="area-chart"
        >
          <XAxis dataKey="name" />
          <Tooltip />
          <Area type="monotone" dataKey="new" stroke="#f3654a" fill="#f3654a" />
          <Area
            type="monotone"
            dataKey="on-going"
            stroke="#f9af1a"
            fill="#f9af1a"
          />
          <Area
            type="monotone"
            dataKey="certified"
            stroke="#3fc6e4"
            fill="#3fc6e4"
          />
        </AreaChart>
      </div>
    </div>
  );
};
