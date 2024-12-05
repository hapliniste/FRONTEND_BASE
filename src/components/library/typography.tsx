import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

interface SectionTitleProps {
  centered?: boolean;
  noUnderline?: boolean;
}

export const SectionTitle = styled(motion.h2)<SectionTitleProps>`
  font-size: ${({theme}) => theme.typography.sectionTitle.fontSize.mobile};
  font-weight: ${({theme}) => theme.typography.sectionTitle.fontWeight};
  font-family: ${({theme}) => theme.typography.headingFontFamily};
  color: ${({theme}) => theme.colors.text.primary};
  letter-spacing: ${({theme}) => theme.typography.sectionTitle.letterSpacing};
  margin-bottom: ${({theme}) => theme.typography.sectionTitle.marginBottom};
  position: relative;
  max-width: ${({theme}) => theme.sizes.maxWidth};
  margin-left: auto;
  margin-right: auto;
  padding: 0 2rem;
  
  ${props => props.centered ? css`
    text-align: center;
  ` : css`
    text-align: left;
  `}
  
  ${props => !props.noUnderline && css`
    &::after {
      content: '';
      position: absolute;
      bottom: -${({theme}) => theme.typography.sectionTitle.underline.offset};
      left: 2rem;
      width: ${({theme}) => theme.typography.sectionTitle.underline.width};
      height: ${({theme}) => theme.typography.sectionTitle.underline.height};
      background-color: ${({theme}) => theme.typography.sectionTitle.underline.color};
      border-radius: ${({theme}) => theme.typography.sectionTitle.underline.height};
    }
  `}
  
  @media (min-width: 768px) {
    font-size: ${({theme}) => theme.typography.sectionTitle.fontSize.desktop};
  }

  @media (max-width: 768px) {
    padding: 0 1rem;
    margin-bottom: 3rem;
    
    ${props => !props.noUnderline && css`
      &::after {
        left: 1rem;
        width: ${({theme}) => theme.typography.sectionTitle.underline.width};
        height: ${({theme}) => theme.typography.sectionTitle.underline.height};
      }
    `}
  }
`;

export const SectionTitleContent: React.FC<{ children: React.ReactNode; noUnderline?: boolean }> = ({ children, noUnderline }) => (
  <TitleSpan $noUnderline={noUnderline}>{children}</TitleSpan>
);

SectionTitle.defaultProps = {
  children: (props: SectionTitleProps & { children: React.ReactNode }) => (
    <SectionTitleContent noUnderline={props.noUnderline}>{props.children}</SectionTitleContent>
  )
}; 