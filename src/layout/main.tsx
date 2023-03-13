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
    height: 100%;
    position: fixed;
    overflow: hidden;
    background-color: ${(props) => props.theme.backgroundColor};
`;

const AppBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: ${({ theme }) => theme.spacing};
    background-color: ${({ theme }) => theme.secondaryColor};
    color: ${({ theme }) => theme.textColor};
    height: ${({ theme }) => theme.appBarHeight};
`;

const Logo = styled.div`
    font-size: 2em;
    font-weight: bold;
    color: ${({ theme }) => theme.primaryColor};
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

const MenuIcon = styled.div`
    font-size: 2rem;
`;

const ContentWrapper = styled.div`
    width: 100%;
    font-size: ${({ theme }) => theme.fontSize};
    color: ${({ theme }) => theme.textColor};
    background-color: ${({ theme }) => theme.backgroundColor};
`;

const FooterWrapper = styled.div`
    font-size: ${({ theme }) => theme.fontSize};
    text-align: center;
    color: ${({ theme }) => theme.textColor};
    background-color: ${({ theme }) => theme.backgroundColor};
`;

const Main = (props: IMainProps) => (
    <MainWrapper>
        <AppBar>
            <Logo className={titleFont.className}>{AppConfig.title}</Logo>
            <NavLinks>
                <NavLink href="/">Home</NavLink>
            </NavLinks>
        </AppBar>

        <ContentWrapper>{props.children}</ContentWrapper>

        {/*<FooterWrapper>
      © Copyright {new Date().getFullYear()} {AppConfig.title}.
</FooterWrapper>*/}
    </MainWrapper>
);

export { Main };
