import React from 'react';
import styled from 'styled-components';
import Carousel from "@/components/library/carousel";
import ImageCard from "@/components/library/imageCard";
import { SectionTitle } from '@/components/library/typography';
import { NextSeo } from 'next-seo';
import { motion } from 'framer-motion';
import { Handshake, Rocket, Code, LockOpen, PiggyBank } from '@phosphor-icons/react';

interface ValeurCardProps {
  title: string;
  content: React.ReactNode;
  icon: React.ReactNode;
  isEven: boolean;
}

const Section = styled.section`
  overflow: hidden;
  position: relative;
  padding: 0;
  margin: 0;
  
  @media (min-width: 1024px) {
    padding: ${({theme}) => `${theme.spacing.section.paddingY.desktop} ${theme.spacing.section.paddingX.desktop}`};
    margin: 0;
  }
`;

const DesktopCardContainer = styled.div`
  display: none;
  
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: ${({theme}) => theme.spacing.xlarge};
    max-width: ${({theme}) => theme.sizes.maxWidth};
    margin: 0 auto;
    padding: ${({theme}) => theme.spacing.xlarge} ${({theme}) => theme.spacing.large};
    
    & > div {
      min-height: 300px;
      display: flex;
      transition: all 0.3s ease;
      box-shadow: 0 0 0 rgba(0, 0, 0, 0);
      border-radius: ${({theme}) => theme.borders.radius};
      
      &:nth-child(even) {
        transform: translateY(40%);
        
        &:hover {
          transform: translateY(calc(40% - 0.5rem)) scale(1.02);
          box-shadow: 0 20px 80px ${({theme}) => `${theme.colors.basic.black}03`};
        }
      }
      
      &:nth-child(odd) {
        &:hover {
          transform: translateY(-0.5rem) scale(1.05);
          box-shadow: 0 20px 80px ${({theme}) => `${theme.colors.basic.black}03`};
        }
      }
      
      &:nth-child(-n+2) {
        margin-top: 0;
      }
      
      &:nth-last-child(-n+2) {
        margin-bottom: 0;
      }
    }
  }
`;

const MobileCardContainer = styled.div`
  @media (min-width: 768px) {
    display: none;
  }

  .swiper {
    padding-bottom: ${({theme}) => theme.spacing.large};
  }

  .swiper-slide {
    height: auto;
    display: flex;
    justify-content: center;
  }
`;

const CardImage = styled.div`
  width: 40%;
  height: 200px;
  background-color: ${({theme}) => theme.colors.accent.primary};
  border-radius: ${({theme}) => theme.borders.radius};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
`;



const CardDescription = styled.p`
  font-size: ${({theme}) => theme.typography.fontSize};
  color: ${({theme}) => theme.colors.base.medium};
  line-height: 1.6;
  
  & + p {
    margin-top: ${({theme}) => theme.spacing.medium};
  }

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

const MobileCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: ${({theme}) => theme.spacing.medium};
`;

const MobileCardImage = styled.div`
  width: 100%;
  height: 150px;
  max-width: 200px;
  background-color: ${({theme}) => theme.colors.accent.primary};
  border-radius: ${({theme}) => theme.borders.radius};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  margin-bottom: ${({theme}) => theme.spacing.medium};
`;

const TechList = styled.ul`
  list-style: none;
  padding: 0;
  padding-left: 0 !important;
  margin: ${({theme}) => theme.spacing.medium} 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: ${({theme}) => theme.spacing.medium};
  
  li {
    background: ${({theme}) => `${theme.colors.accent.primary}10`};
    padding: ${({theme}) => `${theme.spacing.xsmall} ${theme.spacing.medium}`};
    border-radius: ${({theme}) => theme.borders.radius};
    font-size: 0.9rem;
    color: ${({theme}) => theme.colors.accent.primary};
    flex: 0 1 auto;
    height: 2em;
    line-height: 1.5em;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 768px) {
    justify-content: space-evenly;
    gap: ${({theme}) => theme.spacing.small};
  }
`;

const CardIcon = styled(motion.div)`
    font-size: 2em;
    margin-bottom: ${({theme}) => theme.spacing.medium};
    transition: all 0.3s ease;
`;

const CardTitle = styled(motion.h3)`
    font-size: 1.5rem;
    margin-bottom: ${({theme}) => theme.spacing.medium};
    color: ${({theme}) => theme.colors.base.dark};
`;

const CardContent = styled(motion.div)`
    flex: 1;
    padding: ${({theme}) => theme.spacing.medium};

    p {
        margin-bottom: 1rem;
        line-height: 1.6;
        color: ${({theme}) => theme.colors.text.secondary};
    }

    @media (max-width: 768px) {
        padding: ${({theme}) => `${theme.spacing.medium} ${theme.spacing.small}`};
    }
`;

