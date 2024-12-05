import React from "react";
import styled from "styled-components";

import Card, {ICardProps} from "@/components/library/card";
import Carousel, {ICarouselProps} from "@/components/library/carousel";

/*
La section "Le numérique" liste les avantages d'avoir un site web et une présence en ligne.

"Augmentez votre visibilité, simplifiez vos opérations et assurez une évolutivité sans faille avec les solutions digitales de Neuchatech."

Présentation structurée et iconographique des bénéfices clients, mise en avant sur des cartes élégantes.

*/

/*const Section = styled.div`
    background: ${(props) => props.theme.backgroundColor};
    height: 100%;
`;*/

const CarouselWrapper = styled.div`
    width: 100%;
    height: 100%;
    padding: ${(props) => props.theme.spacing};
`;

const Section = styled.div`
    background: ${(props) => props.theme.backgroundColor};
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-content: center;
    margin: 0;
    padding: 0;
`;

const cardContent: ICardProps[] = [
    {
        title: "Boostez votre visibilité",
        content: [
            "Les gens passent de plus en plus de temps en ligne",
            "Avoir un site web vous permet d'être visible 24/7",
            "Ciblez des clients potentiels en utilisant les bons mots-clés et en optimisant votre référencement naturel (SEO)",
        ],
    },
    {
        title: "Améliorez votre crédibilité",
        content: [
            "Les entreprises modernes ont toutes un site web",
            "Les clients s'attendent à trouver des informations sur une entreprise en ligne",
            "Un site web professionnel renforce votre crédibilité et votre expertise dans votre domaine",
        ],
    },
    {
        title: "Gagnez du temps et de l'efficacité",
        content: [
            "Les clients peuvent trouver les informations dont ils ont besoin sans vous contacter",
            "Les formulaires en ligne peuvent automatiser certaines tâches administratives",
            "Les systèmes de gestion de commandes en ligne peuvent vous faire gagner du temps et vous permettent de vous concentrer sur d'autres tâches",
        ],
    },
    {
        title: "Obtenez des insights sur votre audience",
        content: [
            "Suivez les habitudes de navigation de vos clients grâce à des outils d'analyse web",
            "Comprenez les intérêts de votre audience en collectant des données démographiques",
            "Utilisez les données pour cibler efficacement vos efforts de marketing",
        ],
    },
    {
        title: "Élargissez votre portée géographique",
        content: [
            "Vendez vos produits et services en ligne à des clients partout dans le monde",
            "Atteignez de nouveaux marchés et de nouveaux segments de clientèle",
            "Ne soyez plus limité par la géographie",
        ],
    },
    {
        title: "Améliorez la communication avec vos clients",
        content: [
            "Fournissez un moyen facile pour que vos clients vous contactent en ligne",
            "Créez un système de support en ligne pour répondre aux questions fréquentes",
            "Maintenez une présence en ligne active pour interagir avec votre communauté",
        ],
    }
];


const Numerique: React.FC = () => {
    return (
        <Section>
            
            {/*<Carousel>
            {
                cardContent.map(cc => {
                    return (
                        <Card key={cc.title} {...cc} />
                    )
                })
            }
        </Carousel>*/}

        </Section>
    );
};
export default Numerique;



