import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import VisualElements from './VisualElements';

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

// Layout Components
const Section = styled.section`
  position: relative;
  width: 100%;
  height: 50vh;
  background-color: ${(props) => props.theme.colors.backgrounds.default};
  overflow: hidden;
  
  @media (max-width: 768px) {
    height: auto;
  }
`;

const InnerSection = styled.div`
  overflow: hidden;
  position: relative;
  padding: ${props => `${props.theme.spacing.section.paddingY.mobile} ${props.theme.spacing.section.paddingX.mobile}`};
  height: 100%;
  display: flex;
  align-items: center;
  
  @media (min-width: 1024px) {
    padding: ${props => `${props.theme.spacing.section.paddingY.desktop} ${props.theme.spacing.section.paddingX.desktop}`};
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: ${props => props.theme.sizes.maxWidth};
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const ContentArea = styled.div`
  width: 100%;
  max-width: 600px;
  text-align: left;
  position: relative;
  padding: ${props => props.theme.spacing.large};
  border-radius: ${props => props.theme.borders.radius};
  background: ${props => props.theme.colors.backgrounds.default};
  box-shadow: 0 0 100px 100px ${props => props.theme.colors.backgrounds.default};
  
  @media (max-width: 768px) {
    text-align: center;
    margin: 0 auto;
    box-shadow: none;
  }
`;

// Typography Components
const Title = styled.h1`
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 3.5rem;
  font-weight: 700;
  margin: 0;
  line-height: 1.2;
  white-space: nowrap;

  .gradient {
    background: ${(props) => props.theme.colors.accent.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
    white-space: normal;
  }
`;

const SubTitle = styled.h2`
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 1.5rem;
  font-weight: 400;
  margin-top: 1rem;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const Description = styled.p`
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: 1.125rem;
  margin-top: 1.5rem;
  max-width: 80%;

  @media (max-width: 768px) {
    max-width: 100%;
    font-size: 1rem;
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
  margin-top: 2rem;
  padding: 1rem 2.5rem;
  background-color: ${(props) => props.theme.colors.accent.primary};
  color: ${(props) => props.theme.colors.basic.white};
  border: none;
  border-radius: 99rem;
  font-weight: 600;
  font-size: 1.4rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.accent.light};
  }
`;

const Hero: React.FC = () => {
  const contactRef = useRef<HTMLElement | null>(null);

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

  return (
    <Section>
      <InnerSection>
        <ContentWrapper>
          <ContentArea>
            <motion.div
              initial="hidden"
              animate="visible"
              custom={0}
              variants={titleVariants}
            >
              <Title className={titleFont.className}>
                <LogoTitle src="/neuchatech_logo.webp" alt="Neuchatech" />
                donne vie à vos
                <br />
                <span className="gradient">projets numériques</span>
              </Title>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              custom={1}
              variants={titleVariants}
            >
              <SubTitle className={montserrat.className}>
                Votre partenaire suisse pour une transition numérique réussie
              </SubTitle>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              custom={2}
              variants={titleVariants}
            >
              <Description className={DMSansFont.className}>
                Des solutions web modernes et performantes pour faire de chaque
                projet un pilier de votre succès.
              </Description>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              custom={3}
              variants={titleVariants}
            >
              <CTAButton 
                onClick={scrollToContact}
                className={montserrat.className}
              >
                Obtenez un devis gratuit
              </CTAButton>
            </motion.div>
          </ContentArea>
        </ContentWrapper>
      </InnerSection>
      <VisualElements />
    </Section>
  );
};

export default Hero;
