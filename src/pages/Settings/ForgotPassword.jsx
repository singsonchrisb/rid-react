import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { GetMyHeaders } from '../Functions/GetAPIToken';
import { decryptPWord } from '../Functions/MyFunctions';

const ForgotPassword = () => {
    let gAccessToken = decryptPWord(sessionStorage.getItem("accessToken")); 
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // Here you would typically send a request to your server to handle the forgot password process
    // For this example, we'll just display a message

    try {
        await fetch("http://localhost:3001/api/forgot-password", {
        method: 'POST',
        headers: GetMyHeaders(gAccessToken),
        body: JSON.stringify({email})
        })
        .then((response) => response.json() )
        .then((json) => {
              //  console.log('employee data1', json.data)
              //  console.log('employee data2 ', json.status)
              // setDataTable(json.data);
              console.log(json.data);
              console.log(json.status);

             if (Number(json.data.status) === 200) {
                 alert('dok')
                
                

                // alert('found!');
                // sessionStorage.setItem("empno", nEmpNo);
                // navigate('/payroll/payslip101')
             } else {
                 toast.error("API Error: " + json.data.status +","+ json.data.msg);
                  // alert("API Error: "   + json.error );
                //   setLoginStatus("API Error: " + json.status)
             }
        })
    } catch (err) {
        toast.error("NO data to load,  " + err );
    }
    
     
    setMessage(`Password reset link sent to ${email}`);
    setEmail('');
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} required />
        </label>
        <button type="submit">Reset Password</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default ForgotPassword;
