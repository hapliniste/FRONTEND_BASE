import React from "react";
import styled from "styled-components";
import { Raleway } from "@next/font/google";

const titleFont = Raleway({ subsets: ["latin"], weight: ["700"] });

export interface ICardProps {
  title: string;
  content: string;
  icon: string;
}

const CardWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.basic.white};
  border-radius: ${(props) => props.theme.borders.radius};
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 400px;
  max-width: 350px;
  margin: 0 auto;

  @media (max-width: 768px) {
    height: 350px;
    padding: 1.5rem;
  }

  &:hover {
    transform: scale(1.05);
  }
`;

const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const CardIcon = styled.div`
  width: 80px;
  height: 80px;
  background-color: ${(props) => props.theme.colors.accent.primary};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.colors.basic.white};
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: 0.5rem;
  font-family: ${titleFont.style.fontFamily};
  font-size: 1.5rem;
`;

const CardContent = styled.p`
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: 1rem;
  line-height: 1.6;
  flex-grow: 1;
  overflow-y: auto;
`;

const Card: React.FC<ICardProps> = ({ title, content, icon }) => {
  return (
    <CardWrapper>
      <CardHeader>
        <CardIcon>{icon}</CardIcon>
        <CardTitle className={titleFont.className}>{title}</CardTitle>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </CardWrapper>
  );
};

export default Card;