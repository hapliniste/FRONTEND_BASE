import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import type { ReactNode } from "react";
import styled from "styled-components";
import { Montserrat } from "next/font/google";
import { AppConfig } from "@/utils/appConfig";
import { HamburgerMenu } from "@/components/library/hamburgerMenu";
import { motion } from 'framer-motion';
import BackToTop from '@/components/library/BackToTop';
import LocaleSwitcher from "@/components/layout/localeSwitcher/LocaleSwitcher";
import { useSession, signIn, signOut } from 'next-auth/react';
import { Github, LogOut, User, Wrench, Heart, MessageCircle } from 'lucide-react';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
//import { withTranslation } from "@/utils/withTranslation";

const montserrat = Montserrat({ 
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"]
});

type IMainProps = {
    children: ReactNode;
};

const MainWrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    background-color: ${(props) => props.theme.colors.backgrounds.default};
    font-family: ${montserrat.style.fontFamily};
    overflow-x: hidden;
`;

const AppBar = styled.header<{ scrolled: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: transparent;
    color: ${({ theme }) => theme.colors.text.primary};
    height: ${({ theme }) => theme.sizes.appBarHeight};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    padding: 0;
    margin: 0;
`;

const AppBarContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    max-width: ${({ theme }) => theme.sizes.maxWidth};
    padding: 0 ${({ theme }) => theme.spacing.small};
    margin: 0;
    
    @media (min-width: 769px) {
        padding: 0 ${({ theme }) => theme.spacing.medium};
    }
`;

const Logo = styled.div<{ scrolled: boolean }>`
    position: relative;
    width: 16em;
    height: 3em;
    cursor: pointer;
    opacity: ${(props) => (props.scrolled ? 1 : 0)};
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 768px) {
        display: none;
    }
`;

const LogoImage = styled.img<{ scrolled: boolean }>`
    position: relative;
    height: 3em;
    cursor: pointer;
    opacity: ${(props) => (props.scrolled ? 1 : 0)};
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
    transition: all 0.2s ease;

    &:hover {
        background-color: ${({ theme }) => theme.colors.accent.light};
        transform: translateY(-1px);
        box-shadow: 0 4px 12px ${({ theme }) => `${theme.colors.accent.primary}30`};
    }

    @media (max-width: 768px) {
        display: none;
    }
`;

const NavLinks = styled.nav<{ scrolled: boolean }>`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.medium};
    font-size: ${({ theme }) => theme.typography.fontSize};
    color: ${({ theme }) => theme.colors.text.primary};
    opacity: ${(props) => (props.scrolled ? 1 : 0)};
    transition: opacity 0.3s ease;
    
    @media (max-width: 768px) {
        display: none;
    }
`;

const NavSection = styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.medium};
    background-color: ${({ theme }) => theme.colors.backgrounds.white};
    padding: ${({ theme }) => `${theme.spacing.small} ${theme.spacing.medium}`};
    border-radius: 99em;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

    @media (max-width: 768px) {
        > button:last-child {
            display: none;
        }
    }
`;

const NavDivider = styled.div`
    width: 1px;
    height: 24px;
    background: ${({ theme }) => `${theme.colors.accent.primary}12`};
    margin: 0 ${({ theme }) => theme.spacing.small};
`;

const UserAvatar = styled.img`
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 99em;
    object-fit: cover;
`;

const MobileMenuWrapper = styled.div`
    @media (max-width: 768px) {
        display: flex;
        align-items: center;
        gap: ${({ theme }) => theme.spacing.small};
    }
    @media (min-width: 769px) {
        display: none;
    }
`;

const MobileAvatar = styled(UserAvatar)`
    cursor: default;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: ${({ theme }) => theme.colors.text.primary};
    transition: color 0.2s ease;

    &:hover {
        color: ${({ theme }) => theme.colors.accent.primary};
    }
`;

const NavButton = styled(motion.button)`
    padding: ${({ theme }) => `${theme.spacing.small} ${theme.spacing.medium}`};
    border: none;
    border-radius: 99em;
    background-color: ${({ theme }) => theme.colors.accent.primary};
    color: white;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 2px 8px ${({ theme }) => `${theme.colors.accent.primary}20`};
    
    &:hover {
        background-color: ${({ theme }) => theme.colors.accent.light};
        transform: translateY(-1px);
        box-shadow: 0 4px 12px ${({ theme }) => `${theme.colors.accent.primary}30`};
    }

    @media (max-width: 768px) {
        display: none;
    }

    transition: all 0.2s ease;
`;

