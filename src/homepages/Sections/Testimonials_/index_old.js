import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
// import "../../../node_modules/slick-carousel/slick/slick.css";
// import "../../node_modules/slick-carousel/slick/slick.css";
// import "../../node_modules/slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import your images

import orobranch5 from "../../assets/ORO 5.svg";
import orobranch6 from "../../assets/ORO 6.svg";
import orobranch12 from "../../assets/ORO 12.svg";
import orobranch14 from "../../assets/ORO 14.svg";
import orobranch16 from "../../assets/ORO 16.svg";
import orobranch20 from "../../assets/ORO 20.svg";
import orobranch21 from "../../assets/ORO 21.svg";
import orobranch22 from "../../assets/ORO 22.svg";


const Section = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 5rem 0;
`;

const Title = styled.h1`
  color: #0a0b10;
  font-size: calc(0.8rem + 1.2vw);
  margin-top: 2rem;
  margin-bottom: 2.5rem;
  position: relative;

  &::before {
    content: "";
    height: 1px;
    width: 50%;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 0.5rem);
    border-bottom: 2px solid var(--purple);
  }
`;

const CarouselContainer = styled.div`
  width: 60vw;
  @media only screen and (max-width: 40em) {
    width: 90vw;
  }
    @media only screen and (max-width: 40em) {
      display: block;
    }
  }

  .slick-slide.slick-active {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0;
    padding: 0;
    margin-bottom: 3rem;
  }
`;

const CarouselImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 20px; /* Optional: Add border-radius for rounded corners */
`;

const SlideContent = styled.div`
  text-align: center;
  margin-top: 2rem;
`;

const Testimonials = () => {
  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
  };

  const images = [
    { src: orobranch5, title: "ORO Branch 5", description: "This branch is located at Puericulture." },
    { src: orobranch6, title: "ORO Branch 6", description: "This branch is located at Ciudad." },
    { src: orobranch12, title: "ORO Branch 12", description: "This branch is located at Southway Mall." },
    { src: orobranch14, title: "ORO Branch 14", description: "This branch is located at Gateway Mall." },
    { src: orobranch16, title: "ORO Branch 16", description: "This branch is located at Yubenco Mall Tetuan." },
    { src: orobranch20, title: "ORO Branch 20", description: "This branch is located at Sta. Maria." },
    { src: orobranch21, title: "ORO Branch 21", description: "This branch is located at SM MindPro." },
    { src: orobranch22, title: "ORO Branch 22", description: "This branch is located at KCC Mall deZamboanga." },
  ];

  return (
    <Section>
      <Title>ORO Branches</Title>
      <CarouselContainer>
        <Slider {...settings}>
          {images.map((slide, index) => (
            <div key={index}>
              <CarouselImage src={slide.src} alt={`Avatar ${index + 1}`} />
              <SlideContent>
                <h4>{slide.title}</h4>
                <p>{slide.description}</p>
              </SlideContent>
            </div>

          ))}
        </Slider>
      </CarouselContainer>
    </Section>
  );
};

export default Testimonials;
