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
import { useRouter } from "next/router";
export const ShopLayout = ({
  children,

  pageDescription,
  imageFullUrl,
}) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const { push, asPath } = useRouter();
  return (
    <>
      <Head>
        <title>Tienda Onfit | Potencia tu estilo Eleva tu rendimiento</title>
        <meta
          name="description"
          content="Estamos comprometidos con tu bienestar y tu pasión por el fitness. Ofrecemos una amplia gama de equipos deportivos y ropa de la marca OnFit para que alcances tus metas. Ya sea que estés buscando entrenar en casa o en uno de nuestros gimnasios, ¡Te tenemos cubierto!"
        />
        <meta
          property="og:image"
          content="https://www.tiendaonfit.com.ar/logo.png"
        />
        <meta
          property="twitter:image"
          content="https://www.tiendaonfit.com.ar/logo.png"
        />
        <meta name="description" content={pageDescription} />
        <meta
          name="og:title"
          content={"Tienda Onfit | Potencia tu estilo Eleva tu rendimiento "}
        />
        <meta name="og:description" content={pageDescription} />
        <link
          rel="icon"
          href="https://www.tiendaonfit.com.ar/favicon.png"
          type="image/png"
        />
      </Head>

      <nav>
        <Navbar isMobile={isMobile} />
      </nav>

      <SideMenu />
      <LoadingComponent />

      <Box
        sx={{
          background: asPath.includes("faqs")
            ? "white"
            : "radial-gradient(ellipse at top, white, transparent), radial-gradient(ellipse at bottom, white, rgba(254, 221, 45,0.4));",
        }}
      >
        <main
          style={{
            padding: "0px 0px",
          }}
        >
          {children}
        </main>
        <div
          style={{
            position: "fixed",
            right: 10,
            bottom: 70,
            zIndex: 1000,
            backdropFilter: "blur(4px)",
            borderRadius: "100px",
          }}
        >
          <a href="https://wa.link/yavgcs">
            <svg
              width={50}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 32 32"
            >
              <g>
                <path
                  fill="#BFC8D0"
                  fillRule="evenodd"
                  d="M16 31c7.732 0 14-6.268 14-14S23.732 3 16 3 2 9.268 2 17c0 2.51.661 4.867 1.818 6.905L2 31l7.315-1.696A13.938 13.938 0 0016 31zm0-2.154c6.543 0 11.846-5.303 11.846-11.846 0-6.542-5.303-11.846-11.846-11.846C9.458 5.154 4.154 10.458 4.154 17c0 2.526.79 4.867 2.138 6.79L5.23 27.77l4.049-1.013a11.791 11.791 0 006.72 2.09z"
                  clipRule="evenodd"
                ></path>
                <path
                  fill="url(#paint0_linear_87_7264)"
                  d="M28 16c0 6.627-5.373 12-12 12-2.528 0-4.873-.782-6.807-2.116L5.09 26.909l1.075-4.03A11.945 11.945 0 014 16C4 9.373 9.373 4 16 4s12 5.373 12 12z"
                ></path>
                <path
                  fill="#fff"
                  fillRule="evenodd"
                  d="M16 30c7.732 0 14-6.268 14-14S23.732 2 16 2 2 8.268 2 16c0 2.51.661 4.867 1.818 6.905L2 30l7.315-1.696A13.938 13.938 0 0016 30zm0-2.154c6.543 0 11.846-5.303 11.846-11.846 0-6.542-5.303-11.846-11.846-11.846C9.458 4.154 4.154 9.458 4.154 16c0 2.526.79 4.867 2.138 6.79L5.23 26.77l4.049-1.013a11.791 11.791 0 006.72 2.09z"
                  clipRule="evenodd"
                ></path>
                <path
                  fill="#fff"
                  d="M12.5 9.5c-.333-.669-.844-.61-1.36-.61-.921 0-2.359 1.105-2.359 3.16 0 1.684.742 3.528 3.243 6.286 2.414 2.662 5.585 4.039 8.218 3.992 2.633-.047 3.175-2.313 3.175-3.078 0-.339-.21-.508-.356-.554-.897-.43-2.552-1.233-2.928-1.384-.377-.15-.573.054-.695.165-.342.325-1.019 1.284-1.25 1.5-.232.215-.578.106-.721.024-.53-.212-1.964-.85-3.107-1.958-1.415-1.371-1.498-1.843-1.764-2.263-.213-.336-.057-.542.021-.632.305-.351.726-.894.914-1.164.189-.27.04-.679-.05-.934-.387-1.097-.715-2.015-.981-2.55z"
                ></path>
                <defs>
                  <linearGradient
                    id="paint0_linear_87_7264"
                    x1="26.5"
                    x2="4"
                    y1="7"
                    y2="28"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#5BD066"></stop>
                    <stop offset="1" stopColor="#27B43E"></stop>
                  </linearGradient>
                </defs>
              </g>
            </svg>
          </a>
        </div>
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
            orderRadius: "9px 9px 0px 0px",
          }}
          elevation={3}
        >
          <BottomNavigation
            showLabels
            sx={{
              background: "rgba(254, 221, 45,0.9)",
              backdropFilter: "blur(4px)",
              borderRadius: "9px 9px 0px 0px",
            }}
          >
            <BottomNavigationAction
              sx={{ color: "black", borderRight: "1px solid black" }}
              label="Indumentaria"
              icon={
                <svg
                  width={30}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#000"
                  stroke="#000"
                  className="cf-icon-svg"
                  viewBox="-1 0 19 19"
                >
                  <path d="M15.867 7.593l-1.534.967a.544.544 0 01-.698-.118l-.762-.957v7.256a.476.476 0 01-.475.475h-7.79a.476.476 0 01-.475-.475V7.477l-.769.965a.544.544 0 01-.697.118l-1.535-.967a.387.387 0 01-.083-.607l2.245-2.492a2.814 2.814 0 012.092-.932h.935a2.374 2.374 0 004.364 0h.934a2.816 2.816 0 012.093.933l2.24 2.49a.388.388 0 01-.085.608z"></path>
                </svg>
              }
              onClick={() => push("/indumentaria")}
            />
            <BottomNavigationAction
              sx={{ color: "black", borderRight: "1px solid black" }}
              label="Accesorios"
              icon={
                <svg
                  width={30}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#000"
                  version="1.1"
                  viewBox="0 0 300 300"
                  xmlSpace="preserve"
                >
                  <g>
                    <path d="M150 7.5C71.421 7.5 7.5 71.434 7.5 150S71.421 292.5 150 292.5 292.5 228.566 292.5 150 228.579 7.5 150 7.5zm0 271.424c-71.092 0-128.924-57.841-128.924-128.924S78.908 21.076 150 21.076 278.924 78.917 278.924 150 221.092 278.924 150 278.924z"></path>
                    <path d="M110.992 136.424H189.00900000000001V163.57600000000002H110.992z"></path>
                    <path d="M58.402 128.786v2.758c-1.021-.624-2.14-1.051-3.405-1.051a6.777 6.777 0 00-6.779 6.778v25.457a6.777 6.777 0 006.779 6.778c1.265 0 2.384-.427 3.405-1.051v2.758c0 6.915 5.186 12.556 11.872 13.396V115.39c-6.686.84-11.872 6.481-11.872 13.396zM245.003 130.493c-1.265 0-2.384.427-3.404 1.051v-2.758c0-6.915-5.187-12.556-11.872-13.396v69.221c6.686-.841 11.872-6.481 11.872-13.396v-2.758c1.021.624 2.14 1.051 3.404 1.051a6.777 6.777 0 006.779-6.778v-25.457a6.777 6.777 0 00-6.779-6.78zM90.628 94.033c-7.487 0-13.566 6.079-13.566 13.575v84.783c0 7.496 6.08 13.575 13.566 13.575 7.496 0 13.576-6.079 13.576-13.575v-84.783c0-7.496-6.08-13.575-13.576-13.575zM209.372 94.033c-7.496 0-13.576 6.079-13.576 13.575v84.783c0 7.496 6.08 13.575 13.576 13.575 7.487 0 13.566-6.079 13.566-13.575v-84.783c0-7.496-6.079-13.575-13.566-13.575z"></path>
                  </g>
                </svg>
              }
              onClick={() => push("/accesorios")}
            />
            <BottomNavigationAction
              sx={{ color: "black" }}
              label="Inicio"
              icon={
                <svg
                  width={30}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#000"
                    fillRule="evenodd"
                    d="M2.52 7.823C2 8.77 2 9.915 2 12.203v1.522c0 3.9 0 5.851 1.172 7.063C4.343 22 6.229 22 10 22h4c3.771 0 5.657 0 6.828-1.212C22 19.576 22 17.626 22 13.725v-1.521c0-2.289 0-3.433-.52-4.381-.518-.949-1.467-1.537-3.364-2.715l-2-1.241C14.111 2.622 13.108 2 12 2c-1.108 0-2.11.622-4.116 1.867l-2 1.241C3.987 6.286 3.038 6.874 2.519 7.823zM9 17.25a.75.75 0 000 1.5h6a.75.75 0 000-1.5H9z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              }
              onClick={() => push("/")}
            />
          </BottomNavigation>
        </Paper>
      </Box>
    </>
  );
};