const ContentWrapper = styled.div`
    width: 100%;
    margin: 0;
    padding: 0;
    font-size: ${({ theme }) => theme.typography.fontSize};
    color: ${({ theme }) => theme.colors.text.primary};
    background: ${(props) => props.theme.colors.backgrounds.default};
`;

const NavLink = styled(motion.a)`
    color: ${props => props.theme.colors.text.primary};
    text-decoration: none;
    padding: ${props => `${props.theme.spacing.small} ${props.theme.spacing.medium}`};
    border-radius: ${props => props.theme.borders.radius};
    transition: all 0.2s ease;
    position: relative;

    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 0;
        height: 2px;
        background: ${props => props.theme.colors.accent.primary};
        transition: all 0.3s ease;
        transform: translateX(-50%);
    }

    &:hover::after {
        width: 80%;
    }
`;

const NavActionButton = styled(motion.button)`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: ${({ theme }) => `${theme.spacing.small} ${theme.spacing.medium}`};
    border: none;
    border-radius: 99em;
    background: ${({ theme }) => `${theme.colors.accent.primary}12`};
    color: ${({ theme }) => theme.colors.text.primary};
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.2s ease;
    height: 2.5rem;
    min-width: 2.5rem;

    &:hover {
        background: ${({ theme }) => `${theme.colors.accent.primary}20`};
    }

    @media (max-width: 768px) {
        padding: ${({ theme }) => theme.spacing.small};
        span {
            display: none;
        }
    }
`;

const UserSection = styled(motion.button)`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: ${({ theme }) => `${theme.spacing.small} ${theme.spacing.medium}`};
    border: none;
    border-radius: 99em;
    background: ${({ theme }) => `${theme.colors.accent.primary}12`};
    color: ${({ theme }) => theme.colors.text.primary};
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.2s ease;
    height: 2.5rem;

    &:hover {
        background: ${({ theme }) => `${theme.colors.accent.primary}20`};
    }

    @media (max-width: 768px) {
        display: none;
    }
`;

const UserMenuWrapper = styled.div`
    position: relative;
    display: inline-block;
`;

const UserDropdownContainer = styled.div`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: calc(100% + 0.5rem);
    z-index: 1000;
`;

const UserDropdown = styled(motion.div)`
    background: ${({ theme }) => theme.colors.backgrounds.default};
    border-radius: 1.25rem;
    padding: ${({ theme }) => theme.spacing.small};
    min-width: 200px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
`;

const UserMenuItem = styled(motion.div)`
    padding: ${({ theme }) => `${theme.spacing.small} ${theme.spacing.medium}`};
    cursor: pointer;
    text-align: left;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: ${({ theme }) => theme.colors.text.primary};
    border-radius: 0.75rem;
    transition: all 0.2s ease;
    white-space: nowrap;
    font-size: 1rem;
    
    &:hover {
        background: ${({ theme }) => `${theme.colors.accent.primary}10`};
        color: ${({ theme }) => theme.colors.accent.primary};
    }
`;

const UserMenuHeader = styled.div`
    padding: ${({ theme }) => `${theme.spacing.small} ${theme.spacing.medium}`};
    border-bottom: 1px solid ${({ theme }) => `${theme.colors.borders.color}20`};
    margin-bottom: ${({ theme }) => theme.spacing.small};
    color: ${({ theme }) => theme.colors.text.secondary};
    font-size: 0.9rem;
`;

const UserName = styled.span`
    color: ${({ theme }) => theme.colors.text.primary};
    font-size: 0.9rem;
    font-weight: 500;

    @media (max-width: 768px) {
        display: none;
    }
`;

