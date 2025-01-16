import React from 'react';
import styled from 'styled-components';
import { 
  // Current Service Icons
  Desktop, Code, Robot, Cloud,
  // Alternative Service Icons
  Globe, Browser, Monitor, Wind,
  BracketsCurly, Terminal, FileCode, CodeSimple,
  Brain, Cpu, Microphone,
  CloudArrowUp, Database, HardDrives,
  
  // Current Process Icons
  CheckCircle, Target, RocketLaunch, Handshake,
  // Alternative Process Icons
  CircleWavyCheck, Checks, CheckSquare,
  ChatsCircle, ChatText, Chats, Users,
  TerminalWindow, CodeBlock, GitBranch, GitFork,
  Rocket, ArrowLineUpRight, Upload, CloudArrowUp as CloudUp,
  UsersThree, UsersFour, UserPlus, Heart,
  
  // Current Values Icons
  LockOpen, PiggyBank,
  // Alternative Values Icons
  ShieldCheck, ShieldStar, UserCircle, UsersThree as UsersThreeAlt,
  Lightning, Lightbulb, Sparkle, Star,
  Stack, StackSimple, Cube, Package,
  Key, Lock, ShieldPlus, UserGear,
  Wallet, Bank, CurrencyCircleDollar, Money
} from '@phosphor-icons/react';

const Page = styled.div`
  padding: ${({theme}) => theme.spacing.large};
  max-width: 1200px;
  margin: 0 auto;
`;

const Section = styled.section`
  margin-bottom: ${({theme}) => theme.spacing.xlarge};
`;

const SectionTitle = styled.h2`
  font-family: ${({theme}) => theme.typography.titleFontFamily};
  font-size: 2rem;
  margin-bottom: ${({theme}) => theme.spacing.large};
  color: ${({theme}) => theme.colors.text.primary};
`;

const SubSection = styled.div`
  margin-bottom: ${({theme}) => theme.spacing.large};
`;

const SubSectionTitle = styled.h3`
  font-family: ${({theme}) => theme.typography.headingFontFamily};
  font-size: 1.5rem;
  margin-bottom: ${({theme}) => theme.spacing.medium};
  color: ${({theme}) => theme.colors.text.primary};
`;

const IconGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: ${({theme}) => theme.spacing.medium};
  background: ${({theme}) => theme.colors.backgrounds.white};
  padding: ${({theme}) => theme.spacing.medium};
  border-radius: ${({theme}) => theme.borders.radius};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({theme}) => theme.spacing.small};
  padding: ${({theme}) => theme.spacing.medium};
  border-radius: ${({theme}) => theme.borders.radius};
  background: ${({theme}) => `${theme.colors.accent.primary}08`};
  
  svg {
    color: ${({theme}) => theme.colors.text.primary};
    
    [opacity="0.2"] {
      opacity: 0.2;
      fill: ${({theme}) => theme.colors.accent.primary};
    }
  }
`;

const IconLabel = styled.span`
  font-size: 0.8rem;
  text-align: center;
  color: ${({theme}) => theme.colors.text.secondary};
`;

const CurrentIcon = styled.div`
  position: relative;
  
  &::after {
    content: 'Current';
    position: absolute;
    top: -0.5rem;
    right: -0.5rem;
    background: ${({theme}) => theme.colors.accent.primary};
    color: white;
    font-size: 0.6rem;
    padding: 0.2rem 0.4rem;
    border-radius: 0.25rem;
  }
