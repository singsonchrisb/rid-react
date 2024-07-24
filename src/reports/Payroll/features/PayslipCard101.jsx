import React, { useState, useEffect, useRef } from 'react';
import { useNavigate} from "react-router-dom";
import moment from 'moment';
import { isMobile } from 'react-device-detect';
import CloseIcon from '@mui/icons-material/Close';
// import { IconButton } from '@mui/material';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, IconButton, Pagination, Box, Checkbox, FormControlLabel } from '@mui/material';

import { Modal } from "@mui/material";
// import axios from "axios";
import { toast } from "react-toastify";
import { useReactToPrint } from 'react-to-print';
import CircularProgress from "@mui/material/CircularProgress";
import './Payslip101.css';

import  PrintDTR from '../PrintDTR';
import { GetMyHeaders } from '../../../pages/Functions/GetAPIToken';
import { formatNumber, nullNumeric, MyServerHostNodeJS, getDay, getMonth, getYear, decryptPWord } from '../../../pages/Functions/MyFunctions';


let gGTOtherDeductions=0;
const startdate = moment().subtract(80, "days").format("YYYY-MM-DD");
const styleFooterStatus={color: 'darkorange', fontSize:'16px', textAlign:'center'};

const initDetailState = {
    empno: '',
    empname: '',
    dailyrate: '',
    PayGross: 0,
    PayPeriod: 0,
    OAdd: 0,
    // OTTime: 0,
    overTime: 0,
    lblOverTime: 'Over Time',
    otherIncome: 0,
    lhAmount: 0,
    shAmount: 0,
    otherDeduction: 0,
    absent: 0,
    charges: 0,
    dailyCharges: 0,
    dayOff: 0,
    incentive: 0,
    leaveAmount: 0,
    uniform: 0,
    underTime: 0,
    late: 0,
    bonding:0,
    sss: 0,
    philHealth: 0,
    pagIbig: 0,
    totalDeduction: 0,
    net: 0,
    fromDate: '',
    toDate: '',
    Final: 0,
};

const styles = {
    popupBox: {
        position: 'fixed',
        background: '#00000050',
        margin: '0', // Set margin to 0
        width: '100%',
        height: '100vh',
        top: '0',
        textAlign: 'center',
        // zIndex: '9999',
    },
    boxStyle: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: isMobile ? '90%' : '940px',
        height: '95%',
        background: '#fff',
        borderRadius: '6px',
        padding: '1px',
        border: '1px solid #999',
        overflow: 'auto',
    },
    boxHeadTitle: {
        textAlign: 'center',
        fontWeight: '900',
        // fontWeight: '800', , Arial, sans-serif
        fontFamily: 'Roboto, Arial, sans-serif',
        fontSize: '25px',
        marginTop: '0px',
        marginBottom: '25px',
        width: '100%',
        // color: '#444',
        color: '#8B4513', /* Same brown color */
        // color: 'white',
        // backgroundColor: '#448AFF',
    }
};


  const dtrData = [
    {
      id: 1,
      date: '03/16/24',
      day: 'SAT',
      timeIn: '07:56 AM',
      timeOut: '11:06 AM',
      tardMin: '0',
      tardAmt: '0',
      underMin: '0',
      underAmt: '0',
      remarks: 'present',
    },
    {
      id: 2,
      date: '03/17/24',
      day: 'SUN',
      timeIn: '07:56 AM',
      timeOut: '11:06 AM',
      tardMin: '0',
      tardAmt: '0',
      underMin: '0',
      underAmt: '0',
      remarks: 'day-off',
    },
    {
      id: 3,
      date: '03/18/24',
      day: 'MON',
      timeIn: '07:56 AM',
      timeOut: '11:06 AM',
      tardMin: '0',
      tardAmt: '0',
      underMin: '0',
      underAmt: '0',
      remarks: 'present',
    },
    {
      id: 4,
      date: '03/19/24',
      day: 'TUE',
      timeIn: '07:56 AM',
      timeOut: '11:06 AM',
      tardMin: '0',
      tardAmt: '0',
      underMin: '0',
      underAmt: '0',
      remarks: 'present',
    },
    {
      id: 5,
      date: '03/20/24',
      day: 'WED',
      timeIn: '07:56 AM',
      timeOut: '11:06 AM',
      tardMin: '0',
      tardAmt: '0',
      underMin: '0',
      underAmt: '0',
      remarks: 'day-off',
    },
    {
      id: 5,
      date: '03/20/24',
      day: 'WED',
      timeIn: '07:56 AM',
      timeOut: '11:06 AM',
      tardMin: '0',
      tardAmt: '0',
      underMin: '0',
      underAmt: '0',
      remarks: 'day-off',
    },
    {
      id: 5,
      date: '03/20/24',
      day: 'WED',
      timeIn: '07:56 AM',
      timeOut: '11:06 AM',
      tardMin: '0',
      tardAmt: '0',
      underMin: '0',
      underAmt: '0',
      remarks: 'day-off',
    },
    {
      id: 5,
      date: '03/20/24',
      day: 'WED',
      timeIn: '07:56 AM',
      timeOut: '11:06 AM',
      tardMin: '0',
      tardAmt: '0',
      underMin: '0',
      underAmt: '0',
      remarks: 'day-off',
    },
    {
      id: 5,
      date: '03/20/24',
      day: 'WED',
      timeIn: '07:56 AM',
      timeOut: '11:06 AM',
      tardMin: '0',
      tardAmt: '0',
      underMin: '0',
      underAmt: '0',
      remarks: 'day-off',
    },
    {
      id: 5,
      date: '03/20/24',
      day: 'WED',
      timeIn: '07:56 AM',
      timeOut: '11:06 AM',
      tardMin: '0',
      tardAmt: '0',
      underMin: '0',
      underAmt: '0',
      remarks: 'day-off',
    },
    {
      id: 5,
      date: '03/20/24',
      day: 'WED',
      timeIn: '07:56 AM',
      timeOut: '11:06 AM',
      tardMin: '0',
      tardAmt: '0',
      underMin: '0',
      underAmt: '0',
      remarks: 'day-off',
    },
    {
      id: 5,
      date: '03/20/24',
      day: 'WED',
      timeIn: '07:56 AM',
      timeOut: '11:06 AM',
      tardMin: '0',
      tardAmt: '0',
      underMin: '0',
      underAmt: '0',
      remarks: 'day-off',
    },
    {
      id: 5,
      date: '03/20/24',
      day: 'WED',
      timeIn: '07:56 AM',
      timeOut: '11:06 AM',
      tardMin: '0',
      tardAmt: '0',
      underMin: '0',
      underAmt: '0',
      remarks: 'day-off',
    },
    {
      id: 5,
      date: '03/20/24',
      day: 'WED',
      timeIn: '07:56 AM',
      timeOut: '11:06 AM',
      tardMin: '0',
      tardAmt: '0',
      underMin: '0',
      underAmt: '0',
      remarks: 'day-off',
    },
    {
      id: 5,
      date: '03/20/24',
      day: 'WED',
      timeIn: '07:56 AM',
      timeOut: '11:06 AM',
      tardMin: '0',
      tardAmt: '0',
      underMin: '0',
      underAmt: '0',
      remarks: 'day-off',
    },
    {
      id: 5,
      date: '03/20/24',
      day: 'WED',
      timeIn: '07:56 AM',
      timeOut: '11:06 AM',
      tardMin: '0',
      tardAmt: '0',
      underMin: '0',
      underAmt: '0',
      remarks: 'day-off',
    },
  ];


