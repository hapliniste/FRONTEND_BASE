import React, { useEffect, useRef, useCallback } from 'react';
import { useTheme } from 'styled-components';
import { useFrame } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Vector3 } from 'three';

interface Float3DButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  floatIntensity?: number;
  rotationIntensity?: number;
  hoverIntensity?: number;
  position?: Vector3;
}

const Float3DButton: React.FC<Float3DButtonProps> = ({
  children,
  onClick,
  floatIntensity = 0.2,
  rotationIntensity = 0.3,
  hoverIntensity = 0.3,
  position
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const targetRotation = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const theme = useTheme();

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!groupRef.current) return;
    
    const element = document.querySelector('.float-button-container');
    if (!element) return;
    
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = -(e.clientY - centerY) / (rect.height / 2);
    
    targetRotation.current = {
      x: y * Math.PI * hoverIntensity * 0.2,
      y: x * Math.PI * hoverIntensity * 0.2,
    };
  }, [hoverIntensity]);

  const handleMouseLeave = useCallback(() => {
    targetRotation.current = { x: 0, y: 0 };
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  useEffect(() => {
    const element = document.querySelector('.float-button-container');
    if (element) {
      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [handleMouseMove, handleMouseLeave]);

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
    <group ref={groupRef} position={position}>
      <Float
        floatIntensity={floatIntensity}
        rotationIntensity={rotationIntensity}
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
            padding: '2rem',
          }}
          className="float-button-container"
          center
        >
          <div onClick={onClick} style={{ transform: 'scale(1)' }}>
            {children}
          </div>
        </Html>
      </Float>
    </group>
  );
};

export default Float3DButton; 