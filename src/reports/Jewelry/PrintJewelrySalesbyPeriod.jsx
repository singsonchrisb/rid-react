import React, { useState, useEffect, useRef }  from 'react';
// useEffect,
// import { Card, Row } from 'react-bootstrap';

import { Card, Grid} from '@mui/material';
import moment from 'moment';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { GetMyHeaders } from '../../pages/Functions/GetAPIToken';
import { MyServerHostJava,GetDepartmentList, GetItemBranch, getYear, getMonth, getDay, formatNumber, getFirstWord, decryptPWord }  from '../../pages/Functions/MyFunctions';
// import '../../styles/Print.css';
import useEscapeKey from '../../hooks/useEscapeKey'; // Adjust the path as needed


//  import testDat from "./jsales.json";
//  let testData = testDat;

 let dbServerHostJava = MyServerHostJava();
 
 let reportTitle= "Sales Report [Branch J1]";
 let gNoData2Print=false;
 let sv_ColumnHeader="";
 let gPageCtr=0;
 let ctrDetail=0;
 let gCashSales=0;
 let gOthersSales=0;
 let gLASales=0;
 let gNetSales=0;
 let gBeginningBalance=0;
 let gFunding=0;
 let gActual=0;
 let gOverShort=0;
 let gEndingBalance=0;
//  let gTotalPaymentMethod=0;
 let gTotalNonCashPayment=0;
 let gTotalWithdrawal=0;
 let gCashierName="";
 let strGreaterthan=">>>"
 
 let classSummary = {
     SummaryLabel: { marginLeft:'20px',width:'45px'},
     SummaryField: {textAlign: 'right',width:'55px', fontSize: '10.5px' , fontWeight: 'bold'},
     SummaryOverShort: {textAlign: 'right',width:'55px', fontSize: '10.5px' , fontWeight: 'bold', borderBottom: '3px double gray' },
     endingBalanceField: {textAlign: 'right',width:'55px', fontSize: '10.5px' , fontWeight: 'bold', borderTop: '3px double gray'},
     laSumField: { marginLeft:'10px', textAlign: 'right',width:'45px', fontWeight: 'bold', borderBottom: '1px solid'},
     SummaryTotalLabel: { marginLeft:'0px',width:'125px', marginTop:'-20px'},
     SummaryTotalNetsales: { marginLeft:'30px',width:'95px'},
     };
 let cardStyle = {width:'215px', border:'none', backgroundColor: 'white' } ;
 


