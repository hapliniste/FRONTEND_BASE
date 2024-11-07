import React, { useState } from "react";
import styled from "styled-components";
import Image from 'next/image';

const Section = styled.div`
    padding: ${(props) => props.theme.spacing.large};
`;

const FormWrapper = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    background: ${(props) => props.theme.colors.backgrounds.white};
    padding: ${(props) => props.theme.spacing.large};
    border-radius: ${(props) => props.theme.borders.radius};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
    border: 1px solid rgba(0, 0, 0, 0.03);
    display: flex;
    flex-wrap: wrap;
`;

const FormColumn = styled.div`
    flex: 1;
    min-width: 300px;
    padding: ${(props) => props.theme.spacing.medium};
`;

const Title = styled.h2`
    color: ${(props) => props.theme.colors.text.primary};
    margin-bottom: ${(props) => props.theme.spacing.medium};
    font-size: 2.5rem;
`;

const Subtitle = styled.p`
    color: ${(props) => props.theme.colors.text.secondary};
    margin-bottom: ${(props) => props.theme.spacing.large};
    font-size: 1.2rem;
`;

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: ${(props) => props.theme.spacing.medium};
`;

const Input = styled.input`
    padding: ${(props) => props.theme.spacing.small};
    border: 2px solid ${(props) => props.theme.colors.borders.color};
    border-radius: 10px;
    font-size: 1rem;
    transition: border-color 0.3s ease;

    &:focus {
        border-color: ${(props) => props.theme.colors.accent.primary};
        outline: none;
    }
`;

const TextArea = styled.textarea`
    padding: ${(props) => props.theme.spacing.small};
    border: 2px solid ${(props) => props.theme.colors.borders.color};
    border-radius: 10px;
    font-size: 1rem;
    min-height: 150px;
    transition: border-color 0.3s ease;

    &:focus {
        border-color: ${(props) => props.theme.colors.accent.primary};
        outline: none;
    }
`;

const SubmitButton = styled.button`
    padding: ${(props) => props.theme.spacing.small} ${(props) => props.theme.spacing.medium};
    background-color: ${(props) => props.theme.colors.accent.primary};
    color: ${(props) => props.theme.colors.basic.white};
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 1.2rem;
    font-weight: bold;
    transition: background-color 0.3s ease, transform 0.1s ease;

    &:hover {
        background-color: ${(props) => props.theme.colors.accent.light};
        transform: translateY(-2px);
    }

    &:active {
        transform: translateY(0);
    }

    &:disabled {
        background-color: ${(props) => props.theme.colors.borders.color};
        cursor: not-allowed;
    }
`;

const ServiceCards = styled.div`
    display: flex;
    justify-content: space-between;
    gap: ${(props) => props.theme.spacing.small};
    margin-top: ${(props) => props.theme.spacing.medium};
`;

const ServiceCard = styled.label`
    flex: 1;
    padding: ${(props) => props.theme.spacing.small};
    border: 2px solid ${(props) => props.theme.colors.borders.color};
    border-radius: 10px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        border-color: ${(props) => props.theme.colors.accent.primary};
    }

    input:checked + & {
        background-color: ${(props) => props.theme.colors.accent.primary};
        color: ${(props) => props.theme.colors.basic.white};
    }
`;

const ContactInfo = styled.div`
    margin-top: ${(props) => props.theme.spacing.large};
`;

const ContactItem = styled.p`
    display: flex;
    align-items: center;
    margin-bottom: ${(props) => props.theme.spacing.small};
    font-size: 1.1rem;
`;

const ContactIcon = styled.span`
    margin-right: ${(props) => props.theme.spacing.small};
    font-size: 1.5rem;
`;

const RevealButton = styled.button`
    background: none;
    border: none;
    color: ${(props) => props.theme.colors.accent.primary};
    cursor: pointer;
    font-size: 1rem;
    padding: 0;
    margin-left: ${(props) => props.theme.spacing.small};

    &:hover {
        text-decoration: underline;
    }
`;