const Payslip = (props) => {
    // console.log('props: ',props.data);
    // console.log('props2: ',props);
     
    // let empNo = props.data.id
    let navigate = useNavigate();
    let gAccessToken = decryptPWord(sessionStorage.getItem("accessToken")); 
    let gAccountType = Number(decryptPWord(sessionStorage.getItem('accountType')));
    let API_url = MyServerHostNodeJS();
    let gMiniMumDayRate =381;
    let tblName='fpayroll20240229';
    // let classColumn ="col-md-12";
    // let classColumn ="col-md-8";

    let allowEmpIDChange = gAccountType ===3 || gAccountType ===8 ? true : false;
    // alert(gAccountType)

    const [empID, setEmpID] = useState(props.data.id ==='211' ? '4137' : props.data.id );
    const [isShowDTR, setIsShowDTR] = useState(false);
    const [isShowOtherDed, setIsShowOtherDed] = useState(false);
    const [isShowPayslip, setIsShowPayslip] = useState(false);
    // const [isShowOthersDeductions, setIsShowOthersDeductions] = useState(false);
    const [isLoading, setIsLoading]= useState(false);
    const [isAllowance, setIsAllowance] = useState(false);

    // const [datTable, setDataTable] = useState([]);
    const [ datDTR, setDataDTR] = useState(dtrData);
    const [ datOtherDed, setDataOtherDed] = useState([]);

    // const [otherIncome, setOtherIncome]= useState(0);
    // const [otherDeduction, setOtherDeduction]= useState(0);
    // const [greaterMinimumRate, setGreaterMinimumRate]= useState(false);
    const [inputState, setInputState] = useState([initDetailState]);
    const [selCutOffDate, setSelCutOffDate] = useState('2024-02-15');
    // const cutOffOption = [];
    const [cutOffOption, setCutOffOption] = useState([]);

    const [isOpen, setisOpen] = useState(false);
    
    const componentRef = useRef();
    const empIDRef = useRef();

    // if (gAccountType ===3 || gAccountType ===8) {
    //     allowEmpIDChange =true;
    // }
        
    const handlePrint = useReactToPrint({
        content: () => componentRef.current, // Function to select the content to print
        // Optional: Customize the printing options
        // pageStyle: `
        //   @page {
        //     // size: A4 portrait;
        //     size: 4in 6in portrait;
        //     margin: 20mm;
        //   }
        //   @media print {
        //     .print-only-first-page {
        //       display: block !important;
        //     }
        //     .print-only-first-page ~ * {
        //       display: none !important;
        //     }
        //   }
        // `,
      });
        // content: () => componentRef.current,
        //     pageStyle: `
        //     @page {
        //         size: 4in 7in;
        //         margin: 11mm 11mm 11mm 11mm;
        //         // size: 11mm 11mm 11mm 11mm;
        //         @top-right selector {
        //             content: "Page " counter(page);
        //         }
        //     }`,
        //     documentTitle: "ORO BUSINESS GROUP" 
            
        //   });
        // content: () => componentRef.current,
        //     pageStyle: `
        //       @page {
        //         size: 8.5in 11in; /* Width x Height for short bond paper */
        //         margin: 11mm 11mm 11mm 11mm;
        //       }
        //     //   @media print {
        //     //     body {
        //     //       margin: 11mm 11mm 11mm 11mm;
        //     //     }
        //     //     .print-page {
        //     //       page-break-after: always; /* Trigger page eject at the end of each printed page */
        //     //     }
        //     //   }
        //     `,
        // });

        // const handlePrint_JS = () => {
        //     const content = componentRef.current.innerHTML;
        //     const printWindow = window.open('', '_blank');
        //     printWindow.document.open();
        //     printWindow.document.write(`
        //       <html>
        //         <head>
        //           <title>Print</title>
        //           <style>
        //             @page {
        //               size: 8.5in 11in;
        //               margin: 20mm;
        //             }
        //           </style>
        //         </head>
        //         <body>
        //           <div class="print-only-first-page">${content}</div>
        //           <script>
        //             window.onload = function() {
        //               window.print();
        //               window.close();
        //             };
        //           </script>
        //         </body>
        //       </html>
        //     `);
        //     printWindow.document.close();
        //   };
        

    // alert(empNo)
    

    useEffect(() => {
        fetchCuttOffData()
    }, []);

    useEffect(() => {
        // fetchDTRData(empID,selCutOffDate);
        fetchDTRData(selCutOffDate);
    }, []);

    useEffect(() => {
        fetchOtherDeductionsData(selCutOffDate,false);
    }, []);
    
    
    const handleRefresh = () => {
        // toast.info('Refresh data...');

        fetchCuttOffData();
        fetchData(tblName);
        fetchDTRData(selCutOffDate);
        fetchOtherDeductionsData(selCutOffDate,false)
        setIsShowPayslip(true);

    };

    const handleShow = (tCutOff) => {
        fetchData(tblName);
        fetchDTRData(tCutOff);
        fetchOtherDeductionsData(tCutOff,false)
        setIsShowPayslip(true);
    };

    const handleChangePassword = () => {
      navigate("/EmployeeChangePassword");
        
    }

    const handleShowDTR = () => {
       setIsShowDTR(true);
    }

    // const handleClose = () => setIsShowDTR(false) // setShow(false);

    const handleOthersDeductions = () => {
        setIsShowOtherDed(true);
        // alert('Not yet done! \nPlease ask H.R. for details')
    }

    const handleCancel = () => {
        setIsShowPayslip(false);
    };

    const handleBack = () => {
        navigate(-1);
      };

    const handleEnter = (event) => {
        if (event.key.toLowerCase() === "enter") {
           if (event.target.name==="code") {
               empIDRef.current.focus();
               return true;
           } else if (event.target.name==="empID") {      
                // alert('eee')
                handleRefresh();
                return true;
            //     if (inputState.code ==="") {
            //         toast.error(captionName +" Code must be filled out!");
            //         codeRef.current.focus();
            //         return false;
            //     }
            //     if (CheckCode()) {
            //        descriptionRef.current.focus()
            //     }
            }
           event.preventDefault();
        } else if (event.keyCode =120) {
            // alert('yes')
            setIsAllowance(true)

        } else if (event.keyCode >=112 && event.keyCode <=123) {
            // Turn off Function key F1 to F12
            event.preventDefault();           
        }
      };

    async function fetchData(tableName) {
        // alert("fetch: "+ tableName)
        // setIsLoading(true);
        try {
        // const url = new URL("http://localhost:5000/payrollList/getPayrollList");
        // const url = new URL("https://us-central1-oro-business-group.cloudfunctions.net/app/payrollList/getPayrollListWithToken");
        const url = new URL(API_url + "/payrollList/getPayrollList/?empID=" + empID);
        url.searchParams.append('tableName', tableName);
        const headers = GetMyHeaders(gAccessToken); // Assuming GetMyHeaders is a function returning headers
        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: headers
        });

        // const response = await fetch(url.toString());
        
        if (!response.ok || response.status !== 200) {
            throw new Error("Failed to fetch data! " + response.status);
        }
        //   console.log('response',response)
        const data = await response.json();

        // setDataTable(data.data);

        await recomputeRecord(data.data[0]);
        // await fetchDTRData(data.data[0]);
        // tblName='fpayroll' +  getYear(tValues,'YYYY') + getMonth(tValues,'MM')  + getDay(tValues,'DD') 

        //    alert('rrrrr')
            //  console.log('data:,',datTable)
            // console.log('data1:,',datTable[0].length)
            // console.log('data2:,',datTable[0]?.empname);
        
        // Process the fetched data as needed
        } catch (error) {
        // console.error("Error fetching data:", error.message);
            toast.error("Error fetching data:", error.message);
        }
        // setIsLoading(false);
    }

    async function fetchCuttOffData() {
        
        //  alert('startdate: ' + moment(startdate).format("YYYY-MM-DD"))
        //  alert(startdate);
          setIsLoading(true);
        try {
            // const url = new URL(API_url + "/payrollList/getCutOff/?orderBy=desc&limit=3");
         // const url = new URL(API_url + "/payrollList/getCutOff/?cutOffDate=2024-01-16");
         const url = new URL(API_url + "/payrollList/getCutOff/?cutOffDate=" + startdate);
        // url.searchParams.append('tableName', tableName);
        const headers = GetMyHeaders(gAccessToken); // Assuming GetMyHeaders is a function returning headers
        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: headers
        });

        // const response = await fetch(url.toString());
        
        if (!response.ok || response.status !== 200) {
            // throw new Error("Failed to fetch data! " + response.status);
            toast.error("Failed to fetch data! " + response.status)
            return false;
        } else  {
            const data = await response.json();
            // setDataCuttOff(data.data)
            // console.log('data2: ',datCuttOff);
            // console.log('cutt off data:,',datCuttOff)
           // Process the fetched data as needed
           let arr_results =[];

        //    datCuttOff.forEach((items, index) => {
            data.data.forEach((items, index) => {
               let tCutOffDate=moment(items.cutOffDate).format("YYYY-MM-DD");
               tblName='fpayroll' +  getYear(tCutOffDate,'YYYY') + getMonth(tCutOffDate,'MM')  + getDay(tCutOffDate,'DD') 
               setSelCutOffDate(tCutOffDate);
               arr_results.push({value: tCutOffDate, text: tCutOffDate},)
            })
            setCutOffOption(arr_results)
            fetchData(tblName);
            setIsShowPayslip(true);
            // console.log('cutOffOption: ',cutOffOption)
        }
        
        } catch (error) {
            toast.error("Error fetching data:", error.message);
        }
         setIsLoading(false);
    }

    async function fetchDTRData(tCutOff) {
        // toast.info('Emp. ID: ' + empID + ',  Cut-off: ' + selCutOffDate )
        let tableName="uploadeddtr";  // if final ====0, upddtr
        try {
        // const url = new URL(API_url + "/payrollList/getDTRList/?empID=" + empID +"?cutOff='2024-03-31'");
        // const url = new URL(API_url + "/payrollList/getDTRList/?empID=" + empID +" and cutOff=" + selCutOffDate );
        const url = new URL(`${API_url}/payrollList/getDTRList/`);
              url.searchParams.append('empID', empID);
              url.searchParams.append('cutOff', tCutOff);
              url.searchParams.append('tableName', tableName);
        const headers = GetMyHeaders(gAccessToken); // Assuming GetMyHeaders is a function returning headers
        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: headers
        });

        // const response = await fetch(url.toString());
        
        if (!response.ok || response.status !== 200) {
            throw new Error("Failed to fetch DTR Data! " + response.status);
        }
        toast.info('Employee ID: ' + empID + ',  Cut-off: ' + selCutOffDate )
        //   console.log('response',response)

        const data = await response.json();
        // console.log('data DTR110 :,',data) 
        // console.log('data DTR111 :,',data.data) 
        setDataDTR(data.data);
        // console.log('data DTR2 :,',datDTR) 
       
        //    alert('rrrrr')
            //  console.log('data:,',datTable)
            // console.log('data1:,',datTable[0].length)
            // console.log('data2:,',datTable[0]?.empname);
        
        // Process the fetched data as needed
        } catch (error) {
        // console.error("Error fetching data:", error.message);
            toast.error("Error fetching data:", error.message);
        }
        // setIsLoading(false);
    }

    // fetchOtherDeductionsData   
    async function fetchOtherDeductionsData(tCutOff, lShowLoading) {
        // toast.info('Emp. ID: ' + empID + ',  Cut-off: ' + selCutOffDate )
        let tableName="deductiondetl"; 
        //  alert(lShowLoading + tCutOff)
        setIsLoading(true);
        try {
        // const url = new URL(API_url + "/payrollList/getDTRList/?empID=" + empID +"?cutOff='2024-03-31'");
        // const url = new URL(API_url + "/payrollList/getDTRList/?empID=" + empID +" and cutOff=" + selCutOffDate );
        const url = new URL(`${API_url}/payrollList/getOtherDeductions/`);
              url.searchParams.append('empID', empID);
              url.searchParams.append('cutOff', tCutOff);
              url.searchParams.append('tableName', tableName);
        const headers = GetMyHeaders(gAccessToken); // Assuming GetMyHeaders is a function returning headers
        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: headers
        });

        // const response = await fetch(url.toString());
        
        if (!response.ok || response.status !== 200) {
            setIsLoading(false);
            throw new Error("Failed to fetch other deductions details data: " + response.status);
        }
        // toast.info('Employee ID: ' + empID + ',  Cut-off: ' + selCutOffDate )
        //   console.log('response',response)

        const data = await response.json();
        // console.log('data other de :,',data) 
        // console.log('data other de111 :,',data.data) 
        setDataOtherDed(data.data);
        // console.log('data other de2 :,',datOtherDed) 
        gGTOtherDeductions =0; 
        {data.data.forEach((jsonRead, index) => {
            gGTOtherDeductions =gGTOtherDeductions + Number(jsonRead.payment)
        })}
        setIsLoading(false);
        //    alert('rrrrr')
            //  console.log('data:,',datTable)
            // console.log('data1:,',datTable[0].length)
            // console.log('data2:,',datTable[0]?.empname);
        
        // Process the fetched data as needed
        } catch (error) {
        // console.error("Error fetching data:", error.message);
            toast.error("Error fetching other deductions details data: ", error.message);
            setIsLoading(false);
        }
        setIsLoading(false);
    }

  function getTotalDays(dFromDate, dToDate) {
    // alert('fromDate: ' + dFromDate + ' , toDate: ' + dToDate )
    const dateFrom = moment(dFromDate);
    const dateTo = moment(dToDate);
    // alert('fromDate: ' + dateFrom + ' , toDate: ' + dateTo )
    let retVal = dateTo.diff(dateFrom , 'days');
    // alert(retVal)
    // alert((Number(retVal)+1))
    return (Number(retVal)+1); 
  }  

  async function recomputeRecord(dtRead) {
    if (!dtRead) {
        toast.error('Empty table!');
        return 
    }
    setInputState(initDetailState); //initialize 
    // alert('difference')
    // let dtRead =datTable[0];
    // console.log('dtRead',dtRead)
    // alert(dtRead?.fromDate + ",  " + dtRead?.toDate)

    const difference = await getTotalDays(dtRead?.fromDate, dtRead?.toDate);

    // const fromDate = moment(dtRead?.fromDate).format('YYYY-MM-DD');
    // const toDate = moment(dtRead?.toDate).format('YYYY-MM-DD');

    // const difference = toDate.diff(fromDate, 'days');

    // alert(fromDate)
    // alert(toDate) 
//    const date1 = moment('2024-01-16');
//    const date2 = moment('2024-01-31');
//   const date2 = test2
  // Calculate the difference
  // const difference = date2.diff(date1, 'days');
  

//   alert(difference)

    let nTotalDays = difference ? difference : 15 // Trim(Str((!toDate - !fromDate) + 1))
    let nGrossMinimum = (gMiniMumDayRate * nTotalDays)
    let nOverTime =0;
    let nIncentive =0;
    let lblOverTime='Over Time'
    let nOtherIncome = nullNumeric(dtRead?.oAdd) + nullNumeric(dtRead?.Incentive) 
    let nOtherDeduction=0;

     if (nullNumeric(dtRead?.SalaryRate) > gMiniMumDayRate) {
        nIncentive = (dtRead?.PayPeriod) - nGrossMinimum;
        nOverTime =nullNumeric(dtRead?.Otime) + nIncentive;
        lblOverTime = "* Over Time *";
        if  (isAllowance && (gAccountType===8)) {
            lblOverTime = "* Allowance *";
        }

     } else {
        nOverTime =nullNumeric(dtRead?.Otime);
     }

     let nSSS=dtRead?.SSS;
     let nPH=dtRead?.phil_health;

     if (nSSS===150 && nPH <=0) {
         nPH=dtRead?.SSS;
         nSSS=0;
     }

    //  alert('nPH: ' + nPH + ', daily charges: ' + dtRead?.DailyCharges)

     nOtherDeduction = nullNumeric(dtRead?.DailyCharges) + nullNumeric(dtRead?.Charges) + nullNumeric(dtRead?.Uniform) + nullNumeric(dtRead?.Less) 
    //  + Round(nullNumeric(dtRead?.Doff), 2)

    //  setOtherDeduction(nOtherDeduction);

        
    // alert(dtRead.empname);

    let loadDetailState = {
        empno: dtRead?.empno,
        empname: dtRead?.empname,
        dailyRate: dtRead?.SalaryRate,
        PayGross: nGrossMinimum, // dtRead?.PayGross,
        PayPeriod: dtRead?.PayPeriod,
        OAdd: dtRead?.OAdd,
        // OTTime: dtRead?.OTTime,
        overTime: nOverTime,
        lblOverTime: lblOverTime,
        otherIncome: nOtherIncome,
        lhAmount: nullNumeric(dtRead?.lh_amt) ,
        shAmount: nullNumeric(dtRead?.sh_amt),
        otherDeduction: nOtherDeduction,
        // absent: nullNumeric(dtRead?.Absent),
        absentAmount: nullNumeric(dtRead?.AbsAmount),
        charges: nullNumeric(dtRead?.Charges),
        dailyCharges: nullNumeric(dtRead?.DailyCharges),
        dayOff: nullNumeric(dtRead?.Doff),
        incentive: nullNumeric(dtRead?.Incentive),
        leaveAmount: nullNumeric(dtRead?.LeaveAmount),
        uniform: dtRead?.Uniform,
        underTime: dtRead?.Utime,
        late: dtRead?.Late,
        bonding: dtRead?.bonding,
        sss: nSSS,
        philHealth: nPH,
        pagIbig: dtRead?.Pagibig,
        loan: nullNumeric(dtRead?.LoanAmt) + nullNumeric(dtRead?.Interest),
        totalDeduction: dtRead?.TotalDed,
        net: dtRead?.Net,
        totalDays : nTotalDays,
        fromDate: moment(dtRead.fromDate).format('MM/DD/YY'),
        toDate: moment(dtRead.toDate).format('MM/DD/YY'),
        final: dtRead.Final,
        
    }


    setInputState(loadDetailState); 

    // nTotalDays = Trim(Str((!toDate - !fromDate) + 1))
    // fldDate = Format(!fromDate, "mm/dd/yy") & " - " & Format(!toDate, "mm/dd/yy") & " = " & nTotalDays & "Days"
    // nGrossMinimum = (gMiniMumDayRate * nTotalDays)
    // lblDailyRate = Format(gMiniMumDayRate, "##,##0.00") 'salaryrate
    
    
    // 'lblGross = Format(!payperiod, "##,##0.00")
    // lblGross = Format(nGrossMinimum, "##,##0.00")
    
    // If NullNumeric(!salaryrate) > gMiniMumDayRate Then
    //     'lblOverTime = "Over Time/Incentive"
    //     lblOverTime = "* Over Time *"
    //     nIncentive = (!payperiod) - nGrossMinimum
    //     lblOTamt = Format(NullNumeric(!otime) + nIncentive, "##,##0.00")
    
    // Else
    //     lblOverTime = "Over Time"
    //     lblOTamt = Format(NullNumeric(!otime), "##,##0.00")
    // End If


  }

  const handleChangeSelectCutOff = event => {
    // console.log(event.target.value);
    const tValues=event.target.value
    setSelCutOffDate(tValues);
    tblName='fpayroll' +  getYear(tValues,'YYYY') + getMonth(tValues,'MM')  + getDay(tValues,'DD') 
    // alert(tValues + ",  "+ tblName);
    handleShow(tValues);
  };

  




