import "../styles/globals.css";
import { ThemeProvider as StyledComponentThemeProvider } from "styled-components";
import type { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
  return (
    <StyledComponentThemeProvider theme={{}}>
      <Component {...pageProps} />
    </StyledComponentThemeProvider>
  );
}
export default App;
