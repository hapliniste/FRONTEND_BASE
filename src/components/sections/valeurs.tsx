import React from 'react';
import styled from 'styled-components';
import Carousel from "@/components/library/carousel";
import ImageCard from "@/components/library/imageCard";

interface ValeurCardProps {
  title: string;
  content: string;
  icon: string;
  isEven: boolean;
}

const Section = styled.section`
  background: ${(props) => props.theme.backgroundColor};
  overflow: hidden;
  position: relative;
  padding: 4rem 2rem;
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2.5rem;
  color: ${props => props.theme.baseDark};
`;

const DesktopCardContainer = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }
`;

const StaggeredCard = styled.div<{ isEven: boolean }>`
  margin-top: ${props => props.isEven ? '10rem' : '0'};
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

const MobileCardContainer = styled.div`
  @media (min-width: 768px) {
    display: none;
  }
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
    content: "Nous sommes basés à Neuchâtel et hébergeons nos serveurs en Suisse afin d'assurer une sécurité et confidentialité des données de premier ordre. Nous établissons des relations de confiance à long terme avec nos clients pour garantir leur satisfaction à chaque étape de leur évolution.",
    icon: "🤝",
    isEven: false
  },
  {
    title: "Rapidité et simplicité",
    content: "Notre engagement est de rendre votre transition numérique fluide et efficace, avec des solutions rapides et intuitives. Notre accompagnement à chaque étape vous garantit une expérience sereine et sans stress.",
    icon: "⚡",
    isEven: true
  },
  {
    title: "Technologies solides et modernes",
    content: "Nous utilisons les meilleures technologies afin d'offrir des fonctionnalités incroyables et une viabilité à long terme de nos solutions. -React -Nextjs -Graphql",
    icon: "💻",
    isEven: false
  },
  {
    title: "Votre projet vous appartient",
    content: "De plus en plus de platformes web vous enferment dans leur écosystème, ne donnant pas le code source afin de vous rendre dépendant de leur service et hébergement. Chez Neuchatech, nous croyons en la liberté et la transparence, chaque projet étant livré avec son code source.",
    icon: "🔓",
    isEven: true
  },
  {
    title: "L'excellence à un prix attractif",
    content: "Nous offrons des solutions économiques sans compromettre la qualité, les performances ou la sécurité. Obtenez le site Web moderne et professionnel dont votre entreprise a besoin à un prix abordable.",
    icon: "💎",
    isEven: false
  },
];

const Valeurs: React.FC = () => {
  return (
    <Section>
      <SectionTitle>Nos Valeurs</SectionTitle>
      
      <DesktopCardContainer>
        {cardContent.map((valeur, index) => (
          <StaggeredCard key={index} isEven={index % 2 !== 0}>
            <ImageCard
              image={{
                id: index,
                href: '#',
                imageSrc: `/images/valeurs/${valeur.icon}.jpg`, // Assuming you have corresponding images
                name: valeur.title,
                username: valeur.content
              }}
            />
          </StaggeredCard>
        ))}
      </DesktopCardContainer>

      <MobileCardContainer>
        <Carousel
          slides={cardContent.map((valeur, index) => ({
            content: (
              <ImageCard
                image={{
                  id: index,
                  href: '#',
                  imageSrc: `/images/valeurs/${valeur.icon}.jpg`,
                  name: valeur.title,
                  username: valeur.content
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