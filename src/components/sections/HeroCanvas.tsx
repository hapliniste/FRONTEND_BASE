import React, { useRef, useState, useEffect } from 'react';
import styled, { ThemeProvider, useTheme } from 'styled-components';
import { Canvas, useThree } from '@react-three/fiber';
import { Html, Float, Environment, OrthographicCamera } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import SimpleCard from '../cards/SimpleCard';
import Float3DButton from '../library/Float3DButton';
import { Vector3, Group } from 'three';
import { OrthographicCamera as ThreeOrthographicCamera } from 'three';

// Import fonts
import { Outfit } from 'next/font/google';
import { Montserrat } from 'next/font/google';
import { DM_Sans } from '@next/font/google';

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
const CanvasContainer = styled.div<{ isHalfSize?: boolean }>`
  width: 100%;
  height: ${props => props.isHalfSize ? '50vh' : '60vh'};
  position: relative;
  background: none;
  transition: height 0.3s ease-in-out;
  z-index: 0;
  padding: 0 8%;
  
  @media (max-width: 1024px) {
    padding: 0 5%;
  }
  
  @media (max-width: 768px) {
    height: 70vh;
    min-height: 500px;
    padding: 0 1rem;
  }
`;

const HeroLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 4rem;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    justify-content: center;
    gap: 2rem;
  }
`;

const HeroContent = styled(motion.div)`
  flex: 1;
  max-width: 600px;
  text-align: left;
  background: transparent;
  border-radius: ${props => props.theme.borders.radius};
  position: relative;
  display: grid;
  gap: 2rem;

  @media (max-width: 768px) {
    text-align: center;
    max-width: 100%;
  }
`;

const CardWrapper = styled(motion.div)`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  animation: float 6s ease-in-out infinite;
  height: 100%;
  max-width: 600px;

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
  color: ${props => props.theme.colors.text.primary};
  font-size: clamp(2.5rem, 5vw, 5rem);
  line-height: 1.1;
  margin: 0;
`;

const SubTitle = styled.h2`
  color: ${props => props.theme.colors.text.secondary};
  font-size: clamp(1.25rem, 2.5vw, 2rem);
  font-weight: 400;
  margin-top: 1.5rem;
  opacity: 0.9;
`;

const Description = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  font-size: clamp(1rem, 1.5vw, 1.25rem);
  margin-top: 2rem;
  max-width: 90%;
  line-height: 1.4;
  opacity: 0.9;
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
  background: linear-gradient(
    90deg,
    ${props => props.theme.colors.accent.primary} 0%,
    ${props => props.theme.colors.accent.light} 100%
  );
  color: ${props => props.theme.colors.basic.white};
  border: none;
  border-radius: 3rem;
  font-weight: 600;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      ${props => props.theme.colors.accent.light} 0%,
      ${props => props.theme.colors.accent.primary} 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);

    &::before {
      opacity: 1;
    }
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

interface SceneProps {
  isMobile: boolean;
  isTablet: boolean;
}

const Scene: React.FC<SceneProps> = ({ isMobile, isTablet }) => {
  const groupRef = useRef<Group>(null);
  const theme = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const { camera } = useThree();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <Html
        transform
        position={[0, 0, 0]}
        style={{
          width: '100%',
          height: '100%',
          transform: `scale(${isMobile ? 0.4 : isTablet ? 0.45 : 0.5})`,
        }}
        center
      >
        <HeroLayout>
          <ThemeProvider theme={theme}>
            <AnimatePresence>
              {isVisible && (
                <HeroContent
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Title className={titleFont.className}>
                    <motion.img 
                      src="/neuchatech_logo.webp" 
                      alt="Neuchatech"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      style={{ height: '1em', marginRight: '0.5rem', verticalAlign: 'baseline', position: 'relative', top: '0.15em' }} 
                    />
                    donne vie à vos
                    <br />
                    <GradientText>
                      projets numériques
                    </GradientText>
                  </Title>
                  <SubTitle className={montserrat.className}>
                    Votre partenaire suisse pour une transition numérique réussie
                  </SubTitle>
                  <Description className={DMSansFont.className}>
                    Des solutions web modernes et performantes pour faire de chaque
                    projet un pilier de votre succès.
                  </Description>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <CTAButton 
                      className={montserrat.className}
                      onClick={() => {
                        const contactSection = document.getElementById('contact');
                        if (contactSection) {
                          contactSection.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                    >
                      <span>Obtenez un devis gratuit</span>
                    </CTAButton>
                  </motion.div>
                </HeroContent>
              )}
            </AnimatePresence>

            {!isMobile && !isTablet && (
              <CardWrapper
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <SimpleCard />
              </CardWrapper>
            )}
          </ThemeProvider>
        </HeroLayout>
      </Html>
    </>
  );
};

const HeroCanvas: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    <CanvasContainer isHalfSize={isTablet}>
      <Canvas
        ref={canvasRef}
        orthographic
        style={{
          width: '100%',
          height: '100%',
        }}
        gl={{
          alpha: true,
          antialias: true,
        }}
        camera={{
          position: [0, 0, 1000],
          near: 0.1,
          far: 2000,
          zoom: 8,
          left: -50,
          right: 50,
          top: 50,
          bottom: -50,
        }}
        onCreated={({ gl, camera }) => {
          gl.setPixelRatio(window.devicePixelRatio);
          const orthoCam = camera as ThreeOrthographicCamera;
          orthoCam.zoom = 8;
          orthoCam.updateProjectionMatrix();
        }}
        onResize={({ camera }) => {
          const orthoCam = camera as ThreeOrthographicCamera;
          const aspect = window.innerWidth / window.innerHeight;
          const viewportWidth = 100;
          const viewportHeight = viewportWidth / aspect;
          orthoCam.left = -viewportWidth / 2;
          orthoCam.right = viewportWidth / 2;
          orthoCam.top = viewportHeight / 2;
          orthoCam.bottom = -viewportHeight / 2;
          orthoCam.zoom = 8;
          orthoCam.updateProjectionMatrix();
        }}
      >
        <Environment preset="warehouse" />
        <ambientLight intensity={1} />
        <Scene isMobile={isMobile} isTablet={isTablet} />
      </Canvas>
    </CanvasContainer>
  );
};

export default HeroCanvas; 