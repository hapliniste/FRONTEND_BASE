// pages/services.tsx

import React, { useEffect, useRef, Suspense, lazy } from 'react';
import styled from 'styled-components';
import TabCarousel from '@/components/library/TabCarousel';
import Image from 'next/image';
import { SectionTitle } from '@/components/library/typography';
import { NextSeo } from 'next-seo';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Desktop, Code, Robot, Cloud } from '@phosphor-icons/react';
//import Float3DCard from '@/components/library/Float3DCard';
//import type Hls from 'hls.js';

const PLACEHOLDER_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1280 720' fill='%23f0f0f0'%3E%3Crect width='1280' height='720'/%3E%3C/svg%3E";

const Section = styled.section`
    overflow: hidden;
    position: relative;
    padding: ${({theme}) => `${theme.spacing.section.paddingY.mobile} ${theme.spacing.section.paddingX.mobile}`};
    margin: 0;
    
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

const TabContent = styled.div`
    padding: 0;
    margin: 0;
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
    border: 1px solid ${({theme}) => `${theme.colors.accent.primary}12`};
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

const VideoView = styled.div`
    display: block;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border: 0;

    video {
        width: 102%;
        height: 102%;
        object-fit: cover;
        transform: scale(1.01);
        border: 0;
    }
`;

const CardBody = styled.div`
    padding: ${({theme}) => theme.spacing.large};
    display: flex;
    flex-direction: column;
    flex: 1;
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
    border-radius: 16px;
    padding: 1.25rem;
    transition: all 0.3s ease;
    color: ${({theme}) => theme.colors.text.primary};
    
    svg [opacity="0.2"] {
        opacity: 0.2;
        fill: ${({theme}) => theme.colors.accent.primary};
    }

    .active & {
        color: white;
        background: ${({theme}) => theme.colors.accent.primary};
        
        svg [opacity="0.2"] {
            opacity: 0.2;
            fill: white;
        }
    }
`;

const CardTitle = styled(motion.h3)`
    font-family: ${({theme}) => theme.typography.titleFontFamily};
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
    color: ${({theme}) => theme.colors.base.medium};
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
    color: ${({theme}) => theme.colors.base.dark};
    margin-top: auto;
    padding-top: 1.5rem;
    border-top: 1px solid ${({theme}) => `${theme.colors.accent.primary}12`};

    @media (max-width: 768px) {
        font-size: 1.375rem;
        padding-top: 1rem;
    }
`;

interface Tab {
    title: string;
    icon: React.ReactNode;
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

// Video wrapper component
const VideoWrapper: React.FC<{ src: string; objectPosition?: string; isPriority?: boolean }> = ({ src, objectPosition, isPriority }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const thumbnailPath = src.replace('.m3u8', '_thumb.webp');

    useEffect(() => {
        if (!videoRef.current) return;
        
        const video = videoRef.current;
        let hls: any = null;

        const loadVideo = async () => {
            try {
                const Hls = (await import('hls.js')).default;
                if (Hls.isSupported()) {
                    hls = new Hls({
                        maxBufferHole: 0.5,
                        lowLatencyMode: true,
                        preferManagedMediaSource: false,
                        startLevel: isPriority ? -1 : 0, // -1 means auto for priority, 0 means lowest quality for others
                        capLevelToPlayerSize: !isPriority, // Only adapt quality based on size for non-priority
                        //maxBufferLength: isPriority ? 30 : 4,
                        //maxMaxBufferLength: 600,
                    });

                    // Set up event handlers before loading source
                    hls.on(Hls.Events.MANIFEST_PARSED, () => {
                        if (isPriority) {
                            // For priority video, start loading immediately at highest quality
                            const highestLevel = hls.levels.length - 1;
                            hls.currentLevel = highestLevel;
                        } else {
                            // For non-priority, start with lowest quality
                            hls.currentLevel = 0;
                            // And limit network usage
                            hls.autoLevelCapping = 0;
                        }
                        video.play().catch(() => {
                            // Autoplay was prevented, ignore
                        });
                    });

                    hls.loadSource(src);
                    hls.attachMedia(video);
                }
                else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                    // Safari can play HLS natively
                    video.src = src;
                    video.addEventListener('loadedmetadata', () => {
                        video.play().catch(() => {
                            // Autoplay was prevented, ignore
                        });
                    });
                }
            } catch (error) {
                console.error('Error loading video:', error);
            }
        };

        loadVideo();

        return () => {
            if (hls) {
                hls.destroy();
            }
            video.pause();
            video.src = '';
            video.load();
        };
    }, [src, isPriority]);

