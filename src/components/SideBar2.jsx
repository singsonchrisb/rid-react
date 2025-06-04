// <i className="bi bi-credit-card"></i>
{/* <i className="bi bi-envelope"></i> */}
{/* <i className="bi bi-credit-star"></i> */}
{/* <i className="bi bi-credit-bell"></i> */}
{/* <i className="bi bi-credit-cart"></i> */}
{/* <i className="bi bi-credit-heart"></i> */}
{/* <i className="bi bi-credit-person"></i> */}

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

import { IoPerson, IoPricetag, IoHome, IoLogOut,IoPrint, IoBriefcaseOutline, 
    IoPrintSharp,IoShareSocialSharp,IoCash,IoTimeSharp, IoTicketSharp, IoCashOutline, IoBoatSharp, IoBoat, IoBoatOutline, IoLogOutOutline, IoPricetagOutline, IoTimeOutline, IoFilmOutline, IoRefreshCircleOutline, IoRefreshOutline, IoHomeOutline, IoBodyOutline, IoPersonOutline, IoKeyOutline, IoDocumentOutline, IoDocumentLockOutline, IoDocumentAttachOutline  } from "react-icons/io5";
// import { AiFillPrinter, AiOutlineBarcode } from 'react-icons/ai';

// import { NavLink } from 'react-router-dom';
// import axios from "axios";
// import {IsMobile} from '../components/MyScreen';
// import { IsMobile } from "./IsMobile";
// import {isMobile} from 'react-device-detect';
//  import { ToastContainer } from "react-toastify";

// import { toast } from 'react-toastify';
// import storage  from '../api/firebase.js';
// import { ref, getDownloadURL } from 'firebase/storage'; 


// import imgLogo from "../images/ORO.png";
// import imgUser  from "../images/user.jpg";
import './sideBar.css';
import Header from './Header';
import Footer from './Footer';

import useMediaQuery from "../hooks/useMediaQuery";
// import { decryptPWord } from "../functions/ChrisFunctions";
import useSessionStorage from "../hooks/useSessionStorage ";

import { decryptPWord, delayMe, encryptPWord, MyServerHostJava } from '../functions/ChrisFunctions';
// import { GetAPITokenJava, GetMyHeaders } from '../pages/Methods/GetAPIToken.jsx';

// import { FaCcPaypal, FaPaypal, FaUser, FaUserAlt, FaUserAltSlash, FaUserAstronaut } from 'react-icons/fa';



import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
// import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LockIcon from '@mui/icons-material/Lock';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Person2Outlined, Person3Outlined, PersonRemoveSharp } from '@mui/icons-material';

let dbServerHostJava = MyServerHostJava();

