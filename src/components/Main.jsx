import React from 'react'
import './main.css'
import PageTitle from './PageTitle';
import Dashboard from './Dashboard';
import Footer from './Footer';
import BackToTop from './BackToTop';
// import TabForm from '../pages/Applicant/RIDClearance'
import MembersDashboard from '../pages/Applicant/ApplicantsTabs'
import { decryptPWord } from '../functions/ChrisFunctions';


function Main() {
// let gUserType='Admin';
  let gUserType = decryptPWord (sessionStorage.getItem('accessType'));
  return (
    <>
     {/* <main id='main' className='main'> */}
        {gUserType === 'admin' ?
         <>
         <main id='main' className='main'> 
          <PageTitle page="Admin Dashboard" />
          <Dashboard />
          <Footer />
          </main>
        </>
       : 
        <>
        {/* <main id='main' className='main'>
            <PageTitle page="Members Dashboard" />
        </main> */}
        {/* <TabForm /> */}
        <MembersDashboard />
        </>
      }  
      <BackToTop />
     {/* </main> */}
    </>
  );
}

export default Main
