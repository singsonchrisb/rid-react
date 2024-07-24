import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import imgLogo from "../../assets/PRO9-small.jpg";

// import {GetAPITokenJava}  from '../../../pages/Functions/GetAPIToken';

// import PRO9-small

const Headers = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 5rem;
  background-color: #ffffff;
  color: #84654d;
  position: relative;
  z-index: 500;
  @media only Screen and (max-width: 64em) {
    padding: 0.5rem 3rem;
  }
  @media only Screen and (max-width: 40em) {
    padding: 0.5rem 1.5rem;
  }
`;

// const Logo = styled.a`
//   display: flex;
//   align-items: center;
//   width: 2rem;
//   height: auto;
//   cursor: pointer;
//   img {
//     margin-right: 0.5rem;
//   }
// `;

const Logo = styled.h3`
  display: flex;
  font-family: Poppins;
  align-items: left;
  width: 2rem;
  height: auto;
  cursor: pointer;
  img {
    margin-right: 0.2rem;
  }
`;

const Nav = styled.nav`
  width: 30rem;
  max-width: 50rem;
  font: Poppins;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.3s;
  @media only Screen and (max-width: 53.125em) {
    display: none;
  }
  a {
    font-weight: 400;
    line-height: 1.5;
    color: #262626;
    &::after {
      content: "";
      display: block;
      height: 3.1px;
      border-radius: 4px;
      width: 0;
      background: transparent;
      transition: width 0.5s;
    }
    &:not(:last-child):hover::after {
      width: 100%;
      background: #84654d;
    }
    /* &:not(:last-child) {
      margin-right: 2rem;
    } */
    /* @media only Screen and (max-width: 53.125em) {
      &:not(:last-child) {
        margin-right: 1rem;
      }
    } */
  }
`;

const Button = styled.button`
  background-color: #84654d;
  padding: 0.8rem 1.3rem;
  border-radius: 0.4rem;
  color: #fafaf9;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    transform: scale(1.1);
  }
  &:focus {
    transform: scale(0.9);
  }
  @media only Screen and (max-width: 40em) {
    font-size: 1.2rem;
    &:hover {
      transform: none;
    }
    &:focus {
      transform: none;
    }
  }
`;

const HamburgerBtn = styled.button`
  display: none;
  @media only Screen and (max-width: 53.125em) {
    display: inline-block;
  }
  position: relative;
  background-color: transparent;
  width: 2rem;
  height: 8px;
  margin-top: 0rem;
  transition: all 0.3s;
  cursor: pointer;
  &::before,
  &::after {
    content: "";
    background-color: #84654d;
    width: 2rem;
    height: 4px;
    border-radius: 4px;
    display: inline-block;
    position: absolute;
    left: 0;
    cursor: pointer;

    transition: all 0.3s;
  }
  &::before {
    top: ${(props) => (props.clicked ? "0" : "-0.5rem")};
    transform: ${(props) => (props.clicked ? "rotate(135deg)" : "rotate(0)")};
  }
  &::after {
    top: ${(props) => (props.clicked ? "0" : "0.5rem")};
    transform: ${(props) => (props.clicked ? "rotate(-135deg)" : "rotate(0)")};
  }
`;


const MobileMenu = styled.nav`
  display: none;
  @media only Screen and (max-width: 48em) {
    display: flex;
  }
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  overflow-x: hidden;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  opacity: ${(props) => (props.clicked ? "1" : 0)};
  visibility: ${(props) => (props.clicked ? "visible" : "hidden")};
  transition: all 0.5s;
  z-index: -10;
  background-color: rgb(53 53 63 / 95%);
  border-radius: 20px;
  margin: 0.5rem;
  a {
    color: var(--white);
    font-weight: 600;
    font-size: 1.5rem;
    margin: 1.5rem;
    cursor: pointer;
  }
`;


