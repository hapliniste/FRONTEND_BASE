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
    title: "Vous Nous Avez Trouvés – Déjà en Route Vers Votre Succès",
    description:
      "Félicitations! Vous avez déjà franchi la première étape en nous trouvant. Vous êtes à un pas de concrétiser votre vision.",
    icon: "🌟",
  },
  {
    id: 2,
    title: "Contact Initial – Parlons de Vos Besoins",
    description:
      "Un entretien gratuit vous attend! Partagez vos idées et vos objectifs. Nous sommes prêts à écouter et à vous guider.",
    icon: "📞",
  },
  {
    id: 3,
    title: "Prototypage – Visualisez Votre Vision",
    description:
      "Recevez des prototypes personnalisés pour vous aider à visualiser le produit final. Choisissez celui qui correspond le mieux à vos attentes et ajustez-le selon vos besoins.",
    icon: "🖌️",
  },
  {
    id: 4,
    title: "Développement – Donnons Vie à Votre Projet",
    description:
      "Notre équipe experte commence le développement en utilisant les dernières technologies. Chaque étape est réalisée avec précision et soin pour assurer une qualité optimale.",
    icon: "💻",
  },
  {
    id: 5,
    title: "Phase de Test – Perfectionnons Ensemble",
    description:
      "Accédez à une version de test et partagez vos retours. Votre avis est essentiel pour affiner et perfectionner le produit final.",
    icon: "🧪",
  },
  {
    id: 6,
    title: "Lancement – Votre Vision, Réalisée",
    description:
      "C'est le grand jour! Nous lançons votre site ou application, prêt à conquérir le marché. Célébrons ensemble cette réussite. Nous proposons également un hébergement sur nos serveurs suisses sécurisés.",
    icon: "🚀",
  },
  {
    id: 7,
    title: "Évolution et Support – Toujours à Vos Côtés",
    description:
      "Notre engagement ne s'arrête pas au lancement. Nous vous offrons un support continu et accompagnons l'évolution de votre solution.",
    icon: "🔧",
  },
];

const Section = styled.section`
  background: ${(props) => props.theme.colors.backgrounds.default};
  padding: 4rem 2rem;
  min-height: 100vh;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: ${(props) => props.theme.baseDark};
  margin-bottom: 3rem;
  text-align: center;
  text-transform: uppercase;
`;

const TimelineContainer = styled.div`
  display: grid;
  grid-template-columns: 10% 90%;
  grid-template-rows: repeat(${ProcessSteps.length}, auto);
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  gap: ${props => props.theme.spacing.medium};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const VerticalLineContainer = styled.div`
  grid-column: 1 / 2;
  grid-row: 1 / -1;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const VerticalLine = styled.div`
  width: 2px;
  background: ${(props) => props.theme.colors.accent.primary};
  flex-grow: 1;
  margin: 50% 0;
`;

interface TimelineItemProps {
  row: number;
}

const TimelineIcon = styled(motion.div)<TimelineItemProps>`
  grid-column: 1 / 2;
  grid-row: ${(props) => props.row};
  justify-self: center;
  align-self: center;
  z-index: 2;
  width: ${(props) => props.theme.spacing.large};
  height: ${(props) => props.theme.spacing.large};
  border-radius: 50%;
  background: ${(props) => props.theme.colors.backgrounds.default};
  border: ${(props) => props.theme.borders.width} solid
    ${(props) => props.theme.colors.accent.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;

  @media (max-width: 768px) {
    grid-column: 1 / 2;
    grid-row: auto;
    position: relative;
    margin-bottom: ${(props) => props.theme.spacing.small};
  }
`;

const TimelineContent = styled(motion.div)<TimelineItemProps>`
  grid-column: 2 / 3;
  grid-row: ${(props) => props.row};
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0px 16px 15px -10px rgba(105, 96, 215, 0.0944602);
  width: 100%;
  position: relative;
  align-self: center;

  @media (max-width: 768px) {
    grid-column: 1 / 2;
    grid-row: auto;
  }
`;

const TimelineTitle = styled.h3`
  font-size: 1.25rem;
  color: ${(props) => props.theme.colors.accent.primary};
  margin-top: 0;
  margin-bottom: ${(props) => props.theme.spacing.small};
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const TimelineTitleIcon = styled.span`
  display: none;

  @media (max-width: 768px) {
    display: inline-block;
    font-size: 1.5rem;
    margin-right: ${(props) => props.theme.spacing.small};
  }
`;

const TimelineDescription = styled.p`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.text.primary};
`;

const LimitedOffer = styled(motion.div)`
  margin-top: ${(props) => props.theme.spacing.xlarge};
  padding: 2rem;
  background: ${(props) => props.theme.colors.accent.primary};
  color: white;
  border-radius: 0.5rem;
  text-align: center;
`;

const OfferText = styled.p`
  font-size: 1.25rem;
  margin-bottom: 1rem;
`;

const ContactButton = styled.a`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: white;
  color: ${(props) => props.theme.colors.accent.primary};
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  transition: background 0.3s, color 0.3s;

  &:hover {
    background: ${(props) => props.theme.colors.backgrounds.default};
    color: ${(props) => props.theme.colors.accent.primary};
  }
`;

const Processus: React.FC = () => {
  return (
    <Section id="processus">
      <SectionTitle>Processus</SectionTitle>
      <TimelineContainer>
        <VerticalLineContainer>
          <VerticalLine />
        </VerticalLineContainer>
        {ProcessSteps.map((step, index) => (
          <React.Fragment key={step.id}>
            <TimelineIcon
              row={index + 1}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.2 + 0.3 }}
            >
              {step.icon}
            </TimelineIcon>
            <TimelineContent
              row={index + 1}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
            >
              <TimelineTitle>
                <TimelineTitleIcon>{step.icon}</TimelineTitleIcon>
                {step.title}
              </TimelineTitle>
              <TimelineDescription>{step.description}</TimelineDescription>
            </TimelineContent>
          </React.Fragment>
        ))}
      </TimelineContainer>

      <LimitedOffer
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <OfferText>
          Offre Spéciale: Obtenez votre site web standard à seulement
          <strong> 500.- au lieu de 2000.-</strong>!
        </OfferText>
        <ContactButton href="#contact">Contactez-Nous</ContactButton>
      </LimitedOffer>
    </Section>
  );
};

export default Processus;