//   function addMagic() {
//     return (
//         <div className="col-md-12">
//             <div className="d-flex align-items-center"> <span className="fw-bold">Allowance</span> <small className="ms-auto">{formatNumber(inputState.lhAmount)}</small> </div>
//         </div>
//     )
//   }

//   function popupShowPaySlip_test() {
//     let styleColumn1={width:'80px', textAlign: 'left', border:'solid 1px gray'};
//     return (
//         <>
//         <div style={{marginLeft:'40px', marginTop:'40px', width:'800px'}} ref= {componentRef}  >
//              <label className="fw-bold" style={{fontSize:'20px'}}>PAY SLIP</label> <span className="fw-normal-sss" style={{float:'right', fontSize:'11px'}} ><small>{inputState.fromDate} - {inputState.toDate} = {inputState.totalDays} Days</small></span>
//              <div className="row" style={{fontSize:'14px'}}>
//                  <div> <span className="fw-bold">{inputState.empname}</span> </div>

//                  <table>
//                     <tbody>
//                         <tr>
//                         <td style={styleColumn1}>Daily Rate</td>
//                         <td style={{width:'40px', textAlign: 'right' }} >381.000</td>
//                         </tr>
//                         <tr>
//                         <td style={styleColumn1} >Gross</td>
//                         <td style={{width:'40px', textAlign: 'right' }} >5,381.000</td>
//                         </tr>
//                         <tr>
//                         <td style={styleColumn1}>Over Time</td>
//                         <td style={{width:'40px', textAlign: 'right' }} >481.000</td>
//                         </tr>
//                     </tbody>
//                     </table>
//                     <h3>DEDUCTION</h3>
//                     <table>
//                     <tbody>
//                         <tr>
//                         <td>SSS</td>
//                         <td>500.00</td>
//                         </tr>
//                         <tr>
//                         <td>Phil health</td>
//                         <td>200.00</td>
//                         </tr>
//                         <tr>
//                         <td>Total</td>
//                         <td>700.00</td>
//                         </tr>
//                     </tbody>
//                     </table>
//                     <h3>NET TOTAL</h3>
//                     <p>4,000.00</p>

                 
          
