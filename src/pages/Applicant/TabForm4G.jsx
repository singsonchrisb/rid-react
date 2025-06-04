import React, { useState } from 'react';
import { AppBar, Tabs, Tab, Box, Typography, Container, useMediaQuery, useTheme } from '@mui/material';
import ApplicantForm from './forms/ApplicantForm';
import PaymentForm from './forms/PaymentForm';
import UploadDocumentsForm from './forms/UploadDocumentsForm';
import ValidIDsForm from './forms/ValidIDsForm';
import ProofOfPaymentForm from './forms/ProofOfPaymentForm';
import AppointmentForm from './AppointmentForm';

const TabForm = () => {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container component="main" maxWidth="md">
      <Box sx={{ marginTop: 4 }}>
        <Typography color='secondary' variant="h4" align="center" gutterBottom>
          Tabular Form
        </Typography>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="form tabs"
            variant={isMobile ? "scrollable" : "fullWidth"}
            scrollButtons={isMobile ? "auto" : "false"}
            allowScrollButtonsMobile
          >
            <Tab label="Application" />
            <Tab label="Payment" />
            <Tab label="Upload" />
            <Tab label="IDs" />
            <Tab label="Proof" />
            <Tab label="Appointment" />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <ApplicantForm />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <PaymentForm />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <UploadDocumentsForm />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <ValidIDsForm />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <ProofOfPaymentForm />
        </TabPanel>
        <TabPanel value={value} index={5}>
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
