import Script from "next/script";

// Loads Google Analytics 4 and Microsoft Clarity in production builds only,
// so running `npm run dev` locally doesn't count toward the site's numbers.
// The GA4 Measurement ID is public (it's visible in every page's source), so it
// is set here as a default; NEXT_PUBLIC_GA_ID overrides it if you ever need to.
const IS_PROD = process.env.NODE_ENV === "production";
const GA_ID = IS_PROD ? (process.env.NEXT_PUBLIC_GA_ID || "G-CTP1RW2VFY") : undefined;
const CLARITY_ID = IS_PROD ? process.env.NEXT_PUBLIC_CLARITY_ID : undefined;

export default function Analytics() {
    return (
        <>
            {GA_ID && (
                <>
                    <Script
                        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
                        strategy="afterInteractive"
                    />
                    <Script id="ga4-init" strategy="afterInteractive">
                        {`
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', '${GA_ID}');
                        `}
                    </Script>
                </>
            )}
            {CLARITY_ID && (
                <Script id="ms-clarity" strategy="afterInteractive">
                    {`
                        (function(c,l,a,r,i,t,y){
                            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                        })(window, document, "clarity", "script", "${CLARITY_ID}");
                    `}
                </Script>
            )}
        </>
    );
}
