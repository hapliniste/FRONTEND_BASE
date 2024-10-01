import React from 'react';
import styled from 'styled-components';
import TabCarousel from '@/components/library/TabCarousel';

const Section = styled.section`
    background: ${(props) => props.theme.backgroundColor};
    overflow: hidden;
    position: relative;
    padding: 4rem 2rem;
`;

const SectionTitle = styled.h2`
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2.5rem;
    color: ${(props) => props.theme.baseDark};
`;

const CardContainer = styled.div`
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
    height: 100%; /* Ensure uniform height */
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
`;

const CardTitle = styled.h3`
    margin-bottom: 10px;
    color: ${({ theme }) => theme.accentPrimary};
`;

const CardContent = styled.p`
    line-height: 1.6;
`;

const CardIcon = styled.span`
    font-size: 2rem;
    margin-right: 10px;
    vertical-align: middle;
`;

// Define your services
const services = [
    {
        title: "Site standard",
        content: (
            <CardContainer>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <CardIcon>🌐</CardIcon>
                    <CardTitle>Site standard</CardTitle>
                </div>
                <CardContent>
                    Parfait pour présenter votre entreprise, trouver de nouveaux clients et regrouper vos informations en un endroit accessible à tous.<br />
                    Prix: 500.-
                </CardContent>
            </CardContainer>
        ),
    },
    {
        title: "Développement sur mesure",
        content: (
            <CardContainer>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <CardIcon>🛠️</CardIcon>
                    <CardTitle>Développement sur mesure</CardTitle>
                </div>
                <CardContent>
                    Qu'il s'agisse d'un site plus complexe ou une application web de collaboration en temps réel, tout est possible pour nos clients. La gestion de données complexes implique une sécurité et stabilité accrue. Vos données sont en sécurité avec Neuchatech. Intégration avec vos outils métier afin d'élargir vos horizons tout en gardant votre workflow actuel.<br />
                    Prix: Contactez-nous
                </CardContent>
            </CardContainer>
        ),
    },
    {
        title: "Assistant IA managé",
        content: (
            <CardContainer>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <CardIcon>🤖</CardIcon>
                    <CardTitle>Assistant IA managé</CardTitle>
                </div>
                <CardContent>
                    Nous mettons à votre disposition un assistant d'intelligence artificielle basé sur vos besoin afin de répondre à toute question, qu'il s'agisse d'un utilisation en interne ou pour répondre aux questions de vos clients. L'assistant a à disposition les connaissances nécessaires de votre entreprise et de vos produits. Pour une utilisation plus complexe reposant sur plus d'une page de données, nous proposons un système de {"\u00AB"} fine-tune {"\u00BB"} de l'assistant afin de lui offrir des connaissances sur l'ensemble de vos données.<br />
                    Prix: Assistant simple: 200.- + frais d'utilisation* <br />
                    Assistant fine-tuned: à partir de 1000.- <br />
                    *basé sur les frais de l'API OpenAI : <a href="https://openai.com/api/pricing/" target="_blank" rel="noopener noreferrer">https://openai.com/api/pricing/</a>
                </CardContent>
            </CardContainer>
        ),
    },
    {
        title: "Hébergement web",
        content: (
            <CardContainer>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <CardIcon>☁️</CardIcon>
                    <CardTitle>Hébergement web</CardTitle>
                </div>
                <CardContent>
                    Hébergement sur un serveur suisse <br />
                    Sécurité accrue <br />
                    Prévention contre la perte de données <br />
                    Possibilité d'hébergement dans le monde entier <br />
                    Prix: 100.- par année* <br />
                    *Un nom de domaine dédié ou un hébergement mondial requièrent des frais supplémentaires
                </CardContent>
            </CardContainer>
        ),
    },
];

const Services: React.FC = () => {
    return (
        <Section>
            <SectionTitle>Nos Services</SectionTitle>
            <TabCarousel
                tabs={services}
                interval={7000}
                swiperEffect="slide" // Change to 'fade' or 'cards' as desired
            />
        </Section>
    );
};

export default Services;
