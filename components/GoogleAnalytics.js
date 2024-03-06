// components/GoogleAnalytics.js

import Script from "next/script";

const GoogleAnalytics = () => {
  return (
    <>
    {/* Script de Google Tag Manager (gtag.js) */}
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-LPCZ8R2ESR"></script>
    <script
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-LPCZ8R2ESR');
        `,
      }}
    />
  </>
  );
};

export default GoogleAnalytics;
