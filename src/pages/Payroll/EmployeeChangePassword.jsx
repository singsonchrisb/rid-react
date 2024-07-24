import React from 'react'
import EmployeeChangePasswordCard from './features/EmployeeChangePasswordCard'

function EmployeeChangePassword() {
  let empNo = sessionStorage.getItem("empno");

  return (
    <div className='card forget-password overflow-auto'>
        <div className='card-body'>
            <EmployeeChangePasswordCard data={{id: empNo}} />
        </div>
    </div>
  )
}

export default EmployeeChangePassword
