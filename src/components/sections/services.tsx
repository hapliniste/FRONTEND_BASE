// pages/services.tsx

import React from 'react';
import styled from 'styled-components';
import TabCarousel from '@/components/library/TabCarousel';
import Image from 'next/image';
import { SectionTitle } from '@/components/library/typography';
import { NextSeo } from 'next-seo';
import { motion } from 'framer-motion';

const PLACEHOLDER_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1280 720' fill='%23f0f0f0'%3E%3Crect width='1280' height='720'/%3E%3C/svg%3E";

const Section = styled.section`
    overflow: hidden;
    position: relative;
    padding: ${({theme}) => `${theme.spacing.section.paddingY.mobile} ${theme.spacing.section.paddingX.mobile}`};
    margin: 0;
    padding: 0;
    
    @media (min-width: 1024px) {
        padding: ${({theme}) => `${theme.spacing.section.paddingY.desktop} ${theme.spacing.section.paddingX.desktop}`};
        margin: 0;
    }
`;

const ContentWrapper = styled.div`
    width: 100%;
    max-width: ${({theme}) => theme.sizes.maxWidth};
    margin: 0 auto;
`;

const CardContainer = styled.div`
    background-color: ${({theme}) => theme.colors.backgrounds.white};
    //border-radius: 1.5rem;
    border-radius: ${({theme}) => theme.borders.radius};
    overflow: hidden;
    width: 100%;
    height: 40em;
    display: flex;
    flex-direction: column;
    border: 1px solid ${({theme}) => `${theme.accentPrimary}12`};
    margin: 0 ${({theme}) => theme.spacing.xsmall};

    @media (min-width: 768px) {
        flex-direction: row;
        margin: 0 ${({theme}) => theme.spacing.medium};
    }
    
    @media (max-width: 768px) {
        height: auto;
        min-height: 32em;
    }
`;

const CardImageWrapper = styled.div`
    position: relative;
    display: none;
    width: 100%;
    height: 200px;

    @media (min-width: 768px) {
        display: block;
        width: 30%;
        height: 100%;
        min-height: 100%;
    }
`;

const CardBody = styled(motion.div)`
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

    @media (max-width: 768px) {
        margin-bottom: 0.75rem;
        gap: 0.75rem;
    }
`;

const CardIcon = styled(motion.div)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 100px;
    background: ${({theme}) => `${theme.colors.accent.primary}12`};
    border-radius: 12px;
    padding: 1.25rem;
    transition: all 0.3s ease;

    &:hover {
        transform: scale(1.05);
        background: ${({theme}) => `${theme.colors.accent.primary}20`};
    }
`;

const CardTitle = styled(motion.h3)`
    font-size: 1.75rem;
    font-weight: 600;
    color: ${({theme}) => theme.colors.text.primary};
    margin: 0;
`;

const CardDescription = styled.p`
    font-size: 1.1rem;
    line-height: 1.6;
    color: ${({theme}) => theme.baseMedium};
    margin-bottom: 1.5rem;

    @media (max-width: 768px) {
        font-size: 1rem;
        line-height: 1.5;
        margin-bottom: 1.75rem;
    }
`;

const FeaturesList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0 0 2rem 0;

    @media (max-width: 768px) {
        margin: 0 0 1.75rem 0;
    }
`;

const FeatureItem = styled(motion.li)`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 1rem;
    color: ${({theme}) => theme.colors.text.secondary};
    margin-bottom: 0.75rem;
    
    &:before {
        content: "✓";
        color: ${({theme}) => theme.colors.accent.primary};
        font-weight: bold;
        opacity: 0;
        transform: scale(0);
        transition: all 0.3s ease;
    }

    &:hover:before {
        opacity: 1;
        transform: scale(1);
    }
`;

const PriceTag = styled(motion.div)`
    font-size: 1.5rem;
    font-weight: 600;
    color: ${({theme}) => theme.baseDark};
    margin-top: auto;
    padding-top: 1.5rem;
    border-top: 1px solid ${({theme}) => `${theme.accentPrimary}12`};

    @media (max-width: 768px) {
        font-size: 1.375rem;
        padding-top: 1rem;
    }
`;

