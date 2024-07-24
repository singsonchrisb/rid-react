import React, { useState, useEffect, useRef }  from 'react';

import moment from 'moment';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
// import { TbShoppingCartCancel } from "react-icons/tb";

import { GetMyHeaders } from '../../pages/Functions/GetAPIToken';
import { MyServerHostJava,GetDepartmentList, GetItemBranch, getYear, getMonth, getDay, formatNumber, decryptPWord, delayMe, isValidDate }  from '../../pages/Functions/MyFunctions';
import '../../styles/Print.css';
import useEscapeKey from '../../hooks/useEscapeKey'; // Adjust the path as needed

let dbServerHostJava = MyServerHostJava();

const styles = {
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    th: {
      textAlign: 'left',
      border: 'solid 1px gray',
      padding: '5px',
    },
    td: {
      border: 'solid 1px gray',
      padding: '5px',
    },
    totalRow: {
      fontWeight: 'bold',
    },
  };

let thStyles ={
     textAlign: "left", 
     borderRight: 'solid 1px gray',
     width: "60px"
}


const PrintJewelryFlaps = () => {

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
    const dateFromRef = useRef(null);
    const dateToRef = useRef(null);
    const previewRef = useRef(null);

    
    const [datTable, setDataTable] = useState([]);  // data array for searching, pgnation
    const [dateFrom, setDateFrom] = useState(startdate);

    const [dateTo, setDateTo] = useState(curDate);

    const optDepartment = GetDepartmentList();
    const [selBranch, setSelBranch] = useState(gAssignBranch ? gAssignBranch : gAcceesBranch ? gAcceesBranch : 'J1'); 

    useEffect(() => {
        // loadData(selBranch,1);
        // loadData(selBranch,selReportType);
        RefreshData(false)
    }, []);

    useEscapeKey(() => {
      Navigate("/"); // Navigate back to main page
});

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
            toast.error("Please select branch...");
            alert("Please select branch...")  ;
            return false;
         }
         delayMe(5000);
         handlePrint(); 
    }

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
        `,
      });

    
    const RefreshData = async (tTrue) => { 
        setDataTable([]);
        if (tTrue===true) {
            toast.success("Data refreshed successfully.");
        }
        loadData(selBranch);
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

                loadData(event.target.value);
                
            // }
        }
      };

    const handleInputChange = (e) => {
        if (e.target.name==="datefrom") {
            setDateFrom(e.target.value) 
        }
    };  

    const loadData = async (tBranch) => {
        //  console.log('dataPhysical:', dataPhysical)
        //  console.log('datTable:', datTable)
          console.log('datTable d1:', datTable.data)
        //  console.log('datTable d2:', datTable.data.detail2)
        //  console.log('datTable d3:', datTable.data.detail3)

        // ProcessMe(datTable.data.detail1);
         
        //  return false;
        // Layawa Options [1-All, 2-Existing, 3-Cancelled, 4-Fully Paid, 5-For Cancellation]

        // refreshBranch(tBranch, tReportType );

        let tFilterDate="?from=" + dateFrom +"&to=" + dateTo;
        console.log('branch, ',selBranch, ' date: ', tFilterDate)
        
        setDataTable([]); 
        try {
            // GET  localhost:8080/site102/api/j/report/incentive/{branchCode}?from={fromDate}&to={toDate}
            await fetch(dbServerHostJava + "/api/j/report/incentive/" + tBranch +  tFilterDate, {
              // cards GET  https://oroerp.net/erp/api/j/report/cards?from={fromDate}&to={toDate} 
              // oroerp.net

            method: 'GET',
            headers: GetMyHeaders(gAccessToken),
            })
            .then((response) => response.json() )
            .then((json) => {
                 console.log("Status Test:",json.status)
                 console.log("Incentive Data:",json)
                //  console.log("inventory Data1:",json.data)
                if (Number(json.status)===200) {
                     setDataTable(json.data); 
                     console.log('setDataTable',json.data.details.length)
                     console.log('dataTable',datTable.details.length)
                     console.log('dataTable1',datTable.length)
                } else {
                     toast.error("Branch: " + selBranch  + ", Error: " + json.error );
                }
            })
            // console.log("test3",json) 
        } catch (err) {
             console.log(err)
            
        }
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
                <label style={{textAlign:'left', fontSize:'15px'}}>Incentive Program/Flaps</label>
                <br></br>
                <label style={{textAlign:'left', fontSize:'10px'}}>{showForDate()}</label>
            </div>
        )
    }  
    
    function PrintSummary() {
        console.log('datTable: ',datTable)

        let dtRead2 = datTable?.details;
        return (
            <div>
                {PrintHeader()}
                <div style={{marginTop:'3px', with:'100%', color:'gray',border:'solid 1px' }}></div>
                <table className="print-styled-table" style={{fontSize: '9px',margin:'0 0 0 0'}} >
                    <thead>
                        <tr style={{borderBottom: '1px solid gray'}}>
                            <th style={{textAlign: "left", width: "8px"}}> </th>
                            <th style={{...thStyles, width: "200px" }}>Name</th>

                            <th style={{...thStyles, width: "50px" }}>TOTAL</th>
                            <th style={{...thStyles, width: "40px"}}>Branch</th>
                            <th style={{...thStyles}}>Date</th>
                            <th style={{...thStyles}}># of items sold</th>
                            <th style={{...thStyles}}>Sales</th>
                            <th style={{...thStyles, width: "60px"}}>Dia & pearl</th>
                            <th style={{...thStyles, width: "60px"}}>Gold</th>
                            <th style={{...thStyles, width: "60px"}}>Misc</th>
                            <th style={{textAlign: "left", width: "60px"}}>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {  dtRead2 && dtRead2.map((jsonRec, index) => (
                            <React.Fragment key={index}>
                            <tr>
                                {/* rowSpan={jsonRec.items.length + 1} */}
                                <td  > {index+1}] </td>
                                <td  style={{...styles.td, width: "190px"}} > {jsonRec?.teller} </td>
                                <td  style={styles.td} > {jsonRec?.incentive} </td>
                                <td > {1} </td>
                                <td > {moment(jsonRec?.trnDate,'YYYY-MM-DD').format('MM/DD/YY')} </td>
                                <td > {jsonRec?.orNumber} </td>
                                <td style={{textAlign: "right", width: "60px"}} > {formatNumber(jsonRec?.soldPrice)} </td>
                                <td style={{textAlign: "right"}}> {formatNumber(jsonRec?.weight)} </td>
                                <td  style={{textAlign: "left", width: "190px"}} > {jsonRec?.type} </td>
                                
   
                            </tr>
                            </React.Fragment>

                        ))}
                        
                      {/* Add more rows as needed */}
                    <tr style={styles.totalRow}>
                    <td style={styles.td} colSpan="2">GRAND TOTAL</td>
                    <td style={styles.td}>200.00</td>
                    <td style={styles.td}>200.00</td>
                    <td style={styles.td}>200.00</td>
                    </tr>
                        
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


    function PrintDetails() {
        console.log('datTable: ',datTable)

        let dtRead2 = datTable?.details;
        return (
            <div>
                <div style={{marginTop:'3px', with:'100%', color:'gray',border:'solid 1px' }}></div>
                <table className="print-styled-table" style={{fontSize: '9px',margin:'0 0 0 0'}} >
                    <thead>
                        <tr style={{lineHeight: '1'}}>
                            <th style={{textAlign: "left", width: "8px"}}> </th>
                            <th style={{...thStyles, width: "60px" }}>Date</th>
                            <th style={{...thStyles, width: "50px" }}># of items #1</th>
                            <th style={{...thStyles, width: "40px"}}>Branch</th>
                            <th style={{...thStyles}}>Date</th>
                            <th style={{...thStyles}}># of items sold</th>
                            <th style={{...thStyles}}>Sales</th>
                            <th style={{...thStyles, width: "60px"}}>Dia & pearl</th>
                            <th style={{...thStyles, width: "60px"}}>Gold</th>
                            <th style={{...thStyles, width: "60px"}}>Misc</th>
                            <th style={{textAlign: "left", width: "60px"}}>Total</th>
                        </tr>
                        <tr style={{borderBottom: '1px solid gray', lineHeight: '1'}}>
                            <th style={{textAlign: "left", width: "8px"}}> </th>
                            <th style={{...thStyles, width: "60px" }}>Branch</th>
                            <th style={{...thStyles, width: "50px" }}>Cash</th>
                            <th style={{...thStyles, width: "50px" }}>Credit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {  dtRead2 && dtRead2.map((jsonRec, index) => (
                            <React.Fragment key={index}>
                            <tr>
                                {/* rowSpan={jsonRec.items.length + 1} */}
                                <td  > {index+1}] </td>
                                <td  style={{textAlign: "left", width: "190px"}} > {jsonRec?.teller} </td>
                                <td  style={{textAlign: "left", width: "190px"}} > {jsonRec?.incentive} </td>
                                <td > {1} </td>
                                <td > {moment(jsonRec?.trnDate,'YYYY-MM-DD').format('MM/DD/YY')} </td>
                                <td > {jsonRec?.orNumber} </td>
                                <td style={{textAlign: "right", width: "60px"}} > {formatNumber(jsonRec?.soldPrice)} </td>
                                <td style={{textAlign: "right"}}> {formatNumber(jsonRec?.weight)} </td>
                                <td  style={{textAlign: "left", width: "190px"}} > {jsonRec?.type} </td>
                                
   
                            </tr>
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
    };

    function PrintDetails2() {
        return (
          // <table style={styles.table}>
          <table className="print-styled-table" style={{fontSize: '9px',margin:'0 0 0 0'}} >
            <thead>
              <tr>
                <th style={{...styles.th, borderBottom:'none' }} rowSpan="1"></th>
                <th style={{...styles.th, textAlign:'center'}} colSpan="4"># of items #1</th>
                <th style={{...styles.th, textAlign:'center'}} colSpan="3">(Php)Sales #2</th>
                <th style={{...styles.th, textAlign:'center'}} colSpan="1">#3</th>
                <th style={{...styles.th, textAlign:'center'}} colSpan="1">#4</th>
                <th style={{...styles.th, textAlign:'center'}} colSpan="4">Miscellaneous #5</th>
              </tr>
              {/* <tr>
              <th style={{...styles.th, borderTop:'none', lineHeight:'1' }} rowSpan="1">Date</th>
              </tr> */}
              <tr>
              <th style={{...styles.th, borderTop:'none', lineHeight:'1'  }} rowSpan="1">Date Branch</th>
                <th style={styles.th}>Cash</th>
                <th style={styles.th}>Credit Card</th>
                <th style={styles.th}>LA new</th>
                <th style={styles.th}>Total</th>
                <th style={styles.th}>Cash (Actual)</th>
                <th style={styles.th}>CCard (Net)</th>
                <th style={styles.th}>LAFP (Tag+Int)</th>
                <th style={styles.th}>Dia & Prl</th>
                <th style={styles.th}>Gold #1&#2/N/A</th>
                <th style={styles.th}>JBox # Incentv</th>
                <th style={styles.th}>Engraving # Incentv</th>
                <th style={styles.th}>Plating # Incentv</th>
                <th style={styles.th}>Resizing # Incentv</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.td}>04/01/24</td>
                <td style={styles.td}>!</td>
                <td style={styles.td}></td>
                <td style={styles.td}>1</td>
                <td style={styles.td}>.1</td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                
              </tr>
              <tr>
                <td style={styles.td}>04/03/24</td>
                <td style={styles.td}>!</td>
                <td style={styles.td}></td>
                <td style={styles.td}>1</td>
                <td style={styles.td}>.1</td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}>40.00</td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                
              </tr>
              <tr>
                <td style={styles.td}>04/05/24</td>
                <td style={styles.td}>!</td>
                <td style={styles.td}></td>
                <td style={styles.td}>1</td>
                <td style={styles.td}>.1</td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                
              </tr>
              <tr>
                <td style={styles.td}>04/06/24</td>
                <td style={styles.td}>!</td>
                <td style={styles.td}></td>
                <td style={styles.td}>2</td>
                <td style={styles.td}>.2</td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}>60.00</td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                
              </tr>
              <tr>
                <td style={styles.td}>04/07/24</td>
                <td style={styles.td}>!</td>
                <td style={styles.td}></td>
                <td style={styles.td}>1</td>
                <td style={styles.td}>.1</td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}>20.00</td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                
              </tr>
              <tr>
                <td style={styles.td}>04/08/24</td>
                <td style={styles.td}>!</td>
                <td style={styles.td}></td>
                <td style={styles.td}>3</td>
                <td style={styles.td}>.3</td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}>40.00</td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                
              </tr>
              <tr>
                <td style={styles.td}>04/09/24</td>
                <td style={styles.td}>!</td>
                <td style={styles.td}></td>
                <td style={styles.td}>1</td>
                <td style={styles.td}>.1</td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}>20.00</td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                
              </tr>
              
              {/* Add more rows as needed */}
            </tbody>
          </table>
        );
      
};
       
  
  return (
    <div id='main'>
    <div className='print-section-85115' style={{textAlign:'left',marginTop:'5px' }} >
           <br></br>
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
                // disabled={isDatePeriod}
           />
           {/* <br></br> */}
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

           <button className="btn-neo1-primary" style={{width: '75px',height:'35px',  marginLeft: '90px'}} onClick={() => RefreshData(true)}>Apply</button>
           <button className={'btn-neo1-add'} style={{width: '90px',height:'35px',marginLeft:'50px',marginRight:'5px'}} ref={previewRef} disabled={datTable?.details?.length >0 ? false:true} onClick={handPrinCheck} >Preview </button> 
           <button className={"btn-neo1-danger"} style={{width: '90px',height:'35px',marginLeft:'10px',marginRight:'00px' }} onClick={() => Navigate(-1)} >Cancel</button>

           <br></br>
           <div style={{marginTop:'5px', with:'100%', color:'gray',border:'solid 1px' }}></div>
           <br></br>
            {/* <div className='print-section-85115' style={{ display: "none1"}}> */}
            
            <div className='print-section-85115' style={{ display: "none1"}}>
            
                <div style={{ maxWidth: '100%', margin: '0 auto'}} ref={componentRef} >
                    {PrintSummary()}
                    {/* {PrintDetails()} */}
                    {PrintDetails2()}
                </div>
                <h1 style={{textAlign:'left', color: 'red'}}>------------------- NOT YET DONE ------------------</h1>
                <br></br>
                {/* <h6 style={{textAlign:'left',fontSize: '12px'}}>------------------- nothing follows ------------------</h6>
                <h6 style={{textAlign:'left',fontSize: '12px'}}>Note : Items not delivered are not included in this report!</h6> */}

            </div>
        </div>
    </div>

  )
}




export default PrintJewelryFlaps



// {jsonRec?.payments?.slice(0).map((pay, i) => (
//     <tr key={i}>
//         <td ></td>
//         <td colSpan={7} >{i===0? <label style={{marginLeft:'10px'}} >{jsonRec?.layawayInfo?.items[0].barcode + ' ' + jsonRec.layawayInfo?.items[0].classCode + ' ' + jsonRec.layawayInfo?.items[0].name + ' '+jsonRec.layawayInfo?.items[0].actualWeight + 'g'}</label> : <label style={{marginLeft:'0px'}} > </label>}</td>
//         {/* <td >{i===0? <label style={{marginLeft:'1px'}} >{jsonRec.items[0].name }</label> : <label style={{marginLeft:'0px'}} > </label>}</td> */}
        
//         <td style={{textAlign: "center" }}>{pay.paymentNum}</td>
//         <td style={{textAlign: "left"}} > {moment(pay?.datePay,'YYYY-MM-DD').format('MM/DD/YY')} </td>
//         <td style={{textAlign: "right"}}> {formatNumber(pay?.amountPay)} </td>
//         <td style={{textAlign: "right"}}> {formatNumber(pay?.remainingBalance)} </td>
//     </tr>
// ))}    