// components/Processus.tsx

/*
Je vais faire un grid layout avec 2 colonnes.
La première colonne sera la ligne verticale avec l'icone dessus.
La deuxième colonne sera les cartes.
On fera 7 lignes dans cette grid, une par item.
*/

import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

// Process steps data
const ProcessSteps = [
  {
    id: 1,
    title: "Vous Nous Avez Trouvés",
    subtitle: "Déjà en Route Vers Votre Succès",
    description:
      "Félicitations! Vous avez déjà franchi la première étape en nous trouvant. Vous êtes à un pas de concrétiser votre vision.",
    icon: "🌟",
  },
  {
    id: 2,
    title: "Contact Initial",
    subtitle: "Parlons de Vos Besoins",
    description:
      "Un entretien gratuit vous attend! Partagez vos idées et vos objectifs. Nous sommes prêts à écouter et à vous guider.",
    icon: "📞",
  },
  {
    id: 3,
    title: "Prototypage",
    subtitle: "Visualisez Votre Vision",
    description:
      "Recevez des prototypes personnalisés pour vous aider à visualiser le produit final. Choisissez celui qui correspond le mieux à vos attentes et ajustez-le selon vos besoins.",
    icon: "🖌️",
  },
  {
    id: 4,
    title: "Développement",
    subtitle: "Donnons Vie à Votre Projet",
    description:
      "Notre équipe experte commence le développement en utilisant les dernières technologies. Chaque étape est réalisée avec précision et soin pour assurer une qualité optimale.",
    icon: "💻",
  },
  {
    id: 5,
    title: "Phase de Test",
    subtitle: "Perfectionnons Ensemble",
    description:
      "Accédez à une version de test et partagez vos retours. Votre avis est essentiel pour affiner et perfectionner le produit final.",
    icon: "🧪",
  },
  {
    id: 6,
    title: "Lancement",
    subtitle: "Votre Vision, Réalisée",
    description:
      "C'est le grand jour! Nous lançons votre site ou application, prêt à conquérir le marché. Célébrons ensemble cette réussite. Nous proposons également un hébergement sur nos serveurs suisses sécurisés.",
    icon: "🚀",
  },
  {
    id: 7,
    title: "Évolution et Support",
    subtitle: "Toujours à Vos Côtés",
    description:
      "Notre engagement ne s'arrête pas au lancement. Nous vous offrons un support continu et accompagnons l'évolution de votre solution.",
    icon: "🔧",
  },
];

const Section = styled.section`
  background: ${(props) => props.theme.colors.backgrounds.default};
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

const TimelineIcon = styled(motion.div)<{ isClientStep?: boolean }>`
  width: 60px;
  height: 60px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  position: relative;
  z-index: 2;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  
  ${props => props.isClientStep && `
    background: ${props.theme.accentPrimary};
    color: white;
  `}

  @media (max-width: 768px) {
    width: 44px;
    height: 44px;
    font-size: 1.25rem;
    z-index: 2;
  }
`;

const LineSegment = styled(motion.div)`
  position: absolute;
  top: 60px;
  left: calc(50% - 4px);
  width: 8px;
  height: calc(100% - 60px);
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  border-radius: 4px;

  @media (max-width: 768px) {
    top: 44px;
    height: calc(100% - 44px);
    width: 6px;
    left: calc(50% - 3px);
    z-index: 1;
  }
`;

const TimelineCard = styled(motion.div)<{ isClientStep?: boolean }>`
  background: white;
  border-radius: 1.25rem;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  margin: 0 0 2rem 0;

  ${props => props.isClientStep && `
    border-left: 4px solid ${props.theme.accentPrimary};
  `}

  @media (max-width: 768px) {
    padding: 1.25rem 1rem 1.25rem 2.5rem;
    margin: 0 0 0.75rem 0;
    position: relative;
    z-index: 0;
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

const Processus: React.FC = () => {
  const isClientStep = (stepId: number) => [1, 2, 5].includes(stepId);

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
                  isClientStep={isClientStep(step.id)}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {step.icon}
                </TimelineIcon>
                {index < ProcessSteps.length - 1 && (
                  <LineSegment
                    initial={{ scaleY: 0, originY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                  />
                )}
              </IconContainer>
              <TimelineCard
                isClientStep={isClientStep(step.id)}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
              >
                <CardTitle>{step.title}</CardTitle>
                <CardSubtitle>{step.subtitle}</CardSubtitle>
                <CardDescription>{step.description}</CardDescription>
              </TimelineCard>
            </TimelineItem>
          ))}
        </TimelineContainer>

        <OfferCard
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <OfferTitle>Offre Spéciale Site Web Standard</OfferTitle>
          <CardDescription>
            Profitez de notre offre de lancement et obtenez votre site web professionnel
          </CardDescription>
          <OfferPrice>500 CHF</OfferPrice>
          <ContactButton href="#contact">Contactez-Nous</ContactButton>
        </OfferCard>
      </Container>
    </Section>
  );
};

export default Processus;
