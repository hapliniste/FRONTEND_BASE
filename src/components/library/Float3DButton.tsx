import React, { useEffect, useRef } from 'react';
import styled, { ThemeProvider, useTheme } from 'styled-components';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Html } from '@react-three/drei';
import * as THREE from 'three';

const CanvasContainer = styled.div`
  position: relative;
  //width: fit-content;
  width: 100%;
  height: fit-content;
  display: inline-block;
  padding: 2rem;
`;

interface Float3DButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  floatIntensity?: number;
  rotationIntensity?: number;
  hoverIntensity?: number;
}

const Scene: React.FC<Float3DButtonProps> = ({ 
  children,
  onClick,
  floatIntensity = 0.2,
  rotationIntensity = 0.3,
  hoverIntensity = 0.3,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const targetRotation = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const theme = useTheme();

  const handleMouseMove = (e: MouseEvent) => {
    if (!groupRef.current) return;
    
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = -(e.clientY - centerY) / (rect.height / 2);
    
    targetRotation.current = {
      x: y * Math.PI * hoverIntensity * 0.2,
      y: x * Math.PI * hoverIntensity * 0.2,
    };
  };

  const handleMouseLeave = () => {
    targetRotation.current = { x: 0, y: 0 };
  };

  useEffect(() => {
    const element = document.querySelector('.button-canvas-container');
    if (element) {
      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      const springStrength = 0.15;
      const dampening = 0.85;

      const dx = targetRotation.current.x - groupRef.current.rotation.x;
      const dy = targetRotation.current.y - groupRef.current.rotation.y;

      velocity.current.x += dx * springStrength;
      velocity.current.y += dy * springStrength;

      velocity.current.x *= dampening;
      velocity.current.y *= dampening;

      groupRef.current.rotation.x = THREE.MathUtils.clamp(
        groupRef.current.rotation.x + velocity.current.x,
        -Math.PI / 4,
        Math.PI / 4
      );
      groupRef.current.rotation.y = THREE.MathUtils.clamp(
        groupRef.current.rotation.y + velocity.current.y,
        -Math.PI / 4,
        Math.PI / 4
      );
    }
  });

  return (
    <group ref={groupRef}>
      <Float
        floatIntensity={floatIntensity}
        rotationIntensity={0}
        speed={2}
      >
        <Html
          transform
          distanceFactor={0.8}
          position={[0, 0, 0]}
          style={{
            width: 'auto',
            height: 'auto',
            cursor: 'pointer',
            transform: 'scale(1)',
            transformOrigin: 'center center',
          }}
          center
        >
          <ThemeProvider theme={theme}>
            <div onClick={onClick} style={{ transform: 'scale(1)' }}>
              {children}
            </div>
          </ThemeProvider>
        </Html>
      </Float>
    </group>
  );
};

const Float3DButton: React.FC<Float3DButtonProps> = (props) => {
  const theme = useTheme();

  return (
    <CanvasContainer className="button-canvas-container">
      <Canvas
        camera={{ 
          position: [0, 0, 0.4],
          fov: 45,
        }}
        style={{ 
          background: 'transparent',
          width: '100%',
          height: '100%',
        }}
      >
        <ambientLight intensity={1} />
        <Environment preset="warehouse" />
        <ThemeProvider theme={theme}>
          <Scene {...props} />
        </ThemeProvider>
      </Canvas>
    </CanvasContainer>
  );
};

export default Float3DButton; 