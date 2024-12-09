import { useSession, signIn, signOut } from 'next-auth/react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Github, LogOut, User } from 'lucide-react';
import { useTranslation } from 'next-i18next';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
`;

const WelcomeMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: 500;
`;

const UserAvatar = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 99em;
  object-fit: cover;
`;

const Button = styled(motion.button)<{ $variant?: 'primary' | 'secondary' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  border-radius: 99em;
  border: none;
  background: ${({ theme, $variant }) => 
    $variant === 'secondary' ? `${theme.colors.accent.primary}12` : '#24292e'};
  color: ${({ theme, $variant }) => 
    $variant === 'secondary' ? theme.colors.accent.primary : 'white'};
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    background: ${({ theme, $variant }) => 
      $variant === 'secondary' ? `${theme.colors.accent.primary}20` : '#2f363d'};
  }
`;

const LoginForm: React.FC = () => {
  const { data: session } = useSession();
  const { t } = useTranslation('common');

  if (session) {
    return (
      <LoginContainer>
        <WelcomeMessage>
          {session.user?.image ? (
            <UserAvatar src={session.user.image} alt={session.user.name || 'User'} />
          ) : (
            <User size={20} />
          )}
          {t('welcome')}, {session.user?.name}!
        </WelcomeMessage>
        <Button
          $variant="secondary"
          onClick={() => signOut()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <LogOut size={18} />
          {t('signOut')}
        </Button>
      </LoginContainer>
    );
  }

  return (
    <LoginContainer>
      <Button
        onClick={() => signIn('github')}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Github size={20} />
        {t('signInWithGithub')}
      </Button>
    </LoginContainer>
  );
};

export default LoginForm;
