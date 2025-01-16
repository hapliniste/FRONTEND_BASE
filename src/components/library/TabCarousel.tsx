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
    icon?: string | React.ReactNode;
}

interface TabCarouselProps {
    tabs: Tab[];
    interval?: number; // Interval in milliseconds (default: 7000ms)
    swiperEffect?: 'slide' | 'fade' | 'cards'; // Supported Swiper effects
    enableAutoplay?: boolean; // Whether autoplay should be enabled
}

const TabBar = styled.div`
    display: flex;
    width: 100%;
    height: 56px;
    border-radius: 999px;
    overflow: hidden;
    background-color: ${({ theme }) => theme.colors.backgrounds.white};
    margin-bottom: 2rem;
    position: relative;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    
    @media (max-width: 768px) {
        font-size: 0.875rem;
        height: 48px;
        margin: 0 ${({theme}) => theme.spacing.xsmall} 1.5rem;
    }
`;

const TabButton = styled.button<{ isActive: boolean }>`
    flex: 1;
    height: 100%;
    border: none;
    background: ${({ isActive, theme }) =>
        isActive ? theme.colors.accent.primary : 'transparent'};
    color: ${({ isActive, theme }) =>
        isActive ? theme.colors.basic.white : theme.colors.accent.primary};
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 500;
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0 1rem;

    .tab-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        font-size: 1.25rem;
        transition: transform 0.3s ease;
        color: ${({ isActive, theme }) => isActive ? theme.colors.basic.white : theme.colors.text.primary};

        svg [opacity="0.2"] {
            opacity: 0.2;
            //fill: ${({ isActive, theme }) => isActive ? theme.colors.basic.white : theme.colors.accent.primary};
            fill: ${({ theme }) => theme.colors.accent.primary};
        }
    }

    .tab-text {
        font-weight: 600;
    }

    @media (max-width: 768px) {
        padding: 0;
        .tab-text {
            display: none;
        }
    }

    &:hover {
        background: ${({ isActive, theme }) =>
            isActive ? theme.colors.accent.primary : `${theme.colors.accent.primary}12`};
        
        .tab-icon {
            transform: scale(1.1);
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
    //cursor: pointer;
`;

const StyledSwiper = styled(Swiper)`
    width: 100%;
    height: 100%;
    padding: ${({ theme }) => theme.spacing.medium} 0;

    .swiper-slide {
        transition: all 0.3s ease;
        opacity: 0.4;
    }

    .swiper-slide-active {
        opacity: 1;
    }

    @media (max-width: 768px) {
        padding: ${({ theme }) => theme.spacing.xsmall} 0;
    }
`;

const ContentContainer = styled.div`
    min-height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 ${({ theme }) => theme.spacing.medium};

    @media (max-width: 768px) {
        margin: 0 ${({ theme }) => theme.spacing.xsmall};
    }
`;

const TabCarousel: React.FC<TabCarouselProps> = ({
    tabs,
    interval = 7000,
    swiperEffect = 'slide',
    enableAutoplay = true,
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
                        setIsAutoplay(enableAutoplay);
                        setAnimationKey((prevKey) => prevKey + 1);
                    } else {
                        setIsInView(false);
                        setIsAutoplay(false);
                    }
                });
            },
            { threshold: 0.8 }
        );

        const currentRef = carouselRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [enableAutoplay]);

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
        setIsAutoplay(false); // Stop auto-play on tab click
        setAnimationKey((prevKey) => prevKey + 1);
    };

    // Handle manual swipe interaction
    const handleSlideChange = (swiper: any) => {
        setCurrentTab(swiper.activeIndex);
        if (isAutoplay && isInView) {
            setAnimationKey((prevKey) => prevKey + 1); // Restart progress bar
        }
    };

    // Remove the onTouchStart handler and replace with onSwiper
    const handleSwiperInit = (swiper: any) => {
        swiperRef.current = swiper;
        
        // Add custom event listeners for actual swipe movements
        swiper.on('sliderFirstMove', () => {
            setIsAutoplay(false); // Stop autoplay only when user actually starts swiping
        });
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

    useEffect(() => {
        const currentRef = carouselRef.current;
        
        const handleScroll = () => {
            if (currentRef) {
                // ... scroll handling code
            }
        };

        if (currentRef) {
            currentRef.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (currentRef) {
                currentRef.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    // Add content click handler
    const handleContentClick = () => {
        setIsAutoplay(false);
        setAnimationKey((prevKey) => prevKey + 1);
    };

    return (
        <div ref={carouselRef}>
            <TabBar role="tablist">
                {tabs.map((tab, index) => (
                    <TabButton
                        key={index}
                        isActive={index === currentTab}
                        onClick={() => handleTabClick(index)}
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
                                    width={128}
                                    height={128}
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
                    onSwiper={handleSwiperInit}
                    autoplay={
                        isAutoplay && isInView
                            ? {
                                  delay: interval,
                                  disableOnInteraction: true,
                              }
                            : false
                    }
                    {...(getEffectConfig() as any)}
                    className="mySwiper"
                    style={{ width: '100%', height: '100%' }}
                >
                    {tabs.map((tab, index) => (
                        <SwiperSlide key={index}>
                            <TabContent onClick={handleContentClick}>
                                {tab.content}
                            </TabContent>
                        </SwiperSlide>
                    ))}
                </StyledSwiper>
            </ContentContainer>
        </div>
    );
};

export default TabCarousel;
