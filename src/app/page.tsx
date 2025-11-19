import type { Metadata } from "next";
import Script from "next/script";
import Header from './components/Header';
import Hero from './components/Hero';
import TimeSavings from './components/TimeSavings';
import Features from './components/Features';
import Statistics from './components/Statistics';
import Availability from './components/Availability';
import ROI from './components/ROI';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

const baseUrl = "https://www.recruitvoiceai.de";

export const metadata: Metadata = {
  title: "Voice AI Recruiting | KI Recruiting Agent - RecruitVoiceAI",
  description: "Automatisiere dein Recruiting mit KI-gestützten Voice-Interviews. Voice AI Recruiting für Personalvermittlung und HR. Spare 140% Zeit im Recruiting-Prozess mit automatischen Anrufen.",
  keywords: [
    "Voice AI Recruiting",
    "KI Recruiting Agent",
    "Automatisches Recruiting",
    "Personalvermittlung AI",
    "HR Recruiting Software",
    "Recruiting Automatisierung",
  ],
  openGraph: {
    title: "Voice AI Recruiting | KI Recruiting Agent - RecruitVoiceAI",
    description: "Automatisiere dein Recruiting mit KI-gestützten Voice-Interviews. Spare 140% Zeit im Recruiting-Prozess.",
    url: baseUrl,
  },
  alternates: {
    canonical: baseUrl,
  },
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "RecruitVoiceAI",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "EUR",
    lowPrice: "99",
    highPrice: "299",
    offerCount: "3",
  },
  description: "Voice AI Recruiting Software für automatische Kandidaten-Anrufe und Qualifizierung. KI-gestützte Recruiting-Automatisierung für Personalvermittlung und HR.",
  featureList: [
    "Automatische Voice-AI Anrufe",
    "24/7 Verfügbarkeit",
    "CSV-Integration",
    "Kandidaten-Qualifizierung",
    "Dashboard & Analytics",
    "ATS/CRM Integration",
  ],
  screenshot: `${baseUrl}/data-table.png`,
  url: baseUrl,
  publisher: {
    "@type": "Organization",
    name: "RecruitVoiceAI",
  },
};

export default function Main() {
  return (
    <>
      <Script
        id="software-application-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationSchema),
        }}
      />
      <Header />
      <Hero />
      <Features />
      <Statistics />
      <Availability />
      <ROI />
      <Testimonials />
      <TimeSavings />
      <FAQ />
      <Footer />
    </>
  );
}
