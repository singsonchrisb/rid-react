
// https://medium.com/readytowork-org/adding-a-header-footer-on-every-print-page-in-a-react-app-66ceccf9b35c


// checkrights @ JewelrySub DropDownReportLink("/PrintProductByBranch", 8001)

import React, { useState, useEffect, useRef }  from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

// import { isMobile } from 'react-device-detect';
import { GetMyHeaders } from '../../pages/Functions/GetAPIToken';
import { formatNumber, mySubstr, MyServerHostJava,GetDepartmentList, GetItemBranch, decryptPWord}  from '../../pages/Functions/MyFunctions';
import imgPicture  from "../../images/imgcloudviewer.jfif";

// import { bootstrap } from 'react-bootstrap';
// var sBrowser, sUsrAg = navigator.userAgent;
let dbServerHostJava = MyServerHostJava();
// let topMargin = ((window.innerHeight-600)/2) ;
let gPhotoDirectory ="https://firebasestorage.googleapis.com/v0/b/oro-business-group.appspot.com";
// let gPhotoDirectory2 ="https://firebasestorage.googleapis.com/v0/b/react-contact-1ea2c.appspot.com";
// import styleme from './Print.css';

const PrintProductByBranch = () => {  

    // const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    // const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

    const Navigate = useNavigate();
    const componentRef = useRef();
    const selBranchRef = useRef(null);
    const showPictureRef = useRef(null);
    const previewRef = useRef(null);
    
    var numBranch = sessionStorage.getItem('assignBranch');
    var gAssignBranch = numBranch ? "J"+numBranch:"";
    var gAcceesBranch ="";
    var gAccessToken="";

    gAccessToken = decryptPWord(sessionStorage.getItem("accessToken"));
    gAcceesBranch = gAssignBranch ? gAssignBranch:GetItemBranch();

    const [datProducts, setDataProduct] = useState(['']);  // data array
    const [datTable, setDataTable] = useState(['']);  // data array for searching, pgnation

    
    const [sorted, setSorted] = useState({ sorted: "name", reversed: false });

    const [showPicture, setShowPicture] = useState(false);
    const [progressNum, setProgressNum] = useState(0);

    const optDepartment = GetDepartmentList()
    const [selBranch, setSelBranch] = useState(gAssignBranch ? gAssignBranch : gAcceesBranch ? gAcceesBranch : 'J1'); 
    // const [selBranch, setSelBranch] = useState('J1'); 
    // console.log('gAcceesBranch:', gAcceesBranch);
    // console.log('selbranch:', selBranch);
    
    var reportTitle = showPicture ? "Product list by branch with picture" :"Product list by branch"
        
    // function checkBranch() {
    //     if (gAssignBranch !=='') {
    //        return gAssignBranch ;
    //     } else {
    //         if (gAcceesBranch !=='') {
    //            return gAcceesBranch ;
    //         } else {
    //             return 'J1' ;
    //         }
    //     }    
      
    // }

    const handlePrinCheck = () => {
    //    if (sUsrAg.indexOf("Chrome") > -1) {
    //        sBrowser = "Google Chrome or Chromium";
    //    } else {
    //        sBrowser = "unknown";
    //        alert ("please use Chrome")
    //    }
    //    alert("You are using: " + sBrowser);
        let i=0; 
        for(i=0;  i < 1001; i++) {
            setProgressNum(i);
            // alert(i)
            // const timer = setTimeout(() => {
            // }, 5000);
        }   

        if (selBranch===null || selBranch==='') {
            toast.error("Please select the branch.");
            alert("Please select the branch.")  ;
            return false;
         }
         sortByName();
        //  alert('alert');
         handlePrint(); 
        //  setProgressNum(0);
    }

    const sortByName = () => {
		const dtRead = [...datProducts];
		dtRead.sort((dtReadA, dtReadB) => {
			
            const fullNameA = `${dtReadA.description}`;
			const fullNameB = `${dtReadB.description}`;

			if (sorted.reversed) {
				// return fullNameB.localeCompare(fullNameA);
			}
			return fullNameA.localeCompare(fullNameB);
		});
		setDataTable(dtRead);
		setSorted({ sorted: "name", reversed: !sorted.reversed });
	};
    
    // const handlePrint1 = useReactToPrint({
    //     pageStyle: `
    //             @page {
    //               size: 11mm 11mm 11mm 11mm;
    //             // size: auto;
    //             }`,
    //     content: () => componentRef.current,
        
    // });

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        pageStyle: `
        @page {
            size: auto;
            margin: 11mm 11mm 11mm 11mm;
            // size: 11mm 11mm 11mm 11mm;
            @top-right selector {
                content: "Page " counter(page);
            }
        }`,
        documentTitle: "ORO BUSINESS GROUP" 
        
      });

    const handleEnter = (event) => {
        if (event.key.toLowerCase() === "enter") {
            // alert("pawn ticket,  "+ event.target.name);
            if (event.target.name==="selbranch") {
                showPictureRef.current.focus();
                return true;
            } else if (event.target.name==="showPicture") {
                previewRef.current.focus();
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
             toast.info("Loading data to branch: " + event.target.value  + "...");
            //  alert(event.target.value);
            // alert ( "Set branch to  " + event.target.value  + "...");
            // if ( window.confirm("Process to set branch to  " + event.target.value  + " ?") ) {
                setSelBranch(event.target.value);
                gAcceesBranch = event.target.value;
                sessionStorage.setItem("accessBranch",gAcceesBranch);
                loadData(event.target.value);
                // sortByName();
            // }
        }
      };


const loadData = async (tBranch) => {
    let tFilter="/list";

    // if (textFilter.length >0) {
    //     if (selFilter==='barcode' || selFilter==='productCode' ) {
    //         tFilter="?code=" + textFilter;
    //     } else if (selFilter==='batch') {
    //         tFilter="/list/search?by=batch-" + textFilter;
    //     } else if (selFilter==='descript') {
    //         tFilter="/list/search?by=desc-" + textFilter;
    //     } else if (selFilter==='entryDate') {
    //         tFilter="/list/search?by=entrydate-" + textFilter;    
    //     }
    // } else {
    //     // tFilter="/list";
    // }
    // // tFilter="?code=J255262";
    
    try {
        await fetch(dbServerHostJava + "/api/j/profile/products/" + tBranch + tFilter , {  
        method: 'GET',
        headers: GetMyHeaders(gAccessToken),
        })
        .then((response) => response.json() )
        .then((json) => {
              
             if (json.status===200) {
                    setDataTable(json.data); 
                    setDataProduct(json.data ); 
            } else {
                 setDataProduct(''); 
                 setDataTable(''); 
            }
            
        })
        // console.log("test3",json) 

    } catch (err) {
         console.log(err)
        //  setProduct(''); 
        //  setProduct({self: '0', acType: '',append: '',auctionGroup: '', productCode: '', barcode: '', description: '', classCode: ''});
        //  toast.error("NO product data to display,  " + err ); 
    }
}

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

// --view--
//   function printByBranch() {
//     return (
//         <div>
//             <h4 style={{textAlign:'left'}}>Product list by branch</h4>
//             <table className="print-styled-table" >
//                 <thead>
//                     <tr style={{borderBottom: '1px solid gray'}}>
//                         <th style={{textAlign: "center", width: "10px"}}>#</th>
//                         <th style={{textAlign: "left", width: "40px" }} >Barcode</th>
//                         <th style={{textAlign: "left", width: "100px" }}>ProdCode</th>
//                         <th style={{textAlign: "left", width: "200px" }}>Descriptions</th>
//                         <th style={{textAlign: "left", width: "70px" }}>Batch</th>
//                         <th style={{textAlign: "left", width: "50px" }}>Class</th>
//                         <th style={{textAlign: "left", width: "40px" }}>Karat</th>

//                         <th style={{textAlign: "center", width: "80px"}}>S.R.P</th>
//                         <th style={{textAlign: "left", width: "50px"}}>Size</th>
//                         <th style={{textAlign: "left", width: "50px"}}>Weight</th>
//                         <th style={{textAlign: "left", width: "50px"}}>Supplier</th>
//                         <th style={{textAlign: "left", width: "90px"}}>Entry Date</th>
//                         {/* <th style={{textAlign: "left",  width: "110px"}}>Picture</th> */}
//                     </tr>
//                 </thead>
                
//                 <tbody>
//                    {/* datTable.length >0 && */}
//                     {  datTable.length >0 && datTable.map((jsonRec, index) => (
//                         // onDoubleClick={() => handleEditShow(product)}
                        
//                         <tr key={ index } >
//                             {/* <td>{ index + 1 }</td>  recordsPerPage */}
//                             <td>{ (index + 1 )  }</td>
//                             <td style={{ color: 'blue' }} > { mySubstr(jsonRec.barcode,0,7) }  </td>
//                             <td>{ mySubstr(jsonRec.productCode,0,11) }</td>
//                             <td>{ mySubstr(jsonRec.description,0,22) } </td>
//                             <td>{ mySubstr(jsonRec.batch,0,10) } </td>
//                             <td>{ mySubstr(jsonRec.classCode,0,7) } </td>
//                             {/* <td>{ product.karat} </td> */}
//                             <td style={{textAlign: "right"}} >{ formatNumber(jsonRec.carats) }</td>
//                             <td style={{textAlign: "right", color: 'blue' }} >{ formatNumber(jsonRec.sellingPrice) }</td>
//                             <td>{ mySubstr(jsonRec.size,0,3) } </td>
//                             <td style={{textAlign: "right"}}  >{mySubstr( formatNumber(jsonRec.weight),0,5) }</td>
//                             <td>{ mySubstr(jsonRec.supplier,0,7)} </td>
//                             <td>{ mySubstr(jsonRec.entryDate,0,10)} </td>
//                             <td>
//                                 {/* <img src={GetPicture(jsonRec.image)} className='logo'  alt="" style={{height:'21px', width:'21px', marginLeft: '0rem', color: 'darkblue', content: 'View Picture...' }} onClick={() => handleViewDetails(jsonRec)}/>   */}
                                
//                             </td>
//                         </tr>
//                     )) }
                     
//                 </tbody>
//                 <tfoot><td>
//                    <div className="footer-space"> </div>
//                </td></tfoot>
//             </table>
//         </div>
//     )
//   }


useEffect(() => {


    loadData(gAcceesBranch);
}, []);

  function printByBranchWithPicture() {
    return (
        <div>
            <h5 style={{textAlign:'left'}}>{reportTitle}</h5>
            <table className="print-styled-table" style={{fontSize: '9px'}} >
                <thead>
                    <tr style={{borderBottom: '1px solid gray'}}>
                        <th style={{textAlign: "center", width: "10px"}}>#</th>
                        {showPicture ?
                            <th style={{textAlign: "left", width: "70px"}}>Picture</th> :''
                        }
                        <th style={{textAlign: "left", width: "200px" }}>Descriptions</th>
                        <th style={{textAlign: "left", width: "40px" }} >Barcode</th>
                        <th style={{textAlign: "left", width: "100px" }}>ProdCode</th>
                        <th style={{textAlign: "left", width: "70px" }}>Batch</th>
                        <th style={{textAlign: "left", width: "50px" }}>Class</th>
                        <th style={{textAlign: "left", width: "40px" }}>Karat</th>
                        <th style={{textAlign: "center", width: "80px"}}>S.R.P</th>
                        <th style={{textAlign: "left", width: "50px"}}>Size</th>
                        <th style={{textAlign: "left", width: "50px"}}>Weight</th>
                        <th style={{textAlign: "left", width: "50px"}}>Supplier</th>
                        <th style={{textAlign: "left", width: "90px"}}>Entry Date</th>
                        {/* <th style={{textAlign: "left",  width: "110px"}}>Picture</th> */}
                    </tr>
                </thead>
                
                <tbody>
                   {/* datTable.length >0 && */}
                    {  datTable.length >0 && datTable.map((jsonRec, index) => (
                        // onDoubleClick={() => handleEditShow(product)}
                        
                        <tr key={ index } >
                            {/* <td>{ index + 1 }</td>  recordsPerPage */}
                            <td>{ (index + 1 )  }</td>
                            {showPicture ?
                                <td> 
                                    {jsonRec.image ?
                                        <img src={GetPicture(jsonRec.image)} className='logo'  alt="" style={{height:'60px', width:'60px', marginLeft: '0rem', color: 'darkblue', content: 'View Picture...' }} />  
                                        : ""
                                    }
                                </td>
                            :""
                             }

                            <td>{ mySubstr(jsonRec.description,0,22) } </td>
                            <td style={{ color: 'blue' }} > { mySubstr(jsonRec.barcode,0,7) }  </td>
                            <td>{ mySubstr(jsonRec.productCode,0,11) }</td>
                            <td>{ mySubstr(jsonRec.batch,0,10) } </td>
                            <td>{ mySubstr(jsonRec.classCode,0,7) } </td>
                            {/* <td>{ product.karat} </td> */}
                            <td style={{textAlign: "right"}} >{ formatNumber(jsonRec.carats) }</td>
                            <td style={{textAlign: "right", color: 'blue' }} >{ formatNumber(jsonRec.sellingPrice) }</td>
                            <td>{ mySubstr(jsonRec.size,0,3) } </td>
                            <td style={{textAlign: "right"}}  >{mySubstr( formatNumber(jsonRec.weight),0,5) }</td>
                            <td>{ mySubstr(jsonRec.supplier,0,7)} </td>
                            <td>{ mySubstr(jsonRec.entryDate,0,10)} </td>
                            
                        </tr>
                    )) }
                     
                </tbody>
                <tfoot><td>
                   <div className="footer-space"> </div>
               </td></tfoot>
            </table>
        </div>
    )
  }

  return (
    <>
      <div class="print-section" style={{textAlign:'left',marginTop:'5px' }} >
      
       <label style={{marginLeft: '15px',marginRight: '10px'}} >Branch: </label>
        <select 
            className='chrich-custom-select'
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
        <input 
            style={{marginLeft: '20px',marginRight: '5px'}} 
            type='checkbox' 
            name='showPicture'
            defaultChecked={showPicture}
            onKeyDown={handleEnter}
            ref={showPictureRef}
            onChange ={() =>  setShowPicture(!showPicture)}	
         /> 
         <label>Include picture</label>
        {/* <br></br>              */}
       <button className={datTable.length >0 ? 'btn-neo1 btn-neo1-primary':''} style={{width: '90px',marginLeft:'60px',marginRight:'5px'}} ref={previewRef} disabled={datTable.length >0 ? false:true} onClick={handlePrinCheck} >Preview </button> 
       {/* <button className="btn-neo1 btn-neo1-primary" style={{width: '90px',marginLeft:'60px',marginRight:'5px'}} ref={previewRef} onClick={handlePrint} >Preview </button>  */}
       <button className={"btn-neo1 btn-neo1-danger"} style={{width: '90px',marginLeft:'10px',marginRight:'00px' }} onClick={() => Navigate(-1)} >Cancel</button>

       {/* <button type="button" class="btn btn-secondary"
            data-bs-toggle="tooltip" data-bs-placement="top"
            data-bs-custom-class="custom-tooltip"
            data-bs-title="This top tooltip is themed via CSS variables.">
            Custom tooltip
        </button> */}
        {/* <button type="button" class="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Tooltip on bottom">
        Tooltip on bottom
        </button> */}

       {/* <div class="form-floating mb-3">
            <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" style={{width:'400px'}}/>
            <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating">
            <input type="password" class="form-control" id="floatingPassword" placeholder="Password"/>
            <label for="floatingPassword">Password</label>
        </div> */}

       <br></br>
       <div style={{marginTop:'5px', with:'100%', color:'gray',border:'solid 1px' }}></div>
       <div class="progress">
          <div class="progress-bar" role="progressbar" aria-label="Example with label" style={{width: {progressNum}+'%'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{progressNum} %</div>
      </div>
       <br></br>


        <div style={{ display: "none1" }}>
            <div ref={componentRef} >
                 {printByBranchWithPicture()}
            </div>
        </div>
    </div>
   </>     
  )
}
export default PrintProductByBranch