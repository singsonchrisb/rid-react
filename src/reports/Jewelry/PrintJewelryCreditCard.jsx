
import React, { useState, useEffect, useRef }  from 'react';

import moment from 'moment';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { GetMyHeaders } from '../../pages/Functions/GetAPIToken';
import { MyServerHostJava, getYear, getMonth, getDay, formatNumber, decryptPWord, delayMe }  from '../../pages/Functions/MyFunctions';
import '../../styles/Print.css';
// import { format } from 'date-fns';
// GetDepartmentList, GetItemBranch,


import useEscapeKey from '../../hooks/useEscapeKey'; // Adjust the path as needed

let dbServerHostJava = MyServerHostJava();
// let lineCounter = 0;
let grandTotal =0;

const styles = {
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    textAlign: 'left',
    border: 'solid 1px gray',
    padding: '0px 5px',
    width: "60px"
  },
  td: {
  //   border: 'solid 1px gray',
    borderLeft: 'solid 1px lightgray',
    padding: '0px 5px',
  },
  container: {
      display: 'flex',
      justifyContent: 'spaceBetween',
      width: '100%',
      // marginLeft:'100px',
  },
  column: {
      width: '34%',
      // marginLeft:'12px',
      borderTop: '1px solid gray',
      marginLeft: '280px',
  },
  row: {
      display: 'flex',
      justifyContent: 'spaceBetween',
      padding: '5px 0',
      // marginLeft:'20px',
      
  },
  amount: {
      width: '40%',
      textAlign: 'right',
      fontWeight: 'bold',
      fontSize: '14px',
      // marginRight: '12px',
      // borderTop: '1px solid gray',
  },
  GrandTotal: {
      width: '60%',
      textAlign: 'left',
      fontSize: '14px',
      // borderTop: '1px solid gray',
      // marginLeft: '280px',
  }


};

const printStyles = `
    @media print {
      @page {
        size: portrait; 
      }
      .page-break { 
        page-break-before: always; 
      }
      .page-number {
        display: block;
        text-align: center;
        margin-top: 20px;
        font-weight: bold;
      }
    }
  `;



