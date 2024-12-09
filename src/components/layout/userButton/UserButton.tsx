import React, { useState, useRef, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import styled from 'styled-components';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import LoginModal from '@/components/userManagement/loginForm/LoginModal';
import { motion, AnimatePresence } from 'framer-motion';
import { User, LogOut, Loader } from 'lucide-react';
import Image from 'next/image';

const UserButtonWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const UserAvatarWrapper = styled(motion.button)`
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  position: relative;
  border-radius: 99em;
  overflow: hidden;
`;

const StyledImage = styled(Image)`
  object-fit: cover;
`;

const UserDropdown = styled(motion.div)`
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  background: ${({ theme }) => theme.colors.backgrounds.default};
  border-radius: ${({ theme }) => theme.borders.radius};
  padding: 0.5rem;
  min-width: 200px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
`;

const UserDropdownItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: ${({ theme }) => `${theme.spacing.small} ${theme.spacing.medium}`};
  color: ${({ theme }) => theme.colors.text.primary};
  border-radius: ${({ theme }) => theme.borders.radius};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${({ theme }) => `${theme.colors.accent.primary}12`};
    color: ${({ theme }) => theme.colors.accent.primary};
  }
`;

const UserInfo = styled.div`
  padding: ${({ theme }) => `${theme.spacing.small} ${theme.spacing.medium}`};
  border-bottom: 1px solid ${({ theme }) => `${theme.colors.accent.primary}12`};
  margin-bottom: 0.5rem;
  text-align: left;
  
  p {
    margin: 0;
    font-size: 0.875rem;
    &.name {
      font-weight: 600;
      color: ${({ theme }) => theme.colors.text.primary};
    }
    &.email {
      color: ${({ theme }) => theme.colors.text.secondary};
    }
  }
`;

const LoginButton = styled(motion.button)`
  padding: ${({ theme }) => `${theme.spacing.small} ${theme.spacing.medium}`};
  background: ${({ theme }) => theme.colors.accent.primary};
  color: ${({ theme }) => theme.colors.basic.white};
  border: none;
  border-radius: 99em;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 2px 8px ${({ theme }) => `${theme.colors.accent.primary}20`};
  
  &:hover {
    background: ${({ theme }) => theme.colors.accent.light};
  }
`;

const LoadingSpinner = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.small};
`;

const UserButton: React.FC = () => {
  const { data: session, status } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { t } = useTranslation('common');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleSignOut = async () => {
    setIsDropdownOpen(false);
    await signOut();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (status === "loading") {
    return (
      <LoadingSpinner
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <Loader size={24} />
      </LoadingSpinner>
    );
  }

  return (
    <UserButtonWrapper>
      {session ? (
        <>
          <UserAvatarWrapper
            onClick={handleDropdownToggle}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            {session.user?.image ? (
              <StyledImage 
                src={session.user.image} 
                alt={session.user.name || 'User'} 
                fill
                sizes="2.5rem"
              />
            ) : (
              <User size={20} />
            )}
          </UserAvatarWrapper>
          <AnimatePresence>
            {isDropdownOpen && (
              <UserDropdown
                ref={dropdownRef}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <UserInfo>
                  <p className="name">{session.user?.name || 'User'}</p>
                  <p className="email">{session.user?.email}</p>
                </UserInfo>
                <Link href="/profile" passHref>
                  <UserDropdownItem onClick={() => setIsDropdownOpen(false)}>
                    <User size={18} />
                    {t('profile')}
                  </UserDropdownItem>
                </Link>
                <UserDropdownItem onClick={handleSignOut}>
                  <LogOut size={18} />
                  {t('signOut')}
                </UserDropdownItem>
              </UserDropdown>
            )}
          </AnimatePresence>
        </>
      ) : (
        <LoginButton
          onClick={handleLoginClick}
          whileHover={{ y: -2 }}
          whileTap={{ y: 0 }}
        >
          <User size={18} />
          {t('login')}
        </LoginButton>
      )}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </UserButtonWrapper>
  );
};

export default UserButton;