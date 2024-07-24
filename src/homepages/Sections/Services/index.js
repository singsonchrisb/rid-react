import gsap from "gsap";
import { useEffect, useRef } from "react";
import styled from "styled-components";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import Tube from "../../assets/3dtube.png";
import Crown from "../../assets/Crown.svg";
import Capsule from "../../assets/3dcapsule.png";
import Basket from "../../assets/3dbasket.svg";
import Van from "../../assets/fotoncar.svg";


import TextBlock from "../../components/TextBlock";
import SvgBlock from "../../components/SvgBlock";

// const TextBlock = lazy(() => import("../../components/TextBlock"));
// const SvgBlock = lazy(() => import("../../components/SvgBlock"));

const ServiceSection = styled.section`
  width: 100vw;
  /* background-color: #fff; */
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  justify-content: center;
  position: relative;
  padding-top: 20rem;
  color: #262626;
`;

const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100vw;
  height: 85vh;
  z-index: -1;
  background-color: #fff;
  background-size: auto 100vh;
  background-repeat: no-repeat;
`;

const Title = styled.h1`
  color: #262626;
  display: inline-block;
  font-size: 2rem;
  /* margin-top: 4rem; */
  margin-top: 1rem;
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
    border-bottom: 2px solid #9b7f60;
  }
`;

const Line = styled.span`
  border-left: 4px solid #9b7f60;
  height: 15rem;
  margin-top: 2rem;
  border-radius: 20px 20px 0 0;
`;

const Triangle = styled.span`
  width: 0;
  height: 0;
  border-left: 1.2rem solid ;
  border-right: 1.2rem solid ;
  border-top: 2rem solid #262626 );
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10rem 10rem;
  /* margin-bottom: 10rem; */
  position: relative;
  @media only Screen and (max-width: 64em) {
    margin: 10rem calc(4rem + 5vw);
  }
  @media only Screen and (max-width: 48em) {
    display: block;
    &:last-child {
      margin-bottom: 2rem;
    }
  }
  @media only Screen and (max-width: 40em) {
    margin: 10rem calc(2rem + 3vw);
    &:last-child {
      margin-bottom: 1rem;
    }
  }
`;

const OBJ = styled.div`
  position: absolute;
  top: 80%;
  right: 35%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20vw;
  /* z-index: 1; */

  @media only Screen and (max-width: 48em) {
    opacity: 0.5;
  }
