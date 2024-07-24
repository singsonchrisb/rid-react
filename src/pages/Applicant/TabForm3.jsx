// src/TabForm.js
import React, { useState } from 'react';
import { AppBar, Tabs, Tab, Box, Typography, Container, makeStyles } from '@mui/material';
import ApplicantForm from './forms/ApplicantForm';
import PaymentForm from './forms/PaymentForm';
import UploadDocumentsForm from './forms/UploadDocumentsForm';
import ValidIDsForm from './forms/ValidIDsForm';
import ProofOfPaymentForm from './forms/ProofOfPaymentForm';

const useStyles = makeStyles((theme) => ({
  tab: {
    textTransform: 'none',
  },
  activeTab: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    borderBottom: `2px solid ${theme.palette.primary.main}`,
  },
}));

const TabForm = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container component="main" maxWidth="md">
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Tabular Form
        </Typography>
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange} aria-label="form tabs">
            <Tab label="Applicant" className={`${classes.tab} ${value === 0 ? classes.activeTab : ''}`} />
            <Tab label="Payment" className={`${classes.tab} ${value === 1 ? classes.activeTab : ''}`} />
            <Tab label="Upload Documents" className={`${classes.tab} ${value === 2 ? classes.activeTab : ''}`} />
            <Tab label="Valid IDs" className={`${classes.tab} ${value === 3 ? classes.activeTab : ''}`} />
            <Tab label="Proof of Payment" className={`${classes.tab} ${value === 4 ? classes.activeTab : ''}`} />
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
