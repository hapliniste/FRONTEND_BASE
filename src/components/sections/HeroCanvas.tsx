import React, { useRef, useState, useEffect } from 'react';
import styled, { ThemeProvider, useTheme } from 'styled-components';
import { Canvas, useThree } from '@react-three/fiber';
import { Html, Float, Environment, OrthographicCamera } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import SimpleCard from '../cards/SimpleCard';
import Float3DButton from '../library/Float3DButton';
import { Vector3, Group } from 'three';
import { OrthographicCamera as ThreeOrthographicCamera } from 'three';
import Image from 'next/image';

// Import fonts
import { Outfit } from 'next/font/google';
import { Montserrat } from 'next/font/google';
import { DM_Sans } from "next/font/google";

const titleFont = Outfit({
  subsets: ['latin'],
  weight: ['700'],
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700']
});

const DMSansFont = DM_Sans({ 
  subsets: ['latin'], 
  weight: ['400'] 
});

// Styled Components
const CanvasContainer = styled.div`
  width: 100%;
  height: 60vh;
  position: relative;
  background: ${({ theme }) => theme.colors.backgrounds.default};
  
  @media (max-width: 768px) {
    height: 70vh;
    min-height: 500px;
  }
`;

const HeroLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 4rem;
  max-width: ${({ theme }) => theme.sizes.maxWidth};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.section.paddingX.desktop};

  @media (max-width: 1024px) {
    justify-content: center;
    gap: 2rem;
    padding: 0 ${({ theme }) => theme.spacing.section.paddingX.mobile};
    max-width: none;
  }
`;

const HeroContent = styled(motion.div)`
  flex: 0 1 800px;
  text-align: left;
  background: transparent;
  border-radius: ${({ theme }) => theme.borders.radius};
  position: relative;
  display: grid;
  gap: 2rem;
  margin-right: auto;

  @media (max-width: 1400px) {
    flex: 0 1 700px;
  }

  @media (max-width: 768px) {
    text-align: center;
    max-width: 100%;
    margin: 0 auto;
    width: 100%;
  }
`;

const CardWrapper = styled(motion.div)`
  flex: 0 1 700px;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: float 6s ease-in-out infinite;
  height: 100%;

  @media (max-width: 1400px) {
    flex: 0 1 600px;
  }

  @keyframes float {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  @media (max-width: 1024px) {
    display: none;
  }
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: clamp(2.5rem, 5vw, 5rem);
  line-height: 1.1;
  margin: 0;
  display: grid;
  gap: 0.2rem;

  img {
    height: 1em;
    margin-bottom: 0.2rem;
  }

  @media (max-width: 768px) {
    text-align: center;
    gap: 0.2rem;
    
    img {
      display: block;
      margin: 0 auto 0.2rem;
    }
  }
`;

const TitleText = styled.div`
  white-space: nowrap;
`;

const SubTitle = styled.h2`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: clamp(1.25rem, 2.5vw, 2rem);
  font-weight: 400;
  margin-top: 1.5rem;
  opacity: 0.9;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: clamp(1rem, 1.5vw, 1.25rem);
  margin-top: 2rem;
  max-width: 90%;
  line-height: 1.4;
  opacity: 0.9;

  @media (max-width: 768px) {
    max-width: 100%;
    margin: 2rem auto 0;
  }
`;

const GradientText = styled.span`
  color: ${props => props.theme.colors.accent.primary}; // Default color
  background-size: 200% auto;
  background-position: 0 0;
  background-image: linear-gradient(
    90deg,
    ${props => props.theme.colors.accent.primary} 0%,
    ${props => props.theme.colors.accent.light} 50%,
    ${props => props.theme.colors.accent.primary} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  transition: background-position 0.5s ease;

  &:hover {
    background-position: -100% 0;
  }
`;

const CTAButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2.5rem;
  background: ${({ theme }) => theme.colors.accent.gradient};
  color: ${({ theme }) => theme.colors.basic.white};
  border: none;
  border-radius: 3rem;
  font-weight: 600;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  }

  span {
    position: relative;
    z-index: 1;
  }
`;

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.15,
    }
  }
};

