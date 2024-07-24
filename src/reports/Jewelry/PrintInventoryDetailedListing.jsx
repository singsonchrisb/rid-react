import React, { useState, useEffect, useRef }  from 'react';

import moment from 'moment';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


import { GetMyHeaders } from '../../pages/Functions/GetAPIToken';
import { MyServerHostJava,GetDepartmentList, GetItemBranch, getYear, getMonth, getDay, formatNumber, decryptPWord, delayMe, isValidDate, Num2Code }  from '../../pages/Functions/MyFunctions';
import '../../styles/Print.css';
import useEscapeKey from '../../hooks/useEscapeKey'; // Adjust the path as needed

let dbServerHostJava = MyServerHostJava();
let lineCounter = 0;

const styles = {
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    actType: {
      marginLeft: '05px', 
      lineHeight: '1', 
      fontSize: '14px',
      fontWeight: 'bold',
    },
    classType: {
        marginLeft: '05px', 
        lineHeight: '2', 
        fontSize: '12px',
        fontWeight: 'bold',
        borderLeft: 'solid 1px lightgray',
        borderRight: 'solid 1px lightgray',
        borderBottom: 'solid 1px lightgray',
        borderTop: 'solid 1px lightgray',
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
    totalRow: {
      fontWeight: 'bold',
    },
    footerGTotal: {
        marginLeft: '125px', 
        lineHeight: '2', 
        fontSize: '12px',
        fontWeight: 'bold',
        borderLeft: 'solid 1px lightgray',
        borderRight: 'solid 1px lightgray',
        borderBottom: 'solid 1px lightgray',
    },
    container: {
        display: 'flex',
        justifyContent: 'spaceBetween',
        width: '100%',
        // marginLeft:'100px',
    },
    column: {
        width: '48%',
    },
    row: {
        display: 'flex',
        justifyContent: 'spaceBetween',
        borderTop: '1px solid gray',
        padding: '5px 0',
        marginLeft:'20px',
        
    },
    amount: {
        width: '40%',
        textAlign: 'right',
        fontWeight: 'bold',
        fontSize: '14px',
        marginRight: '12px',
    },
    description: {
        width: '60%',
        textAlign: 'left',
        fontSize: '14px',
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

const PrintInventoryDetailedListing = () => {
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
    let typeCounter = 0;
    let classCounter = 0;
    let grandCounter = 0;
    

    const componentRef = useRef();
    const selBranchRef = useRef(null);
    const reportTypeRef = useRef(null);
    const dateFromRef = useRef(null);
    const dateToRef = useRef(null);
    const isDatePeriodRef = useRef(null);
    const batchRef = useRef(null);
    const classRef = useRef(null);
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
        {value: 'B', text: 'Both'},
        {value: 'C', text: 'Commercial'},
        {value: 'A', text: 'Auction'},
      ];
    const [selBatch, setSelBatch] = useState('');
    const [optBatch, setOptBatch] = useState([]);
    // const [selClass, setSelClass] = useState([]);
    const [selClass, setSelClass] = useState('');
    const [optClass, setOptClass] = useState([]);


    useEffect(() => {
        loadClass();
        // loadBatch(selBatch);
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
            pageNumberElem.innerHTML = `Page ${index + 1}`;
            breakElem.parentNode.insertBefore(pageNumberElem, breakElem.nextSibling);
        });

        // Replace the body content with the modified print content
        // document.body.innerHTML = tempContainer.innerHTML;

        // document.body.innerHTML = printContents;
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
        loadBatch(selBranch);
        loadData(selBranch, selReportType, selClass, selBatch);
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
                loadData(event.target.value, selReportType, selClass, selBatch);
                loadBatch(event.target.value);
            // }
        }
      };

      const handleChangeClass = event => {
        const tValues=event.target.value
        setSelClass(tValues);
        loadData(gAcceesBranch, selReportType, tValues, selBatch)
      };  
      const handleChangeBatch = event => {
        const tValues=event.target.value
        setSelBatch(tValues);
        loadData(gAcceesBranch, selReportType, selClass, tValues)
      };  

    const handleChangeReportType = event => {
        const tValues=event.target.value
        setSelReportType(tValues);
        if (Number(tValues)===5) {
            setIsDatePeriod(true);
        }
        loadData(gAcceesBranch, tValues, selClass, selBatch)
    };

    const handleInputChange = (e) => {
        if (e.target.name==="datefrom") {
            setDateFrom(e.target.value) 
        } else if (e.target.name==="dateto") {    
            setDateTo(e.target.value) 

        }
    };  

    const loadData = async (tBranch, tReportType, tClass, tBatch ) => {
        //  console.log('dataPhysical:', dataPhysical)
        //  console.log('datTable:', datTable)
        //  console.log('datTable d1:', datTable.data.detail1)
        //  console.log('datTable d2:', datTable.data.detail2)
        //  console.log('datTable d3:', datTable.data.detail3)

        // ProcessMe(datTable.data.detail1);
         
        //  return false;
        // Layawa Options [1-All, 2-Existing, 3-Cancelled, 4-Fully Paid, 5-For Cancellation]

        // refreshBranch(tBranch, tReportType );
         
        // let tFilterOptions = tReportType ? Number(tReportType) : 0 ;

        
        console.log('selReportType:',tReportType);
        console.log('selClass:', tClass);
        console.log('selBatch:',tBatch);

        let tFilterDate="?from=" + dateFrom +"&to=" + dateTo;
        let tFilterType="";
        let tFilterClass="";
        let tFilterBatch="";
        if(isDatePeriod) {
            tFilterDate="";
        }
        if (tReportType==="B" || tReportType==="" || tReportType===undefined) {
            tFilterType="";
        } else {
            tFilterType="&type="+tReportType;
        }
        if (tClass==="" || tClass.toLowerCase() ==="all" || tClass===undefined || tClass.length <=0 ) {
            tFilterClass="";
        } else {
            tFilterClass="&cls="+ tClass ;
        }
        if (tBatch==="" || tBatch.toLowerCase() ==="all" || tBatch===undefined ) {
            tFilterBatch="";
        } else {
            tFilterBatch="&batch="+tBatch ;
        }

        console.log('tBranch:',tBranch.trim(),tFilterDate,tFilterType,tFilterClass,tFilterBatch)
        

        setDataTable([]); 
        try {
            await fetch(dbServerHostJava + "/api/j/profile/products/" + tBranch.trim() + "/listing"+  tFilterDate + tFilterType + tFilterClass + tFilterBatch, {
                // localhost:8080/api/j/profile/products/J19/listing?from=05-17-2024&to=05-17-2024&type=c&cls=earg&batch=05132401
            method: 'GET',
            headers: GetMyHeaders(gAccessToken),
            })
            .then((response) => response.json() )
            .then((json) => {
                //  console.log("Status test:",json.status)
                //  console.log("inventory Data:",json)
                //  console.log("inventory Data1:",json.data)
                if (Number(json.status)===200) {
                    setDataTable(json.data); 
                    // console.log("Status test2:",json)
                    // alert(Number(tFilterOptions))
                } else {
                     toast.error("Branch: " + tBranch  + ", Error: " + json.error );
                }
            })
            // console.log("test3",json) 
        } catch (err) {
             console.log(err)
            
        }

        
    }

    const loadBatch = async (tBranch) => {
        const results = [{value: 'ALL', text: 'All' }];
        let tFilterDate="?from=" + dateFrom +"&to=" + dateTo;
        if(isDatePeriod) {
            tFilterDate="";
        } else {
            try {
                await fetch(dbServerHostJava + "/api/j/profile/products/batch/" + tBranch.trim() + "/list" +  tFilterDate, {
                method: 'GET',
                headers: GetMyHeaders(gAccessToken),
                })
                .then((response) => response.json() )
                .then((json) => {
                    //  console.log('class: ', json)
                    //  console.log('class2: ', json.data)
                    // console.log('class: ', json.status)
                    // setDataClass(json.data);   
                    json.data.forEach((value,index) => {
                        //  alert (value)
                        // console.log("show:", index, value)
                        if (index >0) {
                            results.push({
                                value: value,
                                text: value,
                            });
                        }
                    });
                    //  console.log("Results: ",results)
                    setOptBatch(results);   
                })
            } catch (err) {
                // toast.error("NO batch data to load,  " + err );
            }
        }
    }

    const loadClass = async () => {
        const results = [{value: 'ALL', text: 'All' }];
        try {
            await fetch(dbServerHostJava + "/api/j/profile/jclass/list", {                
            method: 'GET',
            headers: GetMyHeaders(gAccessToken),
            })
            .then((response) => response.json() )
            .then((json) => {
                // console.log('class: ', json)
                // console.log('class: ', json.data)
                // console.log('class: ', json.status)
                // setDataClass(json.data);   
                json.data.forEach((value) => {
                    // alert (value.classCode)
                    results.push({
                    value: value.classCode,
                    text: value.description,
                    });
                });
                // console.log("Results: ",results)
                setOptClass(results);   
            })
        } catch (err) {
            toast.error("NO class data to load,  " + err );
        }
    }


    function getClassDescript(tCode) {
        // console.log('get class1:',datTable.count)
        if (datTable && datTable.count >0) {
            // console.log('get class load!')
            let copyState = [...datTable?.products];
            const exists = copyState.find((p) => p.classCode === tCode);
            if (exists) {
                // alert(" class exist: sp fix: " + exists.fixsp)
                // console.log('get class found!')
                return  exists.classDescription;
            } else {
                // console.log('get class not found!')
                return '';
            };
        };
    }

    function ItemCounter(index) {
        if (index===1) {
            classCounter=0    
        }
        classCounter = classCounter + 1;
        typeCounter = typeCounter + 1;
        LineCounter();
    }
    function ResetTypeCounter() {
        typeCounter =0;
    }

    function LineCounter() {
        lineCounter =lineCounter+1;
    }

    function refreshBranch(tBranch, laOption) {
        // let laOption = Number(tLAOption) <=0 || tLAOption===undefined ? 1 : tLAOption; 
        let reportParameters = "";

        return "Detailed Inventory Listing " + reportParameters + "  [Branch " + tBranch.substring(1) + "]";
    }

    function showForDate() {
        if (isDatePeriod) {
            return "As of: " + getMonth(curr,'MMM')  + ". " + getDay(curr,'DD') + ", " + getYear(curr,'YYYY') ;
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
                <label style={{textAlign:'left', fontSize:'15px',fontWeight: 'bold'}}>JEWELRY</label>
                <br></br>
                <label style={{textAlign:'left', fontSize:'15px'}}>{refreshBranch(selBranch, selReportType)}</label>
                <br></br>
                <label style={{textAlign:'left', fontSize:'10px'}}>{showForDate()}</label>
                <br></br>
                <br></br>
            </div>
        )
    }  
   
    const PrintDetails = () => {
        if (!datTable || datTable.length <=0) {
             return false;
        }
        grandCounter = datTable?.count;
        // console.log('c',datTable);
        const dtRead2 = datTable?.products;
        // console.log('cccc',dtRead2?.products);
    
        // Group data by acType and classCode
        const groupedData = dtRead2.reduce((acc, record) => {
            if (!acc[record.acType]) {
                acc[record.acType] = {};
            }
            if (!acc[record.acType][record.classCode]) {
                acc[record.acType][record.classCode] = [];
            }
            acc[record.acType][record.classCode].push(record);
            return acc;
        }, {});
    
        return (
            <>
            {/* <div className="page-break"></div> */}
            <div className="page-break" style={{marginTop:'3px', with:'100%', fontSize: '9px', border: 'none' }}>
                
                {PrintHeader()}
                    {Object.keys(groupedData).map((acTypeKey, acTypeIndex) => (
                        <div key={acTypeIndex}  >
                            <p style={{...styles.actType}}>{acTypeKey==='A' ? 'AUCTION' :'COMMERCIAL' }</p>
                            {LineCounter()}
                            {Object.keys(groupedData[acTypeKey]).map((classCodeKey, classCodeIndex) => (
                                <div key={classCodeIndex} >
                                    {LineCounter()}
                                    <table className="print-styled-table" style={{fontSize: '9px',margin:'0 0 0 0'}} >
                                        {/* {lineCounter >=38 ? PrintHeader():''} */}
                                        {classCodeIndex <=0 || lineCounter >=38 ?
                                            <thead>
                                                <tr>
                                                    <th style={{...styles.th, width: "8px" }}>#</th>
                                                    <th style={{...styles.th, width: "20px" }}>Date</th>
                                                    <th style={{...styles.th, width: "70px" }}>Product #</th>
                                                    <th style={{...styles.th, width: "10px" }}>Qty</th>
                                                    <th style={{...styles.th, width: "150px" }}>Description</th>
                                                    <th style={{...styles.th, width: "20px" }}>Wt</th>
                                                    <th style={{...styles.th, width: "20px" }}>C</th>
                                                    <th style={{...styles.th, width: "20px" }}>Size</th>
                                                    {acTypeKey==='A' ?
                                                        <th style={{...styles.th, width: "50px" }}>PValue</th>
                                                        :
                                                        <th style={{...styles.th, width: "50px" }}>Code(P/g)</th>
                                                    }
                                                    <th style={{...styles.th, width: "60px" }}>Code</th>
                                                    <th style={{...styles.th, width: "50px" }}>Sold Pr</th>
                                                    <th style={{...styles.th, width: "50px" }}>Tag Pr</th>
                                                    <th style={{...styles.th, width: "50px" }}>SP(P/g)</th>
                                                    <th style={{...styles.th, width: "50px" }}>Sold Dt</th>
                                                    <th style={{...styles.th, width: "50px" }}>Barcode</th>
                                                </tr>
                                                <tr>
                                                {/* <th style={{...styles.classType}}>{classCodeKey}</th> */}
                                                <td colSpan="16" style={{...styles.classType}} >{classCodeKey} - {getClassDescript(classCodeKey)}</td>
                                                </tr>
                                                
                                            </thead>
                                         : 
                                         <thead>
                                            <tr>
                                            <th style={{width: "8px" }}></th>
                                            <th style={{width: "20px" }}></th>
                                            <th style={{width: "70px" }}></th>
                                            <th style={{width: "10px" }}></th>
                                            <th style={{width: "150px"}}></th>
                                            <th style={{width: "20px" }}></th>
                                            <th style={{width: "20px" }}></th>
                                            <th style={{width: "20px" }}></th>
                                            <th style={{width: "50px" }}></th>
                                            <th style={{width: "60px" }}></th>
                                            <th style={{width: "50px" }}></th>
                                            <th style={{width: "50px" }}></th>
                                            <th style={{width: "50px" }}></th>
                                            <th style={{width: "50px" }}></th>
                                            <th style={{width: "50px" }}></th>
                                            </tr>
                                            <tr>
                                                <td colSpan="16" style={{...styles.classType}} >{classCodeKey} - {getClassDescript(classCodeKey)}</td>
                                            </tr>
                                         </thead>
                                         }
                                         {/* {lineCounter >=38 ? lineCounter=0 :0} */}
                                         
                                        <tbody>
                                            {groupedData[acTypeKey][classCodeKey].map((record, index) => (
                                                
                                                <tr key={index}>
                                                    <td style={{...styles.td, width: "8px"}}>{index + 1} {ItemCounter(index + 1)} </td>
                                                    <td style={{...styles.td, width: "10px"}}>{moment(record.entryDate, 'YYYY-MM-DD').format('MM/DD/YY')}</td>
                                                    <td style={{...styles.td, width: "10px"}}>{record.productCode}</td>
                                                    <td style={{...styles.td, width: "10px"}}>{record.qty}</td>
                                                    <td style={{...styles.td, width: "10px"}}>{record.description}</td>
                                                    <td style={{...styles.td, width: "10px",textAlign: 'right'}}>{formatNumber(record.weight)}</td>
                                                    <td style={{...styles.td, width: "10px"}}>{record.carats}</td>
                                                    <td style={{...styles.td, width: "10px"}}>{record.size}</td>
                                                    {acTypeKey==='A' ?
                                                        <>
                                                          <td style={{...styles.td, width: "50px",textAlign: 'right'}}>{Num2Code(record.loanAmount)}</td>
                                                          <td style={{...styles.td, width: "50px",textAlign: 'right'}}>{Num2Code(record.loanAmount)}</td>
                                                        </>
                                                    :
                                                        <>
                                                          <td style={{...styles.td, width: "50px",textAlign: 'right'}}>{Num2Code(record.codePerGram)}</td>
                                                          <td style={{...styles.td, width: "60px",textAlign: 'right'}}>{record.priceCode}-{record.supplier}</td>
                                                        </>
                                                    }
                                                    
                                                    <td style={{...styles.td, width: "10px",textAlign: 'right'}}></td>  {/* sold price*/}
                                                    {acTypeKey==='A' ?
                                                        <>
                                                          <td style={{...styles.td, width: "10px",textAlign: 'right'}}>{formatNumber(record.sellingPrice)}</td>   {/* tag price  */}
                                                          <td style={{...styles.td, width: "10px",textAlign: 'right'}}>{formatNumber((record.sellingPrice/record.weight))}</td>    {/* pricePerGram  */}
                                                        </>
                                                    :
                                                        <>
                                                          <td style={{...styles.td, width: "10px",textAlign: 'right'}}>{formatNumber(record.sellingPrice)}</td>   {/* tag price  */}
                                                          <td style={{...styles.td, width: "10px",textAlign: 'right'}}>{formatNumber(record.pricePerGram)}</td>   {/* pricePerGram  */}
                                                        </>
                                                        
                                                    }
                                                    {/* sold price = once sold get actual selling price */}

                                                    {/* if pawn value =0 '-',  */}

                                                    <td style={{...styles.td, width: "10px"}}></td>
                                                    <td style={{...styles.td, width: "10px",borderRight: 'solid 1px lightgray'}}>{record.barcode}</td>
                                                </tr>
                                                
                                            ))}
                                            {/* <tr style={{...styles.classTotal}}>
                                            <td colSpan="3">{classCounter}</td>
                                            <td colSpan="4">Total</td>
                                            <td colSpan="8">100.00</td>
                                            </tr> */}
                                            <></>
                                        </tbody>
                                    </table>
                                    <div style={{...styles.container}}>
                                        <div style={{...styles.column}}>
                                            <div style={{...styles.row}}>
                                                <span style={{...styles.amount}}>{classCounter}</span>
                                                <span style={{...styles.description}}>- CLASS TOTAL Item(s)</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div style={{...styles.container}}>
                                <div style={{...styles.column}}>
                                    <div style={{...styles.row}}>
                                        <span style={{...styles.amount}}>{typeCounter}</span>
                                        <span style={{...styles.description}}>- AUCTION TOTAL Item(s)</span>
                                    </div>
                                </div>
                            </div>
                            {ResetTypeCounter()};
                        </div>
                    ))}
                    <div style={{...styles.container}}>
                        <div style={{...styles.column}}>
                            <div style={{...styles.row}}>
                                <span style={{...styles.amount}}>{grandCounter}</span>
                                <span style={{...styles.description}}>- GRAND TOTAL Item(s)</span>
                            </div>
                        </div>
                    </div>


                {/* </table>    */}
                
            </div>
            
            </>
        );
    };
  


  return (
    <div id='main'>
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
           <label>All Inventory Items</label>
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
           <label style={{marginLeft:'40px'}} >Batch :</label>
            <select 
                className={isDatePeriod ? 'chrich-custom-select-disabled': 'chrich-custom-select'}
                style={{marginLeft:'10px', width:'200px'}}
                name="selbatch"
                ref={classRef}
                onChange={handleChangeBatch}
                onKeyDown={handleEnter} 
                // value={selClass || ""} 
                value={isDatePeriod ? "" : selBatch || ""}
                disabled={isDatePeriod}
                > 

                {optBatch.map(option => (
                    <option key={option.value} value={option.value}>
                    {option.text}
                    </option>
                ))}
            </select>


           <br></br>
           <label style={{marginLeft:'42px'}} >Class :</label>
            <select 
                className='chrich-custom-select'
                style={{marginLeft:'10px', width:'200px'}}
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
            </select>

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
           <button className="btn-neo1-primary" style={{width: '75px',  marginLeft: '40px', height: '35px' }} onClick={() => RefreshData(true)}>Apply</button>
           <button className={'btn-neo1-add'} style={{width: '90px', height: '35px',marginLeft:'50px',marginRight:'5px'}} ref={previewRef} disabled={datTable?.count >0 ? false:true} onClick={handPrinCheck} >Preview </button> 
           <button className={"btn-neo1-danger"} style={{width: '90px', height: '35px',marginLeft:'10px',marginRight:'00px' }} onClick={() => Navigate(-1)} >Cancel</button>

           {/* <button className={dateFrom===curDate ? "btn-neo1 btn-neo1-secondary":""} style={{width: '75px',  marginLeft: '10px',  height: '32px' }} disabled={dateFrom===curDate ? false:true} onClick={() => RepostData() }>Re-post</button> */}
           <br></br>
           {/* <div>{message1}</div> */}
           <div style={{marginTop:'5px', with:'100%', color:'gray',border:'solid 1px' }}></div>
           <br></br>
            {/* <div className='print-section-85115' style={{ display: "none1"}}> */}
            
            {/* : 'styled-table' */}
            <div className={'print-section-85115'} style={{ display: "none1"}}>
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

  )
}

export default PrintInventoryDetailedListing