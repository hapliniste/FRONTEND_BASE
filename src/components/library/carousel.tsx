import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import styled from 'styled-components';

export interface ISlideContent {
  content: React.ReactNode;
}

export interface ICarouselProps {
  slides: ISlideContent[];
}

const StyledSwiper = styled(Swiper)`
  .swiper-pagination {
    position: relative;
    margin-top: 1rem;
  }

  .swiper-pagination-bullet {
    background: ${({theme}) => theme.colors.accent.primary};
    opacity: 0.3;
    
    &-active {
      opacity: 1;
    }
  }

  .swiper-slide {
    height: auto;
    display: flex;
    justify-content: center;
  }
`;

const Carousel: React.FC<ICarouselProps> = ({ slides }) => {
  return (
    <StyledSwiper
      slidesPerView={1.2}
      centeredSlides={true}
      spaceBetween={16}
      loop={true}
      slidesPerGroup={1}
      watchSlidesProgress={true}
      preventInteractionOnTransition={true}
      pagination={{
        clickable: true,
        dynamicBullets: true,
      }}
      modules={[Pagination]}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={`slide-${index}`}>{slide.content}</SwiperSlide>
      ))}
    </StyledSwiper>
  );
};

export default Carousel;
