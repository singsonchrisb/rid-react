// https://cdnjs.cloudflare.com/ajax/libs/bootbox.js/6.0.0/bootbox.js

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';


import 'bootstrap-icons/font/bootstrap-icons.css';

// import 'primereact/resources/primereact.css';

// import 'primereact/resources/themes/lara-light-indigo/theme.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import 'remixicon/fonts/remixicon.css';

import "./styles/Button.css";
import "./styles/TableStyled.css";
import "./styles/ChrichStyled.css";
import "./styles/Slider.css";
import "./styles/Print.css";

 
// import "./styles/ModalConfirm.css";
// import "./styles/Pigination.css";
//  import "./styles/Popup.css";
//import "./styles/Register.css";
//import "./styles/Login2.css";

// import axios from 'axios';
// import  { useState, useEffect }  from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { Ri24HoursFill } from 'react-icons/ri';
// import { useParams } from 'react-router-dom';


// import { Provider } from "react-redux";
// import { store } from "./redux/store";

// import Sidebar from './components/Sidebar';
 import Sidebar from './components/SideBar2';
 import Main from './components/Main';


// Import Bootstrap
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.min.js';

// import ScrollToTopOnMount from "./pages/Functions/scrollToTopOnMount";
// import {MyServerHost}  from './pages/MyFunctions';

import Home from './homepages/App';
// import { decryptPWord } from './pages/Functions/MyFunctions';

// import ForgotPassword from './pages/Settings/ForgotPassword';

import UserAccounts from "./pages/Settings/UserAccounts";
import SignIn from './pages/Settings/Login';
import SignInAdmin from './pages/Settings/LoginAdmin';
import UserChangePassword from './pages/Settings/UserChangePassword';
import UserEditAccount from './pages/Settings/UserUpdateAccount';
import SignUpForm from "./pages/Settings/SignUpForm";
import Register from "./pages/Settings/RegisterForm";

import ApplicantsTabs from "./pages/Applicant/ApplicantsTabs";
// import TabForm from "./pages/Applicant/TabForm";
import TabForm from './pages/Applicant/RIDClearance'
import FAQMe from './faq/faq';


