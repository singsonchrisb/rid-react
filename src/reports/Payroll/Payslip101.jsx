import React, { useState, useEffect, useRef } from 'react';
// import { useParams } from 'react-router-dom';
import PayslipCard from './features/PayslipCard101';

function Payslip() {
  // let id=41413  useParams; 
  let empNo = sessionStorage.getItem("empno");
  // let empNo = sessionStorage.getItem("empno");

  // alert(empNo);
  return (
    <div className='card payslip-1 overflow-auto'>
        <div className='card-body'>
            {/* <PayslipCard data={{id:'4137'}} /> */}
            <PayslipCard data={{id: empNo}} />
        </div>
    </div>
  )
}

export default Payslip;
