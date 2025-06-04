// src/forms/PaymentForm.js
import React, { useState } from 'react';
import {MenuItem, TextField, Box, InputLabel,Select, Typography,Button,Container, Grid, FormControl, useTheme, useMediaQuery } from '@mui/material';
import Swal from 'sweetalert2';

// import useMyMediaQuery from "../../../hooks/useMediaQuery";
// import ColorButtons from './MySweetAlert';
import ProofOfPaymentForm from './ProofOfPaymentForm';
// import { isMobile } from 'react-device-detect';

const PaymentForm = () => {
  // let isMobile = useMyMediaQuery('(min-width: 700px)');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [formData, setFormData] = useState({
    paymentMethod: '',
    otherPaymentMethod: '',
    paymentDate: '',
    refNo: '',
    amount: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = () => {
    // Replace with your API call logic
    // console.log('Saving to API:', appointments);
    Swal.fire({
      title: "Successfully save!",
      text: "Click OK to continue.",
      icon: "success"
    });
s
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500
    });


    Swal.fire({
      title: "Custom animation with Animate.css",
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `
      }
    });


    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });


    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error"
        });
      }
    });

    Swal.fire({
      title: "Sweet!",
      text: "Modal with a custom image.",
      imageUrl: "https://unsplash.it/400/200",
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Custom image"
    });
    
  };
  // sx={{ padd ing: '16px 26px 26px 26px' }}
  return (
    <Container maxWidth="md" >
      <Box >
    {/* <Box component="form" noValidate autoComplete="off" , marginBottom: '16px'> sx={{ marginTop: '16px' , marginBottom: '16px'}}*/}
      <Typography variant="h5" sx={{ mb: 2 }}> Payment Form  </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={5} sx={{mt: 0}} >
            <FormControl fullWidth>
              <InputLabel>Payment Method</InputLabel>
              <Select
                label="P  ayment Method" 
                name="paymentMethod" 
                value={formData.paymentMethod} 
                onChange={handleChange} 
              >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value="Cash">Cash</MenuItem>
                <MenuItem value="GCash">GCash</MenuItem>
                <MenuItem value="Paymaya">Paymaya</MenuItem>
                <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
            {formData.paymentMethod === 'Other' && (
              // <Grid item xs={12} sm={12} >
              <TextField 
                fullWidth 
                label="Please specify Payment Method" 
                name="otherPaymentMethod" 
                value={formData.otherPaymentMethod} 
                onChange={handleChange} 
                sx={{ mt: 4, width: isMobile ? '100%':'710px'}}
                
              />
              // </Grid>
            )}
        </Grid>

        <Grid item xs={12} sm={5}>
            <TextField 
                fullWidth 
                label="Payment Date" 
                name="paymentDate"
                type="date"
                value={formData.paymentDate} 
                onChange={handleChange} 
                InputLabelProps={{
                    shrink: true,
                }}
                sx={{ mt: 0 }}
            />
        </Grid>
        <Grid item xs={12} sm={5}>
          <TextField
            fullWidth
            label="Reference Number"
            name="refNo" 
            margin="normal"
            variant="outlined"
            value={formData.refNo} 
            onChange={handleChange} 
            sx={{ mt: 3 }}
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <TextField
            fullWidth
            label="Amount"
            name="amount"
            margin="normal"
            variant="outlined"
            value={formData.amount} 
            onChange={handleChange} 
            sx={{ mt: 3, mb:3 }}
          />
        </Grid>
      </Grid>

      <ProofOfPaymentForm />
      
      <Box mt={3} align='center'>
            <Button style ={{width: '100%', fontSize:'16px', textTransform:'none'}} type="button" variant="contained" color="success" onClick={() => handleSave()}>Save</Button>
            {/* <Button style ={{marginLeft:'40px', width:'100px', textTransform:'none', backgroundColor: '#DC4C64'}} variant="contained" onClick={() => handleCancel()}>Cancel</Button> */}
      </Box>
    </Box>
    </Container>
  );
};

export default PaymentForm;
