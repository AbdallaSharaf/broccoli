'use client';

import { Open_Sans, Rajdhani } from 'next/font/google';
import '@/assets/css/font-icons.css';
import '@/assets/css/plugins.css';
import './globals.css';
import '@/assets/css/responsive.css';
import Script from 'next/script';
import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { METADATA } from '../libs/metadata.js';

const open_sans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--ltn__body-font',
});

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--ltn__heading-font',
});

const PIXEL_ID = '1359273798966268';
const SNAP_ID = '602d4f35-2199-4ae7-98b8-dad32da111db';
const TIKTOK_PIXEL_ID = 'D5R3KOBC77UAR2VTSMSG';

// Create a component that uses useSearchParams and wrap it in Suspense
function MetadataHandler({ setMetadata }) {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  useEffect(() => {
    setMetadata(
      category
        ? METADATA[category]
        : METADATA[window.location.pathname.split('/')[1]] ||
            METADATA['default']
    );
  }, [category, setMetadata]);

  return null;
}

export default function RootLayout({ children }) {
  const [metadata, setMetadata] = useState(METADATA['default']);

  useEffect(() => {
    if (!window.fbq) {
      window.fbq = function () {
        window.fbq.callMethod
          ? window.fbq.callMethod.apply(window.fbq, arguments)
          : window.fbq.queue.push(arguments);
      };
      window.fbq.push = window.fbq;
      window.fbq.loaded = true;
      window.fbq.version = '2.0';
      window.fbq.queue = [];
    }
    window.fbq('init', PIXEL_ID);
    window.fbq('track', 'PageView');
  }, []);

  return (
    <html
      lang="en"
      suppressHydrationWarning={true}
      className={`${rajdhani.variable} ${open_sans.variable}`}
    >
      <head>
        {/* Facebook Pixel */}
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

        {/* Snapchat Pixel */}
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

        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Fruits Heaven',
              url: 'https://fruitsheaven.sa/',
              logo: 'https://fruitsheaven.sa/images/logo.png',
              description:
                'Fruits Heaven provides fresh local and imported fruits, vegetables, and leaves in Saudi Arabia. Official agent for AxisForTrading.',
              sameAs: [
                'https://www.facebook.com/fruitsheaven',
                'https://www.instagram.com/fruitsheaven',
              ],
              founder: 'AxisForTrading',
              location: {
                '@type': 'Place',
                address: {
                  '@type': 'PostalAddress',
                  addressCountry: 'SA',
                },
              },
            }),
          }}
        />

        {/* TikTok Pixel */}
        <Script
          id="tiktok-pixel"
          strategy="afterInteractive"
          onLoad={() => {
            console.log('TikTok Pixel loaded successfully');
          }}
          dangerouslySetInnerHTML={{
            __html: `
              !function (w, d, t) {
                w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
              var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
              ;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};

                ttq.load('${TIKTOK_PIXEL_ID}');
                ttq.page();
              }(window, document, 'ttq');
            `,
          }}
        />

        <title>جنة الفواكه</title>
        <meta name="description" content={metadata?.description} />
        <meta
          name="keywords"
          content="الفواكه في المملكة العربية السعودية، الخضروات في المملكة العربية السعودية، الفواكه المستوردة، المنتجات المحلية، الأوراق الطازجة، توصيل الفاكهة، جنة الفواكه، وكيل AxisForTrading"
        />
        <meta name="author" content="IN marketing" />

        {/* Open Graph for social media */}
        <meta property="og:title" content="جنة الفواكه" />
        <meta
          property="og:description"
          content="Premium quality local and imported fruits, vegetables, and leaves delivered to your door in KSA. We're the official agent for AxisForTrading"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.fruits-heaven.com/" />
        <meta
          property="og:image"
          content="https://www.fruits-heaven.com/og-image.jpg"
        />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="جنة الفواكه" />
        <meta
          name="twitter:description"
          content="Local & imported fruits, vegetables, and more — delivered across KSA. Fruits Heaven is your trusted AxisForTrading agent."
        />
        <meta
          name="twitter:image"
          content="https://www.fruits-heaven.com/twitter-image.jpg"
        />

        <link rel="canonical" href="https://www.fruits-heaven.com/" />
      </head>
      <body className={open_sans.className}>
        {/* Wrap the MetadataHandler in Suspense to handle useSearchParams */}
        <Suspense fallback={<div></div>}>
          <MetadataHandler setMetadata={setMetadata} />
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
