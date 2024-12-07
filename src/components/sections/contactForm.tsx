import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Image from "next/image";
import { montserrat } from '@/styles/theme';
import { NextSeo } from 'next-seo';
import { trackFormSubmission } from '@/utils/analytics';

// Layout Components
const Section = styled.section`
  overflow: hidden;
  position: relative;
  padding: ${props => `${props.theme.spacing.section.paddingY.mobile} ${props.theme.spacing.section.paddingX.mobile}`};
  padding-bottom: ${props => props.theme.spacing.large};
  
  @media (max-width: 768px) {
    padding: 0;
  }
  
  @media (min-width: 1024px) {
    padding: ${props => `${props.theme.spacing.section.paddingY.desktop} ${props.theme.spacing.section.paddingX.desktop}`};
    padding-bottom: ${props => props.theme.spacing.large};
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: ${props => props.theme.sizes.maxWidth};
  margin: 0 auto;
`;

const FormContainer = styled.div`
  background: ${props => props.theme.colors.backgrounds.white};
  overflow: hidden;
  
  @media (min-width: 769px) {
    border-radius: ${props => props.theme.borders.radius};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
    border: 1px solid rgba(0, 0, 0, 0.03);
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.xlarge};
  padding: ${props => props.theme.spacing.large};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: ${props => props.theme.spacing.medium};
    gap: ${props => props.theme.spacing.medium};
  }
`;

// Typography Components
const Title = styled.h2`
  color: ${props => props.theme.colors.text.primary};
  font-size: 2.75rem;
  font-weight: 700;
  margin-bottom: ${props => props.theme.spacing.medium};
  letter-spacing: -0.03em;
  font-family: ${props => props.theme.typography.fontFamily};

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  font-size: 1.2rem;
  margin-bottom: ${props => props.theme.spacing.large};
  font-family: ${props => props.theme.typography.fontFamily};
`;

// Form Components
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.medium};
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${props => props.theme.spacing.medium};
`;

const Label = styled.label<{ optional?: boolean }>`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: ${props => props.theme.spacing.xsmall};
  margin-left: ${props => props.theme.spacing.medium};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xsmall};
  font-family: ${props => props.theme.typography.fontFamily};

  ${props => props.optional && `
    &::after {
      content: '(optionnel)';
      font-size: 0.8rem;
      font-weight: 400;
      color: ${props.theme.colors.text.secondary};
      margin-left: ${props.theme.spacing.xsmall};
    }
  `}
`;

const Input = styled.input`
  padding: ${props => `${props.theme.spacing.medium} ${props.theme.spacing.large}`};
  border: 2px solid ${props => props.theme.colors.borders.color};
  border-radius: 999px;
  font-size: 1rem;
  width: 100%;
  transition: all 0.3s ease;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: ${props => `${props.theme.spacing.medium} ${props.theme.spacing.medium}`};
  }

  &:focus {
    border-color: ${props => props.theme.colors.accent.primary};
    outline: none;
    box-shadow: 0 0 0 3px ${props => `${props.theme.colors.accent.primary}15`};
  }
`;

const TextArea = styled.textarea`
  padding: ${props => props.theme.spacing.medium};
  border: 2px solid ${props => props.theme.colors.borders.color};
  border-radius: ${props => props.theme.borders.radius};
  font-size: 1rem;
  min-height: 150px;
  width: 100%;
  transition: all 0.3s ease;
  box-sizing: border-box;

  &:focus {
    border-color: ${props => props.theme.colors.accent.primary};
    outline: none;
    box-shadow: 0 0 0 3px ${props => `${props.theme.colors.accent.primary}15`};
  }
`;

// Service Selection Components
const ServiceOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${props => props.theme.spacing.small};
  margin: ${props => props.theme.spacing.medium} 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled.label<{ selected?: boolean }>`
  display: flex;
  flex-direction: column;
  padding: ${props => props.theme.spacing.medium};
  background: ${props => props.theme.colors.backgrounds.white};
  border-radius: ${props => props.theme.borders.radius};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
  border: 2px solid ${props => props.selected ? 
    props.theme.colors.accent.primary : 
    'rgba(0, 0, 0, 0.03)'
  };
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    border-color: ${props => props.theme.colors.accent.primary};
  }
