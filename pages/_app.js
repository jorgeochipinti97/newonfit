
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { CartProvider } from "@/context/cart/CartProvider";
import { UiProvider } from "@/context/ui/UiProvider";
import "@/styles/globals.css";
import { lightTheme } from "@/themes";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { Analytics } from "@vercel/analytics/react"

export default function App({ Component, pageProps }) {
  return (
    <>
      <CartProvider>
        <UiProvider>
          <ThemeProvider theme={lightTheme}>
            <CssBaseline />
    <GoogleAnalytics/>


            <Component {...pageProps} />
            <Analytics />
          </ThemeProvider>
        </UiProvider>
      </CartProvider>
    </>
  );
}
