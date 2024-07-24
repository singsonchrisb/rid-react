// src/forms/PaymentForm.js
import React from 'react';
import { TextField, Box, Typography,Button,Container } from '@mui/material';
import Swal from 'sweetalert2';

import ColorButtons from './MySweetAlert';

const PaymentForm = () => {

  const handleSaveToAPI = () => {
    // Replace with your API call logic
    // console.log('Saving to API:', appointments);
    Swal.fire({
      title: "Successfully save!",
      text: "Click OK to continue.",
      icon: "success"
    });

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

  return (
    <Box>
      <Typography variant="h5"> Payment Form  </Typography>
      <TextField
        fullWidth
        label="Payment Method"
        margin="normal"
        variant="outlined"
      />

      <TextField
        fullWidth
        label="Amount"
        margin="normal"
        variant="outlined"
      />
      <Button
        variant="contained"
        // color="secondary"
        color="success"
        onClick={handleSaveToAPI}
        sx={{ mt: 2, ml: 2 }}
      >
        Save to API
      </Button>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      

      {/* <Container> */}
      <Typography variant="h4" gutterBottom>
        Colorful Buttons
      </Typography>
      <ColorButtons />
      {/* </Container> */}
    </Box>
  );
};

export default PaymentForm;
