import React from "react";
import styled from "styled-components";

/*
La section "Processus" liste les étapes de la création d'un site web.
Elle doit être simple et claire.

Cette section sera présentée sous forme de bulles/cartes reliées entre elles par une ligne.

  - "1. **Contact initial :** Nous vous offrons un entretien gratuit pour discuter de votre projet et de vos besoins."
  - "2. **Prototypage :** Nous vous proposons plusieurs prototypes pour vous aider à visualiser le produit final."
  - "3. **Développement :** Nous construisons votre solution en utilisant les dernières technologies."
  - "4. **Phase de Test :** Nous vous offrons un accès à une version de test pour vous permettre de nous faire part de vos commentaires."
  - "5. **Lancement :** Votre vision devient réalité et est prête à conquérir le marché."
  - "6. **Évolution et Support :** Notre équipe reste à vos côtés pour le support post-lancement et pour assurer l'évolution continue de votre solution."

*/

const Section = styled.div`
    background: ${(props) => props.theme.backgroundColor};
    height: 100vh;
    text-transform: uppercase;

    //scroll-snap-align: start;
    //scroll-margin-top: ${({ theme }) => theme.appBarHeight};
`;

const TextWrapper = styled.div`
    width: "60%";
    padding: ${(props) => props.theme.spacing};
`;

const Temoignages: React.FC = () => {
    return (
        <Section>
            <TextWrapper>
            Processus
            </TextWrapper>
        </Section>
    );
};
export default Temoignages;
