import Link from "next/link";
import type { ReactNode } from "react";
import styled from "styled-components";

import { AppConfig } from "@/utils/appConfig";

import { DM_Sans } from "next/font/google";
const titleFont = DM_Sans({ subsets: ["latin"], weight: ["700"] });

type IMainProps = {
    children: ReactNode;
};

const MainWrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    background-color: ${(props) => props.theme.backgroundColor};
`;

const AppBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 ${({ theme }) => theme.spacing};
    background-color: rgba(255, 255, 255, 1);
    backdrop-filter: blur(5px);
    color: ${({ theme }) => theme.accentPrimary};
    height: ${({ theme }) => theme.appBarHeight};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
`;

const Logo = styled.div`
    position: relative;
    width: 250px;
    height: 80px;
    cursor: pointer;
`;

const NavLinks = styled.ul`
    display: flex;
    font-size: ${({ theme }) => theme.fontSize};
    color: ${({ theme }) => theme.primaryColor};
    margin: 0;
    padding: 0;
`;

const NavLink = styled(Link)`
    text-decoration: none;
    color: ${({ theme }) => theme.primaryColor};
    margin-right: ${({ theme }) => theme.spacing};
    &:hover {
        color: ${({ theme }) => theme.accentColor};
    }
    &:visited {
        color: ${({ theme }) => theme.visitedColor};
    }
`;

const ContentWrapper = styled.div`
    padding-top: ${({ theme }) => theme.appBarHeight};
    width: 100%;
    font-size: ${({ theme }) => theme.fontSize};
    color: ${({ theme }) => theme.textColor};
    background-color: ${({ theme }) => theme.backgroundColor};
`;

const LogoImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
`;

const Main = (props: IMainProps) => {
    const user = null;
    return(
    <MainWrapper>
        <AppBar>
            <NavLink href="/">
                <Logo>
                    <LogoImage
                    src="/neuchatech_logo.webp"
                    alt={AppConfig.title}
                    />
                </Logo>
            </NavLink>
            <NavLinks>
                <NavLink href="/">Home</NavLink>
                <NavLink href="/profile/profile">{ user ? 'Profile' : 'Sign in' }</NavLink>
            </NavLinks>
        </AppBar>

        <ContentWrapper>{props.children}</ContentWrapper>
    </MainWrapper>
    )
};

export default Main;
