import React from 'react';
import styled from 'styled-components';
import Carousel from "@/components/library/carousel";
import ImageCard from "@/components/library/imageCard";

interface ValeurCardProps {
  title: string;
  content: React.ReactNode;
  icon: string;
  isEven: boolean;
}

const Section = styled.section`
  overflow: hidden;
  position: relative;
  padding: 0;//${({theme}) => `${theme.spacing.section.paddingY.mobile} ${theme.spacing.section.paddingX.mobile}`};
  
  @media (min-width: 1024px) {
    padding: ${({theme}) => `${theme.spacing.section.paddingY.desktop} ${theme.spacing.section.paddingX.desktop}`};
  }
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  color: ${({theme}) => theme.colors.text.primary};
  letter-spacing: -0.03em;
  margin-bottom: 2rem;
  
  @media (min-width: 768px) {
    font-size: 2.75rem;
    margin-bottom: 4rem;
  }
`;

const DesktopCardContainer = styled.div`
  display: none;
  
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 4rem;
    max-width: ${({theme}) => theme.sizes.maxWidth};
    margin: 0 auto;
    padding: 4rem 2rem;
    
    & > div {
      min-height: 300px;
      display: flex;
      transition: all 0.3s ease;
      box-shadow: 0 0 0 rgba(0, 0, 0, 0);
      border-radius: 2rem;
      
      &:nth-child(even) {
        transform: translateY(40%);
        
        &:hover {
          transform: translateY(calc(40% - 0.5rem)) scale(1.02);
          box-shadow: 0 20px 80px rgba(0, 0, 0, 0.03);
        }
      }
      
      &:nth-child(odd) {
        &:hover {
          transform: translateY(-0.5rem) scale(1.05);
          box-shadow: 0 20px 80px rgba(0, 0, 0, 0.03);
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
    padding-bottom: 2rem;
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
  background-color: ${props => props.theme.accentPrimary};
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
`;

const CardContent = styled.div`
  flex: 1;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.baseDark};
`;

const CardDescription = styled.p`
  font-size: 1rem;
  color: ${props => props.theme.baseMedium};
`;

const MobileCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1rem;
`;

const MobileCardImage = styled.div`
  width: 100%;
  height: 150px;
  max-width: 200px;
  background-color: ${props => props.theme.accentPrimary};
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const cardContent: ValeurCardProps[] = [
  {
    title: "Relation de confiance",
    content: (
      <>
        <p>
          Nous sommes basés à Neuchâtel et hébergeons nos serveurs en Suisse afin d'assurer 
          une sécurité et confidentialité des données de premier ordre.
        </p>
        <p>
          Nous établissons des relations de confiance à long terme avec nos clients pour 
          garantir leur satisfaction à chaque étape de leur évolution.
        </p>
      </>
    ),
    icon: "🤝",
    isEven: false
  },
  {
    title: "Rapidité et simplicité",
    content: (
      <p>
        Notre engagement est de rendre votre transition numérique fluide et efficace, 
        avec des solutions rapides et intuitives. Notre accompagnement à chaque étape 
        vous garantit une expérience sereine et sans stress.
      </p>
    ),
    icon: "⚡",
    isEven: true
  },
  {
    title: "Technologies solides et modernes",
    content: (
      <>
        <p>
          Nous utilisons les meilleures outils afin d'offrir des fonctionnalités 
          incroyables et une viabilité à long terme de nos solutions.
        </p>
        <ul>
          <li>React</li>
          <li>Nextjs</li>
          <li>Graphql</li>
        </ul>
      </>
    ),
    icon: "💻",
    isEven: false
  },
  {
    title: "Votre projet vous appartient",
    content: (
      <p>
        De plus en plus de platformes web vous enferment dans leur écosystème, 
        ne donnant pas le code source afin de vous rendre dépendant de leur service 
        et hébergement. Chez Neuchatech, nous croyons en la liberté et la transparence, 
        chaque projet étant livré avec son code source.
      </p>
    ),
    icon: "🔓",
    isEven: true
  },
  {
    title: "L'excellence à un prix attractif",
    content: (
      <p>
        Nous offrons des solutions économiques sans compromettre la qualité, 
        les performances ou la sécurité. Obtenez le site Web moderne et professionnel 
        dont votre entreprise a besoin à un prix abordable.
      </p>
    ),
    icon: "💰",
    isEven: false
  },
];

const Valeurs: React.FC = () => {
  return (
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
  );
};

export default Valeurs;
