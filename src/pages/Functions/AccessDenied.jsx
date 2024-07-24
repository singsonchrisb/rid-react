import React from 'react'
import {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import CloseIcon from '@mui/icons-material/Close';
import {IconButton} from '@mui/material';


const styleBoxCetenter = {
  display: 'block',
  margin: 'auto',
  marginTop: '10%',
  width: isMobile ? '100%':'60%',
  height: '320px',
  textAlign: 'center',
  backgroundColor:'#DC4C64',
  color: 'white',
  borderRadius: '10px',
  // border: '2px solid gray',
  padding: '5px 5px 15px 15px',
}
//alignItems: 'center',  justifyContent: 'center',

const AccessDenied = () => {
  const Navigate = useNavigate();
  const {id} = useParams();
  //var itemMenuString = id;
  let upperCaseText = id.toUpperCase();
  const [defaultText, setDefaultText] = useState(upperCaseText);

  useEffect(() => {
      if (id === ":dsgrosub") {
        setDefaultText("Drug Store & Grocery sub menu");
     } else if (id === ":dashboard") {
        setDefaultText("Dashboard");
      } else if (id === ":jewelrysub") {
        setDefaultText("Jewelry sub menu");   
      } else if (id === ":telecomsub") {
        setDefaultText("Telecom sub menu");     
      } else if (id === ":payrollsub") {
        setDefaultText("Payroll sub menu");     
      } else if (id === ":fotonsub") {
        setDefaultText("Foton sub menu");     
      } else if (id === ":settingssub") {
        setDefaultText("Settings sub menu");     
     }; 
  }, [id]);

  const handleWindowClose = () => {
    Navigate('/');
    // Navigate("/dashboard");
  }

      // const CheckAccessSubMenu = () => {
      //    if (id === ":dsgrosub") {
      //       setDefaultText("Drug Store & Grocery sub menu");
      //    } else if (id === ":dashboard") {
      //       setDefaultText("Dashboard");
      //     } else if (id === ":jewelrysub") {
      //       setDefaultText("Jewelry sub menu");   
      //     } else if (id === ":telecomsub") {
      //       setDefaultText("Telecom sub menu");     
      //     } else if (id === ":payrollsub") {
      //       setDefaultText("Payroll sub menu");     
      //     } else if (id === ":fotonsub") {
      //       setDefaultText("Foton sub menu");     
      //     } else if (id === ":settingssub") {
      //       setDefaultText("Settings sub menu");     
      //    }; 

      //   };

  /* const convertTextToUpperCase = () => {
    // To convert Upper Case
    let upperCaseText = defaultText.toUpperCase();
    setDefaultText(upperCaseText);
  };

  const convertTextToLowerCase = () => {
    // To convert Lower Case
    let lowerCaseText = defaultText.toLowerCase();
    setDefaultText(lowerCaseText);
  };

  const convertTextToTitleCase = () => {
    let camelCaseText = defaultText
      .split(' ')
      .map(function (word, index) {
        // First character upper case else lower case
        return word.charAt(0)
          .toUpperCase() + word.slice(1)
          .toLowerCase();
      })
      .join(' ');
    setDefaultText(camelCaseText);
  }; */
  

  return (
    
    <div id='main' className='main' >
        {/* if (id === "dsgrosub") {
           itemMenuString="Drug Store & Grocery"
        }; */}
 
        <div style={styleBoxCetenter}>
            <IconButton className='windowclose-button-white' style={{ marginTop: '5px', marginRight: '5px'  }} onClick={() => handleWindowClose()} ><CloseIcon /></IconButton>  

           <br></br> 
           <br></br> 
           <br></br> 
          <h1>Access denied!</h1>
          {/* <h1>No access on {defaultText} entry...</h1> */}
          <h1>You are not allowed to access this module.</h1> 

          <button className="btn-neo1-danger" style={{marginTop: '60px',width: '80%',fontSize: '20px'}} onClick={() => handleWindowClose()} >Close </button>
    
        </div>
      </div>
  )
}

export default AccessDenied;