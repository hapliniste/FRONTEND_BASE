import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import styled from 'styled-components';

interface SlideContent {
  content: React.ReactNode;
}

interface CarouselProps {
  slides: SlideContent[];
}

const StyledSwiper = styled(Swiper)`
  padding: 0 1rem;
  
  .swiper-button-next,
  .swiper-button-prev {
    color: ${props => props.theme.accentPrimary};
  }

  .swiper-pagination-bullet-active {
    background-color: ${props => props.theme.accentPrimary};
  }

  .swiper-slide {
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 460px;

    @media (max-width: 767px) {
      max-width: 100%;
    }
  }
`;

const Carousel: React.FC<CarouselProps> = ({ slides }) => {
  return (
    <StyledSwiper
      slidesPerView={1}
      centeredSlides={true}
      spaceBetween={30}
      loop={true}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
      breakpoints={{
        768: {
          slidesPerView: 'auto',
        },
      }}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>{slide.content}</SwiperSlide>
      ))}
    </StyledSwiper>
  );
};

export default Carousel;
