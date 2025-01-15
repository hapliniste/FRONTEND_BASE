import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { SessionProvider } from "next-auth/react";
import { appWithTranslation } from "next-i18next";
import { ApolloProvider } from '@apollo/client';
import client from '@/state/apollo/client';
import { DefaultSeo } from 'next-seo';
import seoConfig from '@/config/next-seo.config';
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics';
import { initScrollTracking } from '@/utils/analytics';
import "normalize.css/normalize.css";

import Main from "@/layout/main";
import { lightTheme, darkTheme, Theme } from "../styles/theme";

function App({ Component, pageProps }: AppProps<{}>) {
    const [currentTheme, setCurrentTheme] = useState<Theme>(lightTheme);
    
    useEffect(() => {
        const isDarkMode = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;
        setCurrentTheme(isDarkMode ? darkTheme : lightTheme);
    }, []);

    useEffect(() => {
        const cleanup = initScrollTracking();
        return () => cleanup?.();
    }, []);

    return (
        <ApolloProvider client={client}>
            <SessionProvider session={pageProps.session}>
                <DefaultSeo {...seoConfig} />
                <GoogleAnalytics />
                <ThemeProvider theme={currentTheme}>
                    <Main>
                        <Component {...pageProps} />
                    </Main>
                </ThemeProvider>
            </SessionProvider>
        </ApolloProvider>
    );
}

export default appWithTranslation(App);
