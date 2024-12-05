// components/library/TabCarousel.tsx

import React, { useState, useEffect, useRef } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, EffectFade, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/effect-fade';
import Image from 'next/image';

interface Tab {
    title: string;
    content: React.ReactNode;
    accentColor?: string;
    icon?: string;
}

interface TabCarouselProps {
    tabs: Tab[];
    interval?: number; // Interval in milliseconds (default: 7000ms)
    swiperEffect?: 'slide' | 'fade' | 'cards'; // Supported Swiper effects
}

const TabBar = styled.div`
    display: flex;
    border-radius: 999px; /* Pill shape */
    overflow: hidden;
    background-color: ${({ theme }) => theme.tabBarBackground || '#f0f0f0'};
    margin-bottom: 1.5rem;
    position: relative;
    
    @media (max-width: 768px) {
        font-size: 0.875rem; // Reduced from 1rem
    }
`;

const TabButton = styled.button.attrs<{ isActive: boolean }>((props) => ({
    'aria-selected': props.isActive,
    role: 'tab',
}))<{ isActive: boolean; accentColor: string }>`
    flex: 1;
    padding: 0.75rem 1.5rem;
    background-color: ${({ isActive, theme }) => (isActive ? theme.colors.accent.primary : 'transparent')};
    color: ${({ isActive, theme }) => (isActive ? theme.textOnAccent || '#fff' : theme.textColor || '#000')};
    border: none;
    cursor: pointer;
    position: relative;
    transition: background-color 0.3s, color 0.3s;
    overflow: hidden;

    .tab-text {
        font-size: 1rem;
    }

    .tab-icon {
        display: none;
        font-size: 1.5rem;
        
        img {
            width: 32px;
            height: 32px;
            object-fit: contain;
        }
    }

    &:not(:first-child) {
        border-left: 1px solid ${({ theme }) => theme.borderColor || '#ddd'};
    }

    @media (max-width: 768px) {
        padding: 1rem;

        .tab-text {
            display: none;
        }

        .tab-icon {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
`;

const progressAnimation = keyframes`
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
`;

const ProgressOverlay = styled.div<{ isAnimating: boolean; interval: number }>`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.2);
    //background-color: ${({ theme }) => theme.colors.accent.light};
    z-index: 0;
    ${({ isAnimating, interval }) =>
        isAnimating
            ? css`
                  width: 0%;
                  animation: ${progressAnimation} ${interval}ms linear forwards;
              `
            : css`
                  width: 100%;
              `}
`;

const TabContent = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledSwiper = styled(Swiper)`
    width: 100%;
    height: 100%;
`;

const ContentContainer = styled.div`
    min-height: 300px; /* Adjust as needed for uniformity */
    display: flex;
    justify-content: center;
    align-items: center;
`;

const TabCarousel: React.FC<TabCarouselProps> = ({
    tabs,
    interval = 7000,
    swiperEffect = 'slide',
}) => {
    const [currentTab, setCurrentTab] = useState(0);
    const [isAutoplay, setIsAutoplay] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const swiperRef = useRef<any>(null);
    const carouselRef = useRef<HTMLDivElement>(null);
    const [animationKey, setAnimationKey] = useState(0);

    // Determine if the progress animation should be active
    const isAnimating = isAutoplay && isInView;

    // Set up Intersection Observer to detect when TabCarousel is in view
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsInView(true);
                        setIsAutoplay(true); // Start autoplay when in view
                        setAnimationKey((prevKey) => prevKey + 1); // Restart animation
                    } else {
                        setIsInView(false);
                        setIsAutoplay(false); // Stop autoplay when out of view
                    }
                });
            },
            { threshold: 0.8 } // Adjust threshold as needed
        );

        if (carouselRef.current) {
            observer.observe(carouselRef.current);
        }

        return () => {
            if (carouselRef.current) {
                observer.unobserve(carouselRef.current);
            }
        };
    }, []);

    // Handle autoplay control based on isAutoplay and isInView
    useEffect(() => {
        if (swiperRef.current) {
            if (isAutoplay && isInView) {
                swiperRef.current.autoplay.start();
            } else {
                swiperRef.current.autoplay.stop();
            }
        }
    }, [isAutoplay, isInView]);

    // Handle tab click
    const handleTabClick = (index: number) => {
        if (swiperRef.current) {
            swiperRef.current.slideTo(index);
        }
        setIsAutoplay(false); // Stop auto-play on manual interaction
        setAnimationKey((prevKey) => prevKey + 1); // Set progress bar to 100%
    };

    // Handle slide change
    const handleSlideChange = (swiper: any) => {
        setCurrentTab(swiper.activeIndex);
        if (isAutoplay && isInView) {
            setAnimationKey((prevKey) => prevKey + 1); // Restart progress bar
        }
    };

    // Determine Swiper modules based on effect
    const getSwiperModules = () => {
        switch (swiperEffect) {
            case 'cards':
                return [EffectCards, Autoplay];
            case 'fade':
                return [EffectFade, Autoplay];
            default:
                return [Autoplay];
        }
    };

    // Determine Swiper effect configuration
    const getEffectConfig = () => {
        switch (swiperEffect) {
            case 'cards':
                return {
                    cardsEffect: {
                        rotate: 30,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: false,
                    },
                };
            case 'fade':
                return {
                    fadeEffect: {
                        crossFade: true,
                    },
                };
            default:
                return {};
        }
    };

    return (
        <div ref={carouselRef}>
            <TabBar role="tablist">
                {tabs.map((tab, index) => (
                    <TabButton
                        key={index}
                        isActive={index === currentTab}
                        onClick={() => handleTabClick(index)}
                        accentColor={tab.accentColor || '#0070f3'}
                    >
                        {index === currentTab && (
                            <ProgressOverlay
                                key={animationKey}
                                isAnimating={isAnimating}
                                interval={interval}
                            />
                        )}
                        <span className="tab-icon" aria-hidden="true">
                            {typeof tab.icon === 'string' && tab.icon.endsWith('.png') ? (
                                <Image
                                    src={tab.icon}
                                    alt={`${tab.title} icon`}
                                    width={32}
                                    height={32}
                                />
                            ) : (
                                tab.icon
                            )}
                        </span>
                        <span className="tab-text">
                            {tab.title}
                        </span>
                    </TabButton>
                ))}
            </TabBar>
            <ContentContainer>
                <StyledSwiper
                    effect={swiperEffect}
                    grabCursor={true}
                    modules={getSwiperModules()}
                    onSlideChange={handleSlideChange}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    autoplay={
                        isAutoplay && isInView
                            ? {
                                  delay: interval,
                                  disableOnInteraction: false,
                              }
                            : false
                    }
                    {...(getEffectConfig() as any)}
                    className="mySwiper"
                    style={{ width: '100%', height: '100%' }}
                >
                    {tabs.map((tab, index) => (
                        <SwiperSlide key={index}>
                            <TabContent>{tab.content}</TabContent>
                        </SwiperSlide>
                    ))}
                </StyledSwiper>
            </ContentContainer>
        </div>
    );
};

export default TabCarousel;
