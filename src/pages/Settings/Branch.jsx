import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { Form, Row, Col, FloatingLabel } from 'react-bootstrap';

import { useNavigate } from "react-router-dom";
import { FaWindowClose,FaArrowUp, FaArrowDown } from "react-icons/fa";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { isMobile } from 'react-device-detect';

import {GetMyHeaders} from '../Functions/GetAPIToken';
import {MyServerHostJava, mySubstr,CheckAccessRights, decryptPWord} from '../Functions/MyFunctions';
// formatNumber,CheckNumber,dateIsValid,

let nModule =1002;
let dbServerHostJava = MyServerHostJava();

const initDetailState = {
    aliasName: '',
    barcode: '',
    branchCode: '',
    branchName: '',
    branchType: '',
    brgy: '',
    city: 'Zamboanga City',
    numDaysInventory: 0,
    province: 'Zamboanga del Sur',
    street: '',
}

const styles = {
    boxHeadTitle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 25,
        marginTop: '1px',
        marginBottom: '15px',
        width: '100%',
        color: 'white',
        backgroundColor: '#448AFF',
      },
    popupBox: {
        position: 'fixed',
        background: '#00000050',
        width: '100%',
        height: '100vh',
        top: '0',
        textAlign: 'center',
      },
    popupContainer: {
        position: 'relative',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems:'center',
        width: !isMobile ? '400px' : window.screen.width >=400 ? '400px' : '100%',
        // width: isMobile ? '100%': '400px',
        // width:  '400px',
        height: '640px',
        margin: 'auto',
        // marginTop:  topMargin +'px',
        marginTop:  '5px',
        background: '#fff',
        borderRadius: '6px',
        padding: '2px 5px 5px 20px',
        border: '1px solid #999',
        overflow: 'auto',
      },
    popupHeadTitle: { width: "100%", marginTop: "0px", marginBottom: "25px", textAlign: 'center', color: 'blue'},
    
  };

