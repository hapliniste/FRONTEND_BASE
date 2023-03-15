//import '@/styles/globals.css'
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
//import { supabase } from "@/utils/initSupabase";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";

//import '@/styles/styleReset.css';
import "normalize.css/normalize.css";

import Main from "@/layout/main";

import { lightTheme, darkTheme } from "@/styles/theme";

export default function App({
    Component,
    pageProps,
}: AppProps<{
    initialSession: Session;
}>) {
    const [supabaseClient] = useState(() => createBrowserSupabaseClient());

    const [currentTheme, setCurrentTheme] = useState(lightTheme);
    useEffect(() => {
        const isDarkMode = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;
        setCurrentTheme(isDarkMode ? darkTheme : lightTheme);
        console.log("Current prefered theme is: " + isDarkMode);
    }, []);

    return (
        <SessionContextProvider
            supabaseClient={supabaseClient}
            initialSession={pageProps.initialSession}
        >
            <ThemeProvider theme={currentTheme}>
                <Main>
                    <Component {...pageProps} />
                </Main>
            </ThemeProvider>
        </SessionContextProvider>
    );
}
