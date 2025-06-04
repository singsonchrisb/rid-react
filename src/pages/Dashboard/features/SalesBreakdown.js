import { Cell, Pie, PieChart } from "recharts";
import { Icon } from "semantic-ui-react";
import { getAllSalesToday } from "../../../firebase/queries";
import { useEffect, useState } from "react";
import "../Dashboard.css";

export const SalesBreakdown = () => {
  const data = [
    { name: "Branch 1", value: 110 },
    { name: "Branch 2", value: 240 },
    { name: "Branch 3", value: 260 },
    { name: "Branch 4", value: 340 },
  ];

  const [salesTodayPie, setSalesTodayPie] = useState([]);

  useEffect(() => {
    let subscribe = true;

    const onUpdate = async (query) => {
      if (subscribe) {
        let data = [];
        query.forEach((docs) => {
          if (docs.data().payment.type.includes("layaway")) {
            data.push({
              name: docs.data().branch.branchName,
              value: docs.data().layAwayDetails.downPayment,
            });
          } else {
            data.push({
              name: docs.data().branch.branchName,
              value: docs.data().totalAmount,
            });
          }
        });
        // Merge duplicates and sum up values
        const mergedData = mergeDuplicates(data);

        setSalesTodayPie(mergedData);
      }
    };

    const fetchData = async () => {
      await getAllSalesToday(onUpdate);
    };

    fetchData();

    return () => {
      subscribe = false;
    };
  }, []);

  // Function to merge duplicates and sum up values
  const mergeDuplicates = (dataArray) => {
    const mergedMap = new Map();

    dataArray.forEach((entry) => {
      if (mergedMap.has(entry.name)) {
        const existingValue = mergedMap.get(entry.name);
        mergedMap.set(entry.name, existingValue + entry.value);
      } else {
        mergedMap.set(entry.name, entry.value);
      }
    });

    const mergedData = Array.from(mergedMap, ([name, value]) => ({
      name,
      value,
    }));

    return mergedData;
  };

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const RADIAN = Math.PI / 180;

  const COLORS = ["#1ad598", "#f3654a", "#f9af1a", "#3fc6e4"];

  return (
    <div className="sales-breakdown">
      <div className="text-container">
        <p className="label">Total Sales Breakdown Today</p>
        <PieChart
          width={800}
          height={300}
          //   onMouseEnter={onPieEnter}
        >
          <Pie
            data={salesTodayPie}
            cx={113}
            cy={150}
            innerRadius={40}
            outerRadius={90}
            fill="#8884d8"
            dataKey="value"
            labelLine={false}
            label={renderCustomizedLabel}
          >
            {salesTodayPie.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
        <div className="breakdown-details-container">
          {salesTodayPie.length > 0 ? (
            <>
              {salesTodayPie.map((data, index) => (
                <p key={index}>
                  <Icon name="square" className="icon" />
                  <span className="label1">{data.name}</span>
                  <span className="label2">{data.value}</span>
                </p>
              ))}
            </>
          ) : (
            <>
              <p className="label">No Data Available</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