const ContactForm: React.FC = () => {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [revealedContact, setRevealedContact] = useState(false);
    const [contactInfo, setContactInfo] = useState<{ email: string; phone: string } | null>(null);
    const [loadingContact, setLoadingContact] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setStatus('submitting');

        const formData = new FormData(event.currentTarget);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setStatus('success');
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    const handleRevealContact = async () => {
        setLoadingContact(true);
        try {
            const response = await fetch('/api/contact-info');
            if (response.ok) {
                const data = await response.json();
                setContactInfo(data);
                setStatus('idle');
            } else {
                // Handle non-OK responses
                console.error('Failed to fetch contact info');
            }
        } catch (error) {
            console.error('Error fetching contact info:', error);
        } finally {
            setLoadingContact(false);
            setRevealedContact(true);
        }
    };

    return (
        <Section>
            <FormWrapper>
                <FormColumn>
                    <Title>Contactez-nous</Title>
                    <Subtitle>Nous serions ravis d&apos;en savoir plus sur votre projet !</Subtitle>
                    <StyledForm onSubmit={handleSubmit}>
                        <Input type="text" name="name" placeholder="Votre nom" required />
                        <Input type="email" name="email" placeholder="Votre email" required />
                        <Input type="tel" name="phone" placeholder="Votre téléphone (optionnel)" />
                        <TextArea name="message" placeholder="Parlez-nous de votre projet ou dites-nous simplement bonjour !" required></TextArea>
                        <ServiceCards>
                            <input type="radio" id="service1" name="service" value="site-standard" hidden />
                            <ServiceCard htmlFor="service1">
                                <h4>Site standard</h4>
                                <p>Parfait pour les petites entreprises</p>
                            </ServiceCard>
                            <input type="radio" id="service2" name="service" value="developpement-sur-mesure" hidden />
                            <ServiceCard htmlFor="service2">
                                <h4>Développement sur mesure</h4>
                                <p>Adapté à vos besoins spécifiques</p>
                            </ServiceCard>
                            <input type="radio" id="service3" name="service" value="assistant-ia" hidden />
                            <ServiceCard htmlFor="service3">
                                <h4>Assistant IA</h4>
                                <p>Boostez votre entreprise avec l&apos;IA</p>
                            </ServiceCard>
                            <input type="radio" id="service4" name="service" value="consulting" hidden />
                            <ServiceCard htmlFor="service4">
                                <h4>Consulting</h4>
                                <p>Expertise et conseils personnalisés</p>
                            </ServiceCard>
                        </ServiceCards>
                        <SubmitButton type="submit" disabled={status === 'submitting'}>
                            {status === 'submitting' ? 'Envoi en cours...' : 'Envoyer le message'}
                        </SubmitButton>
                    </StyledForm>
                    {status === 'success' && <p>Merci de nous avoir contactés ! Nous reviendrons vers vous rapidement.</p>}
                    {status === 'error' && <p>Oups ! Une erreur s&apos;est produite. Veuillez réessayer ou nous contacter directement par email.</p>}
                </FormColumn>
                <FormColumn>
                    <ContactInfo>
                        <ContactItem>
                            <ContactIcon>📍</ContactIcon> 123 Rue de la Technologie, Neuchâtel, Suisse
                        </ContactItem>
                        {revealedContact && contactInfo ? (
                            <>
                                <ContactItem>
                                    <ContactIcon>📧</ContactIcon> {contactInfo.email}
                                </ContactItem>
                                <ContactItem>
                                    <ContactIcon>📞</ContactIcon> {contactInfo.phone}
                                </ContactItem>
                            </>
                        ) : (
                            <RevealButton onClick={handleRevealContact} disabled={loadingContact}>
                                {loadingContact ? 'Chargement...' : 'Cliquez pour révéler les coordonnées'}
                            </RevealButton>
                        )}
                    </ContactInfo>
                    <Image
                        src="/path-to-your-friendly-team-photo.jpg"
                        alt="Notre équipe sympathique"
                        width={500}
                        height={300}
                        style={{ borderRadius: '10px', marginTop: '20px' }}
                    />
                </FormColumn>
            </FormWrapper>
        </Section>
    );
};

export default ContactForm;

/*
Contact Form Component

Purpose:
- Provide a friendly and approachable way for potential clients to reach out
- Encourage initial contact, even if the client is not fully committed yet
- Gather essential information without overwhelming the user

Key Considerations:
1. Simplicity and Ease of Use:
   - Minimal required fields (name, email, message)
   - Optional phone number for those who prefer call-backs
   - No complex fields like appointment scheduling or service selection

2. Friendly and Inviting Design:
   - Warm, welcoming copy that encourages casual inquiries
   - Clean, uncluttered layout
   - Soft colors and ample white space

3. Low-Pressure Approach:
   - No mention of budgets or timelines in the initial contact
   - Open-ended message field allows clients to share as much or as little as they want

4. Responsive and Accessible:
   - Ensure the form works well on all device sizes
   - Implement proper accessibility attributes for screen readers

5. Clear Next Steps:
   - Success message sets expectations for follow-up
   - Error message provides alternative contact method

Future Enhancements:
- Consider adding a subtle note about response times or working hours
- Explore adding a CAPTCHA solution that doesn't impact user experience
- Implement analytics to track form submissions and conversion rates

Remember: The goal is to make the initial contact as frictionless as possible. 
Detailed project discussions can happen after the first point of contact.
*/