`;

const ServiceTitle = styled.span`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: ${props => props.theme.spacing.small};
`;

const ServiceDescription = styled.span`
  font-size: 1rem;
  color: ${props => props.theme.colors.text.secondary};
  line-height: 1.5;
`;

// Contact Info Components
const ContactInfo = styled.div`
  background: ${props => `${props.theme.colors.accent.primary}08`};
  padding: ${props => props.theme.spacing.large};
  border-radius: ${props => props.theme.borders.radius};
  margin-bottom: ${props => props.theme.spacing.large};
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.medium};
  margin-bottom: ${props => props.theme.spacing.medium};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ContactIcon = styled.span`
  font-size: 1.5rem;
  width: 2rem;
  display: flex;
  justify-content: center;
`;

const ContactText = styled.span`
  color: ${props => props.theme.colors.text.primary};
  flex: 1;
  justify-content: left;
  text-align: left;
`;

const RevealButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.accent.primary};
  font-size: 1rem;
  padding: 0;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.small};
  margin: 0 auto;

  &:hover {
    color: ${props => props.theme.colors.accent.light};
    text-decoration: underline;
  }

  &:disabled {
    opacity: 0.7;
    cursor: wait;
  }
`;

const ContactDetails = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.medium};
`;

// Button Components
const SubmitButton = styled.button`
  padding: ${props => `${props.theme.spacing.medium} ${props.theme.spacing.large}`};
  background: ${props => props.theme.colors.accent.primary};
  color: ${props => props.theme.colors.basic.white};
  border: none;
  border-radius: 999px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.accent.light};
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

// New image container
const ImageContainer = styled.div`
  position: relative;
  flex: 1;
  min-height: 300px;
  border-radius: ${props => props.theme.borders.radius};
  overflow: hidden;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

// Update the right column container
const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

