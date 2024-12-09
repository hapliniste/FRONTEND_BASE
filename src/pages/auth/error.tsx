import { useRouter } from 'next/router';
import styled from 'styled-components';
import Link from 'next/link';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 2rem;
  text-align: center;
`;

const ErrorTitle = styled.h1`
  color: ${({ theme }) => theme.colors.accent.primary};
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 2rem;
  max-width: 600px;
`;

const BackButton = styled(Link)`
  padding: ${({ theme }) => `${theme.spacing.small} ${theme.spacing.medium}`};
  background: ${({ theme }) => theme.colors.accent.primary};
  color: white;
  border-radius: 99em;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.accent.light};
    transform: translateY(-2px);
  }
`;

const AuthError = () => {
  const router = useRouter();
  const { error } = router.query;

  const getErrorMessage = (error: string) => {
    switch (error) {
      case 'Configuration':
        return 'There is a problem with the server configuration.';
      case 'AccessDenied':
        return 'Access was denied to this resource.';
      case 'Verification':
        return 'The verification token has expired or has already been used.';
      default:
        return 'An error occurred during authentication. Please try again.';
    }
  };

  return (
    <ErrorContainer>
      <ErrorTitle>Authentication Error</ErrorTitle>
      <ErrorMessage>
        {error ? getErrorMessage(error as string) : 'An unknown error occurred'}
      </ErrorMessage>
      <BackButton href="/">Back to Home</BackButton>
    </ErrorContainer>
  );
};

export default AuthError; 