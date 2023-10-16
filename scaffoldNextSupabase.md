# Scaffolding of a new NextJS, Styled-components, Supabase app

```
npx create-next-app@latest
npm i styled-components @supabase/supabase-js normalize.css uuid
npm install jest @types/jest ts-jest jest-styled-components @types/styled-components @types/uuid --save-dev
```

next.config.js : 
```
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['qunxvqdqkghdgzswtsxv.supabase.co'],
  },
  compiler: {
    styledComponents: {
      displayName: true,
      ssr: true
    }
  }
}

module.exports = nextConfig
```

.env.local : 
```
NEXT_PUBLIC_SUPABASE_URL=https://qunxvqdqkghdgzswtsxv.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1bnh2cWRxa2doZGd6c3d0c3h2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3NDQxNjc3NiwiZXhwIjoxOTg5OTkyNzc2fQ.cu9ICttRksB3glGXeU86s6GdGYLdKxY-tsBYpQY5XSY
```

tsconfig.json : 
```
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": false,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/public/*": ["./public/*"],
      "@/styles/*": ["./styles/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

src/pages/_app.tsx : 
```
//import '@/styles/globals.css'
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";

//import '@/styles/styleReset.css';
import 'normalize.css/normalize.css';

import { Main } from "@/layout/main";

import { lightTheme, darkTheme } from "@/styles/theme";

export default function App({ Component, pageProps }: AppProps) {
  const [currentTheme, setCurrentTheme] = useState(lightTheme);
  useEffect(() => {
    const isDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setCurrentTheme(isDarkMode ? darkTheme : lightTheme);
    console.log("Current prefered theme is: " + isDarkMode);
  }, []);

  return (
    <ThemeProvider theme={currentTheme}>
      <Main>
        <Component {...pageProps} />
      </Main>
    </ThemeProvider>
  );
}
```

src/pages/_document.tsx : 
```
import { Html, Head, Main, NextScript } from 'next/document'
import Document, { DocumentContext } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: [initialProps.styles, sheet.getStyleElement()],
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta name="google-site-verification" content="t_tSSM8BhfbE7QXWTabn4bn9TqvSjYUEUPwvMOEJNMM" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
```





theme.ts : 
```
const baseTheme = {
    primaryColor: "#e31a44",
    secondaryColor: "#07151f",
    backgroundColor: "#ebf6f8",
    cardBackground: "#ffffff",
    highlightColor: "#f7ef09",
    accentColor: "#e65f53",
    textColor: "#333333",
    white: "#ffffff",

    successColor: "#19e378",
    errorColor: "#e33119",
    warningColor: "#19ade3",

    visitedColor: "348EC7",
    borderColor: "#cccccc",

    fontFamily: "Open Sans, sans-serif",
    fontSize: "14px",
    lineHeight: "1.5",
    spacing: "16px",
    appBarHeight: "4em",
    appBarReducedHeight: "2em",
    footerHeight: "2em",

    // Device types
    //mobile: "(max-aspect-ratio: 1/1)",
    portrait: "(max-aspect-ratio: 1)",
    landscape: "(min-aspect-ratio: 1)",
};

const lightTheme = Object.assign({}, baseTheme, {
    //backgroundColor: "#f5f5f5",
    //textColor: "#333333",
});

const darkTheme = Object.assign({}, baseTheme, {
    //primaryColor: "#994B37",
    //secondaryColor: "#663F1B",
    //backgroundColor: "#333333",
    //textColor: "#f5f5f5",
    //cardBackground: "#948270",
});

export { lightTheme, darkTheme };
```

/src/utils/appConfig.ts : 
```
export const AppConfig = {
    site_name: "Nextech",
    title: "Nextech",
    description: "Pour tous vos besoins de développement web.",
    locale: "fr",
};
```

src/layout/main.tsx : 
```
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
```

src/pages/index.tsx : 
```
import React, { useRef } from "react";
import styled from "styled-components";
import Head from "next/head";

export default function Home() {
    return (
        <p>
          Nextech base
        </p>
    );
}
```

Supprimmer /src/styles/

