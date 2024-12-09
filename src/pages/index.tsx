import React from "react";
import styled from "styled-components";
import Head from "next/head";

import Hero from "@/components/sections/hero";
import Valeurs from "@/components/sections/valeurs";
import Services from "@/components/sections/services";
import Processus from "@/components/sections/processus";
import Numerique from "@/components/sections/numerique";
import ContactForm from "@/components/sections/contactForm";
import SpecialOffer from "@/components/library/specialOffer";
import { withTranslation } from "@/utils/withTranslation";

const SectionWrapper = styled.div<{ isFirst?: boolean }>`
    margin-top: ${props => props.isFirst ? props.theme.spacing.xxlarge : props.theme.spacing.large};
    
    @media (min-width: 1024px) {
        margin-top: ${props => props.isFirst ? props.theme.spacing.xxlarge : props.theme.spacing.xlarge};
    }
`;

// Wrapper pour centrer l'offre spéciale
const OfferWrapper = styled.div`
    max-width: 800px;
    margin: ${({theme}) => theme.spacing.large} auto 0;
    padding: 0 1.5rem;
    
    @media (min-width: 1024px) {
        margin-top: ${({theme}) => theme.spacing.xlarge};
        padding: 0 8%;
    }
`;

export default function Home() {
    return (
        <>
            <Hero />
            <SectionWrapper isFirst>
                <Services />
            </SectionWrapper>
            <SectionWrapper>
                <Valeurs />
            </SectionWrapper>
            <SectionWrapper>
                <Numerique />
            </SectionWrapper>
            <SectionWrapper>
                <Processus />
            </SectionWrapper>
            <OfferWrapper>
                <SpecialOffer
                    title="Offre Spéciale Site Web Standard"
                    description="Profitez de notre offre de lancement et obtenez votre site web professionnel"
                    price="500 CHF"
                />
            </OfferWrapper>
            <SectionWrapper>
                <ContactForm />
            </SectionWrapper>
        </>
    );
}

export const getStaticProps = withTranslation();