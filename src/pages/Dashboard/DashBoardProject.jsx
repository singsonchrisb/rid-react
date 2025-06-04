
// import  GetIP   from '../pages/GetInternetIP2';

//import Header from './Header';
//https://www.geeksforgeeks.org/how-to-target-desktop-tablet-and-mobile-using-media-query/
//BrowserRouter as Router,Routes, Route,  Link,
//import { useNavigate } from 'react-router-dom';
// import {useState, useEffect} from 'react';
import {BrowserView, MobileView} from 'react-device-detect';
import {isMobile} from 'react-device-detect';
import IpAddress from '../Functions/GetClientIP';
import { Segment } from "semantic-ui-react";
import { HeaderDashboard } from "./features/HeaderDashboard";

import Project from './Project';
import { decryptPWord } from '../Functions/MyFunctions';



//import SignOut from '.pages/Login';
//import {isMobile} from 'react-device-detect';
//import { Toast } from 'bootstrap';
//import { alignPropType } from 'react-bootstrap/esm/types';

// const style = {
//     textAlign: 'center',
//     justifyContent: 'center',
//     display: 'block',
//     fontsize: '44px'
// }

// let myIP = GetIP();

function Dashboard() {
  



    /* const [items, setItems] = useState([]);
useEffect(() => {
  localStorage.setItem('items', JSON.stringify(items));
}, [items]); */

 /* const [items, setItems] = useState([]);

useEffect(() => {
  const items = JSON.parse(localStorage.getItem('userName'));
  if (items) {
   setItems(items);
   alert("local stora4: " + {setItems});
  }
}, []);
     */
/*     const [auth, setAuth] = useState({userName:''});
    useEffect(() => {
        //var a = localStorage.getItem('userName',JSON.stringify(auth));
        

        setAuth(a); 
        alert("local storate: " + {setAuth});
    },[auth]);
 */    

  //const [auth, setAuth] = useState('');
  //const [user, setUser] = useState('');
  //let navigate = useNavigate(); // use for Navigation

//alert("local stora3: " + {setItems});
var gLoginName = decryptPWord(sessionStorage.getItem('loginName'));
var gUserName =  decryptPWord(sessionStorage.getItem('userName'));
var gEmail =  decryptPWord(sessionStorage.getItem('email'));

var ip = Request.UserHostAddress;
let hostname = Request.UserHostName;

/* useEffect(() => {
  var auth1 = a;
  var userName = b ;
   setAuth(auth1);
   setUser(userName);
},
[]) */

 if (gLoginName===null) {
     //navigate('/login');
 } else {  
  //alert("ddd")   ;
    // navigate('/Header');
 }

//  const handleWindowClose = () => {
//   Navigate(-1);
// }

  return (
    <>
    <Segment className="dashboard">
    {/* <FaWindowClose className='windowclose-button' onClick={() => handleWindowClose()}/>   */}
    <HeaderDashboard name={gLoginName} />
    <div className='app-center' style={{ width: isMobile ? '95%' : '98%' }}>
        <BrowserView>
                <h1>Project Dashboard</h1>
                <h2>This is rendered only in browser width: {window.screen.width} and height: {window.screen.height} </h2>
                {/* <h2>This is rendered only in browser height: {window.screen.height} </h2> */}
        </BrowserView>
        <MobileView>
            <h1>Dashboard</h1>
            <h2 styles={{fontSize: '14px'}}> This is rendered only on mobile  {window.screen.width}</h2>


        </MobileView>
        
        <h3>My React JS Apps 1</h3>
        <p> Welcome: {gUserName} </p>
        <p> Login Name: {gLoginName}</p>
        <p> Email Address: {gEmail}</p>
        
        <p> Host Name:  {window.location.hostname}</p> 
        <p> Host: {window.location.host}</p> 
        <p> Path name: {window.location.pathname}</p> 
        <p> Port: {window.location.port}</p> 
        <p> Protocol:  {window.location.protocol}</p> 
        {/* <p> IP:  {ip}</p> 
        <p> IPHost:  {hostname}</p>  */}
        {/* <p> IP:  {myIP} </p>  */}

        <IpAddress />
        {/* <GetIP /> */}
        
        {/* <a href="/GetClientIP" style={{fontSize: "16px"}} >Get Client IP</a> */}
        
        <Project/>
             
    </div>
    </Segment>
    </>       
  )
}

export default Dashboard