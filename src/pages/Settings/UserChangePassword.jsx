
// ChangePasswordForm.js
import React, { useEffect, useState, useRef } from 'react';
import {useNavigate} from "react-router-dom";
import {  Box, TextField, Button, Typography, Container, Grid } from '@mui/material';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
// import axios from 'axios';

import useSessionStorage from '../../hooks/useSessionStorage ';
import { decryptPWord, MyServerAPIHost } from '../../functions/ChrisFunctions';
import useMediaQuery from '../../hooks/useMediaQuery';
import Swal from 'sweetalert2';
import { changePasswordWithReauth } from '../../api/changePasswordWithReauth';

// let urlAPI = MyServerAPIHost ();


const ChangePasswordForm = () => {
  let loginAuth = useSessionStorage('loginAuth');  // sessionStorage.getItem('loginAuth')); 
  let loginName = useSessionStorage('loginName');
  let gUserType = decryptPWord(sessionStorage.getItem('accessType'));
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
        navigate(gUserType==='admin' ? '/admin':'/login');
      }
  }, []);
  
  

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
            newPasswordRef.current.focus();
            return true;
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
  
  if (!currentPassword || !newPassword || !confirmPassword) {
    setError('Please fill in all fields.');
    toast.error('Please fill in all fields.');
    return;
  }
  
  
  if (newPassword !== confirmPassword) {
    setError('New password and confirm password do not match.');
    toast.error('New password and confirm password do not match.');
    return;
  }
  // Implement your change password logic here
  // let optionBody ={
  //   userName: loginName.toLocaleUpperCase(),
  //   currentPassword: currentPassword,
  //   password : newPassword,
  //   confPassword : confirmPassword
  // }

  const result = await changePasswordWithReauth(currentPassword, newPassword);
  Swal.fire({
    icon: result.success ? "success" : "error",
    title: result.success ? "Success" : "Error",
    text: result.message,
    showConfirmButton: true,         // show OK button
    allowEnterKey: true,             // allow Enter to confirm
    timer: 5000,                     // auto-close after 2.5s (optional)
    willClose: () => {
      // optional callback when it closes
      if (result.success) {
        // setSuccess(true);
      }
    }
  });

  if (result.success) {
     navigate("/dashboard");
  } else {
    setError(result.message);
    // newPasswordRef.current.focus();
    return false;
  }
  
}

const handleWindowClose = () => {
  setTimeout(()=>{
    window.location.reload(); 
  }, 100);
  navigate("/dashboard");
};  


  return (
// borderColor="primary.main"
    <main id= {isDesktop ? 'main':'mobile'}>
      <Container maxWidth="xs" style={{width: isDesktop ? '450px' : '96%'}} >
        <Box boxShadow={5} border={1} borderRadius={2} borderColor="lightgray" p={2} position="relative">
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
