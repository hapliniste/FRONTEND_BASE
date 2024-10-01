import React from 'react';
import styled from 'styled-components';

// Styles for the entire page
const PageWrapper = styled.div`
  width: 100%;
  margin: 0;
  padding: 0;
  height: 100vh;
  overflow-y: auto;
  scroll-behavior: smooth;
`;

// Hero Section
const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 4rem;
  background-color: ${(props) => props.theme.secondaryColor};
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  color: ${(props) => props.theme.primaryColor};
`;

const HeroDescription = styled.p`
  font-size: 1.25rem;
  color: ${(props) => props.theme.textColor};
  margin-top: 1rem;
`;

const CTAButton = styled.button`
  margin-top: 2rem;
  padding: 1rem 2rem;
  font-size: 1.25rem;
  background-color: ${(props) => props.theme.primaryColor};
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.primaryDark};
  }
`;

// Services Section
const ServicesSection = styled.section`
  padding: 4rem;
  background-color: ${(props) => props.theme.baseLight};
  text-align: center;
`;

const ServicesTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;
`;

const ServiceCard = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const ServiceIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const ServiceTitle = styled.h3`
  font-size: 1.5rem;
`;

const ServiceDescription = styled.p`
  font-size: 1rem;
`;

// Process Section
const ProcessSection = styled.section`
  padding: 4rem;
  background-color: ${(props) => props.theme.baseMedium};
  text-align: center;
`;

const ProcessTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const ProcessSteps = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Step = styled.div`
  width: 30%;
  margin-bottom: 2rem;
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const StepTitle = styled.h3`
  font-size: 1.25rem;
`;

const StepDescription = styled.p`
  font-size: 1rem;
`;

// Portfolio Section
const PortfolioSection = styled.section`
  padding: 4rem;
  background-color: ${(props) => props.theme.backgroundColor};
  text-align: center;
`;

const PortfolioTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const PortfolioGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;
`;

const PortfolioItem = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

// Testimonials Section
const TestimonialsSection = styled.section`
  padding: 4rem;
  background-color: ${(props) => props.theme.baseLight};
  text-align: center;
`;

const TestimonialsTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 2rem;
`;

const TestimonialCard = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const TestimonialText = styled.p`
  font-size: 1rem;
  font-style: italic;
`;

const TestimonialAuthor = styled.p`
  font-size: 1rem;
  font-weight: bold;
  margin-top: 1rem;
`;

// Values Section
const ValuesSection = styled.section`
  padding: 4rem;
  background-color: ${(props) => props.theme.baseMedium};
  text-align: center;
`;

const ValuesTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;
`;

const ValueCard = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const ValueTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1rem;
`;

const ValueDescription = styled.p`
  font-size: 1rem;
`;

// Contact Section
const ContactSection = styled.section`
  padding: 4rem;
  background-color: ${(props) => props.theme.primaryColor};
  text-align: center;
  color: white;
`;

const ContactTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  padding: 1rem;
  margin-bottom: 1rem;
  width: 100%;
  max-width: 600px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
`;

const Textarea = styled.textarea`
  padding: 1rem;
  margin-bottom: 1rem;
  width: 100%;
  max-width: 600px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
`;

const SubmitButton = styled.button`
  padding: 1rem 2rem;
  background-color: white;
  color: ${(props) => props.theme.primaryColor};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.25rem;
`;

