// src/forms/ValidIDsForm.js
import React from 'react';
import { TextField,Typography, Box, Button } from '@mui/material';

const ValidIDsForm = () => {
  return (
    <Box>
     <Typography variant="h5"> Upload Documents  </Typography>
      <Button variant="contained" component="label">
        Upload Valid ID
        <input type="file" hidden />
      </Button>
    </Box>
  );
};

export default ValidIDsForm;
