# SEO & AEO Setup - RecruitVoiceAI

## Implementierte Features

### ✅ Basis SEO
- Vollständige Meta Tags (Title, Description, Keywords)
- Open Graph Tags für Social Media
- Twitter Card Tags
- Canonical URLs
- Language-Attribut auf "de" gesetzt
- Robots Meta Tags konfiguriert

### ✅ Structured Data (JSON-LD)
- **Organization Schema** - Firmeninformationen
- **SoftwareApplication Schema** - App-Details und Features
- **FAQPage Schema** - Alle FAQ-Fragen/Antworten
- **HowTo Schema** - Schritt-für-Schritt Anleitung
- **LocalBusiness Schema** - Standort und Öffnungszeiten
- **Offer Schema** - Preispläne

### ✅ Technische SEO
- `robots.txt` erstellt (public/robots.txt)
- `sitemap.ts` erstellt (src/app/sitemap.ts)
- Alle öffentlichen Seiten indexiert
- Dashboard/Onboarding ausgeschlossen

### ✅ Google Analytics
- GA4 Integration vorbereitet
- Scripts in layout.tsx integriert

## Noch zu erledigen

### 1. Google Analytics Measurement ID
Erstelle eine `.env.local` Datei mit:
```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 2. Google Search Console Verification
Optional: Füge die Verification hinzu:
```
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=verification-code
```

### 3. Open Graph Image
Erstelle ein OG Image (1200x630px) und speichere es als:
- `public/og-image.jpg`

### 4. Logo für Schema.org
Erstelle ein Logo-Bild und speichere es als:
- `public/logo.png`

### 5. Favicon
Da das Logo eine React-Komponente ist, erstelle manuell Favicons:
- `public/favicon.ico`
- `public/apple-touch-icon.png`
- Optional: `public/manifest.json` für PWA

## Seiten-spezifische Metadata

Alle Seiten haben jetzt individuelle Metadata:
- **Homepage** (`/`) - Voice AI Recruiting Hauptkeywords
- **Pricing** (`/pricing`) - Preis-Keywords
- **How it works** (`/how-it-works`) - Prozess-Keywords
- **Kontakt** (`/kontakt`) - Kontakt-Keywords
- **Onboarding** (`/onboarding`) - Noindex (nicht öffentlich)

## Keywords Fokus

Die Website ist optimiert für:
- Voice AI Recruiting
- KI Recruiting Agent
- Automatisches Recruiting
- Personalvermittlung AI
- HR Recruiting Software
- Recruiting Automatisierung
- AI Personalvermittlung

## Nächste Schritte

1. Google Analytics einrichten und Measurement ID setzen
2. OG Image erstellen
3. Logo-Bild für Schema.org erstellen
4. Favicon erstellen
5. Google Search Console einrichten
6. Website bei Google Search Console einreichen
7. Sitemap bei Google Search Console einreichen

