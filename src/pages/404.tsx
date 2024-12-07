import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import styled from 'styled-components';
import Link from 'next/link';
import { motion } from 'framer-motion';

const ErrorContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.large};
  text-align: center;
`;

const ErrorTitle = styled(motion.h1)`
  font-size: 4rem;
  margin-bottom: ${props => props.theme.spacing.medium};
  color: ${props => props.theme.colors.text.primary};

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const ErrorMessage = styled(motion.p)`
  font-size: 1.2rem;
  margin-bottom: ${props => props.theme.spacing.large};
  color: ${props => props.theme.colors.text.secondary};
`;

const HomeButton = styled(motion.a)`
  padding: ${props => `${props.theme.spacing.medium} ${props.theme.spacing.large}`};
  background: ${props => props.theme.colors.accent.primary};
  color: white;
  border-radius: 999px;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.accent.light};
    transform: translateY(-2px);
  }
`;

const Custom404: NextPage = () => {
  return (
    <>
      <NextSeo
        title="Page non trouvée"
        noindex={true}
      />
      <ErrorContainer>
        <ErrorTitle
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          404
        </ErrorTitle>
        <ErrorMessage
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Oups ! Cette page n&apos;existe pas.
        </ErrorMessage>
        <Link href="/" passHref>
          <HomeButton
            as={motion.a}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Retour à l&apos;accueil
          </HomeButton>
        </Link>
      </ErrorContainer>
    </>
  );
};

export default Custom404; 