import React, { useState } from 'react';
import {Container, Tabs, Tab, Box, useMediaQuery, useTheme } from '@mui/material';


import ApplicantForm from './forms/ApplicantForm';
import PaymentForm from './forms/PaymentForm';
import UploadDocumentsForm from './forms/UploadDocumentsForm';
import ValidIDsForm from './forms/ValidIDsForm';
import ProofOfPaymentForm from './forms/ProofOfPaymentForm';

import ImageEditor from './forms/ImageEditor';
import ImageEditor2 from '../forms/ImageEditor2';


const ResponsiveTabs = () => {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    // <Container component="main" maxWidth="md">
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant={isMobile ? 'scrollable' : 'standard'}
        scrollButtons={isMobile ? 'auto' : 'off'}
        allowScrollButtonsMobile
        centered={!isMobile}
      >
        <Tab label="Application " />
        <Tab label="Documents" />
        <Tab label="Tab 3" />
        <Tab label="Image Editor 1" />
        <Tab label="Image Editor 2" />
      </Tabs>
      <Box sx={{ p: 3 }}>
        {value === 0 && 
          <div>
            Content for Tab 1
            <ApplicantForm/>
         </div>}
        {value === 1 && 
          <div>
             Content for Tab 2
             <UploadDocumentsForm />
             <ValidIDsForm />

          </div>}
        {value === 2 && 
          <div>
            Content for Tab 3
            <PaymentForm/>
            <ProofOfPaymentForm/>
          </div>}
        {value === 3 && 
            <div>
              Content for Tab 4
              <ImageEditor/>
            </div>}
        {value === 4 && 
          <div>
            Content for Tab 5
            <ImageEditor2/>
         </div>}
      </Box>
    </Box>
    // </Container>
  );
};

export default ResponsiveTabs;
