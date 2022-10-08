import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";

/**
 * Root component for displaying the app. See next documentation for more info.
 */
function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
