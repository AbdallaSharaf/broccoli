"use client"
import { Open_Sans, Rajdhani } from "next/font/google";
import "@/assets/css/font-icons.css";
import "@/assets/css/plugins.css";
// import "./globals-rtl.css";
import "./globals.css";
import "@/assets/css/responsive.css";
import Script from "next/script";
import { Suspense } from "react";
import { useEffect } from "react";
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
