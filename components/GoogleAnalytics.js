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
             <script
            dangerouslySetInnerHTML={{
              __html: `
                function loadScript(a){
                  var b=document.getElementsByTagName("head")[0],
                  c=document.createElement("script");
                  c.type="text/javascript";
                  c.src="https://tracker.metricool.com/resources/be.js";
                  c.onreadystatechange=a;
                  c.onload=a;
                  b.appendChild(c)
                }
                loadScript(function(){
                  beTracker.t({hash:"3b5bbadcf95a91986c3b9ab3734c2e3b"})
                });
              `,
            }}
          />
  </>
  );
};

export default GoogleAnalytics;
