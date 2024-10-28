import React, { useState, useEffect } from "react";
import {
  GalleryCarouselContainer,
  GalleryCarouselWrapper
} from "./GalleryCarousel.styled";
import Typography from "../display/typography/Typography";
import dynamic from "next/dynamic";
import slides from "./slides";

const Carousel = dynamic(() => import("react-spring-3d-carousel"), {
  ssr: false
});

const GalleryCarousel = () => {
  slides.map((slide, index) => {
    return { ...slide, onClick: () => setCurrentSlideIndex(index) };
  });

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    // Set up the interval for auto-sliding
    const intervalId = setInterval(() => {
      setCurrentSlideIndex((prevIndex) =>
        // Move to next slide, or back to first slide if at the end
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 3500); // 5000ms = 5 seconds

    // Clean up the interval when component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <GalleryCarouselContainer>
      <Typography variant="h1">Highlights from the past</Typography>
      <GalleryCarouselWrapper>
        <Carousel
          slides={slides}
          offsetRadius={5}
          goToSlide={currentSlideIndex}
        />
      </GalleryCarouselWrapper>
    </GalleryCarouselContainer>
  );
};

export default GalleryCarousel;
