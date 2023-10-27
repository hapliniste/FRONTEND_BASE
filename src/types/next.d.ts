import 'next/app';
import { Session } from "next-auth";

declare module 'next/app' {
  export type AppProps<P = {}> = {
    Component: NextComponentType<NextPageContext, any, P>;
    router: Router;
    __N_SSG?: boolean;
    __N_SSP?: boolean;
    pageProps: P & { session?: Session | null };
  };
}
