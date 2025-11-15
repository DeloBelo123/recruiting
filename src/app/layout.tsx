import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { GA_MEASUREMENT_ID } from "@/lib/analytics";

const baseUrl = "https://www.recruitvoiceai.de";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "RecruitVoiceAI - Voice AI Recruiting | KI Recruiting Agent",
    template: "%s | RecruitVoiceAI",
  },
  description: "Automatisiere dein Recruiting mit KI-gestützten Voice-Interviews. Voice AI Recruiting für Personalvermittlung und HR. Spare 140% Zeit im Recruiting-Prozess.",
  keywords: [
    "Voice AI Recruiting",
    "KI Recruiting Agent",
    "Automatisches Recruiting",
    "Personalvermittlung AI",
    "HR Recruiting Software",
    "Recruiting Automatisierung",
    "AI Personalvermittlung",
    "Voice Recruiting",
    "KI Recruiting",
    "Recruiting Agentur Software",
  ],
  authors: [{ name: "RecruitVoiceAI" }],
  creator: "RecruitVoiceAI",
  publisher: "RecruitVoiceAI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: baseUrl,
    siteName: "RecruitVoiceAI",
    title: "RecruitVoiceAI - Voice AI Recruiting | KI Recruiting Agent",
    description: "Automatisiere dein Recruiting mit KI-gestützten Voice-Interviews. Voice AI Recruiting für Personalvermittlung und HR. Spare 140% Zeit im Recruiting-Prozess.",
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "RecruitVoiceAI - Voice AI Recruiting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RecruitVoiceAI - Voice AI Recruiting | KI Recruiting Agent",
    description: "Automatisiere dein Recruiting mit KI-gestützten Voice-Interviews. Spare 140% Zeit im Recruiting-Prozess.",
    images: [`${baseUrl}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  alternates: {
    canonical: baseUrl,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "RecruitVoiceAI",
  url: baseUrl,
  logo: `${baseUrl}/logo.png`,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+49-176-20620226",
    contactType: "customer service",
    email: "info@recruitvoiceai.de",
    areaServed: "DE",
    availableLanguage: "German",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Wormser Weg 5",
    addressLocality: "Düsseldorf",
    postalCode: "40229",
    addressCountry: "DE",
  },
  sameAs: [],
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className={`antialiased bg-background`}>
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
        {children}
      </body>
    </html>
  );
}
