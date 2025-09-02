// app/layout.js
"use client";
import { Open_Sans, Rajdhani } from "next/font/google";
import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Script from "next/script";

// Mock metadata - replace with your actual METADATA import
const METADATA = {
  'default': {
    title: 'جنة الفواكه',
    description: 'Default description for Fruits Heaven'
  },
  'fruits': {
    title: 'الفواكه الطازجة',
    description: 'أجود أنواع الفواكه المستوردة والمحلية'
  },
  'vegetables': {
    title: 'الخضروات الطازجة',
    description: 'خضروات طازجة من أفضل المزارع'
  }
};

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

const PIXEL_ID = "1359273798966268"; 
const SNAP_ID = "602d4f35-2199-4ae7-98b8-dad32da111db";

// Component that uses useSearchParams wrapped in Suspense
function SearchParamsContent({ setMetadata }) {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  
  useEffect(() => {
    const pathSegment = typeof window !== 'undefined' 
      ? window.location.pathname.split("/")[1] 
      : '';
      
    setMetadata(
      category 
        ? METADATA[category] || METADATA['default']
        : METADATA[pathSegment] || METADATA['default']
    );
  }, [category, setMetadata]);
  
  return null;
}

export default function RootLayout({ children }) {
  const [metadata, setMetadata] = useState(METADATA['default']);

  useEffect(() => {
    // Initialize Facebook Pixel
    if (!window.fbq) {
      window.fbq = function () {
        window.fbq.callMethod 
          ? window.fbq.callMethod.apply(window.fbq, arguments) 
          : window.fbq.queue.push(arguments);
      };
      window.fbq.push = window.fbq;
      window.fbq.loaded = true;
      window.fbq.version = "2.0";
      window.fbq.queue = [];
    }
    window.fbq("init", PIXEL_ID);
    window.fbq("track", "PageView");
  }, []);

  return (
    <html 
      lang="en" 
      suppressHydrationWarning={true}
      className={`${rajdhani.variable} ${open_sans.variable}`}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Facebook Pixel Script */}
        <Script
          id="fb-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s) {
                if(f.fbq)return;n=f.fbq=function() {
                  n.callMethod ? n.callMethod.apply(n,arguments) : n.queue.push(arguments)
                };
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s);
              }(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${PIXEL_ID}');
              fbq('track', 'PageView');
            `,
          }}
        />
        
        {/* Snapchat Pixel Script */}
        <Script
          id="snapchat-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(e,t,n){
                if(e.snaptr)return;
                var a=e.snaptr=function(){
                  a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)
                };
                a.queue=[];
                var s='script';r=t.createElement(s);r.async=!0;
                r.src=n;var u=t.getElementsByTagName(s)[0];
                u.parentNode.insertBefore(r,u);
              })(window,document,'https://sc-static.net/scevent.min.js');
              snaptr('init', '${SNAP_ID}');
              snaptr('track', 'PAGE_VIEW');
            `,
          }}
        />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Fruits Heaven",
              "url": "https://fruitsheaven.sa/",
              "logo": "https://fruitsheaven.sa/images/logo.png",
              "description": "Fruits Heaven provides fresh local and imported fruits, vegetables, and leaves in Saudi Arabia.",
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

        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content="الفواكه في المملكة العربية السعودية، الخضروات في المملكة العربية السعودية، الفواكه المستوردة، المنتجات المحلية، الأوراق الطازجة، توصيل الفاكهة، جنة الفواكه، وكيل AxisForTrading" />
        <meta name="author" content="IN marketing" />
        
        {/* Open Graph for social media */}
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content="Premium quality local and imported fruits, vegetables, and leaves delivered to your door in KSA." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.fruits-heaven.com/" />
        <meta property="og:image" content="https://www.fruits-heaven.com/og-image.jpg" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content="Local & imported fruits, vegetables, and more — delivered across KSA." />
        <meta name="twitter:image" content="https://www.fruits-heaven.com/twitter-image.jpg" />

        <link rel="canonical" href="https://www.fruits-heaven.com/" />
      </head>
      <body className={open_sans.className}>
        {/* Wrap the component using useSearchParams in Suspense */}
        <Suspense fallback={<div className="loading">جاري التحميل...</div>}>
          <SearchParamsContent setMetadata={setMetadata} />
        </Suspense>
        
        {children}
        
        <Suspense fallback={<div></div>}>
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