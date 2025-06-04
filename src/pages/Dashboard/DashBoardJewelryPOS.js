//React , useState
import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// Packages
import { Grid, Segment } from "semantic-ui-react";

// CSS
import "./Dashboard.css";

// Components
import { HeaderDashboard } from "./features/HeaderDashboard";
import { TotalSales } from "./features/TotalSales";
import { CashDiscrepancy } from "./features/CashDiscrepancy";
import { SalesBreakdown } from "./features/SalesBreakdown";
// import { HistoricalSales } from "./features/HistoricalSales";
import { Approvals } from "./features/Approvals";
// import SidebarMenu from "../../components/SidebarMenu";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { setReport } from "./dashboardSlice";

//Queries , getAccountType
import { getReport } from "../../firebase/queries";
import { decryptPWord } from "../Functions/MyFunctions";
// import { gd } from "date-fns/locale";

// import { useAuth } from "../../context/AuthContext";
// import { useHistory } from "react-router-dom";
// import { FaWindowClose } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  // let gLoginName="Chris";
  let gLoginName =  decryptPWord(sessionStorage.getItem('loginName'));
  let gDashboard =  Number(decryptPWord(sessionStorage.getItem('dashb')));
  // let navigate = useNavigate();

  const report = useSelector((state) => state.dashboard.report);

  // alert(gDashboard)

  const dispatch = useDispatch();
  // const history = useNavigate(); // useHistory();
  // const const Navigate = useNavigate();Navigate = useNavigate(); // useHistory();


  // const { currentUser } = useAuth();


//   useEffect(() => {
//     if (gDashboard===0) {
       
//     }
//  }, []);
// useEffect(() => {
//   if (gDashboard===0) {
//     navigate('/ProjectDashBoard')
//   }
// }, []);

  useEffect(() => {
    const onDataUpdate = async (query) => {
      await dispatch(setReport(query.data()));
    };

    getReport(onDataUpdate);

    // getAccountType(currentUser.uid).then((doc) => {
    //   if (doc.exists) {
    //     if (doc.data().type === "Funding Preparation") {
    //       history.push("/fundingwithdrawal");
    //     }
    //   }
    // });
  }, [dispatch]);


  // const handleWindowClose = () => {
  //   Navigate(-1);
  // }

  function overViewDashboard() {
    return (
      <>
        <Grid className="overview">
          <Grid.Row>
            <Grid.Column style={{ width: "auto" }}>
              <TotalSales report={report} />
              <CashDiscrepancy report={report} />
            </Grid.Column>

            <Grid.Column style={{ width: "auto" }}>
              <SalesBreakdown />
            </Grid.Column>
            {/* <Grid.Column style={{ width: "auto", height: "20px" }}> */}
            <Grid.Column style={{ width: "auto" }}>
              <Approvals />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>{/* <HistoricalSales /> */}</Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    )
  }

  function overViewNone() { 
     return (
      <>
        <h1>NO Access on Dashboard</h1>
      </>
     )
  }

  return (
    <>
    

      <Segment className="dashboard">
        <HeaderDashboard name={gLoginName} />
        <div className="header">
            <br />
            <span className="greet-text" >
                Here's an overview of the ORO Jewelry POS DashBoard
            </span>
        </div>
        { gDashboard ===1 ? overViewDashboard() : overViewNone() }
       

      </Segment>
      {/* <button className="btn-neo1 btn-neo1-dark" style={{height:'40px', width:'100%' }} onClick={() => handleWindowClose()} >Back</button>  */}
    </>
  );
};

export default Dashboard;
