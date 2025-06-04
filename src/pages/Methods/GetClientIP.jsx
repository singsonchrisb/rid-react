// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function IpAddress() {
//   const [ipAddress, setIpAddress] = useState('');

//   useEffect(() => {
//     const fetchIpAddress = async () => {
//       const response = await axios.get('https://api.ipify.org?format=json');
//       setIpAddress(response.data.ip);
//     };

//     fetchIpAddress();
//   }, []);

//   return (
//     <div>
//       <h4>My IP address is: {ipAddress}</h4>
//     </div>
//   );
// }

// export default IpAddress;

// import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  //creating IP state
  const [ip, setIP] = useState("");

  //creating function to load ip address from the API
  // const getData = async () => {
  //   const res = await axios.get("https://geolocation-db.com/json/");
  //   console.log(res.data);
  //   setIP(res.data.IPv4);
  // };

  // Updated Code

  const getData = async () => {
    const res = await axios.get("https://api.ipify.org/?format=json");
    console.log(res.data);
    setIP(res.data.ip);
  };

  useEffect(() => {
    //passing getData method to the lifecycle method
    getData();
  }, []);

  return (
    <div className="App">
      <h3>  Your IP Address: {ip}</h3>
    </div>
  );

  
}

export default App;