import { useState, ReactNode } from 'react';
import styled from 'styled-components';
import { ArrowUpRight } from 'lucide-react'; // Make sure to install lucide-react

export type Image = {
  id: number;
  href?: string;  // Made optional
  icon: string;
  name: string;
  username: string;
  fullContent?: ReactNode;  // Changed to ReactNode
};

const CardWrapper = styled.div`  // Changed from 'a' to 'div' when no href
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.backgrounds.white};
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
  transition: all 0.3s ease;
  padding: 2.5rem 2.75rem;
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.03);
  cursor: ${props => props.onClick ? 'pointer' : 'default'};

  &:hover {
    transform: ${props => props.onClick ? 'translateY(-4px)' : 'none'};
    box-shadow: ${props => props.onClick ? '0 20px 40px rgba(0, 0, 0, 0.08)' : '0 2px 4px rgba(0, 0, 0, 0.02)'};
    
    .arrow-icon {
      transform: translate(4px, -4px);
    }
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
  margin-bottom: 1rem;  // Reduced from 2rem to 1rem
`;

const IconWrapper = styled.div`
  position: relative;
  margin-top: 0.25rem;
`;

const IconBackground = styled.div`
  width: 3.25rem;
  height: 3.25rem;
  background-color: ${props => props.theme.accentPrimary}12;
  border-radius: 0.875rem;
`;

const Icon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.75rem;
`;

const HeaderContent = styled.div`
  flex: 1;
`;

const CardTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.baseDark};
  margin: 0;
  line-height: 1.3;
  letter-spacing: -0.02em;
`;

const CardDescription = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.8;
  color: ${props => props.theme.baseMedium};
  margin: 0;
  margin-top: 1rem;  // Reduced from 2rem to 1rem
`;

const ArrowIcon = styled(ArrowUpRight)`
  position: absolute;
  top: 2.75rem;
  right: 2.75rem;
  color: ${props => props.theme.baseMedium};
  opacity: 0.5;
  transition: all 0.3s ease;
`;

const Divider = styled.div`
  height: 1px;
  background: linear-gradient(
    to right,
    ${props => props.theme.accentPrimary}12,
    transparent
  );
  margin: 1rem 0;  // Reduced from 2rem to 1rem
  width: 100%;
`;

const ImageCard = ({ image, onClick }: { image: Image; onClick?: () => void }) => {
  const WrapperComponent = image.href ? CardWrapper.withComponent('a') : CardWrapper;
  
  return (
    <WrapperComponent 
      href={image.href} 
      onClick={onClick}
    >
      <CardHeader>
        <IconWrapper>
          <IconBackground />
          <Icon>{image.icon}</Icon>
        </IconWrapper>
        <HeaderContent>
          <CardTitle>{image.name}</CardTitle>
        </HeaderContent>
        {image.fullContent && <ArrowIcon size={22} className="arrow-icon" />}
      </CardHeader>
      <Divider />
      <CardDescription>{image.username}</CardDescription>
    </WrapperComponent>
  );
};

export default ImageCard;
