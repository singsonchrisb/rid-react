import styled from "styled-components";
import { appVersion } from "../../../functions/ChrisFunctions";

let showAppVersion =appVersion();

const FOOTER = styled.footer`
  padding: 1.2rem calc(2.5rem + 2.5vw);
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media only Screen and (max-width: 48em) {
    flex-direction: column;
    align-items: center;
    div {
      &:first-child {
        margin-bottom: 1rem;
        align-items: center;
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
// Adjusted a little for the alignment in RightText
const RightText = styled.div`
  text-align: right;
  @media only screen and (min-width: 21.875em){
    justify-content: center;
    text-align: center;
  }
`;


const Footer = () => {
  return (
    <FOOTER>
      <LeftText>
      <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Visit on Facebook">
          Link1&nbsp;&nbsp;&nbsp;
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Visit on Facebook">
          Link2&nbsp;&nbsp;&nbsp;
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Visit on Facebook">
          Link3&nbsp;&nbsp;&nbsp;
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Visit on Facebook">
          Link4&nbsp;&nbsp;&nbsp;
        </a>
      </LeftText>
      <RightText>
         © 2024 Built and Design by{" "}
        <a href="https://www.youtube.com/">
          @PMCDevTeam
        </a>
        <p style={{fontSize:'11px', color:'black'}}> {showAppVersion} </p>

        
      </RightText>

    </FOOTER>
  );
};

export default Footer;

//© 2024 Design by @ORO DevTeam.
