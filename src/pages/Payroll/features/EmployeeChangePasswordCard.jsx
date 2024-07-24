import React, { useRef, useState } from 'react';
import { FaRegWindowClose } from 'react-icons/fa';

import { useNavigate} from "react-router-dom";
import { toast } from 'react-toastify';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { GetMyHeaders } from '../../Functions/GetAPIToken';
import { MyServerHostNodeJS, decryptPWord, encryptPWord } from '../../Functions/MyFunctions';

// GetAPITokenJava,
import './EmployeeChangePasswordCard.css'; // Import your CSS file


function EmployeeChangePasswordCard(props) {
  // alert(props.data.id)
  let navigate = useNavigate();
  let gAccessToken="" ;
  let API_url = MyServerHostNodeJS();

  const [formData, setFormData] = useState({
    email: props.data.id,
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const empNoRef = useRef(null);
  const currentPasswordRef = useRef(null);
  const newPasswordRef = useRef(null);
  // const confirmPasswordRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleSubmit = async () => {
      // e.preventDefault();
      // Handle form submission logic here
      // console.log('formData: ', formData);
      if (gAccessToken===null || gAccessToken==='') {
         gAccessToken = decryptPWord(sessionStorage.getItem("accessToken")); 
      }
  

      if (formData.email==="") {
          toast.error("User name must be filled out!");
          empNoRef.current.focus();
          return false;
        }
        if (formData.currentPassword==="") {
          toast.error("Current Password must be filled out!");
          currentPasswordRef.current.focus();
          return false;
        }
        if(formData.currentPassword ==="") {
          toast.error("New Password must be filled out!") 
          newPasswordRef.current.focus();
          return false;
        }

        if(formData.newPassword !== formData.confirmPassword) {
          toast.error("New Password not match!") 
          newPasswordRef.current.focus();
          return false;
        }

 //  

        if (gAccessToken===null ) {
          toast.error("Please refresh to reload data...");
          empNoRef.current.focus();
          return false;
        }
        toast.info("verifying credentials....");
 

        let nEmpNo = Number(formData.email);
        try {
            await fetch(API_url +"/payroll/employees/getEmployeeList/?empID=" + nEmpNo, {
            method: 'GET',
            headers: GetMyHeaders(gAccessToken),
            })
            .then((response) => response.json() )
            .then((json) => {
                  //  console.log('employee data1', json.data)
                  //  console.log('employee data2 ', json.status)
                  // setDataTable(json.data);
                if (Number(json.status) === 200) {
                    //  alert("API Test Good!" + json.data[0].fname);
                    if (json.data[0].password.toLowerCase() !==formData.currentPassword.toLowerCase()) {
                      // alert(decryptPWord(json.data[0].password));
                      if (decryptPWord(json.data[0].password).toLowerCase() !==formData.currentPassword.toLowerCase()) {
                          toast.error('Invalid Credentials!')
                          currentPasswordRef.current.focus();
                          return false;
                      }
                    }

                    if (json.data.status===1) {
                        toast.error('Resigned')
                        empNoRef.current.focus();
                        return false;
                    } else if (json.data.status===3) {
                        toast.error('Suspended')
                        empNoRef.current.focus();
                        return false;
                    } else if (json.data.status===4) {
                        toast.error('Awol')
                        empNoRef.current.focus();
                        return false;
                    }
                    // alert('found!');
                    // sessionStorage.setItem("empno", nEmpNo);
                    // navigate('/payroll/payslip101')
                      UpdatePassword();
                } else {
                    toast.error("API Error: " + json.status +","+ json.error);
                      // alert("API Error: "   + json.error );
                     currentPasswordRef.current.focus();
                     return false;
                }
            })
        } catch (error) {
            toast.error("NO data to load, " + error );
            currentPasswordRef.current.focus();
            return false;
        }
    };
    
    const UpdatePassword = async () => {
      //  alert('ready to update: ' + formData.newPassword + ",  employee ID: " +formData.email)
      // API_url="http://localhost:5000";
      let tPassword = encryptPWord(formData.newPassword.toString());
      // let tPassword = encryptPWord('cbs123');
      // alert('tPassword: ' + tPassword)
      try {
          await fetch(API_url +"/payroll/employees/updatePassword", {
          method: 'PUT',
          headers: GetMyHeaders(gAccessToken),
          body: JSON.stringify({empno: formData.email, newPassword: tPassword})
          })
          .then((response) => response.json() )
          .then((json) => {
                //  console.log('employee data1', json)
                //  console.log('employee data1', json.data)
                //  console.log('employee data2 ', json.status)
                // setDataTable(json.data);
              if (Number(json.status) === 200) {
                  toast.success("Successfully update")
              } else {
                toast.error("API Test Error: " + json.status +","+ json.error);
                currentPasswordRef.current.focus();
                return false;
            }
        })

      } catch (error) {
          toast.error("Unsuccessfully update!, " + error );
          currentPasswordRef.current.focus();
          return false;
      }


      navigate("/signinEmployee");
    }


    const handleBack = () => {
      navigate(-1);
    };
    // color: 'rgba(0, 0, 0, 0.5)',
  return (
    <div className='forgetpass-container'>
      <div className="wrapper">
         {/* <FaRegWindowClose className='windowclose-button' style={{color: 'rgba(0, 0, 0, 0.5)', marginTop: '-30px',marginRight: '-28px'}} onClick={() =>handleBack()}/>   */}
         <IconButton className='windowclose-button' style={{ marginTop: '-30px',marginRight: '-28px'}} onClick={() => handleBack()}> <CloseIcon /> </IconButton>  
        <h2>Change Password</h2>
        {/* <form onSubmit={handleSubmit}> */}
        <form > 
          <div className="input-box">
            <input
              type="text"
              name="id"
              placeholder="Enter employee ID"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              name="currentPassword"
              placeholder="Enter your current password"
              value={formData.currentPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              name="newPassword"
              placeholder="Create new password"
              value={formData.newPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm new password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-box button">
              {/* <input value="Confirm Change Password" onClick={() => handleSubmit()} /> */}
              {/* <button onClick={() => handleSubmit()} />Confirm Change Password </button> */}
              <button className='btn-oval' style={{marginTop: '5px',marginLeft: '70px', width: '121px' }} onClick={() => handleSubmit()}>Confirm Change Password</button>
          </div>
          <div className="text">
            {/* <h3>Done updating Password? <a href="#">Back now</a></h3> */}
            <h3>Done updating Password? <span style={{color: 'darkred'}} onClick={() => handleBack()}>Back now</span></h3>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmployeeChangePasswordCard;