`;

const TestPage = () => {
  return (
    <Page>
      <SectionTitle>Icon Test Page</SectionTitle>
      
      <Section>
        <SubSection>
          <SubSectionTitle>Services - Site Standard</SubSectionTitle>
          <IconGrid>
            <IconWrapper>
              <CurrentIcon>
                <Desktop size={32} weight="duotone" />
              </CurrentIcon>
              <IconLabel>Desktop</IconLabel>
            </IconWrapper>
            <IconWrapper>
              <Globe size={32} weight="duotone" />
              <IconLabel>Globe</IconLabel>
            </IconWrapper>
            <IconWrapper>
              <Browser size={32} weight="duotone" />
              <IconLabel>Browser</IconLabel>
            </IconWrapper>
            <IconWrapper>
              <Monitor size={32} weight="duotone" />
              <IconLabel>Monitor</IconLabel>
            </IconWrapper>
            <IconWrapper>
              <Wind size={32} weight="duotone" />
              <IconLabel>Wind</IconLabel>
            </IconWrapper>
          </IconGrid>
        </SubSection>

        <SubSection>
          <SubSectionTitle>Services - Développement sur mesure</SubSectionTitle>
          <IconGrid>
            <IconWrapper>
              <CurrentIcon>
                <Code size={32} weight="duotone" />
              </CurrentIcon>
              <IconLabel>Code</IconLabel>
            </IconWrapper>
            <IconWrapper>
              <BracketsCurly size={32} weight="duotone" />
              <IconLabel>BracketsCurly</IconLabel>
            </IconWrapper>
            <IconWrapper>
              <Terminal size={32} weight="duotone" />
              <IconLabel>Terminal</IconLabel>
            </IconWrapper>
            <IconWrapper>
              <FileCode size={32} weight="duotone" />
              <IconLabel>FileCode</IconLabel>
            </IconWrapper>
            <IconWrapper>
              <CodeSimple size={32} weight="duotone" />
              <IconLabel>CodeSimple</IconLabel>
            </IconWrapper>
          </IconGrid>
        </SubSection>

        <SubSection>
          <SubSectionTitle>Services - Assistant IA</SubSectionTitle>
          <IconGrid>
            <IconWrapper>
              <CurrentIcon>
                <Robot size={32} weight="duotone" />
              </CurrentIcon>
              <IconLabel>Robot</IconLabel>
            </IconWrapper>
            <IconWrapper>
              <Brain size={32} weight="duotone" />
              <IconLabel>Brain</IconLabel>
            </IconWrapper>
            <IconWrapper>
              <Cpu size={32} weight="duotone" />
              <IconLabel>Cpu</IconLabel>
            </IconWrapper>
            <IconWrapper>
              <Microphone size={32} weight="duotone" />
              <IconLabel>Microphone</IconLabel>
            </IconWrapper>
          </IconGrid>
        </SubSection>

        <SubSection>
          <SubSectionTitle>Services - Hébergement web</SubSectionTitle>
          <IconGrid>
            <IconWrapper>
              <CurrentIcon>
                <Cloud size={32} weight="duotone" />
              </CurrentIcon>
              <IconLabel>Cloud</IconLabel>
            </IconWrapper>
            <IconWrapper>
              <CloudArrowUp size={32} weight="duotone" />
              <IconLabel>CloudArrowUp</IconLabel>
            </IconWrapper>
            <IconWrapper>
              <Database size={32} weight="duotone" />
              <IconLabel>Database</IconLabel>
            </IconWrapper>
            <IconWrapper>
              <HardDrives size={32} weight="duotone" />
              <IconLabel>HardDrives</IconLabel>
            </IconWrapper>
          </IconGrid>
        </SubSection>
      </Section>

      <Section>
        <SubSection>
          <SubSectionTitle>Process - Vous Nous Avez Trouvés</SubSectionTitle>
          <IconGrid>
            <IconWrapper>
              <CurrentIcon>
                <CheckCircle size={32} weight="duotone" />
              </CurrentIcon>
              <IconLabel>CheckCircle</IconLabel>
            </IconWrapper>
            <IconWrapper>
              <CircleWavyCheck size={32} weight="duotone" />
              <IconLabel>CircleWavyCheck</IconLabel>
            </IconWrapper>
            <IconWrapper>
              <Checks size={32} weight="duotone" />
              <IconLabel>Checks</IconLabel>
            </IconWrapper>
            <IconWrapper>
              <CheckSquare size={32} weight="duotone" />
              <IconLabel>CheckSquare</IconLabel>
            </IconWrapper>
          </IconGrid>
        </SubSection>

        <SubSection>
          <SubSectionTitle>Process - Discutons et Visualisons</SubSectionTitle>
          <IconGrid>
            <IconWrapper>
              <CurrentIcon>
                <Target size={32} weight="duotone" />
              </CurrentIcon>
              <IconLabel>Target</IconLabel>
            </IconWrapper>
            <IconWrapper>
              <ChatsCircle size={32} weight="duotone" />
              <IconLabel>ChatsCircle</IconLabel>
            </IconWrapper>
            <IconWrapper>
              <ChatText size={32} weight="duotone" />
              <IconLabel>ChatText</IconLabel>
            </IconWrapper>
            <IconWrapper>
              <Users size={32} weight="duotone" />
              <IconLabel>Users</IconLabel>
            </IconWrapper>
          </IconGrid>
        </SubSection>

        <SubSection>
          <SubSectionTitle>Process - Développement</SubSectionTitle>
          <IconGrid>
            <IconWrapper>
              <CurrentIcon>
                <Code size={32} weight="duotone" />
              </CurrentIcon>
              <IconLabel>Code</IconLabel>
            </IconWrapper>
            <IconWrapper>
              <TerminalWindow size={32} weight="duotone" />
              <IconLabel>TerminalWindow</IconLabel>
            </IconWrapper>
            <IconWrapper>
              <CodeBlock size={32} weight="duotone" />
              <IconLabel>CodeBlock</IconLabel>
            </IconWrapper>
            <IconWrapper>
              <GitBranch size={32} weight="duotone" />
              <IconLabel>GitBranch</IconLabel>
            </IconWrapper>
            <IconWrapper>
              <GitFork size={32} weight="duotone" />
              <IconLabel>GitFork</IconLabel>
            </IconWrapper>
          </IconGrid>
        </SubSection>

        <SubSection>
          <SubSectionTitle>Process - Validation et Déploiement</SubSectionTitle>
          <IconGrid>
            <IconWrapper>
              <CurrentIcon>
                <RocketLaunch size={32} weight="duotone" />
              </CurrentIcon>
              <IconLabel>RocketLaunch</IconLabel>
            </IconWrapper>
            <IconWrapper>
              <Rocket size={32} weight="duotone" />
              <IconLabel>Rocket</IconLabel>
            </IconWrapper>
            <IconWrapper>
              <ArrowLineUpRight size={32} weight="duotone" />
              <IconLabel>ArrowLineUpRight</IconLabel>
            </IconWrapper>
            <IconWrapper>
              <Upload size={32} weight="duotone" />
              <IconLabel>Upload</IconLabel>
            </IconWrapper>
            <IconWrapper>
              <CloudUp size={32} weight="duotone" />
              <IconLabel>CloudArrowUp</IconLabel>
            </IconWrapper>
          </IconGrid>
        </SubSection>

        <SubSection>
          <SubSectionTitle>Process - Accompagnement Long Terme</SubSectionTitle>
          <IconGrid>
            <IconWrapper>
              <CurrentIcon>
                <Handshake size={32} weight="duotone" />
              </CurrentIcon>
              <IconLabel>Handshake</IconLabel>
            </IconWrapper>
            <IconWrapper>
              <UsersThree size={32} weight="duotone" />
              <IconLabel>UsersThree</IconLabel>
            </IconWrapper>
            <IconWrapper>
              <UsersFour size={32} weight="duotone" />
              <IconLabel>UsersFour</IconLabel>
            </IconWrapper>
            <IconWrapper>
              <UserPlus size={32} weight="duotone" />
              <IconLabel>UserPlus</IconLabel>
            </IconWrapper>
            <IconWrapper>
              <Heart size={32} weight="duotone" />
              <IconLabel>Heart</IconLabel>
            </IconWrapper>
          </IconGrid>
        </SubSection>
      </Section>

      <Section>
        <SubSection>
          <SubSectionTitle>Values - Relation de confiance</SubSectionTitle>
          <IconGrid>
            <IconWrapper>
              <CurrentIcon>
                <Handshake size={32} weight="duotone" />
              </CurrentIcon>
              <IconLabel>Handshake</IconLabel>
            </IconWrapper>
            <IconWrapper>
              <ShieldCheck size={32} weight="duotone" />
              <IconLabel>ShieldCheck</IconLabel>
            </IconWrapper>
            <IconWrapper>
              <ShieldStar size={32} weight="duotone" />
              <IconLabel>ShieldStar</IconLabel>
            </IconWrapper>
            <IconWrapper>
              <UserCircle size={32} weight="duotone" />
              <IconLabel>UserCircle</IconLabel>
            </IconWrapper>
            <IconWrapper>
              <UsersThreeAlt size={32} weight="duotone" />
              <IconLabel>UsersThree</IconLabel>
            </IconWrapper>
          </IconGrid>
        </SubSection>

        <SubSection>
          <SubSectionTitle>Values - Rapidité et simplicité</SubSectionTitle>
          <IconGrid>
            <IconWrapper>
              <CurrentIcon>
                <Rocket size={32} weight="duotone" />
              </CurrentIcon>
              <IconLabel>Rocket</IconLabel>
            </IconWrapper>
            <IconWrapper>
              <Lightning size={32} weight="duotone" />
              <IconLabel>Lightning</IconLabel>
            </IconWrapper>
            <IconWrapper>
              <Lightbulb size={32} weight="duotone" />
              <IconLabel>Lightbulb</IconLabel>
            </IconWrapper>
            <IconWrapper>
              <Sparkle size={32} weight="duotone" />
              <IconLabel>Sparkle</IconLabel>
            </IconWrapper>
            <IconWrapper>
              <Star size={32} weight="duotone" />
              <IconLabel>Star</IconLabel>
            </IconWrapper>
          </IconGrid>
        </SubSection>

        <SubSection>
          <SubSectionTitle>Values - Technologies solides</SubSectionTitle>
          <IconGrid>
            <IconWrapper>
              <CurrentIcon>
                <Code size={32} weight="duotone" />
              </CurrentIcon>
              <IconLabel>Code</IconLabel>
            </IconWrapper>
            <IconWrapper>
              <Stack size={32} weight="duotone" />
              <IconLabel>Stack</IconLabel>
            </IconWrapper>
            <IconWrapper>
              <StackSimple size={32} weight="duotone" />
              <IconLabel>StackSimple</IconLabel>
            </IconWrapper>
            <IconWrapper>
              <Cube size={32} weight="duotone" />
              <IconLabel>Cube</IconLabel>
            </IconWrapper>
            <IconWrapper>
              <Package size={32} weight="duotone" />
              <IconLabel>Package</IconLabel>
            </IconWrapper>
          </IconGrid>
        </SubSection>

        <SubSection>
          <SubSectionTitle>Values - Votre projet vous appartient</SubSectionTitle>
          <IconGrid>
            <IconWrapper>
              <CurrentIcon>
                <LockOpen size={32} weight="duotone" />
              </CurrentIcon>
              <IconLabel>LockOpen</IconLabel>
            </IconWrapper>
            <IconWrapper>
              <Key size={32} weight="duotone" />
              <IconLabel>Key</IconLabel>
            </IconWrapper>
            <IconWrapper>
              <Lock size={32} weight="duotone" />
              <IconLabel>Lock</IconLabel>
            </IconWrapper>
            <IconWrapper>
              <ShieldPlus size={32} weight="duotone" />
              <IconLabel>ShieldPlus</IconLabel>
            </IconWrapper>
            <IconWrapper>
              <UserGear size={32} weight="duotone" />
              <IconLabel>UserGear</IconLabel>
            </IconWrapper>
          </IconGrid>
        </SubSection>

        <SubSection>
          <SubSectionTitle>Values - Excellence à petit prix</SubSectionTitle>
          <IconGrid>
            <IconWrapper>
              <CurrentIcon>
                <PiggyBank size={32} weight="duotone" />
              </CurrentIcon>
              <IconLabel>PiggyBank</IconLabel>
            </IconWrapper>
            <IconWrapper>
              <Wallet size={32} weight="duotone" />
              <IconLabel>Wallet</IconLabel>
            </IconWrapper>
            <IconWrapper>
              <Bank size={32} weight="duotone" />
              <IconLabel>Bank</IconLabel>
            </IconWrapper>
            <IconWrapper>
              <CurrencyCircleDollar size={32} weight="duotone" />
              <IconLabel>CurrencyCircleDollar</IconLabel>
            </IconWrapper>
            <IconWrapper>
              <Money size={32} weight="duotone" />
              <IconLabel>Money</IconLabel>
            </IconWrapper>
          </IconGrid>
        </SubSection>
      </Section>
    </Page>
  );
};

export default TestPage; 