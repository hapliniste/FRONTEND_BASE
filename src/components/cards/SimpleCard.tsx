import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  width: 100%;
  height: 100%;
  background: ${props => props.theme?.colors?.backgrounds?.white || '#ffffff'};
  border-radius: ${props => props.theme?.borders?.radius || '1.25rem'};
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const CardHeader = styled.div`
  background: ${props => props.theme?.colors?.accent?.gradient || 'linear-gradient(115deg, #d52a1d 0%, #fe4a4a 100%)'};
  padding: ${props => props.theme?.spacing?.large || '2rem'};
  color: white;
  text-align: center;
`;

const CardContent = styled.div`
  padding: ${props => props.theme?.spacing?.large || '2rem'};
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const Title = styled.h3`
  color: white;
  font-size: 1.75rem;
  margin: 0;
  font-weight: 600;
`;

const Content = styled.p`
  color: ${props => props.theme?.colors?.text?.secondary || '#555555'};
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0;
`;

const SimpleCard: React.FC = () => {
  return (
    <CardContainer>
      <CardHeader>
        <Title>Welcome to Neuchatech</Title>
      </CardHeader>
      <CardContent>
        <Content>
          We create modern web solutions to help your business succeed in the digital world.
        </Content>
      </CardContent>
    </CardContainer>
  );
};

export default SimpleCard; 