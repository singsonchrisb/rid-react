import React, { useState } from 'react';
import {Container, Tabs, Tab, Box, useMediaQuery, useTheme, Button } from '@mui/material';


import ApplicantForm from '../forms/ApplicationForm';
import PaymentForm from '../forms/PaymentForm';
import UploadDocumentsForm from '../forms/UploadDocumentsForm';
// import ValidIDsForm from '../forms/ValidIDsForm';
// import ProofOfPaymentForm from '../forms/ProofOfPaymentForm';

import ImageEditor from '../forms/ImageEditor';
import ImageEditor2 from '../forms/ImageEditor2';
import Swal from 'sweetalert2';
import Footer from '../../../components/Footer';
import AppointmentForm from '../AppointmentForm';


const ResponsiveTabs = () => {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const FinishSubmit = () => {
    return (
      <>
      {/* <p>
       Please ensure all required fields are completed, all necessary documents are uploaded, and any applicable payments are made before submitting your application. Thank you.
     </p> */}
     
        <p style={{fontSize: '24px', textAlign: 'center'}}>
          Please ensure all required fields are completed, all necessary documents are uploaded,<br></br>
          and any applicable payments are made before submitting your application.<br></br>
          Thank you.
        </p>
       <Button
          variant="contained"
          color="primary"
          align='center'
          sx={{ m: 1, marginTop:'100px', width:'90%' }}
          onClick={handleSubmit}
        >
          SUBMIT
        </Button>
      </>
    );
  }

  const handleSubmit = () => {
      Swal.fire('save to API')
  }
{/* <Container style={{width: isDesktop ? '600px' : '355px',height : isDesktop ? '520px' : '98%'}} >
        <Box boxShadow={5} border={1} borderRadius={2} borderColor="lightgray" p={2} position="relative"> */}
      
  return (
    // <Container component="main" maxWidth="md">
    // boxShadow={5} border={1} borderRadius={2} borderColor="lightgray"
    <Box boxShadow={1} border={1} borderRadius={1}borderColor="lightgray" sx={{ width: '100%',marginTop:'-35px'}}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant={isMobile ? 'scrollable' : 'standard'}
        scrollButtons={isMobile ? 'auto' : 'off'}
        allowScrollButtonsMobile
        centered={!isMobile}
      >
        <Tab label="Application Form " />
        <Tab label="Documents" />
        <Tab label="Payments" />
        <Tab label="Appoinment" />
        <Tab label="Finish" />
         <Tab label="Image Editor 2" /> 
      </Tabs>
      <Box sx={{ p: 3 }}>
        {value === 0 && 
          <div>
            {/* Content for Tab 1 */}
            <ApplicantForm/>
         </div>}
        {value === 1 && 
          <div>
             <UploadDocumentsForm />
          </div>
        }
        {value === 2 && 
          <div>
            {/* Content for Tab 3 */}
            <PaymentForm/>
          </div>
        }
        {value === 3 && 
          <div>
            <AppointmentForm/>
          </div>
        }    
        {value === 4 && 
            <div>
              {FinishSubmit()}
            </div>}
        {value === 5 && 
          <div>
            <ImageEditor/>
            <ImageEditor2/>
         </div>}
      </Box>
      <Footer />
    </Box>
    
    // </Container>
  );
};

export default ResponsiveTabs;
