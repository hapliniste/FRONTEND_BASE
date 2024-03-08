// components/sections/Services.tsx
import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: ${({ theme }) => theme.baseMedium};
  color: ${({ theme }) => theme.white};
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const ServicesList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;
`;

const ServiceItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const ServiceIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const ServiceName = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const ServiceDescription = styled.p`
  font-size: 1rem;
  line-height: 1.5;
`;

const Services: React.FC = () => {
  return (
    <Section>
      <Title>Nos services</Title>
      <ServicesList>
        <ServiceItem>
          <ServiceIcon>🌐</ServiceIcon>
          <ServiceName>Site web & e-commerce</ServiceName>
          <ServiceDescription>
            Création de sites web modernes et performants, avec ou sans système e-commerce intégré.
          </ServiceDescription>
        </ServiceItem>
        {/* Add more service items here */}
      </ServicesList>
    </Section>
  );
};

export default Services;