// components/Processus.tsx

/*
Je vais faire un grid layout avec 2 colonnes.
La première colonne sera la ligne verticale avec l'icone dessus.
La deuxième colonne sera les cartes.
On fera 7 lignes dans cette grid, une par item.
*/

import React, { useRef, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";
import { motion } from "framer-motion";
import SpecialOffer from "../library/specialOffer";

// Process steps data
const ProcessSteps = [
  {
    id: 1,
    title: "Vous Nous Avez Trouvés",
    subtitle: "Première Étape Accomplie",
    description: "Félicitations! Vous avez déjà franchi la première étape en nous trouvant. Notre expertise est maintenant à votre disposition pour concrétiser votre vision.",
    icon: "✓",
    status: "completed"
  },
  {
    id: 2,
    title: "Premier Contact & Prototypage",
    subtitle: "Discutons et Visualisons Ensemble",
    description: "Commençons par un entretien gratuit pour comprendre vos objectifs et besoins. Nous créerons ensuite des prototypes personnalisés pour vous permettre de visualiser concrètement votre projet avant son développement.",
    icon: "🎯",
    isClickable: true
  },
  {
    id: 3,
    title: "Développement",
    icon: "💻"
  },
  {
    id: 4,
    title: "Test & Lancement",
    subtitle: "De la Validation au Déploiement",
    description: "Testez votre solution et partagez vos retours pour les ajustements finaux. Une fois satisfait, nous déployons votre projet sur nos serveurs suisses sécurisés, prêt à conquérir votre marché.",
    icon: "🚀"
  },
  {
    id: 5,
    title: "Support & Évolution",
    subtitle: "Un Accompagnement Sur le Long Terme",
    description: "Notre engagement continue après le lancement. Nous restons à vos côtés pour maintenir, optimiser et faire évoluer votre solution selon vos besoins futurs.",
    icon: "🤝",
    status: "bonus"
  }
];

const Section = styled.section`
  padding: 8rem 1.5rem;
  
  @media (min-width: 1024px) {
    padding: 10rem 8%;
  }

  @media (max-width: 768px) {
    padding: 4rem 1rem; // Reduced padding on mobile
  }
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 6rem;
  font-family: 'Montserrat', sans-serif;
  font-size: 2.75rem;
  font-weight: 700;
  color: ${props => props.theme.baseDark};
  letter-spacing: -0.03em;
  
  @media (min-width: 768px) {
    font-size: 3.25rem;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 3rem; // Reduced margin on mobile
  }
`;

const TimelineContainer = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 84px 1fr;
  gap: 0 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0;
    padding: 0;
  }
`;

const TimelineItem = styled(motion.div)`
  display: grid;
  grid-template-columns: subgrid;
  grid-column: 1 / -1;
  position: relative;

  @media (max-width: 768px) {
    margin-bottom: 0.75rem;
    display: block;
  }
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    position: absolute;
    transform: translateX(-10px);
  }
`;

const LineSegment = styled(motion.div)<{ isAfterCompleted?: boolean }>`
  position: absolute;
  top: 5rem;
  left: calc(50% - 4px);
  width: 8px;
  height: calc(100% - 5rem);
  margin-top: -0.5em;
  background: ${props => props.isAfterCompleted ? 
    `${props.theme.colors.status.success}` : 
    'white'
  };
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
  border: 1px solid rgba(0, 0, 0, 0.03);
  border-radius: 999px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 999px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const TimelineCard = styled(motion.div)<{ status?: 'completed' | 'bonus'; isEmpty?: boolean }>`
  background: white;
  border-radius: ${props => props.isEmpty ? '999px' : '1.25rem'};
  padding: ${props => props.isEmpty ? '1rem 2rem' : '1.75rem'};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
  border: 1px solid rgba(0, 0, 0, 0.03);
  margin: 0 0 2rem 0;
  transform: translateY(-2px);

  ${props => props.status === 'completed' && css`
    background: ${props.theme.colors.status.successLight};
  `}

  ${props => props.status === 'bonus' && css`
    transform: translateY(0);
    background: transparent;
    border: 1px solid rgba(0, 0, 0, 0.08);
    box-shadow: none;
    
    ${CardTitle} {
      opacity: 0.8;
    }
  `}
`;

