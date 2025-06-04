import { useRef, useState } from "react";
// import { NavLink } from 'react-router-dom';

import { Button} from '@mui/material';
// import Facebook from "../../assets/facebook-square-brands.svg";
import Facebook from "../../assets/facebook-square-blue3.png";
import LinkedId from "../../assets/linkedin-square-blue2.png";
import Twitter from "../../assets/twitter-square-blue2.png";
import Instagram from "../../assets/instagram-square-blue2.webp";
// import PaySlip from "../../assets/payslip.jpg";
// import Barcode from "../../assets/payslip.jpg";
import styled from "styled-components";
import { Box, Typography } from '@mui/material';

import { addClientMessage  } from "../../../firebase/queriesRID";
import { toast } from "react-toastify";
// import { BiBarcode } from "react-icons/bi";
// import { FaBarcode } from "react-icons/fa";
// import { TbBarcode } from "react-icons/tb";
// import { AiOutlineBarcode } from "react-icons/ai";

// background-color: #0a0b10;
// background-color: #fff;
const ContactSection = styled.section`
  width: 100vw;
  padding: calc(2.5rem + 2.5vw) 0;
  background-color: #f1f1f1;
  color: black;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  justify-content: center;
`;
// color: var(--white);
const Title = styled.h1`
  color: var(--black);
  display: inline-block;
  font-size: 2rem;
  margin-bottom: 3rem;
  position: relative;
  &::before {
    content: "";
    height: 1px;
    width: 50%;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 0.5rem);
    /* or 100px */
    border-bottom: 2px solid var(--pink);
  }
`;

const Icons = styled.div`
  display: flex;
  margin-bottom: 3rem;
  a {
    &:hover {
      img {
        filter: invert(20%) sepia(100%) saturate(500%) hue-rotate(580deg)
          brightness(100%) contrast(97%);
      }
    }
    &:not(:last-child) {
      margin-right: 2rem;
    }
    img {
      width: 3rem;
      height: 3rem;
    }
  }
`;
// background-color: var(--nav2);
// background-color: var(--nav);
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  input {
    padding: 1rem calc(0.5rem + 1vw);
    margin-bottom: 1rem;
    background-color: var(--white);
    border: none;
    border-radius: 4px;
    // color: #eff7f8;
    color: black;
    &:active,
    &:focus {
      border: none;
      outline: none;
      background-color: var(--white smoke);
    }
    &::placeholder {
      color: black;
      opacity: 0.6;
    }
    &[name="name"] {
      margin-right: 2rem;
    }
  }
  textarea {
    padding: 1rem calc(0.5rem + 1vw);
    margin-bottom: 1rem;
    background-color: var(--white);
    border: none;
    border-radius: 4px;
    color: black;
    margin-bottom: 2rem;
    &:focus,
    &:active {
      background-color: var(--white smok);
    }
    &::placeholder {
      color: black;
      opacity: 0.6;
    }
  }
  button {
    padding: 0.8rem 2rem;
    // background-color: var(--white);
    border-radius: 4px;
    font-size: 1.2rem;
    //  color: #262626;
    cursor: pointer;
    transition: transform 0.3s;
    &:hover {
      transform: scale(1.1);
    }
    &:active {
      transform: scale(0.9);
    }
  }
`;

const Row = styled.div`
  @media only Screen and (max-width: 40em) {
    display: flex;
    flex-direction: column;
    input {
      &[name="name"] {
        margin-right: 0;
      }
    }
  }
`;

const LeftText = styled.div`
  text-align: left;
  @media only screen and (min-width: 21.875em){
    justify-content: center;
    text-align: center;
  }
`;

// const RightText = styled.div`
//   text-align: right;
//   @media only screen and (min-width: 21.875em){
//     justify-content: center;
//     text-align: center;
//   }
// `;

