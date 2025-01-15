import { useState, ReactNode } from 'react';
import styled from 'styled-components';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export type Image = {
  id: number;
  href?: string;
  icon: string;
  title: string;
  content: React.ReactNode;
  fullContent?: React.ReactNode;
};

const BaseCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({theme}) => theme.colors.backgrounds.white};
  border-radius: 2rem;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
  transition: all 0.3s ease;
  padding: 1.5rem;
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.03);
  width: 100%;
  max-width: 320px;
  cursor: ${props => props.onClick ? 'pointer' : 'default'};
  
  @media (min-width: 768px) {
    max-width: none;
    padding: 2rem;
  }

  &:hover {
    transform: ${props => props.onClick ? 'translateY(-2px)' : 'none'};
    box-shadow: ${props => props.onClick ? '0 4px 8px rgba(0, 0, 0, 0.05)' : '0 2px 4px rgba(0, 0, 0, 0.02)'};
  }
`;

const CardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const IconWrapper = styled.div`
  position: relative;
  flex-shrink: 0;
`;

const IconBackground = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  background-color: ${({theme}) => `${theme.colors.accent.primary}12`};
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;

  @media (min-width: 768px) {
    width: 3rem;
    height: 3rem;
    font-size: 1.5rem;
  }
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
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({theme}) => theme.colors.text.primary};
  margin: 0;
  flex-grow: 1;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const CardDescription = styled.div`
  color: ${({theme}) => theme.colors.text.secondary};
  font-size: 0.875rem;
  line-height: 1.6;

  @media (min-width: 768px) {
    font-size: 1rem;
  }

  p {
    margin: 0 0 1rem;
    &:last-child {
      margin-bottom: 0;
    }
  }

  ul {
    margin: 0.5rem 0;
    padding-left: 1.5rem;
    
    li {
      margin-bottom: 0.25rem;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;

const ArrowIcon = styled(ArrowUpRight)`
  position: absolute;
  top: 2.75rem;
  right: 2.75rem;
  color: ${props => props.theme.colors.text.secondary};
  opacity: 0.5;
  transition: all 0.3s ease;
`;

const Divider = styled.div`
  height: 1px;
  background: linear-gradient(
    to right,
    ${props => props.theme.colors.accent.primary}12,
    transparent
  );
  margin: 1rem 0;
  width: 100%;
`;

const ImageCard = ({ image, onClick }: { image: Image; onClick?: () => void }) => {
  const content = (
    <>
      <CardHeader>
        <IconWrapper>
          <IconBackground>
            {image.icon}
          </IconBackground>
        </IconWrapper>
        <HeaderContent>
          <CardTitle>{image.title}</CardTitle>
        </HeaderContent>
        {image.fullContent && <ArrowIcon size={22} className="arrow-icon" />}
      </CardHeader>
      <Divider />
      <CardDescription>{image.content}</CardDescription>
    </>
  );

  if (image.href) {
    return (
      <CardLink href={image.href}>
        <BaseCardWrapper as="div" onClick={onClick}>
          {content}
        </BaseCardWrapper>
      </CardLink>
    );
  }

  return (
    <BaseCardWrapper onClick={onClick}>
      {content}
    </BaseCardWrapper>
  );
};

export default ImageCard;