    return (
        <video
            ref={videoRef}
            muted
            loop
            playsInline
            poster={thumbnailPath}
            preload={isPriority ? "auto" : "metadata"}
            style={{ 
                width: '102%', 
                height: '102%', 
                objectFit: 'cover',
                objectPosition,
                transform: 'scale(1.01)',
            }}
        />
    );
};

// Lazy load TabCarousel
const LazyTabCarousel = lazy(() => import('@/components/library/TabCarousel'));

// Simple loading placeholder
const LoadingPlaceholder = styled.div`
    width: 100%;
    height: 100%;
    background: ${props => props.theme.colors.backgrounds.light};
`;

// Lazy load Image component
const LazyImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
    return (
        <Image
            src={src}
            alt={alt}
            fill
            style={{ objectFit: 'cover' }}
            loading="lazy"
            placeholder="blur"
            blurDataURL={PLACEHOLDER_IMAGE}
        />
    );
};

const IconWrapper = styled.div`
    // When using inherit, the dual tone is not working, but the red/white is working
    //color: inherit;
    //color: ${({theme}) => theme.colors.text.primary};
    svg [opacity="0.2"] {
        opacity: 1;
        fill: ${({theme}) => theme.colors.accent.primary};
    }
`;

const services: Tab[] = [
    {
        title: "Site standard",
        icon: <IconWrapper><Desktop size={32} weight="duotone" /></IconWrapper>,
        content: (
            <ServiceCard
                title="Site standard"
                description="Un site web professionnel et moderne pour présenter votre entreprise et attirer de nouveaux clients."
                features={[
                    "Design moderne et responsive",
                    "Optimisé pour le référencement (SEO)",
                    "Mise à jour facile du contenu",
                    "Prix les plus bas du marché"
                ]}
                price="500 CHF"
                media={
                    <VideoView>
                        <VideoWrapper 
                            src="/portfolio/restaurant/restaurant.m3u8" 
                            objectPosition="center 60%"
                            isPriority={true}
                        />
                    </VideoView>
                }
            />
        )
    },
    {
        title: "Développement sur mesure",
        icon: <IconWrapper><Code size={32} weight="duotone" /></IconWrapper>,
        content: (
            <ServiceCard
                title="Développement sur mesure"
                description="Des solutions web sur mesure pour répondre à vos besoins spécifiques, du site vitrine à l'application web complexe."
                features={[
                    "Architecture moderne",
                    "Intégration avec vos outils existants",
                    "Sécurité et performance optimales",
                    "Solutions métier sur toutes les plateformes"
                ]}
                price="Sur devis"
                media={
                    <VideoView>
                        <VideoWrapper 
                            src="/portfolio/warehouse/warehouse.m3u8" 
                            objectPosition="center center"
                        />
                    </VideoView>
                }
            />
        )
    },
    {
        title: "Assistant IA managé",
        icon: <IconWrapper><Robot size={32} weight="duotone" /></IconWrapper>,
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
                price="à partir de 500 CHF + coûts d'utilisation"
                media={
                    <VideoView>
                        <VideoWrapper 
                            src="/portfolio/assistantIA/assistantIA.m3u8" 
                            objectPosition="center 35%" 
                        />
                    </VideoView>
                }
            />
        )
    },
    {
        title: "Hébergement web",
        icon: <IconWrapper><Cloud size={32} weight="duotone" /></IconWrapper>,
        content: (
            <ServiceCard
                title="Hébergement web"
                description="Une solution d'hébergement web suisse fiable et sécurisée pour votre site ou application."
                features={[
                    "Serveurs en Suisse",
                    "Performance optimale",
                    "Chiffrement SSL",
                    "Sauvegardes automatiques",
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
    const [isVisible, setIsVisible] = React.useState(false);
    const [isMobile, setIsMobile] = React.useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
            />
            <Section id="services" ref={sectionRef}>
                <ContentWrapper>
                    <SectionTitle $centered $noUnderline>Nos Services</SectionTitle>
                    {isVisible && (
                        <TabCarousel
                            tabs={services}
                            interval={7000}
                            swiperEffect="slide"
                            enableAutoplay={!isMobile}
                        />
                    )}
                </ContentWrapper>
            </Section>
        </>
    );
};

export default Services;
