import { CartProvider } from "@/context/cart/CartProvider";
import { UiProvider } from "@/context/ui/UiProvider";
import "@/styles/globals.css";
import { lightTheme } from "@/themes";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";

export default function App({ Component, pageProps }) {
  return (
    <>
      <CartProvider>
        <UiProvider>
          <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </UiProvider>
      </CartProvider>
    </>
  );
}
