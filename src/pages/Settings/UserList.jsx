// 0 = Active
// 1 = resigned
// 2 = on-leave
// 3 = suspended
// 4-= awol


//import { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import React, { useState, useEffect, useRef }  from 'react';
import { useWindowSize } from "@uidotdev/usehooks";
// import { Dropdown, Form, FloatingLabel } from 'react-bootstrap';
import { Form, FloatingLabel } from 'react-bootstrap';

import { Button, Menu, MenuItem } from '@mui/material';

import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import CloseIcon from '@mui/icons-material/Close';
import { IconButton} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


// import axios from "axios";
import { FaArrowCircleRight } from "react-icons/fa";
import { FaArrowUp, FaArrowDown  } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";
// RiAlertLine,MyServerHost, delayMe,
import { AiFillEdit, AiFillDelete, AiFillFolder } from "react-icons/ai";

import EditForm from "./UserEditModal";
import {MyServerHostJava,  CheckBoxNum2Boalen, CheckBoxBoalen2Num, decryptPWord}  from '../Functions/MyFunctions';
import {GetMyHeaders} from '../Functions/GetAPIToken';
// import { myStyles }  from '../Functions/MyFunctionsCSS';

//const dbServerHost ="http://127.0.0.1:3001"
let gScreenWidth = 650;
// var dbServerHost = MyServerHost()
let dbServerHostJava = MyServerHostJava();
// var gSystemCode = 8000;
// var gAccountCode = 0;

window.localStorage.signup = 1;

// const initMainState = {
//     dashboard: 0,
//     ds_grocery: 0,
//     foton: 0,
//     jewelry: 0,
//     payroll: 0,
//     settings: 0,
//     telecom: 0,
//     self: 0
// }

const initModuleState = {
    moduleNo: 0,
    modules: '',
    systemsCode: 0,
    self: 0
}

const initDetailState = {
    appendData: false,
    modifyData: false,
    deleteData: false,
    printData: false,
    finalData: false,
    postData: false,
    processData: false,
    approvedData: false,
    empno: "",
    moduleId: 0,
    modules: "",
    systemsCode: 0,
    self: 0
}


// const popupBox = {
//     position: 'fixed',
//     background: '#00000050',
//     margin: 'auto',
//     width: '100%',
//     height: '100vh',
//     // height : topMargin,
//     top: '0',
//     // left: '0',
//     textAlign: 'center',
//     // justifyContent: 'center',
//     // alignItems:'center',
//   }
  
const boxStyle= {
    position: 'relative',
    // width: '62%',
    width: '680px',
    margin: '0 auto',
    height: 'auto',
    maxHeight: '600vh',
    // marginTop: 'calc(100vh - 85vh - 20px)',
    marginTop: 'calc(100vh - 80vh - 10px)',
    background: '#fff',
    borderRadius: '6px',
    padding: '5px 5px 20px 5px',
    border: '1px solid #999',
    overflow: 'auto',
}
   

  const boxStyleModule= {
        position: 'relative',
        width: '320px',
        height: '300px',
        marginTop: '1px',
        background: '#fff',
        borderRadius: '6px',
        // padding: '10px',
        padding: '0px 0px 0px 0px',
        border: '1px solid #999',
        overflow: 'auto',
  }

  const boxStyleAccountDetail= {
        // position: 'absolute',
        position: 'relative',
        width: '320px',
        height: '300px',
        marginTop: '-298px',
        marginLeft: '330px',
        background: '#fff',
        borderRadius: '2px',
        padding: '0px 0px 0px 0px',
        border: '1px solid #999',
        overflow: 'auto',
        //  textAlign:'center',
        //  alignContent :'center',
  }
//   use for initialization new/add new user modeCode: "Add New", 
const datArray = {
        self : 0,  username: "Add New",firstName: "",  lastName: "",
        email: "", contactNumber: "",
        dashboard: 0, jewelry: 0, pawnshop: 0, ds_grocery : 0, payroll: 0, foton: 0, settings: 0, barcode: 1
}





