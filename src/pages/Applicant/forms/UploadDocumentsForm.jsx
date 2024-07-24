// src/forms/UploadDocumentsForm.js
import React from 'react';
import { TextField, Box, Typography, Button } from '@mui/material';

const UploadDocumentsForm = () => {
  return (
    <Box>
      <Typography variant="h5">Upload Documents</Typography>
      <Button variant="contained" component="label">
        Upload Birth Certificate
        <input type="file" hidden />
      </Button>
      <Button variant="contained" component="label" sx={{ mt: 2 }}>
        Upload Barangay Clearance
        <input type="file" hidden />
      </Button>
      <Button variant="contained" component="label" sx={{ mt: 2 }}>
        Upload Police Clearance
        <input type="file" hidden />
      </Button>
    </Box>
  );
};

export default UploadDocumentsForm;
