import React, {useRef, useEffect} from "react";
import styled from "styled-components";
import gsap from 'gsap';

import { AppConfig } from "@/utils/AppConfig";


import { DM_Sans } from '@next/font/google'
const DMSansFont = DM_Sans({ subsets: ['latin'], weight: ['400'] })

import { Raleway } from '@next/font/google'
const titleFont = Raleway({ subsets: ['latin'], weight: ['900'] })

/*
La Hero section doit avoir de l'impact. 
Elle doit donner envie en un coup d'oeil.

Sur la gauche (60-80%) un titre et une description.
Sur la droite (40-20%) un call to action.

La section doit être responsive.

Titre: 
Ensemble, donnons vie à vos projets numériques
Description: 
Votre partenaire suisse pour une transition numérique réussie. 
Avec des solutions web modernes et performantes, nous œuvrons à vos côtés 
pour faire de chaque projet un pilier de votre succès.

Call to action:
La promotion du moment pour le produit vedette (500.- au lieu de 2000.- pour un site web) avec un gros bouton 
qui redirige vers la section contact. Options de bouton:
- "Commander maintenant"
- "Contactez nous"
- "En savoir plus"
- "Découvrez l'offre"
- "Obtenir un devis"
- "Discuter votre projet"

Future Development: 
Ajouter une barre dans laquelle on peut taper notre projet. 
Un assistant ChatGPT aide à définir le projet et à donner une estimation de prix.
Un bouton à droite permet de naviguer directment vers la section "Contact" afin de fixer un rdv. Si le client a utilisé l'IA, on préremplit le formulaire avec les informations qu'il a donné.

*/

const Section = styled.div`
    display: flex;
    flex-direction: column;
    align-content: center;

    width: 100%;
    height: 100%;

    background: ${(props) => props.theme.secondaryColor};;
    background-image: url('/neuchatechherodaube01.webp');
    background-position: bottom right;
    //background-size: cover;
    background-repeat: no-repeat;
    background-size: 40%;
    background-color: ${(props) => props.theme.backgroundColor};
    padding-top: 20em;
`;

const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: auto;
    margin-left: 10%;
    width: 60%;
    padding: ${(props) => props.theme.spacing};
`;

const Title = styled.h1`
    color: ${(props) => props.theme.textColor};
    font-size: 60pt;
    //font-size: 800%;
    //text-transform: uppercase;   
    margin: 0;
`;
const TitleColor = styled.span`
    color: ${(props) => props.theme.accentPrimary};
`;
const TitleGradient = styled.span`
    background: rgb(227,26,68);
    background: linear-gradient(115deg, rgba(227,26,68,1) 0%, rgba(230,95,83,1) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;
const Description = styled.div`
    width: 80%;
    color: ${(props) => props.theme.textColor};
    font-size: 18pt;
    margin-top: 2em;
`;
const Line = styled.p`
margin: 0;
margin-bottom: 0.5em;
`

const Hero: React.FC = () => {
    const titleRef = useRef(null);
    const descRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(titleRef.current, {opacity: 0}, {opacity: 1, duration: 1});
    }, [])

    return (
        <Section>
            <TextWrapper>
                <div ref={titleRef}>
                    <Title className={titleFont.className}><TitleColor>Ensemble</TitleColor>, donnons vie</Title>
                    <Title className={titleFont.className}>à vos <TitleGradient>projets numériques</TitleGradient></Title>
                </div>
                <Description className={DMSansFont.className} ref={descRef}>
                    <Line>Neuchatech est votre partenaire suisse pour une transition numérique réussie.</Line>
                    <Line>Avec des solutions web modernes et performantes, nous œuvrons à vos côtés pour faire de chaque projet un pilier de votre succès.</Line>
                </Description>
            </TextWrapper>
        </Section>
    );
};
export default Hero;
