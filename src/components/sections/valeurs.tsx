import React, { useRef, useEffect } from "react";
import { RefObject } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Card, { ICardProps } from "@/components/library/card";
import Carousel from "@/components/library/carousel";

gsap.registerPlugin(ScrollTrigger);

const Section = styled.section`
  background: ${(props) => props.theme.backgroundColor};
  overflow: hidden;
  position: relative; // for absolute positioning of scroll buttons
`;

const cardContent: ICardProps[] = [
    {
        title: "Relation de confiance",
        content: "Nous sommes basés à Neuchâtel et hébergeons nos serveurs en Suisse afin d'assurer une sécurité et confidentialité des données de premier ordre. Nous établissons des relations de confiance à long terme avec nos clients pour garantir leur satisfaction à chaque étape de leur évolution.",
    },
    {
        title: "Rapidité et simplicité",
        content: "Notre engagement est de rendre votre transition numérique fluide et efficace, avec des solutions rapides et intuitives. Notre accompagnement à chaque étape vous garantit une expérience sereine et sans stress.",
    },
    {
        title: "Technologies solides et modernes",
        content:  "Nous utilisons les meilleures technologies afin d'offrir des fonctionnalités incroyables et une viabilité à long terme de nos solutions. -React -Nextjs -Graphql",
    },
    {
        title: "Votre projet vous appartient",
        content: "De plus en plus de platformes web vous enferment dans leur écosystème, ne donnant pas le code source afin de vous rendre dépendant de leur service et hébergement. Chez Neuchatech, nous croyons en la liberté et la transparence, chaque projet étant livré avec son code source.",
    },
    {
        title: "L'excellence à un prix attractif",
        content: "Nous offrons des solutions économiques sans compromettre la qualité, les performances ou la sécurité. Obtenez le site Web moderne et professionnel dont votre entreprise a besoin à un prix abordable.",
    },
];

interface ValeursProps {
    scrollerRef?: RefObject<HTMLElement>;
  }

const Valeurs: React.FC<ValeursProps> = () => {


  useEffect(() => {
    // GSAP animation setup
    // ... your useEffect code
  }, []);

  return (
    <Section>
      <Carousel cardContent={cardContent} />
    </Section>
  );
};

export default Valeurs;

/*
<CarouselContainer ref={carouselRef}>
        {cardContent.map((cc) => (
          <CardWrapper key={cc.title}>
            <Card {...cc} />
          </CardWrapper>
        ))}
      </CarouselContainer>



            <ScrollButton className="left" onClick={scrollLeft}>
        &#x2039; 
        </ScrollButton>

        <ScrollButton className="right" onClick={scrollRight}>
        &#x203A; 
      </ScrollButton>
*/