// src/TabForm.js
import React, { useState } from 'react';
import { AppBar, Tabs, Tab, Box, Typography, Container, Button } from '@mui/material';
import ApplicantForm from './forms/ApplicantForm';
import PaymentForm from './forms/PaymentForm';
import UploadDocumentsForm from './forms/UploadDocumentsForm';
import ValidIDsForm from './forms/ValidIDsForm';
import ProofOfPaymentForm from './forms/ProofOfPaymentForm';
import AppointmentForm from './AppointmentForm';

const TabForm = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container component="main" maxWidth="md">
      <Box sx={{ marginTop: 4 }}>
        <Typography color='dark blue' variant="h4" align="center" gutterBottom>
          {/* RID CLEARANCE */}
          RID CLEARANCE
        </Typography>
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange} aria-label="form tabs">
            <Tab label="Applicantion Form" />
            <Tab label="Payment" />
            <Tab label="Upload Documents" />
            <Tab label="Valid IDs" />
            <Tab label="Proof of Payment" />
            <Tab label="Appoinment" />
          </Tabs>
        </AppBar>
        <TabPanel styles={{color:'white'}} value={value} index={0}>
          <ApplicantForm />
        </TabPanel>
        <TabPanel color='white' value={value} index={1}>
          <PaymentForm />
        </TabPanel>
        <TabPanel styles={{color:'white'}}value={value} index={2}>
          <UploadDocumentsForm />
        </TabPanel>
        <TabPanel styles={{color:'white'}}value={value} index={3}>
          <ValidIDsForm />
        </TabPanel>
        <TabPanel styles={{color:'white'}}value={value} index={4}>
          <ProofOfPaymentForm />
        </TabPanel>
        <TabPanel styles={{color:'white'}}value={value} index={5}>
          <AppointmentForm />
        </TabPanel>
      </Box>
    </Container>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
      styles={{color:'white'}}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default TabForm;
