import React, { useState, useEffect, useRef }  from 'react';
import { Dropdown } from 'react-bootstrap';
import Moment from 'moment';

import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { FaWindowClose,FaArrowUp, FaArrowDown, FaSadCry  } from "react-icons/fa";
import { AiFillEdit, AiFillDelete, AiFillPrinter } from "react-icons/ai";



// import FloatingLabel from 'react-bootstrap/FloatingLabel';
// import Form from 'react-bootstrap/Form';
import { isMobile } from 'react-device-detect';

import { GetMyHeaders } from '../Functions/GetAPIToken';
import { Num2Code, CheckNumber, formatNumber, removeCommas, mySubstr, MyServerHostJava, GetItemBranch,GetDepartmentList, dateIsValid, delayMe, CheckAccessRights, decryptPWord}  from '../Functions/MyFunctions';
import { myStyles }  from '../Functions/MyFunctionsCSS';
// import { ModalConfirm } from '../Functions/ModalConfirm';
// import ViewerTables from '../Functions/ViewerTables';


//  import imgUser  from "../images/imgeyeviewer.jfif"; , FaFileVideo, FaFileImage
  import imgPicture  from "../../images/imgcloudviewer.jfif";
//  import imgWebCam  from "../images/imgwebcam.jfif";
//  import imgWebCam  from "../../images/camera1.ICO";
// import imgUser  from "../images/imgeyeviewerround.jfif";
// import storage  from '../../api/firebase.js';
// import { ref, uploadBytesResumable,getDownloadURL } from 'firebase/storage';
// import WebcamPicture from '../Functions/WebcamPicture'

let nModule =6001;
let dbServerHostJava = MyServerHostJava();
let topMargin = ((window.innerHeight-600)/2) ;
let gPhotoDirectory ="https://firebasestorage.googleapis.com/v0/b/oro-business-group.appspot.com";


