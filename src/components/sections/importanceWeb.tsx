import React from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Section = styled.section`
  padding: 8rem 1.5rem;
  background: linear-gradient(to bottom, transparent, ${props => props.theme.backgroundColor}15);
  
  @media (min-width: 1024px) {
    padding: 10rem 8%;
  }
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  margin-bottom: 4rem;
  //font-family: 'Montserrat', sans-serif;
  font-size: 2.75rem;
  font-weight: 700;
  color: ${props => props.theme.baseDark};
  
  @media (min-width: 768px) {
    font-size: 3.25rem;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 3rem;
  max-width: 1400px;
  margin: 0 auto;

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
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
    number: 75,
    suffix: "%",
    text: "des consommateurs jugent instantanément la crédibilité d'une entreprise sur la base de son site web",
    animationType: "percentage"
  },
  {
    number: 88,
    suffix: "%",
    text: "des personnes qui recherchent une entreprise sur leur téléphone la contactent dans les 24 heures",
    animationType: "percentage"
  },
  {
    number: 61,
    suffix: "%",
    text: "des utilisateurs ne reviendront jamais sur un site mobile difficile à utiliser",
    animationType: "percentage"
  },
  {
    number: 2.8,
    suffix: "×",
    text: "plus de revenus générés en moyenne par les entreprises disposant d'un site web professionnel",
    animationType: "multiplier"
  },
  {
    number: 81,
    suffix: "%",
    text: "des consommateurs recherchent en ligne avant tout achat",
    animationType: "percentage"
  },
  {
    number: 72,
    suffix: "%",
    text: "des recherches locales mènent à une visite en magasin dans les 5km",
    animationType: "percentage"
  },
  {
    number: 47,
    suffix: "%",
    text: "des visiteurs s'attendent à ce qu'un site se charge en moins de 2 secondes",
    animationType: "percentage"
  },
  {
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