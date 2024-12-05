import React, { useEffect, useState } from "react";
import Link from "next/link";
import type { ReactNode } from "react";
import styled from "styled-components";
import { Montserrat } from "next/font/google";
import { AppConfig } from "@/utils/appConfig";
import { HamburgerMenu } from "@/components/library/hamburgerMenu";

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
    background-color: ${({theme, scrolled}) =>
        scrolled ? theme.colors.backgrounds.default : 'transparent'};
    transition: background-color 0.3s ease;
    color: ${({ theme }) => theme.colors.text.primary};
    height: ${({ theme }) => theme.sizes.appBarHeight};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    padding: 0;
    margin: 0;
    //background-color: green;
`;

const AppBarContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    max-width: ${({ theme }) => theme.sizes.maxWidth};
    padding: 0;
    margin: 0;

    //background-color: red;
    
    @media (max-width: 768px) {
        padding: 0 ${({ theme }) => theme.spacing.small};
    }
`;

const Logo = styled.div<{ scrolled: boolean }>`
    position: relative;
    width: 16em;//240px;
    //height: 100%;//60px;
    cursor: pointer;
    opacity: ${(props) => (props.scrolled ? 1 : 0)};
    transition: opacity 0.3s ease;
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
    //background-color: green;
`;

const NavSection = styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.large};

    //background-color: pink;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: ${({ theme }) => theme.colors.text.primary};
    &:hover {
        color: ${({ theme }) => theme.colors.accent.primary};
    }
`;

const NavButton = styled.button`
    padding: ${({ theme }) => `${theme.spacing.small} ${theme.spacing.medium}`};
    border: none;
    border-radius: 99em;//4px;
    background-color: ${({ theme }) => theme.colors.accent.primary};
    color: white;
    cursor: pointer;
    transition: background-color 0.2s ease;
    
    &:hover {
        background-color: ${({ theme }) => theme.colors.accent.secondary};
    }
`;

const ContentWrapper = styled.div`
    width: 100%;
    margin: 0;
    padding: 0;
    font-size: ${({ theme }) => theme.typography.fontSize};
    color: ${({ theme }) => theme.colors.text.primary};
    background: ${(props) => props.theme.colors.backgrounds.default};
`;

const LogoImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
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
                        <Logo scrolled={scrolled}>
                            <LogoImage
                                src="/neuchatech_logo.webp"
                                alt={AppConfig.title}
                            />
                        </Logo>
                    </StyledLink>
                    <NavLinks scrolled={scrolled}>
                        <NavSection>
                            <StyledLink href="/#services">
                                Services
                            </StyledLink>
                            <StyledLink href="/#valeurs">
                                Notre Approche
                            </StyledLink>
                            <NavButton onClick={() => window.location.href = '/#contact'}>
                                Nous Contacter
                            </NavButton>
                        </NavSection>
                    </NavLinks>
                    <HamburgerMenu links={navigationLinks} />
                </AppBarContent>
            </AppBar>
            <ContentWrapper>{props.children}</ContentWrapper>
        </MainWrapper>
    );
};

export default Main;
