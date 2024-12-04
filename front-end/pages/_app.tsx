import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@radix-ui/themes/styles.css";
import { Theme } from '@radix-ui/themes';
import { appWithTranslation } from 'next-i18next';

const App = ({ Component, pageProps }: AppProps) => {
  return (
      <Theme>
          <Component {...pageProps} />;
      </Theme>
      )
}

export default appWithTranslation(App)

