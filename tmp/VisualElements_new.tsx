import React from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { visualElements } from '@/data/visualElements';
import { BadgeCard, TestimonialCard, Icon, BadgeText } from '@/components/library/FloatingCards';
import useMediaQuery from '@/hooks/useMediaQuery';

interface LayoutProps {
  layout: 'full-desktop' | 'right-desktop' | 'mobile';
}

const Container = styled.div<LayoutProps>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  padding: ${props => props.theme.spacing.large};

  ${props => props.layout === 'right-desktop' && `
    justify-content: flex-end;
    & > *:first-child {
      display: none;
    }
  `}

  @media (max-width: 768px) {
    position: relative;
    height: auto;
    padding: ${props => props.theme.spacing.medium};
  }
`;

const LeftArea = styled.div`
  position: relative;
  width: 40%;
  height: 100%;
  display: ${props => props.layout === 'right-desktop' ? 'none' : 'block'};

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`;

const RightArea = styled.div`
  position: relative;
  width: 40%;
  height: 100%;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`;

const MobileCarousel = styled(motion.div)`
  display: flex;
  overflow-x: auto;
  gap: ${props => props.theme.spacing.medium};
  padding: ${props => props.theme.spacing.medium};
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const getRandomPosition = (area: 'left' | 'right') => {
  const positions = {
    left: [
      { top: '15%', left: '10%' },
      { top: '45%', left: '5%' },
      { bottom: '20%', left: '15%' }
    ],
    right: [
      { top: '20%', right: '15%' },
      { top: '60%', right: '10%' },
      { bottom: '15%', right: '5%' }
    ]
  };

  return positions[area][Math.floor(Math.random() * positions[area].length)];
};

const VisualElements: React.FC = () => {
  const isDesktop = useMediaQuery('(min-width: 1400px)');
  const isTablet = useMediaQuery('(min-width: 768px)');
  
  const layout = isDesktop ? 'full-desktop' : isTablet ? 'right-desktop' : 'mobile';

  const floatAnimation = {
    y: {
      duration: 5,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut",
    },
  };

  if (layout === 'mobile') {
    return (
      <MobileCarousel
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {visualElements.mobile.map((element, index) => (
          element.type === 'badge' ? (
            <BadgeCard
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Icon src={element.icon} alt={element.text} />
              <BadgeText>{element.text}</BadgeText>
            </BadgeCard>
          ) : (
            <TestimonialCard
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <img src={element.image} alt="Client" />
              <p>{element.text}</p>
              <small>{element.author}</small>
            </TestimonialCard>
          )
        ))}
      </MobileCarousel>
    );
  }

  return (
    <Container layout={layout}>
      <LeftArea>
        {visualElements.desktop.left.map((element, index) => (
          element.type === 'badge' ? (
            <BadgeCard
              key={`left-${index}`}
              style={getRandomPosition('left')}
              initial={{ opacity: 0, x: -50 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                y: ['0%', '-10%', '0%']
              }}
              transition={{
                opacity: { duration: 0.5 },
                x: { duration: 0.5 },
                ...floatAnimation,
              }}
            >
              <Icon src={element.icon} alt={element.text} />
              <BadgeText>{element.text}</BadgeText>
            </BadgeCard>
          ) : (
            <TestimonialCard
              key={`left-${index}`}
              style={getRandomPosition('left')}
              initial={{ opacity: 0, x: -50 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                y: ['0%', '10%', '0%']
              }}
              transition={{
                opacity: { duration: 0.5 },
                x: { duration: 0.5 },
                ...floatAnimation,
              }}
            >
              <img src={element.image} alt="Client" />
              <p>{element.text}</p>
              <small>{element.author}</small>
            </TestimonialCard>
          )
        ))}
      </LeftArea>

      <RightArea>
        {visualElements.desktop.right.map((element, index) => (
          <BadgeCard
            key={`right-${index}`}
            style={getRandomPosition('right')}
            initial={{ opacity: 0, x: 50 }}
            animate={{ 
              opacity: 1, 
              x: 0,
              y: ['0%', index % 2 ? '15%' : '-12%', '0%']
            }}
            transition={{
              opacity: { duration: 0.5, delay: index * 0.2 },
              x: { duration: 0.5, delay: index * 0.2 },
              ...floatAnimation,
            }}
          >
            <Icon src={element.icon} alt={element.text} />
            <BadgeText>{element.text}</BadgeText>
          </BadgeCard>
        ))}
      </RightArea>
    </Container>
  );
};

export default VisualElements; 