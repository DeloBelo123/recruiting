import type { Metadata } from "next";
import Script from "next/script";

const baseUrl = "https://www.recruitvoiceai.de";

export const metadata: Metadata = {
  title: "Kontakt - RecruitVoiceAI",
  description: "Kontaktiere RecruitVoiceAI für Voice AI Recruiting Lösungen. Erreichbar per E-Mail, Telefon oder Kontaktformular. Wormser Weg 5, 40229 Düsseldorf.",
  keywords: [
    "RecruitVoiceAI Kontakt",
    "Voice AI Recruiting Kontakt",
    "KI Recruiting Support",
  ],
  openGraph: {
    title: "Kontakt - RecruitVoiceAI",
    description: "Kontaktiere RecruitVoiceAI für Voice AI Recruiting Lösungen. Erreichbar per E-Mail, Telefon oder Kontaktformular.",
    url: `${baseUrl}/kontakt`,
  },
  alternates: {
    canonical: `${baseUrl}/kontakt`,
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "RecruitVoiceAI",
  image: `${baseUrl}/logo.png`,
  "@id": `${baseUrl}/kontakt`,
  url: baseUrl,
  telephone: "+49-176-20620226",
  email: "info@recruitvoiceai.de",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Wormser Weg 5",
    addressLocality: "Düsseldorf",
    postalCode: "40229",
    addressCountry: "DE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "51.2277",
    longitude: "6.7735",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Friday",
      ],
      opens: "15:00",
      closes: "21:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Thursday",
      opens: "17:00",
      closes: "21:00",
    },
  ],
  priceRange: "€€",
  areaServed: {
    "@type": "Country",
    name: "Deutschland",
  },
};

export default function KontaktLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      {children}
    </>
  );
}

