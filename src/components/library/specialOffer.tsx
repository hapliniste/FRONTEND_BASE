import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Card = styled(motion.div)`
  margin-top: 4rem;
  background: white;
  border-radius: 1.5rem;
  padding: 2.5rem;
  text-align: center;
  border: 1px solid ${props => props.theme.colors.accent.primary}12;

  @media (max-width: 768px) {
    margin-top: 2rem;
    padding: 1.5rem;
  }
`;

const Title = styled.h3`
  //font-family: 'Montserrat', sans-serif;
  font-size: 1.75rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
  margin: 0 0 1rem 0;
`;

const Description = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: ${props => props.theme.colors.text.secondary};
  margin: 0;
`;

const Price = styled.div`
  //font-family: 'Montserrat', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.accent.primary};
  margin: 1.5rem 0;
`;

const ContactButton = styled.a`
  display: inline-block;
  padding: 1rem 2rem;
  background: ${props => props.theme.colors.accent.primary};
  color: white;
  border-radius: 0.75rem;
  text-decoration: none;
  font-weight: 600;
  transition: transform 0.2s, opacity 0.2s;

  &:hover {
    transform: translateY(-2px);
    opacity: 0.9;
  }
`;

interface SpecialOfferProps {
  title: string;
  description: string;
  price: string;
  buttonText?: string;
  buttonHref?: string;
}

const SpecialOffer: React.FC<SpecialOfferProps> = ({
  title,
  description,
  price,
  buttonText,
  buttonHref
}) => {
  return (
    <Card
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.5 }}
    >
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Price>{price}</Price>
      {buttonText && buttonHref && <ContactButton href={buttonHref}>{buttonText}</ContactButton>}
    </Card>
  );
};

export default SpecialOffer; 