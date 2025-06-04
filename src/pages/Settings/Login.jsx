// LoginForm.js
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate} from "react-router-dom";
import ReactPlayer from 'react-player';

import { toast } from "react-toastify";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { TextField,InputAdornment, Button, Typography, Container, Grid, Paper } from '@mui/material';
import Swal from 'sweetalert2';


// import moment from 'moment';
import profile from "../../images/logo192.jpg";
// import profile from "./public/images/logo192.jpg"
// import {
//   getLoginIP,
//   addLoginIP,
//   updateLoginIP,
// } from "../../firebase/queries";
import { MyServerAPIHost, decryptPWord, delayMe, encryptPWord  } from "../../functions/ChrisFunctions"
import { loginWithEmail } from '../../api/auth';



const LoginForm = () => {
  let navigate = useNavigate();

  // const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("admin@gmail.com");
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState("");
  const [showPassword, setshowPassword] = useState(false);

  // const [ip, setIP] = useState('');
  // const [logIPId, setLogIPID] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [message, setMessage] = useState("");
  

  const userNameRef = useRef(null);
  const passwordRef = useRef(null);
  // const submitRef = useRef(null);

  // const [datTable, setDataTable] = useState([]);  // data array

    // sessionStorage.removeItem("loginImage");
    
    useEffect(() => {
      getData();
    }, []);



  const handleShowPassword = () => {
    setshowPassword(!showPassword);
  };


  const handleLogin = async (e) => {
    // e.preventDefault();
    //  sessionStorage.removeItem('loginImage');
    if (userName==='') {
      toast.error("Login email must be filled up!");
       return userNameRef.current().focus();
    }

    if (password==='') {
      toast.error("Password must be filled up!");
       return passwordRef.current().focus();
    }

    setIsLoading(true);
    const result = await loginWithEmail(userName, password);
    //  console.log('result:',result)
    //  console.log('result:',result.photoURL)
    if (result.success) {
      setMessage("Login successful!");
      // Proceed to dashboard or save token
      // console.log(result);
      // console.log(result.token);
      //  alert('login0')
   
          sessionStorage.setItem("loginName",encryptPWord(result.userName));
          sessionStorage.setItem("loginAuth",encryptPWord('khaki'));
          sessionStorage.setItem("email", encryptPWord(userName));
          sessionStorage.setItem("empno", result.uid);
          sessionStorage.setItem("loginImage",result.photoURL);
          sessionStorage.setItem("userName", encryptPWord(result.firstName +" "+ result.lastName));
          sessionStorage.setItem("login",encryptPWord("True"));
          sessionStorage.setItem('homeOpen',encryptPWord("True"));
          sessionStorage.setItem('accessToken',encryptPWord(result.token));

          sessionStorage.setItem('dashb',encryptPWord(1));
          sessionStorage.setItem('setti',encryptPWord(1));
          sessionStorage.setItem('ticketing',encryptPWord(1));
          sessionStorage.setItem('booking',encryptPWord(1));
          sessionStorage.setItem('accessType',encryptPWord('members'));

      // alert(result.photoURL)
      setIsLoading(false);
      // alert('login1')
      navigate("/");
      window.location.reload();
      return true;

    } else {
      setMessage(`Error: ${result.errorMessage}`);
      userNameRef.current.focus();
      setIsLoading(false);
      return false;
    }
  };
      
const handleSignUp = () => {
    navigate('/signupform');
};

const handleWindowClose = () => {
    navigate('-1');
} 

const handleEnter = (event) => {
    if (event.key.toLowerCase() === "enter" || event.key.toLowerCase() === "arrowdown") {
       if (event.target.name==="empNo") {
          if (CheckGet(1)) {
             passwordRef.current.focus();
             return true;
          }      
       } else if (event.target.name==="password") {
            if (password ==="") {
               Swal.fire("Password must be filled out!");
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
          Swal.fire("Login name must be filled out!");
          userNameRef.current.focus();
          return false;
      }
    } else if (nMode===3) {  
    
    }
    return true;
  }   

  
  return (
    <>
    {/* <br></br> */}
    <Typography  variant="h5" align="center">Protecting Your Future with Verified Clearance</Typography> 
    {/* <br></br> */}
    <Paper style={{
      border: '1px solid #ccc',
      borderRadius: 8,
      borderColor: "lightgray",
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '360px',
      height: '460px',
      padding: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    }}>
    <Container maxWidth="xs"
    
     >
      <div>
        <Typography variant="h6" align="center">
            <img src={profile} width="90" height="60" marginTop="2" alt="something"/>
        </Typography>
        <br></br>
        <Typography variant="h4" align="center" gutterBottom >
            Sign In
        </Typography>
        <br></br>
        <form >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Login Email"
                variant="outlined"
                fullWidth
                name='userName'
                value={userName}
                inputRef={userNameRef}
                onKeyDown={handleEnter}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Login Email"
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
          <Typography variant="h4" align="center"> 
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
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Create Account? <span style={{marginLeft: '5px', color: 'blue', cursor: 'pointer',textDecoration: 'underline' }}   onClick={() => handleSignUp() } onMouseEnter={(e) => e.target.style.color = 'brown'} onMouseLeave={(e) => e.target.style.color = 'blue'}> Sign Up here </span>
        </Typography>
        <Typography variant="body2" align="center" sx={{ mt: 2, alignItems: 'center', }}>
          <span style={{ color: 'darkred', cursor: 'pointer', fontSize:'16px',textDecoration: 'underline' }}   onClick={() => handleWindowClose() } onMouseEnter={(e) => e.target.style.color = 'brown'} onMouseLeave={(e) => e.target.style.color = 'blue'}  > Back </span>
        </Typography>
        
        
      </div>
    </Container>
     </Paper>

      <div style={{ marginRight: '20px' }}>
           <ReactPlayer url='https://www.youtube.com/watch?v=hYKZMWjQvEM' width='100px' height='100px' />
      </div>
     
     </>
  );
};

export default LoginForm;
