import Head from "next/head";
// import { Navbar } from '../navbar';
import { Box, useMediaQuery } from "@mui/material";
import { Navbar } from "../Navbar/Navbar";
import { FooterComponent } from "../footer";
import { SideMenu } from "../SideMenu";
import { LoadingComponent } from "../Loading";
// import { SideMenu } from '../ui/SideMenu';
// import { SideMenu } from '../SideMenu';
// import { Footer } from '../Footer';

export const ShopLayout = ({
  children,
  title,
  pageDescription,
  imageFullUrl,
}) => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <>
      <Head>
        <title>{title}</title>

        <meta name="description" content={pageDescription} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={pageDescription} />

        {imageFullUrl && <meta name="og:image" content={imageFullUrl} />}
      </Head>

      <nav>
        <Navbar isMobile={isMobile} />
      </nav>
      <SideMenu />
          <LoadingComponent />
          

      <Box
        sx={{
          background: "radial-gradient(at center, rgba(254, 221, 45,0.1), white,white)",
          // animation: "randomGradient 5s linear infinite;",
        }}
      >
        <main
          style={{
            padding: "0px 0px",
            minHeight:'100vh'
          }}
        >
          {children}
        </main>
      <FooterComponent isMobile={isMobile} />
      </Box>
    </>
  );
};
