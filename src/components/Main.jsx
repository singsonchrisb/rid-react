import React from 'react'
import './main.css'
import PageTitle from './PageTitle';
import Dashboard from './Dashboard';
import Footer from './Footer';
import BackToTop from './BackToTop';
import TabForm from '../pages/Applicant/RIDClearance'

function Main() {
let gUserType='Admin';

  return (
    <main id='main' className='main'>
        {gUserType === 'Admin' ?
         <>
          <PageTitle page="Admin Dashboard" />
          <Dashboard />
        </>
       : 
        <>
        <PageTitle page="Members Dashboard" />
        <TabForm />
        </>
      }  
      <Footer />
      <BackToTop />
    </main>
  );
}

export default Main
