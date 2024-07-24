// src/forms/ApplicantForm.js
import React from 'react';
import { TextField, Box,Button } from '@mui/material';

import Swal from 'sweetalert2';

const ApplicantForm = () => {
  const handleSaveToAPI = () => {
    // Replace with your API call logic
    
    Swal.fire({
        title: "Successfully save!",
        text: "Click OK to continue.",
        icon: "success"
      });
  };
  return (
    <Box>
      <TextField
        fullWidth
        label="Full Name"
        margin="normal"
        variant="outlined"
      />
      <TextField
        fullWidth
        label="Email"
        margin="normal"
        variant="outlined"
      />
      <TextField
        fullWidth
        label="Phone Number"
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
    </Box>
  );
};

export default ApplicantForm;