// Define your services
const services = [
    {
        title: "Site standard",
        icon: "/icon_website.png",
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
                <CardBody
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <CardHeader>
                        <CardIcon
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Image
                                src="/icon_website.png"
                                alt="Site web standard icon"
                                width={64}
                                height={64}
                            />
                        </CardIcon>
                        <CardTitle>Site standard</CardTitle>
                    </CardHeader>
                    <CardDescription>
                    Parfait pour présenter votre entreprise, trouver de nouveaux clients et regrouper vos informations en un endroit accessible à tous.
                    </CardDescription>
                    <FeaturesList>
                        <FeatureItem
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            Design moderne adapté à tous les appareils
                        </FeatureItem>
                        <FeatureItem
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            Optimisé pour le référencement (SEO)
                        </FeatureItem>
                        <FeatureItem
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            Mise à jour facile du contenu
                        </FeatureItem>
                        <FeatureItem
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            Options d&apos;hébergement suisse
                        </FeatureItem>
                    </FeaturesList>
                    <PriceTag
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                    >
                        500 CHF
                    </PriceTag>
                </CardBody>
            </CardContainer>
        ),
    },
    {
        title: "Développement sur mesure",
        icon: "/icon_customdev.png",
        content: (
            <CardContainer>
                <CardImageWrapper>
                    <Image
                        src={PLACEHOLDER_IMAGE}
                        alt="Développement sur mesure"
                        fill
                        style={{ objectFit: 'cover' }}
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL={PLACEHOLDER_IMAGE}
                    />
                </CardImageWrapper>
                <CardBody
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <CardHeader>
                        <CardIcon
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Image
                                src="/icon_customdev.png"
                                alt="Développement sur mesure icon"
                                width={64}
                                height={64}
                                loading="lazy"
                            />
                        </CardIcon>
                        <CardTitle>Développement sur mesure</CardTitle>
                    </CardHeader>
                    <CardDescription>
                        Solutions web personnalisées pour répondre à vos besoins spécifiques,
                        de l&apos;application métier à la plateforme collaborative.
                    </CardDescription>
                    <FeaturesList>
                        <FeatureItem
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            Architecture moderne
                        </FeatureItem>
                        <FeatureItem
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            Intégration avec vos outils existants
                        </FeatureItem>
                        <FeatureItem
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            Sécurité et performance optimales
                        </FeatureItem>
                        {/*<FeatureItem
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            Hébergement haute disponibilité
                        </FeatureItem>*/}
                    </FeaturesList>
                    <PriceTag
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                    >
                        Sur devis
                    </PriceTag>
                </CardBody>
            </CardContainer>
        ),
    },
    {
        title: "Assistant IA managé",
        icon: "/icon_assistant.png",
        content: (
            <CardContainer>
                <CardImageWrapper>
                    <Image
                        src={PLACEHOLDER_IMAGE}
                        alt="Assistant IA"
                        fill
                        style={{ objectFit: 'cover' }}
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL={PLACEHOLDER_IMAGE}
                    />
                </CardImageWrapper>
                <CardBody
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <CardHeader>
                        <CardIcon
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Image
                                src="/icon_assistant.png"
                                alt="Assistant IA icon"
                                width={64}
                                height={64}
                                loading="lazy"
                            />
                        </CardIcon>
                        <CardTitle>Assistant IA managé</CardTitle>
                    </CardHeader>
                    <CardDescription>
                        Un assistant virtuel intelligent, ayant accès à vos données pour répondre
                        aux questions de vos clients ou de votre équipe.
                    </CardDescription>
                    <FeaturesList>
                        <FeatureItem
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            IA dernière génération
                        </FeatureItem>
                        <FeatureItem
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            Intégration de vos données
                        </FeatureItem>
                        <FeatureItem
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            Disponible 24/7
                        </FeatureItem>
                        <FeatureItem
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            Mises à jour automatiques
                        </FeatureItem>
                        <FeatureItem
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            Restez maître de vos données
                        </FeatureItem>
                    </FeaturesList>
                    <PriceTag
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                    >
                        500 CHF + coûts d&apos;utilisation
                    </PriceTag>
                </CardBody>
            </CardContainer>
        ),
    },
    {
        title: "Hébergement web",
        icon: "☁️",
        content: (
            <CardContainer>
                <CardImageWrapper>
                    <Image
                        src={PLACEHOLDER_IMAGE}
                        alt="Hébergement web"
                        fill
                        style={{ objectFit: 'cover' }}
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL={PLACEHOLDER_IMAGE}
                    />
                </CardImageWrapper>
                <CardBody
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <CardHeader>
                        <CardIcon
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            ☁️
                        </CardIcon>
                        <CardTitle>Hébergement web</CardTitle>
                    </CardHeader>
                    <CardDescription>
                        Une solution d&apos;hébergement web suisse fiable et sécurisée pour votre site web ou application demandante. 
                    </CardDescription>
                    <FeaturesList>
                        <FeatureItem
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            Serveurs en Suisse
                        </FeatureItem>
                        <FeatureItem
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            Certificat SSL pour une connexion sécurisée
                        </FeatureItem>
                        <FeatureItem
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            Sauvegardes automatiques
                        </FeatureItem>
                        <FeatureItem
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            Performant et extensible
                        </FeatureItem>
                    </FeaturesList>
                    <PriceTag
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                    >
                        10 CHF / mois
                    </PriceTag>
                </CardBody>
            </CardContainer>
        ),
    },
];

const Services: React.FC = () => {
    // Create a simplified version of services for the schema
    const servicesForSchema = services.map(service => ({
        title: service.title,
        description: service.title === "Hébergement web" 
            ? "Solution d'hébergement web suisse fiable et sécurisée pour votre site web ou application demandante."
            : service.title === "Site web standard"
            ? "Un site web professionnel et moderne pour votre entreprise, avec un design adapté à votre image."
            : service.title === "Développement sur mesure"
            ? "Des solutions web sur mesure pour répondre à vos besoins spécifiques, du site vitrine à l'application web complexe."
            : "Un assistant IA personnalisé pour automatiser vos tâches et améliorer votre productivité."
    }));

    const servicesSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": servicesForSchema.map((service, index) => ({
            "@type": "Service",
            "position": index + 1,
            "name": service.title,
            "description": service.description,
            "provider": {
                "@type": "Organization",
                "name": "Neuchatech",
                "url": "https://neuchatech.ch"
            },
            "areaServed": {
                "@type": "City",
                "name": "Neuchâtel"
            }
        }))
    };

    return (
        <>
            <NextSeo
                title="Services Web Professionnels"
                description="Développement web sur mesure, sites web standards, hébergement et assistants IA pour votre entreprise à Neuchâtel."
                additionalMetaTags={[
                    {
                        name: 'keywords',
                        content: 'développement web, site web standard, développement sur mesure, assistant IA, hébergement web, Neuchâtel'
                    }
                ]}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
            />
            <Section id="services">
                <ContentWrapper>
                    <SectionTitle $centered $noUnderline>Nos Services</SectionTitle>
                    <TabCarousel
                        tabs={services}
                        interval={7000}
                        swiperEffect="slide"
                    />
                </ContentWrapper>
            </Section>
        </>
    );
};

export default Services;
