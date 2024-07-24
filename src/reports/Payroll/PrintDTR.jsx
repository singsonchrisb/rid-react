import React, { useState, useEffect, useRef }  from 'react';

import moment from 'moment';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
// import CloseIcon from '@mui/icons-material/Close';
// import { useReactToPrint } from "react-to-print";
// import { TbShoppingCartCancel } from "react-icons/tb";

// import { GetMyHeaders } from '../../pages/Functions/GetAPIToken';
import { getYear, getMonth, getDay, formatNumber, decryptPWord, delayMe, isValidDate }  from '../../pages/Functions/MyFunctions';
import '../../styles/Print.css';

// let dbServerHostJava = MyServerHostJava();

const printStyles = `
    @media print {
      @page {
        /* size: portrait; */
        size: landscape;
      }
    }
  `;

 
const PrintDTR = (props) => {
    // let gAccountType = Number(decryptPWord(sessionStorage.getItem('accountType')));
    let Navigate = useNavigate();
    var gAccessToken="";
    
    // console.log('props',props.data)
    gAccessToken = decryptPWord(sessionStorage.getItem("accessToken"));
            
    // let curr = new Date();
    // let curDate = curr.toISOString().substr(0,10);
    // let startdate = moment().subtract(1, "days").format("YYYY-MM-DD");
    // let enddate = moment(props.data[0]?.cutOff).format("YYYY-MM-DD");
    
    //  props.dataEmpInfo?.fromDate
     
    let startdate = moment(props.dataEmpInfo?.fromDate).format("YYYY-MM-DD");
    let enddate = moment(props.dataEmpInfo?.toDate).format("YYYY-MM-DD");

    const componentRef = useRef();
    const dateFromRef = useRef(null);
    const dateToRef = useRef(null);
    const previewRef = useRef(null);
    
    // const [datTable, setDataTable] = useState([props.datDTR]);  // data array for searching, pgnation
    const [datTable, setDataTable] = useState(props.data);  
    let isPrint=false;
    const [dateFrom, setDateFrom] = useState(startdate);
    const [dateTo, setDateTo] = useState(enddate);
    const [isDatePeriod, setIsDatePeriod]=useState(true);


    useEffect(() => {
        RefreshData(false)

    }, []);


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
         RefreshData(false);
         isPrint=true;
         delayMe(5000);
         printTable();
    }
    
    const RefreshData = async (tTrue) => { 
        
        if (props.printOn===false) {
            console.log('datTable printoff ',datTable)    
            return true;   
        } else {
            console.log('datTable printOn ',datTable)    
            setDataTable([]);
            if (tTrue===true) {
                toast.success("Data refreshed successfully.");
            }
            isPrint=false;
            loadData();
        }
    }
        
    const handleEnter = (event) => {
        if (event.key.toLowerCase() === "enter") {
            if (event.target.name==="selbranch") {
                return true;
                
            } else if (event.target.name==='datefrom') {    
                RefreshData(false);
                return true;
            }    
        } else if (event.keyCode===112) {
              event.preventDefault();
              return false;
        } else if (event.keyCode >=113 && event.keyCode <=123) {
              event.preventDefault();      
        }
    }            

    const handleInputChange = (e) => {
        if (e.target.name==="datefrom") {
            setDateFrom(e.target.value) 
        }
    };  

    const loadData = async () => {
        
        
    }

        function showForDate() {

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

    function PrintHeader() {
        return (
            <div>
                <label style={{textAlign:'left', fontSize:'15px'}}>DTR List</label>
                <br></br>
                <label style={{textAlign:'left', fontSize:'15px'}}>{props.dataEmpInfo.empName} [{props.dataEmpInfo.empID}]</label>
                <br></br>
                <label style={{textAlign:'left', fontSize:'10px'}}>{showForDate()}</label>
            </div>
        )
    }  

    function PrintDTRList() {
        return (
            <div>
                {PrintHeader()}
                <div style={{marginTop:'3px', with:'100%', color:'gray', border: props.printOn ?  'solid 1px' : 'none' }}></div>
                <table className="print-styled-table" style={{fontSize: '9px',margin:'0 0 0 0'}} >
                    <thead>
                        <tr style={{borderBottom: '1px solid gray'}}>
                            <th style={{textAlign: "left", width: "8px"}}> </th>
                            <th style={{textAlign: "left", width: "65px"}}>Date</th>
                            {/* <th style={{textAlign: "left", width: "10px"}}>Day</th> */}
                            <th style={{textAlign: "left", width: "60px"}}>Time In</th>
                            <th style={{textAlign: "left", width: "60px"}}>Time Out</th>
                            <th style={{textAlign: "left", width: "80px"}}>Hour Work</th>
                            <th style={{textAlign: "left", width: "60px"}}>Late min.</th>
                            <th style={{textAlign: "left", width: "60px"}}>Late Amount</th>
                            <th style={{textAlign: "left", width: "60px"}}>Under Min</th>
                            <th style={{textAlign: "left", width: "60px"}}>Under Amount</th>
                            <th style={{textAlign: "left", width: "40px"}}>Day Off</th>
                            <th style={{textAlign: "left", width: "210px"}}>Remarks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {  datTable && datTable.map((jsonRec, index) => (
                            <React.Fragment key={index}>
                            <tr>
                                <td > {index+1}] </td>
                                <td > {moment(jsonRec?.TransDate,'YYYY-MM-DD').format('MM/DD/YY ddd')} </td>
                                <td style={{textAlign: "right", width: "60px"}}> {jsonRec?.TimeIN} </td>
                                <td style={{textAlign: "right", width: "60px"}}> {jsonRec?.TimeOut} </td>
                                <td > {jsonRec?.Hourwork} </td>
                                <td > {jsonRec?.late} </td>
                                <td > {jsonRec?.tardAmt} </td>
                                <td > {jsonRec?.UtimeMin} </td>
                                <td > {jsonRec?.underAmt} </td>
                                <td > {jsonRec?.dayoff} </td>
                                <td > {jsonRec?.status} </td>
                            </tr>
                            </React.Fragment>

                        ))}
                    </tbody>

                    
                    {/* <tfoot><td>
                    <div className="footer-space"> </div>
                   </td></tfoot> */}
                </table>
                
                {/* <div style={{marginTop:'2px', with:'100%', color:'gray',border:'solid 1px' }}></div> */}
                <div style={{marginTop:'8px', fontSize: '13px'}}>
                    <label>Official Time Schedule  =  Time In: {datTable[0]?.stimein} </label>  
                    <label style={{marginLeft: '30px'}} > Time Out: {datTable[0]?.stimeout} </label>  
                    <br></br>
                    <label>Day off Time Schedule =  Time In: {datTable[0]?.sofftimein} </label>  
                    <label style={{marginLeft: '30px'}} > Time Out: {datTable[0]?.sofftimeout} </label>  
                    <label style={{marginLeft: '30px'}} > {datTable[0]?.dayoff} </label>  
                    <br></br>
                    <label> Branch: {datTable[0]?.Branch} </label>
                </div>
            </div>
        )
    }
       

  return (
    <>
    <div className='print-section-85115' style={{textAlign:'left',marginTop:'5px' }} >
        {props.printOn ?
                <>
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
                    <button className="btn-neo1-primary" style={{width: '75px',height:'35px',  marginLeft: '40px' }} disabled={isDatePeriod} onClick={() => RefreshData(true)}>Apply</button>
                    <button className={'btn-neo1-add'} style={{width: '90px',height:'35px',marginLeft:'50px',marginRight:'5px'}} ref={previewRef} disabled={datTable?.length >0 ? false:true} onClick={handPrinCheck} >Preview </button> 
                    <button className={"btn-neo1-danger"} style={{width: '90px',height:'35px',marginLeft:'10px',marginRight:'00px' }} onClick={() => Navigate(-1)} >Cancel</button>
                </>
              :""
           }

           <br></br>
           <div style={{marginTop:'5px', with:'100%', color:'gray',border:'solid 1px' }}></div>
           <br></br>
            <div className={'styled-table'} style={{ display: "none1"}}>
                <div style={{ maxWidth: '100%', margin: '0 auto'}} ref={componentRef} >
                    {PrintDTRList()}
                    <style>
                        {printStyles}
                    </style>
                </div>
                <br></br>
            </div>
        </div>
    </>
  )
}


export default PrintDTR