import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import Card, { ICardProps } from './card';

let ScrollToPlugin;

if (typeof window !== 'undefined') {
  ScrollToPlugin = require('gsap/ScrollToPlugin').ScrollToPlugin;
  gsap.registerPlugin(ScrollToPlugin);
}

const CarouselContainer = styled.div`
  display: flex;
  overflow-x: hidden;
  position: relative;
  margin: auto;
`;

const CardWrapper = styled.div`
  flex: 0 0 auto;
  width: 40vw;
  margin: ${(props) => props.theme.spacing};
`;

const IndicatorContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1em;
`;

interface IndicatorDotProps {
  isActive: boolean;
}

const IndicatorDot = styled.div<IndicatorDotProps>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => (props.isActive ? 'blue' : 'grey')};
  margin: 0 5px;
  cursor: pointer;
`;

interface ScrollButtonProps {
  direction: 'left' | 'right';
}

const ScrollButton = styled.button<ScrollButtonProps>`
  position: absolute;
  top: 50%;
  ${(props) => props.direction}: 10px;
  background: white;
  border: none;
  cursor: pointer;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  z-index: 1;
`;

export interface CarouselProps {
  cardContent: ICardProps[];
}

const Carousel: React.FC<CarouselProps> = ({ cardContent }) => {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scroll = (direction: 'left' | 'right') => {
    const cardWidth = carouselRef.current.firstChild.offsetWidth;
    gsap.to(carouselRef.current, {
      scrollTo: { x: direction === 'left' ? `-=${cardWidth}` : `+=${cardWidth}` },
      duration: 1,
    });
  };

  useEffect(() => {
    const checkCurrentCard = () => {
      const scrollLeft = carouselRef.current.scrollLeft;
      const cardWidth = carouselRef.current.firstChild.offsetWidth;
      const index = Math.round(scrollLeft / cardWidth);
      setCurrentIndex(index);
    };

    carouselRef.current.addEventListener('scroll', checkCurrentCard);
    return () => carouselRef.current.removeEventListener('scroll', checkCurrentCard);
  }, [cardContent.length]);

  return (
    <div>
      {currentIndex > 0 && <ScrollButton direction="left" onClick={() => scroll('left')}>Left</ScrollButton>}
      <CarouselContainer ref={carouselRef}>
        {cardContent.map((card, index) => (
          <CardWrapper key={index}>
            <Card {...card} />
          </CardWrapper>
        ))}
      </CarouselContainer>
      {currentIndex < cardContent.length - 1 && <ScrollButton direction="right" onClick={() => scroll('right')}>Right</ScrollButton>}
      <IndicatorContainer>
        {cardContent.map((_, index) => (
          <IndicatorDot key={index} isActive={index === currentIndex} onClick={() => gsap.to(carouselRef.current, {scrollTo: { x: index * carouselRef.current.firstChild.offsetWidth }, duration: 1})} />
        ))}
      </IndicatorContainer>
    </div>
  );
};

export default Carousel;