`;


const Services = () => {
  const ref = useRef(null);
  gsap.registerPlugin(ScrollTrigger);
  const revealRefs = useRef([]);
  revealRefs.current = [];

  useEffect(() => {
    const element = ref.current;
    ////
    const mq = window.matchMedia("(max-width: 48em)");
    const t1 = gsap.timeline({
      scrollTrigger: {
        trigger: document.getElementById("services2"),

        start: "top top+=180",

        end: "bottom bottom",

        pin: element,
        pinReparent: true,
      },
    });
    t1.fromTo(
      document.getElementById("line2"),

      {
        height: "15rem",
      },
      {
        height: "3rem",
        duration: 0,
        scrollTrigger: {
          trigger: document.getElementById("line2"),
          start: "top top+=200",
          end: "bottom top+=220",
          scrub: true,
        },
      }
    );

    revealRefs.current.forEach((el, index) => {
      // console.log(el.childNodes);
      if (mq.matches) {
        t1.from(
          el.childNodes[0],

          {
            x: -300,
            opacity: 0,
            duration: 0,

            ease: "power2",
            scrollTrigger: {
              id: `section-${index + 1}`,
              trigger: el,
              start: "top center+=200",
              end: "bottom bottom-=100",
              scrub: true,
              snap: true,
              //
              // toggleActions: "play none none reverse",
            },
          }
        )
          .to(el.childNodes[1], {
            transform: "scale(0)",

            ease: "power2.inOut",

            scrollTrigger: {
              id: `section-${index + 1}`,
              trigger: el.childNodes[1],
              start: "top center",
              end: "bottom center",
              scrub: true,
              snap: true,

              // toggleActions: "play none none reverse",
            },
          })
          .from(
            el.childNodes[2],

            {
              y: 400,

              duration: 0,

              ease: "power2",
              scrollTrigger: {
                id: `section-${index + 1}`,
                trigger: el,
                start: "top center+=100",
                end: "bottom bottom-=200",
                scrub: true,
                snap: true,
                //
                // toggleActions: "play none none reverse",
              },
            }
          )
          .to(
            el,

            {
              opacity: 0,

              ease: "power2",
              scrollTrigger: {
                id: `section-${index + 1}`,
                trigger: el,
                start: "top top+=300",
                end: "center top+=300",
                scrub: true,
              },
            }
          );
      } else {
        t1.from(
          el.childNodes[0],

          {
            x: -300,
            opacity: 0,
            duration: 0,

            ease: "power2",
            scrollTrigger: {
              id: `section-${index + 1}`,
              trigger: el,
              start: "top center+=100",
              end: "bottom bottom-=200",
              scrub: true,
              snap: true,
              //
              // toggleActions: "play none none reverse",
            },
          }
        )
          .to(el.childNodes[1], {
            transform: "scale(0)",

            ease: "power2.inOut",

            scrollTrigger: {
              id: `section-${index + 1}`,
              trigger: el.childNodes[1],
              start: "top center",
              end: "bottom center",
              scrub: true,
              snap: true,

              // toggleActions: "play none none reverse",
            },
          })
          .from(
            el.childNodes[2],

            {
              y: 400,

              duration: 0,

              ease: "power2",
              scrollTrigger: {
                id: `section-${index + 1}`,
                trigger: el,
                start: "top center+=100",
                end: "bottom bottom-=200",
                scrub: true,
                snap: true,
                //
                // toggleActions: "play none none reverse",
              },
            }
          )
          .to(
            el,

            {
              opacity: 0,

              ease: "power2",
              scrollTrigger: {
                id: `section-${index + 1}`,
                trigger: el,
                start: "top top+=200",
                end: "center top+=300",
                scrub: true,
              },
            }
          );
      }
    });
  }, []);


  const addToRefs = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  return (
    <ServiceSection id="services2">
      <Background ref={ref}>
        <Title style={{ textAlign: "center"}} className="title">ORO Business Group is primarily composed of the following</Title>
        <Line id="line2" />
        <Triangle id="triangle" />
      </Background>

      <Content ref={addToRefs}>
        <TextBlock
          topic="Pharmacy"
          title={<h1>ORO Wonder Drug ...</h1>}
          subText={
            <h5>
              Discover health and wellness at ORO Wonder Drug, where care meets convenience, providing a trusted source for all your pharmaceutical needs.
            </h5>
          }
        />
        <OBJ>
          <img src={Tube} alt="Tube Object" width="400" height="400" />
        </OBJ>
        <SvgBlock svg="Design.svg" />
      </Content>
      <Content ref={addToRefs}>
        <TextBlock
          topic="Jewelry Shop"
          title={<h1>ORO Megaworld Jewelry & Pawnshop...</h1>}
          subText={
            <h5>
              Elevate your style with elegance and embrace financial flexibility at ORO Megaworld Jewelry & Pawnshop, where timeless treasures and secure transactions redefine luxury
            </h5>
          }
        />
        <OBJ>
          <img src={Crown} alt="Cone Object" width="400" height="400" />
        </OBJ>
        <SvgBlock svg="3dring.png" />
      </Content>
      <Content ref={addToRefs}>
        <TextBlock
          topic="Grocery Store"
          title={<h1>ORO Convenience Store ...</h1>}
          subText={
            <h5>
              Experience the ease of everyday living at ORO Convenience Store, your one-stop destination for quality groceries and essential items, where convenience meets affordability.
            </h5>
          }
        />
        <OBJ>
          <img src={Basket} alt="Tube Object" width="400" height="400" />
        </OBJ>
        <SvgBlock svg="3dshop.png" />
      </Content>
      <Content ref={addToRefs}> 
        <TextBlock
          topic="Automobile Shop"
          title={<h1>Foton Motors - commercial trucks & vehicles ...</h1>}
          subText={
            <h5>
              Drive into a world of reliability and performance at Foton Motors, where every journey begins with top-notch vehicles that embody innovation, durability, and the thrill of the open road.
            </h5>
          }
        />
        <OBJ>
          <img src={Van} alt="Tube Object" width="400" height="400" />
        </OBJ>
        <SvgBlock svg="fotontunland.svg" />
      </Content>
      <Content ref={addToRefs}>
        <TextBlock
          topic="Cellphone Shop"
          title={<h1>ORO Telecom</h1>}
          subText={
            <h5>
              We offer contemporary and affordable mobile phones, combining modern features with budget-friendly options.
            </h5>
          }
        />
        <OBJ>
          <img src={Capsule} alt="Capsule Object" width="400" height="400" />
        </OBJ>
        <SvgBlock svg="Communication.svg" />
      </Content>
    </ServiceSection>
  );
};

export default Services;
