// src/MultiStepForm.js
import React, { useState } from 'react';
import { Container, Stepper, Step, StepLabel, Button, Typography, Box } from '@mui/material';
import ApplicantForm from './forms/ApplicantForm';
import PaymentForm from './forms/PaymentForm';
import UploadDocumentsForm from './forms/UploadDocumentsForm';
import ValidIDsForm from './forms/ValidIDsForm';
import ProofOfPaymentForm from './forms/ProofOfPaymentForm';

const steps = [
  'Applicant Information',
  'Payment Information',
  'Upload Documents',
  'Valid IDs',
  'Proof of Payment',
];

const MultiStepForm = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <ApplicantForm />;
      case 1:
        return <PaymentForm />;
      case 2:
        return <UploadDocumentsForm />;
      case 3:
        return <ValidIDsForm />;
      case 4:
        return <ProofOfPaymentForm />;
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Multi-Step Form
        </Typography>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ marginTop: 4 }}>
          {activeStep === steps.length ? (
            <div>
              <Typography>All steps completed</Typography>
              <Button onClick={handleReset}>Reset</Button>
            </div>
          ) : (
            <div>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  variant="contained"
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Box>
            </div>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default MultiStepForm;