// function SideBar() {
const SideBar =({children}) => {
    let gAccessToken = decryptPWord(sessionStorage.getItem("accessToken"));
    let gUserType = decryptPWord (sessionStorage.getItem('accessType'));
    let loginName = decryptPWord(sessionStorage.getItem("loginName"));

    // alert(loginName)
    let auth =loginName;
    // let AccountCode = sessionStorage.getItem("empno");
    let gAccountType = Number(decryptPWord(sessionStorage.getItem('accountType')));
    let gEmpNo = sessionStorage.getItem('empno');

    let gSettings = Number(decryptPWord(sessionStorage.getItem('setti')));
    // let homeOpen = decryptPWord(sessionStorage.getItem('homeOpen'));
    let gLogIn = decryptPWord(sessionStorage.getItem('login'));
        // gToken= sessionStorage.getItem("accessToken");
    // let gDashboard = decryptPWord(sessionStorage.getItem('dashb'));
    // let gJewelry =Number(decryptPWord(sessionStorage.getItem('jewel')));
    
    // let gPayroll = Number(decryptPWord(sessionStorage.getItem('payro')));
    let gApplicant = 1; 

    let navigate = useNavigate();
    
    const isDesktop = useMediaQuery('(min-width: 480px)');
    
    // const [isOpen, setIsOpen] = useState(false);
    // const toggle = () => setIsOpen (!isOpen);
    // const [auth, setAuth] = useState(var_auth);
    // const [homeOpen, setHomeOpen] = useState(homeGet);

    // const [imageUser, setImageUser] = useState(imgUser);
    const [datTable, setDataTable] = useState([]);

    const [isOpen, setIsOpen] = useState(false);
    const [openSubMenus, setOpenSubMenus] = useState({});
    const sidebarRef = useRef(null);
    
    useEffect(() => {
        let tPath = window.location.pathname.trim();
        if (tPath==='/PrintVirtualBarcode' || tPath==='/admin' || tPath==='/loginForm' ) {
            // by pass
            if(loginName && gUserType!='admin' && tPath==='/admin')  {
               navigate("/")
            }
        } else {
            if(!loginName)  {
               navigate(gUserType==='admin' ? '/admin':"/home")
            } else {
                //navigate(gUserType==='admin' ? '/admin':"/signin")
            }
        }
        // && homeOpen
      }, []);
     useEffect(() => {
        if (gEmpNo !=='' && gLogIn ==='True' && !sessionStorage.getItem("RolesDetail")) {
            //  alert(gEmpNo);
            // loadAccountsDetail(gEmpNo);
        }
        // loadAccountsDetail(gEmpNo);
    }, []);
//     useEffect(() => {
//         loadDataAccountDetail(AccountCode.toUpperCase());
//    }, []);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (window.innerWidth <= 768 && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    // const toggleSubMenu = (event, menu) => {
    //     event.preventDefault();  // Prevent the default anchor click behavior
    //     setOpenSubMenus((prevState) => ({
    //         ...prevState,
    //         [menu]: !prevState[menu],
    //     }));
    // };

    const toggleSubMenu = (event, menuName) => {
        event.preventDefault();
        setOpenSubMenus({
            ...openSubMenus,
            [menuName]: !openSubMenus[menuName]
        });
    };

    const preventDefaultScroll = (event) => {
        event.preventDefault();
    };

    const NavigateLink = (itemPath) => {
        if (!isDesktop) {
            handleToggleSideBar();
        }
        navigate(itemPath);
    };

    const logout = () => {
        // alert('fff');
        // dispatch(LogOut());
        // dispatch(reset());
        sessionStorage.clear();
        sessionStorage.removeItem("loginAuth");
        sessionStorage.removeItem("loginName");
        sessionStorage.removeItem("userName");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("empno");
        sessionStorage.removeItem("accountType");
        // don't clear so will back to regular type login sessionStorage.removeItem("accessType");
        sessionStorage.removeItem("accessToken");
        
        sessionStorage.removeItem("homeOpen");
        sessionStorage.removeItem("login");
        
        // sessionStorage.removeItem("dashb");
        // sessionStorage.removeItem("setti");
        // sessionStorage.removeItem("accessToken");


        window.location.reload();
        navigate(gUserType==='admin' ? '/admin':"/signin");
    };


       

    function PayrollMenu() {
        return(
            <>
            {/* Foton */}
            <li className='sidebar-nav-item'>
                    <a
                        className={`nav-link ${openSubMenus['payroll-nav'] ? '' : 'collapsed'}`}
                        onClick={(event) => toggleSubMenu(event, 'payroll-nav')}
                        href='#'
                    >
                        <i className="bi bi-people"></i>
                        {/* <FaUserAstronaut style={{marginRight: '5px'}}/> */}
                        {/* <FaUserAstronaut/>
                        <FaUserAstronaut style={{marginRight: '5px'}}/> */}
                        
                        <span>Payroll</span>
                        <i className="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul
                        id='payroll-nav'
                        className={`nav-content collapse ${openSubMenus['payroll-nav'] ? 'show' : ''}`}
                    >
                        
                        <li>
                            <a onClick={()=>verifySubNav('/payroll/employeelist','Payroll',6001) } >
                                <i className="bi bi-people"></i>
                                <span>Employee List</span>
                            </a>
                        </li>
                        <li>
                            <a onClick={()=>navigate('/payroll/payslip101') } >
                                <i className="bi bi-people"></i>
                                <span>Show Pay Slip</span>
                            </a>
                        </li>
                        {/* <li>
                            <a href='#' onClick={preventDefaultScroll}>
                                <i className="bi bi-building-check"></i>
                                <span>Purchase Order</span>
                            </a>
                        </li> */}
                        {/* <li>
                            <a
                                className={`nav-link ${openSubMenus['foton-custom-nav'] ? '' : 'collapsed'}`}
                                onClick={(event) => toggleSubMenu(event, 'foton-custom-nav')}
                                href='#'
                            >
                                <i className="bi bi-box"></i>
                                <span>Physical Inventory</span>
                                <i className="bi bi-chevron-down ms-auto"></i>
                            </a>
                            <ul
                                id='foton-custom-nav'
                                className={`nav-content collapse ${openSubMenus['foton-custom-nav'] ? 'show' : ''}`}
                            >
                                <li>
                                    <a href='#' onClick={preventDefaultScroll}>
                                        <i className="bi bi-box"></i>
                                        <span>Physical Inventory</span>
                                    </a>
                                </li>
                                <li>
                                    <a href='#' onClick={preventDefaultScroll}>
                                        <i className="bi bi-bag"></i>
                                        <span>Set Inventory # of days</span>
                                    </a>
                                </li>
                            </ul>
                        </li> */}
                    </ul>
                </li>
            </>
        );
    }

    function ApplicantAdminMenu() {
        return(
            <>
            
            <li className='sidebar-nav-item'>
                    <a
                        className={`nav-link ${openSubMenus['foton-nav'] ? '' : 'collapsed'}`}
                        onClick={(event) => toggleSubMenu(event, 'foton-nav')}
                        href='#'
                    >
                        <i className="bi bi-people"></i>
                        <span>RID Applicants</span>
                        <i className="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul
                        id='foton-nav'
                        className={`nav-content collapse ${openSubMenus['foton-nav'] ? 'show' : ''}`}
                    >
                        <button onClick={() => NavigateLink("/")} className='sidebar-main-btn'>
                          <IoDocumentAttachOutline /> <span className='sidebar-sub-span'>Applicants List</span>
                        </button> 
                        <button onClick={() => NavigateLink("/")} className='sidebar-main-btn'>
                            <IoDocumentOutline /> <span className='sidebar-sub-span'>Releasing Clearance</span>
                        </button> 
                        <button onClick={() => NavigateLink("/")} className='sidebar-main-btn'>
                             <IoDocumentLockOutline /> <span className='sidebar-sub-span'>Not yet approve</span>
                        </button> 
                        <button onClick={() => NavigateLink("/")} className='sidebar-main-btn'>
                             <IoDocumentLockOutline /> <span className='sidebar-sub-span'>Appointment List</span>
                        </button> 

                        <button onClick={() => NavigateLink("/ApplicantsTabs")} className='sidebar-main-btn'>
                             <IoDocumentLockOutline /> <span className='sidebar-sub-span'>ApplicantsTabs</span>
                        </button> 

                        

                        
                        {/* <li>
                            <a
                                className={`nav-link ${openSubMenus['foton-custom-nav'] ? '' : 'collapsed'}`}
                                onClick={(event) => toggleSubMenu(event, 'foton-custom-nav')}
                                href='#'
                            >
                                <i className="bi bi-box"></i>
                                <span>Physical Inventory</span>
                                <i className="bi bi-chevron-down ms-auto"></i>
                            </a>
                            <ul
                                id='foton-custom-nav'
                                className={`nav-content collapse ${openSubMenus['foton-custom-nav'] ? 'show' : ''}`}
                            >
                                <li>
                                    <a href='#' onClick={preventDefaultScroll}>
                                        <i className="bi bi-box"></i>
                                        <span>Physical Inventory</span>
                                    </a>
                                </li>
                                <li>
                                    <a href='#' onClick={preventDefaultScroll}>
                                        <i className="bi bi-bag"></i>
                                        <span>Set Inventory # of days</span>
                                    </a>
                                </li>
                                
                            </ul>
                        </li> */}

                    </ul>
                </li>
            </>
        );
    }

    function ApplicantMembersMenu() {
        return(
            <>
            
            <li className='sidebar-nav-item'>
                    <a
                        className={`nav-link ${openSubMenus['foton-nav'] ? '' : 'collapsed'}`}
                        onClick={(event) => toggleSubMenu(event, 'foton-nav')}
                        href='#'
                    >
                        <i className="bi bi-people"></i>
                        <span>RID Clearance</span>
                        <i className="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul
                        id='foton-nav'
                        className={`nav-content collapse ${openSubMenus['foton-nav'] ? 'show' : ''}`}
                    >
                        {/* <button onClick={() => NavigateLink("/")} className='sidebar-main-btn'>
                          <IoDocumentAttachOutline /> <span className='sidebar-sub-span'>Applicants List</span>
                        </button> 
                        <button onClick={() => NavigateLink("/")} className='sidebar-main-btn'>
                            <IoDocumentOutline /> <span className='sidebar-sub-span'>Releasing Clearance</span>
                        </button> 
                        <button onClick={() => NavigateLink("/")} className='sidebar-main-btn'>
                             <IoDocumentLockOutline /> <span className='sidebar-sub-span'>Not yet approve</span>
                        </button>  */}
                        {/* <button onClick={() => NavigateLink("/")} className='sidebar-main-btn'>
                             <IoDocumentLockOutline /> <span className='sidebar-sub-span'>Appointment List</span>
                        </button>  */}

                        <button onClick={() => NavigateLink("/ApplicantsTabs")} className='sidebar-main-btn'>
                             <IoDocumentLockOutline /> <span className='sidebar-sub-span'>Applicantion</span>
                        </button> 
                        { loginName.toLowerCase()==='chris' || loginName.toLowerCase() ==='minette' ?
                          <>
                            <button onClick={() => NavigateLink("/TabForm")} className='sidebar-main-btn'>
                                <IoDocumentLockOutline /> <span className='sidebar-sub-span'>Sample</span>
                            </button> 
                         </>
                         :""
                        }
                        
                        {/* <li>
                            <a
                                className={`nav-link ${openSubMenus['foton-custom-nav'] ? '' : 'collapsed'}`}
                                onClick={(event) => toggleSubMenu(event, 'foton-custom-nav')}
                                href='#'
                            >
                                <i className="bi bi-box"></i>
                                <span>Physical Inventory</span>
                                <i className="bi bi-chevron-down ms-auto"></i>
                            </a>
                            <ul
                                id='foton-custom-nav'
                                className={`nav-content collapse ${openSubMenus['foton-custom-nav'] ? 'show' : ''}`}
                            >
                                <li>
                                    <a href='#' onClick={preventDefaultScroll}>
                                        <i className="bi bi-box"></i>
                                        <span>Physical Inventory</span>
                                    </a>
                                </li>
                                <li>
                                    <a href='#' onClick={preventDefaultScroll}>
                                        <i className="bi bi-bag"></i>
                                        <span>Set Inventory # of days</span>
                                    </a>
                                </li>
                                
                            </ul>
                        </li> */}

                    </ul>
                </li>
            </>
        );
    }

    function SettingsMenu() {
        return(
            <>
            <li className='sidebar-nav-item'>
                    <a
                        className={`nav-link ${openSubMenus['setting-nav'] ? '' : 'collapsed'}`}
                        onClick={(event) => toggleSubMenu(event, 'setting-nav')}
                    >
                        <i className="bi bi-gear"></i>
                        <span>Settings</span>
                        <i className="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul
                        id='setting-nav'
                        className={`nav-content collapse ${openSubMenus['setting-nav'] ? 'show' : ''}`}
                    >
                        
                        {gUserType ==='admin' ? 
                            <>
                                <button onClick={() => NavigateLink("/UserAccounts")} className='sidebar-sub-btn'>
                                    <IoPersonOutline /><span className='sidebar-sub-span'>User Accounts List</span>
                                </button>
                            </>
                             : ""
                        }
                        <button onClick={() => NavigateLink("/UserUpdateAccount")} className='sidebar-sub-btn'>
                            <IoPersonOutline /><span style={{color:'black'}} className='sidebar-sub-span'>Change Profile</span>
                        </button>
                        <button onClick={() => NavigateLink("/UserChangePassword")} className='sidebar-sub-btn'>
                            <IoKeyOutline /><span className='sidebar-sub-span'>Change Password</span>
                        </button>
{/*                                 
                        <li>
                            <a onClick={()=>verifySubNav('/userlist','Settings',1001) } >
                                <i className="bi bi-people"></i>
                                <span disabled={true}>User List</span>
                            </a>
                        </li>


                        <li>
                            <a onClick={()=> navigate('/UserEditAccount') }>
                                <i className="bi bi-building-check"></i>
                                <span>My Profile</span>
                            </a>
                        </li>
                        <li>
                            <a onClick={()=> navigate('/UserChangePassword') }>
                                <i className="bi bi-building-check"></i>
                                <span>Change Password</span>
                            </a>
                        </li> */}
                        {gEmpNo ==='4137'? 
                            <li>
                                <a onClick={()=> navigate('/PrintSample1') }>
                                    <i className="bi bi-building-check"></i>
                                    <span>Test</span>
                                </a>
                            </li>
                        : ""}
                        
                        
                    </ul>
                </li>
            </>
        );
    }



    function verifySubNav(navLink, menuType,  nModeNumber, tAccessType) {
        // alert(menuType + ",  "+ Number(gJewelry))
        if (menuType==='Jewelry' && Number(gJewelry)===0) {
            return Swal.fire({
                icon: "error",
                title:"You do not have access rights to jewelry!",
                text: "Please contact the administrator or manager.",
             }); 

        } else if (menuType==='Payroll' && Number(gPayroll)===0) {
            return Swal.fire({
                icon: "error",
                title:"You do not have access rights to payroll!",
                text: "Please contact the administrator or manager.",
             }); 
        } else if (menuType==='Settings' && Number(gSettings)===0) {
                return Swal.fire({
                    icon: "error",
                    title:"You do not have access rights to settings!",
                    text: "Please contact the administrator or manager.",
                 });      

        }
        
        if(navLink==="/BlankPage") {
            // const str = navLink;
            // const result = str.substring(1); 
            var retVal = "/accessdenied/:" + menuType
            // navigate(retVal);
            NavigateLink(retVal);
            return false;
        } 
        // check form access rights

        let cRetval= checkModuleAccess( navLink,nModeNumber,tAccessType);
        NavigateLink(cRetval);
        // navigate(cRetval);
    };

    function checkModuleAccess (itemPath,mCode,tAccessType)  {
        const str = itemPath;
        const result = str.substring(1); 
        var retVal = "/accessdenied/:" + result
        if (mCode===8027) {
            // alert(itemPath +",  " + mCode + ",  " + tAccessType)
        }
        
        // alert('gAccountType: ' + gAccountType)
        // temporay while no API  numBranch===10 || numBranch==='10'
        if (gAccountType===3 || gAccountType===8) {
            // alert('itemPath: ' + itemPath);
            retVal = itemPath
        } else {
            if(itemPath==="/jewelryphysicalinventory_close" || itemPath=== "/jewelryissue" || itemPath==="/jewelrystocktransfer" || itemPath==="/PrintSalesbyPeriod_close") {
                retVal = itemPath;
                //   alert('mCode: '+ mCode);
            } else {
            //    check accounts_d roles
                //   alert(mCode + ",  " + itemPath);
                //  console.log('datTable',datTable) 
                if (datTable) {
                    console.log('module found: ',mCode) 
                    let copyState = [...datTable];
                    const dtRead = copyState.find((p) => Number(p.moduleId) === Number(mCode));
                    if (dtRead) {
                        //  alert('Found mCode: '+ mCode);
                        if (tAccessType==='' || tAccessType===undefined) {
                            retVal = itemPath;  //for browsing
                        } else if (tAccessType.toLowerCase() ==='print' && Number(dtRead.printData)===1) {
                            retVal = itemPath;
                        } else if (tAccessType.toLowerCase()==='post' && Number(dtRead.postData)===1) {
                            retVal = itemPath;       
                        }
                        
                    }    
                } else {
                    // alert('no data available')
                    console.log('account details: no data available....')
                }
            }
        }
        // alert(retVal)
        return retVal;
    };


    // const loadAccountsDetail = async (tEmpno) => {
    //     if (gAccessToken===null || gAccessToken==='') {
    //         // GetAPITokenJava();
    //         delayMe(10000);
    //         gAccessToken = decryptPWord(sessionStorage.getItem("accessToken")); 
    //     }  
    //     let json1 =JSON.stringify([{self:0, mCode:1}])
    //     //  alert(tEmpno.trim())
    //     try {
    //             await fetch(dbServerHostJava + "/api/account/details/search/" + tEmpno, {
    //           //   await fetch(dbServerHostJava + "/api/account/details/" + tEmpno.trim(), {
    //             method: 'GET',
    //             headers: GetMyHeaders(gAccessToken),
    //           })  
    //             .then((response) => response.json() )
    //             .then((json) => {
    //              // console.log("get Roles Detail:",  tEmpno);    
    //               console.log("get Roles Detail:d", json.data);    
    //              // setDataAccountsDetail(json.data);   
    //              // sessionStorage.setItem("RolesDetail", JSON.stringify(json.data));
    //                 // alert(json.status)
    //                 if (Number(json.status)===200) {
    //                    json1 =JSON.stringify(json.data)
    //                    sessionStorage.setItem("RolesDetail", encryptPWord(json1));
    //                    setDataTable(json.data);
    //                    // sessionStorage.setItem("RolesTemp", json1);
    //                 } else {
    //                 //    toast.error("Error: Account Details... " + json.status)
    //                    // sessionStorage.setItem("RolesDetail", encryptPWord(json1));
    //                    // alert("error " + json.status)
    //                 }
    //              // sessionStorage.setItem("RolesDetail", json.data);
    //              //   alert("roles")
    //              // console.log('aCCOUNT dETAILS',json1)
  
        
    //         })  
    //       } catch (err) {
    //           //  sessionStorage.setItem("RolesDetail", JSON.stringify([{self:0, mCode:1}]));
    //           // sessionStorage.setItem("RolesDetail", encryptPWord(json1));
    //         //    toast.error("Error Roles, NO accounts details data to fetch : " + tEmpno)
    //           //  console.log("err Roles Detail:d " , err + "  " +tEmpno);    
    //           //  alert("Error Roles, empty account details : " + tEmpno)
    //       }
    // }

    return (
        <div >
            {gLogIn==='False' || decryptPWord(sessionStorage.getItem('login')) ==='False' ? ( 
            <div className='top_title'>
                 {/* visible account */}
            </div>
            ):
             auth ? 
            <>
            {/* <ToastContainer/> */}
            <Header />
            <aside id='sidebar' className={`sidebar ${isOpen ? 'open' : ''}`} ref={sidebarRef}>
                <ul className='sidebar-nav' id='sidebar-nav'>
                    {/* Dashboard Menu */}

                    <li className='sidebar-nav-item'>
                        {/* <a className='nav-link' href='/'>
                            <i className="bi bi-speedometer2"></i>
                            <span>Dashboard</span>
                        </a> */}
                        <button onClick={() => NavigateLink("/")} className='sidebar-main-btn'>
                            <IoHomeOutline /> <span className='sidebar-sub-span'>Dashboard</span>
                         </button> 
                    </li>
                     
                     {gApplicant ===1 && gUserType==='admin' ? 
                        <>
                        <hr className="hr" />
                        {ApplicantAdminMenu()}
                        </>
                        :""
                    }    
                    {gApplicant ===1 && gUserType==='members' ? 
                        <>
                        <hr className="hr" />
                        {ApplicantMembersMenu()}
                        </>
                        :""
                    }    

                    {gSettings ===1 ? 
                        <>
                        <hr className="hr" />
                        {SettingsMenu()}
                        </>
                        :""
                    }    
                </ul>
                <hr className="hr" />
                <button onClick={()=>logout()} className='sidebar-main-btn'>
                            <IoLogOutOutline /> <span className='sidebar-sub-span'>Logout</span>
                 </button>
            </aside>
            <Footer/>
            </>
            : ""
        }
        <main>{children}</main>
        </div>
    );
}

export default SideBar;
