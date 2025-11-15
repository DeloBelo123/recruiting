import type { Metadata } from "next";
import Script from "next/script";

const baseUrl = "https://www.recruitvoiceai.de";

export const metadata: Metadata = {
  title: "Preise & Pricing - RecruitVoiceAI",
  description: "Transparente Preise für Voice AI Recruiting. Starter ab 99€/Monat, Professional ab 299€/Monat. Jederzeit upgraden oder downgraden. Pilot-Kunden erhalten 50% Rabatt.",
  keywords: [
    "Recruiting Software Preise",
    "Voice AI Recruiting Kosten",
    "KI Recruiting Pricing",
    "Recruiting Automatisierung Preise",
  ],
  openGraph: {
    title: "Preise & Pricing - RecruitVoiceAI",
    description: "Transparente Preise für Voice AI Recruiting. Starter ab 99€/Monat, Professional ab 299€/Monat.",
    url: `${baseUrl}/pricing`,
  },
  alternates: {
    canonical: `${baseUrl}/pricing`,
  },
};

const offerSchema = {
  "@context": "https://schema.org",
  "@type": "Offer",
  name: "RecruitVoiceAI Pricing Plans",
  description: "Voice AI Recruiting Software Pricing",
  offers: [
    {
      "@type": "Offer",
      name: "Starter Plan",
      price: "99",
      priceCurrency: "EUR",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "99",
        priceCurrency: "EUR",
        unitCode: "MON",
      },
      description: "Perfekt für kleine Teams - 500 Minuten inklusive",
    },
    {
      "@type": "Offer",
      name: "Professional Plan",
      price: "299",
      priceCurrency: "EUR",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "299",
        priceCurrency: "EUR",
        unitCode: "MON",
      },
      description: "Für wachsende Recruiting-Teams - 2000 Minuten inklusive",
    },
    {
      "@type": "Offer",
      name: "Enterprise Plan",
      price: "Custom",
      priceCurrency: "EUR",
      description: "Für große Organisationen - Unbegrenzte Minuten",
    },
  ],
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="offer-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(offerSchema),
        }}
      />
      {children}
    </>
  );
}

