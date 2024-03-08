import React from 'react';
import styled from 'styled-components';

const HeroWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  background-color: #f8f8f8;
`;

const HeroContent = styled.div`
  flex: 1;
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  color: #333333;
  margin-bottom: 1rem;
`;

const HeroDescription = styled.p`
  font-size: 1.2rem;
  color: #666666;
`;

const HeroImage = styled.img`
  flex: 1;
  max-width: 100%;
  height: auto;
`;

const Hero: React.FC = () => {
  return (
    <HeroWrapper>
      <HeroContent>
        <HeroTitle>Ensemble, donnons vie à votre projet web !</HeroTitle>
        <HeroDescription>
          Votre partenaire web spécialisé en projets sur-mesure, nous développons des solutions web modernes et performantes pour faire de chaque projet un succès.
        </HeroDescription>
      </HeroContent>
      <HeroImage src="/hero-image.png" alt="Hero Image" />
    </HeroWrapper>
  );
};

export default Hero;