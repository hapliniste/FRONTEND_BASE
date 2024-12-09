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
        return theme.successColor;
      case 'error':
        return theme.errorColor;
      case 'warning':
        return theme.warningColor;
      default:
        return theme.warningColor;
    }
  }};
  color: ${({ theme }) => theme.white};
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: ${({ theme }) => theme.cardShadow};
  animation: ${fadeIn} 0.3s ease-in-out;

  ${({ type }) =>
    type === 'error' &&
    css`
      border-left: 0.5rem solid ${({ theme }) => theme.errorColor};
    `}

  ${({ type }) =>
    type === 'success' &&
    css`
      border-left: 0.5rem solid ${({ theme }) => theme.successColor};
    `}

  ${({ type }) =>
    type === 'warning' &&
    css`
      border-left: 0.5rem solid ${({ theme }) => theme.warningColor};
    `}
`;

const Toast: React.FC<ToastProps> = ({ message, type, duration = 3000, position = 'top-right', onClose }) => {
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

export default Toast;