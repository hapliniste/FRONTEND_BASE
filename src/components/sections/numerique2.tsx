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

const ContentWrapper = styled.div`
  max-width: ${props => props.theme.sizes.maxWidth};
  margin: 0 auto;
`;

const FeatureRow = styled(motion.div)<{ reverse?: boolean }>`
  display: flex;
  flex-direction: column;
  margin-bottom: ${props => props.theme.spacing.xxlarge};
  
  @media (min-width: 768px) {
    flex-direction: ${props => props.reverse ? 'row-reverse' : 'row'};
    align-items: center;
    gap: ${props => props.theme.spacing.xxlarge};
  }
`;

const ImageSection = styled.div`
  flex: 1.2;
  min-height: 300px;
  position: relative;
  margin-bottom: ${props => props.theme.spacing.large};
  
  @media (min-width: 768px) {
    margin-bottom: 0;
    min-height: 400px;
  }
`;

const ContentSection = styled.div`
  flex: 1;
  max-width: 600px;
`;

const FeatureTitle = styled(motion.h3)`
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: ${props => props.theme.spacing.medium};
  color: ${props => props.theme.colors.text.primary};
  
  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

const FeatureText = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: ${props => props.theme.spacing.large};
`;

const BulletList = styled.ul`
  margin: ${props => props.theme.spacing.medium} 0 ${props => props.theme.spacing.xlarge};
  padding-left: 1.5rem;
`;

const BulletItem = styled.li`
  color: ${props => props.theme.colors.text.secondary};
  font-size: 1rem;
  line-height: 1.8;
  margin-bottom: ${props => props.theme.spacing.small};
  position: relative;
  
  &::marker {
    color: ${props => props.theme.colors.accent.primary};
  }
`;

const StatsList = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing.medium};
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
`;

const StatLink = styled.a`
  text-decoration: none;
  display: block;
  height: 100%;
`;

const StatItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.5rem;
  border-radius: 12px;
  background: ${props => props.theme.colors.backgrounds.card};
  transition: all 0.3s ease-in-out;
  height: 100%;
  
  &:hover {
    transform: translateY(-4px);
    background: ${props => props.theme.colors.backgrounds.cardHover};
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
`;

const StatNumber = styled.span`
  font-size: 2.5rem;
  font-weight: 800;
  color: ${props => props.theme.colors.accent.primary};
  font-family: 'Inter', sans-serif;
  line-height: 1;
  letter-spacing: -0.02em;
`;

const StatText = styled.span`
  font-size: 1rem;
  line-height: 1.5;
  color: ${props => props.theme.colors.text.secondary};
  font-weight: 400;
`;

interface Feature {
  title: string;
  content: {
    mainText: string;
    bulletPoints: string[];
  };
  stats: Array<{
    value: string;
    text: string;
    source: string;
  }>;
  image: string;
}

const features: Feature[] = [
  {
    title: "Présence Professionnelle 24/7",
    content: {
      mainText: "Établissez votre présence web et démarquez-vous de la concurrence",
      bulletPoints: [
        "Vitrine professionnelle accessible en permanence",
        "Information à jour pour vos clients",
        "Image de marque renforcée"
      ]
    },
    stats: [
      { 
        value: "84%", 
        text: "des consommateurs considèrent qu'un site web d'entreprise est plus crédible que les réseaux sociaux",
        source: "https://www.businessdasher.com/statistics-about-website/"
      },
      {
        value: "81%",
        text: "des consommateurs recherchent en ligne avant de faire un achat important",
        source: "https://www.ascendbusinessgrowth.com/blog/online-presence"
      }
    ],
    image: "/images/presence.svg"
  },
  {
    title: "Vos Services Accessibles à tout moment",
    content: {
      mainText: "Offrez vos services en dehors des heures d'ouverture et simplifiez la vie de vos clients",
      bulletPoints: [
        "Réservations de table en ligne",
        "Agenda et prise de rendez-vous",
        "Service client automatisé et échange de documents"
      ]
    },
    stats: [
      {
        value: "15-50%",
        text: "est la croissance moyenne des revenus constatée avec un site web interactif",
        source: "https://www.businessdasher.com/statistics-about-website/"
      }
    ],
    image: "/images/services.svg"
  },
  {
    title: "Une Expérience Fluide sur Tous les Écrans",
    content: {
      mainText: "Offrez une expérience utilisateur optimale qui s'adapte parfaitement à chaque appareil",
      bulletPoints: [
        "Performances optimales",
        "Interface intuitive et élégante",
        "Adapté à tous les appareils"
      ]
    },
    stats: [
      {
        value: "40%",
        text: "des visiteurs quittent un site qui met plus de 3 secondes à charger",
        source: "https://www.businessdasher.com/statistics-about-website/"
      },
      {
        value: "67%",
        text: "du trafic web provient d'appareils mobiles",
        source: "https://www.businessdasher.com/statistics-about-website/"
      }
    ],
    image: "/images/experience.svg"
  },
  {
    title: "Transformez les Visites en Clients",
    content: {
      mainText: "Captez efficacement votre clientèle",
      bulletPoints: [
        "Visibilité dans les recherches locales (SEO)",
        "Contact immédiat facilité",
        "Itinéraire et réservations",
      ]
    },
    stats: [
      {
        value: "72%",
        text: "des consommateurs qui font une recherche locale visitent un magasin dans un rayon de 8 km",
        source: "https://www.ascendbusinessgrowth.com/blog/online-presence"
      },
    ],
    image: "/images/conversion.svg"
  }
];

const Numerique: React.FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <Section>
      <SectionTitle
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Pourquoi avoir un site web professionnel ?
      </SectionTitle>

      <ContentWrapper ref={ref}>
        {features.map((feature, index) => (
          <FeatureRow
            key={feature.title}
            reverse={index % 2 === 1}
            initial="hidden"
            animate={controls}
            variants={{
              visible: { opacity: 1, x: 0 },
              hidden: { opacity: 0, x: index % 2 === 0 ? -50 : 50 }
            }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <ImageSection>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={controls}
                variants={{
                  visible: { opacity: 1, scale: 1 },
                  hidden: { opacity: 0, scale: 0.8 }
                }}
                transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'relative'
                }}
              >
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    position: 'absolute',
                    top: 0,
                    left: 0
                  }}
                />
              </motion.div>
            </ImageSection>

            <ContentSection>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureText>{feature.content.mainText}</FeatureText>
              <BulletList>
                {feature.content.bulletPoints.map((point, bulletIndex) => (
                  <BulletItem key={bulletIndex}>{point}</BulletItem>
                ))}
              </BulletList>
              <StatsList>
                {feature.stats.map((stat, statIndex) => (
                  <StatLink 
                    key={stat.text}
                    href={stat.source}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <StatItem
                      initial={{ opacity: 0, y: 20 }}
                      animate={controls}
                      variants={{
                        visible: { opacity: 1, y: 0 },
                        hidden: { opacity: 0, y: 20 }
                      }}
                      transition={{ duration: 0.6, delay: index * 0.2 + statIndex * 0.1 }}
                    >
                      <StatNumber>{stat.value}</StatNumber>
                      <StatText>{stat.text}</StatText>
                    </StatItem>
                  </StatLink>
                ))}
              </StatsList>
            </ContentSection>
          </FeatureRow>
        ))}
      </ContentWrapper>
    </Section>
  );
};

export default Numerique; 