const PrintJewelrySales = () => {
  let gAccountType = Number(decryptPWord(sessionStorage.getItem('accountType')));
  const Navigate = useNavigate();
  const componentRef = useRef();
  const selBranchRef = useRef(null);
  const dateFromRef = useRef(null);
  const dateToRef = useRef(null);
  const previewRef = useRef(null);

  // var gAssignBranch = sessionStorage.getItem('assignBranch');
  var numBranch = sessionStorage.getItem('assignBranch');
  var gAssignBranch = numBranch ? "J"+numBranch:"";
  var gAcceesBranch ="";
  var gAccessToken="";
  

  gAccessToken = decryptPWord(sessionStorage.getItem("accessToken"));
  gAcceesBranch = gAssignBranch ? gAssignBranch:GetItemBranch();
       
  let  curr = new Date();
  // curr.setDate(curr.getDate() + 3);
  let curDate = curr.toISOString().substr(0,10);
  //  const [datTable, setDataTable] = useState(testData.data);
   const [datTable, setDataTable] = useState([]);  // data array for searching, pgnation

  // const [sorted, setSorted] = useState({ sorted: "name", reversed: false });

//   const [showDiscrepancy, setShowDiscrepancy] = useState(false);
  
  // var startdate = moment(curDate).subtract(1, "days").format("MM/DD/YYYY");
  
  // var startdate = moment();
  // startdate = startdate.subtract(1, "days");
  var startdate = moment(curr).format("YYYY-MM-DD");
  // var startdate = moment().subtract(1, "days").format("YYYY-MM-DD");
  

  // var test1 = moment('2024-02-01').format("YYYY-MM-DD");
  // var test2 = moment(curr).format("YYYY-MM-DD");
  
  // const date1 = moment('2024-02-01');
  // // const date2 = moment('2024-02-06');
  // const date2 = test2
  // // Calculate the difference
  // const difference = date2.diff(date1, 'days');

  
  

  // alert(startdate +', '+ curDate )
  
  const [dateFrom, setDateFrom] = useState(startdate);
  const [dateTo, setDateTo] = useState(curDate);

  const optDepartment = GetDepartmentList();
  const [selBranch, setSelBranch] = useState(gAssignBranch ? gAssignBranch : gAcceesBranch ? gAcceesBranch : 'J1'); 
  

  useEffect(() => {
      // RefreshData(false);
      //  fetchData('fpayroll20240131');
      //  fetchData('');
      //  getPayrollListData();
      
      loadSalesData(selBranch);
  }, []);

  // function testDate() {
  //   alert(difference)
  //   // alert("test1: " + test1  + ", test2: " + test2 + ", test3: " + test3)
  // }

  useEscapeKey(() => {
        Navigate("/"); // Navigate back to main page
  });

  
  const RefreshData = async (tTrue) => { 
    // toast.info("Processing data...");
       setDataTable('');
       if (tTrue===true) {
          toast.success("Data refreshed successfully.");
       }
      sv_ColumnHeader="";
      refreshBranch(selBranch ? selBranch : gAcceesBranch );
        //  console.log('datTable0:',datTable)
      loadSalesData(selBranch);
      //  alert(gAccountType)
  }

  const refreshBranch = (tBranch) => {
    reportTitle = "Sales Report [Branch " + tBranch.substring(1) + "]";
  }
  // function showDate(tDate) {
  //     if (!tDate || tDate===undefined) {
  //         return 'invalid date show' ;
  //     } else {
  //         return getMonth(tDate,'MMM')  + ". " + getDay(tDate,'DD') + ", " + getYear(tDate,'YYYY') ;            
  //     }
  // }

  function showForDate(tDate) {
    if (!tDate || tDate===undefined) {
        return 'Invalid date for ' + tDate ;
    } else {
      return "For: " + getMonth(tDate,'MMM')  + ". " + getDay(tDate,'DD') + ", " + getYear(tDate,'YYYY')  + "     [" + getDay(tDate,'dddd') + "]";            
    }
  }

  const handPrinCheck = async () => {
      //    if (sUsrAg.indexOf("Chrome") > -1) {
      //        sBrowser = "Google Chrome or Chromium";
      //    } else {
      //        sBrowser = "unknown";
      //        alert ("please use Chrome")
      //    }
      //    alert("You are using: " + sBrowser);

       RefreshData(false);

      //  alert('Make it sure displayed data on screen is correct...');
       

       if (selBranch===null || selBranch==='') {
          toast.error("Please select the branch.");
          alert("Please select the branch.")  ;
          return false;
       }
       if(gNoData2Print===false) {
          toast.error("No data to print!");
          return false;
       } else {
           handlePrint(); 
       }
  }
  
      // const handlePrint = useReactToPrint({
      //     content: () => componentRef.current,
      //     pageStyle: `
      //     @page {
      //         // size: auto;
      //         size: 8.5in 11in; /* Width x Height for short bond paper */
      //         margin: 11mm 11mm 11mm 11mm;
      //         // margin: 0;
      //     }`,
      //     documentTitle: `ORO BUSINESS GROUP`,
      // });
      //   // `@top-right selector {
      //   //   content: "Page " counter(page);
      //   // }`, 
      const handlePrint = useReactToPrint({ 
            content: () => componentRef.current,
            pageStyle: `
              @page {
                size: 8.5in 11in; /* Width x Height for short bond paper */
                margin: 11mm 11mm 11mm 11mm;
                @top-right {
                  content: counter(page);
                  float: right;
                }
              }
              @media print {
                body {
                  margin: 11mm 11mm 11mm 11mm;
                }
                .print-page {
                  page-break-after: always; /* Trigger page eject at the end of each printed page */
                }
                .print-content {
                  page-break-after: always;
                  margin-top: 30mm; /* Add margin to leave space for header */
                }
                .page-counter {
                  display: none; /* Hide default page counter at the bottom */
                }
                .top-page-counter {
                  position: fixed;
                  top: 10mm; /* Adjust top position as needed */
                  right: 10mm; /* Adjust right position as needed */
                  font-size: 12px;
                  color: #999;
                }
              }
            `,
          });
  
      const handleEnter = (event) => {
          if (event.key.toLowerCase() === "enter") {
              // alert("pawn ticket,  "+ event.target.name);
              if (event.target.name==="selbranch") {
                //   showDiscrepancyRef.current.focus();
                  return true;
                  
              } else if (event.target.name==='datefrom') {    
                  RefreshData(false);
                //   classRef.current.focus();
                  return true;
              // } else if (event.target.name==='selclass') {    
              //     RefreshData(false);
              //   //   showDiscrepancyRef.current.focus();
              //     return true;    
              }    
          } else if (event.keyCode===112) {
              // alert("F1-a");
                event.preventDefault();
                return false;
          } else if (event.keyCode >=113 && event.keyCode <=123) {
                  // Turn off Function key F2 to F12
                event.preventDefault();      
          }
      }            
      
      const handleChangeDepartment = event => {
          // console.log(event.target.value);
          // alert(event.target.value);
          if (event.target.value==='null' || event.target.value===''  ) {
              toast.error("You did not select a branch...");
              return false;
          } else {
              // toast.success("Setting branch to  " + event.target.value  + "...");
              
              //  alert(event.target.value);
              // alert ( "Set branch to  " + event.target.value  + "...");
              // if ( window.confirm("Process to set branch to  " + event.target.value  + " ?") ) {
                  gNoData2Print=false;
                  setSelBranch(event.target.value);
                  refreshBranch(event.target.value);
                  gAcceesBranch = event.target.value;
                  sessionStorage.setItem("accessBranch",gAcceesBranch);
                  // loadData(event.target.value);
                //   RefreshData(false);
                  // sortByName();
              // }
          }
        };


  const handleInputChange = (e) => {
      if (e.target.name==="datefrom") {
          setDateFrom(e.target.value) 
          // refreshFromDate(e.target.value);
      } else if (e.target.name==="dateto") {
        //   alert(e.target.name)
          setDateTo(e.target.value) 
          // refreshToDate(e.target.value);
      }
      gNoData2Print=false;
       
  };      
  
  // async function fetchData(tableName) {
  //   try {
  //     // const url = new URL("http://localhost:5000/payrollList/getPayrollList");
  //     // const url = new URL("https://us-central1-oro-business-group.cloudfunctions.net/app/payrollList/getPayrollListWithToken");
  //     const url = new URL("http://localhost:5000/payrollList/getPayrollListWithToken");
  //     url.searchParams.append('tableName', tableName);
  //     const headers = GetMyHeaders(gAccessToken); // Assuming GetMyHeaders is a function returning headers
  //     const response = await fetch(url.toString(), {
  //       method: 'GET',
  //       headers: headers
  //     });

  //     // const response = await fetch(url.toString());
      
  //     if (!response.ok || response.status !== 200) {
  //       throw new Error("Failed to fetch data! " + response.status);
  //     }
  //     console.log('response',response)
  //     const data = await response.json();
  //     console.log("Payroll list testing:", data);
  //     // Process the fetched data as needed
  //   } catch (error) {
  //     console.error("Error fetching data:", error.message);
  //   }
  // }

  
//   const getPayrollListData = async (tableName) => {
//     // let tWhere ="?from=" + dateFrom +"&to=" + dateTo
//     console.log('payroll data ')
//     // http://localhost:5000/payroll/employees/getEmployeeList
//     try {
//         // https://us-central1-oro-business-group.cloudfunctions.net/app/payrollList/getPayrollList
//         // await fetch("https://us-central1-oro-business-group.cloudfunctions.net/app/payrollList/getPayrollList/?tableName=fpayroll20201115", {                
//         await fetch("/payrollList/getPayrollListWithToken/?tableName=fpayroll20201115", {                
//         method: 'GET',
//         headers: GetMyHeaders(gAccessToken),
//         })
//         .then((response) => response.json() )
//         .then((json) => {
//               console.log('payroll data1', json.data)
//               console.log('payroll data2 ', json.status)

//               // setDataTable(json.data);
//              if (Number(json.status) === 200) {
//                   // alert("API Test Good!");
//              } else {
//                  toast.error("API Error: " + json.status +","+ json.error);
//                   // alert("API Error: "   + json.error );
//              }
//         })
//     } catch (err) {
//         toast.error("NO data to load,  " + err );
//     }
//     // console.log('sales data2 ', datTable)
// }


  const loadSalesData = async (tBranch) => {
      // const results = [{value: 'ALL', text: 'All' }];
      // ?from=11-20-2023&to=11-22-2023
      // tBranch='J2'
      // setProduct([{karat: '0', value: '0'}]);
      // setDataTable({
      //   "refDate": "2023-11-22",
      //   "cashier": "Gerard",
      // })
      // let tWhere ="?from=2023-11-20&to=2023-11-22";
      
      let tWhere ="?from=" + dateFrom +"&to=" + dateTo
      // alert(dateFrom + ", " + dateTo)
      // alert(tWhere)
      try {
         
          // where group like 'DIA'/GOLD'
          // await fetch(dbServerHostJava + "/api/j/dailySales/" + tBranch + tWhere, {                
          await fetch(dbServerHostJava + "/api/j/report/dailySales/" + tBranch + tWhere, {                
          // await fetch(dbServerHostJava + "/api/j/dailySales/J2?from=11-20-2023&to=11-22-2023" , {                
          method: 'GET',
          headers: GetMyHeaders(gAccessToken),
          })
          .then((response) => response.json() )
          .then((json) => {
              // console.log('sales data0 ', json)
                // console.log('sales data ', json.data)
                setDataTable(json.data);
              // setDataTable(testDat.data);
               gNoData2Print=true;
               if (Number(json.status) !== 200) {
                  gNoData2Print=false;
                  toast.error("API error in sales: "  + json.status +", " + (json.errors===undefined ? json.error :json.errors) );
                  // alert("API Error: " + json.errors );
               }
          })
      } catch (err) {
          toast.error("No sales data to load: " + err );
      }
      // console.log('sales data2 ', datTable)
  }

   
  function recompNetSales(dtReadSub) {

      if (dtReadSub.header==='AUCTION' || dtReadSub.header==='COMMERCIAL' ) {
          gCashSales = gCashSales + Number(dtReadSub?.cashPrice);   
      } else if (dtReadSub.header==='LAYAWAY') {  
          gLASales = gLASales + Number(dtReadSub?.laPayment);
      } else {
          // gOthersSales = gOthersSales + Number(dtReadSub?.cashPrice);   
          gCashSales = gCashSales + Number(dtReadSub?.cashPrice);   
        
      }
      
      gNetSales = gCashSales + gLASales ;
      
      if(gCashierName.length >0 && dtReadSub.salesClerk.length >0) {
         let sClerk=getFirstWord(dtReadSub.salesClerk);
         let indexOffStr =gCashierName.indexOf(sClerk);
         if (indexOffStr ===-1) {
          gCashierName = gCashierName +"/"+ sClerk;
         }
         

      } else {
         gCashierName = dtReadSub.salesClerk;
      }
  }

  // function recompWithdrawal(nAmount) {
  //     gTotalWithdrawal = (gTotalWithdrawal + nAmount)
  // }

  function recompNonCashPayments(nAmount) {
      gTotalNonCashPayment = (gTotalNonCashPayment + nAmount)
  }

  function recompEndingBlaance() {
      gEndingBalance = gNetSales - (gTotalWithdrawal + gTotalNonCashPayment); //-200
      gActual =  0;
      gOverShort = (gEndingBalance * -1) ;
  }

  function pageCount() {
    gPageCtr =gPageCtr +1
  }

  function PrintHeader() {
      return (
          
          <div>
              {/* {pageCount()} */}
              {/* <br></br> */}
              <label style={{fontSize: '20px'}} >JEWELRY</label>
              {/* <span style={{marginLeft: '10px',fontSize: '14px'}}>Period ({showDate(dateFrom) + ' to ' + showDate(dateTo)})</span> */}
              <br></br>
              <label style={{fontSize: '15px'}}>{reportTitle} </label>
              {/* <span>{gPageCtr}</span>  */}
          </div>
      )
  }  

  function checkColumnHeader(svColHeader,index) {
  if (sv_ColumnHeader!==svColHeader) {
      sv_ColumnHeader=svColHeader;
      ctrDetail=0
      // alert(svheader)
      let colHeader=svColHeader; //'LAY-AWAY';
      if (svColHeader==='AUCTION') {
          colHeader='JO';
      } else if (svColHeader==='COMMERCIAL'){
           colHeader='JN';
      }

      return ( 
        <div>
          {index >0 ?
            <div style={{marginTop:'5px', borderTop:  '1px dotted gray'}}></div>
            : ""
          }
          <label style={{fontSize: '12px', fontWeight: 'bold' }}>{colHeader} </label>
        </div>
    );
  } 
  ctrDetail++
  return ""
  }

  function PrintSalesDetails(dtReadSub,dtCtr) {
    
    gCashSales=0;
    gLASales=0;
    gOthersSales=0;
    gCashierName="";
      return (
          <div>
            
              {/* <label style={{marginTop:'5px', textAlign:'left',fontSize:'11px'}}>{showForDate(datTable[dtCtr].repDate)}</label> */}
              {/* <h6 style={{textAlign:'left',fontSize: '12px'}}>{showForDate(dtReadSub.refDate)}</h6> */}
              <table className="print-styled-table" style={{fontSize: '9.0px',margin:'0 0 0 0'}} >
                 <thead>
                 {PrintHeader()} 
                 <label style={{marginTop:'2px', textAlign:'left',fontSize:'11px'}}>{showForDate(datTable[dtCtr].repDate)}</label>
                  <div  style={{borderTop: '1px solid gray', borderBottom: '1px solid gray'}}>
                       <div style={{ marginTop:'-3px' }} >
                          {/* <label style={{marginLeft: '48px', textAlign: "left", width: "145px"}}>Class</label>
                          <label style={{marginLeft: '00px',  textAlign: "left", width: "20px"}}>W</label>
                          <label style={{marginLeft: '00px',  textAlign: "left", width: "20px"}}>C</label>
                          <label style={{marginLeft: '00px',  textAlign: "left", width: "50px"}}>Code</label>
                          <label style={{marginLeft: '00px',  textAlign: "left", width: "38px"}}>Supp</label>
                          <label style={{marginLeft: '00px',  textAlign: "left", width: "52px"}}>Tag Pr</label>
                          <label style={{marginLeft: '00px',  textAlign: "left", width: "40px"}}>Cash</label>
                          <label style={{marginLeft: '00px',  textAlign: "left", width: "75px"}}>------- L.A. -------</label>

                          <label style={{marginLeft: '00px',  textAlign: "left", width: "90px"}}>OR#</label>
                          <label style={{marginLeft: '00px',  textAlign: "left", width: "50px"}}>LA#</label>

                          <label style={{textAlign: "left", width: "70px"}}>Sales Clerk</label >
                          <label style={{textAlign: "left", width: "40px"}}>Barcode</label >
                          <label style={{textAlign: "left", width: "100px"}}>Product#</label > */}



                          <th style={{textAlign: "left", width: "45px"}}> </th>
                          <th style={{textAlign: "left", width: "250px"}}>Class</th>
                          <th style={{textAlign: "left", width: "30px"}}>W</th>
                          <th style={{textAlign: "left", width: "30px"}}>C</th>
                          <th style={{textAlign: "left", width: "50px"}}>Code</th>
                          <th style={{textAlign: "left", width: "30px"}}>Supp</th>
                          <th style={{textAlign: "Right", width: "40px"}}>Tag Pr</th>

                          <th style={{textAlign: "Right", width: "50px"}}>Cash</th>
                          <th style={{textAlign: "left",  width: "85px" }}>------- L.A. -------</th>

                          <th style={{textAlign: "left", width: "50px"}}>OR#</th>

                          <th style={{textAlign: "left", width: "40px"}}></th>
                          <th style={{textAlign: "left", width: "40px"}}>LA#</th>

                          <th style={{textAlign: "left", width: "70px"}}>Sales Clerk</th>
                          <th style={{textAlign: "left", width: "40px"}}>Barcode</th>
                          <th style={{textAlign: "left", width: "80px"}}>Product#</th>
                       </div>
                       <br></br>

                       <div style={{ marginTop:'-26px'}} >
                          <th style={{textAlign: "left", width: "40px"}}> </th>
                          <th style={{textAlign: "left", width: "185px"}}>Description</th>
                          <th style={{textAlign: "left", width: "20px"}}></th>
                          <th style={{textAlign: "left", width: "20px"}}></th>
                          <th style={{textAlign: "left", width: "50px"}}></th>
                          <th style={{textAlign: "left", width: "30px"}}></th>
                          <th style={{textAlign: "Right", width: "90px"}}></th>

                          <th style={{textAlign: "Right", width: "55px"}}>Sold</th>
                          <th style={{textAlign: "left",  width: "40px" }}>Payment</th>
                          <th style={{textAlign: "left", width: "35px"}}>Sold</th>

                          <th style={{textAlign: "left", width: "50px"}}>Mark-up</th>

                          <th style={{textAlign: "left", width: "60px"}}>Per Gram</th>
                          <th style={{textAlign: "left", width: "10px"}}></th>

                          <th style={{textAlign: "left", width: "70px"}}></th>
                          <th style={{textAlign: "left", width: "40px"}}></th>
                          <th style={{textAlign: "left", width: "80px"}}></th>
                       </div>
                       <br></br>
                       
                       <div style={{ marginTop:'-28px'}} >
                          <th style={{textAlign: "left", width: "40px"}}> </th>
                          <th style={{textAlign: "left", width: "145px"}}>Entry dt</th>
                          <th style={{textAlign: "left", width: "20px"}}></th>
                          <th style={{textAlign: "left", width: "20px"}}></th>
                          <th style={{textAlign: "left", width: "50px"}}></th>
                          <th style={{textAlign: "left", width: "30px"}}></th>
                          <th style={{textAlign: "Right", width: "30px"}}></th>

                          <th style={{textAlign: "Right", width: "55px"}}></th>
                          <th style={{textAlign: "left",  width: "40px" }}></th>
                          <th style={{textAlign: "left", width: "40px"}}></th>

                          <th style={{textAlign: "left", width: "45px"}}>Discount</th>

                          <th style={{textAlign: "left", width: "60px"}}></th>
                          <th style={{textAlign: "left", width: "10px"}}></th>

                          <th style={{textAlign: "left", width: "70px"}}></th>
                          <th style={{textAlign: "left", width: "40px"}}></th>
                          <th style={{textAlign: "left", width: "80px"}}></th>


                          {/* <th style={{textAlign: "left", width: "430px" }}>Entry dt</th>
                          <th style={{textAlign: "left", width: "145px" }}>Percent</th> */}
                                                    
                          {/* <th style={{textAlign: "center", width: "90px"}}>Supp</th> */}
                      </div>
                      

                   </div>
                  </thead>
                 
                  <tbody>
                    {/* {console.log('dtReadSub0:',dtReadSub) }
                    {console.log('dtReadSub1:',datTable[dtCtr].detail1) } */}
                  {/* <label>{datTable[dtCtr].detail1[0].header} </label> */}
                    {/* dtReadSub.detail1.length >0 && */}
                      {  dtReadSub.map((jsonRec1, index) => (
                          // <div style={{borderBottom: '1px dotted gray'}}>
                          <div>
                            { checkColumnHeader(jsonRec1.header,index)}
                            {recompNetSales(jsonRec1,index)}
                            {/* <label style={{fontSize: '12px', fontWeight: 'bold' }}>{jsonRec1.header} </label> */}
                            <tr style={{border:'none'}} key={ index } >
                                <td style={{textAlign:'left',width:'45px'}}>{jsonRec1.seq + ctrDetail }]</td>
                                <td style={{color:'blue',width:'145px'}} >{ jsonRec1.classCode } </td>
                                <td style={{textAlign:'left', width:"20px"}}>{ jsonRec1.weight } </td>
                                <td style={{textAlign:'left', width:"20px"}}>{ jsonRec1.karat} </td>
                                <td style={{textAlign:'left', width:"50px"}}>{ jsonRec1.priceCode } </td>
                                <td style={{textAlign:'left', width:'30px'}}>{ jsonRec1.supplier } </td>

                                <td style={{textAlign:'right', width:'45px'}} >{ formatNumber(jsonRec1.tagPrice) } </td>
                                <td style={{textAlign:'right', width:'40px'}} >{ formatNumber(jsonRec1.cashPrice) } </td>
                                <td style={{textAlign:'right', width:'45px'}} >{ formatNumber(jsonRec1.laPayment) } </td>
                                <td style={{textAlign:'right', width:'50px'}} >{ formatNumber(jsonRec1.laPrice) } </td>
                                <td style={{textAlign:'left', width:'50px'}}>[{jsonRec1.orNumber}] </td>
                                
                                <td style={{textAlign:'right', width:'32px'}} > </td>  {/* per gram no field column */}
                                
                                <td style={{textAlign:'left',width:'40px'}} >{ jsonRec1.laNumber} </td>

                                <td style={{textAlign:'left',width:'50px'}} >{ getFirstWord(jsonRec1.salesClerk) } </td>

                                <td style={{textAlign:'left',width:'36px'}} >{ jsonRec1.barcode } </td>
                                <td style={{textAlign:'left',width:'85px'}} >{ jsonRec1.productCode } </td>
                            </tr>

                            {/* <div style={{ marginTop:'-20px'}} > */} 
                            {/* color:'blue', */}
                            <tr style={{border:'none',backgroundColor:'white'}}>
                                <td style={{textAlign:'left', width:'45px'}}></td>
                                <td style={{textAlign:'left', width:'250px'}} >{ jsonRec1.itemDescription } </td>
                                {/* mark-up n percent no field column */}
                                <td style={{textAlign:'right', width:'32px'}} > </td>  
                                <td style={{textAlign:'right', width:'32px'}} > </td>  


                                
                            </tr>
                            {/* <div style={{ marginTop:'0px'}} > */}
                            <tr>
                                <td style={{textAlign:'left',width:'45px'}}></td>
                                <td style={{textAlign:'left',width:'145px'}} >{ jsonRec1.entry_date } </td>
                            </tr>
                            {/* <div style={{marginTop:'5px', borderTop: '1px dotted gray'}}></div> */}
                          </div>

                      )) }
                  </tbody>
                  <tfoot>
                    <td>
                       <div className="footer-space">
                      {/* <label>End</label> */}
                       </div>
                     </td>
                  </tfoot>
                 
              </table>
              {/* <br></br> */}
              <div style={{marginTop:'2px', with:'100%', color:'gray',border:'solid 1px' }}></div>
              {/* <br></br> */}
              
          </div>
          
      )
  }

  function PrintSalesSummary(dtReadSub, dtCtr) {
    //  console.log('sales Summary:',dtReadSub)
    return (
      <>
      {recomputeWithdrawalList(dtReadSub?.withdrawal)}
      <div style={{backgroundColor: 'white'}}>
      
      <label style={{fontSize:'11px'}} ># of items</label>
       {gAccountType ===3 || gAccountType ===8 ? <label style={{marginLeft:'295px', textAlign:'right', width:'50px', fontSize:'10px', fontWeight:'bold', borderTop: '1px solid' , borderBottom: '1px solid', backgroundColor: 'white' } } >{formatNumber(gCashSales)}</label> :'' }
       {gAccountType ===3 || gAccountType ===8 ? <label style={{marginLeft:'005px', textAlign:'right', width:'50px', fontSize:'10px', fontWeight:'bold', borderTop: '1px solid' , borderBottom: '1px solid', backgroundColor: 'white' } } >{formatNumber(gLASales)}</label> :'' }

        <br></br>
        <br></br>
       {/* <Row className="g-3" style={{marginLeft:'0px',marginRight:'5px', fontSize:'11px',backgroundColor: 'white',border: 'none'}} >  */}
       <Grid container spacing={3} sx={{ marginLeft: '0px', marginRight: '5px', fontSize: '11px', backgroundColor: 'white', border: 'none'}} >
          {/* <Card style={{...cardStyle, backgroundColor: 'white', border:'none'}}> */}
          {/* width:'215px', border:'none', backgroundColor: 'white' */}
          <Card sx={{ boxShadow: 'none',width:'215px', borderRadius: 0 }}> 
              <div style={{backgroundColor: 'white'}}>
                  <label style={classSummary.SummaryLabel}>Cash - C</label> 
                  <label style={classSummary.SummaryField}>{dtReadSub.items.cashCommercial || 0}</label>  
                  <br></br>
                  <label style={classSummary.SummaryLabel}>Cash - A</label> 
                  <label style={classSummary.SummaryField} >{dtReadSub.items.cashAuction || 0}</label>
                  <br></br>
                  <label style={classSummary.SummaryLabel}>LA new</label> 
                  <label style={classSummary.laSumField} >{dtReadSub.items.layaway || 0}</label>
                  <br></br>
                  <label style={classSummary.SummaryLabel}>Total-{strGreaterthan.substring(0,1)} </label> 
                  <label style={classSummary.SummaryField} >{dtReadSub.items.total || 0}</label>
              </div>
          </Card>
          {/* style={{width:'250px', fontSize:'11px'}} */}
          
          {/* <Card style={{width:'250px', border:'none',backgroundColor: 'white'}}> */}
          <Card sx={{ boxShadow: 'none',width:'250px', borderRadius: 0 }}> 
              <div> 
                  <label style={classSummary.SummaryTotalLabel}>Beginning balance</label> 
                  <label style={classSummary.SummaryField} > {formatNumber(gBeginningBalance)}</label> 

                  <label style={classSummary.SummaryTotalLabel}>Funding</label> 
                  <label style={classSummary.SummaryField} >{formatNumber(gFunding)}</label>

                  { gAccountType ===3 || gAccountType ===8 ? <label style={classSummary.SummaryTotalLabel}>Total Sales- Jewelry</label>  : '' }
                  { gAccountType ===3 || gAccountType ===8 ? <label style={classSummary.SummaryField} >{formatNumber(gNetSales)}</label> : '' }

                  <label style={classSummary.SummaryTotalNetsales}>Misc.</label> 
                  <label style={classSummary.SummaryField} >{formatNumber(0)}</label>

                  <label style={classSummary.SummaryTotalLabel}>Less - Return / Error</label> 
                  <label style={classSummary.SummaryField} >{formatNumber(0)}</label>
                  
                  { gAccountType ===3 || gAccountType ===8 ? <label style={classSummary.SummaryTotalNetsales}>Netsales</label> : '' }
                  { gAccountType ===3 || gAccountType ===8 ? <label style={classSummary.SummaryField} >{formatNumber(gNetSales)}</label> : ''}


                  <label style={classSummary.SummaryTotalLabel}>Less - Cash Withdrawal</label> 
                  <label style={classSummary.SummaryField} >{formatNumber(gTotalWithdrawal)}</label>
                  


                  {/* <label style={classSummary.SummaryTotalNetsales}>Credit Card</label> 
                  <label style={classSummary.SummaryField} >{formatNumber(1000)}</label> */}

                  {/* <label style={classSummary.SummaryTotalLabel}>Payment/Method</label>  */}
                  {paymentMethodList(dtReadSub?.payment)}
                  {recompEndingBlaance()}
                  
                  <label style={classSummary.SummaryTotalLabel}>Ending balance</label> 
                  <label style={classSummary.endingBalanceField} >
                      {Number(gEndingBalance) <0 ? "(" + formatNumber(+Math.abs(gEndingBalance)) +")": formatNumber(gEndingBalance)}
                  </label>
                  {/* <label style={classSummary.endingBalanceField} >{gEndingBalance}</label> */}

                  <label style={classSummary.SummaryTotalLabel}>Actual</label> 
                  <label style={classSummary.SummaryField} >{formatNumber(gActual)}</label>

                  <label style={classSummary.SummaryTotalLabel}>Over (Short)</label> 
                  {/* <label style={classSummary.SummaryOverShort} >{formatNumber(gOverShort)}</label> */}
                  <label style={classSummary.SummaryOverShort} >
                        {Number(gOverShort) <0 ? "(" + formatNumber(+Math.abs(gOverShort)) +")": formatNumber(gOverShort)}
                  </label>
                  {/* <label style={classSummary.SummaryOverShort} >{gOverShort}</label> */}
                    
              </div>
          </Card>

           {/* <Card style={{ width:'250px',border:'none',float:'right',backgroundColor: 'white'}}> */}
           <Card sx={{ boxShadow: 'none',width:'250px', borderRadius: 0,float:'right' }}> 
            <div>
                {/* <label style={classSummary.SummaryTotalLabel}>Cashier: {gCashierName}</label>  */}
                <label style={{marginLeft:'70px', borderBottom: '1px solid gray' }}>Cashier: {gCashierName}</label> 
                <br></br>
                <label style={classSummary.SummaryTotalLabel}>Withdrawal Details:</label> 
                <br></br>
                  {withdrawalList(dtReadSub?.withdrawal)}
            </div> 
          </Card>
       </Grid>    
        {/* </Row>     */}
        

        

        {/* </div> */}
        
        {/* <div style={{marginTop:'2px', with:'100%', color:'gray',border:'solid 1px' }}></div> */}
        {/* <br></br> */}
        {/* <label style={classSummary.SummaryTotalLabel}>Over (Short)</label>  */}
        <br></br>
        </div>
      </>  
    )
  }

  function recomputeWithdrawalList(dtReadSub3) {
    gTotalWithdrawal=0;
    // console.log('dtReadSub3: ',dtReadSub3)
    dtReadSub3?.forEach((jsonRec1) => {
      // alert(jsonRec1.amount)
      gTotalWithdrawal = (gTotalWithdrawal + Number(jsonRec1.amount))
     });
  }  

  function withdrawalList(dtReadSub3) {
    // gTotalWithdrawal=0;
    return (
        <>
        <tbody>
            {  dtReadSub3?.map((jsonRec1, index) => (
                <div>
                  {/* {recompWithdrawal(Number(jsonRec1.amount)) }  */}
                  {/* {recompWithdrawal(10) } */}
                  <tr key={ index } >
                      <td style={{textAlign:'right',width:'20px'}}>{index+1 }]</td>
                      <td style={{textAlign:'right',width:'8px'}}></td>
                      <td style={{textAlign:'left',width:'70px'}} >{ jsonRec1.time } </td>
                      <td style={{textAlign:'right', width:'75px', fontWeight:'bold' }} >{ formatNumber(jsonRec1.amount) } </td>
                  </tr>
                </div>
            )) }
            <label style={{marginLeft:'30px'}}>Total ---{strGreaterthan} </label> 
            <label style={{textAlign:'right',width:'85px', fontWeight:'bold', borderTop: '1px solid gray' }} >{formatNumber(gTotalWithdrawal)}</label>
        </tbody>
          
        </>
    );

  }  


  function paymentMethodList(dtReadSub3) {
    gTotalNonCashPayment=0;
    return (
      // style={{fontSize:'10px'}} fontSize:'9px', 
        <div >
        <tbody>
            {  dtReadSub3?.map((jsonRec1, index) => (
                // "type": "cash",
                // "amountPaid": 2546
                jsonRec1.type === 'cash' ? "" :
                  <div>
                    {recompNonCashPayments(Number(jsonRec1.amountPaid))}
                    <tr key={ index } >
                        {/* <td style={{textAlign:'right',width:'20px'}}>{index+1 }]</td> */}
                        <td style={{textAlign:'left',width:'28px'}}></td>
                        <td style={{textAlign:'left',width:'94px'}} >{ jsonRec1.type } </td>
                        <td style={{textAlign:'right', width:'60px', fontWeight:'bold' }} >{ formatNumber(jsonRec1.amountPaid) } </td>
                    </tr>
                  </div>
                

            )) }
            {/* <label style={{marginLeft:'30px', fontSize:'10px'}}>Total ---{strGreaterthan} </label> 
            <label style={{textAlign:'right',width:'99px', fontWeight:'bold', borderBottom: '1px solid gray'}} >{formatNumber(gTotalWithdrawal)}</label> */}
        </tbody>
        </div>
    );

  }  
  
  function PrintSalesNonCashDetails(dtReadSub3, dtCtr, cLAType) {
    // console.log('dtRead NonCash Details', dtReadSub3);
    return (
      <>
        <div style={{marginTop:'10px', marginBottom:'08px', with:'100%', color:'light gray',border:'solid 1px' }}></div> 
        <label style={{marginTop:'0px', textAlign:'left',fontSize:'15px',fontWeight:'bold'}}>Card Details</label>
        <table className="print-styled-table" style={{fontSize: '8.5px',margin:'0 0 0 0'}} >
              <thead>
                  <div  style={{borderTop: '1px solid gray', borderBottom: '1px solid gray'}}> 
                      <th style={{textAlign: "right", width: "8px"}}></th>
                      <th style={{textAlign: "right", width: "10px"}}></th>
                      <th style={{textAlign: "left", width: "200px"}}>Customer Name </th>
                      <th style={{textAlign: "left", width: "130px"}}>Card Type</th>
                      <th style={{textAlign: "left", width: "80px"}}>Card Number</th>
                      <th style={{textAlign: "left", width: "100px"}}>Bank Name</th>
                      <th style={{textAlign: "center", width: "70px"}}>Amount Paid</th>
                  </div> 
              </thead>

              {dtReadSub3 && dtReadSub3.length >0 ? 
                ""
                : <p>NO Data.... Card Details</p> 
              }
              <tbody>
                    {  dtReadSub3?.map((jsonRec1, index) => (
                        <div style={{borderTop: '1px solid rgba(0, 0, 0, 0.05)'}}>
                          {/* {recompWithdrawal(Number(jsonRec1.amountPaid)) }  */}
                          <tr key={ index }  >
                              <td style={{textAlign:'right',width:'8px'}}>{index+1 }]</td>
                              <td style={{textAlign:'right',width:'0px'}}></td>
                              <td style={{textAlign:'left',width:'200px'}} >{ jsonRec1.customer } </td>
                              <td style={{textAlign:'left',width:'130px'}} >{ jsonRec1.cardType } </td>
                              <td style={{textAlign:'left',width:'80px'}} >{ jsonRec1.cardNumber } </td>
                              <td style={{textAlign:'left',width:'100px'}} >{ jsonRec1.bankName} </td>
                              <td style={{textAlign:'right', width:'60px'}} >{ formatNumber(jsonRec1.amountPaid) } </td>
                          </tr>
                        </div>
                    )) }
                    {/* <label style={{marginLeft:'30px', fontSize:'10px' }}>Total ---{strGreaterthan} </label> 
                    <label style={{textAlign:'right',width:'90px', fontSize:'11px', fontWeight:'bold'}} >{formatNumber(gTotalWithdrawal)}</label> */}
                </tbody>
            </table>
            <br></br>
            {/* <div style={{marginTop:'10px', with:'100%', color:'light gray',border:'solid 1px' }}></div> 
            <br></br> */}
            <div style={{marginTop:'10px', marginBottom:'08px', with:'100%', color:'gray',border:'solid 1px' }}></div> 
            
      </>
    );



  }

  function PrintSalesLADetails(dtReadSub4, dtCtr, cLAType) {
    // console.log('dtRead LA Details', dtReadSub4);
    let cLAColumnHeader = "Lay Away (New)";
    if (cLAType==='Details') {
        cLAColumnHeader = "(LA New)";
    } else if (cLAType==='Cancelled') {
         cLAColumnHeader = "(LA Cancelled)";
    } else if (cLAType==='Fully Paid') {
         cLAColumnHeader = "(LA Fully Paid)";
    }

    return (
      <>
         { dtReadSub4 ?
           <div style={{marginTop:'10px', marginBottom:'08px', with:'100%', color:'gray',border:'dotted 1px' }}></div> 
           : ""
         }
         
         
            {cLAType==='Details'? 
               <label style={{marginTop:'0px', textAlign:'left',fontSize:'15px',fontWeight:'bold'}}>Lay Away Details</label>
            : ''
            }
            <table className="print-styled-table" style={{fontSize: '8.5px',margin:'0 0 0 0'}} >
            { cLAType==='Details' ? 
                <thead>
                
                  <div  style={{borderTop: '1px solid gray', borderBottom: '1px solid gray'}}> 
                      <th style={{textAlign: "right", width: "8px"}}></th>
                      <th style={{textAlign: "right", width: "3px"}}></th>
                      <th style={{textAlign: "left", width: "80px"}}>Product </th>
                      <th style={{textAlign: "left", width: "45px"}}>Barcode</th>
                      <th style={{textAlign: "left", width: "30px"}}>Class</th>
                      <th style={{textAlign: "left", width: "120px"}}>Description</th>
                      <th style={{textAlign: "center", width: "30px"}}>W</th>
                      <th style={{textAlign: "center", width: "30px"}}>C</th>
                      {/* <th style={{textAlign: "left", width: "5px"}}></th> */}
                      <th style={{textAlign: "center", width: "40px"}}>Price Code</th>

                      <th style={{textAlign: "right", width: "50px"}}>List Price</th>
                      <th style={{textAlign: "right", width: "55px"}}>Sold Price</th>
                      <th style={{textAlign: "right", width: "30px"}}>%</th>
                      <th style={{textAlign: "right", width: "45px"}}>Price/ gram</th>
                      <th style={{textAlign: "left", width: "115px"}}>Customer[LA Payment]</th>
                      <th style={{textAlign: "left", width: "65px"}}>LA#</th>

                      <th style={{textAlign: "left", width: "10px"}}>Term Sold</th>
                      <th style={{textAlign: "left", width: "80px"}}>Due-d[FP-Aging]</th>
                      
                  </div> 
                  
                </thead>
                :'' }

                {dtReadSub4 ? 
                  <label style={{marginTop:'0px', textAlign:'left',fontSize:'13px',fontWeight:'bold'}}>{cLAColumnHeader}</label>
                  : <label>NO Data.... {cLAColumnHeader}</label> 
                }
                <tbody>
                    {/* {  dtReadSub4?.laNew.map((jsonRec1, index) => ( */}
                    {  dtReadSub4?.map((jsonRec1, index) => (
                        <div style={{borderTop: '1px solid rgba(0, 0, 0, 0.05)'}}>
                          {/* {recompWithdrawal(Number(jsonRec1.amountPaid)) }  */}
                          <tr key={ index }  >
                              <td style={{textAlign:'right',width:'8px'}}>{index+1 }]</td>
                              <td style={{textAlign:'right',width:'3px'}}></td>
                              <td style={{textAlign:'left',width:'80px'}} >{ jsonRec1.productCode } </td>
                              <td style={{textAlign:'left',width:'45px'}} >{ jsonRec1.barcode } </td>
                              <td style={{textAlign:'left',width:'30px'}} >{ jsonRec1.classCode } </td>
                              <td style={{textAlign:'left',width:'120px'}} >{ jsonRec1.description} </td>

                              <td style={{textAlign:'right', width:'30px'}} >{ formatNumber(jsonRec1.weight) } </td>
                              <td style={{textAlign:'right', width:'30px'}} >{ formatNumber(jsonRec1.karats) } </td>
                              <td style={{textAlign:'left', width:'5px'}} > </td>

                              <td style={{textAlign:'left',width:'35px'}} >{ jsonRec1.priceCode } </td>

                              <td style={{textAlign:'right', width:'50px'}} >{ formatNumber(jsonRec1.sellingPrice) } </td>
                              <td style={{textAlign:'right', width:'55px'}} >{ formatNumber(jsonRec1.soldPrice) } </td>

                              <td style={{textAlign:'right', width:'30px'}} > 1.5%  </td>
                              <td style={{textAlign:'right', width:'35px'}} >{ formatNumber(112) } </td>
                              <td style={{textAlign:'left', width:'5px'}} > </td>

                              <td style={{textAlign:'left',width:'120px'}} >{ jsonRec1.customerName } </td>
                              <td style={{textAlign:'left',width:'75px'}} >{ jsonRec1.layawayNo } </td>
                              <td style={{textAlign:'left',width:'12px'}} >{ jsonRec1.term } </td>
                              <td style={{textAlign:'left',width:'45px'}} >{ moment(jsonRec1.soldDate).format('MM/DD/YY') } </td>
                              <td style={{textAlign:'left',width:'40px'}} >{ moment(jsonRec1.dueDate).format('MM/DD/YY') } </td>

                          </tr>
                        </div>
                    )) }
                    {/* <label style={{marginLeft:'30px', fontSize:'10px' }}>Total ---{strGreaterthan} </label> 
                    <label style={{textAlign:'right',width:'90px', fontSize:'11px', fontWeight:'bold'}} >{formatNumber(gTotalWithdrawal)}</label> */}
                </tbody>
            </table>
            {/* {PrintSalesLACancelled(dtReadSub4?.cancelled)}
            {PrintSalesLAFullyPaid(dtReadSub4?.fullyPaid)}
            
            <div style={{marginTop:'2px', with:'100%', color:'gray',border:'solid 1px' }}></div> */}
        {/* </div> */}
      </>
    );

  }  

   

