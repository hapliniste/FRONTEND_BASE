import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
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
const Form = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.medium};
`;

const FormField = styled(motion.div)`
  position: relative;
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

const Input = styled.input<{ $hasError?: boolean; optional?: boolean }>`
  width: 100%;
  padding: 0.75rem;
  box-sizing: border-box;
  border: 1px solid ${props => props.$hasError ? props.theme.colors.status.error : props.theme.colors.backgrounds.light};
  border-radius: ${props => props.theme.borders.radius};
  background: ${props => props.theme.colors.backgrounds.white};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.$hasError ? props.theme.colors.status.error : props.theme.colors.accent.primary};
    box-shadow: 0 0 0 2px ${props => props.$hasError ? `${props.theme.colors.status.error}20` : `${props.theme.colors.accent.primary}20`};
  }
`;

const TextArea = styled.textarea<{ $hasError?: boolean }>`
  width: 100%;
  padding: 0.75rem;
  box-sizing: border-box;
  border: 1px solid ${props => props.$hasError ? props.theme.colors.status.error : props.theme.colors.backgrounds.light};
  border-radius: ${props => props.theme.borders.radius};
  background: ${props => props.theme.colors.backgrounds.white};
  min-height: 150px;
  resize: vertical;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.$hasError ? props.theme.colors.status.error : props.theme.colors.accent.primary};
    box-shadow: 0 0 0 2px ${props => props.$hasError ? `${props.theme.colors.status.error}20` : `${props.theme.colors.accent.primary}20`};
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

const RevealButton = styled(motion.button)`
  background: transparent;
  border: none;
  color: ${props => props.theme.colors.accent.primary};
  font-size: 1.2rem;
  padding: ${props => props.theme.spacing.medium};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.small};
  margin: 0 auto;
  transition: all 0.2s ease;
  font-weight: 500;
  font-family: ${props => props.theme.typography.titleFontFamily};

  &:hover:not(:disabled) {
    color: ${props => props.theme.colors.accent.light};
  }

  &:disabled {
    opacity: 0.7;
    cursor: wait;
  }

  svg {
    transition: transform 0.2s ease;
    width: 20px;
    height: 20px;
  }

  &:hover:not(:disabled) svg {
    transform: translateX(4px);
  }
`;

const ContactDetails = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.medium};
`;

// Button Components
const SubmitButton = styled(motion.button)`
  background: ${props => props.theme.colors.accent.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borders.radius};
  padding: ${props => `${props.theme.spacing.medium} ${props.theme.spacing.large}`};
  font-size: 1.1rem;
  cursor: pointer;
  width: 100%;
  transition: background 0.3s ease;
  position: relative;
  overflow: hidden;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background: ${props => props.theme.colors.accent.light};
  }
`;

const StatusMessage = styled(motion.div)<{ $status: 'success' | 'error' }>`
  color: ${props => props.$status === 'success' ? props.theme.colors.success : props.theme.colors.error};
  margin-top: ${props => props.theme.spacing.medium};
  text-align: center;
  font-weight: 500;
`;

