import React, { useRef } from "react";
import styled from "styled-components";
import Head from "next/head";


import Hero from "@/components/sections/hero";
import Valeurs from "@/components/sections/valeurs";
import Services from "@/components/sections/services";
import Processus from "@/components/sections/processus";
import Numerique from "@/components/sections/numerique";
import ContactForm from "@/components/sections/contactForm";

import ScrollSection from "@/components/sections/scrollSection";
/*
import { Inter } from '@next/font/google'
const inter = Inter({ subsets: ['latin'] })
*/

const ScrollContainer = styled.div`
    width: 100%;
    height: 100%;//(100vh - ${({ theme }) => theme.appBarHeight});

    //background-color: red;

    //scroll-snap-type: y mandatory;
    //overflow-y: scroll;

    /*scrollbar-width: none; // Firefox 
    -ms-overflow-style: none; // Internet Explorer 10+ 
    ::-webkit-scrollbar {
        width: 0; // Remove scrollbar space 
        background: transparent;  // Optional: just make scrollbar invisible 
    }*/
`;

export default function Home() {
    const scrollContainerRef: React.Ref<HTMLDivElement> = useRef<HTMLDivElement>(null);

    return (
        <ScrollContainer ref={scrollContainerRef}>
            <ScrollSection>
                <Hero />
            </ScrollSection>

            <ScrollSection>
                <Valeurs />
            </ScrollSection>

            <ScrollSection>
                <Services />
            </ScrollSection>

            <ScrollSection>
                <Processus />
            </ScrollSection>

            <ScrollSection>
                <Numerique />
            </ScrollSection>

            {/*<ScrollSection>
                <Temoignages />
              </ScrollSection>*/}

            <ScrollSection>
                <ContactForm />
            </ScrollSection>
        </ScrollContainer>
    );
}
