// npm install @mui/material @emotion/react @emotion/styled formik yup
// SignUpForm.js
import React from 'react';
import { TextField, Button, Box, Typography, Link } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import CloseIcon from '@mui/icons-material/Close';
import {IconButton} from '@mui/material';


import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { isMobile } from 'react-device-detect';




const validationSchema = Yup.object({
  username: Yup.string().required('User name is required'),
  email: Yup.string().email('Enter a valid email').required('Email is required'),
  password: Yup.string().min(8, 'Password should be of minimum 8 characters length').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

const SignUpForm = () => {
  let navigate = useNavigate(); // use for Navigation

  const styleBoxCetenter = {
    flexDirection: 'column',
    margin: '0 auto',
    marginTop: '2rem',
    maxWidth: isMobile ? '98%':'400px',
    // height: '450px',
    alignItems: 'center',
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
    // boxShadow: '3'
    boxShadow: '1px 1px 5px gray',
  }

  // display: 'flex',
  //       flexDirection: 'column',
  //       alignItems: 'center',
  //       maxWidth: isMobile ? '98%':'400px',
  //       margin: '0 auto',
  //       marginTop: '2rem',
  //       padding: '2rem',
  //       backgroundColor: '#fff',
  //       borderRadius: '8px',
  //       boxShadow: 3,

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await axios.post('https://your-api-endpoint.com/signup', {
          username: values.username,
          email: values.email,
          password: values.password,
        });
        // Swal.fire("Registration successful");
        Swal.fire({
          title: "Registration successful",
          text: "click the ok button to continue",
          icon: "success"
        });
        // navigate('/home');
        navigate('/signin');
        
      } catch (error) {
        if (error.response) {
          // Server-side error
          setErrors({ api: error.response.data.message });
        } else {
          // Client-side error
          setErrors({ api: 'An error occurred. Please try again later.' });
        }
      } finally {
        setSubmitting(true);
        Swal.fire({
          title: "Unsuccessful",
          text: "click the ok button to continue",
          icon: "error"
        });
        
      }
    },
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
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: isMobile ? '98%':'400px',
        margin: '0 auto',
        marginTop: '2rem',
        padding: '2rem',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: 3,
        position: 'relative',
      }}
    >
    <IconButton className='windowclose-button' sx={{
      position: 'absolute',
      top: 8,
      right: 8,
      }}
      onClick={() => handleWindowClose()} >
      <CloseIcon />
    </IconButton>   
       
       <Typography variant="h4" component="h1" gutterBottom>
        Sign Up
      </Typography>
      <TextField
        fullWidth
        id="username"
        name="username"
        label="User Name"
        value={formik.values.username}
        onChange={formik.handleChange}
        error={formik.touched.username && Boolean(formik.errors.username)}
        helperText={formik.touched.username && formik.errors.username}
        margin="normal"
      />
      <TextField
        fullWidth
        id="email"
        name="email"
        label="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        margin="normal"
      />
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
        margin="normal"
      />
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
        margin="normal"
      />
      <Button color="primary" variant="contained" fullWidth type="submit" sx={{ mt: 2 }}>
        Submit
      </Button>
      <Typography variant="body2" sx={{display: 'flex',  alignItems: 'center', mt: 2 }}>
         Already have an account? <span style={{marginLeft: '5px', color: 'blue', cursor: 'pointer',textDecoration: 'underline' }}   onClick={() => handleLogIn() } onMouseEnter={(e) => e.target.style.color = 'brown'} onMouseLeave={(e) => e.target.style.color = 'blue'}> Log in here </span>
      </Typography>
      <Typography variant="body2" sx={{ mt: 2, alignItems: 'center', }}>
         {/* Back to home? <span style={{ color: 'blue', cursor: 'pointer' }}   onClick={() => handleWindowClose() } > Click here </span> */}
        <span style={{ color: 'blue', cursor: 'pointer', fontSize:'16px',textDecoration: 'underline' }}   onClick={() => handleWindowClose() } onMouseEnter={(e) => e.target.style.color = 'brown'} onMouseLeave={(e) => e.target.style.color = 'blue'}  > Back </span>
      </Typography>
    </Box>
  );
};

export default SignUpForm;
