

//import React from "react";
//import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
//import Alert from 'react-bootstrap/Alert';
// import {useState, useEffect, useRef} from 'react';
import axios from "axios";
// 👇️ import useState hook
import {useState, useRef} from 'react';

import {useNavigate, useParams} from "react-router-dom";
//import GlobalFunc from './GlobalFunc'; useLoaderData,

import {MyServerHost}  from '../Functions/MyFunctions';

// import e from 'cors';

//const dbServerHost ="http://127.0.0.1:3001"
const dbServerHost = MyServerHost()


const Register = () => {
  //  const {id} = 10;
    // useParams();
  const {id} = useParams();
  
  const [username, setUserName] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contactno, setContactNo] = useState("");
  const [password, setPassword] = useState("");
  
  const userNameFocus = useRef(null);
  // const firstNameFocus = useRef(null);
  // const lastNameFocus = useRef(null);
  // const emailFocus = useRef(null);
  // const contactNoFocus = useRef(null);
  // const styleInput= {
  //   borderRadius: "4px" ,border: '1px solid blue',boxShadow: '1px 2px 1px #F4AAB9', marginTop: "2px", marginBottom: "15px"}
    
  const optDepartment = [
    {value: '', text: '--Choose Department--'},
    {value: 'Jewelry', text: 'Jewelry'},
    {value: 'Telecom', text: 'Telecom'},
    {value: 'DSGrocery', text: 'DS and Grocery'},
    {value: 'Payroll', text: 'Payroll'},
    {value: 'Foton', text: 'Foton'},
    {value: 'Dashaboard', text: 'Dashaboard'},
  ];
  const [selected, setSelected] = useState(optDepartment[0].value); 
  let Navigate = useNavigate();
  var varWaiting = id ? "Wait for the admin approval..." : ""
  var varID = id ? "Sign-up" : "Admin"
  
  



  const handleChangeDepartment = event => {
    console.log(event.target.value);
    setSelected(event.target.value);
  };
   
  const handleSave = async () => {
    // alert("Are you sure you to save this record ? " + selected ); 
    // console.log("select", {selected});

    try {
        const response = await axios.get(dbServerHost + "/users/getUser/:where login_name='" + username + "'");
        alert("Login Name: " + username + " with account name: " + response.data[0].first_name + " " + response.data[0].last_name   +" already exist!" )
        userNameFocus.current.focus();
        return false;

    } catch (err) {
        // toast.error("NO data to fetch,  " + err ) 
        //  alert("saving: "+ err);
        // not found user login, proceed to save
    }



    let confirmAction = window.confirm("Proceed to save this record ?");
        if (confirmAction) {
          // alert(dbServerHost);
          await axios.post( dbServerHost + "/users/insertAccountByAdminHash",{
            username: username,
            firstname: firstname,
            lastname: lastname,
            email: email,
            contactno: contactno,
            password: password,
            register: varID,
            selected: selected,
      
           }).then((response) => {
              //alert("Action successfully executed");
              if (response.data.message) {
                alert("Unsuccesfully Failed" );   
             } else {
                
                // alert("add another accounts?" ); 
                //window.location = '/Home';
                
                if (id===1) {
                  //  Navigate("/userlist");
                }
             }
           
             });
               alert("Successfully add new record...");
               
              //  if (id===1) {
              //     Navigate("/userlist");
              //  } else {
              //      Navigate('/Signout');
              //  }
        } else {
            alert("Action canceled");
        };
    
    
    };

const handleCancel = () => {
    // alert("Cancel entry!");
     // window.location = '/';
     if (window.confirm("Do you really want to close entry ?" + id)) {
        // window.location = '/';
        if (id===1) {
            Navigate('/userlist');
        } else { 
            Navigate('/signout');
        }
        
      }

  }
      
  
    
    return(
         <div style={{marginTop: "10px"}}>
         <Container>
         <Row className="justify-content-center">
           <br />
                         
            <Card style={{ width: '38rem' }}>
            <Card.Body>
            <Card.Title><h2 style={{textAlign: 'center'}}>Users Registration: {varID}</h2> </Card.Title>

            <Card.Text>
            <br />
         <div>
        
        <div className="row">
              <div className="col-md-3">Login/User Name</div>
              <div className="col-md-4">
                  <input 
                      type="text" 
                      size="35" 
                      placeholder="Enter Login/User Name" 
                      name="username" 
                      ref={userNameFocus}
                      // onKeyDown={handleEnter}
                      onChange={e => setUserName(e.target.value)}/>
               </div>
           </div>
           <p></p>

           <div className="row">
              <div className="col-md-3">First Name</div>
              <div className="col-md-4">
                  <input type="text" size="35" placeholder="Enter First Name" name="firstname" onChange={e => setFirstName(e.target.value)}/>
               </div>
           </div>
           <p></p>

           <div className="row">
              <div className="col-md-3">Last Name</div>
              <div className="col-md-4">
                  <input type="text" size="35" placeholder="Enter Last Name" name="lastname" onChange={e => setLastName(e.target.value)}/>
               </div>
           </div>
           <p></p>
           <div className="row">
              <div className="col-md-3">E-mail</div>
              <div className="col-md-4">
                  <input type="email" size="35" placeholder="Enter E-mail" name="email" onChange={e => setEmail(e.target.value)}/>
               </div>
           </div>
           <p></p>

           <div className="row">
              <div className="col-md-3">Contact No.</div>
              <div className="col-md-4">
                  <input type="phone" size="35" placeholder="Enter contact number" name="contactno" onChange={e => setContactNo(e.target.value)}/>
               </div>
           </div>
           <p></p>

           <div className="row">
              <div className="col-md-3" style={{fontSize: "15px"}}>New Password</div>
              <div className="col-md-4">
                  <input type="password" size="35" placeholder="Enter New Password" name="password" onChange={e => setPassword(e.target.value)} />
               </div>
           </div>
           <p></p>
           <div className="row">
              <div className="col-md-3" style={{fontSize: "15px"}} >Confirm Password</div>
              <div className="col-md-4">
                  <input type="password" size="35" placeholder="Enter Confirm Password" name="confirm_password"/>
               </div>
           </div>

           <div className="row">
              <div className="col-md-3" style={{fontSize: "15px"}} >Department</div>
              <div className="col-md-4">
                  <select value={selected} onChange={handleChangeDepartment}>
                  {optDepartment.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.text}
                    </option>
                  ))}
                </select>
               </div>
           </div>

           <div style={{textAlign: 'center'}} className="row">
           <p></p>   
           <p></p>   
              <div className="col-md-12 text-coner">
              <p></p>
              {/*<div style={{ display: "flex", justifyContent: "space-between" }}>*/}
                <input type="submit" name="submit" value="  Submit " style={{ marginLeft: '0rem' }} className="btn-neo1 btn-neo1-add" onClick={handleSave} />
                <input type="submit" name="submit" value="  Cancel   " style={{ marginLeft: '2rem' }} className="btn-neo1 btn-neo1-delete" onClick={handleCancel}  />
                {/*<input type="submit" name="submit" onClick={handleCancel} value="Cancel"  /> */}
               </div>

           </div>
           <p></p>
           <p></p>
           
        </div>
        
        <p style={{textAlign: 'center'}}> {varWaiting} </p>
        
        
        


        </Card.Text>
      </Card.Body>
    </Card>
    </Row>
    
    </Container>
    
    </div>
    );
}



export default Register;


  