const Contact = () => {

      const [name, setName] = useState("");
      const [email, setEmail] = useState("");
      const [message, setMessage] = useState("");

      const nameRef=useRef(null);
      const emailRef=useRef(null);
      const messageRef=useRef(null);



      const handleInputChange = (e) => {
          let tValues= e.target.value;
          if (e.target.name==='name') {
              setName(tValues);
          } else if (e.target.name==='email') {
              setEmail(tValues);            
          } else if (e.target.name==='message') {
              setMessage(tValues);                
          }    
      };
  
      const handleEnter = (event) => {
        if (event.key.toLowerCase() === "enter") {
           if (event.target.name==="name") {
              // if (CheckGet(1)) {
              if (name ==="") {
                toast.error("Name must be filled out!");
                 nameRef.current.focus();
                 return true;
              } else {
                emailRef.current.focus();
                return true;
              }     
           } else if (event.target.name==="email") {
                if (email ==="") {
                  toast.error("Email must be filled out!");
                   emailRef.current.focus();
                   return false;
                } else {
                    messageRef.current.focus();
                    return true;
                }  
           } else if (event.target.name==="message") {
                if (email ==="") {
                   toast.error("Message must be filled out!");
                   
                   messageRef.current.focus();
                   return false;
                } else {
                    handleSubmit();
                    return true;
                }       
           }
        } else if (event.keyCode===120) {
              // alert("F9-a");
              event.preventDefault();
        } else if (event.keyCode >=112 && event.keyCode <=117) {
                 // Turn off Function key F1 to F8
                 event.preventDefault();        
        } else if (event.keyCode >=119 && event.keyCode <=123) {
              // Turn off Function key F10 to F12
              event.preventDefault();        
        }
      };

      const handleSubmit = async (e) => {
          // alert('save submit')
          
          if (name ==="") {
            // alert("Name must be filled out!");
            toast.error("Name must be filled out!");
            nameRef.current.focus();
            e.preventDefault();
            return false;
         }     

         if (email ==="") {
              // alert("Message must be filled out!");
              toast.error("Message must be filled out!");
              messageRef.current.focus();
              e.preventDefault();
              return false;
          }       

          // return true;

           let newData= {
               name: name,
               email: email,
               message: message,
               website: 'riddmin.web.app'
           }

          let data= await addClientMessage(newData);

          console.log(data,data.status)
          if (data===undefined || data.status !== 200) {
              // alert('API error: ' + data.error);
              toast.error('API error: ' + data.error);
              nameRef.current.focus();
              return false;
          } else {
            //  alert("Successfully send...");
              toast.success("Successfully send...");
              setName('');
              setEmail('');
              setMessage('');
          }
          // console.log('data: ',data);
      }

      const imageClick = () => {
        alert('test')
      }

  return (
    <div>
      <ContactSection id="contact">
      <Typography color="black" variant="h4" align="center" mt={1}>
        Regional Intelligence Division 9
      </Typography>
      <Typography color="gray" variant="h7" align="center" mt={1}>
        Camp Col. Romeo Abendan, Mercedes, Zamboanga City
      </Typography>
      <Typography color="gray" variant="h7" align="center" mt={1}>
         Phone No.: 991-0559, Mobile No.: 09757170055, 0977855555 
      </Typography>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      
      {/* <h3>Regional Intelligence Divsion 9</h3> */}

      <Title>Get in touch</Title>
      {/* <Text>Lorem ipsum dolor sit amet, consectetur adipisicing.</Text> */}
      <Icons>
        <a style={{color:'blue'}} href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Visit ORO Business Group on Facebook">
          {" "}
          <img src={Facebook} alt="Facebook" />
        </a>
        <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" >
          <img src={LinkedId} style={{color:'blue'}} alt="LinkedId" target="_blank" rel="noopener noreferrer" />
        </a>
        <a href="https://twitter.com/"  target="_blank" rel="noopener noreferrer">
          <img src={Twitter} alt="Twitter" />
        </a>
        <a href="https://www.instagram.com/"  target="_blank" rel="noopener noreferrer">
          <img src={Instagram} alt="Instagram" />
        </a>
        {/* <NavLink to="/signinEmployee">
          <img src={PaySlip} alt="Pay Slip" />
        </NavLink> */}
      </Icons>
      <div style={{float: 'left', display:'inline-block'}}>
        <LeftText>
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Visit on Facebook">
            PNP Sibugay&nbsp;&nbsp;&nbsp;
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Visit on Facebook">
             PNP Davao&nbsp;&nbsp;&nbsp;
          </a>
        </LeftText>
        </div>
        <br/>
      <Form onSubmit={handleSubmit}> 
      <br/>
        <Row>
          <input 
              name="name" 
              type="text" 
              onKeyDown={handleEnter}
               ref={nameRef}
               onChange ={(e) => handleInputChange(e)}
              // onChange={(e) => {setName(e.target.value)}}
              placeholder="Your Name" />
          <input 
              name="email" 
              type="email" 
              onKeyDown={handleEnter}
              ref={nameRef}
              onChange ={(e) => handleInputChange(e)}
              // onChange={(e) => {setEmail(e.target.value)}}
              placeholder="Enter working email" />
        </Row>
        <Row>
          <input 
              name="mobileNo" 
              type="text" 
              onKeyDown={handleEnter}
               ref={nameRef}
               onChange ={(e) => handleInputChange(e)}
              // onChange={(e) => {setName(e.target.value)}}
              placeholder="Your Mobile No." />
              <span style={{marginRight:'28px'}}></span>
          <input 
              name="phoneNo" 
              type="text" 
              onKeyDown={handleEnter}
              ref={nameRef}
              onChange ={(e) => handleInputChange(e)}
              // onChange={(e) => {setEmail(e.target.value)}}
              placeholder="Your Phone No." />
        </Row>

        {/* <Row>
          <input name="contact" type="text" placeholder="Contact No." />
        </Row> */}
        <textarea
          name="message"
          id=""
          cols="30"
          rows="2"
          onKeyDown={handleEnter}
          ref={messageRef}
          onChange ={(e) => handleInputChange(e)}
          placeholder="Your Message"
        ></textarea>
        <div style={{ margin: "0 auto" }}>
          {/* <button
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            Submit
          </button> */}
          {/* <button className="neo1-primary"
            // onClick={(e) => {
            //   handleSubmit(e);
            // }}
          >
            Submit
          </button> */}
          <Button color="primary" variant="contained" fullWidth type="submit" sx={{ mt: 2 }}>
              Submit
        </Button>
        </div>
      </Form>
    </ContactSection>
   </div>    
  );
};

export default Contact;