const Header = () => {
  let navigate = useNavigate(); // use for Navigation


  const [click, setClick] = useState(false);
  //const handleClick = () => setClick(!click);
  const ref = useRef(null);
  const [auth, setAuth] = useState('');
  const [homeOpen, setHomeOpen] = useState('');


  useEffect(() => {
    var authGet = sessionStorage.getItem('loginName');
    // var userNameGet = sessionStorage.getItem('userName');
    var homeGet = sessionStorage.getItem('homeOpen');
    // readConfigFile();
    setAuth(authGet);
    // setUser(userNameGet);
    setHomeOpen(homeGet);
    // setHomeOpen(formGet)
    // getProducts();
    // getProfile();
     
  },[])

  // alert('auth: '+ auth + ", homeOpen: " + homeOpen)

  if (auth===null && homeOpen===null) {
    // navigate('/signin');
    // navigate('/homepage');
    // sessionStorage.removeItem('homeOpen');
  } else if (auth===null && !homeOpen===null) {
     navigate('/signin');
  }

  gsap.registerPlugin(ScrollTrigger);

  const scrollUp = (id, e) => {
    e.preventDefault();
    const element = document.getElementById(id);
    element.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };

  const handleClick = (id, e) => {
    setClick(!click);
    scrollUp(id, e);
  };

  const imageClick = () => {
    // GetAPITokenJava();
    navigate('/signin');
  }

  useEffect(() => {
    const element = ref.current;

    const mq = window.matchMedia("(max-width: 40em)");
    // console.log("mq", mq);
    if (mq.matches) {
      gsap.to(element, {
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        padding: "1rem 2.5rem",

        borderRadius: "0 0 50px 50px",

        border: "2px solid var(--white)",

        duration: 1,
        ease: "power1.out",

        scrollTrigger: {
          trigger: element,
          start: "bottom+=200 top",
          end: "+=100",
          scrub: true,
        },
      });
    } else {
      gsap.to(element, {
        position: "fixed",
        top: "1rem",
        left: "3rem",
        right: "3rem",
        padding: "1.5rem 2rem",

        borderRadius: "50px",

        border: "3px solid var(--white)",

        duration: 1,
        ease: "power1.out",

        scrollTrigger: {
          trigger: element,
          start: "bottom+=300 top",
          end: "+=250",
          scrub: true,
        },
      });
    }
  }, []);

  

  return (
    <Headers ref={ref}>
      <Logo>
        <img src={imgLogo} alt="logo" srcSet="" width="400" height="400" />
        {/* <h2>RID&nbsp;9</h2>  */}
        {/* <h2>Regional&nbsp;Intelligence&nbsp;Division&nbsp;9</h2>  */}
        {/* <h3>RID&nbsp;Clearance</h3> */}

        {isMobile ? 
         <h3>RID&nbsp;Clearance</h3> 
         :
         <h2>Regional&nbsp;Intelligence&nbsp;Division&nbsp;9</h2> 
        }

      </Logo>
      <Nav>
        <a href="#home" onClick={(e) => scrollUp("home", e)}>
          Home
        </a>
        <a href="#about" onClick={(e) => scrollUp("about", e)}>
          About Us
        </a>
        {/* <a href='https://www.oro.com.ph/index/ORO_Gold_Card.html' target="_blank"> */}
        <a href='#' target="_blank">
          Facebook 
        </a>
         {/* <a href="#services" onClick={(e) => scrollUp("services", e)}>  */}
         <a href="#services" onClick={(e) => scrollUp("services", e)}> 
         {/* <a href="#carousel" onClick={(e) => scrollUp("hero", e)}>  */}
          Services
        </a>
        <a href="#contact" onClick={(e) => scrollUp("contact", e)}>
          Contact Us
        </a>
        

        {/* <a href="#contact" onClick={(e) => scrollUp("contact", e)}>
          Print Virtual Barcode
        </a> */}
        {/* <a href="/signin" onClick={(e) => scrollUp("home", e)}>
          <Button>My ORO App</Button>
        </a> */}
        
        <Button className="btn-neo1-primary" onClick={(e) => imageClick()}>Sign In</Button>
        
        {/* <Nav.Link onClick={imageClick}>My ORO App</Nav.Link>   */}
      </Nav>

      <HamburgerBtn clicked={+click} onClick={() => setClick(!click)}>
        <span></span>
      </HamburgerBtn>
      <MobileMenu clicked={+click}>
        <a href="#home" onClick={(e) => handleClick("home", e)}>
          Home
        </a>
        <a href="#about" onClick={(e) => handleClick("about", e)}>
          About Us
        </a>
        {/* <a href='https://www.oro.com.ph/index/ORO_Gold_Card.html' target="_blank">
          Gold Card
        </a> */}
        <a href="#" onClick={(e) => handleClick("facebook", e)}>
          Facebook
        </a>
        <a href="#services" onClick={(e) => handleClick("services", e)}>
          Services
        </a>
        <a href="#contact" onClick={(e) => handleClick("contact", e)}>
          Contact Us
        </a>
        {/* <a href="#contact" onClick={(e) => handleClick("contact", e)}>  
        </a>
        <Button className="btn-neo1-primary"  onClick={(e) => imageClick()}>Sign In</Button> */}
        {/* <button className="btn-neo1-primary" style={{marginRight:'00px',width:'120px', height:'45px'}}  onClick={() => imageClick()} >Sign In */}

      </MobileMenu>
    </Headers>
  );
};

export default Header;
