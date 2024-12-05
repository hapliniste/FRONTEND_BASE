import React from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Section = styled.section`
  overflow: hidden;
  position: relative;
  padding: ${props => `${props.theme.spacing.section.paddingY.mobile} ${props.theme.spacing.section.paddingX.mobile}`};
  background: linear-gradient(to bottom, transparent, ${props => props.theme.colors.backgrounds.default}15);
  
  @media (min-width: 1024px) {
    padding: ${props => `${props.theme.spacing.section.paddingY.desktop} ${props.theme.spacing.section.paddingX.desktop}`};
  }
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xlarge};
  font-size: 2.75rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text.primary};
  
  @media (min-width: 768px) {
    font-size: 3.25rem;
  }
`;

const StatsGrid = styled.div`
  width: 100%;
  max-width: ${props => props.theme.sizes.maxWidth};
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: ${props => props.theme.spacing.large};
`;

const StatItem = styled(motion.div)`
  text-align: center;
  padding: 2rem;
`;

const StatNumber = styled(motion.div)`
  font-size: 3.5rem;
  font-weight: 700;
  color: ${props => props.theme.accentPrimary};
  margin-bottom: 1rem;
  //font-family: 'Montserrat', sans-serif;
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const StatText = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: ${props => props.theme.baseMedium};
  max-width: 300px;
  margin: 0 auto;
`;

const stats = [
  {
    //très bonne stat
    number: 75,
    suffix: "%",
    text: "des consommateurs jugent instantanément la crédibilité d'une entreprise sur la base de son site web",
    animationType: "percentage"
  },
  {
    //très bonne stat
    number: 88,
    suffix: "%",
    text: "des personnes qui recherchent une entreprise sur leur téléphone la contactent dans les 24 heures",
    animationType: "percentage"
  },
  {
    //très bonne stat
    number: 61,
    suffix: "%",
    text: "des utilisateurs ne reviendront jamais sur un site mobile difficile à utiliser",
    animationType: "percentage"
  },
  {
    //stat pas top
    number: 2.8,
    suffix: "×",
    text: "plus de revenus générés en moyenne par les entreprises disposant d'un site web professionnel",
    animationType: "multiplier"
  },
  {
    //stat ok
    number: 81,
    suffix: "%",
    text: "des consommateurs recherchent en ligne avant tout achat",
    animationType: "percentage"
  },
  {
    //bonne stat
    number: 72,
    suffix: "%",
    text: "des recherches locales mènent à une visite en magasin dans les 5km",
    animationType: "percentage"
  },
  {
    //très bonne stat
    number: 47,
    suffix: "%",
    text: "des visiteurs s'attendent à ce qu'un site se charge en moins de 2 secondes",
    animationType: "percentage"
  },
  {
    //stat ok
    number: 71,
    suffix: "%",
    text: "des entreprises ont soit pas de site web, soit un site obsolète",
    animationType: "percentage"
  }
];

const AnimatedNumber: React.FC<{ 
  value: number, 
  suffix: string, 
  animationType: string,
  inView: boolean 
}> = ({ value, suffix, animationType, inView }) => {
  const controls = useAnimation();
  const [displayValue, setDisplayValue] = React.useState(0);

  React.useEffect(() => {
    if (inView) {
      let startValue = 0;
      let duration = 2000; // 2 seconds
      let steps = 60; // 60 steps per second
      
      if (animationType === "multiplier") {
        startValue = 1;
        duration = 1500;
      }

      let progress = startValue;
      const increment = (value - startValue) / (duration / (1000 / steps));
      
      const timer = setInterval(() => {
        progress += increment;
        if (progress >= value) {
          progress = value;
          clearInterval(timer);
        }
        setDisplayValue(progress);
      }, 1000 / steps);

      return () => clearInterval(timer);
    }
  }, [inView, value, animationType]);

  return (
    <StatNumber>
      {displayValue.toFixed(animationType === "multiplier" ? 1 : 0)}
      {suffix}
    </StatNumber>
  );
};

const ImportanceWeb: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <Section>
      <SectionTitle
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        L'importance d'une présence web
      </SectionTitle>
      
      <StatsGrid ref={ref}>
        {stats.map((stat, index) => (
          <StatItem
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <AnimatedNumber 
              value={stat.number}
              suffix={stat.suffix}
              animationType={stat.animationType}
              inView={inView}
            />
            <StatText>{stat.text}</StatText>
          </StatItem>
        ))}
      </StatsGrid>
    </Section>
  );
};

export default ImportanceWeb;