import { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Box, Avatar } from '@mui/material';
import { UploadFile } from './UploadFile'; // Assume you have a component for file upload

const UserEntryForm = () => {
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [picture, setPicture] = useState(null);

  const handleSubmit = () => {
    // Handle form submission
  };

  const handleFileChange = (file) => {
    setPicture(file);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        User Entry
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <UploadFile onChange={handleFileChange} accept="image/*">
            <Button variant="contained" component="span">
              Upload Picture
            </Button>
          </UploadFile>
          {picture && (
            <Box mt={2}>
              <Avatar src={URL.createObjectURL(picture)} alt="User Picture" sx={{ width: 100, height: 100 }} />
            </Box>
          )}
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Contact Number"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserEntryForm;
