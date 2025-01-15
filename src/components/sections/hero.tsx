import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Outfit } from 'next/font/google';
import { Montserrat } from 'next/font/google';
import { DM_Sans } from 'next/font/google';

const titleFont = Outfit({
  subsets: ['latin'],
  weight: ['700'],
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700']
});

const DMSansFont = DM_Sans({ 
  subsets: ['latin'], 
  weight: ['400'] 
});

const Section = styled.section`
  position: relative;
  width: 100%;
  height: 70vh;
  min-height: 600px;
  background-color: ${(props) => props.theme.colors.backgrounds.default};
  overflow: hidden;
  
  @media (max-width: 768px) {
    height: auto;
    min-height: 500px;
    padding-top: ${props => props.theme.spacing.xlarge};
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  max-width: ${props => props.theme.sizes.maxWidth};
  margin: 0 auto;
  padding: ${props => `${props.theme.spacing.section.paddingY.mobile} ${props.theme.spacing.section.paddingX.mobile}`};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  z-index: 2;

  @media (max-width: 1024px) {
    justify-content: center;
    text-align: center;
    padding: ${props => props.theme.spacing.medium} 0;
  }
`;

const ContentArea = styled(motion.div)`
  flex: 0 1 800px;
  display: grid;
  gap: 2rem;
  margin-left: 8%;

  @media (max-width: 1024px) {
    flex: none;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
  }
`;

const Title = styled(motion.h1)`
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 5rem;
  font-weight: 700;
  margin: 0;
  line-height: 1.2;
  font-family: ${titleFont.style.fontFamily};
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 0em;
  align-items: flex-start;

  img {
    height: 1em;
    width: auto !important;
    vertical-align: baseline;
    position: relative;
    display: block;
    object-fit: contain;
  }

  .line {
    display: block;
    line-height: inherit;
  }

  .gradient {
    background: ${(props) => props.theme.colors.accent.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: block;
    line-height: inherit;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
    text-align: center;
    white-space: normal;
    align-items: center;
  }
`;

const SubTitle = styled(motion.h2)`
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 2rem;
  font-weight: 400;
  margin: 0;
  font-family: ${montserrat.style.fontFamily};

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const Description = styled(motion.p)`
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: 1.25rem;
  line-height: 1.4;
  margin: 0;
  max-width: 90%;
  font-family: ${DMSansFont.style.fontFamily};

  @media (max-width: 768px) {
    max-width: 100%;
    font-size: 0.9rem;
  }
`;

const CTAButton = styled(motion.button)`
  display: inline-block;
  padding: 1.25rem 3rem;
  background-color: ${(props) => props.theme.colors.accent.primary};
  color: ${(props) => props.theme.colors.basic.white};
  border: none;
  border-radius: 99rem;
  font-weight: 600;
  font-size: 1.8rem;
  cursor: pointer;
  font-family: ${montserrat.style.fontFamily};
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.accent.light};
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    font-size: 1.4rem;
    padding: 1rem 2.5rem;
    margin: 0 auto;
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Neuchatech",
            "url": "https://neuchatech.ch",
            "description": "Solutions web professionnelles à Neuchâtel",
            "potentialAction": {
              "@type": "ContactAction",
              "target": "https://neuchatech.ch/#contact"
            }
          })
        }}
      />
      <Section>
        <ContentWrapper>
          <ContentArea
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Title variants={itemVariants}>
              <Image 
                src="/neuchatech_logo.webp"
                alt="Neuchatech"
                width={200}
                height={50}
                style={{ height: '1em', width: 'auto' }}
                priority
              />
              <span className="line">donne vie à vos</span>
              <span className="gradient">projets numériques</span>
            </Title>
            <SubTitle variants={itemVariants}>
              Votre partenaire suisse pour une transition numérique réussie
            </SubTitle>
            <Description variants={itemVariants}>
              Des solutions web modernes et performantes pour faire de chaque
              projet un pilier de votre succès.
            </Description>
            <CTAButton
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToContact}
            >
              Obtenez un devis gratuit
            </CTAButton>
          </ContentArea>
        </ContentWrapper>
      </Section>
    </>
  );
};

export default Hero;
