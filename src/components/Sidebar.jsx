

import React from 'react';
import {useState, useEffect} from 'react';
// import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import {IsMobile} from '../components/MyScreen';
// import { IsMobile } from "./IsMobile";
import {isMobile} from 'react-device-detect';
import { ToastContainer } from "react-toastify";
import { toast } from 'react-toastify';
import { Dropdown } from 'react-bootstrap';
import storage  from '../api/firebase.js';
import { ref, getDownloadURL } from 'firebase/storage'; 

//import { IconName } from "react-icons/fa";
// FaUserAlt,FaArrowRight,FaAngleDoubleRight,FaCaretSquareRight, FaJira,FaTh,FaRegChartBar,FaCommentAlt,FaShoppingCart,FaArrowAltCircleRight,FaChevronCircleRight,FaCarSide,FaMobile,FaTruckMoving,FaWindows, FaGoodreadsG,FaSignOutAlt,
import imgLogo from "../images/ORO.png";
// import imgChris from "../images/chris.jpg";
// import imgUser  from "../images/user.png";
import imgUser  from "../images/user.jpg";
// uploadBytesResumable,
import {
    FaThList,
    FaBars,
    FaShoppingBag,
    FaArrowCircleRight,
    FaGem,
    FaMobileAlt,
    FaTruck,
    FaPeopleArrows,
    FaTools,
}
from "react-icons/fa";
import { decryptPWord, delayMe, encryptPWord, MyServerHostJava } from '../pages/Functions/MyFunctions.jsx';
import { GetAPITokenJava, GetMyHeaders } from '../pages/Functions/GetAPIToken.jsx';


// import { getAllByPlaceholderText } from "@testing-library/react";

let dbServerHostJava = MyServerHostJava();



// const logoRound = {
//     fontSize: '26px',
//     /* margin-top:auto; */
//     marginTop: '5px',
//     borderRadius: '100ch', 
//   }
  

// let isAccess= false;
// var imgProfile="";
// var var_auth="";
// let gToken="F";
// let gDashboard ="F";
// let gJewelry="F";
// let gTelecom="F";
// let gDSGro="F";
// let gPayroll ="F";
// let gFoton="F";
// let gSettings="F";
// let dbServerHost = MyServerHost();