function App()  {
  // let lOpenSideBar=true;
  //  const { userId } = useParams(); // Access userId parameter from URL
  //  alert('userId: ' + {userId});

  // const [windowSize, setWindowSize] = useState([
  //   window.innerWidth,
  //   window.innerHeight,
  // ]);

  // useEffect(() => {
  //   const handleWindowResize = () => {
  //     setWindowSize([window.innerWidth, window.innerHeight]);
  //   };

  //   window.addEventListener('resize', handleWindowResize);

  //   return () => {
  //     window.removeEventListener('resize', handleWindowResize);
  //   };
  // }, []);

  return (
    //<Grid fluid={true}>
  //   <div>
  //   <h2>Width: {windowSize[0]}</h2>

  //   <h2>Height: {windowSize[1]}</h2>
  // </div>
  // <Provider store={store}>
     <BrowserRouter>
     {/* <Home/> */}

     {/* {!lOpenSideBar ? "" : */}

     <div className='admin-dashboard'>
        <Sidebar>
            {/* <ScrollToTopOnMount /> */}
              <Routes>
                {/* <Route path="/" exact element={<SignOut/>}/> */}
                {/* <Route path="/" exact element={<Home/>}/>  */}
                {/* <Route path="/:userId" exact element={<SignIn/>}/> */}
                <Route path="/home" exact element={<Home/>}/>
                {/* <Route path="/home" exact element={<Home/>}/> */}
                {/* <Route path="/home" exact element={<HomePage/>}/> */}

                <Route path="/" exact element={<Main/>}/> 
                {/* <Route path="/JewelryPOSDashboard" exact element={<Main/>}/>  */}
                
                {/* <Route path="/JewelryPOSDashboard" exact element={<JewelryPOSDashboard/>}/> */}
                {/* <Route path="/ProjectDashBoard" exact element={<ProjectDashBoard/>} /> */}

                {/* <Route path="/jewelrysub" exact element={<JewelrySub/>}/> */}
                {/* <Route path="/jewelryproducts" exact element={<JewelryProducts/>}/>   */}
                {/* <Route path="/jewelrydiscounts" exact element={<JewelryDiscounts/>}/>
                <Route path="/jewelryphysicalinventory" exact element={<JewelryPhysicalInventory/>}/>
                <Route path="/jewelrysetinventory" exact element={<JewelrySetInventory/>}/> */}

                {/* <Route path="/jewelryclass" exact element={<JewelryClass/>}/>  
                <Route path="/jewelrykarats" exact element={<JewelryKarats/>}/>
                <Route path="/JewelrySpecialItemsByClass" exact element={<JewelrySpecialItemsByClass/>}/>
                <Route path="/JewelrySpecialItemsAddOns" exact element={<JewelrySpecialItemsAddOns/>}/>
                <Route path="/jewelrycharges" exact element={<JewelryCharges/>}/>
                <Route path="/JewelryGoldMarketPrice" exact element={<JewelryGoldMarketPrice/>}/>
                <Route path="/jewelrysupplier" exact element={<JewelrySupplier/>}/>
                <Route path="/Jewelrystocktransfer" exact element={<JewelryStockTransfer/>}/>
                <Route path="/jewelryissue" exact element={<JewelryIssue/>}/>
                <Route path="/Jewelrypurchaseorder" exact element={<JewelryPurchaseOrder/>}/> */}

                
                {/* <Route path="/JewelryPOSManualSync" exact element={<JewelryPOSManualSync/>}/>  */}

                {/* <Route path="/printjewelrybarcode" exact element={<PrintJewelryBarcode data={[{self: 'J1000001', prodCode: 'x'}]}/>}/>
                <Route path="/printproductbybranch" exact element={<PrintProductByBranch/>}/>
                <Route path="/PrintDailyPhysicalInventory" exact element={<PrintDailyPhysicalInventory/>}/>
                <Route path="/PrintInventoryDetailedListing" exact element={<PrintInventoryDetailedListing/>}/>
                <Route path="/PrintJewelrySalesbyPeriod" exact element={<PrintJewelrySalesbyPeriod/>}/>
                <Route path="/PrintJewelryLayaway" exact element={<PrintJewelryLayaway/>}/>
                <Route path="/PrintJewelryConsolidatedbyPeriod" exact element={<PrintJewelryConsolidatedbyPeriod/>}/>
                <Route path="/PrintJewelryItemTracking" exact element={<PrintJewelryItemTracking/>}/>
                <Route path="/PrintJewelryCreditCard" exact element={<PrintJewelryCreditCard/>}/>
                <Route path="/PrintJewelryFlaps" exact element={<PrintJewelryFlaps/>}/>
                <Route path="/PrintVirtualBarcode" exact element={<PrintVirtualBarcode data={[{self: '480000012345', prodCode: 'x'}]}/>}/> */}

                
              


                {/* <Route path="/telecomsub" exact element={<TelecomSub/>}/> */}
                {/* <Route path="/dsgrosub" exact element={<DSGroSub/>}/> */}
                {/* <Route path="/fotonsub" exact element={<FotonSub/>}/> */}
                {/* <Route path="/payrollsub" exact element={<PayrollSub/>}/> */}
                {/* <Route path="/settingssub" exact element={<SettingsSub/>}/> */}

                <Route path="/UserAccounts" exact element={<UserAccounts/>}/>
                {/* <Route path="/register/:id" exact element={<Register/>}/> */}
                {/* <Route path="/signin/:userId" exact element={<SignIn/>}/> */}
                <Route path="/signin" exact element={<SignIn/>}/> 
                <Route path="/SignUpForm" exact element={<SignUpForm/>}/> 
                <Route path="/Register" exact element={<Register/>}/> 
                <Route path="/UserChangePassword" exact element={<UserChangePassword/>}/>
                <Route path="/UserUpdateAccount" exact element={<UserEditAccount/>}/>
                {/* <Route path="/ForgotPassword" exact element={<ForgotPassword/>}/>  */}
                <Route path="/faq" element={<FAQMe />} />
                
                
                {/* <Route path="/accessdenied/:id" exact element={<AccessDenied/>}/> */}
                {/* <Route path="/POSTutorial" exact element={<POSTutorial/>} /> */}

                <Route path="/admin" exact element={<SignInAdmin/>}/> 


                <Route path="/ApplicantsTabs" exact element={<ApplicantsTabs/>}/> 

                <Route path="/TabForm" exact element={<TabForm/>}/> 
                

                {/* <Route path="/SetWeighingScale" exact element={<SetWeighingScale/>}/> */}

                {/* <Route path="/MUIloginform" exact element={<MUIloginForm/>}/> */}
                {/* <Route path="/MUIloginform2" exact element={<MUIloginForm2/>}/> */}
                {/* <Route path="/PrintSample1" exact element={<PrintSample1/>}/> */}
                {/* <Route path="/PrintSample1" exact element={<PrintSample1/>}/> */}
                {/* <Route path="/PrintSample2" exact element={<PrintSample2/>}/> */}
                                {/* <Route path="/viewtables" exact element={<ViewTables data={data}/>}/> */}

                {/* <Route path="/mymessage/:variant, children" exact element={<MyMessage/>}/> */}

                {/* <WebcamPicture data={[{self: self, prodCode: prodCode, test: 'Test1'}]}/> */}
                {/* <Route path="/GetClientIP" exact element={<GetInternetIP/>}/> */}
                {/* <Route path="/test" exact element={<Test/>}/> */}
                {/* <Route path="/supplier" exact element={<Supplier/>}/> */}
                {/* <Route path="/customer" exact element={<Customer/>}/> */}
                {/* <Route path="/class" exact element={<Class/>}/> */}
                {/* <Route path="/class" exact element={<Profile data={[{tableName: 'classes', captionName: 'Class'}]}/>}/> */}
                {/* <Route path="/brand" exact element={<Profile data={[{tableName: 'brand', captionName: 'Brand'}]}/>}/> */}
                {/* <Route path="/colors" exact element={<Profile data={[{tableName: 'colors', captionName: 'Colors'}]}/>}/> */}
                {/* <Route path="/designs" exact element={<Profile data={[{tableName: 'designs', captionName: 'Designs'}]}/>}/> */}
                {/* <Route path="/generic" exact element={<Profile data={[{tableName: 'generic', captionName: 'Generic'}]}/>}/> */}

                {/* <Route path="/managers" exact element={<Managers data={[{tableName: 'managers', captionName: 'Managers/Supervisors'}]}/>}/> */}
                {/* <Route path="/salesrep" exact element={<Profile data={[{tableName: 'generic', captionName: 'Generic'}]}/>}/> */}

                {/* <Route path="/printclass" exact element={<PrintProfile data={[{tableName: 'classes', captionName: 'Class'}]}/>}/> */}
                {/* <Route path="/printbrand" exact element={<PrintProfile data={[{tableName: 'brand', captionName: 'Brand'}]}/>}/> */}
                {/* <Route path="/printcolors" exact element={<PrintProfile data={[{tableName: 'colors', captionName: 'Colors'}]}/>}/> */}
                {/* <Route path="/printdesigns" exact element={<PrintProfile data={[{tableName: 'designs', captionName: 'Designs'}]}/>}/> */}
                {/* <Route path="/printgeneric" exact element={<PrintProfile data={[{tableName: 'generic', captionName: 'Generic'}]}/>}/> */}
                {/* <Route path="/printmanagers" exact element={<ReportList/>}/> */}

                {/* <Route path="/SetWeighingScaleOnOff" exact element={<SetWeighingScaleOnOff/>}/> */}
                
                
                {/* <Route path="/windowsize" exact element={<WindowSize/>}/> */}
                {/* <Route path="/PrintExample1" exact element={<PrintExample1/>}/>
                <Route path="/PrintExampleClass" exact element={<PrintExampleClass/>}/>
                <Route path="/PrintExampleClass2" exact element={<PrintExampleClass2/>}/> */}
                {/* <Route path="/modalSample1" exact element={<modalSample1/>}/> */}



              </Routes>
           </Sidebar>
          {/* <JewelryClass/> */}
          {/* <Main />
          <Footer /> */}
      </div>
       {/* } */}
    </BrowserRouter> 
    // </Provider>
    
  );
}

export default App;
