import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container } from '@mui/material';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';

function VerifyClearance() {
  const [name, setName] = useState('');
  const [clearanceCode, setClearanceCode] = useState('');
  const [captchaValue, setCaptchaValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post('https://your-api-endpoint.com/verify-clearance', {
        name,
        clearanceCode,
        captchaValue,
      });
      // Handle successful response
      console.log('Response:', response.data);
      setSuccess(true);
    } catch (error) {
      // Handle error response
      console.error('Error:', error);
      setError('Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ backgroundColor: '#b0b0b0', padding: 4, borderRadius: 2, marginTop: 4 }}>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h5" align="center" gutterBottom>
          VERIFY YOUR CLEARANCE!
        </Typography>
        <TextField
          variant="filled"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          variant="filled"
          label="Clearance Code"
          value={clearanceCode}
          onChange={(e) => setClearanceCode(e.target.value)}
          required
        />
        <ReCAPTCHA
          sitekey="your-recaptcha-site-key" // Replace with your actual reCAPTCHA site key
          onChange={handleCaptchaChange}
        />
        {error && (
          <Typography color="error" align="center">
            {error}
          </Typography>
        )}
        {success && (
          <Typography color="primary" align="center">
            Verification successful!
          </Typography>
        )}
        <Button type="submit" variant="contained" color="primary" size="large" disabled={loading}>
          {loading ? 'Verifying...' : 'Verify'}
        </Button>
      </Box>
    </Container>
  );
}

export default VerifyClearance;