const Card = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: ${({theme}) => theme.spacing.medium};
`;

const cardContent: ValeurCardProps[] = [
  {
    title: "Relation de confiance",
    content: (
      <>
        <p>
          Nous sommes basés à Neuchâtel et hébergeons nos serveurs en Suisse afin d&apos;assurer 
          une sécurité et confidentialité des données de premier ordre.
        </p>
        <p>
          Nous établissons des relations de confiance à long terme avec nos clients pour 
          garantir leur satisfaction à chaque étape de leur évolution.
        </p>
      </>
    ),
    icon: <Handshake size={32} weight="duotone" />,
    isEven: false
  },
  {
    title: "Rapidité et simplicité",
    content: (
      <>
        <p>
          Notre engagement est de rendre votre transition numérique fluide et efficace, 
        avec des solutions rapides et intuitives.
        </p>
        <p>
        Notre accompagnement à chaque étape 
          vous garantit une expérience sereine et sans stress.
        </p>
      </>
    ),
    icon: <Rocket size={32} weight="duotone" />,
    isEven: true
  },
  {
    title: "Technologies solides et modernes",
    content: (
      <>
        <p>
          Nous utilisons les meilleures outils afin d&apos;offrir des fonctionnalités 
          incroyables et une viabilité à long terme.
        </p>
        <p>
          Notre stack technique moderne nous permet de créer des solutions 
          performantes et évolutives.
        </p>
        <TechList>
          <li>React</li>
          <li>Nextjs</li>
          <li>Graphql</li>
        </TechList>
      </>
    ),
    icon: <Code size={32} weight="duotone" />,
    isEven: false
  },
  {
    title: "Votre projet vous appartient",
    content: (
      <>
        <p>
          De plus en plus de plateformes web vous enferment dans leur écosystème,
          vous rendant dépendant de leurs services.
        </p>
        <p>
          Chez Neuchatech, nous croyons en la liberté et la transparence.
          Chaque projet est livré avec son code source, vous donnant un contrôle total
          sur votre solution.
        </p>
      </>
    ),
    icon: <LockOpen size={32} weight="duotone" />,
    isEven: true
  },
  {
    title: "L'excellence à petit prix",
    content: (
      <>
        <p>
          Nous offrons des solutions économiques sans compromettre la qualité
          ni les performances.
        </p>
        <p>
          Obtenez le site Web moderne et professionnel dont votre entreprise 
          a besoin, à un prix abordable et transparent.
        </p>
      </>
    ),
    icon: <PiggyBank size={32} weight="duotone" />,
    isEven: false
  },
];

const Valeurs: React.FC = () => {
  // Create a simplified version of values for the schema
  const valeursForSchema = cardContent.map(valeur => ({
    title: valeur.title,
    description: valeur.title === "Relation de confiance"
      ? "Nous sommes basés à Neuchâtel et établissons des relations de confiance à long terme avec nos clients."
      : valeur.title === "Technologies solides et modernes"
      ? "Nous utilisons les meilleures technologies pour offrir des fonctionnalités incroyables et une viabilité à long terme."
      : "Votre projet vous appartient entièrement, avec un contrôle total sur votre solution."
  }));

  const valeursSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "Neuchatech",
      "description": "Entreprise de développement web à Neuchâtel",
      "knowsAbout": valeursForSchema.map(valeur => ({
        "@type": "Thing",
        "name": valeur.title,
        "description": valeur.description
      }))
    }
  };

  return (
    <>
      {/*<NextSeo
        title="Nos Valeurs"
        description="Découvrez nos valeurs : relation de confiance, technologies modernes, et transparence totale dans nos services web à Neuchâtel."
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'valeurs entreprise, confiance, technologies modernes, transparence, développement web Neuchâtel'
          }
        ]}
      />*/}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(valeursSchema) }}
      />
      <Section id="valeurs">
        <SectionTitle>Nos Valeurs</SectionTitle>
        
        <DesktopCardContainer>
          {cardContent.map((valeur, index) => (
            <div key={index}>
              <ImageCard
                image={{
                  id: index,
                  icon: valeur.icon,
                  title: valeur.title,
                  content: valeur.content
                }}
              />
            </div>
          ))}
        </DesktopCardContainer>

        <MobileCardContainer>
          <Carousel
            slides={cardContent.map((valeur, index) => ({
              content: (
                <ImageCard
                  key={index}
                  image={{
                    id: index,
                    icon: valeur.icon,
                    title: valeur.title,
                    content: valeur.content
                  }}
                />
              )
            }))}
          />
        </MobileCardContainer>
      </Section>
    </>
  );
};

export default Valeurs;