return (
  <>
    <div id='main'>
    <div class="print-section" style={{textAlign:'left',marginTop:'5px',backgroundColor: 'white' }} >
         <label style={{marginLeft: '25px',marginRight: '10px'}} >Branch : </label>
         <select 
            className='chrich-custom-select'
            style={{width: '168px'}}
            value={selBranch}
                 name="selbranch"
                 onKeyDown={handleEnter}
                 ref={selBranchRef}
                 required
                 onChange={handleChangeDepartment}
                 disabled={gAssignBranch ? true: false}
         >
         {optDepartment.map(option => (
              <option key={option.value} value={option.value}>
              {option.text}
              </option>
         ))}
         </select>
         
         {/* <input style={{marginLeft: '20px',marginRight: '5px'}} 
              type='checkbox' 
              name='showDiscrepancy'
              defaultChecked={showDiscrepancyRef}
              onKeyDown={handleEnter}
              ref={showDiscrepancyRef}
              onChange ={() =>  setShowDiscrepancy(!showDiscrepancy)}	
         />
         <label>Discrepancy only</label> */}
         <button className="btn-neo1-primary" style={{width: '75px',height:'35px', marginLeft: '20px' }} onClick={() => RefreshData(true)}>Apply</button>
         <button className={'btn-neo1-add'} style={{width: '90px',height:'35px',marginLeft:'30px',marginRight:'5px'}} ref={previewRef} disabled={ datTable && gNoData2Print ? false:true} onClick={handPrinCheck} >Preview </button> 
         <button className={"btn-neo1-danger"} style={{width: '90px',height:'35px',marginLeft:'10px',marginRight:'00px' }} onClick={() => Navigate('/')} >Cancel</button>
         <br></br>
         <label style={{marginLeft:'4px',marginRight: '10px'}} >From Date :</label>
         <input
              className='chrich-custom-input'
              style={{width: '168px'}}
              type="date"
              name="datefrom"
              ref={dateFromRef}
              onChange ={(e) => handleInputChange(e)}
              onKeyDown={handleEnter} 
              value={dateFrom || ""}
         />
         
          <br></br>
         <label style={{marginTop:'10px',marginLeft:'22px',marginRight: '10px'}} >To Date :</label>
         <input
            className='chrich-custom-select'
            style={{width: '168px'}}
              type="date"
              name="dateto"
              ref={dateToRef}
              onChange ={(e) => handleInputChange(e)}
              onKeyDown={handleEnter} 
              value={dateTo || ""}
         />
         <br></br>
         {/* <label style={{marginLeft:'25px'}} >Class :</label>
          <select 
              style={{marginLeft:'10px', width:'150px'}}
              name="selclass"
              ref={classRef}
              onChange={handleChangeClass}
              onKeyDown={handleEnter} 
              value={selClass || ""} 
              // disabled={isAdd ? false: true}
              > 

              {optClass.map(option => (
                  <option key={option.value} value={option.value}>
                  {option.text}
                  </option>
              ))}
          </select> */}

         {/* <button className="btn-neo1 btn-neo1-secondary" style={{width: '75px',  marginLeft: '20px',  height: '32px' }} onClick={() => RefreshData(true)}>Refresh</button> */}
         {/* <button className={dateFrom===curDate ? "btn-neo1 btn-neo1-secondary":""} style={{width: '75px',  marginLeft: '10px',  height: '32px' }} disabled={dateFrom===curDate ? false:true} onClick={() => RepostData() }>Re-post</button> */}
         <br></br>
         {/* <div>{message1}</div> */}

         {/* <button className={"btn-neo1 btn-neo1-danger"} style={{width: '90px',marginLeft:'10px',marginRight:'00px' }} onClick={() => testDate()} >Test Date</button> */}


         <div style={{marginTop:'5px', with:'100%', color:'gray',border:'solid 1px',backgroundColor: 'white' }}></div>
         <br></br>
          <div style={{ display: "none1" }}>
              <div ref={componentRef} >
                    {/* {PrintHeader()} */}
                    {!gNoData2Print? (<h1 style={{color: 'white', background: 'red', borderRadius: '10px' }} >Check the input field. No data available. Click the 'Apply' button.</h1>) :'' }
                    { datTable  && datTable?.map((jsonRec, index) => (
                        <div>
                          <table className="print-styled-table" style={{fontSize: '9.0px',margin:'0 0 0 0' }} >
                          <thead>
                               {/* {PrintHeader()} */}
                           {/* </thead>    */}
                           {/* <tbody> */}
                           {PrintSalesDetails(jsonRec.detail1,index) }
                           {PrintSalesSummary(jsonRec.detail2,index) }
                           {PrintSalesNonCashDetails(jsonRec.detail3,index) }                            
                           {PrintSalesLADetails(jsonRec.detail4?.laNew,index,'Details') }
                           {PrintSalesLADetails(jsonRec.detail4?.cancelled,index,'Cancelled')}
                           {PrintSalesLADetails(jsonRec.detail4?.fullyPaid,index,'Fully Paid')}

                           
                           {/* </tbody> */}
                           </thead> 
            
                          </table>
                          <div style={{marginTop:'2px', with:'100%', color:'gray',border:'solid 1px' }}></div>
                        </div>
                    )) }

              </div>
          </div>
      </div>
      </div>
 </>     
)
}

export default PrintJewelrySales