const Sidebar =({children}) => {
    // const [homeOpen, setHomeOpen] = useState('');
    // let var_auth = decryptPWord(sessionStorage.getItem('loginName'));
    let gAccessToken = decryptPWord(sessionStorage.getItem("accessToken"));
    let loginName = decryptPWord(sessionStorage.getItem("loginName"));
    // alert(loginName)
    let auth =loginName;
    let gSettings = decryptPWord(sessionStorage.getItem('setti'));
    // let homeOpen = decryptPWord(sessionStorage.getItem('homeOpen'));
    let gLogIn = decryptPWord(sessionStorage.getItem('login'));
        // gToken= sessionStorage.getItem("accessToken");
    let gDashboard = decryptPWord(sessionStorage.getItem('dashb'));
    let gJewelry = decryptPWord(sessionStorage.getItem('jewel'));
    let gTelecom = decryptPWord(sessionStorage.getItem('telec'));
    let gDSGro = decryptPWord(sessionStorage.getItem('dsgro'));
    let gPayroll = decryptPWord(sessionStorage.getItem('payro'));
    let gFoton = decryptPWord(sessionStorage.getItem('foton'));
    let gEmpNo = sessionStorage.getItem('empno');
    

    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    // const [auth, setAuth] = useState(var_auth);
    // const [homeOpen, setHomeOpen] = useState(homeGet);

    const [imageUser, setImageUser] = useState(imgUser);

    // const [user, setUser] = useState('');
    
    // let navigate = useNavigate(); // use for Navigation
    // const [products, setProduct] = useState([]);

    

    //const [isAccess, setIsAccess] = useState(false);
    //const [isAccessJewelry, setIsAccessJewelry] = useState(true);
    //const [isAccessTelco, setIsAccessTelco] = useState(false);

    // let element= state? <a href={url}>LinkedIn handle</a>
    //               : <p>No handle exists for this user!</p>

    const menuItem=[
        {
            path: checkAccess("/JewelryPOSDashboard"),
            name:"Dashboard",
            icon:<FaThList/>,
            icon2: ""
        },
        {
            path:checkAccess("/jewelrysub"),
            name:"Jewelry",
            icon:<FaGem/>,
            icon2:<FaArrowCircleRight/>
        },
        {
            path:checkAccess("/telecomsub"),
            name:"Telecom",
            icon:<FaMobileAlt/>,
            icon2:<FaArrowCircleRight/>
        },
        {
            path:checkAccess("/dsgrosub"),
            name:"Drugstore Grocery",
            icon:<FaShoppingBag/>,
            icon2:<FaArrowCircleRight/>
        },
        {
            path:checkAccess("/fotonsub"),
            name:"Foton",
            icon:<FaTruck/>,
            icon2:<FaArrowCircleRight/>
        },
        {
            path:checkAccess("/payrollsub"),
            name:"Payroll",
            icon:<FaPeopleArrows/>,
            icon2:<FaArrowCircleRight/>
        },
        {
            path:checkAccess("/settingssub"),
            name:"Settings",
            icon:<FaTools/>,
            icon2:""
        },
        {
            path:"/JewelryPOSDashBoard",
            name:"",
            icon:"",
            icon2:""
        },
        {
            path:"/JewelryPOSDashBoard",
            name:"",
            icon:"",
            icon2:""
        },
        // {
        //     path:"/signout",
        //     name:"Logout",
        //     icon:<FaSignOutAlt/>,
        //     icon2:""
        // }


    ]
    //icon:<FaThList/>,
    //borderStyle:'outset'
   // #bdb76b color dark kkaki
    const styleRigthBox = {border: '2px solid lightblue',borderRadius:'2%',borderColor:'lightblue',width:"190px", height:"400px", marginTop:"20px",backgroundColor: '#f8f8ff' }
    // const styleBoxCetenter = {
    //     margin: 'auto',
    //     marginTop: '20px',
    //     width: '60%',
    //     height: '500px',
    //     border: '2px solid gray',
    //     padding: '0px 0px',
    //   }
    // let navigate = useNavigate(); // use for Navigation

    // imgProfile=imgSmiley;

      useEffect(() => {
        let tPath = window.location.pathname.trim();
        if (tPath==='/PrintVirtualBarcode' || tPath==='/PrintSalesbyPeriod' || tPath==='/loginform' ) {
            // by pass
        } else {
            if(!loginName)  {
                // || decryptPWord(sessionStorage.getItem("homeOpen")) === "HomeClosed")
               // Navigate("/signin")
                // alert(window.location.pathname)
                //  sessionStorage.getItem("loginName")
               navigate("/")
            }
        }
        // && homeOpen
      }, []);

    //   useEffect(() => {
    //     setAuth(var_auth);
    //      setHomeOpen(homeGet);
    //  },[]);

     useEffect(() => {
        if (gEmpNo !=='' && gLogIn ==='True' && !sessionStorage.getItem("RolesDetail")) {
            //  alert(gEmpNo);
            loadAccountsDetail(gEmpNo);
        }
        loadPicture();
    }, []);

     
     const loadPicture = async () => { 
        const filePict  =auth.toLowerCase();  
        const fileRef = ref(storage, 'users/'+filePict + '.png');
        // console.log("fileww pic1", filePict)
        // console.log("fileww pic2", filePict.toLowerCase())
        // console.log("loadww fb pic", fileRef)
        const photoURL = await getDownloadURL(fileRef);
        setImageUser(photoURL);
       //  console.log("test pic", photoURL)
       
      }

      const refreshPage = ()=>{
        window.location.reload();
      }
      
      const handleLogOut = () => {
         sessionStorage.clear();
         sessionStorage.removeItem("loginName");
         sessionStorage.removeItem("userName");
         sessionStorage.removeItem("email");
         sessionStorage.removeItem("accountType");
         sessionStorage.removeItem("assignBranch");
         sessionStorage.removeItem("accessToken"); 
         sessionStorage.setItem("homeOpen",encryptPWord("HomeOpen"));
         sessionStorage.setItem("login",encryptPWord("False"));
        //  window.location.reload();
         navigate("/");
      }
          

    const imageClick = () => {
        // sessionStorage.removeItem("homeOpen");
        // setHomeOpen("");
        // navigate('/');
    }
   
    let signInOut = auth ? "Sign Out" : "Sign In";
    
    // let varWelcome= auth ? "Welcome: " : "";
    // const notify = () => toast.success("Hello There!");

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
                       // sessionStorage.setItem("RolesTemp", json1);
                    } else {
                       toast.error("Error: Account Details... " + json.status)
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
               toast.error("Error Roles, NO accounts details data to fetch : " + tEmpno)
              //  console.log("err Roles Detail:d " , err + "  " +tEmpno);    
              //  alert("Error Roles, empty account details : " + tEmpno)
          }
    }

    

  return (
    //<Container fluid>   
    
// style={{width:'100px', height:'20px'}}
    <div >
        
        {/* <div>
        <button onClick={notify}>Notify</button> */}
        <ToastContainer/>
        {/* </div> */}

        {/* <ToastContainer
            className="toast-position"
            position="top-center"
            autoClose={1}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}1
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            /> */}
        {/* <div className="header">
           <img src={"../images/ORO.JPG"} width="10" height="5" />
            <p className="name">heading name</p>
        </div> */}
        {/* <img src={imgLogo} width="50" height="50" alt="something"/> */}

              

        {gLogIn==='False' || decryptPWord(sessionStorage.getItem('login')) ==='False' ? ( 
            <div className='top_title'>
                 {/* visible account */}
            </div>
        ):
            <div>
                { auth ? (
                    // id="dropdown-basic"
                <Dropdown style={{ marginTop: "0px", textAlign: 'center', float: 'right', marginRight: '50px'}}>
                <Dropdown.Toggle className='chrich-dropdown-toggle'>
                {/* <img src={getImageProfile(auth)} className='logo' width="26" height="26" alt="" onClick={() => imageClick()}/> */}

                <img src={imageUser} className='logo' width= {isMobile ? "15":"26"} height={isMobile ? "25":"26"}  alt="" onClick={() => imageClick()}/>
                {/* <span className='chrich-dropdown-toggle-span' style={{fontSize:'13px' }}>Reports</span> */}
                <span style={{marginRight:'5px' }}></span>
                {/* <a href="#top" style={{ marginleft: "10px" }}>{auth}</a> */}
                {/* <a href="#top" style={{ marginleft: "20px"  }}>{auth}</a> */}
                <label style={{ marginleft: "20px"}}>{auth}</label>
                <span style={{marginRight:'5px'}}></span>

                </Dropdown.Toggle>
                
                <Dropdown.Menu>
                    <Dropdown.Item href="/UserEditAccount">Edit Account</Dropdown.Item>
                    <Dropdown.Item href="/UserChangePassword">Change Password</Dropdown.Item>
                    <Dropdown.Item onClick={refreshPage} >Refresh Page</Dropdown.Item>
                    {/* <Dropdown.Item href="/signin">Sign Out</Dropdown.Item> */}
                    <Dropdown.Item onClick={handleLogOut}>Sign Out</Dropdown.Item>
                    {/* <Dropdown.Item href="/class">Class</Dropdown.Item>
                    <Dropdown.Item href="/brand">Brand</Dropdown.Item> */}
                </Dropdown.Menu>
                </Dropdown>
                // <a style={{marginTop: "5px", marginLeft: "1px" }}>{varWelcome} {auth}</a> 

                ) :
                <div style={{ display: 'flex', marginTop: "0px", marginLeft: isMobile ? "1%" : "40%" }}>
                    {/* <a href="/register/:''" className='linkSide' >Register</a> */}
                    <a href="/signin"  className='linkSide' >{signInOut}</a>
                    {/* <a href="/homepage"  className='linkSide' >Home Page</a> */}
                    {/* <a href="/" className='linkSide' >Home Page</a>  */}
                </div>
                } 
            </div>
        }
        
        {gLogIn==='False'  || decryptPWord(sessionStorage.getItem('login')) ==='False' ? ( 
            <div className='top_title'>
                {/* visible oro top title */}
            </div>
        ):
            <div className='top_title'>   
                <img src={imgLogo} className='logo' width= {isMobile ? "15":"40"} height={isMobile ? "15":"40"} alt="ORO" onClick={() => imageClick()}/>

                {/* <h3 className='top_header' style={{alignContent: 'center',color: 'khaki' }} > */}

                {/* <div style={{ position:'absolute', marginLeft:'50px', marginTop:'-40px',color: 'khaki' }}>
                     <h4>ORO Wonder Drug</h4>
                </div> */}
                { isMobile ? (
                    // <h4 style={{ position:'absolute', marginLeft:'50px', marginTop:'-20px',color: 'khaki' }} >ORO Wonder Drug</h4>
                    ""
                ) :
                    <h3 style={{ position:'absolute', marginLeft:'50px', marginTop:'-40px',color: 'khaki' }} >ORO Wonder Drug</h3>
                }
                
                

            </div>
        }

        
        <div className='container2'>
            { auth ? (
                <div className="sidebar" style={{width: isOpen ? "180px":"40px"  }} >
                    <div className='top_section'>
                        <h1 style={{display: isOpen ? "block" : "none"}} className='logo'>Main</h1>
                        <div style={{marginLeft: isOpen ? "30px" : "0px"}} className='bars'>
                            <FaBars onClick={toggle}/>
                        </div>
                    </div>
                    
                    {/* div id={if (condition) { 'msg' }}>Hello World!</div> */}

                    {
                        menuItem.map((item, index)=>(
                            // isAccess ? item.path : "/error"

                            <NavLink to={item.path} key={index} className={({ isActive}) => isActive ? "link" : "link" } >
                                <div className='icon'>{item.icon}</div>
                                <div style={{display: isOpen ? "block" : "none"}} className='link_text2' >{item.name} </div> 
                                <div style={{display: isOpen ? "block" : "none"}} className='icon'>{item.icon2}</div>
                                {/* <div style={{display: isOpen ? "block" : "none"}} className='icon'>></div> */}
                            </NavLink>

                        ))
                    }
                </div>
            ) :
                <div>
                    {/* <h1>terfdskfdkfldk</h1> */}
                </div>
            }
            
            
            <main>{children}</main>


            <div style={{background:'#f8f8ff'}}>
                
                { auth ? (
                    DisplayDepartAccess(auth)
                 ) :
                    <div>
                       {/* <h1>testing no auth</h1> */}
                    </div>    
                 }
            
                
                
            </div>
        
        </div>
             
    </div>

    //</Container>
  );


  function checkAccess (itemPath)  {
    const str = itemPath;
    //remove "/"
    const result = str.substring(1); 
    var retVal = "/accessdenied/:" + result
    // alert(result)
    //console.log("Test1;",products.login_name);
        //products.login_name;
    if (itemPath === "/dashboard" || itemPath === '/JewelryPOSDashboard') {
        // alert(result)
        if (gDashboard==="1") {retVal = itemPath};  
    } else if (itemPath === "/jewelrysub") {
        //if (gJewelry==="1") { retVal = "/jewelrysub"};
        //    if (gJewelry==="1") { retVal = itemPath};
        retVal = itemPath;
    } else if (itemPath === "/telecomsub") {
        if (gTelecom==="1") { retVal = itemPath};
    } else if (itemPath === "/dsgrosub") {
            if (gDSGro==="1") { retVal = itemPath};    
    } else if (itemPath === "/payrollsub") {
            if (gPayroll==="1") { retVal = itemPath};        
    } else if (itemPath === "/fotonsub") {
            if (gFoton==="1") { retVal = itemPath};        
    } else if (itemPath === "/settingssub") {
            if (gSettings==="1") { retVal = itemPath};            
            // retVal = itemPath;
    };
        //isAccess=retVal
        //console.log (retVal)
        return retVal;
  };

  function DisplayDepartAccess(cAuthName) {
    if (cAuthName.toString().toLowerCase() ==='chris-for cehcking') {
        return (<div style={styleRigthBox}>
            <div style={{marginLeft:"10px"}}>
                {/* <h4>Token: {gToken}</h4>  */}
                <h4>Dashboard: {gDashboard}</h4> 
                <h4>Jewelry:  {gJewelry}</h4> 
                <h4>Telecom:  {gTelecom}</h4> 
                <h4>DS/Gro: {gDSGro}</h4> 
                <h4>Pyroll:  {gPayroll}</h4> 
                <h4>Foton:  {gFoton}</h4> 
                <h4>Settings:  {gSettings}</h4> 
            </div>
        </div>)
    }
  };

//   function getImageProfile(cAuthName) {
//     if (cAuthName.toString().toLowerCase() ==='chris') {
//         // return ( imgProfile = imgChris)
//         return (imgChris)
//     } else {    
//         // return ( imgProfile = imgUser)
//         return (imgUser)
//     }

//   };

};

export default Sidebar;

