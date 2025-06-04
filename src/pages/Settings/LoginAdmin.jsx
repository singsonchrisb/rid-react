// LoginForm.js
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate} from "react-router-dom";

import axios from "axios";
import { toast } from "react-toastify";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { TextField,InputAdornment, Button, Typography, Container, Grid, Paper } from '@mui/material';


// import moment from 'moment';
import profile from "../../images/logo192.jpg";
// import profile from "./public/images/logo192.jpg"
// import {
//   getLoginIP,
//   addLoginIP,
//   updateLoginIP,
// } from "../../firebase/queries";
 import { MyServerAPIHost, decryptPWord, delayMe, encryptPWord  } from "../../functions/ChrisFunctions"
import Swal from 'sweetalert2';
// import { GetAPITokenJava, GetMyHeaders }  from '../functions/GetAPIToken';
// import {MyServerHostNodeJS } from '../Functions/MyFunctions';

const LoginForm = () => {
  let navigate = useNavigate();
  let urlAPI = MyServerAPIHost();

  const [userName, setUserName] = useState("admin");
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState("");
  const [showPassword, setshowPassword] = useState(false);

  const [ip, setIP] = useState('');
  const [logIPId, setLogIPID] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  

  const userNameRef = useRef(null);
  const passwordRef = useRef(null);
  // const submitRef = useRef(null);

  // const [datTable, setDataTable] = useState([]);  // data array


    
    useEffect(() => {
      getData();
    }, []);



  const handleShowPassword = () => {
    setshowPassword(!showPassword);
  };
    
  const handleLogin = async () => {
    if (userName==='') {
      toast.error("Login user must be filled up!");
       return userNameRef.current().focus();
    }

    if (password==='') {
      toast.error("Password must be filled up!");
       return passwordRef.current().focus();
    }
    setIsLoading(true);
    let optionBody ={
       userName: userName,
       password: password
    }

    // console.log('optionBody: ', optionBody)

    try {
      // alert('check cridentials ' + urlAPI)
      let res= await axios.post( urlAPI + "/LoginAuth", optionBody);
      let dtRead = res.data.data;
       console.log('Status:',res.status);
       console.log('data: ',dtRead);
      //  alert('stop')
      // alert('client menu')

      if (res.status ===200) {
         
          // if (dtRead.userType !='admin') {
          // if (dtRead.loginName !='admin') {
          //     userNameRef.current.focus();
          //     setIsLoading(false);
          //     return false;
          // } else {
            // alert(dtRead.email);
            sessionStorage.setItem("loginName",encryptPWord(userName));
            sessionStorage.setItem("loginAuth",encryptPWord('khaki'));
            sessionStorage.setItem("email", encryptPWord(dtRead.email));
            sessionStorage.setItem("empno", dtRead.empno);
            sessionStorage.setItem("loginImage",dtRead.image);
            sessionStorage.setItem("userName", encryptPWord(dtRead.firstName +" "+ dtRead.lastName));
            sessionStorage.setItem("login",encryptPWord("True"));
            sessionStorage.setItem('homeOpen',encryptPWord("True"));
            sessionStorage.setItem('accessToken',encryptPWord(res.data.accessToken));

            sessionStorage.setItem('dashb',encryptPWord(dtRead.dashboard));
            sessionStorage.setItem('setti',encryptPWord(dtRead.setting));
            // sessionStorage.setItem('ticketing',encryptPWord(dtRead.ticketing));
            // sessionStorage.setItem('booking',encryptPWord(dtRead.booking));
            sessionStorage.setItem('accessType',encryptPWord('admin'));

            // console.log('accessToken: ',res.data.accessToken)

            // sessionStorage.setItem("email", 'admin@gmail.com');
            // sessionStorage.setItem("empno", '4137');
            // sessionStorage.setItem("userName", 'Chris' +" "+ 'Singson');
            // sessionStorage.setItem("login","True");
            // sessionStorage.setItem('homeOpen',"True");
            // console.log('oAcct: ',oAcct)
            // console.log('oAcct: ',JSON.stringify(oAcct))
            
            // sessionStorage.setItem('loginData', JSON.stringify(oAcct));
            // toast.success(res.data.msg);
            setIsLoading(false);
            // alert('client menu')
            navigate("/");
            window.location.reload();
            // navigate("/userlist");
            // navigate("/");
            
            return true;
          // }
          

      } else {
        // setMsg(res);
        // alert('client errr')
        toast.error(res.status );
        userNameRef.current.focus();
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      if (error.response) {
        // setMsg(error.response.data.msg);
        alert(error.response.data.msg)
        toast.error(error.response.data.msg);
      }
    }

   
    // let oAcct ={
    //     loginName: 'admin',
    //     email: 'admin@gmail.com',
    //     empno: '4137',
    //     userName: 'Chris' +" "+ 'Singson',
    //     dashboard: 1,
    //     settings: 1,
    //     accountType: 8, 
    //     login: true,
    //     homeOpen: true,
    //     lastLogin:moment().format('YYYY-MM-DD HH:mm:ss'),
    // }
    setIsLoading(false);


  //   // Implement your login logic here
  //   // console.log('Logging in with:', email, password);
  //   // alert('Logging in with:' +  email + password)

  //   // alert(decryptPWord('-,+*)GJG'));

  //   if (gAccessToken===null || gAccessToken==='') {
  //       // gAccessToken = sessionStorage.getItem("accessToken"); 
  //       gAccessToken = decryptPWord(sessionStorage.getItem("accessTokenEncryt")); 
  //   }
   

  //  if (email==="") {
  //     toast.error("User name must be filled out!");
  //      empNoRef.current.focus();
  //      return false;
  //   }


  //   if (password==="") {
  //     toast.error("Password must be filled out!");
  //      passwordRef.current.focus();
  //      return false;
  //   }

  //  //  
  
  //   if (gAccessToken===null ) {
  //      toast.error("Please refresh to reload data...");
  //      empNoRef.current.focus();
  //      return false;
  //   }
  //  toast.info("verifying credentials....");
  //  if (logIPId !=='' ||logIPId.length >0) {
  //     //  alert('logIPId: ' + logIPId);
  //     await updateLoginIP(email, logIPId);
  //     // await Update2FBLoginIp(json.data.username, logIPId);
  //  }  

  //  let nEmpNo = Number(email);
  //   try {
  //       await fetch(urlAPI +"/payroll/employees/getEmployeeList/?empID=" + nEmpNo, {
  //       method: 'GET',
  //       headers: GetMyHeaders(gAccessToken),
  //       })
  //       .then((response) => response.json() )
  //       .then((json) => {
  //             //  console.log('employee data1', json.data)
  //             //  console.log('employee data2 ', json.status)
  //             // setDataTable(json.data);
  //            if (Number(json.status) === 200) {
  //               //  alert("API Test Good!" + json.data[0].fname);
  //               if (json.data[0].password.toLowerCase() !==password.toLowerCase()) {
  //                 // alert(decryptPWord(json.data[0].password));
  //                 if (decryptPWord(json.data[0].password).toLowerCase() !==password.toLowerCase()) {
  //                     toast.error('Invalid Password!')
  //                     setLoginStatus("Invalid Password!")
  //                     passwordRef.current.focus();
  //                     return false;
  //                 }
  //               }

  //               if (json.data.status===1) {
  //                   toast.error('Resigned')
  //                   setLoginStatus("Resigned")
  //                   empNoRef.current.focus();
  //                   return false;
  //               } else if (json.data.status===3) {
  //                   toast.error('Suspended')
  //                   setLoginStatus("Suspended")
  //                   empNoRef.current.focus();
  //                   return false;
  //               } else if (json.data.status===4) {
  //                   toast.error('Awol')
  //                   setLoginStatus("Awol")
  //                   empNoRef.current.focus();
  //                   return false;
  //               }
  //               // alert('found!');
  //               sessionStorage.setItem("empno", nEmpNo);
  //               navigate('/payroll/payslip101')
  //            } else {
  //                toast.error("API Error: " + json.status +","+ json.errors===undefined ? json.errors :json.error );
  //                 // alert("API Error: "   + json.errors );
  //                 setLoginStatus("API Error: " + json.status)
  //            }
  //       })
  //   } catch (err) {
  //       toast.error("NO data to load,  " + err );
  //   }
  };


  
  const handleHome = () => {
    // navigate('/');
    navigate(-1);
  };

  const handleEnter = (event) => {
    if (event.key.toLowerCase() === "enter" || event.key.toLowerCase() === "arrowdown") {
       if (event.target.name==="empNo") {
          if (CheckGet(1)) {
             passwordRef.current.focus();
             return true;
          }      
       } else if (event.target.name==="password") {
            if (password ==="") {
               alert("Password must be filled out!");
               passwordRef.current.focus();
               return false;
            } else {
                handleLogin();
                return true;
            }  

       }
    } else if (event.key.toLowerCase() === "arrowup") {
        if (event.target.name==="password") {   
            userNameRef.current.focus();
            return true;
        }  
    } else if (event.keyCode===120) {
          // alert("F9-a");
          event.preventDefault();
          
    } else if (event.keyCode >=112 && event.keyCode <=117) {
             // Turn off Function key F1 to F8
             event.preventDefault();        
    } else if (event.keyCode >=119 && event.keyCode <=123) {
          // Turn off Function key F10 to F12
          event.preventDefault();        
    }
  };
  
  function CheckGet(nMode) {
    if (nMode===1) {
       if (userName ==="") {
          alert("Login name must be filled out!");
          userNameRef.current.focus();
          return false;
      }
    } else if (nMode===3) {  
    
    }
    return true;
  }   

  const getData = async () => {
    // const res = await axios.get("https://api.ipify.org/?format=json");
    // // console.log(res.data);

    // let tIP=res.data.ip;
    // setIP(tIP);

    // let data = await getLoginIP();
    // // console.log('data=1',data)
    // // console.log('data=2',data.data().ip)
    // let lExist=false;         
    // // if (!data===undefined) {
    //       data.forEach((value) => {
    //       // console.log('doc:', doc.data.ip)
             
    //       if(value.ip===tIP) {
    //          // alert('doc.id: ' + value.id +  ",doc.ip: " + value.ip +  ", data.ip: " + tIP)
    //          setLogIPID(value.id);
    //          lExist=true;
    //          // return false;
    //       }
    //       });
    // // }

    // // console.log('res2',res2)
    // if (!lExist) {
    //    //  alert('not exist res.data.ip: ' + res.data.ip)
    //     let docLogInIP = await addLoginIP( {ip: res.data.ip, website:'oroadmin.web.app'});
    //     if (docLogInIP ==='' || docLogInIP===undefined) {
    //     } else { 
    //       //  alert(docLogInIP) ;
    //        setLogIPID(docLogInIP);
    //     }
    // } else {
    //    // alert('exist: ' + res.data.ip)

    // }
  };

  return (
    <>
    {/* <br></br> */}
    {/* <Typography  variant="h5" align="center">Protecting Your Future with Verified Clearance</Typography>  */}
    {/* <br></br> */}
    <Paper style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '360px',
      height: '450px',
      border: '1px solid #ccc',
      padding: '20px',
      borderRadius: '10px'
    }}>
    <Container maxWidth="xs" >
      
      <div>
        <Typography variant="h6" align="center">
            <img src={profile} width="90" height="95" marginTop="2" alt="something"/>
        </Typography>
        <br></br>
        <Typography variant="h4" align="center" gutterBottom >
            Access to Admin
        </Typography>
        <br></br>
        <form >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Login User"
                variant="outlined"
                fullWidth
                name='userName'
                value={userName}
                inputRef={userNameRef}
                onKeyDown={handleEnter}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Login User"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {/* <AccountCircleIcon /> */}
                      <PersonIcon/>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <br></br>
            <Grid item xs={12}>
              <TextField
                label="Password"
                variant="outlined"
                type={!showPassword ? "password" : "text"}
                fullWidth
                name='password'
                value={password}
                inputRef={passwordRef}
                onKeyDown={handleEnter}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="admin12345"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon />
                          </InputAdornment>
                        ),
                        endAdornment:(
                          <InputAdornment
                            position="end"
                            onClick={handleShowPassword}
                          >
                            {!showPassword ? (
                              <VisibilityOff className="password-icon" />
                            ) : (
                              <Visibility className="password-icon" />
                            )}
                          </InputAdornment>
                        )
                      }}
              />
            </Grid>
          </Grid>
          <br></br>
          {/* style={{width:'100px'}} */}
          <Typography variant="h4" align="center" marginTop="10px" > 
              <Button onClick={()=> handleLogin()} variant="contained" fullWidth color="primary"  >
                Sign In 
              </Button>
              {/* <Button style={{width:'100px', marginLeft:'40px'}}  onClick={()=> handleHome()} variant="contained" color="warning" >
                Home
              </Button> */}
          </Typography>
          {/* <Button style={{width:'100px'}} onClick={()=> navigate('/payroll/payslip101')} variant="contained" color="primary"  >
                directly muna
              </Button> */}
          
        </form>
        <br></br>
        <Typography variant="h6" align="center">
           {loginStatus}
        </Typography>
        {/* <Typography variant="h8" align="center" color={'blue'} onClick={()=> alert('not yet done!')}>
            Forgot your password?
        </Typography>
        <br></br> */}
        {/* <Typography variant="h8" align="center" color={'blue'} onClick={()=> alert('not yet done!')}>
            Create Account?
        </Typography> */}
      </div>
    </Container>
     </Paper>
     
     </>
  );
};

export default LoginForm;
