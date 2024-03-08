// pages/test.tsx
import React from 'react';
import styled from 'styled-components';

/*
There is a theme defined that we can use like this : height: calc(100vh - ${({ theme }) => theme.appBarHeight});

We want to adapt to any screen size using these breakpoints:
// Device types
    //mobile: "(max-aspect-ratio: 1/1)",
    portrait: "(max-aspect-ratio: 1)",
    landscape: "(min-aspect-ratio: 1)",
*/

const CardWrapper = styled.div`
  font-family: sans-serif;
  background-color: #fff;
  border-radius: ${({ theme }) => theme.borderRadius};

  //width: 20em;
  flex: 0 1 20em;
  padding: calc(${({ theme }) => theme.spacing} / 2);
  margin: calc(${({ theme }) => theme.spacing} / 2);
  transition: transform 0.1s ease-in-out;
  cursor: pointer;

  &:hover {
    // shrink it by 5%
    transform: scale(0.95);
  }
`;

const CardTitle = styled.h2`
  font-size: 1.25em;
  color: #333;
  margin-bottom: 10px;
`;

const CardContent = styled.div`
  font-size: 0.875em;
  color: #999;
  margin-bottom: 10px;
`;

interface CardProps {
  title: string;
  content: string;
}

const Card: React.FC<CardProps> = ({ title, content }) => (
  <CardWrapper>
    <CardTitle>{title}</CardTitle>
    <CardContent>{content}</CardContent>
  </CardWrapper>
);

const Container = styled.div`
  background-color: #f5f5f5;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20em, 1fr));
  grid-gap: 1em;
  width: 100%;
  max-width: 1000px;
  justify-content: center;
  align-items: center;

  & > div:nth-child(odd) {
    //margin-top: 10em; // Adjust spacing for odd cards
  }

  @media (min-width: calc(2 * 20em)) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ScrollContainer = styled.div`
  width: 100%;
  height: calc(100vh - ${({ theme }) => theme.appBarHeight});
  padding-top: ${({ theme }) => theme.appBarHeight};
  overflow-y: scroll;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TestPage: React.FC = () => {
  return (
    <ScrollContainer>
      <Container>
        <Card title="Site web & e-commerce" content="Sites web avec Webflow · E-Commerce avec Shopify · Rédaction de contenu - Copywriting" />
        <Card title="Design" content="Interface utilisateur  - UI · Expérience utilisateur - UX · Tests utilisateur" />
        <Card title="Card 3" content="Content for card 3" />
        <Card title="Card 4" content="Content for card 4" />
      </Container>
    </ScrollContainer>
  );
};

export default TestPage;
