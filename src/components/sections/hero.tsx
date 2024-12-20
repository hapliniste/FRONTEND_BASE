import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { NextSeo } from 'next-seo';

import { Outfit } from 'next/font/google';
const titleFont = Outfit({
  subsets: ['latin'],
  weight: ['700'],
});

import { Montserrat } from 'next/font/google';
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700']
});

import { DM_Sans } from '@next/font/google';
const DMSansFont = DM_Sans({ subsets: ['latin'], weight: ['400'] });

import Temoignages from './temoignages';
import Float3DCard from '../library/Float3DCard';
import SimpleCard from '../cards/SimpleCard';
import Float3DButton from '../library/Float3DButton';
import HeroCanvas from './HeroCanvas';

// Layout Components
const Section = styled.section<{ isHalfSize?: boolean }>`
  position: relative;
  width: 100%;
  height: ${props => props.isHalfSize ? '60vh' : '70vh'};
  background-color: ${(props) => props.theme.colors.backgrounds.default};
  overflow: hidden;
  //padding-top: ${props => props.theme.spacing.xlarge};
  
  @media (max-width: 768px) {
    height: auto;
    padding-top: ${props => props.theme.spacing.xlarge};
  }
`;

const InnerSection = styled.div`
  overflow: hidden;
  position: relative;
  padding: ${props => `${props.theme.spacing.section.paddingY.mobile} ${props.theme.spacing.section.paddingX.mobile}`};
  height: 100%;
  display: flex;
  align-items: center;
  
  @media (min-width: 105rem) {
    padding: ${props => `${props.theme.spacing.section.paddingY.desktop} ${props.theme.spacing.section.paddingX.desktop}`};
    background-color: #504540;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  //max-width: ${props => props.theme.sizes.maxWidth};
  margin: 0 auto;
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xlarge};

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const CardContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  
  .canvas-container {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    //width: 60%;
    height: 100%;
    //left: 30%;

    //background-color: #504540;
    
    @media (max-width: 105rem) {
      display: none;
    }
  }
`;

const ContentArea = styled.div`
  width: 100%;
  max-width: 800px;
  margin-left: 8%;
  text-align: left;
  position: relative;
  padding: ${props => props.theme.spacing.large};
  border-radius: ${props => props.theme.borders.radius};
  background: ${props => props.theme.colors.backgrounds.default};
  box-shadow: 0 0 50px 50px ${props => props.theme.colors.backgrounds.default};
  z-index: 2;
  
  @media (max-width: 768px) {
    text-align: center;
    margin: 0 auto;
    box-shadow: none;
    padding: 0;
    width: 100%;
  }
`;

// Typography Components
const Title = styled.h1`
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 5rem;
  font-weight: 700;
  margin: 0;
  line-height: 1.1;
  //white-space: nowrap;

  .gradient {
    background: ${(props) => props.theme.colors.accent.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    //white-space: nowrap;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
    white-space: normal;
  }
`;

const SubTitle = styled.h2`
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 2rem;
  font-weight: 400;
  margin-top: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const Description = styled.p`
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: 1.25rem;
  margin-top: 2rem;
  max-width: 90%;
  line-height: 1.4;

  @media (max-width: 768px) {
    max-width: 100%;
    font-size: 0.9rem;
  }
`;

// UI Elements
const LogoTitle = styled.img`
  height: 1em;
  margin-right: 0.5rem;
  vertical-align: baseline;
  position: relative;
  top: 0.15em;
`;

const CTAButton = styled.button`
  display: inline-block;
  padding: 1.25rem 3rem;
  background-color: ${(props) => props.theme.colors.accent.primary};
  color: ${(props) => props.theme.colors.basic.white};
  border: none;
  border-radius: 99rem;
  font-weight: 600;
  font-size: 1.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0;

  &:hover {
    background-color: ${(props) => props.theme.colors.accent.light};
  }

  @media (max-width: 768px) {
    font-size: 1.4rem;
    padding: 1rem 2.5rem;
  }
`;

const CTAContainer = styled.div`
  margin-top: 3rem;
  
  @media (max-width: 768px) {
    margin-top: 2rem;
  }
`;

const BackgroundLayer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
`;

const ContentLayer = styled.div<{ isHalfSize?: boolean }>`
    position: relative;
    z-index: 2;
    height: 100%;
    //width: ${props => props.isHalfSize ? '50%' : '100%'};
`;

const Hero: React.FC = () => {
  const contactRef = useRef<HTMLElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mobileQuery = window.matchMedia('(max-width: 768px)');
      const tabletQuery = window.matchMedia('(min-width: 769px) and (max-width: 1024px)');
      
      // Set initial values
      setIsMobile(mobileQuery.matches);
      setIsTablet(tabletQuery.matches);

      // Add listeners
      const mobileHandler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
      const tabletHandler = (e: MediaQueryListEvent) => setIsTablet(e.matches);
      
      mobileQuery.addEventListener('change', mobileHandler);
      tabletQuery.addEventListener('change', tabletHandler);

      return () => {
        mobileQuery.removeEventListener('change', mobileHandler);
        tabletQuery.removeEventListener('change', tabletHandler);
      };
    }
  }, []);

  useEffect(() => {
    contactRef.current = document.getElementById('contact');
  }, []);

  const scrollToContact = () => {
    if (contactRef.current) {
      contactRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.2 },
    }),
  };

  const heroSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Neuchatech",
    "url": "https://neuchatech.ch",
    "description": "Solutions web professionnelles à Neuchâtel",
    "potentialAction": {
      "@type": "ContactAction",
      "target": "https://neuchatech.ch/#contact"
    }
  };

  /*
  We should use a single canva for the hero and put all the content in it.
  As we can render components with Drei, we should be able to use an orthographic camera and render it like a normal react component.
  This would allow us more flexibility and make the placement of the 3D components easier.
  */

  return (
    <>
      <NextSeo
        title="Accueil"
        description="Solutions web professionnelles à Neuchâtel. Développement de sites web, applications et assistants IA pour votre entreprise."
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(heroSchema) }}
      />
      <HeroCanvas />
    </>
  );
};

export default Hero;