const wordVariants = {
  hidden: { 
    opacity: 0,
    y: 20,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      delay: i * 0.1,
    }
  })
};

interface SplitWordsProps {
  children: string;
  variants?: any;
  className?: string;
}

const SplitWords: React.FC<SplitWordsProps> = ({ children, variants, className }) => {
  return (
    <motion.span
      style={{ display: 'inline-block', whiteSpace: 'pre-wrap' }}
      className={className}
    >
      {children.split(' ').map((word, index) => (
        <motion.span
          key={index}
          style={{ display: 'inline-block', position: 'relative', marginRight: '0.25em' }}
          variants={variants}
          custom={index}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

const CameraSetup = () => {
  const { camera, size } = useThree();

  useEffect(() => {
    if (camera instanceof ThreeOrthographicCamera) {
      const frustumSize = 50;
      const aspect = size.width / size.height;
      camera.left = -frustumSize * aspect / 2;
      camera.right = frustumSize * aspect / 2;
      camera.top = frustumSize / 2;
      camera.bottom = -frustumSize / 2;
      camera.position.set(0, 0, 100);
      camera.zoom = 1;
      camera.updateProjectionMatrix();
    }
  }, [camera, size]);

  return null;
};

interface SceneProps {
  isMobile: boolean;
  isTablet: boolean;
}

const Scene: React.FC<SceneProps> = ({ isMobile, isTablet }) => {
  const groupRef = useRef<Group>(null);
  const theme = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const { size } = useThree();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleButtonClick = () => {
    console.log('3D button clicked');
  };

  // Calculate scale based on viewport size - increased values
  const scale = isMobile ? 1.2 : isTablet ? 1.5 : 2;
  const contentScale = `scale(${scale})`;

  return (
    <group ref={groupRef}>
      <CameraSetup />
      <Html
        transform
        position={[0, 0, 0]}
        style={{
          width: '100%',
          height: '100%',
          transform: contentScale,
          transformOrigin: 'center center',
        }}
        center
      >
        <ThemeProvider theme={theme}>
          <HeroLayout>
            <HeroContent
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <Title className={titleFont.className}>
                <Image 
                  src="/neuchatech_logo.webp"
                  alt="Neuchatech Logo"
                  width={200}
                  height={200}
                  style={{ width: '100%', height: 'auto' }}
                />
                <TitleText>
                  <SplitWords variants={wordVariants}>
                    Solutions Web Professionnelles
                  </SplitWords>
                </TitleText>
              </Title>
              <SubTitle>
                Développement web sur mesure à Neuchâtel
              </SubTitle>
              <Description>
                Nous créons des solutions web innovantes et performantes pour votre entreprise.
                Du site vitrine à l&apos;application complexe, nous vous accompagnons dans votre transformation digitale.
              </Description>
              <CTAButton>
                <span>Commencer un projet</span>
              </CTAButton>
            </HeroContent>
          </HeroLayout>
        </ThemeProvider>
      </Html>
      <Float3DButton 
        position={new Vector3(10, 0, 0)}  // Moved button further out to match new scale
        onClick={handleButtonClick}
        floatIntensity={0.5}
        rotationIntensity={0.2}
        hoverIntensity={0.3}
      >
        <ThemeProvider theme={theme}>
          <div style={{
            padding: '1rem 2rem',
            background: theme.colors.accent.primary,
            color: theme.colors.basic.white,
            borderRadius: theme.borders.radius,
            fontSize: '1.2rem',
            fontWeight: 600,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}>
            Découvrir
          </div>
        </ThemeProvider>
      </Float3DButton>
    </group>
  );
};

const HeroCanvas: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth > 768 && window.innerWidth <= 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <CanvasContainer>
      <Canvas
        orthographic
        camera={{
          position: [0, 0, 100],
          near: 1,
          far: 2000,
          zoom: 1
        }}
      >
        <Scene isMobile={isMobile} isTablet={isTablet} />
        <Environment preset="warehouse" />
        <ambientLight intensity={1} />
      </Canvas>
    </CanvasContainer>
  );
};

export default HeroCanvas; 