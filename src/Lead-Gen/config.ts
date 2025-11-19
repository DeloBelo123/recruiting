export interface DiscoveryConfig {
  keywords: string[];
  regions: string[];
  googlePlacesApiKey?: string;
  maxResultsPerSource?: number;
}

export const DEFAULT_CONFIG: DiscoveryConfig = {
  keywords: [
    'Recruiting Agentur',
    'Personalberatung',
    'Headhunter',
    'Personaldienstleistung',
    'Recruiting Unternehmen',
  ],
  regions: [
    'Deutschland',
    'Berlin',
    'München',
    'Hamburg',
    'Frankfurt',
    'Köln',
    'Stuttgart',
    'Düsseldorf',
  ],
  maxResultsPerSource: 50,
};

export function getConfig(): DiscoveryConfig {
  const googlePlacesApiKey = process.env.GOOGLE_PLACES_API_KEY;

  return {
    ...DEFAULT_CONFIG,
    googlePlacesApiKey,
  };
}

