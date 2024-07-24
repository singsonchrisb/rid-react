import React from 'react';
import { Box, Typography, Grid, Link } from '@mui/material';
import imgLogo from './path-to-your-logo.png'; // Adjust the path to your logo

function HomePage() {
  return (
    <Box p={4}>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={4} container direction="column" alignItems="center">
          <img src={imgLogo} alt="NPC Seal of Registration" width="200" />
          <Typography variant="subtitle1" align="center">
            NPC Seal of Registration
          </Typography>
        </Grid>
        
        <Grid item xs={12} md={4} container direction="column" alignItems="center">
          <img src="path-to-your-clearance-tutorial-icon.png" alt="Clearance Application Tutorial" width="50" />
          <Typography variant="h6" align="center">
            CLEARANCE APPLICATION TUTORIAL
          </Typography>
          <Link href="#" variant="body2" align="center">
            Open and Download
          </Link>
        </Grid>

        <Grid item xs={12} md={4} container direction="column" alignItems="center">
          <img src="path-to-your-clearance-certification-icon.png" alt="Clearance Certification" width="50" />
          <Typography variant="h6" align="center">
            CLEARANCE CERTIFICATION
          </Typography>
          <Typography variant="body2" color="textSecondary" align="center">
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li>Filipino citizen working/based in other country</li>
              <li>Bedridden</li>
              <li>Petitioner(For Probation/Bail)</li>
              <li>Deceased</li>
            </ul>
          </Typography>
          <Link href="#" variant="body2" align="center">
            Open and Download
          </Link>
        </Grid>

        <Grid item xs={12} md={4} container direction="column" alignItems="center">
          <img src="path-to-your-contact-icon.png" alt="Contact Us" width="50" />
          <Typography variant="h6" align="center">
            CONTACT US
          </Typography>
          <Typography variant="body2" align="center">
            NPCS ONE-STOP SHOP
            <br />
            (02) 723-0401 loc 7663
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default HomePage;