// Component Implementation
const ContactForm: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [contactInfo, setContactInfo] = useState<{ email: string; phone: string; address: string } | null>(null);
  const [loadingContact, setLoadingContact] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('submitting');

    const formData = new FormData(event.currentTarget);

    try {
      // Track form submission attempt
      trackFormSubmission('contact_form_start');
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setStatus('success');
        // Track successful submission
        trackFormSubmission('contact_form_success');
      } else {
        setStatus('error');
        // Track failed submission
        trackFormSubmission('contact_form_error');
      }
    } catch (error) {
      setStatus('error');
      // Track failed submission
      trackFormSubmission('contact_form_error');
    }
  };

  const handleRevealContact = async () => {
    setLoadingContact(true);
    try {
      const response = await fetch('/api/contact-info');
      if (response.ok) {
        const data = await response.json();
        setContactInfo(data);
      } else {
        console.error('Failed to fetch contact info');
      }
    } catch (error) {
      console.error('Error fetching contact info:', error);
    } finally {
      setLoadingContact(false);
    }
  };

  const services = [
    {
      id: 'site-standard',
      title: 'Site standard',
      description: 'Parfait pour les petites entreprises'
    },
    {
      id: 'developpement-sur-mesure',
      title: 'Développement sur mesure',
      description: 'Adapté à vos besoins spécifiques'
    },
    {
      id: 'assistant-ia',
      title: 'Assistant IA',
      description: "Boostez votre entreprise avec l'IA"
    },
    {
      id: 'consulting',
      title: 'Consulting',
      description: 'Expertise et conseils personnalisés'
    }
  ];

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Neuchatech",
    "description": "Contactez-nous pour vos projets web à Neuchâtel",
    "mainEntity": {
      "@type": "Organization",
      "name": "Neuchatech",
      "url": "https://neuchatech.ch",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "areaServed": {
          "@type": "City",
          "name": "Neuchâtel"
        },
        "availableLanguage": ["French", "English"],
        "contactOption": ["TollFree", "Email"],
        "hoursAvailable": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday"
          ],
          "opens": "09:00",
          "closes": "18:00"
        }
      }
    },
    "potentialAction": {
      "@type": "AskAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://neuchatech.ch/#contact",
        "inLanguage": "fr-CH",
        "actionPlatform": [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform"
        ]
      },
      "result": {
        "@type": "Message",
        "name": "Contact Form Submission"
      }
    }
  };

  return (
    <>
      <NextSeo
        title="Contact"
        description="Contactez Neuchatech pour vos projets web. Développement sur mesure, sites web standards et assistants IA à Neuchâtel."
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'contact, devis, projet web, développement web, Neuchâtel'
          }
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <Section id="contact">
        <ContentWrapper>
          <FormContainer>
            <FormGrid>
              {/* Left Column - Form */}
              <div>
                <Title className={montserrat.className}>Contactez-nous</Title>
                <Subtitle>Nous serions ravis d&apos;en savoir plus sur votre projet !</Subtitle>
                
                <Form onSubmit={handleSubmit}>
                  <FormField>
                    <Label htmlFor="name">Nom complet</Label>
                    <Input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required 
                    />
                  </FormField>

                  <FormField>
                    <Label htmlFor="email">Adresse email</Label>
                    <Input 
                      type="email" 
                      id="email" 
                      name="email" 
                      required 
                    />
                  </FormField>

                  <FormField>
                    <Label htmlFor="phone" optional>Téléphone</Label>
                    <Input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                    />
                  </FormField>

                  <FormField>
                    <Label optional>Service souhaité</Label>
                    <ServiceOptions>
                      {services.map(service => (
                        <ServiceCard 
                          key={service.id}
                          selected={selectedService === service.id}
                          onClick={() => setSelectedService(service.id)}
                        >
                          <ServiceTitle>{service.title}</ServiceTitle>
                          <ServiceDescription>{service.description}</ServiceDescription>
                          <input
                            type="radio"
                            name="service"
                            value={service.id}
                            checked={selectedService === service.id}
                            onChange={() => setSelectedService(service.id)}
                            style={{ display: 'none' }}
                          />
                        </ServiceCard>
                      ))}
                    </ServiceOptions>
                  </FormField>

                  <FormField>
                    <Label htmlFor="message">Votre message</Label>
                    <TextArea 
                      id="message" 
                      name="message" 
                      required
                      placeholder="Parlez-nous de votre projet..."
                    />
                  </FormField>

                  <SubmitButton 
                    type="submit" 
                    disabled={status === 'submitting'}
                  >
                    {status === 'submitting' ? 'Envoi en cours...' : 'Envoyer le message'}
                  </SubmitButton>

                  {status === 'success' && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{ color: '#34C759', marginTop: '1rem' }}
                    >
                      Merci de nous avoir contactés ! Nous reviendrons vers vous rapidement.
                    </motion.p>
                  )}

                  {status === 'error' && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{ color: '#FF3B30', marginTop: '1rem' }}
                    >
                      Une erreur s&apos;est produite. Veuillez réessayer ou nous contacter directement.
                    </motion.p>
                  )}
                </Form>
              </div>

              {/* Right Column - Contact Info */}
              <RightColumn>
                <ContactInfo>
                  {!contactInfo ? (
                    <RevealButton 
                      onClick={handleRevealContact} 
                      disabled={loadingContact}
                    >
                      {loadingContact ? (
                        <>
                          <span>Chargement...</span>
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            ⟳
                          </motion.span>
                        </>
                      ) : (
                        <>
                          <span>Cliquez ici pour afficher nos coordonnées</span>
                        </>
                      )}
                    </RevealButton>
                  ) : (
                    <ContactDetails
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ContactItem>
                        <ContactIcon>📍</ContactIcon>
                        <ContactText>{contactInfo.address}</ContactText>
                      </ContactItem>
                      <ContactItem>
                        <ContactIcon>📧</ContactIcon>
                        <ContactText>{contactInfo.email}</ContactText>
                      </ContactItem>
                      <ContactItem>
                        <ContactIcon>📞</ContactIcon>
                        <ContactText>{contactInfo.phone}</ContactText>
                      </ContactItem>
                    </ContactDetails>
                  )}
                </ContactInfo>

                <ImageContainer>
                  <Image
                    src="https://placehold.co/600x1200/999999/666666.png?text=Photo+Professionnelle"
                    alt="Photo professionnelle"
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                  />
                </ImageContainer>
              </RightColumn>
            </FormGrid>
          </FormContainer>
        </ContentWrapper>
      </Section>
    </>
  );
};

export default ContactForm;
