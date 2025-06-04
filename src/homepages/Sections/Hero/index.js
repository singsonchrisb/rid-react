// This is HeroSection component, Main top section of website

// import { Button } from "bootstrap";
import styled, {keyframes } from "styled-components";
import { useNavigate } from 'react-router-dom';
// import {GetAPITokenJava}  from '../../../pages/Functions/GetAPIToken';


// import arrow from "../../assets/Arrow Right.png";
import Orobg from "../../assets/PRO9-building3.jpg";


const move = keyframes`
0% { transform: translateY(-5px)  }
    50% { transform: translateY(10px) }
    100% { transform: translateY(-5px) }
`;

const HomeSection = styled.section`
  width: 100vw;
  height: 45vw;
  background-color: #F8F8F8;
  display: flex;
  justify-content: center;
  position: relative;
  @media only Screen and (max-width: 48em) {
    height: 70vw;
    display: block;
  }
  @media only Screen and (max-width: 420px) {
    height: auto;
    padding-bottom: 2rem;
  }
`;

const MainContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70vw;
  @media only Screen and (max-width: 48em) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
  }
`;

const Oropng = styled.img`
  max-width: 100%;
  width: calc(30% + 20vw);
  height: auto;
  z-index: 7;
  animation: ${move} 2.5s ease infinite;
  @media only Screen and (max-width: 48em) {
    align-self: flex-start;
    position: absolute;
    bottom: 0;
    width: calc(30% + 20vw);
    opacity: 0.5;
  }
  @media only Screen and (max-width: 40em) {
    display: none;
  }
`;

const Lb = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 50%;
  line-height: 1.8;
  color: var(--white);
  position: relative;
  z-index: 15;
  @media only Screen and (max-width: 48em) {
    width: 80%;
    text-align: center;
    align-items: center;
    justify-content: space-around;
    margin-top: calc(2.5rem + 2.5vw);
    filter: drop-shadow(2px 4px 6px black);
  }
  @media only Screen and (max-width: 40em) {
    filter: none;
  }
`;



const Title = styled.h1`
  font-size: calc(2rem + 1vw);
  line-height: 1.2;
  padding: 0.5rem 0;
  color: #262626;
`;

const SubText = styled.h5`
  font-size: calc(0.5rem + 0.5vw);
  color: #555555;
  font-weight: 400;
`;

const CTA = styled.button`
  background-color: #84654d;
  color: #fafaf9;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: calc(0.5rem + 0.5vw);
  font-weight: 700;
  display: flex;
  align-items: center;
  transition: transform 0.2s;

  img {
    width: 1.5rem;
  }
  @media only screen and (max-width: 48em) {
    padding: 0.2rem 1rem;
  }
  &:hover {
    transform: scale(1.1);
  }
  &:active {
    transform: scale(0.9);
  }
`;

const HeroSection = () => {
  let navigate = useNavigate(); // use for Navigation
  let currentYear = new Date().getFullYear() - 1981;

  const imageClick = () => {
    // GetAPITokenJava();
    navigate('/signin');
  }

  const SignUpForm = () => {
    // import SignUpForm from './SignUpForm';
    navigate('/signupform');
  }


  return (
    <HomeSection id="home">
      <MainContent id="home">
        <Lb id="leftBlock">

         
          <Title>Creating outstanding solutions to fulfill all your needs</Title>
          <SubText>
          RID is a dynamic company in Zamboanga City and has been operating for {currentYear} years now, and is stronger than ever.
          </SubText>
          {/* <CTA alt="cta" width="100" height="100" onClick={()=> imageClick()}>
            Sign up&nbsp;&nbsp;
            <img src={arrow} alt="cta" width="100" height="100" />
          </CTA> */}

          <div style={{display: 'flex',marginTop:'15px'}}>
            <button className="btn-neo1-add" style={{marginRight:'50px',width:'120px', height:'45px'}} onClick={() => SignUpForm() } >Sign Up</button>
            <button className="btn-neo1-primary" style={{marginRight:'00px',width:'120px', height:'45px'}}  onClick={() => imageClick()} >Sign In
            </button>
          </div>
          
        </Lb>

        <Oropng style={{ borderRadius: 14 }}
          src={Orobg}
          alt="Building"
          srcSet=""
          width="400"
          height="400"
        />
      </MainContent>

      
    </HomeSection>
  );
};

export default HeroSection;
