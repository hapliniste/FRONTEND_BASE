import React from 'react';
import styled from 'styled-components';
import { motion, useAnimation, animate } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { SectionTitle } from '@/components/library/typography';
import Image from 'next/image';
import { jakarta } from '@/styles/theme';

const Section = styled.section`
  overflow: hidden;
  position: relative;
  //padding: ${props => `${props.theme.spacing.section.paddingY.mobile} ${props.theme.spacing.section.paddingX.mobile}`};
  background: linear-gradient(to bottom, transparent, ${props => props.theme.colors.backgrounds.default}15);
  margin: 0;
  
  @media (min-width: 1024px) {
    padding: ${props => `${props.theme.spacing.section.paddingY.desktop} ${props.theme.spacing.section.paddingX.desktop}`};
    margin: 0;
  }
`;

const ContentWrapper = styled.div`
  max-width: ${props => props.theme.sizes.maxWidth};
  margin: 0 auto;
`;

const FeatureRow = styled(motion.div)<{ reverse?: boolean }>`
  display: flex;
  flex-direction: column;
  margin-bottom: ${props => props.theme.spacing.xlarge};
  gap: ${props => props.theme.spacing.small};
  @media (min-width: 768px) {
    gap: ${props => props.theme.spacing.small};
    margin-bottom: ${props => props.theme.spacing.xxlarge};
  }
`;

const ContentImageWrapper = styled.div<{ reverse?: boolean }>`
  display: flex;
  flex-direction: column;
  
  @media (min-width: 768px) {
    flex-direction: ${props => props.reverse ? 'row-reverse' : 'row'};
    align-items: center;
    gap: ${props => props.theme.spacing.large};
  }
`;

const ImageSection = styled.div`
  flex: 1.2;
  height: 400px;
  position: relative;
  //margin-bottom: ${props => props.theme.spacing.large};
  
  @media (max-width: 768px) {
    height: 250px;
    //margin-bottom: ${props => props.theme.spacing.medium};
    aspect-ratio: 16/9;
    width: 100%;
  }
`;

const ContentSection = styled.div`
  flex: 1;
  max-width: 600px;
  padding: ${props => `${props.theme.spacing.section.paddingY.mobile} ${props.theme.spacing.section.paddingX.mobile}`};
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
  margin: ${props => props.theme.spacing.medium} 0 ${props => props.theme.spacing.large};
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
  display: flex;
  gap: ${props => props.theme.spacing.large};
  margin-top: ${props => props.theme.spacing.medium};
  flex-wrap: wrap;
  width: auto;
  padding: ${props => `${props.theme.spacing.section.paddingY.mobile} ${props.theme.spacing.section.paddingX.mobile}`};
  
  @media (max-width: 768px) {
    gap: ${props => props.theme.spacing.medium};
    margin-top: ${props => props.theme.spacing.small};
  }
`;

const StatItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
  min-width: 200px;
`;

const StatNumber = styled.span`
  font-size: 2.5rem;
  font-weight: 300;
  color: ${props => props.theme.colors.text.primary};
  font-family: ${props => props.theme.typography.headingFontFamily};
  line-height: 1;
  letter-spacing: -0.02em;
`;

const StatText = styled.span`
  font-size: 1rem;
  line-height: 1.5;
  color: ${props => props.theme.colors.text.primary};
  font-weight: 400;
`;

// New component for sources
const SourcesSection = styled.div`
  margin-top: ${props => props.theme.spacing.large};
  padding-top: ${props => props.theme.spacing.xsmall};
  border-top: 1px solid ${props => `${props.theme.colors.text.primary}15`};
`;

const SourcesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.medium};
`;

const SourceItem = styled.a`
  color: ${props => props.theme.colors.text.secondary};
  text-decoration: none;
  font-size: 0.9rem;
  display: flex;
  gap: ${props => props.theme.spacing.small};
  align-items: baseline;
  
  &:hover {
    color: ${props => props.theme.colors.accent.primary};
  }
  
  &::before {
    content: "→";
    color: ${props => props.theme.colors.accent.primary};
  }
`;

