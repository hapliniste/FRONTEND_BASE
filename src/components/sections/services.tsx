// pages/services.tsx

import React from 'react';
import styled from 'styled-components';
import TabCarousel from '@/components/library/TabCarousel';
import Image from 'next/image';
import { SectionTitle } from '@/components/library/typography';
import { NextSeo } from 'next-seo';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Float3DCard from '@/components/library/Float3DCard';
import { Space_Grotesk } from 'next/font/google';

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
    border-radius: ${({theme}) => theme.borders.radius};
    overflow: hidden;
    width: 100%;
    min-height: 40em;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    position: relative;
    border: 1px solid ${({theme}) => `${theme.accentPrimary}12`};
    margin: 0 ${({theme}) => theme.spacing.xsmall};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;

    &:hover {
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
        transform: translateY(-2px);
    }

    @media (min-width: 768px) {
        grid-template-columns: 35% 1fr;
        grid-template-rows: 1fr;
        margin: 0 ${({theme}) => theme.spacing.medium};
        min-height: 35em;
    }
`;

const MediaContainer = styled(motion.div)`
    position: relative;
    height: 210px;
    width: 100%;
    overflow: hidden;
    
    @media (min-width: 768px) {
        height: 100%;
        border-radius: ${({theme}) => theme.borders.radius} 0 0 ${({theme}) => theme.borders.radius};
    }

    .image-scroll-container {
        position: absolute;
        top: -50%;
        left: -50%;
        width: 2000%;
        height: 2000%;
        background-image: url('/portfolio/hostingDashboard.png');
        background-size: 300px auto;
        transform: rotate(20deg) scale(2);
        background-repeat: repeat;
        animation: scrollBackground 1200s linear infinite;
        
        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(25deg, #f5f5f5, #ffffff);
            opacity: 0.1;
            z-index: 1;
        }
    }

    @keyframes scrollBackground {
        0% {
            background-position: 0 0;
        }
        100% {
            background-position: 300% -200%;
        }
    }
`;

const DesktopView = styled.div`
    display: none;
    width: 100%;
    height: 100%;
    
    @media (min-width: 768px) {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

const MobileView = styled.div`
    display: block;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border: 0;
    
    @media (min-width: 768px) {
        display: none;
    }

    video {
        width: 102%;
        height: 102%;
        object-fit: cover;
        object-position: center 60%;
        border: 0;
    }
`;

const AIVideoView = styled.div`
    display: block;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border: 0;

    video {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center 35%;
        border: 0;
    }
`;

const CardBody = styled(motion.div)`
    padding: 2.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

const CardHeader = styled(motion.div)`
    display: flex;
    align-items: center;
    padding-bottom: 0.5rem;
`;

const CardIcon = styled(motion.div)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    background: ${({theme}) => `${theme.colors.accent.primary}12`};
    border-radius: 16px;
    padding: 1.25rem;
    transition: all 0.3s ease;
`;

const spaceGrotesk = Space_Grotesk({ 
    subsets: ['latin'],
    weight: ['700']
});

const CardTitle = styled(motion.h3)`
    font-family: 'Clash Display', ${spaceGrotesk.style.fontFamily};
    font-size: 2.75rem;
    font-weight: 700;
    color: ${({theme}) => theme.colors.text.primary};
    margin: 0;
    line-height: 1;
    letter-spacing: -0.03em;
    text-transform: uppercase;
    
    @media (max-width: 768px) {
        font-size: 2.25rem;
    }
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

const CheckContainer = styled.div`
    position: relative;
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    &::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        background: ${({theme}) => `${theme.colors.accent.primary}12`};
        border-radius: 50%;
    }
`;

const CheckIcon = styled(motion.span)`
    position: relative;
    color: ${({theme}) => theme.colors.accent.primary};
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;

    &::before {
        content: "✦";
        line-height: 1;
    }
