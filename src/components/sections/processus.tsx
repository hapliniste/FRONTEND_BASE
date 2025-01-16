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
import { SectionTitle } from '@/components/library/typography';

// Update the ProcessSteps type
type StepStatus = 'completed' | 'bonus' | undefined;

interface ProcessStep {
  id: number;
  title: string;
  subtitle?: string;
  description?: string;
  icon: string;
  status?: StepStatus;
  isClickable?: boolean;
}

// Process steps data
const ProcessSteps: ProcessStep[] = [
  {
    id: 1,
    title: "Vous Nous Avez Trouvés",
    description: "Félicitations! Vous avez déjà franchi la première étape en nous trouvant.\nNous sommes maintenant à votre disposition pour concrétiser votre vision.",
    icon: "✓",
    status: "completed"
  },
  {
    id: 2,
    title: "Premier Contact",
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
    description: "Testez votre solution et partagez vos retours pour les ajustements finaux.\nUne fois satisfait, nous déployons votre projet sur nos serveurs suisses sécurisés.",
    icon: "🚀"
  },
  {
    id: 5,
    title: "Support & Évolution",
    subtitle: "Un Accompagnement Sur le Long Terme",
    description: "Notre engagement continue après le lancement.\nNous restons à vos côtés pour maintenir, optimiser et faire évoluer votre solution selon vos besoins futurs.",
    icon: "🤝",
    status: "bonus"
  }
];

const Section = styled.section`
  overflow: hidden;
  position: relative;
  padding: ${props => `${props.theme.spacing.section.paddingY.mobile} ${props.theme.spacing.section.paddingX.mobile}`};
  
  @media (min-width: 1024px) {
    padding: ${props => `${props.theme.spacing.section.paddingY.desktop} ${props.theme.spacing.section.paddingX.desktop}`};
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: ${props => props.theme.sizes.maxWidth};
  margin: 0 auto;
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
    display: none;
  }
`;

const LineSegment = styled(motion.div)<{ $isAfterCompleted?: boolean }>`
  position: absolute;
  top: 5rem;
  left: calc(50% - 4px);
  width: 8px;
  height: calc(100% - 5rem);
  margin-top: -0.5em;
  background: ${props => props.$isAfterCompleted ? 
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

const TimelineCard = styled(motion.div)<{ $status?: StepStatus; $isEmpty?: boolean }>`
  background: white;
  border-radius: ${props => props.$isEmpty ? '999px' : '2rem'};
  padding: ${props => props.$isEmpty ? '1rem 2rem' : '1.75rem'};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
  border: 1px solid rgba(0, 0, 0, 0.03);
  margin: 0 0 2rem 0;
  transform: translateY(-2px);

  ${props => props.$status === 'completed' && css`
    background: ${props.theme.colors.status.successLight};
  `}

  @media (max-width: 768px) {
    margin: 0 0 1rem 0;
  }
`;

const ClickableCard = styled(TimelineCard)`
  cursor: pointer;
`;

const CardTitle = styled.h3`
  //font-family: ${props => props.theme.typography.titleFontFamily};
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
  margin: 0;
  line-height: 1.3;

  .mobile-icon {
    display: none;
  }

  @media (max-width: 768px) {
    font-size: 1.25rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    
    .mobile-icon {
      display: inline;
      font-size: 1.25rem;
    }
  }
`;

const CardSubtitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 500;
  color: ${props => props.theme.colors.text.primary};
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
  color: ${props => props.theme.colors.text.secondary};
  margin: 0;
  white-space: pre-line;

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
  border: 1px solid ${props => props.theme.colors.accent.primary}12;

  @media (max-width: 768px) {
    margin-top: 2rem;
    padding: 1.5rem;
  }
`;

const OfferTitle = styled.h3`
  font-size: 1.75rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
  margin: 0 0 1rem 0;
`;

const OfferPrice = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.accent.primary};
  margin: 1.5rem 0;
`;

const ContactButton = styled.a`
  display: inline-block;
  padding: 1rem 2rem;
  background: ${props => props.theme.colors.accent.primary};
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
    display: none;
  }
`;

const CardContent = styled.div`
  flex: 1;
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
                    $isAfterCompleted={step.status === 'completed'}
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
                  $status={step.status}
                  $isEmpty={!step.subtitle && !step.description}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  animate={{ 
                    y: 0, 
                    scale: 1,
                    boxShadow: "0 0 0 rgba(0, 0, 0, 0)"
                  }}
                  whileHover={{ 
                    y: -4, 
                    scale: 1.02,
                    boxShadow: "0 40px 80px rgba(0, 0, 0, 0.03)"
                  }}
                  viewport={{ once: true }}
                  transition={{ 
                    opacity: {
                      duration: 0.5,
                      delay: index * 0.1 + 0.2
                    },
                    x: {
                      duration: 0.5,
                      delay: index * 0.1 + 0.2
                    },
                    y: {
                      duration: 0.3,
                      //ease: 'backOut'
                    },
                    scale: {
                      duration: 0.3,
                      //ease: 'backOut'
                    },
                    boxShadow: {
                      duration: 0.3,
                      //ease: 'backOut'
                    }
                  }}
                >
                  <CardTitle>
                    <span className="mobile-icon">{step.icon}</span>
                    {step.title}
                  </CardTitle>
                  {step.subtitle && <CardSubtitle>{step.subtitle}</CardSubtitle>}
                  {step.description && <CardDescription>{step.description}</CardDescription>}
                </ClickableCard>
              ) : (
                <TimelineCard
                  $status={step.status}
                  $isEmpty={!step.subtitle && !step.description}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <CardTitle>
                    <span className="mobile-icon">{step.icon}</span>
                    {step.title}
                  </CardTitle>
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
