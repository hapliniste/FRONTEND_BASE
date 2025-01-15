import React, { ReactNode, useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

interface ToastProps {
  message: ReactNode;
  type: 'success' | 'error' | 'warning';
  duration?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  onClose?: () => void;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
`;

const ToastContainer = styled.div<{ position: ToastProps['position'] }>`
  position: fixed;
  ${({ position }) => {
    switch (position) {
      case 'top-right':
        return 'top: 1rem; right: 1rem;';
      case 'top-left':
        return 'top: 1rem; left: 1rem;';
      case 'bottom-right':
        return 'bottom: 1rem; right: 1rem;';
      case 'bottom-left':
        return 'bottom: 1rem; left: 1rem;';
      default:
        return 'top: 1rem; right: 1rem;';
    }
  }}
  z-index: 1000;
`;

const ToastWrapper = styled.div<{ type: ToastProps['type'] }>`
  background-color: ${({ theme, type }) => {
    switch (type) {
      case 'success':
        return theme.colors.status.success;
      case 'error':
        return theme.colors.status.error;
      case 'warning':
        return theme.colors.status.warning;
      default:
        return theme.colors.status.warning;
    }
  }};
  color: ${({ theme }) => theme.colors.basic.white};
  padding: 1rem;
  border-radius: ${({ theme }) => theme.borders.radius};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.3s ease-in-out;

  ${({ type }) =>
    type === 'error' &&
    css`
      border-left: 0.5rem solid ${({ theme }) => theme.colors.status.error};
    `}

  ${({ type }) =>
    type === 'success' &&
    css`
      border-left: 0.5rem solid ${({ theme }) => theme.colors.status.success};
    `}

  ${({ type }) =>
    type === 'warning' &&
    css`
      border-left: 0.5rem solid ${({ theme }) => theme.colors.status.warning};
    `}
`;

export const Toast: React.FC<ToastProps> = ({ 
  message, 
  type, 
  duration = 3000, 
  position = 'top-right', 
  onClose 
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  useEffect(() => {
    if (!isVisible && onClose) {
      onClose();
    }
  }, [isVisible, onClose]);

  return (
    <ToastContainer position={position}>
      <ToastWrapper
        type={type}
        style={{
          animation: `${isVisible ? fadeIn : fadeOut} 0.3s ease-in-out`,
        }}
      >
        {message}
      </ToastWrapper>
    </ToastContainer>
  );
};

Toast.displayName = 'Toast';