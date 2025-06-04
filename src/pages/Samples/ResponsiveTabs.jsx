// npm install @mui/material @emotion/react @emotion/styled

import React from 'react';
import ResponsiveTabs from './ResponsiveTabsDetail';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();
{/* <ThemeProvider theme={theme}>
</ThemeProvider> */}
const App = () => {
  return (
    <main id='main' className='main'>
    <ThemeProvider theme={theme}>
          <ResponsiveTabs />
    </ThemeProvider>
    </main>
    
  );
};

export default App;

