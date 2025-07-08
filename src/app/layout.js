"use client"
import { Open_Sans, Rajdhani } from "next/font/google";
import "@/assets/css/font-icons.css";
import "@/assets/css/plugins.css";
// import "./globals-rtl.css";
import "./globals.css";
import "@/assets/css/responsive.css";
import Script from "next/script";
import { Suspense, useState } from "react";
import { useEffect } from "react";
import { METADATA } from "../libs/metadata.js";
import { useSearchParams } from "next/navigation.js";
const open_sans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--ltn__body-font",
});
const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--ltn__heading-font",
});

// export const metadata = {
//   title: "Fruits heaven",
//   description: "Fruits heaven",
// };
const PIXEL_ID = "1359273798966268"; 
const SNAP_ID = "602d4f35-2199-4ae7-98b8-dad32da111db"; 
export default function RootLayout({ children }) {
  const [metadata, setMetadata] = useState(METADATA['default']);
  let desc=''
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  useEffect(() => {
    if (!window.fbq) {
      window.fbq = function () {
        window.fbq.callMethod ? window.fbq.callMethod.apply(window.fbq, arguments) : window.fbq.queue.push(arguments);
      };
      window.fbq.push = window.fbq;
      window.fbq.loaded = true;
      window.fbq.version = "2.0";
      window.fbq.queue = [];
    }
    window.fbq("init", PIXEL_ID);
    window.fbq("track", "PageView");

  }, []);
  useEffect(() => {
    // console.log("url", window.location.pathname);
    // console.log("url", METADATA[searchParams?.get("category")]);
     setMetadata(searchParams?.get("category")
  ? METADATA[searchParams?.get("category")]
  : METADATA[window.location.pathname.split("/")[1]]);
  // console.log("metadata", metadata);
  // console.log("metadata", metadata.description);
  desc=metadata.description
  }, [category]);
//   return (
//     <html
//       lang="en"
//       suppressHydrationWarning={true}
//       className={`${rajdhani.variable} ${open_sans.variable}`}
//     >

//       <body className={open_sans.className}>
//       {/* <script>
// !function(f,b,e,v,n,t,s)
// {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
// n.callMethod.apply(n,arguments):n.queue.push(arguments)};
// if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
// n.queue=[];t=b.createElement(e);t.async=!0;
// t.src=v;s=b.getElementsByTagName(e)[0];
// s.parentNode.insertBefore(t,s)}(window, document,'script',
// 'https://connect.facebook.net/en_US/fbevents.js');
// fbq('init', '1359273798966268');
// fbq('track', 'PageView');
// </script>
// <noscript><img height="1" width="1" style="display:none"
// src="https://www.facebook.com/tr?id=1359273798966268&ev=PageView&noscript=1"
// /></noscript> */}

// <Script
//         id="facebook-pixel"
//         strategy="afterInteractive"
//         dangerouslySetInnerHTML={{
//           __html: `
//             !function(f,b,e,v,n,t,s)
//             {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
//             n.callMethod.apply(n,arguments):n.queue.push(arguments)};
//             if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
//             n.queue=[];t=b.createElement(e);t.async=!0;
//             t.src=v;s=b.getElementsByTagName(e)[0];
//             s.parentNode.insertBefore(t,s)}(window, document,'script',
//             'https://connect.facebook.net/en_US/fbevents.js');
//             fbq('init', '${PIXEL_ID}');
//             fbq('track', 'PageView');
//           `,
//         }}
//       />
//             <noscript>
//         <img
//           height="1"
//           width="1"
//           style={{ display: 'none' }}
//           src={`https://www.facebook.com/tr?id=1359273798966268&ev=PageView&noscript=1`}
//         />
//       </noscript>
//         <Suspense fallback={<div></div>}>
//           {children}
//           <Script src="/plugins.js" />
//           <Script
//             src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCeeHDCOXmUMja1CFg96RbtyKgx381yoBU"
//             async
//           />
//         </Suspense>
//       </body>
//     </html>
//   );
return (
  <html lang="en" 
  suppressHydrationWarning={true}
      className={`${rajdhani.variable} ${open_sans.variable}`}
  >
    <head>
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${PIXEL_ID}');
            fbq('track', 'PageView');
          `,
        }}
      />
      <Script
  id="snapchat-pixel"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `
      (function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function(){
      a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};
      a.queue=[];var s='script';r=t.createElement(s);r.async=!0;
      r.src=n;var u=t.getElementsByTagName(s)[0];
      u.parentNode.insertBefore(r,u);})(window,document,
      'https://sc-static.net/scevent.min.js');

      snaptr('init', '${SNAP_ID}'); 
      snaptr('track', 'PAGE_VIEW');
    `,
  }}
/>
<script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Fruits Heaven",
              "url": "https://fruitsheaven.sa/",
              "logo": "https://fruitsheaven.sa/images/logo.png",
              "description": "Fruits Heaven provides fresh local and imported fruits, vegetables, and leaves in Saudi Arabia. Official agent for AxisForTrading.",
              "sameAs": [
                "https://www.facebook.com/fruitsheaven",
                "https://www.instagram.com/fruitsheaven"
              ],
              "founder": "AxisForTrading",
              "location": {
                "@type": "Place",
                "address": {
                  "@type": "PostalAddress",
                  "addressCountry": "SA"
                }
              }
            })
          }}
        />

        <title>جنة الفواكه</title>
        <meta name="description" content={metadata?.description} />
        <meta name="keywords" content="الفواكه في المملكة العربية السعودية، الخضروات في المملكة العربية السعودية، الفواكه المستوردة، المنتجات المحلية، الأوراق الطازجة، توصيل الفاكهة، جنة الفواكه، وكيل AxisForTrading" />
        <meta name="author" content="IN marketing" />
        
        {/* Open Graph for social media */}
        <meta property="og:title" content="جنة الفواكه" />
        <meta property="og:description" content="Premium quality local and imported fruits, vegetables, and leaves delivered to your door in KSA. We're the official agent for AxisForTrading" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.fruits-heaven.com/" />
        <meta property="og:image" content="https://www.fruits-heaven.com/og-image.jpg" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="جنة الفواكه" />
        <meta name="twitter:description" content="Local & imported fruits, vegetables, and more — delivered across KSA. Fruits Heaven is your trusted AxisForTrading agent." />
        <meta name="twitter:image" content="https://www.fruits-heaven.com/twitter-image.jpg" />

        <link rel="canonical" href="https://www.fruits-heaven.com/" />
    </head>
    <body className={open_sans.className}>
              <Suspense fallback={<div></div>}>
        {children}
           <Script src="/plugins.js" />
           <Script
             src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCeeHDCOXmUMja1CFg96RbtyKgx381yoBU"
             async
           />
         </Suspense>
      </body>
  </html>
);
}