`;

// Animation variants
const listVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { 
        opacity: 0,
        x: -20
    },
    visible: { 
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.3
        }
    }
};

const checkVariants = {
    hidden: { 
        scale: 0,
        opacity: 0
    },
    visible: { 
        scale: 1,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 15
        }
    }
};

const FeaturesList = ({ features }: { features: string[] }) => {
    const [ref, inView] = useInView({
        threshold: 0.5,
        triggerOnce: true
    });

    return (
        <motion.ul
            ref={ref}
            variants={listVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            style={{
                listStyle: 'none',
                padding: 0,
                margin: '1rem 0',
                display: 'grid',
                gap: '1rem'
            }}
        >
            {features.map((feature, index) => (
                <motion.li
                    key={index}
                    variants={itemVariants}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem'
                    }}
                >
                    <CheckContainer>
                        <motion.div variants={checkVariants} style={{ display: 'flex' }}>
                            <CheckIcon />
                        </motion.div>
                    </CheckContainer>
                    <span>{feature}</span>
                </motion.li>
            ))}
        </motion.ul>
    );
};

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

interface Tab {
    title: string;
    icon: string;
    content: React.ReactNode;
}

interface ServiceCardProps {
    title: string;
    icon: string;
    description: string;
    features: string[];
    price: string;
    media: React.ReactNode;
}

const ServiceCard = ({ title, description, features, price, media }: Omit<ServiceCardProps, 'icon'>) => {
    return (
        <CardContainer>
            <MediaContainer
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                {media}
            </MediaContainer>
            <CardBody>
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
                
                <CardDescription>{description}</CardDescription>
                
                <FeaturesList features={features} />
                
                <PriceTag
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                >
                    {price}
                </PriceTag>
            </CardBody>
        </CardContainer>
    );
};

const services: Tab[] = [
    {
        title: "Site standard",
        icon: "/icon_website.png",
        content: (
            <ServiceCard
                title="Site standard"
                description="Un site web professionnel et moderne pour présenter votre entreprise et attirer de nouveaux clients."
                features={[
                    "Design moderne et responsive",
                    "Optimisé pour le référencement (SEO)",
                    "Mise à jour facile du contenu",
                    "Hébergement suisse inclus"
                ]}
                price="500 CHF"
                media={
                    <>
                        {/* 3D Card version (commented out)
                        <DesktopView>
                            <Float3DCard
                                enableHover={true}
                                enableDrag={false}
                                hoverIntensity={0.3}
                                margin="4.5rem"
                            >
                                <div style={{
                                    position: 'relative',
                                    width: '200px',
                                    height: '430px',
                                    borderRadius: '1rem',
                                    overflow: 'hidden',
                                    border: '4px solid #1a1a1a',
                                    backgroundColor: '#1a1a1a',
                                }}>
                                    <video
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'fill',
                                            position: 'absolute',
                                            top: '0px',
                                            left: '0',
                                        }}
                                    >
                                        <source src="/portfolio/hero_avocat01.webm" type="video/webm" />
                                    </video>
                                </div>
                            </Float3DCard>
                        </DesktopView>
                        */}

                        {/* Direct video version */}
                        <MobileView style={{ display: 'block' }}>
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                            >
                                <source src="/portfolio/heroRestaurant_01.webm" type="video/webm" />
                            </video>
                        </MobileView>
                    </>
                }
            />
        )
    },
    {
        title: "Développement sur mesure",
        icon: "/icon_customdev.png",
        content: (
            <ServiceCard
                title="Développement sur mesure"
                description="Des solutions web sur mesure pour répondre à vos besoins spécifiques, du site vitrine à l'application web complexe."
                features={[
                    "Architecture moderne",
                    "Intégration avec vos outils existants",
                    "Sécurité et performance optimales"
                ]}
                price="Sur devis"
                media={
                    <Image
                        src={PLACEHOLDER_IMAGE}
                        alt="Développement sur mesure"
                        fill
                        style={{ objectFit: 'cover' }}
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL={PLACEHOLDER_IMAGE}
                    />
                }
            />
        )
    },
    {
        title: "Assistant IA managé",
        icon: "/icon_assistant.png",
        content: (
            <ServiceCard
                title="Assistant IA managé"
                description="Un assistant virtuel intelligent, ayant accès à vos données pour répondre aux questions de vos clients ou de votre équipe."
                features={[
                    "IA dernière génération",
                    "Intégration de vos données",
                    "Disponible 24/7",
                    "Mises à jour automatiques",
                    "Restez maître de vos données"
                ]}
                price="500 CHF + coûts d'utilisation"
                media={
                    <AIVideoView>
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                        >
                            <source src="/portfolio/assistantIA_01.webm" type="video/webm" />
                        </video>
                    </AIVideoView>
                }
            />
        )
    },
    {
        title: "Hébergement web",
        icon: "☁️",
        content: (
            <ServiceCard
                title="Hébergement web"
                description="Une solution d'hébergement web suisse fiable et sécurisée pour votre site ou application."
                features={[
                    "Serveurs en Suisse",
                    "Certificat SSL inclus",
                    "Sauvegardes automatiques",
                    "Support technique réactif"
                ]}
                price="10 CHF / mois"
                media={
                    <div className="image-scroll-container"></div>
                }
            />
        )
    }
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
            {/*<NextSeo
                title="Services Web Professionnels"
                description="Développement web sur mesure, sites web standards, hébergement et assistants IA pour votre entreprise à Neuchâtel."
                additionalMetaTags={[
                    {
                        name: 'keywords',
                        content: 'développement web, site web standard, développement sur mesure, assistant IA, hébergement web, Neuchâtel'
                    }
                ]}
            />*/}
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
