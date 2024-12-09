import React, { ReactNode, useEffect, useRef } from 'react';
import styled from 'styled-components';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  disableOverlay?: boolean;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.cardBackground};
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: ${({ theme }) => theme.cardShadow};
  max-width: 90%;
  max-height: 90%;
  overflow: auto;
  z-index: 1001; /* Ensure the modal content is on top of the overlay */
`;

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, disableOverlay }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  return isOpen ? (
    <ModalOverlay>
      <ModalContent ref={modalRef}>{children}</ModalContent>
    </ModalOverlay>
  ) : null;
};

export default Modal;