//              </div>

                
                
            
//         </div>
            
 
//             <div className="row mt-4">
//                 <div className="col-md-12 d-flex justify-content-end">
//                     <button className="btn btn-primary" style={{width:'50%'}} onClick={() => handleChangePassword()}>Change Password</button>
//                     <button className="btn btn-primary" style={{width:'100px', marginLeft:'15px'}} onClick={() => handlePrint()} disabled={false}>Print</button>
//                     <button className="btn btn-danger" style={{width:'100px', marginLeft:'15px'}} onClick={handleCancel}>Cancel</button>
//                </div>   
//                <button className="btn btn-primary" style={{width:'100px', marginLeft:'15px'}} onClick={() => handlePrint()} disabled={false}>Other Deductions</button>
//             </div>
//             {/* <div className="row mt-3">
//                 <div className="col-md-12 d-flex justify-content-end">
//                     <button className="btn btn-success" onClick={handlePrint}>Print Payslip</button>
//                     <button className="btn btn-success" onClick={() => handleBack()}>Back</button>
//                 </div>
//             </div> */}
//             </>

//     )
//   }

  function popupShowPaySlip(classColumn) {
    return (
        <>
        <div className="row">
            {/* <div className="payslip-container"  ref= { classColumn === 'col-md-08' ? componentRef : testRef}  > */}
            
            <div className="payslip-container" style={{fontFamily:'sans-serif'}} ref= {componentRef}  >
            <br></br>
            <br></br>
                {/* <div className="col-md-12 payslip-container" > */}
                
                 <div className={classColumn}> 
                    <div className="text-left lh-4 mb-2">
                        {/* 01/01/24-01/15/24 */}
                        <label className="fw-bold" style={{fontSize:'20px'}}>PAY SLIP</label> <span className="fw-normal" style={{float:'right', fontSize:'11px'}} ><small>{inputState.fromDate} - {inputState.toDate} = {inputState.totalDays} Days</small></span>
                    </div>
                    {/* <div className="d-flex justify-content-end mb-2"> <small>01/01/24-01/15/24 = 15 Days</small> </div> */}
                    <div className="row" style={{fontSize:'14px'}}>
                        <div className={classColumn}>
                            <div className="col">
                                <div className={classColumn}>
                                    <div> <span className="fw-bold">{inputState.empname}</span> </div>
                                </div>
                                {/* <div className="col-md-12">
                                    <div className="d-flex align-items-center"> <span className="fw-bold">ID no.</span> <span className="ms-auto fw-bold">12995</span> </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="d-flex align-items-center"> <span className="fw-bold">ORO Branch</span> <span className="ms-auto">OFFICE</span> </div>
                                </div> */}
                                {/* <div className="col-md-12">
                                    <div className="d-flex align-items-center"> <span className="fw-bold">Position</span> <small className="ms-auto">Frontend Developer</small> </div>
                                </div> */}
                                <br />
                                <div className= {classColumn}>
                                    {/* <div className="d-flex align-items-center"> <span className="fw-bold">Daily Rate</span> <small className="ms-auto">{formatNumber(gMiniMumDayRate)}</small> </div> */}
                                {/* </div>
                                <div className={classColumn}> */}
                                    {/* <div className="d-flex align-items-center"> <span className="fw-bold">Gross</span> <small className="ms-auto fw-bold">{formatNumber(inputState.PayGross)}</small> </div> */}
                                    <div className="d-flex align-items-center"> <span className="fw-bold">Basic Salary</span> <small className="ms-auto fw-bold">{formatNumber(inputState.PayGross)}</small> </div>
                                </div>
                                <div className={classColumn} style={{marginTop:'10px'}}>
                                    <div className="d-flex align-items-center"> <span className="fw-bold">{inputState.lblOverTime}</span> <small className="ms-auto">{formatNumber(inputState.overTime)}</small> </div>
                                </div>
                                {/* {addMagic()} */}
                                <div className={classColumn}>
                                    <div className="d-flex align-items-center"> <span className="fw-bold">Regular Holiday</span> <small className="ms-auto">{formatNumber(inputState.lhAmount)}</small> </div>
                                </div>
                                <div className={classColumn}>
                                    <div className="d-flex align-items-center"> <span className="fw-bold">Incentive</span> <small className="ms-auto">{formatNumber(inputState.incentive)}</small> </div>
                                </div>
                                <div className={classColumn}>
                                    <div className="d-flex align-items-center"> <span className="fw-bold">Other Income</span> <small className="ms-auto">{formatNumber(inputState.otherIncome)}</small> </div>
                                </div>
                                <div className="text-center lh-2 mb-0">
                                    <h5 className="fw-medium">DEDUCTION</h5>
                                </div>
                                <div className={classColumn}>
                                    <div className="d-flex align-items-center"> <span className="fw-bold">Absence</span> <small className="ms-auto">{formatNumber(inputState.absentAmount)}</small> </div>
                                </div>
                                <div className={classColumn}>
                                    <div className="d-flex align-items-center"> <span className="fw-bold">Day-Off</span> <small className="ms-auto">{formatNumber(inputState.dayOff)}</small> </div>
                                </div>
                                <div className={classColumn}>
                                    <div className="d-flex align-items-center"> <span className="fw-bold">Tardiness</span> <small className="ms-auto">{formatNumber(inputState.late)}</small> </div>
                                </div>
                                <div className={classColumn}>
                                    <div className="d-flex align-items-center"> <span className="fw-bold">Undertime</span> <small className="ms-auto">{formatNumber(inputState.underTime)}</small> </div>
                                </div>
                                <div className={classColumn}>
                                    <div className="d-flex align-items-center"> <span className="fw-bold">SSS</span> <small className="ms-auto">{formatNumber(inputState.sss)}</small> </div>
                                </div>
                                <div className={classColumn}>
                                    <div className="d-flex align-items-center"> <span className="fw-bold">PhilHealth</span> <small className="ms-auto">{formatNumber(inputState.philHealth)}</small> </div>
                                </div>
                                <div className={classColumn}>
                                    <div className="d-flex align-items-center"> <span className="fw-bold">Pag-Ibig</span> <small className="ms-auto">{formatNumber(inputState.pagIbig)}</small> </div>
                                </div>
                                <div className={classColumn}>
                                    <div className="d-flex align-items-center"> <span className="fw-bold">Bonding</span> <small className="ms-auto">{formatNumber(inputState.bonding)}</small> </div>
                                </div>
                                <div className={classColumn}>
                                    <div className="d-flex align-items-center"> <span className="fw-bold">Loan</span> <small className="ms-auto">{formatNumber(inputState.loan)}</small> </div>
                                </div>
                                <div className={classColumn}>
                                    <div className="d-flex align-items-center"> <span className="fw-bold">Others</span> <small className="ms-auto">{formatNumber(inputState.otherDeduction)}</small> </div>
                                </div>
                            </div>
                            <hr className="my-2 w-100" />
                            <div className={classColumn}>
                                 <div className="d-flex align-items-center"> <span className="fw-bold">Total Deductions</span> <small className="ms-auto">{formatNumber(inputState.totalDeduction)}</small> </div>
                            </div>
                            <br />
                            <div className={classColumn}>
                                <div className="d-flex align-items-center"> <span className="fw-bold">Net Receivable</span> <span className="ms-auto fw-bolder" >₱ {formatNumber(inputState.net)}<hr className="my-0 w-100"/></span> </div>
                            </div>
                            <div className="row mt-4">
                                {Number(inputState.final)===1 ? 
                                <p style={styleFooterStatus} >This is the final copy!</p>
                                :
                                <p style={styleFooterStatus} >This is for evaluation purposes.</p> //This is for evaluation copy!
                                }
                            </div>
                        </div>
                    </div>
                    </div>  
                    {/* ddd */}
                  {/* </div> */}
                </div> 
                <div className="no-print"></div>
            </div>
            
            <div className="row mt-4">
                <div className="col-md-12 d-flex justify-content-start">
                 <button className="btn btn-primary" style={{ marginLeft:'0px',width:'136px'}} onClick={() => handleOthersDeductions()} disabled={false}>Other Deductions</button>
                 <button className="btn btn-primary" style={{ marginLeft:'15px',width:'80px'}} onClick={() => handleShowDTR()} disabled={false}>DTR</button>
                 </div>
            </div>
            <div className="row mt-2">
                <div className="col-md-12 d-flex justify-content-end">
                    <button className="btn btn-primary" style={{width:'50%'}} onClick={() => handleChangePassword()}>Change Password</button>
                    <button className="btn btn-primary" style={{width:'100px', marginLeft:'15px'}} onClick={() => handlePrint()} disabled={false}>Print</button>
                    {/* <button className="btn btn-primary" style={{width:'100px', marginLeft:'15px'}} onClick={() => handlePrintTemp()} disabled={false}>Print</button> */}
                    <button className="btn-neo1-danger" style={{width:'100px', marginLeft:'15px'}} onClick={handleCancel}>Cancel</button>
               </div>   
            </div>
            
            {/* <div className="row mt-3">
                <div className="col-md-12 d-flex justify-content-end">
                    <button className="btn btn-success" onClick={handlePrint}>Print Payslip</button>
                    <button className="btn btn-success" onClick={() => handleBack()}>Back</button>
                </div>
            </div> */}
            </>

    )
  }

  function showEmployeeChange() {
    return (
        <>
        <br></br>
            <label style={{ height:'30px', fontSize:'16px'}} >Employee ID:</label>
            <input 
                style={{marginLeft:'10px', height:'28px', width:'150px', fontSize:'15px'}}
                type="text" 
                name="empID"
                required 
                value={empID}
                ref={empIDRef}
                onKeyDown={handleEnter}
                onChange={e => setEmpID(e.target.value)}
            />
        </>
    );
  }

  function showDTRList() {
  let datEmpInfo = { empName: inputState.empname, empID: empID , fromDate: inputState.fromDate, toDate: inputState.toDate, totalDays: inputState.totalDays}
    return (
        <Modal 
            onClose={() => setIsShowDTR(false)}
            onOpen={() => setIsShowDTR(true)}
            open={isShowDTR}
        >
        <div style={styles.popupBox}>
            <div style={styles.boxStyle}>
                <IconButton className='windowclose-button'  onClick={() => setIsShowDTR(false)}> <CloseIcon /> </IconButton>  
                {/* <h3 style={{...styles.boxHeadTitle, marginTop: '15px'}} >Daily Time Records</h3> */}
                <PrintDTR data={datDTR } dataEmpInfo={datEmpInfo} printOn={false}/>
                <br></br>
                <button className="btn btn-danger" style={{width:'100px', marginLeft:'15px'}} onClick={() => setIsShowDTR(false)}>Close</button>
            </div>
        </div>
        </Modal>
    );
  }

  function showOtherDedutions() {
    
      return (
          <Modal 
              onClose={() => setIsShowOtherDed(false)}
              onOpen={() => setIsShowOtherDed(true)}
              open={isShowOtherDed}
          >
          <div style={styles.popupBox}>
              <div style={{...styles.boxStyle, width: '500px', height: '500px'}}>
                  <IconButton className='windowclose-button'  onClick={() => setIsShowOtherDed(false)}> <CloseIcon /> </IconButton>  
                  <h3 style={{...styles.boxHeadTitle, marginTop: '15px'}} >Other Deductions List</h3>
                  <p style={{marginTop: '-20px'}} >Cut-off date: <span style={{marginLeft: '10px', fontWeight: 'bold'}}> {selCutOffDate}</span> </p>
                  <p className="fw-bold" >{inputState.empname}</p>
                  {/* <br></br> */}

                  <Box sx={{ fontSize: '.1rem', mx: 2 }}>
                    <Table hover={true} >
                        <TableHead>
                        <TableRow>
                            <TableCell align="center" sx={{ width: '6px', fontWeight:'bold',border: '1px solid lightgrey' }}>No.</TableCell>
                            <TableCell align="left" sx={{ width: '230px', fontWeight:'bold',border: '1px solid lightgrey' }}>Description</TableCell>
                            <TableCell align="left" sx={{ width: '80px', fontWeight:'bold',border: '1px solid lightgrey' }}>Payment</TableCell>
                            

                        </TableRow>
                        </TableHead>
                        <TableBody>    
                            { datOtherDed.length >0 && datOtherDed.map((jsonRead, index) => (
                                
                                    <TableRow 
                                    key={index} 
                                    sx={{ height: '3px',
                                        '&:hover': { backgroundColor: '#f5f5f5' } 
                                    }}
                                    >
                                        <TableCell sx={{ py: 0.5,border: '1px solid lightgrey' }}>{index + 1}</TableCell>
                                        <TableCell sx={{ py: 0.5,border: '1px solid lightgrey' }}>{jsonRead.Description}</TableCell>
                                        <TableCell align="right" sx={{ width: '60px', py: 0.5 ,border: '1px solid lightgrey'}}>{formatNumber(jsonRead.payment)}</TableCell>
                                        
                                    </TableRow>
                            ))}
                             <TableRow>
                            <TableCell sx={{ border: '1px solid lightgrey'}}></TableCell>
                            <TableCell align="right" sx={{ width: '60px', py: 0.5 ,border: '1px solid lightgrey'}}>GRAND TOTAL</TableCell>
                            <TableCell align="right" sx={{ width: '60px',fontWeight:'bold', py: 0.5 ,border: '1px solid lightgrey'}}>{formatNumber(gGTOtherDeductions)}</TableCell>
                        </TableRow>
                        </TableBody>

                    </Table>
                  </Box>
                  <br></br>
                  <div style={{ width: "100%", marginTop: "20px", textAlign: 'center'}}>
                       <button className="btn-neo1-secondary" style={{height: '36px' }} onClick={() => fetchOtherDeductionsData(selCutOffDate, true)}>Refresh Data</button>
                       <button className="btn-neo1-danger" style={{width:'100px', marginLeft:'30px'}} onClick={() => setIsShowOtherDed(false)}>Close</button>
                </div>
              </div>
          </div>
          </Modal>
      );
    }


    return (
        // <div className='Box-Center' style={{width: '360px', height: '470px', marginTop: '20px' }} >
        <>
        {/* <div className='Box-Center' style={{width: '770px', height: '600px', marginTop: '00px' }} > */}
             
         <div className="container mt-3 mb-5" style={{width: '355px'}}> 
           {/* <FaWindowClose className='windowclose-button' onClick={() => handleWindowClose()}/>   */}
            <label style={{marginLeft: allowEmpIDChange ===true ? "25px":"0px", height:'30px', fontSize:'16px'}} >Pay Date:</label>
            <select
                name="types"
            //   variant="filled"
                className="chrich-custom-select"
                style={{ marginLeft: "10px", marginBottom: "10px",width:'45%', height:'30px', fontSize:'16px'}}
                value={selCutOffDate}
                // setselPOSKey
                onKeyDown={handleEnter}
                onChange={handleChangeSelectCutOff}
            >
                {cutOffOption.map(option => (
                    <option key={option.value} value={option.value}>
                    {option.text}
                    </option>
                ))}
            </select>
            {allowEmpIDChange ? showEmployeeChange() :""}
                    
                    
            <div className="row mt-1">
                 <div className="col-md-12 d-flex justify-content-end"> 
                    {/* <button className="btn btn-success" style={{width:'100px'}} onClick={handlePrint}>Print</button> */}
                    {/* <button className="btn btn-info" style={{width:'100px', marginLeft:'15px'}} onClick={() => handleRefresh()}>Refresh</button> */}
                    <button className="btn-neo1-secondary" style={{width: '100px', marginLeft: '15px'}} onClick={() => handleRefresh()}>Refresh</button>
                    <button className="btn-neo1-dark" style={{width: '100px', marginLeft: '15px'}} onClick={() => handleBack()}>Back</button>
                </div>
            </div>
            { isLoading ?
                <div className="loading-container">
                    <CircularProgress className="loading" />
                    <p className="text">Loading data...</p>
                </div>
                : ""
            }    

            {isShowPayslip ? popupShowPaySlip("col-md-12") : ""}

            {/* {isShowDTR && datDTR ? showDTRList() : isShowDTR ? alert("No DTR data to show!") :"" } */}
            {isShowDTR ? showDTRList() : "" } 
            {isShowOtherDed ? showOtherDedutions() : ""}
              
        </div>
        </>
        
    );
};

export default Payslip;
