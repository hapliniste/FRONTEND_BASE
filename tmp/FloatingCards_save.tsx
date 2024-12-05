import styled from 'styled-components';
import { motion } from 'framer-motion';

export const BadgeCard = styled(motion.div)`
  background: ${props => props.theme.colors.backgrounds.white};
  padding: ${props => props.theme.spacing.medium};
  border-radius: ${props => props.theme.borders.radius};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.small};
  max-width: 200px;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.9);
`;

export const TestimonialCard = styled(motion.div)`
  background: ${props => props.theme.colors.backgrounds.white};
  padding: ${props => props.theme.spacing.large};
  border-radius: ${props => props.theme.borders.radius};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 300px;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.9);

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-bottom: ${props => props.theme.spacing.small};
  }

  p {
    margin: ${props => props.theme.spacing.small} 0;
    font-style: italic;
    color: ${props => props.theme.colors.text.primary};
    font-size: 1rem;
    line-height: 1.5;
  }

  small {
    color: ${props => props.theme.colors.text.secondary};
    display: block;
    margin-top: ${props => props.theme.spacing.small};
  }
`;

export const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

export const BadgeText = styled.span`
  color: ${props => props.theme.colors.text.primary};
  font-size: 0.9rem;
  font-weight: 500;
`; 