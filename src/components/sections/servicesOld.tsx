import React from "react";
import styled from "styled-components";

import Card, {ICardProps} from "../library/card";

/*
Section "Services" qui liste les services proposés par Neuchatech.

Ce sera des cartes qui seront affichées verticalement sur mobile et 2 par 2 sur desktop (avec un effet escalier, genre coteries).


- **Services :**
    - **Site vitrine :** Développement, design et mise en place d'un site standard : ~~1000~~ 500.-
    - **Site e-commerce :** Développement, design et mise en place d'un site e-commerce : ~~2000~~ 1000.-
    - **Développement sur mesure (application web) :** En fonction des projects. Généralement 3000-10'000.-
    - **Marketing digital :** SEO avancée, campagnes publicitaires. Généralement 500-2000.-
    - **Hébergement web :** Serveurs suisses, 99.9% uptime, 24/7 support. 10.-/mois , serveur dédié 50.-/mois
    - **Consulting IA :** Conseils et accompagnement, développement de workflows, automatisation de processus. 100.-/h



Les services mis en avant sont:
- Site vitrine : à partir de ~1000~ 500.- 
- Site e-commerce : à partir de ~2000~ 1000.-
- Développement sur mesure : à partir de 3000.-
- Développement IA (ChatGPT ou interne) : à partir de 1000.-
- Marketing digital : à partir de 500.-
- Hébergement web : 10.- par mois
(pas sur de mettre) - Consulting IA et automation : 100.- par heure

Il serait bon de revoir la page recherches.md afin de refaire les tarifs.
Une recherche sur les tarifs IA serait bien.


*/

const Section = styled.div`
    background: ${(props) => props.theme.backgroundColor};
    height: 100%;
`;

const TextWrapper = styled.div`
    width: "60%";
    padding: ${(props) => props.theme.spacing};
`;

const cardContent: ICardProps[] = [
    {
        title: "Site standard",
        content: [
            "Parfait pour présenter votre entreprise, trouver de nouveaux clients et regrouper vos informations en un endroit accessible à tous.",
            "prix: 500.-"
        ]
    },
    {
        title: "Développement sur mesure",
        content: [
            "Qu'il s'agisse d'un site plus complexe ou une application web de collaboration en temps réel, tout est possible pour nos clients. La gestion de données complexes implique une sécurité et stabilité accrue. Vos données sont en sécurité avec Nextech. Intégration avec vos outils métier afin d'élargir vos horizons tout en gardant votre workflow actuel.",
            "prix: Contactez-nous"
        ]
    },
    {
        title: "Assistant IA managé",
        content: [
            "Nous mettons à votre disposition un assistant d'intelligence artificielle basé sur vos besoin afin de répondre à toute question, qu'il s'agisse d'un utilisation en interne ou pour répondre aux questions de vos clients. L'assistant a a disposition les connaissances nécessaires de votre entreprise et de vos produits. Pour une utilisation plus complexe reposant sur plus d'une page de données, nous proposons un système de \"fine-tune\" de l'assistant afin de lui offrir des connaissances sur l'ensemble de vos données.",
            "prix: Assistant simple: 200.- + frais d'utilisation* Assistant fine-tune: à partie de 1000.- *basé sur les frais de l'API OpenAI : https://openai.com/api/pricing/"
        ]
    },
    {
        title: "Hébergement web",
        content: [
            "Hébergement sur un serveur suisse",
            "Sécurité accrue",
            "Prévention contre la perte de données",
            "Possibilité d'hébergement dans le monde entier",
            "prix: 100.- par année*",
            "*Un nom de domaine dédié ou un hébergement mondial requièrent des frais supplémentaires"
        ]
    }
];


const Prix: React.FC = () => {
    return (
        <Section>
            {
                cardContent.map(cc => {
                    return (
                        <Card key={cc.title} {...cc} />
                    )
                })
            }
        </Section>
    );
};
export default Prix;
