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
  .swiper-button-next,
  .swiper-button-prev {
    color: ${props => props.theme.accentPrimary};
  }

  .swiper-pagination-bullet-active {
    background-color: ${props => props.theme.accentPrimary};
  }
`;

const Carousel: React.FC<CarouselProps> = ({ slides }) => {
  return (
    <StyledSwiper
      slidesPerView={1.2}
      spaceBetween={30}
      loop={true}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>{slide.content}</SwiperSlide>
      ))}
    </StyledSwiper>
  );
};

export default Carousel;