const SourcesTitle = styled.h4`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.text.primary};
  margin-top: ${props => props.theme.spacing.small};
  margin-bottom: ${props => props.theme.spacing.medium};
  font-family: ${props => props.theme.typography.titleFontFamily};
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

// Updated AnimatedNumber component
const AnimatedNumber: React.FC<{ value: string }> = ({ value }) => {
  const numberRef = React.useRef<HTMLSpanElement>(null);
  const { ref: inViewRef, inView } = useInView({ 
    threshold: 0.3,
    triggerOnce: true 
  });

  React.useEffect(() => {
    const node = numberRef.current;
    if (node && inView) {
      // Handle range values like "15-50%"
      if (value.includes('-')) {
        const [start, end] = value.split('-').map(v => parseInt(v));
        const controls = animate(0, end, {
          duration: 2,
          ease: "easeOut",
          onUpdate: (v) => {
            node.textContent = `${start}-${Math.round(v)}%`;
          },
        });
        return () => controls.stop();
      } else {
        // Handle regular percentage values
        const numberValue = parseInt(value);
        const controls = animate(0, numberValue, {
          duration: 2,
          ease: "easeOut",
          onUpdate: (v) => {
            node.textContent = `${Math.round(v)}%`;
          },
        });
        return () => controls.stop();
      }
    }
  }, [inView, value]);

  return (
    <span ref={(el) => {
      numberRef.current = el;
      inViewRef(el);
    }}>
      {value.includes('-') ? value : '0%'}
    </span>
  );
};

const FeatureSection: React.FC<{ feature: Feature; index: number }> = ({ feature, index }) => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const controls = useAnimation();

  React.useEffect(() => {
    if (inView) {
      controls.start(`visible${index}`);
    }
  }, [inView, controls, index]);

  return (
    <FeatureRow
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        visible: { opacity: 1, x: 0 },
        hidden: { opacity: 0, x: index % 2 === 0 ? -50 : 50 }
      }}
      transition={{ duration: 0.6 }}
    >
      <ContentImageWrapper reverse={index % 2 === 1}>
        <ImageSection>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ width: '100%', height: '100%', position: 'relative' }}
          >
            <Image
              src={`https://placehold.co/1200x800/999999/666666.png?text=${feature.title.replace(/ /g, '+')}`}
              alt={feature.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: 'cover' }}
              priority={index === 0}
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
        </ContentSection>
      </ContentImageWrapper>
      
      <StatsList>
        {feature.stats.map((stat, statIndex) => (
          <StatItem
            key={stat.text}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: statIndex * 0.2 }}
          >
            <StatNumber>
              {stat.value.includes('%') ? (
                <AnimatedNumber value={stat.value} />
              ) : (
                stat.value
              )}
            </StatNumber>
            <StatText>{stat.text}</StatText>
          </StatItem>
        ))}
      </StatsList>
    </FeatureRow>
  );
};

const Numerique: React.FC = () => {
  const allSources = Array.from(new Set(
    features.flatMap(feature => 
      feature.stats.map(stat => stat.source)
    )
  ));

  return (
    <Section>
      <SectionTitle>
        Pourquoi avoir un site web professionnel ?
      </SectionTitle>

      <ContentWrapper>
        {features.map((feature, index) => (
          <FeatureSection 
            key={feature.title} 
            feature={feature} 
            index={index} 
          />
        ))}

        <SourcesSection>
          <SourcesTitle>Sources</SourcesTitle>
          <SourcesList>
            {allSources.map((source, index) => (
              <SourceItem 
                key={index}
                href={source}
                target="_blank"
                rel="noopener noreferrer"
              >
                {source.replace('https://', '')}
              </SourceItem>
            ))}
          </SourcesList>
        </SourcesSection>
      </ContentWrapper>
    </Section>
  );
};

export default Numerique; 