import { Icon } from "semantic-ui-react";
import { currency } from "../../../functions/currency";
import { percentage } from "../../../functions/percentage";
import {
  getAllSalesToday,
  getAllSalesLastYear,
} from "../../../firebase/queries";
import { useEffect, useState } from "react";

export const TotalSales = ({ report }) => {
  const [salesToday, setSalesToday] = useState();
  const [salesLastYear, setSalesLastYear] = useState();

  useEffect(() => {
    let subscribe = true;

    const onUpdate = async (query) => {
      if (subscribe) {
        let data = [];
        let totalSalesToday = 0;
        query.forEach((docs) => {
          data.push(docs.data());
          if (docs.data().payment.type.includes("layaway")) {
            totalSalesToday =
              totalSalesToday + docs.data().layAwayDetails.downPayment;
          } else {
            totalSalesToday = totalSalesToday + docs.data().totalAmount;
          }
        });
        setSalesToday(totalSalesToday);
      }
    };

    const onUpdateLY = async (query) => {
      if (subscribe) {
        let data = [];
        let totalSalesLastYear = 0;
        query.forEach((docs) => {
          data.push(docs.data());
          totalSalesLastYear = totalSalesLastYear + docs.data().totalAmount;
        });
        console.log(data);
        setSalesLastYear(totalSalesLastYear);
      }
    };

    const fetchData = async () => {
      await getAllSalesToday(onUpdate);
      await getAllSalesLastYear(onUpdateLY);
    };

    fetchData();

    return () => {
      subscribe = false;
    };
  }, []);
  return (
    <div className="total-sales">
      <div className="icon-container">
        <Icon name="user" className="icon" />
      </div>
      <div className="text-container">
        <p className="label">Total Sales Today</p>
        <span className="label2">PHP </span>
        <span className="total-num"> {currency(salesToday)}</span>
        <p className="label3">Total Sales Last Year</p>
        <span className="label4">PHP</span>
        <span className="total-num1">{currency(salesLastYear)}</span>
        <span className="percent">{percentage(salesToday, salesLastYear)}</span>
      </div>
    </div>
  );
};
