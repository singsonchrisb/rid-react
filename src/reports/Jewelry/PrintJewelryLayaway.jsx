import React, { useState, useEffect, useRef }  from 'react';

import moment from 'moment';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
// import { useReactToPrint } from "react-to-print";
import { TbShoppingCartCancel } from "react-icons/tb";

import { GetMyHeaders } from '../../pages/Functions/GetAPIToken';
import { MyServerHostJava,GetDepartmentList, GetItemBranch, getYear, getMonth, getDay, formatNumber, decryptPWord, delayMe, isValidDate }  from '../../pages/Functions/MyFunctions';
import '../../styles/Print.css';
import { TagCancelLayaway } from '../../firebase/queries';

import useEscapeKey from '../../hooks/useEscapeKey'; // Adjust the path as needed

let dbServerHostJava = MyServerHostJava();

const printStyles = `
    @media print {
      @page {
        /* size: portrait; */
        size: landscape;
      }
    }
  `;

 
const PrintJewelryLayaway = () => {
    // let gAccountType = Number(decryptPWord(sessionStorage.getItem('accountType')));
    let Navigate = useNavigate();
    var numBranch = sessionStorage.getItem('assignBranch');
    var gAssignBranch = numBranch ? "J"+numBranch:"";
    var gAcceesBranch ="";
    var gAccessToken="";
    

    gAccessToken = decryptPWord(sessionStorage.getItem("accessToken"));
    gAcceesBranch = gAssignBranch ? gAssignBranch:GetItemBranch();
        
    let curr = new Date();
    let curDate = curr.toISOString().substr(0,10);
    let startdate = moment().subtract(1, "days").format("YYYY-MM-DD");

    const componentRef = useRef();
    const selBranchRef = useRef(null);
    const reportTypeRef = useRef(null);
    const dateFromRef = useRef(null);
    const dateToRef = useRef(null);
    const isDatePeriodRef = useRef(null);
    const previewRef = useRef(null);
    
    const [datTable, setDataTable] = useState([]);  // data array for searching, pgnation
        
    const [isDatePeriod, setIsDatePeriod] = useState(false);
    // const [isPrint, setIstPrint] = useState(false);
    let isPrint=false;
    const [dateFrom, setDateFrom] = useState(startdate);
    const [dateTo, setDateTo] = useState(curDate);

    const optDepartment = GetDepartmentList();
    const [selBranch, setSelBranch] = useState(gAssignBranch ? gAssignBranch : gAcceesBranch ? gAcceesBranch : 'J1'); 
    const [selReportType, setSelReportType] = useState('');
    const optReportType = [
        {value: '0', text: ''},
        {value: '1', text: 'All'},
        {value: '2', text: 'Existing'},
        {value: '3', text: 'Cancelled'},
        {value: '4', text: 'Fully Paid'},
        {value: '5', text: 'For Cancellation'},
      ];

    useEffect(() => {
        // loadData(selBranch,1);
        // loadData(selBranch,selReportType);
        RefreshData(false)
    }, []);
    
    useEscapeKey(() => {
        Navigate("/"); // Navigate back to main page
  });


    const printTable = () => {
        const printContents = componentRef.current.innerHTML;
        // const printContents = document.getElementById('printableTable').innerHTML;
        const originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload();
    };


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
        //  if(gNoData2Print===false) {
        //     toast.error("No data to print!");
        //     return false;
        //  } else {
        //      handlePrint(); 
        //  }
        //  setIstPrint(true);
         isPrint=true;
         delayMe(5000);
        //  handlePrint(); 
         printTable();
    }

    // const handlePrint = useReactToPrint({ 
    //     content: () => componentRef.current,
    //     pageStyle: `
    //       @page {
    //         size: 8.5in 11in; /* Width x Height for short bond paper */
    //         margin: 11mm 11mm 11mm 11mm;
    //         @top-right {
    //           content: counter(page);
    //           float: right;
    //         }
    //       }
    //     `,
    //   });

    
    const RefreshData = async (tTrue) => { 
        setDataTable([]);
        if (tTrue===true) {
            toast.success("Data refreshed successfully.");
        }
        // setIstPrint(false);
        isPrint=false;
        // sv_ColumnHeader="";
        // refreshBranch(selBranch ? selBranch : gAcceesBranch, selReportType );
           //  console.log('datTable0:',datTable)
        loadData(selBranch,selReportType);
        //  alert(gAccountType)
    }
        
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
                setSelBranch(event.target.value);
                gAcceesBranch = event.target.value;
                sessionStorage.setItem("accessBranch",gAcceesBranch);
                // loadData(event.target.value,1);
                loadData(event.target.value,selReportType);
                // RefreshData();
                // sortByName();
            // }
        }
      };

    const handleChangeReportType = event => {
        const tValues=event.target.value
        setSelReportType(tValues);
        if (Number(tValues)===5) {
            setIsDatePeriod(true);
        }
        loadData(gAcceesBranch, tValues)
    };

    const handleInputChange = (e) => {
        if (e.target.name==="datefrom") {
            setDateFrom(e.target.value) 
        }
    };  

    const loadData = async (tBranch, tReportType ) => {
        //  console.log('dataPhysical:', dataPhysical)
        //  console.log('datTable:', datTable)
        //  console.log('datTable d1:', datTable.data.detail1)
        //  console.log('datTable d2:', datTable.data.detail2)
        //  console.log('datTable d3:', datTable.data.detail3)

        // ProcessMe(datTable.data.detail1);
         
        //  return false;
        // Layawa Options [1-All, 2-Existing, 3-Cancelled, 4-Fully Paid, 5-For Cancellation]

        // refreshBranch(tBranch, tReportType );

        let tFilterOptions = tReportType ? Number(tReportType) : 0 ;
        let tFilterDate="?from=" + dateFrom +"&to=" + dateTo;
        if(isDatePeriod) {
            tFilterDate="";
        }

        setDataTable([]); 
        try {
            await fetch(dbServerHostJava + "/api/j/report/layaway/" + tBranch + "/"+  tFilterOptions + tFilterDate, {
            method: 'GET',
            headers: GetMyHeaders(gAccessToken),
            })
            .then((response) => response.json() )
            .then((json) => {
                //  console.log("Status test:",json.status)
                //  console.log("inventory Data:",json)
                //  console.log("inventory Data1:",json.data)
                if (Number(json.status)===200) {
                    // console.log("Status test2:",json)
                    // alert(Number(tFilterOptions))
                    if (Number(tFilterOptions)===1) {
                        // console.log("inventory DataAll:",json.data.all)
                        setDataTable(json.data.all); 
                    } else if (Number(tFilterOptions)===2) {
                        setDataTable(json.data.existing); 
                    } else if (Number(tFilterOptions)===3) {
                        setDataTable(json.data.cancelled);
                    } else if (Number(tFilterOptions)===4) {
                        // alert(Number(tFilterOptions))
                        setDataTable(json.data.fullyPaid);
                    } else if (Number(tFilterOptions)===5) {
                        setDataTable(json.data.forCancellation);
                    }
                } else {
                     toast.error("Branch: " + selBranch  + ", Error: " + json.error );
                }
            })
            // console.log("test3",json) 
        } catch (err) {
             console.log(err)
            
        }
    }

    function refreshBranch(tBranch, laOption) {
        // let laOption = Number(tLAOption) <=0 || tLAOption===undefined ? 1 : tLAOption; 
        let tRptTitle = "";
        // alert(laOption)
        if (Number(laOption)===1 || Number(laOption) <=1 || laOption===undefined) {
            tRptTitle = "Existing/Cancelled/Fully Paid";
        } else if (Number(laOption)===2) {
            tRptTitle = "Existing";
        } else if (Number(laOption)===3) {
            tRptTitle = "Cancelled";
        } else if (Number(laOption)===4) {
            tRptTitle = "Fully Paid";
        } else if (Number(laOption)===5) {
            tRptTitle = "For Cancellation";
        }
        // alert(tRptTitle)
        return tRptTitle + " - LA Detailed Report [Branch " + tBranch.substring(1) + "]";
    }

    function showForDate() {
        if (isDatePeriod) {
            return "Period: all";
        } else {

            let tDate=dateTo;
            let fDate=dateFrom;
            if (!fDate || fDate===undefined) {
                toast.error('Invalid date from: ' + fDate);
                return 'Invalid date from: ' + fDate ;
            }    
            if (!tDate || tDate===undefined) {
                toast.error('Invalid date to: ' + tDate);
                return 'Invalid date to: ' + tDate ;
            }    
            if (tDate < fDate) {
                toast.error('Invalid date to: ' + tDate + '. It should be greater than the from date.');
                return 'Invalid date to: ' + tDate + '';
            }
            return "Period: " + getMonth(fDate,'MMM')  + ". " + getDay(fDate,'DD') + ", " + getYear(fDate,'YYYY')   +" to " + getMonth(tDate,'MMM')  + ". " + getDay(tDate,'DD') + ", " + getYear(tDate,'YYYY');
        }
    }

    function PrintHeader() {
        return (
            <div>
                {/* <h6 style={{textAlign:'left', fontSize:'15px'}}>{refreshBranch(selBranch, selReportType)}</h6> */}
                <label style={{textAlign:'left', fontSize:'15px'}}>{refreshBranch(selBranch, selReportType)}</label>
                <br></br>
                <label style={{textAlign:'left', fontSize:'10px'}}>{showForDate()}</label>
            </div>
        )
    }  

    function getRemarks(dtRead) {
        // let cRemarks='';
        let cRemarks=dtRead?.layawayInfo?.customerDetails?.contactNo;
        // if(Number(selReportType) ===1){
           if (isValidDate(dtRead?.layawayInfo?.cancelled)) {
              cRemarks='CAN' +  moment(dtRead?.layawayInfo?.cancelled,'YYYY-MM-DD').format('MM/DD/YY')
           } else if (isValidDate(dtRead?.layawayInfo?.fullyPaid)) {
              cRemarks='FP ' +  moment(dtRead?.layawayInfo?.fullyPaid,'YYYY-MM-DD').format('MM/DD/YY')
           } else {
              
           }
        // }
        return cRemarks;
    }

    function PrintLAGroupByCustomer() {
        // let dtRead2 = datTable?.data?.detail2
        // let dtRead2 = datTable?.all;
        // console.log('datTable: ',datTable)

        let dtRead2 = datTable;
        // alert('selReportType : ' + Number(selReportType))
        // if (Number(selReportType)===2){
        //     dtRead2 = datTable?.existing;
        // } else if (Number(selReportType)===3){
        //     dtRead2 = datTable?.cancelled;
        // } else if (Number(selReportType)===4){
        //     dtRead2 = datTable?.fullyPaid;    
        // } else if (Number(selReportType)===5){    
        //     alert('ReportType not set : ' + Number(selReportType))
        // } else {
        //     // dtRead2 = datTable?.all;
        // }
    
        
        return (
            <div>
                {PrintHeader()}
                <div style={{marginTop:'3px', with:'100%', color:'gray',border:'solid 1px' }}></div>
                <table className="print-styled-table" style={{fontSize: '9px',margin:'0 0 0 0'}} >
                    <thead>
                        <tr style={{borderBottom: '1px solid gray'}}>
                            <th style={{textAlign: "left", width: "8px"}}> </th>
                            <th style={{textAlign: "left", width: "190px"}}>Customer</th>

                            <th style={{textAlign: "left", width: "40px"}}>Dt Sold</th>
                            <th style={{textAlign: "left", width: "50px"}}>LA#</th>
                            <th style={{textAlign: "left", width: "60px"}}>Tag Price</th>
                            <th style={{textAlign: "left", width: "30px"}}>Wt</th>
                            <th style={{textAlign: "left", width: "60px"}}>Sold Price</th>
                            <th style={{textAlign: "left", width: "60px"}}>Pr/gram</th>
                            <th style={{textAlign: "left", width: "10px"}}>#</th>
                            <th style={{textAlign: "left", width: "40px"}}>Dt Paid</th>
                            <th style={{textAlign: "left", width: "60px"}}>Payment</th>
                            <th style={{textAlign: "left", width: "60px"}}>Balance</th>
                            <th style={{textAlign: "left", width: "20px"}}>Term</th>
                            <th style={{textAlign: "left", width: "40px"}}>Due Dt</th>
                            <th style={{textAlign: "left", width: "60px"}}>Remarks</th>
                            { Number(selReportType)===5 && isPrint===false  ? <th> Action </th> :""}
                        </tr>
                    </thead>
                    <tbody>
                        {  dtRead2 && dtRead2.map((jsonRec, index) => (
                            <React.Fragment key={index}>
                            <tr>
                                {/* rowSpan={jsonRec.items.length + 1} */}
                                <td  > {index+1}] </td>
                                <td  style={{textAlign: "left", width: "190px"}} > {jsonRec?.layawayInfo?.customerDetails?.customerName} </td>
                                <td > {moment(jsonRec?.layawayInfo?.dateApply,'YYYY-MM-DD').format('MM/DD/YY')} </td>
                                <td > {jsonRec?.layawayInfo?.layAwayForm} </td>
                                <td style={{textAlign: "right", width: "60px"}} > {formatNumber(jsonRec?.layawayInfo?.items[0]?.unitPrice)} </td>
                                <td style={{textAlign: "right"}}> {formatNumber(jsonRec?.layawayInfo?.items[0]?.actualWeight)} </td>
                                <td style={{textAlign: "right", width: "60px"}}> {formatNumber(jsonRec?.layawayInfo?.items[0]?.soldPrice)} </td>
                                <td style={{textAlign: "right"}}> {formatNumber(jsonRec?.layawayInfo?.items[0]?.soldPrice/jsonRec?.layawayInfo?.items[0]?.actualWeight)} </td>
                                {/* <td> {jsonRec?.paymentNum} </td> */}
                                <td> DP </td>
                                <td> {moment(jsonRec.layawayInfo?.dateApply,'YYYY-MM-DD').format('MM/DD/YY')} </td>
                                <td style={{textAlign: "right"}}> {formatNumber(jsonRec?.layawayInfo?.layAwayDetails?.downPayment)} </td>
                                <td style={{textAlign: "right"}}> {formatNumber(jsonRec?.layawayInfo?.layAwayDetails?.remainingBalance)} </td>
                                <td style={{textAlign: "right"}}> {jsonRec?.layawayInfo?.layAwayDetails?.monthsToPay} </td>
                                <td> {moment(jsonRec?.layawayInfo?.dateApply,'YYYY-MM-DD').format('MM/DD/YY')} </td>
                                <td> {getRemarks(jsonRec)} </td>
                                
                                { Number(selReportType)===5 && isPrint===false ? 
                                    <td> <TbShoppingCartCancel className='action-button' onClick={() => handleTagCancel(jsonRec)}  /> </td> :""
                                }
                            </tr>
                            {jsonRec?.payments?.slice(0).map((pay, i) => (
                                <tr key={i}>
                                    <td ></td>
                                    <td colSpan={7} >{i===0? <label style={{marginLeft:'10px'}} >{jsonRec?.layawayInfo?.items[0].barcode + ' ' + jsonRec.layawayInfo?.items[0].classCode + ' ' + jsonRec.layawayInfo?.items[0].name + ' '+jsonRec.layawayInfo?.items[0].actualWeight + 'g'}</label> : <label style={{marginLeft:'0px'}} > </label>}</td>
                                    {/* <td >{i===0? <label style={{marginLeft:'1px'}} >{jsonRec.items[0].name }</label> : <label style={{marginLeft:'0px'}} > </label>}</td> */}
                                    
                                    <td style={{textAlign: "center" }}>{pay.paymentNum}</td>
                                    <td style={{textAlign: "left"}} > {moment(pay?.datePay,'YYYY-MM-DD').format('MM/DD/YY')} </td>
                                    <td style={{textAlign: "right"}}> {formatNumber(pay?.amountPay)} </td>
                                    <td style={{textAlign: "right"}}> {formatNumber(pay?.remainingBalance)} </td>
                                </tr>
                            ))}    
                            
                            </React.Fragment>

                        ))}
                        
                    
                        
                    </tbody>
                    
                    {/* <tfoot><td>
                    <div className="footer-space"> </div>
                   </td></tfoot> */}
                </table>
                
                <div style={{marginTop:'3px', with:'100%', color:'gray',border:'solid 1px' }}></div>
                <br></br>
            </div>
        )
    }
       
  const handleTagCancel = async (dtRead) => {
    // console.log('dtRead: ', dtRead);
    

    let layAwayNum=dtRead?.layawayInfo?.layAwayNo;
    let layAwayForm=dtRead?.layawayInfo?.layAwayForm;
    // let layAwayNum='2HI1DQL0Z7';
    if (isValidDate(dtRead?.layawayInfo?.cancelled), true) {
        toast.error('Layaway Control No.: ' + layAwayNum +  ' and Layaway Form No.: ' + layAwayForm +  ' already tag cancelled!');
        return ""
    }

    if (dtRead?.layawayInfo?.cancelled===undefined) {
        toast.error('Layaway Control No.: ' + layAwayNum  +  ' and Layaway Form No.: ' + layAwayForm + ' field cancelled not found in collection, please create!');
    }
    
    if (window.confirm("Are you sure that you wanted to cancel this \nLayaway Control No.: "+ layAwayNum +" with Layaway Form No.: " + dtRead?.layawayInfo?.layAwayForm +"?")) {
        await TagCancelLayaway(gAcceesBranch, layAwayNum, layAwayForm, true);
        RefreshData(true);
    }
  }    

  const handleTagAllCancel = async () => {
    let dtRead= datTable;
    if (dtRead?.length <=0) {
    //    alert("NO records to Tag Cancel!");
       toast.error("NO records to Tag Cancel!");
       return ""
    }

    if (window.confirm("Are you sure that you wanted to cancel all layaway?")) {
        let layAwayNum="";
        let layAwayForm="";

        dtRead.forEach((value) => {
            layAwayNum=value?.layawayInfo?.layAwayNo;
            layAwayForm=value?.layawayInfo?.layAwayForm;
            TagCancelLayaway(gAcceesBranch, layAwayNum, layAwayForm, false);
        });
        RefreshData(true);
    } else {

    }
  }    

  return (
    <>
    <div id='main' >
    <div className='print-section-85115' style={{textAlign:'left',marginTop:'5px' }} >
           <label style={{marginLeft: '32px',marginRight: '10px'}} >Branch : </label>
           <select 
                className='chrich-custom-select'
                style={{width: '200px'}}
                value={selBranch}
                   name="selbranch"
                   onKeyDown={handleEnter}
                   ref={selBranchRef}
                   onChange={handleChangeDepartment}
                   disabled={gAssignBranch ? true: false}
           >
           {optDepartment.map(option => (
                <option key={option.value} value={option.value}>
                {option.text}
                </option>
           ))}
           </select>
           <br></br>
           
           <input 
               style={{marginLeft: '92px',marginRight: '5px'}} 
                type='checkbox' 
                name='isDatePeriod'
                defaultChecked={isDatePeriod}
                checked={isDatePeriod}
                value={false}
                // value={isDatePeriod}
                onKeyDown={handleEnter}
                ref={isDatePeriodRef}
                onChange ={() =>  setIsDatePeriod(!isDatePeriod)}	
           />
           <label>All Layaway Installments</label>
           <br></br>
           <label style={{marginLeft:'10px',marginRight: '10px'}} >From Date :</label>
           <input
                className={isDatePeriod ? 'chrich-custom-select-disabled': 'chrich-custom-select'}
                style={{width: '130px'}}
                type="date"
                name="datefrom"
                ref={dateFromRef}
                onChange ={(e) => handleInputChange(e)}
                onKeyDown={handleEnter} 
                value={isDatePeriod ? "" : dateFrom || ""}
                disabled={isDatePeriod}
           />
           {/* <br></br> */}
           <label style={{marginTop:'10px',marginLeft:'22px',marginRight: '10px'}} >To Date :</label>
            <input
                className={isDatePeriod ? 'chrich-custom-select-disabled': 'chrich-custom-select'}
                style={{width: '130px'}}
                type="date"
                name="dateto"
                ref={dateToRef}
                onChange ={(e) => handleInputChange(e)}
                onKeyDown={handleEnter} 
                value={isDatePeriod ? "" : dateTo || ""}
                disabled={isDatePeriod}
            />

           <br></br>
           <label style={{marginLeft:'0px'}} >Report Type :</label>
            <select 
                className='chrich-custom-select'
                style={{marginLeft:'10px', width:'200px'}}
                name="selReportType"
                ref={reportTypeRef}
                onChange={handleChangeReportType}
                onKeyDown={handleEnter} 
                // checked={isDatePeriod}
                value={selReportType || ""}
                // disabled={isAdd ? false: true}
                > 
                {optReportType.map(option => (
                    <option key={option.value} value={option.value}>
                    {option.text}
                    </option>
                ))}
            </select>

           {/* <br></br> */}
           <button className="btn-neo1-primary" style={{width: '75px',height:'35px',  marginLeft: '40px' }} onClick={() => RefreshData(true)}>Apply</button>
           <button className={'btn-neo1-add'} style={{width: '90px',height:'35px',marginLeft:'50px',marginRight:'5px'}} ref={previewRef} disabled={datTable?.length >0 ? false:true} onClick={handPrinCheck} >Preview </button> 
           <button className={"btn-neo1-danger"} style={{width: '90px',height:'35px',marginLeft:'10px',marginRight:'00px' }} onClick={() => Navigate('/')} >Cancel</button>

           {/* <button className={dateFrom===curDate ? "btn-neo1 btn-neo1-secondary":""} style={{width: '75px',  marginLeft: '10px',  height: '32px' }} disabled={dateFrom===curDate ? false:true} onClick={() => RepostData() }>Re-post</button> */}
           <br></br>
           {/* <div>{message1}</div> */}
           <div style={{marginTop:'5px', with:'100%', color:'gray',border:'solid 1px' }}></div>
           <br></br>
            {/* <div className='print-section-85115' style={{ display: "none1"}}> */}
            
            { Number(selReportType)===5  ? 
               <div style={{margin: '0 auto',textAlign: 'center', justifyContent: 'center' }}>
                    <button className="btn-neo1-success" style={{width: '50%',  height: '35px' }} onClick={() => handleTagAllCancel()}>Tag All Cancel</button>
                </div>
                :""
                
            }

            <div className={Number(selReportType) !==5? 'print-section-85115' : 'styled-table'} style={{ display: "none1"}}>
                <div style={{ maxWidth: '100%', margin: '0 auto'}} ref={componentRef} >
                    {/* {datTable && datTable.length >0 ? PrintLAGroupByCustomer() : ""} */}
                    {PrintLAGroupByCustomer()}
                    <style>
                        {printStyles}
                    </style>
                </div>
                <br></br>
                {/* <h6 style={{textAlign:'left',fontSize: '12px'}}>------------------- nothing follows ------------------</h6>
                <h6 style={{textAlign:'left',fontSize: '12px'}}>Note : Items not delivered are not included in this report!</h6> */}
                

            </div>
        </div>
        </div>
    </>

  )
}


export default PrintJewelryLayaway