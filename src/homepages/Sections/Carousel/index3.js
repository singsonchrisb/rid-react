import React from 'react';
import Slider from 'react-slick';
import { Box, Typography, styled } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


import imgBuilding1 from "../../assets/imgBuilding1.webp";
import imgBuilding2 from "../../assets/imgBuilding2.jpg";
import imgBuilding3 from "../../assets/imgBuilding3.webp";
import imgBuilding4 from "../../assets/imgBuilding4.jfif";
import imgBuilding5 from "../../assets/imgBuilding5.jfif";
import imgBuilding6 from "../../assets/imgBuilding6.png";
import imgBuilding7 from "../../assets/imgBuilding7.jfif";
import imgBuilding8 from "../../assets/imgBuilding8.jfif";

const Section = styled(Box)({
  padding: '2rem 0',
  textAlign: 'center',
});

const Title = styled(Typography)({
  marginBottom: '2rem',
  fontSize: '2rem',
  fontWeight: 'bold',
});

const CarouselContainer = styled(Box)({
  maxWidth: '800px',
  margin: '0 auto',
});

const CarouselImage = styled('img')({
  width: '100%',
  height: 'auto',
  maxHeight: '400px',
  objectFit: 'cover',
  borderRadius: '10px', /* Optional: Add border-radius for rounded corners */
});

const SlideContent = styled(Box)({
  textAlign: 'center',
  padding: '1rem',
});

const images1 = [
  {
    src: 'path-to-your-image1.jpg',
    title: 'Service 1',
    description: 'Description for service 1',
  },
  {
    src: 'path-to-your-image2.jpg',
    title: 'Service 2',
    description: 'Description for service 2',
  },
  {
    src: 'path-to-your-image3.jpg',
    title: 'Service 3',
    description: 'Description for service 3',
  },
  // Add more slides as needed
];

const images = [
    { src: imgBuilding1, title: "Image 1", description: "Description for service 1 ...." },
    { src: imgBuilding2, title: "Image 2", description: "Description for service 2 ...." },
    { src: imgBuilding3, title: "Image 3", description: "Description for service 3 ....." },
    { src: imgBuilding4, title: "Image 4", description: "Description for service 4 ...." },
    { src: imgBuilding5, title: "Image 5", description: "Description for service 5  ...." },
    { src: imgBuilding6, title: "Image 6", description: "Description for service 6  ...." },
    { src: imgBuilding7, title: "Image 7", description: "Description for service 7  ...." },
    { src: imgBuilding8, title: "Image 8", description: "Description for service 8  ...." }, 
  ];

const settings = {
  dots: true,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 3000,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  swipeToSlide: true,
};

function ServicesCarousel() {
  return (
    <Section>
      <Title>Testimonials and Services</Title>
      <CarouselContainer>
        <Slider {...settings}>
          {images.map((slide, index) => (
            <div key={index}>
              <CarouselImage src={slide.src} alt={`Avatar ${index + 1}`} />
              <SlideContent>
                <Typography variant="h4">{slide.title}</Typography>
                <Typography variant="body1">{slide.description}</Typography>
              </SlideContent>
            </div>
          ))}
        </Slider>
      </CarouselContainer>
    </Section>
  );
}

export default ServicesCarousel;