const ClickableCard = styled(TimelineCard)`
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.baseDark};
  margin: 0;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const CardSubtitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 500;
  color: ${props => props.theme.accentPrimary};
  margin: 0.5rem 0 1rem 0;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin: 0.25rem 0 0.75rem 0;
  }
`;

const CardDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: ${props => props.theme.baseMedium};
  margin: 0;

  @media (max-width: 768px) {
    font-size: 0.95rem;
    line-height: 1.5;
  }
`;

const OfferCard = styled(motion.div)`
  margin-top: 4rem;
  background: white;
  border-radius: 1.5rem;
  padding: 2.5rem;
  text-align: center;
  border: 1px solid ${props => props.theme.accentPrimary}12;

  @media (max-width: 768px) {
    margin-top: 2rem;
    padding: 1.5rem;
  }
`;

const OfferTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.75rem;
  font-weight: 600;
  color: ${props => props.theme.baseDark};
  margin: 0 0 1rem 0;
`;

const OfferPrice = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme.accentPrimary};
  margin: 1.5rem 0;
`;

const ContactButton = styled.a`
  display: inline-block;
  padding: 1rem 2rem;
  background: ${props => props.theme.accentPrimary};
  color: white;
  border-radius: 0.75rem;
  text-decoration: none;
  font-weight: 600;
  transition: transform 0.2s, opacity 0.2s;

  &:hover {
    transform: translateY(-2px);
    opacity: 0.9;
  }
`;

const pulseAnimation = keyframes`
  0% {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
    transform: translateY(0);
  }
  50% {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
  100% {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
    transform: translateY(0);
  }
`;

const TimelineIcon = styled(motion.div)<{ status?: 'completed' | 'clickable' }>`
  width: 4rem;
  height: 4rem;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  position: relative;
  z-index: 2;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
  border: 1px solid rgba(0, 0, 0, 0.03);
  cursor: ${props => props.status === 'clickable' ? 'pointer' : 'default'};
  
  ${props => props.status === 'completed' && css`
    background: ${props.theme.colors.status.success};
    color: white;
  `}

  ${props => props.status === 'clickable' && css`
    animation: ${pulseAnimation} 2s ease-in-out infinite;
    
    &:hover {
      animation: none;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
  `}

  @media (max-width: 768px) {
    width: 44px;
    height: 44px;
    font-size: 1.25rem;
    z-index: 2;
  }
`;

const Processus: React.FC = () => {
  const contactRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Trouve la section contact et stocke la ref
    contactRef.current = document.getElementById('contact');
  }, []);

  const scrollToContact = () => {
    if (contactRef.current) {
      contactRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      // Fallback si la ref n'est pas trouvée
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <Section id="processus">
      <Container>
        <SectionTitle>Processus</SectionTitle>
        <TimelineContainer>
          {ProcessSteps.map((step, index) => (
            <TimelineItem
              key={step.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <IconContainer>
                <TimelineIcon
                  status={step.status === 'completed' ? 'completed' : (step.isClickable ? 'clickable' : undefined)}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  onClick={step.isClickable ? scrollToContact : undefined}
                >
                  {step.icon}
                </TimelineIcon>
                {index < ProcessSteps.length - 1 && (
                  <LineSegment
                    isAfterCompleted={step.status === 'completed'}
                    initial={{ scaleY: 0, originY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                  />
                )}
              </IconContainer>
              {step.isClickable ? (
                <ClickableCard
                  onClick={scrollToContact}
                  status={step.status}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                >
                  <CardTitle>{step.title}</CardTitle>
                  {step.subtitle && <CardSubtitle>{step.subtitle}</CardSubtitle>}
                  {step.description && <CardDescription>{step.description}</CardDescription>}
                </ClickableCard>
              ) : (
                <TimelineCard
                  status={step.status}
                  isEmpty={!step.subtitle && !step.description}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                >
                  <CardTitle style={{ margin: 0 }}>{step.title}</CardTitle>
                  {step.subtitle && <CardSubtitle>{step.subtitle}</CardSubtitle>}
                  {step.description && <CardDescription>{step.description}</CardDescription>}
                </TimelineCard>
              )}
            </TimelineItem>
          ))}
        </TimelineContainer>
      </Container>
    </Section>
  );
};

export default Processus;