const EmployeeList = () => {
    let Navigate = useNavigate();

    let  curr = new Date();
    // curr.setDate(curr.getDate() + 3);
    let curDate = curr.toISOString().substr(0,10);
    var numBranch = sessionStorage.getItem('assignBranch');
    var gAssignBranch = numBranch ? "J"+numBranch:"";
    var gAcceesBranch ="";
    var gAccessToken="";
    
    gAccessToken = decryptPWord(sessionStorage.getItem("accessToken"));
    gAcceesBranch = gAssignBranch ? gAssignBranch:GetItemBranch();

    const [datTable, setDataTable] = useState([]);  // data array
    const [datEmployee, setDataEmployee] = useState([]);  // data array

    
    const [imageUser, setImageUser] = useState(imgPicture);
    const [file, setFile] = useState();
    const [percent, setPercent] = useState(0);


    const [sorted, setSorted] = useState({ sorted: "name", reversed: true });
	const [searchPhrase, setSearchPhrase] = useState("");
    
    //pagination
    const [currentPage, setCurrentPage] = useState(1)
    let recordsPerPage = 10;
    let lastIndex = currentPage * recordsPerPage;
    let firstIndex = lastIndex - recordsPerPage;
    let ReCords =0;
    let npage =   0;
    if (lastIndex <=0) {
        ReCords =  0 ;
        npage =    0 ;
    } else {
        ReCords =  datTable.length >0 ? datTable.slice(firstIndex, lastIndex) : 0 ;
        npage =    datTable.length >0 ?  Math.ceil(datTable.length / recordsPerPage): 0 ;
    }
    let numbers = [...Array(npage + 1).keys()].slice(1,10)  ;

        
    useEffect(() => {
        loadData();
        loadDataProduct();
        // loadClass(selGroup);

    }, []);
        
    //function const
    const handleWindowClose = () => {
        Navigate(-1);
    }
            
    const sortByCode = () => {
        const dtRead = [...datEmployee];
        dtRead.sort((dtReadA, dtReadB) => {
            
            const fullNameA = `${dtReadA.classCode}`;
            const fullNameB = `${dtReadB.classCode}`;

            if (sorted.reversed) {
                return fullNameB.localeCompare(fullNameA);
            }
            return fullNameA.localeCompare(fullNameB);
        });
        setDataTable(dtRead);
        setSorted({ sorted: "code", reversed: !sorted.reversed });
    }
    
    const sortByName = () => {
        const dtRead = [...datEmployee];
        dtRead.sort((dtReadA, dtReadB) => {
            
            const fullNameA = `${dtReadA.description}`;
            const fullNameB = `${dtReadB.description}`;

            if (sorted.reversed) {
                return fullNameB.localeCompare(fullNameA);
            }
            return fullNameA.localeCompare(fullNameB);
        });
        setDataTable(dtRead);
        setSorted({ sorted: "name", reversed: !sorted.reversed });
    }
    
    const renderArrow = () => {
        if (sorted.reversed) {
            return <FaArrowDown />;	
        }
        return <FaArrowUp />;
    };
    
    const search = (event) => {
        const matchedRead = datEmployee.filter((dtRead) => {
            return `${dtRead.classCode} ${dtRead.description}`
                .toLowerCase()
                .includes(event.target.value.toLowerCase());
        });
        setDataTable(matchedRead);
        setSearchPhrase(event.target.value);
    }    

    const handleAddShow = () => {
        alert('n/a')
    }     

    const handleRefdresh = () => {
        alert('n/a')
    }     

    function DropDownReportLink(tLink,mCode) {
        if (CheckAccessRights(mCode,'Print')===true) {
            Navigate(tLink);
            return true
        } else {
            alert("Sorry! no access to print on this report..");
            return false
        }
    }

    function GetPicture(tImageFile)  { 
        // alert(tBarcode);
        let cRetval= imgPicture;
        if (tImageFile==='') {
            // ok
        } else {
            cRetval= gPhotoDirectory + tImageFile;
        }
        return cRetval;
    }

    function prePage() {
        if(currentPage !== 1) {
           setCurrentPage(currentPage - 1)
        } else {
          alert("Beggining of file!");
        }
     }
   
     function changeCPage(id) {
       setCurrentPage(id)
     }
   
     function nextPage() {
       if(currentPage !== npage) {
           setCurrentPage(currentPage + 1)
        } else {
          alert("End of file!");
        }
     }
    
    const handleViewDetails  = (datFile) => {
        
        // getBatch();
        // loadClass();
        // getDeliver();
        setImageUser(GetPicture(datFile.image));
        // setSelf(datFile.barcode);
        // setProdCode(datFile.productCode);
        // setDescript(datFile.description);
        // setSelClass(datFile.classCode);
        // setSelType(datFile.acType);
        // setSelTypeOfGold(datFile.kcode);
        // setWeightCode(formatNumber(datFile.weight));
        // setKarat(formatNumber(datFile.carats));
        // setSellingPrice(formatNumber(datFile.sellingPrice));
        // setSupplier(datFile.supplier);
        // setIsAdd(true);
        // console.log('1',datFile.image)
        // console.log('2',imageUser);
        // delayMe(20000);
        // setIsShowViewDetail(true);

     }

     const handleEditShow  = (datFile) => {
        if (CheckAccessRights(nModule,'Modify')===false) {
            alert("Sorry! no access to edit/modify product..");
            return false;
        }
    }    
    const handleDelete = (id, tDesc) => {
        // alert ("code in Node.js")
        //  check only admin can delete chris/admin/gerard
        // MsgBox "Changing Time Schedule to a lowest Total No. of hours: " & lblTotalHr & " is prohibited...", vbCritical
        if (CheckAccessRights(nModule,'Delete')===false) {
            alert("Sorry! no access to delete/remove product..");
            return false;
        }
        let lDelete=false;
        if (lDelete===false) {
            alert("Deleting product is prohibited... \n Please use Stock Withdrawal Issue,\n make it 0, then create new product.");
        } else {
            if (
                window.confirm("Are you sure that you wanted to delete the record,  "+ tDesc +" with product code: " + id +" ?")
                ) {

                try {
                    fetch( dbServerHostJava + "/api/j/profile/products/" + gAcceesBranch + "/delete/" + id, {
                    method: 'DELETE',
                    headers: GetMyHeaders(gAccessToken)
                    }).then(() => {
                        console.log('removed');
                        // alert("Karat: " + id + ", Value: " + contactName + ", Deleted Successfully");
                        loadData();
                        toast.success("ID: " + id + ", Group: " + tDesc + ", Deleted Successfully");
                    }).catch(err => {
                        console.error(err)
                    });
                    const timer = setTimeout(() => {
                    loadData();
                    }, 50);
                    return () => clearTimeout(timer);
                } catch (error) {
                    console.error("Error:", error);
                    alert("Unsuccessfully Remove " + error ) 
                }
            }
        }
    }



    //--- Model ---  
    
    const loadData = async () => {
        try {
            await fetch(dbServerHostJava + "/api/hr/employee/list/0", {                
            method: 'GET',
            headers: GetMyHeaders(gAccessToken),
            })
            .then((response) => response.json() )
            .then((json) => {
                // console.log("data employee: ", json.data)
                console.log("data employee1: ", json)
                setDataEmployee(json);
                setDataTable(json);
            })

        } catch (err) {
            // console.log(err)
            // setDatClass({self: '0', group: 'DIA', classCode: '00'});
            toast.error("NO employee data to display,  " + err ); 
        }
    }

    const loadDataProduct = async () => {
        //  const token2 = await this.getAuth();
        // headers: GetMyHeaders(gAccessToken),
        try {
            var ORO_GET_OPENING_BALANCE="https://techsit.orobusinessgroup.online/site101/api/j1/opening?status=existing"
            // var ORO_GET_OPENING_BALANCE="http://localhost:5000/api/j1/opening?status=existing"
            // await fetch(dbServerHostJava + "/api/hr/employee/list/0", {                
            await fetch(ORO_GET_OPENING_BALANCE, {                    
            method: 'GET',
            headers: GetMyHeaders(gAccessToken),
            })
            .then((response) => response.json() )
            .then((json) => {
                // console.log("data product0: ", json.data)
                console.log("data product1: ", json)
                
            })

        } catch (err) {
            // console.log(err)
            // setDatClass({self: '0', group: 'DIA', classCode: '00'});
            toast.error("NO employee data to display,  " + err ); 
        }
    }


   //--- View ---  
    function showColumnHeader() {
        return (
            <div>
                {/* <label style={{marginLeft: '5px',marginRight: '06px'}} >Status: </label>
                <select value={selBranch}
                        onChange={handleChangeDepartment}
                        // disabled={gAssignBranch ? true: false}
                >
                {optDepartment.map(option => (
                    <option key={option.value} value={option.value}>
                    {option.text}
                    </option>
                ))}
                </select> */}
                
                {/* <label style={{marginLeft:'15px',marginRight:'04px'}}> Filter by: </label>
                <select value={selFilter} 
                        onChange={handleChangeSelFilter}
                        // onClick={handleOnClickFilter}
                >
                {optFilter.map(option => (
                    <option key={option.value} value={option.value}>
                    {option.text}
                    </option>
                ))}
                </select> */}

                <button className="btn-neo1 btn-neo1-secondary" style={{fontSize: '13px', marginLeft: '.3rem' }} onClick={() => loadData()}>Set Filter</button>
                <button className="btn-neo1 btn-neo1-primary" style={{ fontSize: '13px', marginLeft: '2rem' }} onClick={() => handleAddShow()}>Add Items</button> 
                <button className="btn-neo1 btn-neo1-secondary" style={{fontSize: '13px', marginLeft: '.4rem' }} onClick={() => handleRefdresh()}>Refresh</button>
                
                {/* <button className="btn-neo1 btn-neo1-dark" style={{fontSize: '13px', marginLeft: '.4rem' }} onClick={() => handleWindowClose()}>Home</button> */}

                <Dropdown className='chrich-dropdown1' style={{ marginLeft: '.4rem', width: '100px', display: 'inline-block'}}>
                    <Dropdown.Toggle className='chrich-dropdown-toggle'>
                    <AiFillPrinter/> 
                    <span className='chrich-dropdown-toggle-span' style={{fontSize:'13px' }}>Reports</span>
                    <span style={{marginRight:'5px' }}></span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className='chrich-dropdown-menu1'>
                        {/* <Dropdown.Item href="/printjewelrybarcode"> */}
                        <Dropdown.Item href="#" onClick={() => DropDownReportLink("/printjewelrybarcode", 8011)} >
                            {/* <FaBarcode/> */}
                            <span className='chrich-dropdown-toggle-span'>Print Barcode</span>
                        </Dropdown.Item>
                        {/* <Dropdown.Item href="/PrintProductByBranch"> */}
                        <Dropdown.Item href="#" onClick={() => DropDownReportLink("/PrintProductByBranch", nModule)} >
                            {/* <FaBarcode/> */}
                            <AiFillPrinter/> 
                            <span className='chrich-dropdown-toggle-span'>Print Product List</span>
                        </Dropdown.Item>
                        {/* <Dropdown.Item href="/UserChangePassword">
                            <FaFileInvoice/>
                            <span className='chrich-dropdown-toggle-span'>Purchase Invoice</span>
                        </Dropdown.Item> */}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        )

    }

    function showTableData() {
        return (
            <table className="styled-table" style={{fontSize: '14px', marginTop: '5px' }} >
                 <thead>
                    <tr>
                        <th style={{textAlign: "center", width: "10px"}}>#</th>
                        <th style={{textAlign: "left", width: "40px" }} >EmpID</th>
                        <th style={{textAlign: "left", width: "100px" }}>Last Name</th>
                        <th style={{textAlign: "left", width: "100px" }}>Firts Name</th>
                        <th style={{textAlign: "left", width: "100px" }}>Middle Name</th>
                        <th style={{textAlign: "left", width: "100px" }}>Position</th>
                        <th style={{textAlign: "left", width: "100px" }}>Department</th>

                        {/* <th style={{textAlign: "center", width: "80px"}}>S.R.P</th>
                        <th style={{textAlign: "left", width: "50px"}}>Size</th>
                        <th style={{textAlign: "left", width: "50px"}}>Weight</th>
                        <th style={{textAlign: "left", width: "50px"}}>Supplier</th>
                        <th style={{textAlign: "left", width: "90px"}}>Entry Date</th> */}
                        {/* <th style={{textAlign: "left", width: "5px"}}>img</th> */}
                        <th style={{textAlign: "left",  width: "110px"}}>Pict  Action</th>
                    </tr>
                </thead>
                <tbody>
                    
                    { ReCords.length >0 && ReCords.map((jsonRec, index) => (
                        // onDoubleClick={() => handleEditShow(product)}
                        
                        <tr style={{ height: "3px"}} key={ jsonRec.self } >
                            {/* <td>{ index + 1 }</td>  recordsPerPage */}
                            <td>{ (index + 1 ) + ((currentPage-1) * 15) }</td>
                            <td style={{ color: 'blue' }} onDoubleClick={() => alert('ddd')} > { mySubstr(jsonRec.employeeNo,0,6) }  </td>
                            <td>{ mySubstr(jsonRec.lastName,0,12) }</td>
                            <td>{ mySubstr(jsonRec.firstName,0,12) } </td>
                            <td>{ mySubstr(jsonRec.middleName,0,12) } </td>
                            <td>{ mySubstr(jsonRec.position,0,20) } </td>
                            <td>{ mySubstr(jsonRec.department,0,25) } </td>
                            <td>{ mySubstr(jsonRec.branch,0,25) } </td>
                            <td>{ mySubstr(jsonRec.position,0,25) } </td>
                            
                            <td>

                                {/* <img src={imgLogo} className='image-button' width="12" height="12" style={{marginRight: '4px'}} alt="something" onClick={() => handelRolesAdd()}/> */}

                                {/* <AiFillPicture className='action-button' style={{height:'25px', marginLeft: '0rem', color: 'darkblue', content: 'View Picture...' }} onClick={() => handleViewDetails(jsonRec)}/>   */}
                                {/* width="25" height="25" */}
                                <img src={GetPicture(jsonRec.image)} className='logo'  alt="" style={{height:'21px', width:'21px', marginLeft: '0rem', color: 'darkblue', content: 'View Picture...' }} onClick={() => handleViewDetails(jsonRec)}/>  
                                {/* <img src={"https://firebasestorage.googleapis.com/v0/b/react-contact-1ea2c.appspot.com/o/jewelry%2FJ255254.jpg?alt=media&token=7c061cd5-dcf7-4a3f-a008-8522a427d637"} className='logo'  alt="" style={{height:'21px', width:'21px', marginLeft: '0rem', color: 'darkblue', content: 'View Picture...' }} onClick={() => handleViewDetails(jsonRec)}/>   */}

                                <AiFillEdit className='action-button' style={{height:'25px', marginLeft: '1rem', color: 'darkblue', content: 'Edit Product...' }} onClick={() => handleEditShow(jsonRec)}/>  
                                <AiFillDelete className='action-button' style={{ marginLeft: '.1rem', color: 'red', content: 'Delete Product...' }} onClick={() => handleDelete(jsonRec.productCode, jsonRec.description)}/>  
                            </td>
                        </tr>
                    )) }
                     
                </tbody>
            </table>
        )
    }

    function showPaginationNav() {
        return (
            <nav style={{marginLeft: "10%",marginTop: "5px"}}>
                <ul className="pagination">
                    <li className="page-item">
                        <label className="page-link"
                        onClick={prePage}>Prev</label>
                    </li>
                    { 
                        numbers.map((n, i) => (
                            <label className="page-link" onClick={()=> changeCPage(n)} > {n}</label>
                        ))
                    }
                    <li style={{marginLeft: "5px"}} className="page-item">
                        <label className="page-link"
                        onClick={nextPage}>Next</label>
                    </li>
                    <li style={{marginTop: "5px",marginLeft: "25px", color: 'blue' }} className="page-item">
                            <label> CurPage: {currentPage} </label>
                        <label style={{marginLeft:'12px'}}> Record(s): {datTable.length}</label>
                    </li>
                </ul>
            </nav>
      )          
    }  
  return (
    <>
        <div id='main'>
            <div className='Box-Center' style={{width: isMobile ? '100%':'1000px', height: '630px', marginTop: (topMargin -15) +'px'}} >
                <FaWindowClose className='windowclose-button' onClick={() => handleWindowClose()}/>  
                <h3 style={myStyles.boxHeadTitle}>Employee List</h3>
                {showColumnHeader()}
                {showTableData()}
                {showPaginationNav()}

            </div>
        
            {/* {isOpen ? ( popupAddEdit() ) : ''}
            {isShowSupplier ? ( popupSupplier() ) : ''}
            {IsShowViewDetail ? ( popupViewDetail() ) : ''}
            {IsShowPicture ? ( popupPicture() ) : ''}
            {IsShowCopyPicture ? ( popupCopyPicture() ) : ''}
            {IsShowPrintBarcode ? ( popupPrintBarcode() ) : ''} */}
        </div>
    </>
  )
}

export default EmployeeList