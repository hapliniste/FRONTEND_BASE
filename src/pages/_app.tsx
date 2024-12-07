//import '@/styles/globals.css'
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "@/utils/apolloClient";
import { SessionProvider } from "next-auth/react";
import { Plus_Jakarta_Sans } from 'next/font/google';
import { DefaultSeo } from 'next-seo';
import seoConfig from '@/config/next-seo.config';
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics';
import { initScrollTracking } from '@/utils/analytics';

import "normalize.css/normalize.css";

import Main from "@/layout/main";

import { lightTheme, darkTheme } from "@/styles/theme";
import PreloadResources from '@/components/library/PreloadResources';

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800']  // Added lighter weights
});

export default function App({ Component, pageProps }: AppProps<{}>) {
    const [currentTheme, setCurrentTheme] = useState(lightTheme);
    useEffect(() => {
        const isDarkMode = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;
        setCurrentTheme(isDarkMode ? darkTheme : lightTheme);
    }, []);

    // Initialize scroll tracking
    useEffect(() => {
        const cleanup = initScrollTracking();
        return () => cleanup?.();
    }, []);

    return (
        <ApolloProvider client={apolloClient}>
            <SessionProvider session={pageProps.session}>
                <DefaultSeo {...seoConfig} />
                <GoogleAnalytics />
                <PreloadResources />
                <ThemeProvider theme={currentTheme}>
                    <Main className={jakarta.className}>
                        <Component {...pageProps} />
                    </Main>
                </ThemeProvider>
            </SessionProvider>
        </ApolloProvider>
    );
}
