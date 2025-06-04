import React from "react";
 import styled from "styled-components";
import Slider from "react-slick";
// import { Box, Typography, styled } from '@mui/material';
import { Typography } from '@mui/material';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import your images
import imgBuilding1 from "../../assets/imgBuilding1.webp";
import imgBuilding2 from "../../assets/imgBuilding2.jpg";
import imgBuilding3 from "../../assets/imgBuilding3.webp";
import imgBuilding4 from "../../assets/imgBuilding4.jfif";
import imgBuilding5 from "../../assets/imgBuilding5.jfif";
import imgBuilding6 from "../../assets/imgBuilding6.png";
import imgBuilding7 from "../../assets/imgBuilding7.jfif";
import imgBuilding8 from "../../assets/imgBuilding8.jfif";


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
const CarouselImage = styled('img')({
  width: '100%',
  height: 'auto',
  maxHeight: '400px',
  objectFit: 'cover',
  borderRadius: '10px', 
});

const SlideContent = styled.div`
  text-align: center;
  margin-top: 2rem;
`;


const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    // speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
  };

  

  const images = [
    { src: imgBuilding1, title: "Image 1", description: "This branch is located at ...." },
    { src: imgBuilding2, title: "Image 2", description: "This branch is located at ...." },
    { src: imgBuilding3, title: "Image 3", description: "This branch is located at ....." },
    { src: imgBuilding4, title: "Image 4", description: "This branch is located at ...." },
    { src: imgBuilding5, title: "Image 5", description: "This branch is located at  ...." },
    { src: imgBuilding6, title: "Image 6", description: "This branch is located at  ...." },
    { src: imgBuilding7, title: "Image 7", description: "This branch is located at  ...." },
    { src: imgBuilding8, title: "Image 8", description: "This branch is located at  ...." }, 
  ];


  return (
    
      <Section id="services">
        <Title>Testimonials and Services</Title>
        <CarouselContainer>
          <Slider {...settings}>
            {images.map((slide, index) => (
              <div key={index}>
                <CarouselImage src={slide.src} alt={`Avatar ${index + 1}`} />
                <SlideContent>
                  {/* <h4>{slide.title}</h4>
                  <p>{slide.description}</p> */}
                  <Typography variant="h4">{slide.title}</Typography>
                  <Typography variant="body1">{slide.description}</Typography>
                </SlideContent>
              </div>
            ))}
          </Slider>
        </CarouselContainer>
      </Section>
  );
};

export default Carousel;