// ChangePasswordForm.js
import React, { useEffect, useState, useRef } from 'react';
import {useNavigate} from "react-router-dom";
import {  Box, TextField, Button, Typography, Container, Grid } from '@mui/material';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import axios from 'axios';

import useSessionStorage from '../../hooks/useSessionStorage ';
import { MyServerAPIHost } from '../../functions/ChrisFunctions';
import useMediaQuery from '../../hooks/useMediaQuery';

let urlAPI = MyServerAPIHost ();


const ChangePasswordForm = () => {
  let loginAuth = useSessionStorage('loginAuth');  // sessionStorage.getItem('loginAuth')); 
  let loginName = useSessionStorage('loginName');
  // let gAccessToken = useSessionStorage("accessToken"); 
  let isDesktop = useMediaQuery('(min-width: 780px)');
  let navigate = useNavigate();  
  // alert(loginAuth)
  // alert(loginName)

  // const [datTable, setDataTable] = useState('');
  // const [self, setIDKey] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const [isCurrentPassword, setIsCurrentPassword] = useState(false)

  const currentPasswordRef = useRef(null);
  const newPasswordRef = useRef(null);
  const confirmPasswordRef = useRef(null);



  useEffect(() => {
    if (loginAuth !=='khaki') {
        navigate("/login")
      }
  }, []);
  
  // useEffect(() => {
  //     loadData();
  // }, []);


  async function CheckGet(nMode) {
    if (nMode===1) {
      
    }

    return true;
  }

  const handleEnter = async (event) => {
    //  alert(event.target.name)
    //  toast.error("Error: dddd" );
    if (event.key.toLowerCase() === "enter") {
      
       if (event.target.name==="currentPassword") {
        let verify = await passwordCheck();  
        // if (!CheckGet(1)) {
        if (!verify) {
             
             currentPasswordRef.current.focus();
             return false;
          } else {
            newPasswordRef.current.focus();
            return true;
          }
          
       } else if (event.target.name==="newPassword") {
          if (!CheckGet(2)) {
            newPasswordRef.current.focus();
             return false;
          } 
          confirmPasswordRef.current.focus();
          return true;
       } else if (event.target.name==="confirmPassword") {
          if (!CheckGet(3)) {
            confirmPasswordRef.current.focus();
            return false;
          } 
          handleSave()
          return true;
       }
    event.preventDefault();
    }
};



const handleSave = async () => {
  // Validation
  // toast.error("Invalid credentials!")
  if (!currentPassword || !newPassword || !confirmPassword) {
    setError('Please fill in all fields.');
    toast.error('Please fill in all fields.');
    return;
  }
  
  if (!isCurrentPassword) {
     let verify= await passwordCheck();
     if (!verify) {
        toast.error("Invalid credentials!")
        currentPasswordRef.current.focus();
        return false;
     }

  }




  if (newPassword !== confirmPassword) {
    setError('New password and confirm password do not match.');
    toast.error('New password and confirm password do not match.');
    return;
  }
  // Implement your change password logic here
  let optionBody ={
    userName: loginName.toLocaleUpperCase(),
    currentPassword: currentPassword,
    password : newPassword,
    confPassword : confirmPassword
  }

  try {
      // let res = await axios.patch(urlAPI + `/updateUserPassword/${self}`, optionBody);
      let res = await axios.patch(urlAPI + "/updateUserPassword", optionBody);
      
      if (res.status ===200) {
         toast.success(res.data.msg);
        //  handleWindowClose(); 
         navigate("/dashboard");
      } else {
        newPasswordRef.current.focus();
        return false;
      }
  } catch (error) {
      if (error.response) {
          setError(error.response.data.msg);
          toast.error(error.response.data.msg);
      }
  }

  // console.log('Changing password...');
}

const handleWindowClose = () => {
  setTimeout(()=>{
    window.location.reload(); 
  }, 100);
  navigate("/dashboard");
}  



// model
  // const loadData = async () => {
       
  //   try {
  //       await fetch(urlAPI + "/userAccountsByUser/" + var_auth.toLocaleUpperCase(), {                
  //         method: 'GET',
  //         // headers: GetMyHeaders(gAccessToken),
  //       })  
  //         .then((response) => response.json() )
  //         .then((json) => {
           
  //          console.log("get results 1:", json.status);    
  //         //  console.log("get results 1:", json.data);    
  //         // alert('id: ' + json.id)
  //          setIDKey(json.data.uuid); 
  //         //  alert(json.data.uuid + ", \n" +json.data.password)
  //          setDataTable(json.data);
  //     })  
  //   } catch (err) {
  //        toast.error("NO data to fetch,  " + err ) ;
  //       // alert("NO data to display,  " + err ) 
  //   }

    
    
  // }


  const passwordCheck = async () => {
    let optionBody = {
        userName: loginName.toLocaleUpperCase(),
        currentPassword: currentPassword
    }
    // console.log('optionBody: ',optionBody)
    try {
      let res= await axios.post( urlAPI + "/passwordCheck", optionBody);
      // console.log(res.status,res.data)
      if (res.status ===200) {
          // toast.success(res.data.msg);
          setIsCurrentPassword(true);
          newPasswordRef.current.focus();
          return true;
      } else {
          setIsCurrentPassword(false);
          toast.error("Error: " + res.data.msg);
          setError(res.data.msg);
          currentPasswordRef.current.focus();
          return false;
      }
  } catch (error) {
      if (error.response) {
        setError(error.response.data.msg);
        toast.error(error.response.data.msg);
      }
  }    
       
    
  }

  
  // disableGutters={true} fixed={true}

  return (

    <main id= {isDesktop ? 'main':'mobile'}>
      <Container maxWidth="xs" style={{width: isDesktop ? '450px' : '96%'}} >
        <Box border={1} borderRadius={2} borderColor="primary.main" p={2} position="relative">
            {/* <div style={{ position: 'absolute', top: 10, right: 0 }}> */}
              <IconButton onClick={handleWindowClose} aria-label="close" sx={{ position: 'absolute', top: 0, right: 0 }}> 
              <CloseIcon /> 
              </IconButton>
              {/* <FaWindowClose className='windowclose-buttonw' onClick={() => handleWindowClose()}/>   */}
            {/* </div>   */}
            <br/>
            <div>
              <Typography variant="h5" align="center" gutterBottom>
                Change Password
              </Typography>
              <br/>
              
              {/* <form> */}
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Current Password"
                      name="currentPassword"
                      variant="outlined"
                      type="password"
                      fullWidth
                      value={currentPassword}
                      inputRef={currentPasswordRef}
                      onKeyDown={handleEnter}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="New Password"
                      name="newPassword"
                      variant="outlined"
                      type="password"
                      fullWidth
                      value={newPassword}
                      inputRef={newPasswordRef}
                      onKeyDown={handleEnter}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Confirm New Password"
                      name='confirmPassword'
                      variant="outlined"
                      type="password"
                      fullWidth
                      value={confirmPassword}
                      inputRef={confirmPasswordRef}
                      onKeyDown={handleEnter}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </Grid>
                </Grid>
                {error && <Typography color="error" variant="body2">{error}</Typography>}
                <br/>
                <br/>
                {/* <Button type="submit" variant="contained" color="primary" fullWidth>
                  Change Password
                </Button> */}
                {/* <Button type="submit" variant="contained" color="success">
                  Update Password
                </Button>
                <Button type="submit" variant="contained" color="secondary">
                  Cancel
                </Button> */}

                  {/* <div className="controls" style={{ width: "95%", textAlign: 'center'}}> */}
                  <div className="controls" style={{ width: "100%", textAlign: 'center'}}>
                    <Button style ={{width:'100px', textTransform: 'none'}} type="button" variant="contained" color="success" onClick={() => handleSave()}>
                      Save
                    </Button>
                    <Button style ={{marginLeft: isDesktop ? '40px' :'15px', width:'100px',textTransform: 'none', backgroundColor: '#DC4C64'}} variant="contained" onClick={() => handleWindowClose()}>
                      Cancel
                    </Button>
                  </div>
                  <br/>
              {/* </form> */}
            </div>
        </Box>
      </Container>
    </main>
  );
};

export default ChangePasswordForm;
