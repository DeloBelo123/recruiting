import type { Metadata } from "next";
import Script from "next/script";

const baseUrl = "https://www.recruitvoiceai.de";

export const metadata: Metadata = {
  title: "So funktioniert's - RecruitVoiceAI",
  description: "Erfahre, wie Voice AI Recruiting funktioniert. In 3 einfachen Schritten zu automatisiertem Recruiting: CSV exportieren, hochladen, AI startet automatisch.",
  keywords: [
    "Voice AI Recruiting wie funktioniert",
    "KI Recruiting Prozess",
    "Recruiting Automatisierung Ablauf",
    "Voice Recruiting Workflow",
  ],
  openGraph: {
    title: "So funktioniert's - RecruitVoiceAI",
    description: "Erfahre, wie Voice AI Recruiting funktioniert. In 3 einfachen Schritten zu automatisiertem Recruiting.",
    url: `${baseUrl}/how-it-works`,
  },
  alternates: {
    canonical: `${baseUrl}/how-it-works`,
  },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Wie funktioniert Voice AI Recruiting mit RecruitVoiceAI",
  description: "Schritt-für-Schritt Anleitung zur Nutzung von RecruitVoiceAI für automatisches Recruiting",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "CSV-Dateien exportieren",
      text: "Exportiere deine Kandidatenliste und Requirements aus deinem CRM oder ATS als CSV-Datei.",
      itemListElement: [
        {
          "@type": "HowToDirection",
          text: "Öffne dein CRM/ATS-System",
        },
        {
          "@type": "HowToDirection",
          text: "Navigiere zur Kandidaten-Tabelle",
        },
        {
          "@type": "HowToDirection",
          text: "Wähle 'Exportieren' oder 'Als CSV speichern'",
        },
        {
          "@type": "HowToDirection",
          text: "Wiederhole den Prozess für die Requirements-Tabelle",
        },
      ],
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "CSV-Dateien hochladen",
      text: "Lade deine CSV-Dateien über das Dashboard hoch",
      itemListElement: [
        {
          "@type": "HowToDirection",
          text: "Öffne das Dashboard in deinem Browser",
        },
        {
          "@type": "HowToDirection",
          text: "Navigiere zur Upload-Seite",
        },
        {
          "@type": "HowToDirection",
          text: "Ziehe beide CSV-Dateien per Drag & Drop in den Upload-Bereich",
        },
        {
          "@type": "HowToDirection",
          text: "Die Dateien werden automatisch hochgeladen und verarbeitet",
        },
      ],
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "AI startet automatisch",
      text: "Die AI beginnt automatisch mit den Anrufen basierend auf deinen Daten.",
      itemListElement: [
        {
          "@type": "HowToDirection",
          text: "Die AI importiert deine Kandidatenliste",
        },
        {
          "@type": "HowToDirection",
          text: "Sie vergleicht Kandidaten mit deinen Requirements",
        },
        {
          "@type": "HowToDirection",
          text: "Automatische Anrufe werden gestartet",
        },
        {
          "@type": "HowToDirection",
          text: "Du erhältst Updates im Dashboard",
        },
      ],
    },
  ],
};

export default function HowItWorksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="howto-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />
      {children}
    </>
  );
}

