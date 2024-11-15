import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const FloatingElementsWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;

  @media (max-width: 768px) {
    display: none;
  }
`;

// Zone gauche pour les éléments flottants
const LeftArea = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 25%;
`;

// Zone droite pour les éléments flottants
const RightArea = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 25%;
`;

const BadgeCard = styled(motion.div)`
  position: absolute;
  background: ${(props) => props.theme.colors.basic.white};
  padding: 1rem;
  border-radius: ${(props) => props.theme.borders.radius};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  max-width: 200px;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.9);
`;

const TestimonialCard = styled(motion.div)`
  position: absolute;
  background: ${(props) => props.theme.colors.basic.white};
  padding: 1.25rem;
  border-radius: ${(props) => props.theme.borders.radius};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 250px;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.9);

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-bottom: 0.75rem;
  }

  p {
    margin: 0.5rem 0;
    font-style: italic;
    color: ${(props) => props.theme.colors.text.primary};
  }

  small {
    color: ${(props) => props.theme.colors.text.secondary};
  }
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

const BadgeText = styled.span`
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 0.9rem;
  font-weight: 500;
`;

const VisualElements: React.FC = () => {
  const floatTransition = {
    y: {
      duration: 5,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut",
    },
  };

  return (
    <FloatingElementsWrapper>
      <LeftArea>
        <BadgeCard
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0, y: ['0%', '-10%', '0%'] }}
          transition={{
            opacity: { duration: 0.5 },
            x: { duration: 0.5 },
            ...floatTransition,
          }}
          style={{ top: '30%', left: '20%' }}
        >
          <Icon src="/icons/swiss_flag.svg" alt="Suisse" />
          <BadgeText>100% Suisse</BadgeText>
        </BadgeCard>

        <TestimonialCard
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0, y: ['0%', '10%', '0%'] }}
          transition={{
            opacity: { duration: 0.5, delay: 0.2 },
            x: { duration: 0.5, delay: 0.2 },
            ...floatTransition,
          }}
          style={{ bottom: '25%', left: '10%' }}
        >
          <img src="https://placehold.co/100" alt="Client" />
          <p>"Service exceptionnel et résultat impressionnant!"</p>
          <small>— Marie Dubois, Entreprise SA</small>
        </TestimonialCard>
      </LeftArea>

      <RightArea>
        <BadgeCard
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0, y: ['0%', '15%', '0%'] }}
          transition={{
            opacity: { duration: 0.5, delay: 0.3 },
            x: { duration: 0.5, delay: 0.3 },
            ...floatTransition,
          }}
          style={{ top: '20%', right: '15%' }}
        >
          <Icon src="/icons/rocket.svg" alt="Technologies" />
          <BadgeText>Technologies modernes</BadgeText>
        </BadgeCard>

        <BadgeCard
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0, y: ['0%', '-12%', '0%'] }}
          transition={{
            opacity: { duration: 0.5, delay: 0.4 },
            x: { duration: 0.5, delay: 0.4 },
            ...floatTransition,
          }}
          style={{ top: '60%', right: '25%' }}
        >
          <Icon src="/icons/solutions.svg" alt="Solutions" />
          <BadgeText>Solutions sur mesure</BadgeText>
        </BadgeCard>
      </RightArea>
    </FloatingElementsWrapper>
  );
};

export default VisualElements; 