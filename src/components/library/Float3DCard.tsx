import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Canvas, useFrame } from '@react-three/fiber';
import { PresentationControls, Float, Environment, Html } from '@react-three/drei';
import * as THREE from 'three';

const CanvasContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  aspect-ratio: 9/16;
  border-radius: ${props => props.theme?.borders?.radius || '1.25rem'};
  overflow: hidden;
`;

interface Float3DCardProps {
  children: React.ReactNode;
  floatIntensity?: number;
  rotationIntensity?: number;
  margin?: string | number;
  width?: string | number;
  height?: string | number;
  maxWidth?: string | number;
  maxHeight?: string | number;
  enableHover?: boolean;
  enableDrag?: boolean;
  hoverIntensity?: number;
}

const Scene: React.FC<{ 
  children: React.ReactNode;
  margin?: string | number;
  width?: string | number;
  height?: string | number;
  maxWidth?: string | number;
  maxHeight?: string | number;
  enableHover?: boolean;
  enableDrag?: boolean;
  hoverIntensity?: number;
}> = ({ 
  children, 
  margin, 
  width, 
  height, 
  maxWidth, 
  maxHeight, 
  enableHover = false,
  enableDrag = true,
  hoverIntensity = 0.3 
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const targetRotation = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });

  const parseSize = (size: string | number | undefined): number => {
    if (typeof size === 'number') return size;
    if (!size) return 0;
    
    // Handle rem values with decimals
    if (size.endsWith('rem')) {
        const remValue = parseFloat(size); // Using parseFloat instead of parseInt
        return remValue * 16 / 100;
    }
    
    // Handle other units
    if (size.endsWith('px')) return parseFloat(size) / 100;
    if (size.endsWith('%')) return parseFloat(size) / 100;
    
    return parseFloat(size) / 100;
  };

  const parsedMargin = parseSize(margin || '1rem');
  const contentStyle = {
    width: 'auto',
    height: 'auto',
    maxWidth: '100%',
    maxHeight: '100%',
    margin: margin || '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
  };

  const clamp = (value: number, min: number, max: number): number => {
    return Math.min(Math.max(value, min), max);
  };

  useEffect(() => {
    if (enableHover) {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = (e.currentTarget as Window).document
          .querySelector('.canvas-container')
          ?.getBoundingClientRect();
        
        if (!rect) return;

        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        
        targetRotation.current = {
          x: clamp(-y * Math.PI * hoverIntensity * 0.2, -Math.PI / 6, Math.PI / 6),
          y: clamp(x * Math.PI * hoverIntensity * 0.2, -Math.PI / 6, Math.PI / 6),
        };
      };

      const handleMouseLeave = () => {
        targetRotation.current = { x: 0, y: 0 };
      };

      window.addEventListener('mousemove', handleMouseMove);
      document.querySelector('.canvas-container')?.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        document.querySelector('.canvas-container')?.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [enableHover, hoverIntensity]);

  useFrame((state, delta) => {
    if (groupRef.current && enableHover) {
      const springStrength = 0.2;
      const dampening = 0.3;

      if (!enableDrag) {
        // Calculate spring force (attraction to target)
        const dx = targetRotation.current.x - groupRef.current.rotation.x;
        const dy = targetRotation.current.y - groupRef.current.rotation.y;

        // Calculate spring force (attraction to center when no target)
        const centerForceX = -groupRef.current.rotation.x * 0.05;
        const centerForceY = -groupRef.current.rotation.y * 0.05;

        // Update velocity with spring physics
        velocity.current.x += (dx * springStrength + centerForceX);
        velocity.current.y += (dy * springStrength + centerForceY);

        // Apply dampening
        velocity.current.x *= dampening;
        velocity.current.y *= dampening;

        // Update rotation
        groupRef.current.rotation.x += velocity.current.x;
        groupRef.current.rotation.y += velocity.current.y;
      } else {
        // When drag is enabled, add a subtle hover effect
        const baseRotation = groupRef.current.rotation;
        const dx = targetRotation.current.x - baseRotation.x;
        const dy = targetRotation.current.y - baseRotation.y;
        
        groupRef.current.rotation.x += dx * 0.05;
        groupRef.current.rotation.y += dy * 0.05;
      }
    }
  });

  const content = (
    <group ref={groupRef}>
      <Html
        transform
        distanceFactor={2.5}
        position={[0, 0, 0]}
        style={{
          ...contentStyle,
          pointerEvents: 'none',
        }}
        center
        prepend
        calculatePosition={() => [0, 0, 0]}
        portal={{ current: null }}
        zIndexRange={[16777271, 16777272]}
        {...{
          style: {
            ...contentStyle,
            pointerEvents: 'none',
            transform: 'translate3d(0,0,0)',
            backfaceVisibility: 'hidden',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
          }
        }}
      >
        <div style={{
          width: 'auto',
          height: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `scale(${1.5 - parsedMargin})`,
          textRendering: 'optimizeLegibility',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        }}>
          {children}
        </div>
      </Html>
    </group>
  );

  return enableDrag ? (
    <PresentationControls
      global
      config={{ mass: 2, tension: 400 }}
      snap={{ mass: 4, tension: 300 }}
      rotation={[0, 0, 0]}
      polar={[-Math.PI / 4, Math.PI / 4]}
      azimuth={[-Math.PI / 4, Math.PI / 4]}
    >
      <Float
        floatIntensity={0.1}
        rotationIntensity={0.2}
        speed={1.5}
      >
        {content}
      </Float>
    </PresentationControls>
  ) : (
    <Float
      floatIntensity={0.1}
      rotationIntensity={0.2}
      speed={1.5}
    >
      {content}
    </Float>
  );
};

const Float3DCard: React.FC<Float3DCardProps> = ({
  children,
  floatIntensity = 0.2,
  rotationIntensity = 0.5,
  margin,
  width,
  height,
  maxWidth,
  maxHeight,
  enableHover = false,
  enableDrag = true,
  hoverIntensity = 0.3,
}) => {
  return (
    <CanvasContainer className="canvas-container">
      <Canvas
        camera={{ 
          position: [0, 0, 4],
          fov: 35,
        }}
        style={{ 
          background: 'transparent',
          width: '100%',
          height: '100%',
        }}
      >
        <ambientLight intensity={1} />
        <Environment preset="warehouse" />
        <Scene
          margin={margin}
          width={width}
          height={height}
          maxWidth={maxWidth}
          maxHeight={maxHeight}
          enableHover={enableHover}
          enableDrag={enableDrag}
          hoverIntensity={hoverIntensity}
        >
          {children}
        </Scene>
      </Canvas>
    </CanvasContainer>
  );
};

export default Float3DCard; 