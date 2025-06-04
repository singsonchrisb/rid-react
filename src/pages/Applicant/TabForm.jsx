import React, { useState } from 'react';
import { AppBar, Tabs, Tab, Box, Typography, Container, useMediaQuery, useTheme } from '@mui/material';
import { styled } from '@mui/system';
import ApplicantForm from './forms/ApplicantForm';
import PaymentForm from './forms/PaymentForm';
import UploadDocumentsForm from './forms/UploadDocumentsForm';
import ValidIDsForm from './forms/ValidIDsForm';
import ProofOfPaymentForm from './forms/ProofOfPaymentForm';
import AppointmentForm from './AppointmentForm';

const StyledTabs = styled(Tabs)(({ theme }) => ({
  borderRight: `1px solid ${theme.palette.divider}`,
  backgroundColor: '#f5f5f5',
  '& .MuiTab-root': {
    textTransform: 'none',
    minWidth: 120,
    width: 200,
    color: '#333',
    '&.Mui-selected': {
      color: '#1976d2',
      fontWeight: theme.typography.fontWeightMedium,
    },
  },
}));

const TabPanelContainer = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));

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
        <Typography color='primary' variant="h4" align="center" gutterBottom>
          Tabular Form
        </Typography>
        <Box sx={{ display: 'flex', height: '100%' }}>
          <StyledTabs
            orientation={isMobile ? 'horizontal' : 'vertical'}
            variant={isMobile ? 'scrollable' : 'standard'}
            value={value}
            onChange={handleChange}
            aria-label="form tabs"
            scrollButtons={isMobile ? 'auto' : false}
            allowScrollButtonsMobile
          >
            <Tab label="Application" />
            <Tab label="Payment" />
            <Tab label="Upload" />
            <Tab label="IDs" />
            <Tab label="Proof" />
            <Tab label="Appointment" />
          </StyledTabs>
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
        <TabPanelContainer>
          {children}
        </TabPanelContainer>
      )}
    </div>
  );
}

export default TabForm;
// ----how to upgrade or update library
// rm -rf node_modules package-lock.json
// npm install --legacy-peer-deps
// npm install --force
// npm outdated
// npm update

