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
import ImportanceWeb from "@/components/sections/importanceWeb";

const ScrollContainer = styled.div`
    width: 100%;
    height: 100%;
`;

// Wrapper pour centrer l'offre spéciale
const OfferWrapper = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 0 1.5rem;
    
    @media (min-width: 1024px) {
        padding: 0 8%;
    }
`;

export default function Home() {

    return (
        <>
            <Hero />
            <Services />
            <Valeurs />
            <ImportanceWeb />
            <Processus />
            <OfferWrapper>
                <SpecialOffer
                    title="Offre Spéciale Site Web Standard"
                    description="Profitez de notre offre de lancement et obtenez votre site web professionnel"
                    price="500 CHF"
                />
            </OfferWrapper>
            <ContactForm />
        </>
    );
}
