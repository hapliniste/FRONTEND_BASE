import NextImage from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';

export type Image = {
  id: number;
  href: string;
  imageSrc: string;
  name: string;
  username: string;
};

const CardWrapper = styled.a`
  display: block;
  background-color: ${props => props.theme.white};
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  padding-top: 75%; // 4:3 aspect ratio
`;

const CardContent = styled.div`
  padding: 1rem;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  color: ${props => props.theme.baseDark};
  margin-bottom: 0.5rem;
`;

const CardDescription = styled.p`
  font-size: 1rem;
  color: ${props => props.theme.baseMedium};
`;

const ImageCard = ({ image }: { image: Image }) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <CardWrapper href={image.href}>
      <ImageWrapper>
        <NextImage
          alt={image.name}
          src={image.imageSrc}
          layout="fill"
          objectFit="cover"
          className={`duration-700 ease-in-out ${
            isLoading ? 'grayscale blur-2xl scale-110' : 'grayscale-0 blur-0 scale-100'
          }`}
          onLoadingComplete={() => setLoading(false)}
        />
      </ImageWrapper>
      <CardContent>
        <CardTitle>{image.name}</CardTitle>
        <CardDescription>{image.username}</CardDescription>
      </CardContent>
    </CardWrapper>
  );
};

export default ImageCard;