const PrintJewelryCreditCard = () => {
      let Navigate = useNavigate();
      // let isPrint=false;
      var gAccessToken="";
      gAccessToken = decryptPWord(sessionStorage.getItem("accessToken"));

      let curr = new Date();
      let curDate = curr.toISOString().substr(0,10);
      let startdate = moment().subtract(1, "days").format("YYYY-MM-DD");

      const componentRef = useRef();
      const dateFromRef = useRef(null);
      const dateToRef = useRef(null);
      const previewRef = useRef(null);
      
      const [datTable, setDataTable] = useState([]);  // data array for searching, pgnation
      const [dateFrom, setDateFrom] = useState(startdate);
      const [dateTo, setDateTo] = useState(curDate);

      useEffect(() => {
        RefreshData(false)
    }, []);

    useEscapeKey(() => {
      Navigate("/"); // Navigate back to main page
});


    const printTable = () => {
        const printContents = componentRef.current.innerHTML;
        // const printContents = document.getElementById('printableTable').innerHTML;
        const originalContents = document.body.innerHTML;

        // Create a temporary container to hold the print content
        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = printContents;
        document.body.innerHTML = tempContainer.innerHTML;

        // Add page numbers
        const pageBreaks = tempContainer.querySelectorAll('.page-break');
        pageBreaks.forEach((breakElem, index) => {
            const pageNumberElem = document.createElement('div');
            pageNumberElem.className = 'page-number';
            // pageNumberElem.innerHTML = `PageKo ${index + 1}`;
            breakElem.parentNode.insertBefore(pageNumberElem, breakElem.nextSibling);
        });

        // Replace the body content with the modified print content
        document.body.innerHTML = tempContainer.innerHTML;

        // document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload();
    };


    const handPrinCheck = async () => {
         RefreshData(false);
        //  isPrint=true;
         delayMe(5000);
         printTable();
    }

        
    const RefreshData = async (tTrue) => { 
        setDataTable([]);
        if (tTrue===true) {
            toast.success("Data refreshed successfully.");
        }
        // setIstPrint(false);
        // isPrint=false;
        loadData();
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
    const handleInputChange = (e) => {
      if (e.target.name==="datefrom") {
          setDateFrom(e.target.value) 
      } else if (e.target.name==="dateto") {    
          setDateTo(e.target.value) 

      }
  };  

  const loadData = async () => {

      let tFilterDate="?from=" + dateFrom +"&to=" + dateTo;

      setDataTable([]); 
      try {
         await fetch(dbServerHostJava + "/api/j/report/cards" +  tFilterDate, {
          // GET  https://oroerp.net/erp/api/j/report/cards?from={fromDate}&to={toDate}
          method: 'GET',
          headers: GetMyHeaders(gAccessToken),
          })
          .then((response) => response.json() )
          .then((json) => {
                
                // console.log("Status test:",json.status)
                // console.log("inventory Data:",json)
                // console.log("inventory Data1:",json.data)

              if (Number(json.status)===200) {
                  setDataTable(json.data); 
                  // console.log("Status test:",json.status)
                  // console.log("inventory Data1:",json.data)
                  // console.log("Status test2:",json)
                  // alert(Number(tFilterOptions))
              } else {
                   toast.error("No data to load for Credit Card. Error: " + json.error );
              }
          })
          // console.log("test3",json) 
      } catch (err) {
           console.log(err)
          
      }

      
  }

  function refreshBranch() {
    return "Credit Card Report List";
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
            {/* <h6 style={{textAlign:'left', fontSize:'15px'}}>{refreshBranch(selBranch, selReportType)}</h6> */}
            <label style={{textAlign:'left', fontSize:'15px',fontWeight: 'bold'}}>JEWELRY</label>
            <br></br>
            <label style={{textAlign:'left', fontSize:'15px'}}>{refreshBranch()}</label>
            <br></br>
            <label style={{textAlign:'left', fontSize:'10px'}}>{showForDate()}</label>
            <br></br>
            <br></br>
        </div>
    )
}  
function recomputeGrandTotal(nTotal) {
  grandTotal =grandTotal+ nTotal
}

const PrintDetails = () => {
  // console.log('datTable',datTable);
  if (!datTable || datTable.count <=0) {
       return false;
  }
  let dtRead2 = datTable.cards;
  // console.log('dtRead2',dtRead2);

return (
  <div  className="page-break" style={{marginTop:'3px', with:'100%', fontSize: '9px', border: 'none' }}>
     {PrintHeader()} 
     <table className="print-styled-table" style={{fontSize: '9px',margin:'0 0 0 0'}}>
          <thead>
                 <tr style={{borderBottom: '1px solid gray'}}>
                  {/* <tr> */}
                      <th style={{...styles.th, width: "8px" }}>#</th>
                      <th style={{...styles.th, width: "25px" }}>Date</th>
                      <th style={{...styles.th, width: "80px" }}>Card Type</th>
                      <th style={{...styles.th, width: "150px" }}>Card Holder</th>
                      <th style={{...styles.th, width: "60px" }}>Card No.</th>
                      <th style={{...styles.th, width: "60px" }}>O.R. No.</th>
                      <th style={{...styles.th, width: "60px" }}>Ref. No.</th>
                      <th style={{...styles.th, width: "50px" }}>Amount Paid</th>
                      <th style={{...styles.th, width: "100px" }}>Bank</th>
                      <th style={{...styles.th, width: "10px" }}>Term</th>
                      <th style={{...styles.th, width: "10px" }}>Branch</th>
                  </tr>
             </thead>
             <tbody>
                  {  dtRead2 && dtRead2.map((jsonRec, index) => (
                      <React.Fragment key={index}>
                        {recomputeGrandTotal(jsonRec.amountPaid)}
                      <tr>
                          <td  > {index+1} </td>
                          <td > {moment(jsonRec?.reportDate,'YYYY-MM-DD').format('MM/DD/YY')} </td>
                          <td > {jsonRec?.cardType} </td>
                          <td > {jsonRec?.cardHolder} </td>
                          <td > {jsonRec?.cardNumber} </td>
                          <td > {jsonRec?.orNumber} </td>
                          <td > {jsonRec?.refNumber} </td>
                          <td style={{textAlign: "right", width: "60px"}} > {formatNumber(jsonRec?.amountPaid)} </td>
                          <td > {jsonRec?.bank} </td>
                          <td style={{...styles.td, textAlign:'center'}} > {jsonRec?.term} </td>
                          <td style={{...styles.td, textAlign:'center'}} > {jsonRec?.hscode} </td>
                      </tr>
                      </React.Fragment>
                  ))}
                  {/* <tr>
                    <td colSpan="5"></td>
                    <td colSpan="7">GRAND TOTAL --->>
                        <span style={{...styles.amount}}>{grandTotal}</span>
                    </td>
                  </tr> */}
             </tbody>
          </table>
          <div style={{...styles.container}}>
              <div style={{...styles.column}}>
                  <div style={{...styles.row}}>
                      <span style={{...styles.GrandTotal}}>Grand Total :</span>
                      <span style={{...styles.amount}}>{formatNumber(grandTotal)}</span>
                  </div>
              </div>
          </div>
  
  </div>
  )
}

  return (
    <>
    <div id='main' >
    <div className='print-section-85115' style={{textAlign:'left',marginTop:'5px' }} >

           <br></br>
           <label style={{marginLeft:'10px',marginRight: '10px'}} >From Date :</label>
           <input
                className={'chrich-custom-select'}
                style={{width: '130px'}}
                type="date"
                name="datefrom"
                ref={dateFromRef}
                onChange ={(e) => handleInputChange(e)}
                onKeyDown={handleEnter} 
                value={dateFrom || ""}
           />
           <label style={{marginTop:'10px',marginLeft:'22px',marginRight: '10px'}} >To Date :</label>
            <input
                className={'chrich-custom-select'}
                style={{width: '130px'}}
                type="date"
                name="dateto"
                ref={dateToRef}
                onChange ={(e) => handleInputChange(e)}
                onKeyDown={handleEnter} 
                value={dateTo || ""}
            />

           <br></br>
           <br></br>
           <button className="btn-neo1-primary" style={{width: '75px', height: '35px',  marginLeft: '90px' }} onClick={() => RefreshData(true)}>Apply</button>
           
           <button className={'btn-neo1-add'} style={{width: '90px', height: '35px',marginLeft:'50px',marginRight:'5px'}} ref={previewRef} disabled={datTable?.count >0 ? false:true} onClick={handPrinCheck} >Preview </button> 
           <button className={"btn-neo1-danger"} style={{width: '90px', height: '35px',marginLeft:'10px',marginRight:'00px' }} onClick={() => Navigate('/')} >Cancel</button>

           <br></br>
           <div style={{marginTop:'5px', with:'100%', color:'gray',border:'solid 1px' }}></div>
           <br></br>
           
            <div className={'print-section-85115'} style={{ display: "none1w"}}>
                <div style={{ maxWidth: '100%', margin: '0 auto'}} ref={componentRef} >
                    <style>
                        {printStyles}
                    </style>
                    {PrintDetails()}
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

export default PrintJewelryCreditCard