const Branch = () => {
    
    const Navigate = useNavigate();
   
    const [datBranch, setDataBranch] = useState([0]);  // data array complete data
    const [datTable, setDatTable] = useState([0]);  // data array for searching, pgnation

    const [inputState, setInputState] = useState([initDetailState]);
    // check box
    const [drugStore, setDrugStore] = useState(false);
    const [grocery, setGrocery] = useState(false);
    const [telecom, setTelecom] = useState(false);
    const [jewelry, setJewelry] = useState(false);
    const [pawnshop, setPawnshop] = useState(false);

	const [sorted, setSorted] = useState({ sorted: "name", reversed: true });
	const [searchPhrase, setSearchPhrase] = useState("");
    
    const branchCodeRef = useRef(null);
    // const branchNameRef = useRef(null);
    const aliasNameRef = useRef(null);
    const streetRef = useRef(null);
    const brgyRef = useRef(null);
    const cityRef = useRef(null);
    const provinceRef = useRef(null);
    // const numDaysInventoryRef = useRef(null);
    const barcodeRef = useRef(null);

    const drugStoreRef = useRef(null);
    const groceryRef = useRef(null);
    const jewelryRef = useRef(null);
    const telecomRef = useRef(null);
    const pawnshopRef = useRef(null);
            
    const [isAdd, setIsAdd] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(false);
      }

    //pagination
    const [currentPage, setCurrentPage] = useState(1)
    let recordsPerPage = 15;
    let lastIndex = currentPage * recordsPerPage;
    let firstIndex = lastIndex - recordsPerPage;
    let ReCords =0;
    let npage =   0;
    if (lastIndex <=0) {
        ReCords =  0 ;
        npage =    0 ;
    } else {
        ReCords =  datTable.slice(firstIndex, lastIndex) ;
        npage =    datTable.length ? Math.ceil(datTable.length / recordsPerPage) : 0 ;
    }
    let numbers = [...Array(npage + 1).keys()].slice(1,10)  ;

    let varIsAdd = isAdd ? "Add" : "Edit";
    var gAccessToken="";
    
    gAccessToken = decryptPWord(sessionStorage.getItem("accessToken"));
    // sessionStorage.setItem("accessBranch",'J4');
    //  gAcceesBranch = sessionStorage.getItem("accessBranch");

    
    useEffect(() => {
        loadData();
    }, []);

    
    //function const
    const sortByCode = () => {
		const dtRead = [...datBranch];
		dtRead.sort((dtReadA, dtReadB) => {
			
            const fullNameA = `${dtReadA.branchCode}`;
			const fullNameB = `${dtReadB.branchCode}`;

			if (sorted.reversed) {
				return fullNameB.localeCompare(fullNameA);
			}
			return fullNameA.localeCompare(fullNameB);
		});
		setDatTable(dtRead);
		setSorted({ sorted: "code", reversed: !sorted.reversed });
	};

	const sortByName = () => {
		const dtRead = [...datBranch];
		dtRead.sort((dtReadA, dtReadB) => {
			
            const fullNameA = `${dtReadA.aliasName}`;
			const fullNameB = `${dtReadB.aliasName}`;

			if (sorted.reversed) {
				return fullNameB.localeCompare(fullNameA);
			}
			return fullNameA.localeCompare(fullNameB);
		});
		setDatTable(dtRead);
		setSorted({ sorted: "name", reversed: !sorted.reversed });
	};

    const renderArrow = () => {
		if (sorted.reversed) {
            return <FaArrowDown />;	
		}
        return <FaArrowUp />;
	};

	const search = (event) => {
        // alert(event.target.value);
		const matchedRead = datBranch.filter((dtRead) => {
			return `${dtRead.branchName} ${dtRead.aliasName} ${dtRead.street} ${dtRead.brgy}`
				.toLowerCase()
				.includes(event.target.value.toLowerCase());
		});
        setDatTable(matchedRead);
		setSearchPhrase(event.target.value);
	 };

     
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

     const handleWindowClose = () => {
        Navigate(-1);
    }

    const handleRefdresh = () => {
        loadData()
        toast.success("Refresh Data Successfully");
    }

    const handleAddShow  = () => {
        if (CheckAccessRights(nModule,'Append')===false) {
            alert("Sorry! no access to add new class..");
            return false;
        }
        
        // topMargin = ((window.innerHeight-600)/2) ;

        setInputState(initDetailState);
        setDrugStore(false) ;
        setGrocery(false) ;
        setTelecom(false) ;
        setJewelry(false) ;
        setPawnshop(false) ;

        if (datTable.length >0 ) {
            let lastrow = datTable.length -1;
            let nNewBranchNum =datTable[lastrow].branchCode +1;
            let cNewBranchName ='ORO '+ nNewBranchNum;
            let cNewBarcode ='ORO'+ nNewBranchNum +'8'+ nNewBranchNum + nNewBranchNum;
            // alert('am the last row:' + datTable[lastrow].branchCode  + ", new Branch#: " + nNewBranchNum);
            setInputState(inputState => ({...inputState,  branchCode: nNewBranchNum,  branchName: cNewBranchName, barcode: cNewBarcode}));
        }
        setIsAdd(true);
        setIsOpen(true);

        const timer = setTimeout(() => {
            // branchCodeRef.current.focus();
            aliasNameRef.current.focus();
        }, 1000);
        return () => clearTimeout(timer);
    }

    const handleEditShow  = (dtRead) => {
        if (CheckAccessRights(nModule,'Modify')===false) {
            alert("Sorry! no access to edit/modify class..");
            return false;
        }
        let loadDetailState = {
            aliasName: dtRead.aliasName,
            barcode: dtRead.barcode,
            branchCode: dtRead.branchCode,
            branchName: dtRead.branchName,
            branchType: dtRead.branchType,
            brgy: dtRead.brgy,
            city: dtRead.city,
            numDaysInventory: dtRead.numDaysInventory,
            province: dtRead.province,
            street: dtRead.street,
        }
        // console.log('load data: ',loadDetailState);
        
        setDrugStore(false) ;
        setGrocery(false) ;
        setTelecom(false) ;
        setJewelry(false) ;
        setPawnshop(false) ;
        let nLength = dtRead.branchType.length
        for(let i = 0; i <= nLength; i++){
            // alert("test: " + i)
            let cStr = dtRead.branchType.substr(i,1);
            if (cStr==='D') {
                setDrugStore(true) ;
            } else if (cStr==='G') { 
                setGrocery(true) ;
            } else if (cStr==='T') { 
                setTelecom(true) ;
            } else if (cStr==='J') { 
                setJewelry(true) ;
            } else if (cStr==='P') { 
                setPawnshop(true) ;
            }
            // alert(dtRead.branchType + ": " + i  + " , " + cStr )
        }
        setInputState(loadDetailState);
        setIsOpen(true);
        setIsAdd(false)  ;

        const timer = setTimeout(() => {
            aliasNameRef.current.focus();
        }, 100);
        return () => clearTimeout(timer);
    }
    
    const handleEnter = (event) => {
        // alert(event.key.toLowerCase());
        // arrowup
        if (event.key.toLowerCase() === "enter" || event.key.toLowerCase() === "arrowdown" ) {
            if (event.target.name==="branchCode") {
                if (CheckGet(1)) {
                    aliasNameRef.current.focus();
                    return true;
                 }
            } else if (event.target.name==="aliasName") {
                streetRef.current.focus();
            } else if (event.target.name==="street") {
                brgyRef.current.focus(); 
            } else if (event.target.name==="brgy") {    
                cityRef.current.focus();     
            } else if (event.target.name==="city") {    
                provinceRef.current.focus();     
            } else if (event.target.name==="province") {
                barcodeRef.current.focus();             
            } else if (event.target.name==="barcode") {    
                drugStoreRef.current.focus();       
            } else if (event.target.name==="drugStore") {    
                groceryRef.current.focus(); 
            } else if (event.target.name==="grocery") {    
                telecomRef.current.focus();    
            } else if (event.target.name==="telecom") {    
                jewelryRef.current.focus();    
            } else if (event.target.name==="jewelry") {   
                pawnshopRef.current.focus();    
            } else if (event.target.name==="pawnshop") {             
                if (window.confirm( isAdd ? "Add new branch ?" : "Update changes ?"  )) {
                    handleSave();
                    return true;
                }
            }
          event.preventDefault();
        }
        else if (event.key.toLowerCase() === "arrowup") {
            if (event.target.name==="branchCode") {

            } else if (event.target.name==="aliasName") {
                branchCodeRef.current.focus();
            } else if (event.target.name==="street") {
                aliasNameRef.current.focus();
            } else if (event.target.name==="brgy") {
                streetRef.current.focus();
            } else if (event.target.name==="city") {    
                brgyRef.current.focus();
            } else if (event.target.name==="province") {    
                cityRef.current.focus(); 
            } else if (event.target.name==="barcode") {    
                provinceRef.current.focus(); 
            } else if (event.target.name==="drugStore") {    
                barcodeRef.current.focus();
            } else if (event.target.name==="grocery") {    
                drugStoreRef.current.focus();     
            } else if (event.target.name==="telecom") {                   
                groceryRef.current.focus();     
            } else if (event.target.name==="jewelry") {                   
                telecomRef.current.focus();     
            } else if (event.target.name==="pawnshop") {                   
                jewelryRef.current.focus();             
            }

            // event.preventDefault();
        } else if (event.keyCode >=112 && event.keyCode <=123) {
            // Turn off Function key F1 to F12
            event.preventDefault();              

        }
      };


      const handleInputChange = (e) => {
        //alert("e " + e.target.name)
        if (e.target.name==="rrrclasscode") {
            
        } else  {
            setInputState(inputState => ({...inputState,  [e.target.name]: e.target.value}));
        }

      };

      
      const handleChangeCase = (e) => {
         setInputState(inputState => ({...inputState,  [e.target.name]: e.target.value.toUpperCase()}))
      }

      const handleFocus = (event) => {
        if (event.target.name==="branchCode") { 
            branchCodeRef.current.select() ;
        // } else if (event.target.name==="branchName") {
            // branchNameRef.current.select() ;
        } else if (event.target.name==="aliasName") {
            aliasNameRef.current.select() ;        
        } else if (event.target.name==="street") {
            streetRef.current.select() ;    
        }
      } 


      function CheckGet(nMode) {
        if (nMode===1) {
            if (inputState.branchCode==="") {
                toast.error("Branch Code must be filled out!");
                branchCodeRef.current.focus();
                return false;
            }
            if (isAdd) {
                let copyState = [...datBranch];
                const exists = copyState.find((p) => p.branchCode === Number(inputState.branchCode));
                if (exists) {
                    alert("Duplicate Branch Code: " + inputState.branchCode) ;
                    branchCodeRef.current.focus(); 
                    return false;
                }
            }
        } else if (nMode===2) {     
            if (inputState.aliasName==="") {
            toast.error("Alias Name must be filled out!");
             aliasNameRef.current.focus();
             return false;
            }  
        }
        return true;
    }
    

    

    //   --- Model ---
    const loadData = async () => {
        try {
            await fetch(dbServerHostJava + "/branches/list", {                
            method: 'GET',
            headers: GetMyHeaders(gAccessToken),
            })
            .then((response) => response.json() )
            .then((json) => {
                // console.log("data Branches: ", json.data)
                setDataBranch(json.data);
                setDatTable(json.data);
            })

         } catch (err) {
            // console.log(err)
             setDataBranch({branchCode: '0', branchName: 'none', aliasName: 'none'});
             toast.error("NO branches data to display,  " + err ); 
        }
    }

    const handleSave = async (e) => {
        for(let i = 1; i <= 2; i++){
            // alert("test: " + i)
            if (!CheckGet(i)) {
                // alert("Error: " + i)
                return false;
            }
        }
        let tBranchType='';
        // alert('drugstore: ' + drugStore)
        // alert('grocery: ' + grocery)
        // alert('telecom: ' + telecom)
        // alert('jewelry: ' + jewelry)
        // alert('pawnshop: ' + pawnshop)
        if (drugStore===true){ tBranchType='D'}
        if (grocery===true){ 
            if (tBranchType.length >0) {
                tBranchType= tBranchType + ',G'
            } else {
                tBranchType='G'
            }
        }
        if (telecom===true){ 
            if (tBranchType.length >0) {
                tBranchType= tBranchType + ',T'
            } else {
                tBranchType='T'
            }
        }
        if (jewelry===true){ 
            if (tBranchType.length >0) {
                tBranchType= tBranchType + ',J'
            } else {
                tBranchType='J'
            }
        }
        if (pawnshop===true){ 
            if (tBranchType.length >0) {
                tBranchType= tBranchType + ',P'
            } else {
                tBranchType='P'
            }
        }
        
       
        // alert('T branch Type: ' + tBranchType)

        let optionBody = {
            aliasName: inputState.aliasName,
            barcode: inputState.barcode,
            branchCode: inputState.branchCode,
            branchName: inputState.branchName,
            branchType: tBranchType,
            brgy: inputState.brgy,
            city: inputState.city,
            numDaysInventory: inputState.numDaysInventory,
            province: inputState.province,
            street: inputState.street,
        }
    
        //  console.log('saving branch:',optionBody)

        if (isAdd ===true) {
            
            // alert("add here code to insert  not done " + classCode) ;
            try {
                await fetch(dbServerHostJava + "/branches/create", {                
                method: 'POST',
                headers: GetMyHeaders(gAccessToken),
                body: JSON.stringify(optionBody)
                }).then((response) => {
                    response.json().then((json) => {
                    // console.log('saving data:',json.data);
                    
                    if (Number(response.status)===200) {
                        toast.success("Successfully Created... ")
                        setIsOpen(false);
                    } else {    
                        toast.success("Unsuccessfully Insert: " + json.error + ","  + json.message )         
                        alert("Unsuccessfully Insert: " + json.error+ ","  + json.message )  
                    }
                    
                })    
                }).catch(Error => {
                    // console.log("Test: ",Error)
                    alert("catch Error: " + Error )             
                })
                loadData();
                return true;
            } catch (error) {
                console.error("Error:", error);
                alert("Unsuccessfully Insert " + error ) 
                toast.error("Unsuccessfully Insert: " +  error)
            }

        } else {
            // save edit/modify
            try {
                await fetch(dbServerHostJava + "/branches/update",{
                method: 'PUT',
                headers: GetMyHeaders(gAccessToken),
                body: JSON.stringify(optionBody)
            }).then((response) => response.json() )
              .then((json) => {
                // console.log("put results 1:", json);  
                // console.log("put results 2:", json);   
                
                if (Number(json.status)===200) {    
                    toast.success("Successfully Change... ")
                    setIsOpen(false);
                } else {    
                    toast.success("Unsuccessfully Change: " + json.error + ","  + json.message )         
                    alert("Unsuccessfully Change: " + json.error + ","  + json.message )  
                }
                

            })
              loadData();

            } catch (error) {
                console.error("Error:", error);
                alert("Unccessfully Update " + error ) 
            }
        } 
    };

    const handleDelete = (id, tDesc) => {
        // alert ("n/a")
        alert("Sorry! delete/remove branch not applicable...");
        return false;


    //     if (CheckAccessRights(nModule,'Delete')===false) {
    //        alert("Sorry! no access to delete/remove class..");
    //        return false;
    //    }
    //     return false;
    //    //  check only admin can delete chris/admin/gerard

    //    if (
    //        window.confirm("Are you sure that you wanted to delete the record,  "+ tDesc +" with ID: " + id +" ?")
    //        ) {

    //        try {
    //            // fetch( dbServerHostNodeJS + "/karats/deleteKarat/" + id, {
    //            fetch( dbServerHostJava + "/api/j/profile/discount/delete/" + id, {
    //            method: 'DELETE',
    //            headers: GetMyHeaders(gAccessToken)
    //            }).then(() => {
    //                console.log('removed');
    //                // alert("Karat: " + id + ", Value: " + contactName + ", Deleted Successfully");
    //                loadData();
    //                toast.success("ID: " + id + ", Group: " + tDesc + ", Deleted Successfully");
    //            }).catch(err => {
    //                console.error(err)
    //            });
    //            const timer = setTimeout(() => {
    //            loadData();
    //            }, 50);
    //            return () => clearTimeout(timer);
    //        } catch (error) {
    //            console.error("Error:", error);
    //            alert("Unsuccessfully Remove " + error ) 
    //        }
   
          
    //    }
   }



    // --- View ---

    function showColumnHeader() {
        return (
            <div>
                <div className='search-container'>
                    <input  
                        style={{width: isMobile ? '100%':'250px'}}
                        type="text"
                        placeholder="Search"
                        value={searchPhrase}
                        onChange={search}
                    />
                </div>
                
                {isMobile ? ( <br></br>) : ''}

                <div style={{ marginTop:'0px', marginRight:'20px',fontSize: isMobile ? '13px':'15px', float: 'right'}}>
                <button className="btn-neo1 btn-neo1-primary" style={{marginLeft: '0rem' }} onClick={() => handleAddShow()}>Add New Branch</button> 
                <button className="btn-neo1 btn-neo1-secondary" style={{marginLeft: '.6rem' }} onClick={() => handleRefdresh()}>Refresh Data</button>
                <button className="btn-neo1 btn-neo1-dark" style={{marginLeft: '.6rem' }} onClick={() => Navigate('/dashboard')}>Home</button>
                </div>
                <br></br>
                <br></br>
            </div>  
        ) 
    }

    function showTableData() {
        return (
            <div>
                <table className="styled-table" style={{fontSize: isMobile ? '.6rem':'15px', marginTop: '0px' }} >
                    <thead>
                        <tr>
                            <th style={{textAlign: "center", width: "20px"}}>No.</th>
                            
                            <th style={{textAlign: "left", width: "75px" }} onClick={sortByCode}>
                                    <span style={{ marginRight: 3 }}>Branch</span>
                                    {sorted.sorted === "code" ? renderArrow() : null}
                            </th>
                            <th style={{textAlign: "left", width: "150px" }} onClick={sortByName}>
                                <span style={{ marginRight: 3 }}>Alias Name</span>
                                {sorted.sorted === "name"
                                    ? renderArrow()
                                    : null}
                            </th>

                            {/* <th style={{textAlign: "left", width: "60px" }}>Code</th>
                            <th style={{textAlign: "left", width: "220px" }}>Class Description</th> */}

                            <th style={{textAlign: "left", width: "250px" }}>Street</th>

                            <th style={{textAlign: "left", width: "140px" }}>Barangay</th>
                            <th style={{textAlign: "left", width: "90px" }}>Branch Type</th>
                            <th style={{textAlign: "center",  width: "100px"}}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {  ReCords.length >= 0 && ReCords.map((recData, index) => (
                            <tr style={{ height: "3px"}} key={ recData.self } onDoubleClick={() => handleEditShow(recData)}>
                                {/* <td>{ index + 1 }</td> */}
                                <td style={{textAlign: "left", width:"20px" }} >{ recData.branchCode } </td>
                                <td style={{textAlign: "left", width:"75px" }} >{ recData.branchName } </td>
                                <td style={{textAlign: "left", width:"150px" }} >{ mySubstr(recData.aliasName,0,60)}</td>
                                <td style={{textAlign: "left", width:"250px" }} >{ mySubstr(recData.street,0,60)}</td>
                                <td style={{textAlign: "left", width:"140px" }} >{ recData.brgy}</td>
                                <td style={{textAlign: "left", width:"90px" }} >{ recData.branchType}</td>
                                <td>
                                    <AiFillEdit className='action-button' style={{ marginLeft: '1rem', color: 'darkblue' }} onClick={() => handleEditShow(recData)}/>  
                                    <AiFillDelete className='action-button' style={{ marginLeft: '.5rem', color: 'red'}} onClick={() => handleDelete(recData.self,  "Sequence: "+ recData.sequence + ", Group: " + recData.group)}/>  
                                </td>
                            </tr>
                        )) }
                        
                    </tbody>
                </table>
            </div>
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
    
    //   add edit popup box      
    function popupAddEdit() {
        return (
            <div style = {styles.popupBox}>
                <div style ={styles.popupContainer}>
                    <FaWindowClose className='windowclose-button' style={{marginTop: '00px'}} onClick={togglePopup}/>    
                    <h5 style ={styles.popupHeadTitle}  > {varIsAdd} Branch Detail</h5>
                    <div style ={{marginRight:'18px',marginTop:'0px'}}>  
                        <Row className="g-1" >
                            <Col md className="mb-2" style={{display:'inline-flex', marginTop:'0px', marginLeft:'0px'}}>
                                <FloatingLabel label="Branch No.">
                                    <Form.Control
                                        style={{width:'140px', marginRight:'15px', height:'52px', textAlign:'center',fontWeight:'bold' }}
                                        type="text"
                                        name="branchCode"
                                        width='50px'
                                        require
                                        onKeyDown={handleEnter}
                                        onChange ={(e) => handleInputChange(e)}
                                        onMouseEnter={(e) =>  handleChangeCase(e)}
                                        onFocus={handleFocus}
                                        value={inputState.branchCode || ""}
                                        ref={branchCodeRef}
                                        maxLength={2}
                                        disabled={!isAdd}
                                        
                                    />
                                </FloatingLabel>
                                <FloatingLabel label="Branch Name" >
                                    <Form.Control
                                        style={{height:'52px', fontWeight:'bold' }}
                                        type="text"
                                        value={inputState.branchName || ""}
                                        disabled={true}
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row className="g-1" >
                            <FloatingLabel label="Alias Name" className="mb-2" >
                                <Form.Control
                                style={{height:'52px', fontWeight:'bold' }}
                                    type="text"
                                    name="aliasName"
                                    require
                                    onKeyDown={handleEnter}
                                    onChange ={(e) => handleInputChange(e)}
                                    onMouseEnter={(e) =>  handleChangeCase(e)}
                                    onFocus={handleFocus}
                                    value={inputState.aliasName || ""}
                                    ref={aliasNameRef}
                                    maxLength={25}
                                />
                            </FloatingLabel>
                        </Row> 
                        <Row className="g-1" >
                            <FloatingLabel label="Street" className="mb-2" >
                                <Form.Control
                                style={{height:'52px' }}
                                type="text"
                                    name="street"
                                    require
                                    onKeyDown={handleEnter}
                                    onChange ={(e) => handleInputChange(e)}
                                    onMouseEnter={(e) =>  handleChangeCase(e)}
                                    onFocus={handleFocus}
                                    value={inputState.street || ""}
                                    ref={streetRef}
                                    maxLength={45}
                                />
                            </FloatingLabel>
                        </Row> 
                        <Row className="g-1" >
                            <FloatingLabel label="Barangay" className="mb-2" >
                                <Form.Control
                                    style={{height:'52px' }}
                                    type="text"
                                    name="brgy"
                                    require
                                    onKeyDown={handleEnter}
                                    onChange ={(e) => handleInputChange(e)}
                                    onMouseEnter={(e) =>  handleChangeCase(e)}
                                    onFocus={handleFocus}
                                    value={inputState.brgy || ""}
                                    ref={brgyRef}
                                    maxLength={45}
                                />
                            </FloatingLabel>
                        </Row> 
                        <Row className="g-1" >
                            <FloatingLabel label="City" className="mb-2" >
                                <Form.Control
                                    style={{height:'52px' }}
                                    type="text"
                                    name="city"
                                    require
                                    onKeyDown={handleEnter}
                                    onChange ={(e) => handleInputChange(e)}
                                    onMouseEnter={(e) =>  handleChangeCase(e)}
                                    onFocus={handleFocus}
                                    value={inputState.city || ""}
                                    ref={cityRef}
                                    maxLength={45}
                                />
                            </FloatingLabel>
                        </Row> 
                        <Row className="g-1" >
                            <FloatingLabel label="Province" className="mb-2" >
                                <Form.Control
                                style={{height:'52px' }}
                                    type="text"
                                    name="province"
                                    require
                                    onKeyDown={handleEnter}
                                    onChange ={(e) => handleInputChange(e)}
                                    onMouseEnter={(e) =>  handleChangeCase(e)}
                                    onFocus={handleFocus}
                                    value={inputState.province || ""}
                                    ref={provinceRef}
                                    maxLength={45}
                                />
                            </FloatingLabel>
                        </Row> 
                        <Row className="g-1" >
                            <FloatingLabel label="Branch Code" className="mb-2" >
                                <Form.Control
                                style={{height:'52px' }}
                                type="text"
                                    name="barcode"
                                    require
                                    onKeyDown={handleEnter}
                                    onChange ={(e) => handleInputChange(e)}
                                    onMouseEnter={(e) =>  handleChangeCase(e)}
                                    onFocus={handleFocus}
                                    value={inputState.barcode || ""}
                                    ref={barcodeRef}
                                    maxLength={45}
                                />
                            </FloatingLabel>
                        </Row> 
                            
                        <div className='chrich-left' style={{textAlign:'left', height:'100px'}}>
                            <Form.Check
                                label="Drug Store"
                                type='checkbox' 
                                name='drugStore'
                                defaultChecked={drugStore}
                                ref={drugStoreRef}
                                onKeyDown={handleEnter}
                                onChange ={() =>  setDrugStore(!drugStore)}	
                                onFocus={handleFocus}
                            />
                            <Form.Check
                                label="Grocery"
                                type='checkbox' 
                                name='grocery'
                                defaultChecked={grocery}
                                ref={groceryRef}
                                onKeyDown={handleEnter}
                                onChange ={() =>  setGrocery(!grocery)}	
                                onFocus={handleFocus}
                            /> 
                            <Form.Check
                                label="Telecom"
                                type='checkbox' 
                                name='telecom'
                                defaultChecked={telecom}
                                ref={telecomRef}
                                onKeyDown={handleEnter}
                                onChange ={() =>  setTelecom(!telecom)}	
                                onFocus={handleFocus}
                            /> 
                        </div>
                        <div  className='chrich-left' style={{textAlign:'left', height:'100px'}}>
                            <Form.Check
                                label="Jewelry"
                                type='checkbox' 
                                name='jewelry'
                                defaultChecked={jewelry}
                                ref={jewelryRef}
                                onKeyDown={handleEnter}
                                onChange ={() =>  setJewelry(!jewelry)}	
                                onFocus={handleFocus}
                            /> 
                            <Form.Check
                                label="Pawnshop"
                                type='checkbox' 
                                name='pawnshop'
                                defaultChecked={pawnshop}
                                ref={pawnshopRef}
                                onKeyDown={handleEnter}
                                onChange ={() =>  setPawnshop(!pawnshop)}	
                                onFocus={handleFocus}
                            /> 

                        </div>

                    </div>
                    <div style={{ width: "100%", marginTop: "30px", textAlign: 'center', color: 'blue'  }}>
                        <input type="submit" name="submit" value="Save" style={{ marginLeft: '0', width:'120px' }} className="btn-neo1 btn-neo1-success" onClick={handleSave} />
                        <input type="submit" name="submit" value="Cancel" style={{ marginLeft: '2rem', width:'120px' }} className="btn-neo1 btn-neo1-danger" onClick={togglePopup}  />
                    </div>  
                </div>
            </div>
        )
    }

    
    return (
         <div >
            <div className='Box-Center' style={{width: isMobile ? '100%' :'820px', height: '600px', marginTop: '0px' }} >
                <FaWindowClose className='windowclose-button' onClick={() => handleWindowClose()}/>  
                <h3 style={styles.boxHeadTitle}>Branch List  </h3>
                
                {showColumnHeader()}
                {showTableData()}
                {showPaginationNav()}
            </div>
    
            {isOpen ? ( popupAddEdit() ) : ''}
        </div>
    )

    
}
 
export default Branch