const Userlist = () => {
    var gAccessToken="";
    gAccessToken = decryptPWord(sessionStorage.getItem("accessToken"));
    // gSystemCode=SystemCode;


    const Navigate = useNavigate();
    // const [posts, setPosts] = useState([]);
    const size = useWindowSize();
    const [isScreenWidth, setIsScreenWidth] = useState(false);

    const [product, setProduct] = useState([]);  // data array
    const [datTable, setDatTable] = useState([]);  // data array for searching, pgnation
    // const [suppcode, setSuppCode] = useState([]);  // data array
    //const [tID, setIDKey] = useState("");         // idkey variable
    const [datUsers, setdatUsers] =useState([]); // data array set from produts
    const [datModule, setModule] = useState([]);  // data modules
    const [datAccountD, setAccountD] = useState([]);  // data accounts detail
    
    const [show, setShow] = useState(false);
    const [editShow, setEditShow] = useState(false); // modal edit
    const [isOpen, setIsOpen] = useState(false); // popup box roles
    const [isShowModule, setIsShowModule] = useState(false); // popup box roles add edit module box
    const [isShowAccountDetailsUpdate, setIsShowAccountDetailsUpdate] = useState(false); // popup box roles account details
    
    const [firtsname, setFirstName] = useState([]); 
    const [AccountCode, setAccountCode] = useState(0);

    const [isAddEditModule, setIsAddEditModule] = useState(false); 
    const [isInputChange, setIsInputChange] = useState(false); 
    // const [inputMainState, setInputMainState] = useState(initMainState); 
    const [inputModuleState, setInputModuleState] = useState(initModuleState); 

    const [isSellectAll, setIsSellectAll] = useState(false); 
    const [inputDetailState, setInputDetailState] = useState([initDetailState]);
    // const [checkBoxSelect, setCheckBoxSelect] = useState(false);
    
    // const [selSystems, setSelSystems] = useState(''); 
    const optSystems = [
        {value: '1000', text: 'User Mainternance'},
        {value: '2000', text: 'Drug Store/Grocery'},
        // {value: '3000', text: 'Account Recievable (AR)'},
        // {value: '4000', text: 'Account Payables (AP)'},
        // {value: '5000', text: 'B.O.'},
        {value: '6000', text: 'Human Resources (HRMS)'},
        {value: '7000', text: 'Telecom'},
        {value: '8000', text: 'Jewelry'},
        {value: '9000', text: 'Pawn Shop'},
      ];
    // const optStatus = [
    //     {value: '0', text: 'Active'},
    //     {value: '2', text: 'On-Leave'},
    //     {value: '4', text: 'Awol'},
    //     {value: '3', text: 'Suspended'},
    //     {value: '1', text: 'Resigned'},
    // ];  
    
    const systemsRef = useRef(null);
    const moduleNoRef = useRef(null);
    const moduleDescRef = useRef(null);

    const appendRef = useRef(null);
    const modifyRef = useRef(null);
    const deleteRef = useRef(null);
    const printRef = useRef(null);
    const finalRef = useRef(null);
    const postRef = useRef(null);
    const processRef = useRef(null);
    const approveRef = useRef(null);
    
    // sort, search
    const [sorted, setSorted] = useState({ sorted: "name", reversed: true });
	const [searchPhrase, setSearchPhrase] = useState("");
    //pagination
    const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 17;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const ReCords =  datTable.slice(firstIndex, lastIndex) ;
    let npage =   datTable.length >0 ? Math.ceil(datTable.length / recordsPerPage) : 0;
    let numbers = [...Array(npage + 1).keys()].slice(1,11)  ;
    

    const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenuitem = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (filter) => {
    console.log(`Filtering by ${filter}`);
    handleClose();
  };

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    // modal edit


    const handleWindowClose = () => {
        Navigate(-1);
    }
    const handleEditShow  = (datUser) => {
        //alert("ID " + id.idkey);
        setdatUsers(datUser)
        setEditShow(true);
    }
    const handleEditClose = () => setEditShow(false);

    const togglePopupClose = (tKey) => {
        if (tKey==='Roles-detail-view-table') {
            setIsOpen(false) ;
        } else if (tKey==='Roles-module-AddEdit') {    
            setIsShowModule(false);
        } else if (tKey==='Roles-detail-update') {
            setIsShowAccountDetailsUpdate(false);
        }
    }

    

    useEffect(() => {
        handleEditClose();
        loadDataAccountMain();
        loadDataModule();
        loadDataAccountDetail(AccountCode);
    }, []);

    useEffect(() => {
        gScreenWidth = size.width; 
        if (gScreenWidth <= 520 ) {
            setIsScreenWidth(true) ;
        } else {
            setIsScreenWidth(false) ;
        }
    });

    useEffect(() => {
        // fetch(dbServerHost + "/device_name")
        //    .then((response) => response.json())
        //    .then((data) => {
        //       console.log(data);
        //       setPosts(data);
        //     //   alert("data,  " + data.device_name) 
        //    })
        //    .catch((err) => {
        //       console.log(err.message);
        //    });
     }, []);

    useEffect(() => {
        if (isShowModule===true && isInputChange===false)  {
            if (isAddEditModule===true)  {
                systemsRef.current && systemsRef.current.focus()
            } else {
                moduleDescRef.current && moduleDescRef.current.focus()
            }
        }    
    });



     const sortByCode = () => {
		const dtRead = [...product];
		dtRead.sort((dtReadA, dtReadB) => {
			
            const fullNameA = `${dtReadA.username}`;
			const fullNameB = `${dtReadB.username}`;

			if (sorted.reversed) {
				return fullNameB.localeCompare(fullNameA);
			}
			return fullNameA.localeCompare(fullNameB);
		});
		setDatTable(dtRead);
		setSorted({ sorted: "code", reversed: !sorted.reversed });
	};

	const sortByFName = () => {
		const dtRead = [...product];
		dtRead.sort((dtReadA, dtReadB) => {
			
            const fullNameA = `${dtReadA.firstName}`;
			const fullNameB = `${dtReadB.firstName}`;

			if (sorted.reversed) {
				return fullNameB.localeCompare(fullNameA);
			}
			return fullNameA.localeCompare(fullNameB);
		});
		setDatTable(dtRead);
		setSorted({ sorted: "fname", reversed: !sorted.reversed });
	};

    const sortByLName = () => {
		const dtRead = [...product];
		dtRead.sort((dtReadA, dtReadB) => {
			
            const fullNameA = `${dtReadA.lastName}`;
			const fullNameB = `${dtReadB.lastName}`;

			if (sorted.reversed) {
				return fullNameB.localeCompare(fullNameA);
			}
			return fullNameA.localeCompare(fullNameB);
		});
		setDatTable(dtRead);
		setSorted({ sorted: "lname", reversed: !sorted.reversed });
	};

    const renderArrow = () => {
		if (sorted.reversed) {
            return <FaArrowDown />;	
		}
        return <FaArrowUp />;
	};

    const search = (event) => {
        // alert(event.target.value);
		const matchedRead = product.filter((dtRead) => {
			return `${dtRead.username} ${dtRead.firstName} ${dtRead.lastName} ${dtRead.email}`
				.toLowerCase()
				.includes(event.target.value.toLowerCase());
		});
        setDatTable(matchedRead);
		setSearchPhrase(event.target.value);
	 };

     const FilteringBy = (tDesc) => {
        let matchedRead ='';
        // alert(tDesc)
        if (tDesc==='Jewelry') {
            matchedRead = product.filter((dtRead) => {
                return `${dtRead.jewelry}`
                    .includes(1);
            });
            // alert(tDesc)
        } else if (tDesc==='Telecom') {
            matchedRead = product.filter((dtRead) => {
                return `${dtRead.telecom}`
                    .includes(1);
            });
        } else if (tDesc==='DS/Grocery') {
            matchedRead = product.filter((dtRead) => {
                return `${dtRead.ds_grocery}`
                    .includes(1);
            });    
        } else if (tDesc==='Dashboard') {
            matchedRead = product.filter((dtRead) => {
                return `${dtRead.dashboard}`
                    .includes(1);
            });       
        } else if (tDesc==='Payroll') {
            matchedRead = product.filter((dtRead) => {
                return `${dtRead.payroll}`
                    .includes(1);
            });           
        } else if (tDesc==='Settings') {
            matchedRead = product.filter((dtRead) => {
                return `${dtRead.settings}`
                    .includes(1);
            });        
            
        } else {
            return false;
        }
        
        setDatTable(matchedRead);
        handleCloseMenuitem();
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

    const handleEnter = (event) => {
        // alert(event.key.toLowerCase());
        // arrowup
        if (event.key.toLowerCase() === "enter" || event.key.toLowerCase() === "arrowdown" ) {
            if (event.target.name==="systems") {
                moduleNoRef.current.focus();
            } else if (event.target.name==="moduleNo") {
                if (CheckGet(1)) {
                    moduleDescRef.current.focus(); 
                }
            } else if (event.target.name==="moduleDesc") {
                if (CheckGet(2)) {
                    if (window.confirm( isAddEditModule ? "Add new module ?" : "Update changes ?"  )) {
                        // handleSave();
                        alert('Save new module')
                        return true;
                    }
                }    
            }
          event.preventDefault();
        }
        else if (event.key.toLowerCase() === "arrowup") {
            if (event.target.name==="vacant") {

            } else if (event.target.name==="moduleNo") {
                systemsRef.current.focus();
            } else if (event.target.name==="moduleDesc") {
                if(isAddEditModule===true) {
                    moduleNoRef.current.focus();
                } else {
                    moduleDescRef.current.focus();
                }
            }

            // event.preventDefault();
        } else if (event.keyCode >=112 && event.keyCode <=123) {
            // Turn off Function key F1 to F12
            event.preventDefault();              

        }
      };


      const handleInputChange = (e) => {
        // console.log('input: delete0 ',inputDetailState.deleteData )
        // console.log('input: delete1 ',!inputDetailState.deleteData )
        // // alert(e.target.value)
        // // alert(e.target.name)
        setIsInputChange(true);
        if (e.target.name==="systemsCode") {

        } else if (e.target.name==="moduleNo") {
            setInputModuleState(inputModuleState => ({...inputModuleState, moduleNo: e.target.value}))	
            // setInputState(inputState => ({...inputState,  [e.target.name]: e.target.value}));
        } else if (e.target.name==="moduleDesc") {
            setInputModuleState(inputModuleState => ({...inputModuleState, modules: e.target.value}))	
        } else  {
        
        }
      };
      
    const handleChangeCase = (e) => {
        setInputModuleState(inputModuleState => ({...inputModuleState,  [e.target.name]: e.target.value.toUpperCase()}))
    }

    const handleChangeSystems = event => {
        const tValues=event.target.value
        // setSelSystems(tValues);
        // console.log('syste',tValues) 
        // console.log('datModule:',[datModule]) 
        const matchedRead = datModule.filter((dtRead) => {
            return `${dtRead.systemsCode}`
                .includes(tValues);
        });

        let nNewBranchNum =Number(tValues)+1;
        console.log('matchedRead:',matchedRead) 
        if (matchedRead.length >0 ) {
            let lastrow = matchedRead.length -1;
            nNewBranchNum =matchedRead[lastrow].moduleNo +1;
            // alert('Found! : ' + nNewBranchNum) ;
        } else {
            // alert('not Found! : ' + nNewBranchNum) ;
        }

        setInputModuleState(inputModuleState => ({...inputModuleState,  moduleNo: nNewBranchNum, systemsCode: tValues, empno: AccountCode}));
        const timer = setTimeout(() => {
            moduleDescRef.current.focus();
        }, 500);
        // console.log('add mod:',[initModuleState]);
        
        return () => clearTimeout(timer);
    }

    const handleChangeSelectModule = (e, dtRead) => {
        // const tValues=event.target.value
         let lSelected = dtRead.selected;
        //  setCheckBoxSelect(!lSelected )
         datModule.forEach(function(e){
            if (e.moduleNo === dtRead.moduleNo ){
                if (lSelected===true) {
                    e.selected=false
                } else {
                    e.selected=true
                }
            }
        });
    }


    const handleFocus = (event) => {
        if (event.target.name==="systems_close") { 
            // systemsRef.current.select() ;
        } else if (event.target.name==="moduleNo") {
            moduleNoRef.current.select() ;        
        } else if (event.target.name==="moduleDesc") {
            moduleDescRef.current.select() ;    
        }
    } 

    function CheckGet(nMode) {
        if (nMode===1) {
            if (inputModuleState.moduleNo==="") {
                toast.error("Module Code must be filled out!");
                moduleNoRef.current.focus();
                return false;
            }
            let copyState = [...datModule];
            const exists = copyState.find((p) => p.moduleNo === Number(inputModuleState.moduleNo));
            if (exists) {
                alert("Duplicate Module Code: " + inputModuleState.moduleNo) ;
                moduleNoRef.current.focus(); 
                return false;
            }
        } else if (nMode===2) {     
            if (inputModuleState.modules==="") {
               toast.error("Modules Description must be filled out!");
               moduleDescRef.current.focus();
               return false;
            }
            let copyState2 = [...datModule];
            const exists2 = copyState2.find((p) => p.modules === inputModuleState.modules);
            if (exists2) {
                alert("Duplicate Module Description: " + inputModuleState.modules) ;
                moduleDescRef.current.focus(); 
                return false;
            }  


        }
        return true;
    }

    function unCheckBox(cName) {
        var x = document.getElementsByClassName(cName);
        var i=0;
        for(i=0; i<x.length; i++) {
           x[i].checked = false;
        }   
    }

    // function checkBox(cName) {
    //     var x = document.getElementsByClassName(cName);
    //     var i=0;
    //     for(i=0; i<x.length; i++) {
    //        x[i].checked = true;
    //     }   
    // }

    function checkBoxDetail(lTrue) {
        let arr_RolesDetails=['appendData','modifyData','deleteData','printData','finalData','postData','processData','approvedData']
        var i1=0;
        var i=0;
        for(i1=0; i1<arr_RolesDetails.length; i1++) {
        //   alert(arr_RolesDetails[i1])
            var x = document.getElementsByName(arr_RolesDetails[i1]);
            for(i=0; i<x.length; i++) {
                x[i].checked = lTrue;
            }   
        }   
        
    }


    const handleHome = () => {
        Navigate(-1);
    }
      
    const handleRefdresh = () => {
        loadDataAccountMain()
        toast.success("Refresh Data Successfully");
    }

    const handleModuleRefresh = () => {
        loadDataModule();
        // var x = document.getElementsByClassName("checkbox");
        // var i=0;
        // for(i=0; i<x.length; i++) {
        //    x[i].checked = false;
        //  }   
        toast.success("Refresh Module Data Successfully " + AccountCode);
    }

    const handleRolesAccountDetailRefresh = () => {
        loadDataAccountDetail(AccountCode)
        toast.success("Refresh Account Details Data Successfully " + AccountCode);
    }
        
    

    const handleRolesShow  = (datFile) => {
        // done
        // setKaratNum(datFile.karat)
        // setKaratValue(formatNumber(datFile.value))
        // setIsAdd(false)  
        // alert("Account Code: " + datFile.idkey)

        // gAccountCode = datFile.idkey;
        // setAccountCode(datFile.self);
        setAccountCode(datFile.empno);
        setFirstName(datFile.firstName);
        // let loadMainState = {
        //     dashboard: datFile.dashboard,
        //     ds_grocery: datFile.ds_grocery,
        //     foton: datFile.foton,
        //     jewelry: datFile.jewelry,
        //     payroll: datFile.payroll,
        //     settings: datFile.settings,
        //     telecom: datFile.telecom,
        //     self: datFile.self
        // }
        // setInputMainState(loadMainState);
        // loadDataModule();
        loadDataAccountDetail(datFile.empno);
        

        const timer = setTimeout(() => {
            // karatValueFocus.current.focus();
            // loadDataModule();
            setIsOpen(true);
        }, 3000);
        
        // delayMe(7000);
        
        return () => clearTimeout(timer);
    }

    const handleAddModule = async (dtRead) => {
        // done 09/18/2023
    //    console.log('systems: ', dtRead.gSystemCode);
    //    console.log('empo:',AccountCode)
        setInputModuleState(initModuleState);
        setIsAddEditModule(true);
        setIsShowModule(true);
        setIsInputChange(false);
        systemsRef.current.focus();
    }

    const handleEditModule = async (dtRead) => {
        // done  09/18/2023
        // load data
        let loadModuleState = {
            moduleNo: dtRead.moduleNo,
            modules: dtRead.modules,
            systemsCode: dtRead.systemsCode,
            self: dtRead.self
        }
        // console.log('loadModuleState:',loadModuleState);
        setInputModuleState(loadModuleState);
        setIsAddEditModule(false);
        setIsShowModule(true);
        moduleDescRef.current.focus();
    }

    
    const handleRolesAccountDetailEdit = async (datFile) => {
        // done 09/18/2023
        setInputDetailState(initDetailState);
        let loaDetailState = {
            appendData: CheckBoxNum2Boalen(datFile.appendData), 
            modifyData: CheckBoxNum2Boalen(datFile.modifyData), 
            deleteData: CheckBoxNum2Boalen(datFile.deleteData), 
            printData: CheckBoxNum2Boalen(datFile.printData), 
            finalData: CheckBoxNum2Boalen(datFile.finalData), 
            postData: CheckBoxNum2Boalen(datFile.postData), 
            processData: CheckBoxNum2Boalen(datFile.processData), 
            approvedData: CheckBoxNum2Boalen(datFile.approvedData), 
            empno: AccountCode,
            moduleId: datFile.moduleId,
            modules: datFile.modules,
            systemsCode: datFile.systemsCode,
            self: datFile.self
        }
        
        // console.log('array1:',loaDetailState)
        setInputDetailState(loaDetailState);
        // console.log('array2:',inputDetailState)
        if (datFile.appendData===1 || datFile.modifyData===1 || datFile.deleteData===1 || datFile.printData===1 || datFile.finalData===1 || datFile.postData===1) {
            setIsSellectAll(false);
        } else {
            setIsSellectAll(true); 
        }
        
        setIsShowAccountDetailsUpdate(true);
    }
    
    const handleSelectAccountDetail = () => {
        // alert(isSellectAll)
        if (isSellectAll===true){
            // console.log("select false= repl true")
            let tUpdate1= {
                appendData:true, 
                modifyData:true, 
                deleteData:true,
                printData:true,
                finalData:true,
                postData:true,
                processData:true,
                approvedData:true,
                empno: inputDetailState.empno,
                moduleId: inputDetailState.moduleId,
                modules: inputDetailState.modules,
                systemsCode: inputDetailState.systemsCode,
                self: inputDetailState.self
            }
            setInputDetailState(tUpdate1);
            checkBoxDetail(true);
            setIsSellectAll(false);      
            
        } else {
            // console.log("select true= repl false")
            let tUpdate2= {
                appendData:false, 
                modifyData:false, 
                deleteData:false,
                printData:false,
                finalData:false,
                postData:false,
                processData:false,
                approvedData:false,
                empno: inputDetailState.empno,
                moduleId: inputDetailState.moduleId,
                modules: inputDetailState.modules,
                systemsCode: inputDetailState.systemsCode,
                self: inputDetailState.self
            }
            setInputDetailState(tUpdate2);
            checkBoxDetail(false);
            setIsSellectAll(true); 
            // console.log('false:')
        }
        // delayMe(20000)
    }


    
    
// --- Model ---
    
    const loadDataAccountMain = async () => {
        // try {
        //     const response = await axios.get(dbServerHost + "/users/getUser");
        //     setProduct(response.data);
        //     //setdatUsers(response.data);
            
        // } catch (err) {
        //     alert("NO data to display,  " + err ) 
        // }

        try {
            await fetch(dbServerHostJava + "/api/accounts", {                
                method: 'GET',
                headers: GetMyHeaders(gAccessToken),
            })  
                .then((response) => response.json() )
                .then((json) => {
                    setProduct(json.data);   
                    setDatTable(json.data);   
                //   console.log("get users:", json.data);    
        
            })  
        } catch (err) {
            toast.error("NO accounts data to fetch,  " + err ) ;
        }
    }

    const loadDataModule = async () => {
        try {
            // const response2 = await axios.get(dbServerHost + "/users/getModule/: where systemscode = " + gSystemCode + " order by modules");
            await fetch(dbServerHostJava + "/api/account/modules/list", {                
                method: 'GET',
                headers: GetMyHeaders(gAccessToken),
            })  
                .then((response) => response.json() )
                .then((json) => {
                    // console.log("get module:", json.data);    
                    if (json.status===200) {
                        //  console.log("old aray",datModule)
                         json.data.forEach(function(e){
                            if (typeof e === "object" ){
                              e["selected"] = false
                            }
                            if (e.selected === true ){
                                e.selected = false
                            }

                         });
                         setModule(json.data);
                        //  console.log("new aray",datModule)
                    } else {
                        setModule({self:0, moduleId:'0', modules:'not found!'});            

                    }
                    unCheckBox("checkboxModule");
            })  
        } catch (err) {
            // alert("NO module data to display,  " + err ) 
            setModule({self:0, moduleId:'0', modules:'server error!'});            
            toast.error("NO module data to fetch, " + err ) ;
        }
    }

    const loadDataAccountDetail = async (tAccountCode) => {
        // console.log('tAccountCode: ',tAccountCode)
        try {
            // const response3 = await axios.get(dbServerHost + "/users/getAccountDetail/: where usercode = " + tAccountCode + " order by modules");
            await fetch(dbServerHostJava + "/api/account/details/search/" + tAccountCode, {                
                method: 'GET',
                headers: GetMyHeaders(gAccessToken),
            })  
                .then((response) => response.json() )
                .then((json) => {
                    // console.log("get account detail:", json);            
                    // console.log("get account detail2:", json.data);            
                    if (json.status===200) {
                        setAccountD(json.data);
                    } else {
                        setAccountD({self:0, enpno:'0', moduleId:0, modules:'not found!'});            
                    }
                    
            })  
            
        } catch (err) {
            // alert("NO account details data to display,  " + err ) 
            setAccountD({self:0, enpno:'0', moduleId:0, modules:'server error'});
            toast.error("NO account detail data to fetch, " + err ) ;
        }
    }


    const handleModuleSave = async () => {
        // done 09/18/2023
        let optionBody = {
            self: isAddEditModule ? 0 : inputModuleState.self,
            moduleNo: inputModuleState.moduleNo,
            modules: inputModuleState.modules,
            systemsCode: inputModuleState.systemsCode,
            // enpno: inputModuleState.empno,
        }
        // console.log('optionBody:',optionBody);
        if (isAddEditModule===true) {
            try {
                await fetch(dbServerHostJava + "/api/account/modules/create", {
                method: 'POST',
                headers: GetMyHeaders(gAccessToken),
                body: JSON.stringify(optionBody)
            }).then((response) => {
                response.json().then((json) => {
                // console.log('modules add data:',json.data);
                 
                if (Number(response.status)===200) {
                    toast.success("Successfully Created... ")
                    setIsShowModule(false);
                    loadDataModule();
                } else {    
                    toast.success("Unsuccessfully Insert: " + json.error + ","  + json.message )         
                    
                }
                
            })    
            }).catch(Error => {
                // console.log("Test: ",Error)
                alert("catch Error: " + Error )             
            })
                // loadDataAccountDetail(AccountCode);
                // return true;
            } catch (error) {
                console.error("Error:", error);
                // alert("Unsuccessfully Insert " + error ) 
                toast.error("Unsuccessfully Insert: " +  error)
            }
        } else {
            // edit/update
            try {
                await fetch(dbServerHostJava + "/api/account/modules/update", {
                method: 'PUT',
                headers: GetMyHeaders(gAccessToken),
                body: JSON.stringify(optionBody)
            }).then((response) => {
                response.json().then((json) => {
                console.log('modules updatedata:',json.data);
                console.log(json.status);
                if (Number(response.status)===200) {
                    toast.success("Successfully update... ")
                    setIsShowModule(false);
                    loadDataModule();
                } else {    
                    toast.success("Unsuccessfully update: " + json.error + ","  + json.message )         
                    // alert("Unsuccessfully update: " + json.errors + ","  + json.message )  
                }
                
            })    
            }).catch(Error => {
                // console.log("Test: ",Error)
                alert("catch Error: " + Error )             
            })
                loadDataAccountDetail(AccountCode);
                return true;
            } catch (error) {
                console.error("Error:", error);
                // alert("Unsuccessfully Insert " + error ) 
                toast.error("Unsuccessfully Insert: " +  error)
            }

        }    
    }

    //   add account details click arrow right auto save
    const handleRolesAdd = async (dtRead) => {
        //  from modules to account detail individual add roles
        // alert("mod no.: "+ dtRead.moduleNo);
        // alert("modules: "+ dtRead.modules);
        //  alert("account: "+ AccountCode)
        // alert("account: "+ AccountCode)
        
        if (datAccountD.length >0 ) {
            let copyState = [...datAccountD];
            const exists = copyState.find((p) => p.moduleId === Number(dtRead.moduleNo));
            if (exists) {
                alert(" Duplicate Roles, \n Module Code: " + dtRead.moduleNo + " with \n modules: " + dtRead.modules) ;
                return false;
            } 
        }
        
        let optionBody = [{
            appendData: 0, 
            modifyData: 0, 
            deleteData: 0, 
            printData: 0, 
            finalData: 0, 
            postData: 0, 
            processData: 0,
            approvedData: 0,
            moduleId: dtRead.moduleNo,
            modules: dtRead.modules,
            systemsCode: dtRead.systemsCode,
        }]
        // console.log("account: ", AccountCode);
         console.log('optionBody:',optionBody);

        try {
            // await fetch(dbServerHost + "/users/postRolesAccountDetail", {                
            await fetch(dbServerHostJava + "/api/account/details/create/" + AccountCode, {
            method: 'POST',
            headers: GetMyHeaders(gAccessToken),
            body: JSON.stringify(optionBody)
        }).then((response) => {
            response.json().then((json) => {
            if (Number(response.status)===200) {
                toast.success("Successfully Created... ")
                // loadDataAccountDetail(AccountCode);
            } else {    
                toast.success("Unsuccessfully Insert: " + <json className="errors"></json> + ","  + json.message )         
                alert("Unsuccessfully Insert: " + json.error + ","  + json.message )  
            }
            
        })    
        }).catch(Error => {
            // console.log("Test: ",Error)
            alert("catch Error: " + Error )             
        })
            loadDataAccountDetail(AccountCode);
            return true;
        } catch (error) {
            console.error("Error:", error);
            alert("Unsuccessfully Insert " + error ) 
            toast.error("Unsuccessfully Insert: " +  error)
        }
    }

    const handleAddRolesAll= async () => {
        // alert("add roles all or selected, not done")
        // let optionBody = []
        let arrResults=[];
        // console.log("array datModule: ",datModule)
        datModule.forEach(element => {
            // alert('element: ' + element.moduleNo)
            if (element.selected===true ) {
                let lUpdate=true;
                if (datAccountD.length>0){
                    let copyState = [...datAccountD];
                    const exists = copyState.find((p) => p.moduleId === Number(element.moduleNo));
                    if (exists) {
                       lUpdate=false;
                    //    alert(lUpdate)
                    }
                }

                if (lUpdate===true) {
                   arrResults.push ({
                        appendData: 0, 
                        modifyData: 0, 
                        deleteData: 0, 
                        printData: 0, 
                        finalData: 0, 
                        postData: 0, 
                        processData: 0,
                        approvedData: 0, 
                        // self: element.self,
                        moduleId: element.moduleNo,
                        modules: element.modules,
                        systemsCode: element.systemsCode
                   })
                //    element.selected=false;
                }
                
            }    
        });
        // console.log("array result: ",arrResults)

        if (arrResults.length >0) {
            // alert(arrResults.length)
            try {
            await fetch(dbServerHostJava + "/api/account/details/create/" + AccountCode, {
                method: 'POST',
                headers: GetMyHeaders(gAccessToken),
                body: JSON.stringify(arrResults)
            }).then((response) => {
                response.json().then((json) => {
                if (Number(response.status)===200) {
                    toast.success("Successfully Created... ")
                    // clear selected to false
                    // datModule.forEach(element => {
                    //      element.selected=false;
                    // });
                    loadDataModule();
                } else {    
                    toast.success("Unsuccessfully Insert: " + json.error + ","  + json.message )         
                }
                
            })    
            }).catch(Error => {
                // console.log("Test: ",Error)
                alert("catch Error: " + Error )             
            })
                loadDataAccountDetail(AccountCode);
                return true;
            } catch (error) {
                console.error("Error:", error);
                alert("Unsuccessfully Insert " + error ) 
                toast.error("Unsuccessfully Insert: " +  error)
            }
        } else {
            toast.error("No modules selected or already exist!")
        }
    }



    const handleApplyAccountDetail = async () => {
        // done 09/18/2023 save detail roles
        //    console.log('appendData:',appendData);
        //    console.log('aaData:',inputDetailState.appendDataData);
        //    console.log('modifyData:',inputDetailState.modifyData);
        //    console.log('deleteData:',inputDetailState.deleteData);
        //    console.log('finalData:',inputDetailState.finalData);
        //    console.log('postData:',inputDetailState.postData);
        //    console.log('processData:',inputDetailState.processData);
        //    console.log('approvedData:',inputDetailState.approvedData);
        //  alert('ttest');
    
        let optionBody = [{
            appendData: CheckBoxBoalen2Num(inputDetailState.appendData), 
            modifyData: CheckBoxBoalen2Num(inputDetailState.modifyData), 
            deleteData: CheckBoxBoalen2Num(inputDetailState.deleteData), 
            printData: CheckBoxBoalen2Num(inputDetailState.printData), 
            finalData: CheckBoxBoalen2Num(inputDetailState.finalData), 
            postData: CheckBoxBoalen2Num(inputDetailState.postData), 
            processData: CheckBoxBoalen2Num(inputDetailState.processData),
            approvedData: CheckBoxBoalen2Num(inputDetailState.approvedData),
            enpno: inputDetailState.empno,
            moduleId: inputDetailState.moduleId,
            modules: inputDetailState.modules,
            systemsCode: inputDetailState.systemsCode,
            self: inputDetailState.self
        }]

         console.log('optionBody:',optionBody);

        try {
            await fetch(dbServerHostJava + "/api/account/details/update", {
            method: 'PUT',
            headers: GetMyHeaders(gAccessToken),
            body: JSON.stringify(optionBody)
        }).then((response) => response.json() )
            .then((json) => {
            // console.log("put results 1:", json);  
            console.log("put results 1:", json);   
            console.log("put results 2:", json.data);   
            
            if (Number(json.status)===200) {    
                setIsShowAccountDetailsUpdate(false);
                toast.success("Successfully Change... ")
            } else {    
                toast.error("Unsuccessfully Change: " + json.error + ","  + json.message )
            }

        })
            const timer = setTimeout(() => {
                // karatValueFocus.current.focus();
            }, 100);
            loadDataAccountDetail(AccountCode);
            return () => clearTimeout(timer);

        } catch (error) {
            console.error("Error:", error);
            alert("Unccessfully Update " + error ) 
        }


    }

    const handleDeleteAccountMain = async (id, contactName) => {
        // alert delete accounts main
        // return false;
        
        if (
            window.confirm("Are you sure that you wanted to delete the User Name: "+ contactName +" with id: " + id +" ?")
            ) {
            // //toast.success("ID: " + id + " host " + dbServerHost);
            //  await axios.delete(dbServerHost + "/users/deleteAccount/"+id);   
            //  toast.success("ID: " + id + ", User: " + contactName + ", Deleted Successfully");
            // // alert("ID: " + id + ", User: " + contactName + ", Deleted Successfully");
            // const timer = setTimeout(() => {
            //     loadData();
            // }, 10);
            // return () => clearTimeout(timer);
             console.log("delete results 1:");  
            // https://techsit.orobusinessgroup.online/site102/api/accounts/delete/{accountId}
            await fetch( dbServerHostJava + "/api/accounts/delete/" + id,{
                method: 'DELETE',
                headers: GetMyHeaders(gAccessToken),
            }).then((response) => response.json() )
                .then((json) => {
                console.log("delete results 2:", json);   
                console.log("delete results 21:", json.status);   
                if (json.status===200) {
                    loadDataAccountMain(); 
                    toast.success("Successfully deleted... ")
                } else {
                //  alert("");
                } 

            }).catch((error) => {
            //console.log(error);
                alert(error.message); 
            //    firstNameFocus.current.focus();
                return false;
            });

        }
    }

    const handleRolesAccountDetailDelete = async (datFile) => {
        //  done 09/18/2023
        // alert('delelete account details roles by id/self')
        if (window.confirm("Are you sure that you wanted to delete the \n Account Detail: "+ datFile.modules +" [" + datFile.moduleId + "]  with recodrd ID#: " + datFile.self +" ?")) {
            try {
                await fetch( dbServerHostJava + "/api/account/details/delete?option=id&value=" + datFile.self, {
                method: 'DELETE',
                headers: GetMyHeaders(gAccessToken)
                }).then(() => {
                    console.log('removed');
                    loadDataAccountDetail(AccountCode);
                    toast.success("ID: " + datFile.self+ ", Description: " + datFile.modules + ", Deleted Successfully");
                }).catch(err => {
                    console.error(err)
                });
                    // const timer = setTimeout(() => {
                    //     // loadDataAccountDetail(AccountCode);
                    // }, 500);
                    // return () => clearTimeout(timer);
            } catch (error) {
                console.error("Error:", error);
                alert("Unsuccessfully Remove " + error ) 
            }
        }
    }

    const handleRolesAccountDetailRemoveAll = async () => {
        // done 09/18/2023
        // alert('delelete account details roles by empno=aall')
        if (window.confirm("Are you sure that you wanted to delete/remove all the \n Account Details with account code: "+ AccountCode +" ?")) {
            try {
                await fetch( dbServerHostJava + "/api/account/details/delete?option=empno&value=" + AccountCode, {
                method: 'DELETE',
                headers: GetMyHeaders(gAccessToken)
                }).then(() => {
                    console.log('removed');
                    loadDataAccountDetail(AccountCode);
                    toast.success("Account Code: " + AccountCode + ", Name: " + {firtsname} + ", Removed Successfully");
                }).catch(err => {
                    console.error(err)
                });
                    // const timer = setTimeout(() => {
                    //     // loadDataAccountDetail(AccountCode);
                    // }, 500);
                    // return () => clearTimeout(timer);
            } catch (error) {
                console.error("Error:", error);
                alert("Unsuccessfully Remove " + error ) 
            }
        }

    }

    const handleModuleDelete = async (dtRead) => {
        // 09/19/2023 done 
        // alert('delete module');
        if ( window.confirm("Are you sure that you wanted to delete the Module: "+ dtRead.modules +" with ID: " + dtRead.self +" ?")) {
            try {
                await fetch( dbServerHostJava + "/api/account/modules/delete/" + Number(dtRead.self), {
                method: 'DELETE',
                headers: GetMyHeaders(gAccessToken)
                }).then(() => {
                    console.log('removed');
                    loadDataModule();
                    toast.success("Module ID: " + dtRead.self + ", Description: " + dtRead.modules + ", Removed Successfully");
                }).catch(err => {
                    console.error(err)
                });
                    
            } catch (error) {
                console.error("Error:", error);
                alert("Unsuccessfully Remove " + error ) 
            }
        }
    }

    

        


// ---View---

    function showModalAddEdit() {
        return(
            <div>
                <Modal show={show} onHide={handleClose}>
                
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Add New User 
                        </Modal.Title> 
                    </Modal.Header>
                    <Modal.Body>
                        {/* <AddForm nModal="1" /> */}
                        {/* <AddForm id="Admin" /> */}
                    <EditForm datUsers={datArray} />
                    </Modal.Body>
                    {/*< Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                                Cancel </Button> 
                    </Modal.Footer>	 */}		
                    
                </Modal>

                <Modal show={editShow} onHide={handleEditClose}>
                    <Modal.Header closeButton>
                            <Modal.Title>
                            Edit User ({datUsers.self})
                        </Modal.Title> 
                    </Modal.Header>
                    <Modal.Body>
                        {/* <EditForm id={product.idkey} /> */}
                        <EditForm datUsers={datUsers} /> 
                            {/* <EditForm id={tID} />  */}
                    </Modal.Body>
                    {/* <Modal.Footer>
                        <Button variant="secondary" onClick={handleEditClose}>
                                Cancel </Button> 
                    </Modal.Footer>			 */}
                </Modal>
                
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

                            // <li style={{marginLeft: "5px"}} className={"page-item ${currentPage === n ? 'active' : ''}"} key={i}>
                            // <li style={{marginLeft: "5px"}} className='page-item'>
                                <label className="page-link" onClick={()=> changeCPage(n)} > {n}</label>
                            // </li>
                        ))
                    }

                    <li style={{marginLeft: "5px"}} className="page-item">
                        <label className="page-link"
                        onClick={nextPage}>Next</label>
                    </li>

                    <li style={{marginTop: "5px",marginLeft: "25px", color: 'blue' }} className="page-item">
                        <label> CurPage: {currentPage} </label>
                        <label style={{marginLeft:'12px'}}> Record(s): {product.length}</label>
                    </li>
                </ul>
            </nav>
        )          
    }

    function popupShowRoles() {
        return (
            
            // <div style = {popupBox}>
            <div className='chrich-PopupShield'>     
              <div className='chrich-Container' style ={boxStyle}>
                  <IconButton className='windowclose-button' onClick={() => togglePopupClose('Roles-detail-view-table')}><CloseIcon /></IconButton>  
               {/* <div style ={boxStyle}> */}
                 {/* <span style ={closeIcon} onClick={togglePopup}>x</span> */}
                 <h3 style={{ width: "100%", marginTop: "00px", textAlign: 'center', color: 'brown'  }} > Update roles of {firtsname} (ID: {AccountCode}) </h3>
                  
                  <label style={{backgroundColor: 'darkgray', color:'black', width:'320px', float:'left', fontWeight:'bold' }} >MODULES</label>
                  <label style={{backgroundColor: 'darkblue', width:'340px', color:'white', float:'right', fontWeight:'bold'}} >ENTRY ACCESS ROLES</label>

                   {/* <br></br>
                  <label style={{backgroundColor: 'green', width:'170px', color:'white', marginLeft:'.5px', float:'left' }} >Sel. Description</label>
                  <label style={{backgroundColor: 'green', width:'112px', color:'white' }}>Code</label>
                  
                  <label style={{backgroundColor: 'green', width:'200px', color:'white', marginLeft:'17px' }} >Description</label>
                  <label style={{backgroundColor: 'green', width:'70px', color:'white' }}>Code</label> */}
                  <br></br>
    
                  <div style ={boxStyleModule}>
                        {/* <table className="styled-table" style={{marginLeft: '0px' }}> */}
                        <table className="styled-table" style={{marginLeft: '0px',marginTop: '0px', padding:'00 00 00 00', fontSize: '12px'  }}>   
                            <thead>
                                <tr>
                                    <th style={{textAlign: "left", width: "10px" }}>Tag</th>
                                    <th style={{textAlign: "left", width: "270px"}}>Description</th>
                                    <th style={{textAlign: "left", width: "40px"}}>Code</th>
                                    <th style={{textAlign: "center", width: "70px"}}>Action</th>
                                </tr>
                            </thead>    
                            
                            <tbody>
                                { datModule.length >0 && datModule.map((modules, index) => (
                                    <tr key={ modules.idkey } onDoubleClick={() => handleRolesAdd(modules)}>
                                        {/* <td style={{textAlign: "center", width:'40px' }}> */}
                                        <th scope="row">
                                            <input 
                                                style={{marginLeft: '0px',marginRight: '0px' }}
                                                type='checkbox' 
                                                className="checkboxModule"
                                                value={modules.selected || false}
                                                onChange ={(e) => handleChangeSelectModule(e,modules)}
                                            /> 
                                        {/* </td> */}
                                        </th>

                                        <td>{ modules.modules }</td>
                                        <td>{ modules.moduleNo }</td>
                                        <td>
                                            <FaArrowCircleRight className='image-button' onClick={() => handleRolesAdd(modules)}/>  
                                            <AiFillEdit className='image-button' style={{ marginLeft: '5px', color: 'darkblue'}} onClick={() => handleEditModule(modules)}/>   
                                            <RiDeleteBin2Fill className='image-button' style={{marginLeft:'5px', color: 'red'}} onClick={() => handleModuleDelete(modules)}/>  
                                            
                                        </td>
                                    </tr>
                                )) }
                                
                            </tbody>
                        </table> 
                  </div>        
                  <div style ={boxStyleAccountDetail}>
                        <table className="styled-table" style={{marginLeft: '0px',marginTop: '0px', padding:'00 00 00 00', fontSize: '12px'  }}>   
                            <thead>
                            <tr>
                                {/* <th style={{textAlign: "left", width: "10px" }}>Tag</th> */}
                                <th style={{textAlign: "left", width: "290px"}}>Description</th>
                                <th style={{textAlign: "left", width: "50px"}}>Code</th>
                                <th style={{textAlign: "center", width: "50px"}}>Action</th>
                                </tr>
                            </thead>    
                            <tbody>
                                { datAccountD.length >0 && datAccountD.map((accountD, index3) => (
                                    <tr key={ index3 } onDoubleClick={() => handleRolesAccountDetailEdit(accountD)}>
                                        {/* <td style={{textAlign: "left" }}>
                                            <input style={{marginLeft: '0px',marginRight: '0px' }}
                                                type='checkbox' 
                                                // checked={modules}
                                                readOnly={true}
                                            /> 
                                        </td> */}
                                        <td>{ accountD.modules }</td>
                                        <td>{ accountD.moduleId }</td>
                                         <td>
                                            <AiFillEdit className='image-button' style={{ marginLeft: '0px', color: 'darkblue'}} onClick={() => handleRolesAccountDetailEdit(accountD)}/>  
                                            <RiDeleteBin2Fill className='image-button' style={{ marginLeft: '5px',color: 'brown'}} onClick={() => handleRolesAccountDetailDelete(accountD)}/>  
                                        </td>
                                    </tr>
    
                                )) }
                                
                            </tbody>
                        </table>         
                  </div>        
                  
                  <button className="btn-neo1-primary" style={{fontSize: '12px', marginLeft: '0px', float: 'left', height: '30px', marginTop: '5px'  }} onClick={() => handleAddModule()} >New Module </button>
                  <button className="btn-neo1-primary" style={{fontSize: '12px', marginLeft: '10px', float: 'left', height: '30px', marginTop: '5px'  }} onClick={() => handleAddRolesAll()} >Add selected to roles</button>
                  <button className="btn-neo1-edit" style={{fontSize: '12px', marginLeft: '35px', float: 'left' , height: '30px', marginTop: '5px' }} onClick={() => handleModuleRefresh()} >Refresh</button>
                  
                  <button className="btn-neo1-danger" style={{fontSize: '12px', marginLeft: '25px', float: 'left', height: '30px', marginTop: '5px' }} onClick={() => handleRolesAccountDetailRemoveAll()} >Remove all</button>
                  <button className="btn-neo1-edit" style={{fontSize: '12px', marginRight: '20px', float: 'right', height: '30px', marginTop: '5px'  }} onClick={() => handleRolesAccountDetailRefresh()} >Refresh</button>
               </div>
             </div>
        )
    }

    function popupShowAddEditModule() {
        return (
            <div className='chrich-PopupShield'>     
                <div className='chrich-Container' style={{width:'350px',height:'350px',marginTop:'180px'}}>
                    {/* <FaWindowClose className='windowclose-button' onClick={() => togglePopupClose('Roles-module-AddEdit')}/>   */}
                    <IconButton className='windowclose-button' onClick={() => togglePopupClose('Roles-module-AddEdit')}><CloseIcon /></IconButton>  
                    <h5 style={{ width: "100%", marginTop: "5px", textAlign: 'center', color: 'brown',fontSize: '18px' }} >{isAddEditModule ? 'Add':'Edit' } Modules</h5>
                    <br></br>
                    <FloatingLabel className="mb-2" style={{marginRight:'18px' }} label="Systems">
                        <Form.Select  
                            name="systems"
                            ref={systemsRef}
                            value={inputModuleState.systemsCode || ""} 
                            onKeyDown={handleEnter}
                            onFocus={handleFocus}
                            onChange={handleChangeSystems}
                            // onClick={handleOnClickGroup}
                            disabled={isAddEditModule ? false:true}
                            >
                            {optSystems.map(option => (
                                <option key={option.value} value={option.value}>
                                {option.text}
                                </option>
                            ))}
                        </Form.Select>
                    </FloatingLabel>
                    <FloatingLabel className="mb-2" style={{marginRight:'18px' }} label="Module Code">
                        <Form.Control
                            // style={{height:'52px' }}
                            type="text"
                            name="moduleNo"
                            require
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                                }
                            }}
                            onKeyDown={handleEnter}
                            onChange ={(e) => handleInputChange(e)}
                            onFocus={handleFocus}
                            value={inputModuleState.moduleNo || ""}
                            ref={moduleNoRef}
                            maxLength={6}
                            disabled={isAddEditModule ? false:true}
                        />
                    </FloatingLabel>
                    <FloatingLabel className="mb-2" label="Module Description" style={{marginTop: '0px', marginRight:'18px' }}>
                        <Form.Control
                            type="text"
                            name="moduleDesc"
                            require
                            onKeyDown={handleEnter}
                            onChange ={(e) => handleInputChange(e)}
                            onMouseEnter={(e) =>  handleChangeCase(e)}
                            onFocus={handleFocus}
                            value={inputModuleState.modules || ""}
                            ref={moduleDescRef}
                            maxLength={45}
                        />
                    </FloatingLabel>

                     <br></br>
                    <button className="btn-neo1-success" style={{fontSize: '13px', marginLeft: '0px', width:'100px'  }} onClick={() => handleModuleSave()}>Save</button> 
                    <button className="btn-neo1-danger" style={{fontSize: '13px', marginLeft: '15px', width:'100px' }} onClick={() => togglePopupClose('Roles-module-AddEdit')}>Cancel</button>     
                </div>
            </div>  
        )
         
    }


    function popupShowAccountDetailsUpdate() {
        return (
            <div className='chrich-PopupShield'>     
              <div className='chrich-Container' style={{width:'330px',height:'375px',marginTop:'180px'}}>
                  <IconButton className='windowclose-button' onClick={() => togglePopupClose('Roles-detail-update')}><CloseIcon /></IconButton>  
                  {/* <h5 style={{ width: "100%", marginTop: "0px", textAlign: 'center', color: 'blue'  }} >Select Rigths Details </h5> */}
                  <Form.Label style={{ marginTop: '10px', color: 'brown', fontSize: '18px'  }} >Select Rights Detail </Form.Label>
                  <br></br>
                  <br></br>
                  <div style={{textAlign:'left'}}>  
                    <Form.Check
                        label="Add/Append New Record"
                        type='checkbox' 
                        name='appendData'
                        defaultChecked={inputDetailState.appendData}
                        // Checked={inputDetailState.appendData}
                        // value={inputDetailState.appendData}
                        ref={appendRef}
                        onKeyDown={handleEnter}
                        onChange ={() =>  setInputDetailState(inputDetailState => ({...inputDetailState, appendData: !inputDetailState.appendData}))}	
                        //  onChange ={() =>  setAppendData(!appendData)}	
                        //  onChange ={(e) => handleInputChange(e)}
                        onFocus={handleFocus}
                    />
                    <Form.Check
                        label="Edit/Modify Data"
                        type='checkbox' 
                        name='modifyData'
                        defaultChecked={inputDetailState.modifyData}
                        // Checked={inputDetailState.modifyData}
                        // value={inputDetailState.modifyData}
                        ref={modifyRef}
                        onKeyDown={handleEnter}
                        onChange ={() =>  setInputDetailState(inputDetailState => ({...inputDetailState, modifyData: !inputDetailState.modifyData}))}	
                        //  onChange ={() =>  setInputDetailState(!inputDetailState.modifyData)}	
                        // onChange ={(e) => handleInputChange(e)}
                        onFocus={handleFocus}
                    />     
                    <Form.Check
                        label="Delete/Erase Data"
                        type='checkbox' 
                        name='deleteData'
                        defaultChecked={inputDetailState.deleteData}
                        ref={deleteRef}
                        onKeyDown={handleEnter}
                         onChange ={() =>  setInputDetailState(inputDetailState => ({...inputDetailState,  deleteData: !inputDetailState.deleteData}))}	
                        //  onChange ={(e) => handleInputChange(e)}
                        onFocus={handleFocus}
                    />     
                    <Form.Check
                        label="Print Document"
                        type='checkbox' 
                        name='printData'
                        defaultChecked={inputDetailState.printData}
                        ref={printRef}
                        onKeyDown={handleEnter}
                        onChange ={() =>  setInputDetailState(inputDetailState => ({...inputDetailState, printData: !inputDetailState.printData}))}	
                        onFocus={handleFocus}
                    />     
                    <Form.Check
                        label="Final Data"
                        type='checkbox' 
                        name='finalData'
                        defaultChecked={inputDetailState.finalData}
                        ref={finalRef}
                        onKeyDown={handleEnter}
                        onChange ={() =>  setInputDetailState(inputDetailState => ({...inputDetailState, finalData: !inputDetailState.finalData}))}	
                        onFocus={handleFocus}
                    />     
                    <Form.Check
                        label="Post Data"
                        type='checkbox' 
                        name='postData'
                        defaultChecked={inputDetailState.postData}
                        ref={postRef}
                        onKeyDown={handleEnter}
                        onChange ={() =>  setInputDetailState(inputDetailState => ({...inputDetailState, postData: !inputDetailState.postData}))}	
                        onFocus={handleFocus}
                    />     
                    <Form.Check
                        label="Process Data"
                        type='checkbox' 
                        name='processData'
                        defaultChecked={inputDetailState.processData}
                        ref={processRef}
                        onKeyDown={handleEnter}
                        onChange ={() =>  setInputDetailState(inputDetailState => ({...inputDetailState, processData: !inputDetailState.processData}))}	
                        onFocus={handleFocus}
                    />     
                    <Form.Check
                        label="Approve Data"
                        type='checkbox' 
                        name='approvedData'
                        defaultChecked={inputDetailState.approvedData}
                        ref={approveRef}
                        onKeyDown={handleEnter}
                        onChange ={() =>  setInputDetailState(inputDetailState => ({...inputDetailState, approvedData: !inputDetailState.approvedData}))}	
                        onFocus={handleFocus}
                    />
                    <br></br>
                    <div style={{textAlign: 'center', width: '100%'}}>
                        <button className="btn-neo1-success" style={{fontSize: '13px', marginLeft: '0px', width:'78px'  }} onClick={() => handleApplyAccountDetail()}>Apply</button> 
                        <button className="btn-neo1-primary" style={{fontSize: '13px', marginLeft: '10px', width:'100px' }} onClick={() => handleSelectAccountDetail()}>{isSellectAll ? 'Select all' :'Unselect all'}</button>
                        <button className="btn-neo1-danger" style={{fontSize: '13px', marginLeft: '10px', width:'78px' }} onClick={() => togglePopupClose('Roles-detail-update')}>Cancel</button>     
                    </div>
                </div>
              </div>
           </div>  
       )
    }


    // processing
    return (
        <>
            <div className='Box-Center' style={{width: isScreenWidth ? gScreenWidth : '700px', height: '600px', marginTop: '0px' }} >
                {/* <h3 style={myStyles.boxHeadTitle}>User List</h3> */}
                <h2 className='chrich-HeadTitle'>User List
                    <IconButton className='windowclose-button' onClick={() => handleWindowClose()}><CloseIcon /></IconButton>  
                </h2> 

                <div className='search-container'>
                    <input  
                        className='chrich-custom-input'
                        style={{width:'200px'}}
                        type="text"
                        placeholder="Search"
                        value={searchPhrase}
                        onChange={search}
                    />
                </div>

                <div style={{fontSize: '16px', marginTop: '0px', marginRight: '10px', float: 'right', display:'inline-flex' }}>
                    {/* <Dropdown className='chrich-dropdown1' style={{ width: '80px', display: 'inline-block'}}>
                        <Dropdown.Toggle className='chrich-dropdown-toggle'>
                        <span className='chrich-dropdown-toggle-span' style={{fontSize:'13px'}}>Filter</span>
                        <span style={{marginRight:'5px' }}></span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className='chrich-dropdown-menu1'>
                            <Dropdown.Item href="#" onClick={() => FilteringBy('Dashboard')}>
                                <span className='chrich-dropdown-toggle-span'>Filtering by Dashboard</span>
                            </Dropdown.Item>
                            <Dropdown.Item href="#" onClick={() => FilteringBy('Jewelry')}>
                                <span className='chrich-dropdown-toggle-span'>Filtering by Jewelry</span>
                            </Dropdown.Item>
                            <Dropdown.Item href="#" onClick={() => FilteringBy('Telecom')}>
                            <span className='chrich-dropdown-toggle-span'>Filtering by Telecom</span>
                            </Dropdown.Item>
                            <Dropdown.Item href="#" onClick={() => FilteringBy('DS/Grocery')}>
                            <span className='chrich-dropdown-toggle-span'>Filtering by DS/Grocery</span>
                            </Dropdown.Item>
                            <Dropdown.Item href="#" onClick={() => FilteringBy('Payroll')}>
                            <span className='chrich-dropdown-toggle-span'>Filtering by Payroll</span>
                            </Dropdown.Item>
                            <Dropdown.Item href="#" onClick={() => FilteringBy('Settings')}>
                            <span className='chrich-dropdown-toggle-span'>Filtering by Settings</span>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown> */}
                    <Button 
                        aria-controls="simple-menu" 
                        aria-haspopup="true" 
                        // sx={{ marginLeft: 1, height: '30px', width: '100px', marginButton: '5px', marginTop: '5px' }}  // Adjust the height and 
                        onClick={handleClick} 
                        variant="contained"
                        sx={{ 
                            marginButton: '6px', 
                            marginTop: '4px',
                            height: '30px', 
                            width: '100px',
                            display: 'flex', 
                            alignItems: 'center',
                            transition: 'transform 0.3s ease-in-out',
                            '&:hover': {
                              transform: 'scale(1.05)',
                            },
                            '& .arrow-dropdown': {
                              height: '30px'
                            }
                          }}
                    >
                        Filter
                        <IconButton
                            sx={{ 
                                marginLeft: 2, 
                                marginRight: -2, 
                                // height: '50px' 
                            }}
                        >
                            <ArrowDropDownIcon />
                        </IconButton>    
                    </Button>
                    


                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleCloseMenuitem}
                    >
                        <MenuItem onClick={() => FilteringBy('Dashboard')}>Filtering by Dashboard</MenuItem>
                        <MenuItem onClick={() => FilteringBy('Jewelry')}>Filtering by Jewelry</MenuItem>
                        <MenuItem onClick={() => FilteringBy('Telecom')}>Filtering by Telecom</MenuItem>
                        <MenuItem onClick={() => FilteringBy('DS/Grocery')}>Filtering by DS/Grocery</MenuItem>
                        <MenuItem onClick={() => FilteringBy('Payroll')}>Filtering by Payroll</MenuItem>
                        <MenuItem onClick={() => FilteringBy('Settings')}>Filtering by Settings</MenuItem>
                    </Menu>
                    <button className="btn-neo1 btn-neo1-add" style={{fontSize: '13px', marginLeft: '10px' }} onClick={() => handleShow()}>New User</button> 
                    <button className="btn-neo1 btn-neo1-edit" style={{fontSize: '13px', marginLeft: '10px' }} onClick={() => handleRefdresh()}>Refresh</button>
                    <button className="btn-neo1 btn-neo1-dark" style={{fontSize: '13px', marginLeft: '10px' }} onClick={() => handleHome()}>Home</button>
                </div>

                {/* <label style={{marginLeft: '5px',marginRight: '10px'}} >Filter </label>
                <select value={selBranch} 
                        onChange={handleChangeDepartment}
                        disabled={gAssignBranch ? true: false}>
                {optDepartment.map(option => (
                    <option key={option.value} value={option.value}>
                    {option.text}
                    </option>
                ))}
                </select> */}

                <div className='chrich-Container' style={{marginLeft:'0px', marginTop:'0px',width:'100%', height: '75%', padding: '0px 0px 0px 0px' }}> 
                    <table className="styled-table" >
                    {/* <Table bordered hover > */}
                        <thead>
                            <tr>
                                <th style={{textAlign: "center"}}>No.</th>
                                {/* <th style={{textAlign: "left", width: "80px" }}>User Name</th> */}
                                {/* <th style={{textAlign: "left", width: "140px"}}>First Name</th> */}
                                {/* <th style={{textAlign: "left", width: "120px"}}>Last Name</th> */}

                                <th style={{textAlign: "left", width: "80px" }} onClick={sortByCode}>
                                    <span style={{ marginRight: 3 }}>User Name</span>
                                    {sorted.sorted === "code" ? renderArrow() : null}
                                </th>
                                <th style={{textAlign: "left", width: "220px" }} onClick={sortByFName}>
                                    <span style={{ marginRight: 3 }}>First Name</span>
                                    {sorted.sorted === "fname"
                                        ? renderArrow()
                                        : null}
                                </th>
                                <th style={{textAlign: "left", width: "220px" }} onClick={sortByLName}>
                                    <span style={{ marginRight: 3 }}>Last Name</span>
                                    {sorted.sorted === "lname"
                                        ? renderArrow()
                                        : null}
                                </th>
                                <th style={{textAlign: "left", width: "140px"}}>Email Address</th>
                                <th style={{textAlign: "left", width: "70px"}}>Contacts</th>
                                {/* <th style={{textAlign: "left", width: "60px"}}>Register</th> */}
                                <th style={{textAlign: "left", width: "155px"}}>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            { ReCords.length > 0 && ReCords.map((product, index) => (
                                <tr key={ product.idkey } onDoubleClick={() => alert(product.login_name)}>
                                    <td>{ index + 1 }</td>
                                    <td>{ product.username }</td>
                                    <td>{ product.firstName }</td>
                                    <td>{ product.lastName }</td>
                                    <td>{ product.email }</td>
                                    <td>{ product.contactNumber } </td>
                                    {/* <td>{ product.register } </td> */}
                                    <td>
                                        {/* <Link to={"/useredit/"+product.idkey}> 
                                            <button className="btn btn-edit">Edit</button>
                                        </Link>  */}
                                        
                                        {/* <button className="btn-neo1 btn-neo1-edit" style={{fontSize: '11px', marginLeft: '0rem' }} onClick={() => handleEditShow(product)}>Edit</button>  */}
                                        {/* <button className="chrich-btn chrich-btn-edit" onClick={() => handleEditShow(product)}>Edit</button>  */}
                                        
                                        {/* <button onClick={ () => handleDelete(product.self, product.username) } className="btn-neo1 btn-neo1-delete" style={{fontSize: '11px', marginLeft: '.2rem' }}>Del</button> */}
                                        {/* <button className="btn-neo1 btn-neo1-view" style={{fontSize: '11px', marginLeft: '.2rem' }} onClick={() => handleRolesShow(product)} >Roles</button> */}
                                        {/* style={{ marginLeft: '1rem'}} */}
                                        <AiFillEdit className='action-button' onClick={() => handleEditShow(product)}/>  
                                        <AiFillFolder className='action-button' onClick={() => handleRolesShow(product)}/>  
                                        <AiFillDelete className='action-button' style={{ color: 'darkred'}} onClick={() => handleDeleteAccountMain(product.self, product.username) }/>  
                                    </td>
                                    
                                </tr>
                            )) }
                            
                        </tbody>
                    </table>
                </div>
                {showPaginationNav()}
            </div>
            
            {showModalAddEdit()}
            {isOpen ? (popupShowRoles()) : ''}
            {isShowModule ? (popupShowAddEditModule()) : ''}
            {isShowAccountDetailsUpdate ? (popupShowAccountDetailsUpdate()) : ''}
            
        </> 
        
    )
    

}
 
export default Userlist
