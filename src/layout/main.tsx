import React, { useEffect, useState } from "react";
import Link from "next/link";
import type { ReactNode } from "react";
import styled from "styled-components";
import { Montserrat } from "next/font/google";
import { AppConfig } from "@/utils/appConfig";

const montserrat = Montserrat({ 
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"]
});

type IMainProps = {
    children: ReactNode;
};

const MainWrapper = styled.div`
    width: 100vw;
    min-height: 100vh;
    background-color: ${(props) => props.theme.colors.backgrounds.default};
    font-family: ${montserrat.style.fontFamily};
    overflow-x: hidden;
`;

const AppBar = styled.header<{ scrolled: boolean }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 ${({ theme }) => theme.spacing.medium};
    background-color: ${(props) =>
        props.scrolled ? 'rgba(255, 255, 255, 1)' : 'transparent'};
    transition: background-color 0.3s ease;
    color: ${({ theme }) => theme.colors.text.primary};
    height: ${({ theme }) => theme.sizes.appBarHeight};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    
    @media (max-width: 768px) {
        padding: 0 ${({ theme }) => theme.spacing.small};
    }
`;

const Logo = styled.div<{ scrolled: boolean }>`
    position: relative;
    width: 150px;
    height: 50px;
    cursor: pointer;
    opacity: ${(props) => (props.scrolled ? 1 : 0)};
    transition: opacity 0.3s ease;
`;

const NavLinks = styled.nav<{ scrolled: boolean }>`
    display: flex;
    align-items: center;
    font-size: ${({ theme }) => theme.typography.fontSize};
    color: ${({ theme }) => theme.colors.text.primary};
    opacity: ${(props) => (props.scrolled ? 1 : 0)};
    transition: opacity 0.3s ease;
`;

const NavLink = styled(Link)`
    text-decoration: none;
    color: ${({ theme }) => theme.colors.text.primary};
    margin-left: ${({ theme }) => theme.spacing.medium};
    &:hover {
        color: ${({ theme }) => theme.colors.accent.primary};
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

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <MainWrapper className={montserrat.className}>
            <AppBar scrolled={scrolled}>
                <NavLink href="/">
                    <Logo scrolled={scrolled}>
                        <LogoImage
                            src="/neuchatech_logo.webp"
                            alt={AppConfig.title}
                        />
                    </Logo>
                </NavLink>
                <NavLinks scrolled={scrolled}>
                    <NavLink href="/">Accueil</NavLink>
                    <NavLink href="#services">Nos Services</NavLink>
                    <NavLink href="#contact">Contact</NavLink>
                </NavLinks>
            </AppBar>

            <ContentWrapper>{props.children}</ContentWrapper>
        </MainWrapper>
    );
};

export default Main;
