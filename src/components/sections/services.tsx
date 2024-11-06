// pages/services.tsx

import React from 'react';
import styled from 'styled-components';
import TabCarousel from '@/components/library/TabCarousel';
import Image from 'next/image';

const PLACEHOLDER_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1280 720' fill='%23f0f0f0'%3E%3Crect width='1280' height='720'/%3E%3C/svg%3E";

const Section = styled.section`
    background: ${(props) => props.theme.backgroundColor};
    overflow: hidden;
    position: relative;
    padding: 8rem 1.5rem;
    
    @media (min-width: 1024px) {
        padding: 10rem 8%;
    }
`;

const ContentWrapper = styled.div`
    max-width: 1000px;
    margin: 0 auto;
`;

const SectionTitle = styled.h2`
    text-align: center;
    margin-bottom: 6rem;
    font-family: 'Montserrat', sans-serif;
    font-size: 2.75rem;
    font-weight: 700;
    color: ${props => props.theme.baseDark};
    letter-spacing: -0.03em;
    
    @media (min-width: 768px) {
        font-size: 3.25rem;
    }
`;

const CardContainer = styled.div`
    background: white;
    border-radius: 1.5rem;
    overflow: hidden;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    border: 1px solid ${props => props.theme.accentPrimary}12;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const CardImageWrapper = styled.div`
    position: relative;
    width: 30%;
    min-height: 100%;

    @media (max-width: 768px) {
        width: 100%;
        height: 200px;
    }
`;

const CardBody = styled.div`
    padding: 2.5rem;
    flex: 1;
    display: flex;
    flex-direction: column;
`;

const CardHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
`;

const CardIcon = styled.span`
    font-size: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    background: ${props => props.theme.accentPrimary}12;
    border-radius: 12px;
`;

const CardTitle = styled.h3`
    font-family: 'Montserrat', sans-serif;
    font-size: 1.75rem;
    font-weight: 600;
    color: ${props => props.theme.baseDark};
    margin: 0;
`;

const CardDescription = styled.p`
    font-size: 1.1rem;
    line-height: 1.6;
    color: ${props => props.theme.baseMedium};
    margin-bottom: 1.5rem;
`;

const FeaturesList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0 0 1.5rem 0;
`;

const FeatureItem = styled.li`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 1rem;
    color: ${props => props.theme.baseMedium};
    margin-bottom: 0.75rem;
    
    &:before {
        content: "✓";
        color: ${props => props.theme.accentPrimary};
        font-weight: bold;
    }
`;

const PriceTag = styled.div`
    font-family: 'Montserrat', sans-serif;
    font-size: 1.5rem;
    font-weight: 600;
    color: ${props => props.theme.baseDark};
    margin-top: auto;
    padding-top: 1.5rem;
    border-top: 1px solid ${props => props.theme.accentPrimary}12;
`;

// Define your services
const services = [
    {
        title: "Site standard",
        content: (
            <CardContainer>
                <CardImageWrapper>
                    <Image
                        src={PLACEHOLDER_IMAGE}
                        alt="Site web standard"
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                    />
                </CardImageWrapper>
                <CardBody>
                    <CardHeader>
                        <CardIcon>🌐</CardIcon>
                        <CardTitle>Site standard</CardTitle>
                    </CardHeader>
                    <CardDescription>
                    Parfait pour présenter votre entreprise, trouver de nouveaux clients et regrouper vos informations en un endroit accessible à tous.
                    </CardDescription>
                    <FeaturesList>
                        <FeatureItem>Design moderne adapté à tous les appareils</FeatureItem>
                        <FeatureItem>Optimisé pour le référencement (SEO)</FeatureItem>
                        <FeatureItem>Mise à jour facile du contenu</FeatureItem>
                        <FeatureItem>Options d'hébergement suisse</FeatureItem>
                    </FeaturesList>
                    <PriceTag>À partir de 500 CHF</PriceTag>
                </CardBody>
            </CardContainer>
        ),
    },
    {
        title: "Développement sur mesure",
        content: (
            <CardContainer>
                <CardImageWrapper>
                    <Image
                        src={PLACEHOLDER_IMAGE}
                        alt="Développement sur mesure"
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                </CardImageWrapper>
                <CardBody>
                    <CardHeader>
                        <CardIcon>🛠️</CardIcon>
                        <CardTitle>Développement sur mesure</CardTitle>
                    </CardHeader>
                    <CardDescription>
                        Solutions web personnalisées pour répondre à vos besoins spécifiques,
                        de l&apos;application métier à la plateforme collaborative.
                    </CardDescription>
                    <FeaturesList>
                        <FeatureItem>Architecture moderne</FeatureItem>
                        <FeatureItem>Intégration avec vos outils existants</FeatureItem>
                        <FeatureItem>Sécurité et performance optimales</FeatureItem>
                        <FeatureItem>Hébergement haute disponibilité</FeatureItem>
                    </FeaturesList>
                    <PriceTag>Sur devis</PriceTag>
                </CardBody>
            </CardContainer>
        ),
    },
    {
        title: "Assistant IA managé",
        content: (
            <CardContainer>
                <CardImageWrapper>
                    <Image
                        src={PLACEHOLDER_IMAGE}
                        alt="Assistant IA"
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                </CardImageWrapper>
                <CardBody>
                    <CardHeader>
                        <CardIcon>🤖</CardIcon>
                        <CardTitle>Assistant IA managé</CardTitle>
                    </CardHeader>
                    <CardDescription>
                        Un assistant virtuel intelligent, ayant accès à vos données pour répondre
                        aux questions de vos clients ou de votre équipe.
                    </CardDescription>
                    <FeaturesList>
                        <FeatureItem>IA dernière génération</FeatureItem>
                        <FeatureItem>Intégration de vos données</FeatureItem>
                        <FeatureItem>Disponible 24/7</FeatureItem>
                        <FeatureItem>Mises à jour automatiques</FeatureItem>
                        <FeatureItem>Restez maître de vos données</FeatureItem>
                    </FeaturesList>
                    <PriceTag>Dès 200 CHF + utilisation</PriceTag>
                </CardBody>
            </CardContainer>
        ),
    },
    {
        title: "Hébergement web",
        content: (
            <CardContainer>
                <CardImageWrapper>
                    <Image
                        src={PLACEHOLDER_IMAGE}
                        alt="Hébergement web"
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                </CardImageWrapper>
                <CardBody>
                    <CardHeader>
                        <CardIcon>☁️</CardIcon>
                        <CardTitle>Hébergement web</CardTitle>
                    </CardHeader>
                    <CardDescription>
                        Un hébergement suisse sécurisé et performant pour votre site ou application web.
                    </CardDescription>
                    <FeaturesList>
                        <FeatureItem>Serveurs en Suisse</FeatureItem>
                        <FeatureItem>Certificat SSL pour une connexion sécurisée</FeatureItem>
                        <FeatureItem>Sauvegardes automatiques</FeatureItem>
                        <FeatureItem>Performant et extensible</FeatureItem>
                    </FeaturesList>
                    <PriceTag>10 CHF / mois</PriceTag>
                </CardBody>
            </CardContainer>
        ),
    },
];

const Services: React.FC = () => {
    return (
        <Section>
            <ContentWrapper>
                <SectionTitle>Nos Services</SectionTitle>
                <TabCarousel
                    tabs={services}
                    interval={7000}
                    swiperEffect="slide"
                />
            </ContentWrapper>
        </Section>
    );
};

export default Services;
