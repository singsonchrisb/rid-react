// npm install @mui/material @emotion/react @emotion/styled formik yup
// SignUpForm.js
import React from 'react';
import { TextField, Button, Box, Typography, Link, alertTitleClasses,Container ,Grid} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
// import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import {IconButton} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
// import { isMobile } from 'react-device-detect';
 import { useMediaQuery } from '@mui/material';
 
// import { MyServerAPIHost, decryptPWord, delayMe, encryptPWord  } from "../../functions/ChrisFunctions"
import { registerUserProfile } from '../../api/userApi';



const validationSchema = Yup.object({
  userName: Yup.string().required('User name is required'),
  email: Yup.string().email('Enter a valid email').required('Email is required'),
  password: Yup.string().min(8, 'Password should be of minimum 8 characters length').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
  companyId: Yup.string().required('Company ID is required'),  
  lastName: Yup.string().required('Last name is required'),
  firstName: Yup.string().required('First name is required'),
});

const SignUpForm = () => {
  let navigate = useNavigate(); // use for Navigation
  // const isMobile = useMediaQuery('(max-width:600px)');
  let isDesktop = useMediaQuery('(min-width: 780px)');  
  let gColumnNo = isDesktop ? 6 : 12;

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      userName: '',
      companyId: '',
      lastName: '',
      firstName: '',
      mobileNo: '',
      photoURL:''
    },
    // validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
           let response = await registerUserProfile({
          email: values.email,
          password: values.password,
          userName: values.userName.toUpperCase(),
          companyId: values.companyId,
          lastName: values.lastName,
          firstName: values.firstName,
          phoneNumber: values.mobileNo,
          photoURL:''
        });
  
        console.log('saving', response);
        // alert('2');
  
        if (response.success === true) {
          
          Swal.fire({
            title: "Registration successful",
            text: "Click the OK button to continue",
            icon: "success",
            timer: 5000,
            timerProgressBar: true,
            allowEnterKey: true,
            confirmButtonText: "OK"
          });
          navigate('/signin');
          return true;
        } else {
          Swal.fire({
            title: "Unsuccessful",
            // text: "Click the OK button to continue",
            text: response.message,
            icon: "error",
            timer: 5000,
            timerProgressBar: true,
            allowEnterKey: true,
            confirmButtonText: "OK"
          });
        }
      } catch (error) {
        console.log('error in saving', error.response, error);
  
        if (error.response) {
          setErrors({ api: error.response.data.message });
        } else {
          setErrors({ api: 'An error occurred. Please try again later.' });
        }
      } finally {
        setSubmitting(false);

      }
    }
  });
  

  

  const handleLogIn = () => {
    navigate('/signin');
  }

  const handleWindowClose = () => {
    setTimeout(()=>{
      window.location.reload(); 
    }, 500);
    navigate('/home');
} 

  return (
    
    <Container style={{width: isDesktop ? '600px' : '355px',height : isDesktop ? '520px' : '98%', marginTop:'10px'}} >
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      boxShadow={5} border={1} borderRadius={2} borderColor="lightgray" p={3} position="relative"
      // sx={{
      //   display: 'flex',
      //   flexDirection: 'column',
      //   alignItems: 'center',
      //   width: '100%',
      //   // maxWidth: isMobile ? '98%':'400px',
      //   maxWidth: { xs: '98%', sm: '400px' }, // xs = mobile, sm and up = fixed
      //   margin: '0 auto',
      //   marginTop: '2rem',
      //   padding: '2rem',
      //   backgroundColor: '#fff',
      //   borderRadius: '8px',
      //   boxShadow: 3,
      //   position: 'relative',
      // }}
    >
    <IconButton className='windowclose-button' sx={{
      position: 'absolute',
      top: 8,
      right: 8,
      }}
      onClick={() => handleWindowClose()} >
      <CloseIcon />
    </IconButton>   
       <Typography variant="h4" component="h1" gutterBottom sx={{ fontSize: { xs: '1.8rem', sm: '2.2rem', marginBottom:'20px' } }}>
        Sign Up
      </Typography>
      {/* <Grid container spacing={2} gutterBottom > */}
      {/* <Grid item xs={6}> */}
      <Grid container spacing={2} >
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                sx={{ marginTop: '10px', marginLeft: '17px' }} // <-- Correct way to add margin-left
              />
          

       <Grid item xs={gColumnNo}> 
      <TextField
        fullWidth
        id="password"
        name="password"
        label="Password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        // margin="normal"
      />
      </Grid>
      <Grid item xs={gColumnNo}>
      <TextField
        fullWidth
        id="confirmPassword"
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
        // margin="normal"
      />
      </Grid>
      <Grid item xs={gColumnNo}>
      <TextField
        fullWidth
        id="userName"
        name="userName"
        label="User Name"
        value={formik.values.userName}
        onChange={formik.handleChange}
        error={formik.touched.userName && Boolean(formik.errors.userName)}
        helperText={formik.touched.userName && formik.errors.userName}
        // margin="normal"
      />
      </Grid>
      <Grid item xs={gColumnNo}>
      <TextField
        fullWidth
        id="companyId"
        name="companyId"
        label="Company ID"
        value={formik.values.companyId}
        onChange={formik.handleChange}
        error={formik.touched.companyId && Boolean(formik.errors.companyId)}
        helperText={formik.touched.companyId && formik.errors.companyId}
        // margin="normal"
      />
      </Grid>
      <Grid item xs={gColumnNo}> 
      <TextField
        fullWidth
        id="lastName"
        name="lastName"
        label="Last Name"
        value={formik.values.lastName}
        onChange={formik.handleChange}
        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
        helperText={formik.touched.lastName && formik.errors.lastName}
        // margin="normal"
      />
      </Grid>
      <Grid item xs={gColumnNo}> 
      <TextField
        fullWidth
        id="firstName"
        name="firstName"
        label="First Name"
        value={formik.values.firstName}
        onChange={formik.handleChange}
        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
        helperText={formik.touched.firstName && formik.errors.firstName}
        // margin="normal"
      />
      </Grid>
      <Grid item xs={gColumnNo}> 
      <TextField
        fullWidth
        id="mobileNo"
        name="mobileNo"
        label="Mobile  Number"
        value={formik.values.mobileNo}
        onChange={formik.handleChange}
        error={formik.touched.mobileNo && Boolean(formik.errors.mobileNo)}
        helperText={formik.touched.mobileNo && formik.errors.mobileNo}
        // margin="normal"
      />
     </Grid>
        <Button color="primary" variant="contained" fullWidth type="submit" sx={{ mt: 3, ml: 2 }}>
          Submit
        </Button>
      </Grid>

      <Typography variant="body2" sx={{ fontSize:'15px', display: 'flex', alignItems: 'center',justifyContent: 'center', mt: 2, textAlign: 'center', }}>
         Already have an account? <span style={{fontSize:'15px', marginLeft: '5px', color: 'blue', cursor: 'pointer',textDecoration: 'underline' }}   onClick={() => handleLogIn() } onMouseEnter={(e) => e.target.style.color = 'brown'} onMouseLeave={(e) => e.target.style.color = 'blue'}> Log in here </span>
      </Typography>
      
      <Typography variant="body2" sx={{ mt: 2, alignItems: 'center',justifyContent: 'center',textAlign: 'center', }}>
         {/* Back to home? <span style={{ color: 'blue', cursor: 'pointer' }}   onClick={() => handleWindowClose() } > Click here </span> */}
        <span style={{ color: 'blue', cursor: 'pointer', fontSize:'16px',textDecoration: 'underline' }}   onClick={() => handleWindowClose() } onMouseEnter={(e) => e.target.style.color = 'brown'} onMouseLeave={(e) => e.target.style.color = 'blue'}  > Back </span>
      </Typography>
      
      {/* </Grid> */}
    </Box>
    </Container>
    
  );
};

export default SignUpForm;
