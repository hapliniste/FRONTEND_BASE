// components/library/TabCarousel.tsx

import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled, { css } from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, EffectFade, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/effect-fade'; // Import additional effects as needed

interface Tab {
    title: string;
    content: React.ReactNode;
    accentColor?: string;
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
`;

const TabButton = styled.button.attrs<{ isActive: boolean }>((props) => ({
    'aria-selected': props.isActive,
    role: 'tab',
}))<{ isActive: boolean; accentColor: string; progress: number }>`
    flex: 1;
    padding: 0.75rem 1.5rem;
    background-color: ${({ isActive, accentColor }) => (isActive ? accentColor : 'transparent')};
    color: ${({ isActive, theme }) => (isActive ? theme.textOnAccent || '#fff' : theme.textColor || '#000')};
    border: none;
    cursor: pointer;
    position: relative;
    font-size: 1rem;
    transition: background-color 0.3s, color 0.3s;
    overflow: hidden;

    /* Add border between tabs except for the first tab */
    &:not(:first-child) {
        border-left: 1px solid ${({ theme }) => theme.borderColor || '#ddd'};
    }

    &:focus {
        outline: none;
    }

    /* Active Tab Background Fill Animation */
    ${({ isActive, progress }) =>
        isActive &&
        css`
            &::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                width: ${progress}%;
                background-color: rgba(255, 255, 255, 0.2); /* Overlay to show progression */
                transition: width 0.1s linear;
                z-index: 0;
            }

            /* Ensure content is above the progress overlay */
            > * {
                position: relative;
                z-index: 1;
            }
        `}
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

const TabCarousel: React.FC<TabCarouselProps> = ({ tabs, interval = 7000, swiperEffect = 'slide' }) => {
    const [currentTab, setCurrentTab] = useState(0);
    const [isAutoplay, setIsAutoplay] = useState(true);
    const swiperRef = useRef<any>(null);
    const [progress, setProgress] = useState(0);
    const requestRef = useRef<number | null>(null);
    const startTimeRef = useRef<number | null>(null);

    // Callback to handle progress animation
    const animateProgress = useCallback(
        (timestamp: number) => {
            if (!startTimeRef.current) startTimeRef.current = timestamp;
            const elapsed = timestamp - startTimeRef.current;
            const progressPercentage = Math.min((elapsed / interval) * 100, 100);
            setProgress(progressPercentage);
            if (elapsed < interval) {
                requestRef.current = requestAnimationFrame(animateProgress);
            } else {
                setProgress(0);
                startTimeRef.current = null;
                // Auto-switch to next tab
                if (swiperRef.current && isAutoplay) {
                    swiperRef.current.slideNext();
                }
            }
        },
        [interval, isAutoplay]
    );

    // Start progress animation
    useEffect(() => {
        if (isAutoplay) {
            requestRef.current = requestAnimationFrame(animateProgress);
        }
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [currentTab, isAutoplay, animateProgress]);

    // Handle autoplay control
    useEffect(() => {
        if (swiperRef.current) {
            if (isAutoplay) {
                swiperRef.current.autoplay.start();
            } else {
                swiperRef.current.autoplay.stop();
            }
        }
    }, [isAutoplay]);

    // Handle tab click
    const handleTabClick = (index: number) => {
        setCurrentTab(index);
        if (swiperRef.current) {
            swiperRef.current.slideTo(index);
        }
        setIsAutoplay(false); // Stop auto-play on manual interaction
        setProgress(100); // Set progress to 100% immediately
    };

    // Handle slide change
    const handleSlideChange = (swiper: any) => {
        setCurrentTab(swiper.activeIndex);
        setProgress(0);
        if (isAutoplay) {
            startTimeRef.current = null;
            requestRef.current = requestAnimationFrame(animateProgress);
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
        <div>
            <TabBar role="tablist">
                {tabs.map((tab, index) => (
                    <TabButton
                        key={index}
                        isActive={index === currentTab}
                        onClick={() => handleTabClick(index)}
                        accentColor={tab.accentColor || '#0070f3'}
                        progress={index === currentTab ? progress : 0}
                    >
                        {tab.title}
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
                        isAutoplay
                            ? {
                                  delay: interval,
                                  disableOnInteraction: false,
                              }
                            : false
                    }
                    {...getEffectConfig()}
                    className="mySwiper"
                    style={{ width: '100%', height: '100%' }}
                >
                    {tabs.map((tab, index) => (
                        <SwiperSlide key={index}>
                            <div style={{ width: '100%', height: '100%' }}>{tab.content}</div>
                        </SwiperSlide>
                    ))}
                </StyledSwiper>
            </ContentContainer>
        </div>
    );
};

export default TabCarousel;
