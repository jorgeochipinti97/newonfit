import Head from "next/head";
// import { Navbar } from '../navbar';
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper,
  useMediaQuery,
} from "@mui/material";
import { Navbar } from "../Navbar/Navbar";
import { FooterComponent } from "../footer";
import { SideMenu } from "../SideMenu";
import { LoadingComponent } from "../Loading";
import { Wpp } from "../Wpp";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import HomeIcon from "@mui/icons-material/Home";
import HelpIcon from "@mui/icons-material/Help";
import { useRouter } from "next/router";
export const ShopLayout = ({
  children,
  title,
  pageDescription,
  imageFullUrl,
}) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const { push } = useRouter();
  return (
    <>
      <Head>
        <title>Tiend Onfit | Potencia tu estilo Eleva tu rendimiento</title>

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
      <Wpp />

      <Box
        sx={{
          background:
            "radial-gradient(ellipse at top, white, transparent), radial-gradient(ellipse at bottom, white, rgba(254, 221, 45,0.4));",
        }}
      >
        <main
          style={{
            padding: "0px 0px",
          }}
        >
          {children}
        </main>
        <FooterComponent isMobile={isMobile} />
        <Paper
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            display: isMobile ? "auto" : "none",
            background: "transparent",
            orderRadius:'9px 9px 0px 0px'
          }}
          elevation={3}
        >
          <BottomNavigation
            showLabels
            sx={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)", borderRadius:'9px 9px 0px 0px' }}
          >
            <BottomNavigationAction
              sx={{ color: "#f5f5f7" }}
              label="Indumentaria"
              icon={<CheckroomIcon />}
              onClick={() => push("/indumentaria")}
            />
            <BottomNavigationAction
              onClick={() => push("/accesorios")}
              sx={{ color: "#f5f5f7" }}
              label="Accesorios"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m8.985 7.443l-2.94-.354c-.686-.082-1.028-.124-1.313-.053c-.38.095-.703.326-.899.642c-.147.236-.192.554-.28 1.188c-.09.635-.134.952-.057 1.216c.102.351.351.65.692.832c.256.136.966.222 1.651.304l-.883 6.298c-.685-.082-1.396-.168-1.68-.096c-.38.094-.703.325-.9.64c-.146.238-.19.555-.28 1.19c-.089.634-.133.951-.057 1.215c.103.351.352.65.693.832c.255.137.598.178 1.283.26l2.94.354c.686.082 1.028.124 1.313.052a1.47 1.47 0 0 0 .899-.64c.147-.238.192-.555.28-1.19c.09-.634.134-.95.057-1.215a1.393 1.393 0 0 0-.692-.832c-.256-.136-.966-.222-1.651-.304l.883-6.298c.685.082 1.396.168 1.68.096c.38-.094.703-.325.9-.64c.146-.238.19-.555.28-1.19c.089-.634.133-.951.057-1.215a1.393 1.393 0 0 0-.693-.832c-.255-.137-.598-.178-1.283-.26Zm11.3 8.64l-2.71.7c-.633.163-.948.244-1.225.209a1.416 1.416 0 0 1-.93-.517c-.17-.213-.255-.517-.424-1.125c-.17-.608-.254-.912-.218-1.179c.049-.355.242-.677.537-.895c.222-.164.877-.333 1.508-.496l-1.68-6.036c-.632.163-1.286.332-1.563.297a1.416 1.416 0 0 1-.93-.517c-.17-.213-.255-.517-.424-1.125c-.17-.608-.254-.912-.218-1.179a1.34 1.34 0 0 1 .538-.895c.221-.164.537-.245 1.168-.408l2.712-.7c.632-.163.947-.244 1.224-.209c.37.047.704.233.93.517c.17.213.255.517.424 1.125c.17.608.254.912.218 1.179a1.341 1.341 0 0 1-.537.895c-.222.164-.877.333-1.508.496l1.68 6.036c.631-.163 1.286-.332 1.563-.297c.37.047.704.233.93.517c.17.213.255.517.424 1.125c.17.608.254.912.218 1.179a1.34 1.34 0 0 1-.538.895c-.221.164-.537.245-1.169.408Z"
                  />
                </svg>
              }
            />
            <BottomNavigationAction
              sx={{ color: "#f5f5f7" }}
              label="Suplementos"
              onClick={() => push("/suplementos")}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <g fill="none" fill-rule="evenodd">
                    <path d="M24 0v24H0V0h24ZM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036c-.01-.003-.019 0-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.016-.018Zm.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01l-.184-.092Z" />
                    <path
                      fill="currentColor"
                      d="M13.362 3.536c.484.093 1.191.335 1.532 1.017c.747 1.494.13 2.914-.532 3.797c-.432.576-.988 1.118-1.635 1.45c-.135.07-.41.2-.727.2c-.591 0-1.17-.269-1.645-.605c-.09.306-.177.642-.252.998a10.597 10.597 0 0 0-.24 2.078c1.053-.34 2.13-.304 3.058.22a6.467 6.467 0 0 1 2.357-1.173c1.3-.341 2.86-.294 4.277.65c1.015.677 1.784 1.952 1.939 3.347c.162 1.454-.343 3.044-1.87 4.266c-1.078.862-2.721 1.195-4.233 1.316c-1.565.126-3.218.04-4.502-.103c-2.377-.264-4.202-.928-5.478-1.613c-.838-.45-1.983-1.072-2.346-2.025c-.245-.646-.181-1.43-.121-2.102c.08-.881.276-1.981.643-3.173c.732-2.379 2.165-5.194 4.776-7.352c.803-.664 2.147-1.076 3.272-1.214c.58-.071 1.19-.081 1.727.021Z"
                    />
                  </g>
                </svg>
              }
            />
            <BottomNavigationAction
              sx={{ color: "#f5f5f7" }}
              onClick={() => push("/equipamiento")}
              label="Equipamiento"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 15 15"
                >
                  <path
                    fill="currentColor"
                    d="M14.5 7v1h-1v2h-1v1H11V8H4v3H2.5v-1h-1V8h-1V7h1V5h1V4H4v3h7V4h1.5v1h1v2Z"
                  />
                </svg>
              }
            />
          </BottomNavigation>
        </Paper>
      </Box>
    </>
  );
};