const Main = (props: IMainProps) => {
    const [scrolled, setScrolled] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const { data: session } = useSession();
    const router = useRouter();
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const userMenuRef = useRef<HTMLDivElement>(null);
    const userButtonRef = useRef<HTMLButtonElement>(null);

    const navigationLinks = [
        { 
            href: '/#services', 
            label: 'Services',
            icon: <Wrench size={18} />
        },
        { 
            href: '/#valeurs', 
            label: 'Notre Approche',
            icon: <Heart size={18} />
        },
        { 
            href: '/#contact', 
            label: 'Nous Contacter',
            icon: <MessageCircle size={18} />
        }
    ];

    const userLinks = session ? [
        { 
            href: '/profile',
            label: `Profile (${session.user?.name})`,
            icon: session.user?.image ? 
                <UserAvatar src={session.user.image} alt={session.user?.name || 'User'} /> :
                <User size={18} />
        },
        { 
            label: 'Sign Out',
            icon: <LogOut size={18} />,
            onClick: () => signOut()
        }
    ] : [
        { 
            label: 'Sign In',
            icon: <Github size={18} />,
            onClick: () => signIn('github')
        }
    ];

    useEffect(() => {
        setIsMounted(true);
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                userMenuRef.current &&
                userButtonRef.current &&
                !userMenuRef.current.contains(event.target as Node) &&
                !userButtonRef.current.contains(event.target as Node)
            ) {
                setIsUserMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (!isMounted) {
        return (
            <MainWrapper className={montserrat.className}>
                <AppBar scrolled={false}>
                    <AppBarContent>
                        <StyledLink href="/">
                            <Logo scrolled={false}>
                                <LogoImage
                                    scrolled={false}
                                    src="/neuchatech_logo.webp"
                                    alt={AppConfig.title}
                                />
                            </Logo>
                        </StyledLink>
                    </AppBarContent>
                </AppBar>
                <ContentWrapper>{props.children}</ContentWrapper>
            </MainWrapper>
        );
    }

    return (
        <MainWrapper className={montserrat.className}>
            <AppBar scrolled={scrolled}>
                <AppBarContent>
                    <StyledLink href="/">
                        <LogoImage
                            scrolled={scrolled}
                            src="/neuchatech_logo.webp"
                            alt={AppConfig.title}
                        />
                    </StyledLink>
                    <NavLinks scrolled={scrolled}>
                        <NavSection>
                            <NavLink
                                as={motion.a}
                                href="/#services"
                                whileHover={{ y: -2 }}
                                whileTap={{ y: 0 }}
                            >
                                Services
                            </NavLink>
                            <NavLink
                                as={motion.a}
                                href="/#valeurs"
                                whileHover={{ y: -2 }}
                                whileTap={{ y: 0 }}
                            >
                                Notre Approche
                            </NavLink>
                            <NavDivider />
                            <LocaleSwitcher />
                            {session ? (
                                <UserMenuWrapper ref={userMenuRef}>
                                    <UserSection
                                        ref={userButtonRef}
                                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {session.user?.image ? (
                                            <UserAvatar src={session.user.image} alt={session.user.name || 'User'} />
                                        ) : (
                                            <User size={18} />
                                        )}
                                        <span>{session.user?.name}</span>
                                    </UserSection>
                                    <AnimatePresence>
                                        {isUserMenuOpen && (
                                            <UserDropdownContainer>
                                                <UserDropdown
                                                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <UserMenuHeader>
                                                        Signed in as {session.user?.email}
                                                    </UserMenuHeader>
                                                    <UserMenuItem
                                                        onClick={() => {
                                                            router.push('/profile');
                                                            setIsUserMenuOpen(false);
                                                        }}
                                                        whileHover={{ x: 4 }}
                                                    >
                                                        <User size={18} />
                                                        Your Profile
                                                    </UserMenuItem>
                                                    <UserMenuItem
                                                        onClick={() => {
                                                            signOut();
                                                            setIsUserMenuOpen(false);
                                                        }}
                                                        whileHover={{ x: 4 }}
                                                    >
                                                        <LogOut size={18} />
                                                        Sign Out
                                                    </UserMenuItem>
                                                </UserDropdown>
                                            </UserDropdownContainer>
                                        )}
                                    </AnimatePresence>
                                </UserMenuWrapper>
                            ) : (
                                <NavActionButton
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => signIn('github')}
                                >
                                    <Github size={18} />
                                    <span>Login</span>
                                </NavActionButton>
                            )}
                            <NavButton
                                as={motion.button}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => window.location.href = '/#contact'}
                            >
                                Nous Contacter
                            </NavButton>
                        </NavSection>
                    </NavLinks>
                    <MobileMenuWrapper>
                        <LocaleSwitcher />
                        <HamburgerMenu links={[...navigationLinks, ...userLinks]} />
                    </MobileMenuWrapper>
                </AppBarContent>
            </AppBar>
            <ContentWrapper>{props.children}</ContentWrapper>
            <BackToTop />
        </MainWrapper>
    );
};

export default Main;

//export const getStaticProps = withTranslation(['common']);