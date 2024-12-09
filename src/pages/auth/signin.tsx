import { GetServerSideProps } from 'next';
import { getProviders, signIn } from 'next-auth/react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Github, Mail, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 2rem;
  text-align: center;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 2rem;
`;

const ProvidersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 300px;
`;

const ProviderButton = styled(motion.button)<{ $provider: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  border-radius: 99em;
  border: none;
  background: ${({ theme, $provider }) => 
    $provider === 'github' ? '#24292e' : 
    $provider === 'google' ? '#4285f4' : 
    theme.colors.accent.primary};
  color: white;
  cursor: pointer;
  font-size: 1rem;
  width: 100%;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const BackLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
  text-decoration: none;
  margin-top: 2rem;
  padding: 0.5rem 1rem;
  border-radius: 99em;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => `${theme.colors.accent.primary}12`};
    color: ${({ theme }) => theme.colors.accent.primary};
  }
`;

interface SignInProps {
  providers: Awaited<ReturnType<typeof getProviders>>;
}

export default function SignIn({ providers }: SignInProps) {
  return (
    <SignInContainer>
      <Title>Sign in to your account</Title>
      <ProvidersContainer>
        {providers?.github && (
          <ProviderButton
            $provider="github"
            onClick={() => signIn('github')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Github size={20} />
            Sign in with GitHub
          </ProviderButton>
        )}
        {providers?.google && (
          <ProviderButton
            $provider="google"
            onClick={() => signIn('google')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Mail size={20} />
            Sign in with Google
          </ProviderButton>
        )}
      </ProvidersContainer>
      <BackLink href="/">
        <ArrowLeft size={18} />
        Back to Home
      </BackLink>
    </SignInContainer>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}; 