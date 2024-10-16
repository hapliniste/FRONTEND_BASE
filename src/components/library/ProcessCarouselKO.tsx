// components/ProcessCarousel.tsx

import React from "react";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";

// JSON Data Defined at the Top
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
      "C'est le grand jour! Nous lançons votre site ou application, prêt à conquérir le marché. Il serait bon de parler d'hébergement chez nous sur des serveurs suisses sécurisés.",
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

// Styled Components

const Section = styled.section`
  background: ${(props) => props.theme.backgroundColor};
  padding: 4rem 2rem;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: ${(props) => props.theme.baseDark};
  margin-bottom: 3rem;
  text-transform: uppercase;
`;

const StepsContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 1200px;
  margin: 0 auto;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }

  &:before {
    content: "";
    position: absolute;
    top: 75px;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: calc(100% - 75px);
    background: ${(props) => props.theme.borderColor || "#ddd"};
    z-index: 0;

    @media (max-width: 768px) {
      left: 25px;
      transform: none;
      width: 2px;
    }
  }
`;

const StepCard = styled(motion.div)<{ completed: boolean }>`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  width: 18%;
  min-width: 250px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
  text-align: left;
  opacity: ${(props) => (props.completed ? 0.6 : 1)};
  pointer-events: ${(props) => (props.completed ? "none" : "auto")};
  transition: opacity 0.3s;

  @media (max-width: 1200px) {
    width: 23%;
  }

  @media (max-width: 768px) {
    width: 80%;
    margin-left: 40px;
  }
`;

const IconWrapper = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const StepTitle = styled.h3`
  font-size: 1.25rem;
  color: ${(props) => props.theme.accentPrimary};
  margin-bottom: 0.75rem;
`;

const StepDescription = styled.p`
  font-size: 1rem;
  color: ${(props) => props.theme.textColor};
`;

const Checkbox = styled.div`
  margin-top: 1rem;

  input {
    margin-right: 0.5rem;
  }
`;

const LineConnector = styled(motion.div)`
  position: absolute;
  top: 75px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: calc(100% - 75px);
  background: ${(props) => props.theme.borderColor || "#ddd"};
  z-index: 0;

  @media (max-width: 768px) {
    left: 25px;
    transform: none;
    width: 2px;
  }
`;

const LimitedOffer = styled(motion.div)`
  margin-top: 3rem;
  padding: 2rem;
  background: ${(props) => props.theme.accentPrimary};
  color: white;
  border-radius: 8px;
  position: relative;
  animation: fadeIn 1s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const OfferText = styled.p`
  font-size: 1.25rem;
  margin-bottom: 1rem;
`;

const ContactButton = styled.a`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: white;
  color: ${(props) => props.theme.accentPrimary};
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  transition: background 0.3s, color 0.3s;

  &:hover {
    background: ${(props) => props.theme.accentPrimary};
    color: white;
  }
`;

const PencilIcon = styled(motion.div)`
  position: absolute;
  right: -30px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.5rem;

  @media (max-width: 768px) {
    left: 60%;
    top: 50%;
    transform: translateY(-50%);
  }
`;

// Animation Variants

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.3, duration: 0.6 },
  }),
};

const connectorVariants = {
  hidden: { height: 0 },
  visible: {
    height: "100%",
    transition: { duration: 1 },
  },
};

const pencilVariants = {
  animate: {
    rotate: [0, 20, -20, 0],
    transition: {
      repeat: Infinity,
      duration: 2,
    },
  },
};

// React Component

const ProcessCarousel: React.FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [completedSteps, setCompletedSteps] = React.useState<number[]>([]);

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const handleCheckboxChange = (id: number) => {
    setCompletedSteps((prev) =>
      prev.includes(id) ? prev.filter((step) => step !== id) : [...prev, id]
    );
  };

  return (
    <Section id="processus" ref={ref}>
      <SectionTitle>Processus</SectionTitle>
      <StepsContainer>
        {ProcessSteps.map((step, index) => (
          <StepCard
            key={step.id}
            custom={index}
            initial="hidden"
            animate={controls}
            variants={cardVariants}
            completed={completedSteps.includes(step.id)}
          >
            <IconWrapper>{step.icon}</IconWrapper>
            <StepTitle>{step.title}</StepTitle>
            <StepDescription>{step.description}</StepDescription>
            {/* Checkbox for step completion */}
            <Checkbox>
              <input
                type="checkbox"
                checked={completedSteps.includes(step.id)}
                onChange={() => handleCheckboxChange(step.id)}
              />
              <label>Étape Complétée</label>
            </Checkbox>
            {/* Pencil Animation next to "Contact Initial" step */}
            {step.id === 2 && completedSteps.includes(step.id) && (
              <PencilIcon
                variants={pencilVariants}
                animate="animate"
                aria-label="Pencil Animation"
              >
                ✏️
              </PencilIcon>
            )}
          </StepCard>
        ))}
        <LineConnector
          initial="hidden"
          animate={controls}
          variants={connectorVariants}
        />
      </StepsContainer>

      {/* Limited-Time Offer */}
      {inView && (
        <LimitedOffer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <OfferText>
            Offre Spéciale: Profitez de notre consultation gratuite à seulement{" "}
            <strong>500.- au lieu de 2000.-</strong>!
          </OfferText>
          <ContactButton href="#contact">Contactez-Nous</ContactButton>
        </LimitedOffer>
      )}
    </Section>
  );
};

export default ProcessCarousel;
