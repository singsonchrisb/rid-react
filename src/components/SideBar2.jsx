import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
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
import './SideBar.css';
import Header from './Header';
import Footer from './Footer';

import { decryptPWord, delayMe, encryptPWord, MyServerHostJava } from '../pages/Functions/MyFunctions.jsx';
import { GetAPITokenJava, GetMyHeaders } from '../pages/Functions/GetAPIToken.jsx';
import { AiFillPrinter, AiOutlineBarcode } from 'react-icons/ai';
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

let dbServerHostJava = MyServerHostJava();

// function SideBar() {
const SideBar =({children}) => {
    let gAccessToken = decryptPWord(sessionStorage.getItem("accessToken"));
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
    let gDashboard = decryptPWord(sessionStorage.getItem('dashb'));
    let gJewelry =Number(decryptPWord(sessionStorage.getItem('jewel')));
    let gTelecom = Number(decryptPWord(sessionStorage.getItem('telec')));
    let gDSGro = Number(decryptPWord(sessionStorage.getItem('dsgro')));
    let gPayroll = Number(decryptPWord(sessionStorage.getItem('payro')));
    let gFoton = Number(decryptPWord(sessionStorage.getItem('foton')));

    const Navigate = useNavigate();
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
        } else {
            if(!loginName)  {
                // || decryptPWord(sessionStorage.getItem("homeOpen")) === "HomeClosed")
               // Navigate("/signin")
                // alert(window.location.pathname)
                //  sessionStorage.getItem("loginName")
            //    navigate("/")
               Navigate("/home")
            }
        }
        // && homeOpen
      }, []);
     useEffect(() => {
        if (gEmpNo !=='' && gLogIn ==='True' && !sessionStorage.getItem("RolesDetail")) {
            //  alert(gEmpNo);
            // loadAccountsDetail(gEmpNo);
        }
        loadAccountsDetail(gEmpNo);
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

    function JewelryMenu() {
        return(
            <>
            <li className='sidebar-nav-item'>
                    <label
                        className={`nav-link ${openSubMenus['jewelry-nav'] ? '' : 'collapsed'}`}
                        onClick={(event) => toggleSubMenu(event, 'jewelry-nav')}
                        href='#'
                    >
                        <i className="bi bi-gem"></i>
                        <span>Jewelry</span>
                        <i className="bi bi-chevron-down ms-auto"></i>
                    </label>
                    <ul
                        id='jewelry-nav'
                        className={`nav-content collapse ${openSubMenus['jewelry-nav'] ? 'show' : ''}`}
                    >
                        {/* <li>
                            <a href='#' onClick={preventDefaultScroll}>
                                <i className="bi bi-people"></i>
                                <span>Products</span>
                            </a>
                        </li> */}
                        
                        {/* <hr className="hr" /> */}

                        <li>
                            <a href='#'
                                className={`nav-link ${openSubMenus['profile-nav'] ? '' : 'collapsed'}`}
                                onClick={(event) => toggleSubMenu(event, 'profile-nav')}
                            >
                            {/* <button 
                                className={`nav-link ${openSubMenus['profile-nav'] ? '' : 'collapsed'}`}
                                style={{ cursor: 'pointer', border: 'none', width: '250px' }}
                                onClick={(event) => toggleSubMenu(event, 'profile-nav')}
                            > */}
                                <i className="bi bi-x-diamond"></i>
                                <span>Profile</span>
                                <i className="bi bi-chevron-down ms-auto"></i>
                            </a>
                            <ul
                                id='profile-nav'
                                className={`nav-content collapse ${openSubMenus['profile-nav'] ? 'show' : ''}`}
                            >
                                
                                <li>
                                <a role="button" onClick={() => verifySubNav("/jewelryproducts",'Jewelry',8001)}>
                                        <i className="bi bi-boxes"></i>
                                        <span>Products</span>
                                    </a>
                                </li>
                                <li>
                                    <a role="button" onClick={() => verifySubNav("/jewelryclass",'Jewelry',8004)}>
                                        <i className="bi bi-x-diamond" ></i>
                                        <span  >Classification</span>
                                    </a>
                                </li>
                                <li>
                                    <a role="button"  onClick={()=> verifySubNav("/jewelrykarats",'Jewelry',8003)}>
                                        <i className='bi bi-gem'></i>
                                        <span>Karats</span>
                                    </a>
                                </li>
                                <li>
                                <a role="button"  onClick={()=> verifySubNav("/JewelryGoldMarketPrice",'Jewelry',8023)}>
                                        <i className='bi bi-credit-card'></i>
                                        <span>Gold Market Price</span>
                                    </a>
                                </li>
                                <li>
                                    <a role="button"  onClick={()=> verifySubNav("/jewelrycharges",'Jewelry',8005)}>
                                        <i className='bi bi-credit-card'></i>
                                        <span>Service Fee</span>
                                    </a>
                                </li>
                                <li>
                                    <a role="button"  onClick={()=> verifySubNav("/jewelrysupplier",'Jewelry',8006)}>
                                        <i className='bi bi-boxes'></i>
                                        <span>Supplier</span>
                                    </a>
                                </li>
                                {/* Add more third-level menu items here */}
                            </ul>
                        </li>
                        <li>
                            <a role="button"  onClick={()=> verifySubNav("/jewelrydiscounts",'Jewelry',8002)}>
                                <i className="bi bi-piggy-bank"></i>
                                <span>Discount</span>
                            </a>
                        </li>
                        

                        <li>
                            <a role="button" 
                                className={`nav-link ${openSubMenus['entry-nav'] ? '' : 'collapsed'}`}
                                onClick={(event) => toggleSubMenu(event, 'entry-nav')}
                                // href='#'
                            >
                                <i className="bi bi-laptop"></i>
                                <span>Entry</span>
                                <i className="bi bi-chevron-down ms-auto"></i>
                            </a>
                            <ul
                                id='entry-nav'
                                className={`nav-content collapse ${openSubMenus['entry-nav'] ? 'show' : ''}`}
                            >
                                {/* <li>
                                    <a href='#' onClick={preventDefaultScroll}>
                                        <i className="bi bi-exclamation-diamond"></i>
                                        <span>Issue</span>
                                    </a>
                                </li>
                                <li>
                                    <a href='#' onClick={preventDefaultScroll}>
                                        <i className="bi bi-arrow-90deg-left"></i>
                                        <span>Transfer to another branch</span>
                                    </a>
                                </li> */}
                                <li>
                                    <a role="button" 
                                        className={`nav-link ${openSubMenus['purchases-level4-nav'] ? '' : 'collapsed'}`}
                                        onClick={(event) => toggleSubMenu (event, 'purchases-level4-nav')}
                                        // href='#'
                                    >
                                        <i className='bi bi-bag'></i>
                                        <span>Purchases</span>
                                        <i className={`bi bi-chevron-down ms-auto ${openSubMenus['purchases-level4-nav'] ? '' : 'collapsed'}`}></i>
                                    </a>
                                    <ul
                                        id='purchases-level4-nav'
                                        className={`nav-content collapse ${openSubMenus['purchases-level4-nav'] ? 'show' : ''}`}
                                    >
                                        <li>
                                            <a role="button"  onClick={preventDefaultScroll}>
                                                <i className='bi bi-cart2'></i>
                                                <span>Order</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a role="button"  onClick={preventDefaultScroll}>
                                                <i className='bi bi-receipt'></i>
                                                <span>Invoice</span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                {/* Add more third-level menu items here */}
                                <li>
                                    <a role="button" 
                                        className={`nav-link ${openSubMenus['stockwithdrawal-level4-nav'] ? '' : 'collapsed'}`}
                                        onClick={(event) => toggleSubMenu (event, 'stockwithdrawal-level4-nav')}
                                        // href='#'
                                    >
                                        <i className='bi bi-arrow-left-right'></i>
                                        <span>Stock Withdrawal</span>
                                        <i className={`bi bi-chevron-down ms-auto ${openSubMenus['stockwithdrawal-level4-nav'] ? '' : 'collapsed'}`}></i>
                                    </a>
                                    <ul
                                        id='stockwithdrawal-level4-nav'
                                        className={`nav-content collapse ${openSubMenus['stockwithdrawal-level4-nav'] ? 'show' : ''}`}
                                    >
                                        <li>
                                            <a role="button"  onClick={()=> verifySubNav("/jewelryissue",'Jewelry',8009)}>
                                                <i className='bi bi-exclamation-diamond'></i>
                                                <span>Issue</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a role="button"  onClick={()=> verifySubNav("/jewelrystocktransfer",'Jewelry',8008)}>
                                                <i className='bi bi-arrow-return-left'></i>
                                                <span>Transfer to Another Branch</span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>

                        <li>
                            <a role="button" 
                                className={`nav-link ${openSubMenus['phyinventory-nav'] ? '' : 'collapsed'}`}
                                onClick={(event) => toggleSubMenu(event, 'phyinventory-nav')}
                            >
                                <i className="bi bi-boxes"></i>
                                <span>Physical Inventory</span>
                                <i className="bi bi-chevron-down ms-auto"></i>
                            </a>
                            <ul
                                id='phyinventory-nav'
                                className={`nav-content collapse ${openSubMenus['phyinventory-nav'] ? 'show' : ''}`}
                            >
                                <li>
                                    <a role="button" onClick={()=> verifySubNav("/jewelryphysicalinventory",'Jewelry',8007)}>
                                        <i className="bi bi-upc-scan"></i>
                                        <span>Scan</span>
                                    </a>
                                </li>
                                <li>
                                <a role="button" onClick={()=> verifySubNav("/jewelrysetinventory",'Jewelry',8025)}>
                                        <i className="bi bi-calendar-check"></i>
                                        <span>Set # of days</span>
                                    </a>
                                </li>
                                {/* Add more third-level menu items here */}
                                {/* <li>
                                    
                                    <a
                                        className={`nav-link ${openSubMenus['phyinventory-level4-nav'] ? '' : 'collapsed'}`}
                                        onClick={(event) => toggleSubMenu (event, 'phyinventory-level4-nav')}
                                        href='#'
                                    >
                                        <i className='bi bi-box'></i>
                                        <span>Level 4 Menu</span>
                                        <i className='bi bi-chevron-down ms-auto'></i>
                                    </a>
                                    <ul
                                        id='phyinventory-level4-nav'
                                        className={`nav-content collapse ${openSubMenus['phyinventory-level4-nav'] ? 'show' : ''}`}
                                    >
                                        <li>
                                            <a href='#' onClick={preventDefaultScroll}>
                                                <i className='bi bi-box'></i>
                                                <span>Level 4A Item</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href='#' onClick={preventDefaultScroll}>
                                                <i className='bi bi-box'></i>
                                                <span>Level 4B Item</span>
                                            </a>
                                        </li>
                                    </ul>
                                </li> */}
                            </ul>
                        </li>
                         {/* reports */}
                        <li>
                            <a role="button"
                                className={`nav-link ${openSubMenus['sidereports-nav'] ? '' : 'collapsed'}`}
                                onClick={(event) => toggleSubMenu(event, 'sidereports-nav')}
                            >
                                <AiFillPrinter style={{marginRight: '5px',fontSize: '17px'}}/>
                                <span>Reports</span>
                                <i className="bi bi-chevron-down ms-auto"></i>
                            </a>
                            <ul
                                id='sidereports-nav'
                                className={`nav-content collapse ${openSubMenus['sidereports-nav'] ? 'show' : ''}`}
                            >
                                <li>
                                    <a role="button" onClick={()=> verifySubNav("/PrintJewelrySalesbyPeriod",'Jewelry',8027,'print')}>
                                        <i className="bi bi-printer"></i>
                                        <span>Sales</span>
                                    </a>
                                </li>
                                <li>
                                    <a role="button" onClick={()=> verifySubNav("/PrintJewelryLayaway",'Jewelry',8029)}>
                                        <i className="bi bi-printer"></i>
                                        <span>Installment (Layaway)</span>
                                    </a>
                                </li>
                                <li>
                                    <a onClick={()=> verifySubNav("/PrintJewelryConsolidatedbyPeriod",'Jewelry',8028)}>
                                        <i className='bi bi-printer'></i>
                                        <span>Consolidated</span>
                                    </a>
                                </li>
                                <li>
                                    <a role="button"
                                       className={`nav-link ${openSubMenus['reportsinv-level4-nav'] ? '' : 'collapsed'}`}
                                        onClick={(event) => toggleSubMenu (event, 'reportsinv-level4-nav')}
                                    >
                                        <AiFillPrinter style={{marginRight: '5px',fontSize: '17px'}}/>
                                        <span>Inventory</span>
                                        <i className={`bi bi-chevron-down ms-auto ${openSubMenus['reportsinv-level4-nav'] ? '' : 'collapsed'}`}></i>
                                    </a>
                                    <ul
                                        id='reportsinv-level4-nav'
                                        className={`nav-content collapse ${openSubMenus['reportsinv-level4-nav'] ? 'show' : ''}`}
                                    >
                                        <li>
                                            <a onClick={()=> verifySubNav("/PrintDailyPhysicalInventory",'Jewelry',8007)}>
                                                <i className='bi bi-printer'></i>
                                                <span>Daily Physical</span>
                                            </a>
                                        </li>
                                        <li>
                                             <a onClick={()=> verifySubNav("/PrintInventoryDetailedListing",'Jewelry',8031)}>
                                                <i className='bi bi-printer'></i>
                                                <span>Detailed Listing</span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                     <a onClick={()=> verifySubNav("/PrintJewelryCreditCard",'Jewelry',8031)}>
                                        <i className='bi bi-printer'></i>
                                        <span>Credit Card</span>
                                    </a>
                                </li>

                                {/* Part 2 of my Code */}
                                <li>
                                    <a onClick={()=> verifySubNav("/PrintJewelryFlaps",'Jewelry',8032)}>
                                        <i className='bi bi-printer'></i>
                                        <span>Incentive Program (Flaps)</span>
                                    </a>
                                </li>
                                <li>
                                     <a onClick={()=> verifySubNav("/PrintJewelryItemTracking",'Jewelry',8030)}>
                                        <i className='bi bi-printer'></i>
                                        <span>Item Tracking</span>
                                    </a>
                                </li>
                                <li>
                                    <a onClick={()=> verifySubNav("/printjewelrybarcode",'Jewelry',8011)}>
                                        {/* <i className='bi bi-printer'></i> */}
                                        <AiOutlineBarcode style={{marginRight: '5px',fontSize: '17px'}}/>
                                        <span>Barcode (Tag)</span>
                                    </a>
                                </li>

                                {/* Add more third-level menu items here */}
                            </ul>
                        </li>

                        <li>
                            <a
                                className={`nav-link ${openSubMenus['pointofsales-nav'] ? '' : 'collapsed'}`}
                                onClick={(event) => toggleSubMenu(event, 'pointofsales-nav')}
                                href='#'
                            >
                                <i className="bi bi-box"></i>
                                <span>Point-Of-Sales</span>
                                <i className="bi bi-chevron-down ms-auto"></i>
                            </a>
                            <ul
                                id='pointofsales-nav'
                                className={`nav-content collapse ${openSubMenus['pointofsales-nav'] ? 'show' : ''}`}
                            >
                                <li>
                                    <a onClick={()=> verifySubNav("/jewelrypossales",'Jewelry',8014)}>
                                        <i className="bi bi-card-checklist"></i>
                                        <span>Sales List</span>
                                    </a>
                                </li>
                                <li>
                                    <a onClick={()=> verifySubNav("/jewelrypositems",'Jewelry',8015)}>
                                        <i className="bi bi-list-check"></i>
                                        <span>Item List</span>
                                    </a>
                                </li>
                                <li>
                                    <a onClick={()=> verifySubNav("/jewelryposlayaway",'Jewelry',8016)}>
                                        <i className='bi bi-list-check'></i>
                                        <span>Layaway List</span>
                                    </a>
                                </li>
                                <li>
                                    <a onClick={()=> verifySubNav("/JewelryPOSBranchList/jewelry",'Jewelry',8017)}>
                                        <i className='bi bi-list-check'></i>
                                        <span>Branch List</span>
                                    </a>
                                </li>
                                {/* <li>
                                    <a onClick={()=> verifySubNav(""/JewelryPOSBranchAccounts",'Jewelry',8018)}>
                                        <i className='bi bi-people'></i>
                                        <span>Account (Branch)</span>
                                    </a>
                                </li> */}
                                <li>
                                    <a onClick={()=> verifySubNav("/JewelryPOSSeniorCitizenAccounts/approved",'Jewelry',8019)}>
                                        <i className='bi bi-people'></i>
                                        <span>Accounts (Senior Citizen)</span>
                                    </a>
                                </li>
                                <li>
                                    <a onClick={()=> verifySubNav("/JewelryPOSMembershipAccounts",'Jewelry',8020)}>
                                        <i className='bi bi-people'></i>
                                        <span>Accounts (ORO Gold Card)</span>
                                    </a>
                                </li>
                                <li>
                                    <a onClick={()=> verifySubNav("/JewelryPOSExchanges",'Jewelry',8021)}>
                                        <i className='bi bi-arrow-left-right'></i>
                                        <span>Returns & Exchange</span>
                                    </a>
                                </li>
                                <li>
                                    <a onClick={()=> verifySubNav("/JewelryPOSWithdrawal",'Jewelry',8022)}>
                                        <i className='bi bi-cash'></i>
                                        <span>Funding & Withdrawal</span>
                                    </a>
                                </li>
                                {/* Add more third-level menu items here */}
                            </ul>
                        </li>

                        <li>
                            <a onClick={()=> verifySubNav("/JewelryPOSManualSync",'Jewelry',8023)}>
                                <i className="bi bi-arrow-repeat"></i>
                                <span>Sync to Firebase</span>
                            </a>
                        </li>

                    </ul>
                </li>
            </>
        );
    }

    function TelecomMenu() {
        return (
            <>
            <li className='sidebar-nav-item'>
                    <a
                        className={`nav-link ${openSubMenus['telecom-nav'] ? '' : 'collapsed'}`}
                        onClick={(event) => toggleSubMenu(event, 'telecom-nav')}
                        href='#'
                    >
                        <i className="bi bi-phone"></i>
                        <span>Telecom</span>
                        <i className="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul
                        id='telecom-nav'
                        className={`nav-content collapse ${openSubMenus['telecom-nav'] ? 'show' : ''}`}
                    >
                        <li>
                            <a href='#' onClick={preventDefaultScroll}>
                                <i className="bi bi-people"></i>
                                <span>Products</span>
                            </a>
                        </li>
                        <li>
                            <a href='#' onClick={preventDefaultScroll}>
                                <i className="bi bi-building-check"></i>
                                <span>Discount</span>
                            </a>
                        </li>
                        <li>
                            <a href='#'
                                className={`nav-link ${openSubMenus['telecom-custom-nav'] ? '' : 'collapsed'}`}
                                onClick={(event) => toggleSubMenu(event, 'telecom-custom-nav')}
                            >
                                <i className="bi bi-box"></i>
                                <span>Physical Inventory</span>
                                <i className="bi bi-chevron-down ms-auto"></i>
                            </a>
                            <ul
                                id='telecom-custom-nav'
                                className={`nav-content collapse ${openSubMenus['telecom-custom-nav'] ? 'show' : ''}`}
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
                                <li>
                                    <a href='#' onClick={preventDefaultScroll}>
                                        <i className='bi bi-bag'></i>
                                        <span>Level 3A Menu</span>
                                    </a>
                                </li>
                                <li>
                                    <a href='#' onClick={preventDefaultScroll}>
                                        <i className='bi bi-bag'></i>
                                        <span>Level 3B Menu</span>
                                    </a>
                                </li>
                                <li>
                                    <a href='#' onClick={preventDefaultScroll}>
                                        <i className='bi bi-bag'></i>
                                        <span>Level 3C Menu</span>
                                    </a>
                                </li>
                                <li>
                                    <a href='#' onClick={preventDefaultScroll}>
                                        <i className='bi bi-bag'></i>
                                        <span>Level 3C Menu</span>
                                    </a>
                                </li>
                                <li>
                                    <a href='#' onClick={preventDefaultScroll}>
                                        <i className='bi bi-bag'></i>
                                        <span>Level 3D Menu</span>
                                    </a>
                                </li>
                                {/* Add more third-level menu items here */}
                            </ul>
                        </li>
                    </ul>
                </li>
            </>

        );
    }
    function DrugStoreMenu() {
        return (
            <>
                            {/* Drug Store Grocery */}
                            <li className='sidebar-nav-item'>
                    <a
                        className={`nav-link ${openSubMenus['drugstore-nav'] ? '' : 'collapsed'}`}
                        onClick={(event) => toggleSubMenu(event, 'drugstore-nav')}
                        href='#'
                    >
                        <i className="bi bi-shop"></i>
                        <span>Drugstore</span>
                        <i className="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul
                        id='drugstore-nav'
                        className={`nav-content collapse ${openSubMenus['drugstore-nav'] ? 'show' : ''}`}
                    >
                        <li>
                            <a href='#' onClick={preventDefaultScroll}>
                                <i className="bi bi-people"></i>
                                <span>Products</span>
                            </a>
                        </li>
                        <li>
                            <a href='#' onClick={preventDefaultScroll}>
                                <i className="bi bi-building-check"></i>
                                <span>Discount</span>
                            </a>
                        </li>
                        <li>
                            <a
                                className={`nav-link ${openSubMenus['drugstore-custom-nav'] ? '' : 'collapsed'}`}
                                onClick={(event) => toggleSubMenu(event, 'drugstore-custom-nav')}
                                href='#'
                            >
                                <i className="bi bi-box"></i>
                                <span>Physical Inventory</span>
                                <i className="bi bi-chevron-down ms-auto"></i>
                            </a>
                            <ul
                                id='drugstore-custom-nav'
                                className={`nav-content collapse ${openSubMenus['drugstore-custom-nav'] ? 'show' : ''}`}
                            >
                                <li>
                                    <a onClick={preventDefaultScroll}>
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
                                {/* Add more third-level menu items here */}
                            </ul>
                        </li>
                    </ul>
                </li>

            </>
        );
    }

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
                            <a onClick={()=>Navigate('/payroll/payslip101') } >
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

    function FotonMenu() {
        return(
            <>
            {/* Foton */}
            <li className='sidebar-nav-item'>
                    <a
                        className={`nav-link ${openSubMenus['foton-nav'] ? '' : 'collapsed'}`}
                        onClick={(event) => toggleSubMenu(event, 'foton-nav')}
                        href='#'
                    >
                        <i className="bi bi-truck"></i>
                        <span>Foton</span>
                        <i className="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul
                        id='foton-nav'
                        className={`nav-content collapse ${openSubMenus['foton-nav'] ? 'show' : ''}`}
                    >
                        <li>
                            <a href='#' onClick={preventDefaultScroll}>
                                <i className="bi bi-people"></i>
                                <span>Suppliers</span>
                            </a>
                        </li>
                        <li>
                            <a href='#' onClick={preventDefaultScroll}>
                                <i className="bi bi-building-check"></i>
                                <span>Purchase Order</span>
                            </a>
                        </li>
                        <li>
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
                                {/* Add more third-level menu items here */}
                            </ul>
                        </li>
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
                        <li>
                            <a onClick={()=>verifySubNav('/userlist','Settings',1001) } >
                                <i className="bi bi-people"></i>
                                <span disabled={true}>User List</span>
                            </a>
                        </li>
                        <li>
                            <a onClick={()=> Navigate('/UserEditAccount') }>
                                <i className="bi bi-building-check"></i>
                                <span>My Profile</span>
                            </a>
                        </li>
                        <li>
                            <a onClick={()=> Navigate('/UserChangePassword') }>
                                <i className="bi bi-building-check"></i>
                                <span>Change Password</span>
                            </a>
                        </li>
                        {gEmpNo ==='4137'? 
                            <li>
                                <a onClick={()=> Navigate('/PrintSample1') }>
                                    <i className="bi bi-building-check"></i>
                                    <span>Test</span>
                                </a>
                            </li>
                        : ""}
                        
                        {/* <li>
                            <a
                                className={`nav-link ${openSubMenus['setting-custom-nav'] ? '' : 'collapsed'}`}
                                onClick={(event) => toggleSubMenu(event, 'setting-custom-nav')}
                                href='#'
                            >
                                <i className="bi bi-box"></i>
                                <span>Physical Inventory</span>
                                <i className="bi bi-chevron-down ms-auto"></i>
                            </a>
                            <ul
                                id='setting-custom-nav'
                                className={`nav-content collapse ${openSubMenus['setting-custom-nav'] ? 'show' : ''}`}
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

    function SettingsMenu_MUI() {
        const [openSubMenus, setOpenSubMenus] = useState({ 'setting-nav': false });
        const navigate = useNavigate();
      
        const toggleSubMenu = (event, menu) => {
          setOpenSubMenus(prevState => ({
            ...prevState,
            [menu]: !prevState[menu],
          }));
        };
      
        return (
          <List >
            <ListItem button onClick={(event) => toggleSubMenu(event, 'setting-nav')}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
              {openSubMenus['setting-nav'] ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openSubMenus['setting-nav']} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button onClick={() => verifySubNav('/userlist', 'Settings', 1001)}>
                  <ListItemIcon>
                    <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText primary="User List" />
                </ListItem>
                <ListItem button onClick={() => navigate('/UserEditAccount')}>
                  <ListItemIcon>
                    <AccountBoxIcon />
                  </ListItemIcon>
                  <ListItemText primary="My Profile" />
                </ListItem>
                <ListItem button onClick={() => navigate('/UserChangePassword')}>
                  <ListItemIcon>
                    <LockIcon />
                  </ListItemIcon>
                  <ListItemText primary="Change Password" />
                </ListItem>
              </List>
            </Collapse>
          </List>
        );
      }
    // end of menu

    

    function verifyMenuNav(navLink, menuType) {
        alert(menuType + ",  "+ Number(gJewelry))
        
        if (menuType==='Jewelry' && Number(gJewelry)===1) {
            return Swal.fire({
                icon: "error",
                title:"You do not have access rights to settings!",
                text: "Please contact the administrator or manager.",
             }); 

        } else if (menuType==='Settings' && Number(gSettings)===0) {
            return Swal.fire({
                icon: "error",
                title:"You do not have access rights to settings!",
                text: "Please contact the administrator or manager.",
             }); 

        }
        if (Number(gSettings)===0) {

        }
        

        Navigate(navLink);
    };

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
            Navigate(retVal);
            return false;
        } 
        // check form access rights

        let cRetval= checkModuleAccess( navLink,nModeNumber,tAccessType);

        Navigate(cRetval);
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


    const loadAccountsDetail = async (tEmpno) => {
        if (gAccessToken===null || gAccessToken==='') {
            GetAPITokenJava();
            delayMe(10000);
            gAccessToken = decryptPWord(sessionStorage.getItem("accessToken")); 
        }  
        let json1 =JSON.stringify([{self:0, mCode:1}])
        //  alert(tEmpno.trim())
        try {
                await fetch(dbServerHostJava + "/api/account/details/search/" + tEmpno, {
              //   await fetch(dbServerHostJava + "/api/account/details/" + tEmpno.trim(), {
                method: 'GET',
                headers: GetMyHeaders(gAccessToken),
              })  
                .then((response) => response.json() )
                .then((json) => {
                 // console.log("get Roles Detail:",  tEmpno);    
                  console.log("get Roles Detail:d", json.data);    
                 // setDataAccountsDetail(json.data);   
                 // sessionStorage.setItem("RolesDetail", JSON.stringify(json.data));
                    // alert(json.status)
                    if (Number(json.status)===200) {
                       json1 =JSON.stringify(json.data)
                       sessionStorage.setItem("RolesDetail", encryptPWord(json1));
                       setDataTable(json.data);
                       // sessionStorage.setItem("RolesTemp", json1);
                    } else {
                    //    toast.error("Error: Account Details... " + json.status)
                       // sessionStorage.setItem("RolesDetail", encryptPWord(json1));
                       // alert("error " + json.status)
                    }
                 // sessionStorage.setItem("RolesDetail", json.data);
                 //   alert("roles")
                 // console.log('aCCOUNT dETAILS',json1)
  
        
            })  
          } catch (err) {
              //  sessionStorage.setItem("RolesDetail", JSON.stringify([{self:0, mCode:1}]));
              // sessionStorage.setItem("RolesDetail", encryptPWord(json1));
            //    toast.error("Error Roles, NO accounts details data to fetch : " + tEmpno)
              //  console.log("err Roles Detail:d " , err + "  " +tEmpno);    
              //  alert("Error Roles, empty account details : " + tEmpno)
          }
    }

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
                        <a className='nav-link' href='/'>
                            <i className="bi bi-speedometer2"></i>
                            <span>Dashboard</span>
                        </a>
                    </li>
                    { gJewelry ===1 ? 
                        <>
                        <hr className="hr" />
                        {JewelryMenu()}  
                        </>
                        : ""
                    }
                    {gTelecom ==='1' ? 
                        <>
                        <hr className="hr" />
                        {TelecomMenu()}
                        </>
                        :""
                    }
                    {gDSGro ===1 ? 
                        <>
                        <hr className="hr" />
                        {DrugStoreMenu()}
                        </>
                        :""
                    }
                    {gPayroll ===1 ? 
                        <>
                        <hr className="hr" />
                        {PayrollMenu()}
                        </>
                        :""
                    }
                    {gFoton ===1 ? 
                        <>
                        <hr className="hr" />
                        {FotonMenu()}
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
