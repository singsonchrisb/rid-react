// src/forms/ProofOfPaymentForm.js
import React from 'react';
import { TextField, Box, Button } from '@mui/material';

const ProofOfPaymentForm = () => {
  return (
    <Box>
      <Button variant="contained" component="label">
        Upload Proof of Payment
        <input type="file" hidden />
      </Button>
    </Box>
  );
};

export default ProofOfPaymentForm;
