import styled, { keyframes } from "styled-components";
//  import human from "../../assets/human.svg";
// import hand from "../../assets/hand.svg";
import human from "../../assets/PRO9-finest.jpg";
import hand from "../../assets/PRO9-finest.jpg";
import branch from "../../assets/oro.jpg";

const move = keyframes`
0% { transform: translateY(-5px)         }
    50% { transform: translateY(10px) translateX(10px)        }
    100% { transform: translateY(-5px)         }
`;

const AboutSection = styled.section`
  width: 100vw;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Hand = styled.div`
  position: absolute;
  bottom: -1rem;
  right: 0;

  @media only Screen and (max-width: 40em) {
    display: none;
  }
`;

const Main = styled.div`
  margin: 0 15rem;
  margin-top: 15rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  @media only Screen and (max-width: 64em) {
    margin: 0 calc(5rem + 5vw);
    margin-top: 10rem;
  }
  @media only Screen and (max-width: 40em) {
    align-items: center;
    margin: 3rem calc(3rem + 3vw);
  }
`;


const Title = styled.h1`
  font-size: 2rem;
  display: inline-block;
`;

const CurvedLine = styled.div`
  width: 7rem;
  height: 2rem;
  border: solid 5px blue;
  border-color: #84654d transparent transparent transparent;
  border-radius: 150%/60px 70px 0 0;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media only Screen and (max-width: 40em) {
    flex-direction: column;
  }
`;

const Rocket = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  width: 40%;
  padding-bottom: 5rem;
  animation: ${move} 2.5s ease infinite;
  @media only Screen and (max-width: 40em) {
    width: 50vw;
    padding-bottom: 0;
  }
`;
const Human = styled.div`
  max-width: 25%;
  position: absolute;
  right: 0;
  bottom: 100%;

  @media only Screen and (max-width: 40em) {
    display: none;
    width:25%
  }
`;

const Text = styled.h4`
  font-size: calc(0.4rem + 0.9vw);
  line-height: 1.5;
  color: #555555;
  font-weight: 400;
`;
const Circle = styled.span`
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: black;
  margin-right: 0.5rem;
  margin-top: 1rem;
`;
const AboutText = styled.div`
  width: 50%;
  position: relative;
  @media only Screen and (max-width: 40em) {
    width: 100%;
  }
`;

const About = () => {
  let currentYear = new Date().getFullYear() - 1981;

  return (
    <AboutSection id="about">
      {/* <Waves src={Waves} alt="" /> */}
      {/* <Hand>
        <img src={hand} alt="" />
      </Hand> */}
      <Main>
        <div>
          <Title>About Us</Title>
          <CurvedLine />
        </div>
        <Content>
          <Rocket>
            <img style={{ borderRadius: 14 }} src={branch} alt="" width="400" height="400" />
          </Rocket>
          <AboutText>
            <Human>
              <img src={human} alt="" width="400" height="400" />
            </Human>

            <Text>
             RID is a dynamic company in Zamboanga City, Philippines that has started its roots. more... content....
             {/* in the pharmaceutical industry and has since expanded into the jewellery, pawnshop, grocery, and telecom, restaurant and automotive industries. ORO has been operating for {currentYear} years now, and is stronger than ever */}
            </Text>
            <div>
              <Circle style={{ backgroundColor: "#555555" }} />
              <Circle style={{ backgroundColor: "#555555" }} />
              <Circle style={{ backgroundColor: "#555555" }} />
            </div>
          </AboutText>
        </Content>
      </Main>
    </AboutSection>
  );
};

export default About;
