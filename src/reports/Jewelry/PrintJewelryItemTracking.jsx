
import React, { useState, useEffect, useRef }  from 'react';
import moment from 'moment';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
// import { useReactToPrint } from "react-to-print";

import {Paper, Grid,Typography} from '@mui/material';

import { GetMyHeaders } from '../../pages/Functions/GetAPIToken';
import { MyServerHostJava,GetDepartmentList, GetItemBranch, decryptPWord }  from '../../pages/Functions/MyFunctions';
import imgPicture  from "../../images/imgblank.jpg";
import useEscapeKey from '../../hooks/useEscapeKey'; // Adjust the path as needed

let dbServerHostJava = MyServerHostJava();
let gPhotoDirectory ="https://firebasestorage.googleapis.com/v0/b/oro-business-group.appspot.com";
let reportTitle="Inventory History List";

const initFormDataState = {
    description: '',
    size: '',
    weight: 0,
    karat: 0,
    image: '',
}

const printStyles = `
    @media print {
      @page {
        size: portrait;
      }
    }
  `;

const PrintJewelryItemTracking = () => {
    // let gAccountType = Number(decryptPWord(sessionStorage.getItem('accountType')));
    const Navigate = useNavigate();
    // const printRef = useRef();
    const componentRef = useRef();
    const selBranchRef = useRef(null);
    // const reportTypeRef = useRef(null);
    // const dateFromRef = useRef(null);

    const barcodeRef = useRef(null);
    const previewRef = useRef(null);

    var numBranch = sessionStorage.getItem('assignBranch');
    var gAssignBranch = numBranch ? "J"+numBranch:"";
    var gAcceesBranch ="";
    var gAccessToken="";
    
    gAccessToken = decryptPWord(sessionStorage.getItem("accessToken"));
    gAcceesBranch = gAssignBranch ? gAssignBranch:GetItemBranch();
        
    // let  curr = new Date();
    // let curDate = curr.toISOString().substr(0,10);
    const [datTable, setDataTable] = useState([]);  // data array for searching, pgnation
    
    // var startdate = moment().subtract(1, "days").format("YYYY-MM-DD");
    const [barcode, setBarcode] = useState('');
    const [formDataState, setFormDataState] = useState(initFormDataState);
    const optDepartment = GetDepartmentList();
    const [selBranch, setSelBranch] = useState(gAssignBranch ? gAssignBranch : gAcceesBranch ? gAcceesBranch : 'J1'); 
    
    useEffect(() => {
        loadData(selBranch,barcode);
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
         RefreshData(false);
         if (selBranch===null || selBranch==='') {
            toast.error("Please select the branch.");
            alert("Please select the branch.")  ;
            return false;
         }
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
    //       @media print {
    //         body {
    //           margin: 11mm 11mm 11mm 11mm;
    //         }
    //         .print-page {
    //           page-break-after: always; /* Trigger page eject at the end of each printed page */
    //         }
    //         .print-content {
    //           page-break-after: always;
    //           margin-top: 30mm; /* Add margin to leave space for header */
    //         }
    //         .page-counter {
    //           display: none; /* Hide default page counter at the bottom */
    //         }
    //         .top-page-counter {
    //           position: fixed;
    //           top: 10mm; /* Adjust top position as needed */
    //           right: 10mm; /* Adjust right position as needed */
    //           font-size: 12px;
    //           color: #999;
    //         }
    //       }
    //     `,
    //   });

    const RefreshData = async (tTrue) => { 
        setDataTable('');
        if (tTrue===true) {
            toast.success("Data refreshed successfully.");
        }
        // sv_ColumnHeader="";
        // refreshBranch(selBranch ? selBranch : gAcceesBranch, selReportType );
           //  console.log('datTable0:',datTable)
        loadData(selBranch,barcode);
        //  alert(gAccountType)
    }
        
    const handleEnter = (event) => {
        if (event.key.toLowerCase() === "enter") {
            // alert("pawn ticket,  "+ event.target.name);
            if (event.target.name==="selbranch") {
                barcodeRef.current.focus();
                return true;
            } else if (event.target.name==='barcode') {    
                RefreshData(false);
                return true;
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
                loadData(event.target.value,barcode);
                // RefreshData();
                // sortByName();
            // }
        }
      };

    
    const handleInputChange = (e) => {
        if (e.target.name==="barcode") {
            setBarcode(e.target.value) 
        }
    };  

    function GetPicture(tImageFile)  { 
        //  alert(tImageFile);
        let cRetval= imgPicture;
        if (tImageFile==='') {
            // ok
        } else {
            cRetval= gPhotoDirectory + tImageFile;
            // alert(cRetval);
        }
        return cRetval;
    }

    const loadData = async (tBranch,tBarcode ) => {
        setDataTable(''); 
        setFormDataState(initFormDataState);
        if (tBarcode.length <=0) {
            return false;
        }
        // GET  https://techsit.orobusinessgroup.online/site102/api/j/inventory/{branchCode}/history/{productCode or barcode}
        // alert(dbServerHostJava)
        try {
            await fetch(dbServerHostJava + "/api/j/inventory/" + tBranch + "/history/"+  tBarcode, {
            method: 'GET',
            headers: GetMyHeaders(gAccessToken),
            })
            .then((response) => response.json() )
            .then((json) => {
                //  console.log("Status test:",json.status)
                //  console.log("inventory Data:",json)
                if (Number(json.status)===200) {
                    // console.log("Status test2:",json)
                    // alert(json.status)
                    setDataTable(json.data); 
                    let loadState = {
                        description: json.data?.productProfile?.classCode + ' '+ json.data?.productProfile?.description,
                        size: json.data?.productProfile?.size,
                        weight: json.data?.productProfile?.weight,
                        karat: json.data?.productProfile?.karat,
                        image: json.data?.productProfile?.image,
                    }
                    setFormDataState(loadState);

                } else {
                     toast.error("Branch: " + selBranch  + ". Error: " + json.error );
                }
            })
            // console.log("test3",json) 
        } catch (err) {
             console.log(err)
            
        }
    }
    // reportTitle = "Daily Physical Inventory Report [Branch " + selBranch.substring(1) + "]"; 
    function PrintHeader() {
        return (
            <div>
                {/* <h6 style={{textAlign:'left', fontSize:'15px'}}>{refreshBranch(selBranch, selReportType)}</h6> */}
                <label style={{textAlign:'left', fontSize:'16px', fontWeight:'bold'}}>{reportTitle +  " [Branch " + selBranch.substring(1) + "]" }</label>
                <br></br>

            </div>
        )
    }  

    function PrintHeaderProfile() {
        return (
            <div>
                <br></br>
                <Paper elevation={1}>
                    {/* <Box width='100%' height={105} borderRadius={2} border="1px solid green" style={{ marginTop: '10px' }}> */}
                        <Grid container spacing={2}>
                            <Grid item xs={2}>
                                <img src={GetPicture(formDataState.image)} alt="Image" style={{marginLeft:'14px',marginTop:'-4px', maxWidth: '80px', height: 'auto'}} />
                            </Grid>
                            <Grid item xs={4.7}>
                                <Typography variant="body1" style={{marginLeft: '18px', marginBottom: '5px'}} >Description</Typography>
                                <input 
                                    className='chrich-custom-input'
                                    style={{width: '280px', marginLeft: '15px'}}
                                    type='text' 
                                    name='description'
                                    value={formDataState.description}
                                    disabled={true}
                                />
                            </Grid>
                            
                            <Grid item xs={1.6}>
                                <Typography variant="body1" style={{marginLeft: '8px',marginBottom: '5px'}}  >Size</Typography>
                                <input 
                                    className='chrich-custom-input'
                                    style={{width: '80px', marginLeft: '5px'}} 
                                    type='text' 
                                    name='size'
                                    value={formDataState.size}
                                    disabled={true}
                                />
                            </Grid>
                            <Grid item xs={1}>
                                <Typography variant="body1" style={{marginLeft: '8px',marginBottom: '5px'}}  >Weight</Typography>
                                <input 
                                    className='chrich-custom-input'
                                    style={{width: '40px', marginLeft: '5px', textAlign:'center'}} 
                                    type='text' 
                                    name='weight'
                                    value={formDataState.weight}
                                    disabled={true}
                                />
                            </Grid>
                            <Grid item xs={1}>
                                <Typography variant="body1" style={{marginLeft: '8px',marginBottom: '5px'}}  >Karat</Typography>
                                <input 
                                    className='chrich-custom-input'
                                    style={{width: '40px', marginLeft: '5px', textAlign:'center'}} 
                                    type='text' 
                                    name='karat'
                                    value={formDataState.karat}
                                    disabled={true}
                                />
                            </Grid>
                        </Grid>
                    {/* </Box> */}
                    <br></br>  
                </Paper>
             <br></br>  
            </div>
        )
    }  




    function PrintHistory() {
        // console.log('1',datTable)
        // console.log('2',datTable?.history)
        let dtRead2 = datTable?.history;
        
        // alert('selReportType : ' + Number(selReportType))
        return (
            <div>
                {PrintHeader()}
                {PrintHeaderProfile()}
                <div style={{marginTop:'3px', with:'100%', color:'gray',border:'solid 1px' }}></div>
                <table className="print-styled-table" style={{fontSize: '9px',margin:'0 0 0 0'}} >
                    <thead>
                        <tr style={{borderBottom: '1px solid gray'}}>
                            <th style={{textAlign: "left", width: "12px"}}> </th>
                            <th style={{textAlign: "left", width: "50px"}}>Trn Date</th>
                            <th style={{textAlign: "left", width: "10px"}}>Branch</th>
                            <th style={{textAlign: "left", width: "80px"}}>Item Code</th>
                            <th style={{textAlign: "left", width: "60px"}}>Barcode</th>
                            <th style={{textAlign: "left", width: "300px"}}>Remarks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {  dtRead2 && dtRead2.map((jsonRec, index) => (
                            <React.Fragment key={index}>
                            <tr>
                                <td  > {index+1}] </td>
                                <td style={{textAlign: "left", width: "50px"}} > {moment(jsonRec.trnDate,'YYYY-MM-DD').format('MM/DD/YY')} </td>
                                <td style={{textAlign: "left", width: "10px"}} > {jsonRec.branch} </td>
                                <td style={{textAlign: "left", width: "80px"}} > {jsonRec.code} </td>
                                <td style={{textAlign: "left", width: "60px"}} > {jsonRec.barcode} </td>
                                <td style={{textAlign: "left", width: "300px"}} > {jsonRec.description} </td>
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
    }
    
  return (
    <div id='main'>
    <div className='print-section-85115' style={{textAlign:'left',marginTop:'5px' }} >
           <label style={{marginLeft: '45px',marginRight: '10px'}} >Branch : </label>
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
           <label style={{marginLeft: '2px', marginRight: '10px'}} >Item/Barcode : </label>
           <input 
                className='chrich-custom-input'
                style={{marginRight: '5px'}} 
                type='text' 
                name='barcode'
                value={barcode || ''}
                onKeyDown={handleEnter}
                ref={barcodeRef}
                onChange ={(e) => handleInputChange(e)}
           />
           
           {/* <br></br> */}
           <button className="btn-neo1-primary" style={{width: '75px', height: '35px',  marginLeft: '40px' }} onClick={() => RefreshData(true)}>Apply</button>
           <button className={'btn-neo1-add'} style={{width: '90px', height: '35px',marginLeft:'50px',marginRight:'5px'}} ref={previewRef} disabled={datTable?.history?.length >0 ? false:true} onClick={handPrinCheck} >Preview </button> 
           <button className={"btn-neo1-danger"} style={{width: '90px', height: '35px',marginLeft:'10px',marginRight:'00px' }} onClick={() => Navigate(-1)} >Cancel</button>
           {/* <button onClick={()=> printTable()}>Print Report</button> */}
           

           {/* <button className={dateFrom===curDate ? "btn-neo1 btn-neo1-secondary":""} style={{width: '75px',  marginLeft: '10px',  height: '32px' }} disabled={dateFrom===curDate ? false:true} onClick={() => RepostData() }>Re-post</button> */}
            <br></br>
            <div style={{marginTop:'5px', with:'100%', color:'gray',border:'solid 1px' }}></div>
            <div className='print-section-85115' style={{ display: "none1"}}>
                <div id="printableTable" style={{ maxWidth: '100%', margin: '0 auto'}} ref={componentRef} >
                    {PrintHistory()}
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

  )
}

export default PrintJewelryItemTracking