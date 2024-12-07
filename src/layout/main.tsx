import React, { useEffect, useState } from "react";
import Link from "next/link";
import type { ReactNode } from "react";
import styled from "styled-components";
import { Montserrat } from "next/font/google";
import { AppConfig } from "@/utils/appConfig";
import { HamburgerMenu } from "@/components/library/hamburgerMenu";
import { motion } from 'framer-motion';

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
    //height: 2em;
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.medium};
    background-color: ${({ theme }) => `${theme.colors.backgrounds.default}`};
    padding: ${({ theme }) => `${theme.spacing.small} ${theme.spacing.medium}`};
    border-radius: 99em;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const MobileMenuWrapper = styled.div`
    @media (max-width: 768px) {
        display: flex;
        align-items: center;
        margin-right: ${({ theme }) => theme.spacing.medium};
    }
    @media (min-width: 769px) {
        display: none;
    }
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: ${({ theme }) => theme.colors.text.primary};
    transition: color 0.2s ease;

    &:hover {
        color: ${({ theme }) => theme.colors.accent.primary};
    }
`;

const NavButton = styled.button`
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


const Main = (props: IMainProps) => {
    const [scrolled, setScrolled] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    const navigationLinks = [
        { href: '/#services', label: 'Services' },
        { href: '/#valeurs', label: 'Notre Approche' },
        { href: '/#contact', label: 'Nous Contacter' }
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

    if (!isMounted) {
        return (
            <MainWrapper className={montserrat.className}>
                <AppBar scrolled={false}>
                    <AppBarContent>
                        <StyledLink href="/">
                            <Logo scrolled={false}>
                                <LogoImage
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
                        {/*<Logo scrolled={scrolled}>*/}
                            <LogoImage
                                scrolled={scrolled}
                                src="/neuchatech_logo.webp"
                                alt={AppConfig.title}
                            />
                        {/*</Logo>*/}
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
                        <HamburgerMenu links={navigationLinks} />
                    </MobileMenuWrapper>
                </AppBarContent>
            </AppBar>
            <ContentWrapper>{props.children}</ContentWrapper>
        </MainWrapper>
    );
};

export default Main;
