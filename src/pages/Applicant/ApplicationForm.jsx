import React, { useState } from 'react';
// import { Container, TextField, Button, Grid, Typography, Box } from '@mui/material';
import { Container, TextField, Button, Grid, Typography, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

import axios from 'axios';
import useMediaQuery from '../hooks/useMediaQuery';

const RIDClearanceForm = () => {
  let isDesktop = useMediaQuery('(min-width: 780px)');

  const [formData, setFormData] = useState({
    firstName: '',
    middleName:'',
    lastName:'',
    dob: '',
    pob: '',
    age: '',
    address: '',
    sex: '',
    civilStatus: '',
    religion: '',
    otherReligion: '',
    bloodType: '',
    otherBloodType: '',
    build: '',
    weight: '',
    complexion: '',
    ethnicGroup: '',
    otherEthnicGroup: '',
    // Add other form fields similarly
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
   alert("error")


    e.preventDefault();
    try {
      const response = await axios.post('https://api.example.com/submit', formData);
      console.log(response.data);
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit the form.');
    }
  };

  return (
    <main id= {isDesktop ? 'main':'mobile'}>
    <Container maxWidth="md">
      <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>

        <Typography variant="h4" gutterBottom>R I D Clearance Application Form</Typography>
        
        {/* Personal Data */}
        <Typography variant="h6" gutterBottom>Personal Data</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField 
              fullWidth 
            //   label="Name (FN MN LN)" 
            //   name="name" 
              label="First Name" 
              name="firstName" 
              value={formData.firstName} 
              onChange={handleChange} 
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField 
              fullWidth 
              label="Middle Name" 
              name="middleName" 
              value={formData.middleName} 
              onChange={handleChange} 
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField 
              fullWidth 
              label="Last Name" 
              name="lastName" 
              value={formData.lastName} 
              onChange={handleChange} 
            />
          </Grid>

          <Grid item xs={12} sm={8}>
            <TextField 
              fullWidth 
              label="Place of Birth (POB)" 
              name="pob" 
              value={formData.pob} 
              onChange={handleChange} 
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            {/* <TextField 
              fullWidth 
              label="Date of Birth (DOB)" 
              name="dob" 
              value={formData.dob} 
              onChange={handleChange} 
            /> */}
            <TextField 
              fullWidth 
              label="Date of Birth (DOB)" 
              name="dob" 
              type="date"
              value={formData.dob} 
              onChange={handleChange} 
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          
          <Grid item xs={12} sm={1}>
            <TextField 
              fullWidth 
              label="Age" 
              name="age" 
              value={formData.age} 
              onChange={handleChange} 
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              fullWidth 
              label="Address" 
              name="address" 
              value={formData.address} 
              onChange={handleChange} 
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel>Sex</InputLabel>
              <Select
                label="Sex"
                name="sex"
                value={formData.sex}
                onChange={handleChange}
              >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value="M">Male</MenuItem>
                <MenuItem value="F">Female</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel>Civil Status</InputLabel>
              <Select
                label="Civil Status" 
                name="civilStatus" 
                value={formData.civilStatus} 
                onChange={handleChange} 
              >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value="S">Single</MenuItem>
                <MenuItem value="M">Married</MenuItem>
                <MenuItem value="D">Separated</MenuItem>
                <MenuItem value="W">Widowed</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel>Religion</InputLabel>
              <Select
                label="Religion" 
                name="religion" 
                value={formData.religion} 
                onChange={handleChange} 
              >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value="Baha'i">Baha'i</MenuItem>
                <MenuItem value="Buddhism">Buddhism</MenuItem>
                <MenuItem value="Christianity">Christianity</MenuItem>
                <MenuItem value="Confucianism">Confucianism</MenuItem>
                <MenuItem value="Hinduism">Hinduism</MenuItem>
                <MenuItem value="Islam">Islam</MenuItem>
                <MenuItem value="Jainism">Jainism</MenuItem>
                <MenuItem value="Judaism">Judaism</MenuItem>
                <MenuItem value="Shinto">Shinto</MenuItem>
                <MenuItem value="Sikhism">Sikhism</MenuItem>
                <MenuItem value="Taoism">Taoism</MenuItem>
                <MenuItem value="Zoroastrianism">Zoroastrianism</MenuItem>
                <MenuItem value="Roman Catholic">Roman Catholic</MenuItem>
                <MenuItem value="Protestant">Protestant</MenuItem>
                <MenuItem value="Gnostic">Gnostic</MenuItem>
                <MenuItem value="Mormon">Mormon</MenuItem>
                <MenuItem value="Evangelical">Evangelical</MenuItem>
                <MenuItem value="Anglican">Anglican</MenuItem>
                <MenuItem value="Church of Christ">Church of Christ</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
            {formData.religion === 'Other' && (
              <TextField 
                fullWidth 
                label="Please specify religion" 
                name="otherReligion" 
                value={formData.otherReligion} 
                onChange={handleChange} 
                sx={{ mt: 2 }}
              />
            )}


          </Grid>
          
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel>Blood Type</InputLabel>
              <Select
                label="Blood Type" 
                name="bloodType" 
                value={formData.bloodType} 
                onChange={handleChange} 
              >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value="A+">A+</MenuItem>
                <MenuItem value="A-">A-</MenuItem>
                <MenuItem value="B+">B+</MenuItem>
                <MenuItem value="B-">B-</MenuItem>
                <MenuItem value="AB+">AB+</MenuItem>
                <MenuItem value="AB-">AB-</MenuItem>
                <MenuItem value="O+">O+</MenuItem>
                <MenuItem value="O-">O-</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
            {formData.bloodType === 'Other' && (
              <TextField 
                fullWidth 
                label="Please specify blood type" 
                name="otherBloodType" 
                value={formData.otherBloodType} 
                onChange={handleChange} 
                sx={{ mt: 2 }}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField 
              fullWidth 
              label="Build" 
              name="build" 
              value={formData.build} 
              onChange={handleChange} 
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField 
              fullWidth 
              label="Weight" 
              name="weight" 
              value={formData.weight} 
              onChange={handleChange} 
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel>Complexion</InputLabel>
              <Select
                label="complexion" 
                name="complexion" 
                value={formData.complexion} 
                onChange={handleChange} 
              >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value="Light">Light</MenuItem>
                <MenuItem value="Fair">Fair</MenuItem>
                <MenuItem value="Dark">Dark</MenuItem>
              </Select>
            </FormControl>
          </Grid>


          <Grid item xs={12} sm={3}>
            {/* <TextField 
              fullWidth 
              label="Ethnic Group" 
              name="ethnicGroup" 
              value={formData.ethnicGroup} 
              onChange={handleChange} 
            /> */}
            <FormControl fullWidth>
              <InputLabel>Ethnic Group</InputLabel>
              <Select
                label="Ethnic Group" 
                name="ethnicGroup" 
                value={formData.ethnicGroup} 
                onChange={handleChange} 
              >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value="Hiligaynon">Hiligaynon</MenuItem>
                <MenuItem value="Ilocano">Ilocano</MenuItem>
                <MenuItem value="Kapampangan">Kapampangan</MenuItem>
                <MenuItem value="Pangasinan">Pangasinan</MenuItem>
                <MenuItem value="Tagalog">Tagalog</MenuItem>
                <MenuItem value="Tausūg">Tausūg</MenuItem>
                <MenuItem value="Visayans">Visayans</MenuItem>
                <MenuItem value="Waray">Waray</MenuItem>
                <MenuItem value="Yakan">Yakan</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
            {formData.ethnicGroup === 'Other' && (
              <TextField 
                fullWidth 
                label="Please specify ethnic group" 
                name="otherEthnicGroup" 
                value={formData.otherEthnicGroup} 
                onChange={handleChange} 
                sx={{ mt: 2 }}
              />
            )}
          </Grid>
         
        </Grid>
        
        {/* Educational Background */}
        {/* Add educational background fields here similarly */}
        
        {/* If Married */}
        {/* Add if married fields here similarly */}
        
        {/* Family History */}
        {/* Add family history fields here similarly */}
        
        {/* Employment Records */}
        {/* Add employment records fields here similarly */}
        
        {/* Character Reference */}
        {/* Add character reference fields here similarly */}
        
        {/* Organizations */}
        {/* Add organizations fields here similarly */}


        {/* Educational Background */}
        <Typography variant="h6" gutterBottom>Educational Background</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}><TextField fullWidth label="Elementary - School" /></Grid>
          <Grid item xs={12} sm={4}><TextField fullWidth label="Location" /></Grid>
          <Grid item xs={12} sm={1.8}><TextField fullWidth label="Year Graduated" /></Grid>
          <Grid item xs={12} sm={2.2}><TextField fullWidth label="Awards Received" /></Grid>

          <Grid item xs={12} sm={4}><TextField fullWidth label="High School - School" /></Grid>
          <Grid item xs={12} sm={4}><TextField fullWidth label="Location" /></Grid>
          <Grid item xs={12} sm={1.8}><TextField fullWidth label="Year Graduated" /></Grid>
          <Grid item xs={12} sm={2.2}><TextField fullWidth label="Awards Received" /></Grid>

          <Grid item xs={12} sm={4}><TextField fullWidth label="College - School" /></Grid>
          <Grid item xs={12} sm={4}><TextField fullWidth label="Location" /></Grid>
          <Grid item xs={12} sm={1.8}><TextField fullWidth label="Year Graduated" /></Grid>
          <Grid item xs={12} sm={2.2}><TextField fullWidth label="Awards Received" /></Grid>
          <Grid item xs={12} sm={12}><TextField fullWidth label="Course" /></Grid>
        {/* </Grid>  
        <br></br>
        <Grid container spacing={2}> */}
          <Grid item xs={12} sm={4}><TextField  fullWidth label="Post Graduate (masteral/doctorate) - School" /></Grid>
          <Grid item xs={12} sm={4}><TextField fullWidth label="Location" /></Grid>
          <Grid item xs={12} sm={1.8}><TextField fullWidth label="Year Graduated" /></Grid>
          <Grid item xs={12} sm={2.2}><TextField fullWidth label="Awards Received" /></Grid>
          
          <Grid item xs={12} sm={6}><TextField fullWidth label="Eligibility" /></Grid>
        </Grid>

        {/* If Married */}
        <Typography variant="h6" gutterBottom>If Married</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}><TextField fullWidth label="Name" /></Grid>
          <Grid item xs={12} sm={5}><TextField fullWidth label="Name of Child/Children 1" /></Grid>
          <Grid item xs={12} sm={1}><TextField fullWidth label="Age" /></Grid>

          <Grid item xs={12} sm={6}><TextField fullWidth label="Date of Birth" /></Grid>
          <Grid item xs={12} sm={5}><TextField fullWidth label="Name of Child/Children 2" /></Grid>
          <Grid item xs={12} sm={1}><TextField fullWidth label="Age" /></Grid>
          
          <Grid item xs={12} sm={6}><TextField fullWidth label="Place of Birth" /></Grid>
          <Grid item xs={12} sm={5}><TextField fullWidth label="Name of Child/Children 3" /></Grid>
          <Grid item xs={12} sm={1}><TextField fullWidth label="Age" /></Grid>

          <Grid item xs={12} sm={6}><TextField fullWidth label="Address" /></Grid>
          <Grid item xs={12} sm={5}><TextField fullWidth label="Name of Child/Children 4" /></Grid>
          <Grid item xs={12} sm={1}><TextField fullWidth label="Age" /></Grid>

          <Grid item xs={12} sm={6}><TextField fullWidth label="Nationality" /></Grid>
          <Grid item xs={12} sm={5}><TextField fullWidth label="Name of Child/Children 5" /></Grid>
          <Grid item xs={12} sm={1}><TextField fullWidth label="Age" /></Grid>

          <Grid item xs={12} sm={6}><TextField fullWidth label="Date of Marriage" /></Grid>
          <Grid item xs={12} sm={5}><TextField fullWidth label="Name of Child/Children 6" /></Grid>
          <Grid item xs={12} sm={1}><TextField fullWidth label="Age" /></Grid>

          <Grid item xs={12} sm={6}><TextField fullWidth label="Profession" /></Grid>
          <Grid item xs={12} sm={5}><TextField fullWidth label="Name of Child/Children 7" /></Grid>
          <Grid item xs={12} sm={1}><TextField fullWidth label="Age" /></Grid>

          <Grid item xs={12} sm={6}><TextField fullWidth label="Occupation" /></Grid>
          <Grid item xs={12} sm={5}><TextField fullWidth label="Name of Child/Children 8" /></Grid>
          <Grid item xs={12} sm={1}><TextField fullWidth label="Age" /></Grid>
        </Grid>

        {/* Family History */}
        <Typography variant="h6" gutterBottom>Family History</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3.5}><TextField fullWidth label="Father's Name" /></Grid>
          <Grid item xs={12} sm={2.2}>
                <TextField 
                    fullWidth 
                    label="Date of Birth" 
                    name="fathersDOB"
                    type="date"
                    value={formData.fathersDOB} 
                    onChange={handleChange} 
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
           </Grid>
          <Grid item xs={12} sm={2}><TextField fullWidth label="Plate of Birth" /></Grid>
          <Grid item xs={12} sm={2}><TextField fullWidth label="Occupation" /></Grid>
          <Grid item xs={12} sm={2.3}><TextField fullWidth label="Address" /></Grid>

          <Grid item xs={12} sm={3.5}><TextField fullWidth label="Mother's Maiden Name" /></Grid>
          <Grid item xs={12} sm={2.2}>
                <TextField 
                    fullWidth 
                    label="Date of Birth" 
                    name="fathersDOB"
                    type="date"
                    value={formData.fathersDOB} 
                    onChange={handleChange} 
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
           </Grid>

          
          <Grid item xs={12} sm={2}><TextField fullWidth label="POB" /></Grid>
          <Grid item xs={12} sm={2}><TextField fullWidth label="Occupation" /></Grid>
          <Grid item xs={12} sm={2.3}><TextField fullWidth label="Address" /></Grid>

          <Grid item xs={12} sm={6}><TextField fullWidth label="Brothers/Sisters" /></Grid>
          <Grid item xs={12} sm={6}><TextField fullWidth label="DOB" /></Grid>
          <Grid item xs={12} sm={6}><TextField fullWidth label="POB" /></Grid>
          <Grid item xs={12} sm={6}><TextField fullWidth label="Occupation" /></Grid>
          <Grid item xs={12} sm={6}><TextField fullWidth label="Address" /></Grid>
        </Grid>

        {/* Employment Records */}
        <Typography variant="h6" gutterBottom>Employment Records</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}><TextField fullWidth label="Agency" /></Grid>
          <Grid item xs={12} sm={6}><TextField fullWidth label="Address" /></Grid>
          <Grid item xs={12} sm={6}><TextField fullWidth label="Type/Nature of Employment" /></Grid>
          <Grid item xs={12} sm={6}><TextField fullWidth label="Years of Service" /></Grid>
          <Grid item xs={12} sm={6}><TextField fullWidth label="Reason for Leaving" /></Grid>
        </Grid>

        {/* Character Reference */}
        <Typography variant="h6" gutterBottom>Character Reference</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}><TextField fullWidth label="Name" /></Grid>
          <Grid item xs={12} sm={6}><TextField fullWidth label="Occupation" /></Grid>
          <Grid item xs={12} sm={6}><TextField fullWidth label="Address" /></Grid>
          <Grid item xs={12} sm={6}><TextField fullWidth label="Contact No." /></Grid>
        </Grid>

        {/* Organizations */}
        <Typography variant="h6" gutterBottom>Organizations</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}><TextField fullWidth label="Name of Organization" /></Grid>
          <Grid item xs={12} sm={6}><TextField fullWidth label="Address/Telephone" /></Grid>
          <Grid item xs={12} sm={6}><TextField fullWidth label="Position" /></Grid>
        </Grid>
        
        {/* Additional Info */}
        <br></br>
        <Typography variant="h6" gutterBottom>Additional Information</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField 
              fullWidth 
              label="Residence Certificate No." 
              name="residenceCertNo" 
              value={formData.residenceCertNo} 
              onChange={handleChange} 
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              fullWidth 
              label="Issued At" 
              name="issuedAt" 
              value={formData.issuedAt} 
              onChange={handleChange} 
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              fullWidth 
              label="Issued On" 
              name="issuedOn" 
              value={formData.issuedOn} 
              onChange={handleChange} 
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              fullWidth 
              label="SSS" 
              name="sss" 
              value={formData.sss} 
              onChange={handleChange} 
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              fullWidth 
              label="TIN" 
              name="tin" 
              value={formData.tin} 
              onChange={handleChange} 
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              fullWidth 
              label="NBI No." 
              name="nbiNo" 
              value={formData.nbiNo} 
              onChange={handleChange} 
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              fullWidth 
              label="Passport No." 
              name="passportNo" 
              value={formData.passportNo} 
              onChange={handleChange} 
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              fullWidth 
              label="Contact No." 
              name="contactNo" 
              value={formData.contactNo} 
              onChange={handleChange} 
            />
          </Grid>
        </Grid>

        {/* Certification */}
        <Box mt={3}>
          <Typography variant="body1">
            I hereby certify that the above information is true and correct to the best of my knowledge and belief.
          </Typography>
        </Box>

        {/* Signature */}
        <Box mt={3}>
          <TextField 
            fullWidth 
            label="Applicant Signature over printed name" 
            name="signature" 
            value={formData.signature} 
            onChange={handleChange} 
          />
        </Box>

        {/* Submit Button */}
        <Box mt={3}>
          <Button type="submit" variant="contained" color="primary">Submit</Button>
        </Box>
      </Box>
    </Container>
    </main>
  );
}

export default RIDClearanceForm;