const LoadingSpinner = styled(motion.div)`
  width: 20px;
  height: 20px;
  border: 2px solid #ffffff;
  border-top: 2px solid transparent;
  border-radius: 50%;
  position: absolute;
  right: ${props => props.theme.spacing.medium};
  top: 50%;
  transform: translateY(-50%);
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

// Add form field animation variants
const formFieldVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: custom * 0.1,
      ease: "easeOut"
    }
  })
};

const ValidationMessage = styled(motion.span)`
  color: ${props => props.theme.colors.status.error};
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
`;

// Component Implementation
const ContactForm: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [contactInfo, setContactInfo] = useState<{ email: string; phone: string; address: string } | null>(null);
  const [loadingContact, setLoadingContact] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
    phone?: string;
  }>({});

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

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.02 },
    tap: { scale: 0.98 },
    loading: { opacity: 0.8 }
  };

  const spinnerVariants = {
    loading: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const messageVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'name':
        return value.length < 2 ? 'Le nom doit contenir au moins 2 caractères' : '';
      case 'email':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Veuillez entrer une adresse email valide' : '';
      case 'message':
        return value.length < 10 ? 'Le message doit contenir au moins 10 caractères' : '';
      case 'phone':
        return value && !/^[+\d\s-()]{6,}$/.test(value) ? 'Veuillez entrer un numéro de téléphone valide' : '';
      default:
        return '';
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
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
                
                <Form
                  onSubmit={handleSubmit}
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.1
                      }
                    }
                  }}
                >
                  <motion.div variants={formFieldVariants} custom={0}>
                    <FormField>
                      <Label htmlFor="name">Nom complet</Label>
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        required
                        onBlur={handleBlur}
                        $hasError={!!errors.name}
                        disabled={status === 'submitting'}
                      />
                      <AnimatePresence>
                        {errors.name && (
                          <ValidationMessage
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                          >
                            {errors.name}
                          </ValidationMessage>
                        )}
                      </AnimatePresence>
                    </FormField>
                  </motion.div>

                  <motion.div variants={formFieldVariants} custom={1}>
                    <FormField>
                      <Label htmlFor="email">Adresse email</Label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        required
                        onBlur={handleBlur}
                        $hasError={!!errors.email}
                        disabled={status === 'submitting'}
                      />
                      <AnimatePresence>
                        {errors.email && (
                          <ValidationMessage
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                          >
                            {errors.email}
                          </ValidationMessage>
                        )}
                      </AnimatePresence>
                    </FormField>
                  </motion.div>

                  <motion.div variants={formFieldVariants} custom={2}>
                    <FormField>
                      <Label htmlFor="phone" optional>Téléphone</Label>
                      <Input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="Votre téléphone (optionnel)"
                        optional
                        onBlur={handleBlur}
                        $hasError={!!errors.phone}
                        disabled={status === 'submitting'}
                      />
                      <AnimatePresence>
                        {errors.phone && (
                          <ValidationMessage
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                          >
                            {errors.phone}
                          </ValidationMessage>
                        )}
                      </AnimatePresence>
                    </FormField>
                  </motion.div>

                  <motion.div variants={formFieldVariants} custom={3}>
                    <FormField>
                      <Label optional>Service souhaité</Label>
                      <ServiceOptions>
                        {services.map(service => (
                          <ServiceCard
                            key={service.id}
                            selected={selectedService === service.id}
                            onClick={() => setSelectedService(service.id)}
                            as={motion.label}
                            whileHover={{ y: -4, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
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
                  </motion.div>

                  <motion.div variants={formFieldVariants} custom={4}>
                    <FormField>
                      <Label htmlFor="message">Votre message</Label>
                      <TextArea
                        id="message"
                        name="message"
                        required
                        placeholder="Parlez-nous de votre projet..."
                        onBlur={handleBlur}
                        $hasError={!!errors.message}
                        disabled={status === 'submitting'}
                      />
                      <AnimatePresence>
                        {errors.message && (
                          <ValidationMessage
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                          >
                            {errors.message}
                          </ValidationMessage>
                        )}
                      </AnimatePresence>
                    </FormField>
                  </motion.div>

                  <SubmitButton
                    as={motion.button}
                    variants={buttonVariants}
                    initial="idle"
                    whileHover="hover"
                    whileTap="tap"
                    animate={status === 'submitting' ? 'loading' : 'idle'}
                    disabled={status === 'submitting' || status === 'success'}
                  >
                    {status === 'submitting' ? 'Envoi en cours...' : 'Envoyer'}
                    <AnimatePresence>
                      {status === 'submitting' && (
                        <LoadingSpinner
                          as={motion.div}
                          variants={spinnerVariants}
                          animate="loading"
                          exit={{ opacity: 0 }}
                        />
                      )}
                    </AnimatePresence>
                  </SubmitButton>

                  <AnimatePresence mode="wait">
                    {status === 'success' && (
                      <StatusMessage
                        $status="success"
                        variants={messageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                      >
                        Message envoyé avec succès !
                      </StatusMessage>
                    )}
                    {status === 'error' && (
                      <StatusMessage
                        $status="error"
                        variants={messageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                      >
                        Une erreur est survenue. Veuillez réessayer.
                      </StatusMessage>
                    )}
                  </AnimatePresence>
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
                          <span>Voir nos coordonnées</span>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6 12L10 8L6 4"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
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
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 1200'%3E%3Crect width='600' height='1200' fill='%23999999'/%3E%3C/svg%3E"
                    priority={false}
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
