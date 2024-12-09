import React from 'react';
import Modal from '@/components/shared/Modal';
import LoginForm from './LoginForm';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <LoginForm />
    </Modal>
  );
};

export default LoginModal;