// Main component
const WebPage: React.FC = () => {
  return (
    <PageWrapper>
      <div>
        {/* Hero Section */}
        <HeroSection>
          <HeroTitle>Ensemble, donnons vie à vos projets numériques</HeroTitle>
          <HeroDescription>
            Votre partenaire suisse pour une transition numérique réussie. Avec des solutions web modernes et performantes, nous œuvrons à vos côtés pour faire de chaque projet un pilier de votre succès.
          </HeroDescription>
          <CTAButton>Get Started</CTAButton>
        </HeroSection>

        {/* Services Section */}
        <ServicesSection>
          <ServicesTitle>Nos Services</ServicesTitle>
          <ServicesGrid>
            <ServiceCard>
              <ServiceIcon>🌐</ServiceIcon>
              <ServiceTitle>Site web & e-commerce</ServiceTitle>
              <ServiceDescription>
                Création de sites web modernes et performants, avec ou sans système e-commerce intégré.
              </ServiceDescription>
            </ServiceCard>
            <ServiceCard>
              <ServiceIcon>🔒</ServiceIcon>
              <ServiceTitle>Web Security</ServiceTitle>
              <ServiceDescription>
                Sécurisez votre site web et protégez vos données sensibles avec nos solutions avancées de sécurité.
              </ServiceDescription>
            </ServiceCard>
            <ServiceCard>
              <ServiceIcon>⚡</ServiceIcon>
              <ServiceTitle>Performance Optimization</ServiceTitle>
              <ServiceDescription>
                Optimisation de la performance pour garantir des temps de chargement rapides et une navigation fluide.
              </ServiceDescription>
            </ServiceCard>
          </ServicesGrid>
        </ServicesSection>

        {/* Process Section */}
        <ProcessSection>
          <ProcessTitle>Notre Processus</ProcessTitle>
          <ProcessSteps>
            <Step>
              <StepTitle>1. Contact Initial</StepTitle>
              <StepDescription>Entretien gratuit pour discuter de vos besoins.</StepDescription>
            </Step>
            <Step>
              <StepTitle>2. Prototypage</StepTitle>
              <StepDescription>Visualisez votre produit final avec plusieurs prototypes.</StepDescription>
            </Step>
            <Step>
              <StepTitle>3. Développement</StepTitle>
              <StepDescription>Nous construisons votre solution avec les dernières technologies.</StepDescription>
            </Step>
          </ProcessSteps>
        </ProcessSection>

        {/* Portfolio Section */}
        <PortfolioSection>
          <PortfolioTitle>Portfolio</PortfolioTitle>
          <PortfolioGrid>
            <PortfolioItem>Project 1</PortfolioItem>
            <PortfolioItem>Project 2</PortfolioItem>
            <PortfolioItem>Project 3</PortfolioItem>
          </PortfolioGrid>
        </PortfolioSection>

        {/* Testimonials Section */}
        <TestimonialsSection>
          <TestimonialsTitle>Témoignages</TestimonialsTitle>
          <TestimonialsGrid>
            <TestimonialCard>
              <TestimonialText>“Neuchatech a transformé notre présence en ligne, nous avons vu un boost significatif dans notre visibilité.”</TestimonialText>
              <TestimonialAuthor>— Client Satisfait</TestimonialAuthor>
            </TestimonialCard>
            <TestimonialCard>
              <TestimonialText>“Une équipe réactive et professionnelle qui a su répondre à nos attentes. Merci !”</TestimonialText>
              <TestimonialAuthor>— PME en Suisse</TestimonialAuthor>
            </TestimonialCard>
          </TestimonialsGrid>
        </TestimonialsSection>

        {/* Values Section */}
        <ValuesSection>
          <ValuesTitle>Nos Valeurs</ValuesTitle>
          <ValuesGrid>
            <ValueCard>
              <ValueTitle>Relation de Confiance</ValueTitle>
              <ValueDescription>Nous bâtissons des relations solides basées sur la transparence et la sécurité des données.</ValueDescription>
            </ValueCard>
            <ValueCard>
              <ValueTitle>Technologies Modernes</ValueTitle>
              <ValueDescription>Nous utilisons les meilleures technologies pour assurer la pérennité de vos projets.</ValueDescription>
            </ValueCard>
            <ValueCard>
              <ValueTitle>Prix Attractifs</ValueTitle>
              <ValueDescription>Des solutions abordables sans compromis sur la qualité.</ValueDescription>
            </ValueCard>
          </ValuesGrid>
        </ValuesSection>

        {/* Contact Section */}
        <ContactSection>
          <ContactTitle>Contactez-nous</ContactTitle>
          <ContactForm>
            <Input type="text" placeholder="Votre nom" />
            <Input type="email" placeholder="Votre email" />
            <Textarea placeholder="Votre message" rows={5}></Textarea>
            <SubmitButton>Envoyer</SubmitButton>
          </ContactForm>
        </ContactSection>
      </div>
    </PageWrapper>
  );
};

export default WebPage;
