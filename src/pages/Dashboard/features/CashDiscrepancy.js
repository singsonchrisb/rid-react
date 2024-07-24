import { Icon } from "semantic-ui-react";
import { currency } from "../../../functions/currency";
import { percentage } from "../../../functions/percentage";
import {
  getTotalSales,
  getFundPrep,
  getWithdrawalsToday,
  getTotalSalesYesterday,
  getFundPrepYesterday,
  getWithdrawalsYesterday,
} from "../../../firebase/queries";
import { useEffect, useState } from "react";

export const CashDiscrepancy = ({ report }) => {
  const [totalSales, setTotalSales] = useState();
  const [totalFunds, setTotalFunds] = useState();
  const [totalWithdrawals, setTotalWithdrawals] = useState();
  const [totalSalesY, setTotalSalesY] = useState();
  const [totalFundsY, setTotalFundsY] = useState();
  const [totalWithdrawalsY, setTotalWithdrawalsY] = useState();

  useEffect(() => {
    let subscribe = true;

    const onUpdateSales = async (query) => {
      if (subscribe) {
        let num = 0;
        let data = [];
        query.forEach((docs) => {
          data.push(docs.data());
          if (docs.data().payment.type.includes("cash")) {
            num = num + docs.data().totalAmount;
            console.log(num);
          }

          if (docs.data().payment.type.includes("layaway")) {
            num = num + docs.data().layAwayDetails.downPayment;
            console.log(num);
          }
        });
        console.log(data);
        console.log(num);
        setTotalSales(num);
      }
    };

    const onUpdateFund = async (query) => {
      if (subscribe) {
        let num = 0;
        query.forEach((docs) => {
          num = num + docs.data().grandTotal;
        });
        setTotalFunds(num);
      }
    };

    const onUpdateWithdrawal = async (query) => {
      if (subscribe) {
        let num = 0;
        query.forEach((docs) => {
          num = num + docs.data().total;
        });
        setTotalWithdrawals(num);
      }
    };

    const onUpdateSalesY = async (query) => {
      if (subscribe) {
        let num = 0;
        query.forEach((docs) => {
          if (docs.data().payment.type.includes("cash")) {
            num = num + docs.data().totalAmount;
          }

          if (docs.data().payment.type.includes("layaway")) {
            num = num + docs.data().layAwayDetails.downPayment;
          }
        });
        setTotalSalesY(num);
      }
    };

    const onUpdateFundY = async (query) => {
      if (subscribe) {
        let num = 0;
        query.forEach((docs) => {
          num = num + docs.data().grandTotal;
        });
        setTotalFundsY(num);
      }
    };

    const onUpdateWithdrawalY = async (query) => {
      if (subscribe) {
        let num = 0;
        query.forEach((docs) => {
          num = num + docs.data().total;
        });
        setTotalWithdrawalsY(num);
      }
    };

    const fetchData = async () => {
      await getTotalSales(onUpdateSales);
      await getFundPrep(onUpdateFund);
      await getWithdrawalsToday(onUpdateWithdrawal);
      await getTotalSalesYesterday(onUpdateSalesY);
      await getFundPrepYesterday(onUpdateFundY);
      await getWithdrawalsYesterday(onUpdateWithdrawalY);
    };

    fetchData();

    return () => {
      subscribe = false;
    };
  }, []);

  useEffect(() => {
    console.log(totalSales);
  }, [totalFunds, totalSales, totalWithdrawals]);

  return (
    <div className="cash-discrep">
      <div className="icon-container">
        <Icon name="money" className="icon" />
      </div>
      <div className="text-container">
        <p className="label">Cash Discrepancy Today</p>
        <span className="label2">PHP </span>
        <span className="total-num">
          {currency(totalFunds + totalSales - totalWithdrawals)}
        </span>
        <p className="label3">Total Cash Discrepancy Yesterday</p>
        <span className="label4">PHP</span>
        <span className="total-num1">
          {currency(totalFundsY + totalSalesY - totalWithdrawalsY)}
        </span>
        <span className="percent">
          {percentage(
            totalFunds + totalSales - totalWithdrawals,
            totalFundsY + totalSalesY - totalWithdrawalsY
          )}
        </span>
      </div>
    </div>
  );
};
