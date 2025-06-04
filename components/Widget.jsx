import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
// import axios from "axios";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";

import "./widget.css";
import useFetch from "../hooks/useFetch";
import { decryptPWord, MyServerAPIHost } from "../functions/ChrisFunctions";
// import { getType } from "@reduxjs/toolkit";
import { IoBoatSharp, IoImagesOutline, IoRefreshCircleOutline } from "react-icons/io5";
// import { FaPesoSign} from "react-icons/fa";
// import { TbCurrencyPeso } from "react-icons/tb";
// import { FaPesoSign } from "react-icons/fa6";

// let IOPesoSign ='₱';
let urlAPI = MyServerAPIHost();
// let urlAPI = MyServerAPIHost();


const Widget = ({ type }) => {
  let Navigate = useNavigate();
  let gAccessToken = decryptPWord(sessionStorage.getItem("accessToken"));
  let viewData;
  // const [datUsers, setDataUsers] = useState([]);
  //  const [datList, setDataList] = useState([]);

  // const [usersTotal, setUsersTotal] = useState(0);
  // const [vesselsTotal, setvesselsTotal] = useState(0);


  // const { data, loading, error } = useFetch(urlAPI +"/"+ type);
  const { data, loading, error } = useFetch(urlAPI +"/"+ getType(type),gAccessToken);
  // console.log(type +' data: ',data)
  let amount = data.length;
  let diff = amount ? amount/100: 0;
   
  
  
  useEffect(() => {
    // setDataList(data);
    // getUsers();
    // let amount = data.length;
    // let diff = data.length;
    
  }, [data]);

  function getType(tType) {
    if (tType==='users') {
        // alert(tType)
        // userAccounts
        return 'userAccounts'
    } else if (tType==='admin') {    
        return 'userAccounts'
    } else if (tType==='routes') {
        return 'routesProfile'
    } else {
        return type;
    }
  }
  

  
  // const getUsers = async () => {
  //   const response = await axios.get(urlAPI + "/users");
  //   // setUsers(response.data);
  //       // setDataUsers(data);
  //       amount=response.data.length;
  //       diff=response.data.length/100;

  //       // alert(data.length)

  // }



  function NavLink(tNavLink) {
    Navigate(tNavLink);
    // if (type==='user') {
    //   alert(type)
    // }
  }

  
  //temporary
  


  switch (type) {
    case "users":
      // amount = 1;
      // diff = 10;

      viewData = {
        title: "Applicant",
        isMoney: false,
        linkLabel: "See all applicant",
        linkNav:"/UserAccounts",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "admin":  
      // amount = 3;
      // diff = 3;
      viewData = {
        title: "Admin",
        isMoney: false,
        linkLabel: "View all admin",
        linkNav:"/UserAccounts",
        icon: (
          <IoBoatSharp
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              // color: "goldenrod",
              color: "crimson",
            }}
          />
        ),
      };
      break;
    case "routes":  
      viewData = {
        title: "Routes",
        isMoney: false,
        linkLabel: "View all routes",
        linkNav: '/routesprofile' ,
        icon: (
          <IoRefreshCircleOutline
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "crimson",
            }}
          />
        ),
      };
      break;  
    case "fareCodes":  
      viewData = {
        title: "Fare Codes",
        isMoney: false,
        linkLabel: "View all Fare Codes",
        linkNav: '/fareCodes' ,
        icon: (
          <IoBoatSharp
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "crimson",
            }}
          />
        ),
      };
      break;      
    case "routeFares":  
      viewData = {
        title: "Route Fares",
        isMoney: false,
        linkLabel: "View all route fares",
        linkNav: '/routeFares' ,
        icon: (
          <IoImagesOutline
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "crimson",
            }}
          /> 
        ),
      };
      break;    
    case "routeScheduling":  
      viewData = {
        title: "Route Scheduling",
        isMoney: false,
        linkLabel: "View all route scheduling",
        linkNav: '/routeScheduling' ,
        icon: (
          <IoRefreshCircleOutline
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "crimson",
            }}
          />
        ),
      };
      break;      

    case "order":
      // amount = 50;
      // diff = 100;
      viewData = {
        title: "Booking",
        isMoney: false,
        linkLabel: "View all booking",
        linkNav: 'bookingTotal' ,
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      viewData = {
        title: "EARNINGS ", //show this to ceo/managers
        isMoney: true,
        linkLabel: "View net earnings",
        linkNav: '/userlist' ,
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      viewData = {
        title: "BALANCE",
        isMoney: true,
        linkLabel: "See details",
        linkNav: 'balanceTotal' ,
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
    {/* <div className="card"> */}
      {/* {loading ? <p>loading </p>:''}
      {error ? <p>error </p>:''} */}
      <div className="left">
        <span className="title">{viewData.title}</span>
        <span className="counter">
          {viewData.isMoney && <span>&#8369;</span>} {amount}
        </span>
        <span className="link" onClick={() => NavLink(viewData.linkNav) } >{viewData.linkLabel}</span>
      </div>
      <div className="right" style={{fontSize:'12px'}}>
        {/* <div className="percentage positive"> */}
        <div className={diff === 0 ? "percentage positive" : diff < 0 ? "percentage-negative" : "percentage-positive"}>
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {viewData.icon}
      </div>
    </div>
  );
};

export default Widget;

 