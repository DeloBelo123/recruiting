import axios from 'axios';
import type { Lead } from './types';
import { getConfig } from './config';

const GOOGLE_PLACES_BASE_URL = 'https://maps.googleapis.com/maps/api/place';

interface GooglePlaceResult {
  place_id: string;
  name: string;
  formatted_address?: string;
  formatted_phone_number?: string;
  website?: string;
  geometry?: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

interface GooglePlacesResponse {
  results: GooglePlaceResult[];
  status: string;
  next_page_token?: string;
}

interface PlaceDetailsResponse {
  result: {
    name: string;
    formatted_address?: string;
    formatted_phone_number?: string;
    website?: string;
    address_components?: Array<{
      types: string[];
      long_name: string;
    }>;
  };
  status: string;
}

export async function searchGooglePlaces(
  query: string,
  location?: string
): Promise<Lead[]> {
  const config = getConfig();
  const apiKey = config.googlePlacesApiKey;

  if (!apiKey) {
    throw new Error('GOOGLE_PLACES_API_KEY not configured');
  }

  const leads: Lead[] = [];
  const searchQuery = location ? `${query} ${location}` : query;

  try {
    const searchUrl = `${GOOGLE_PLACES_BASE_URL}/textsearch/json`;
    const searchParams = new URLSearchParams({
      query: searchQuery,
      key: apiKey,
      language: 'de',
    });

    const searchResponse = await axios.get<GooglePlacesResponse>(
      `${searchUrl}?${searchParams.toString()}`
    );

    if (searchResponse.data.status !== 'OK') {
      console.error('Google Places API error:', searchResponse.data.status);
      return leads;
    }

    const maxResults = config.maxResultsPerSource || 50;
    const results = searchResponse.data.results.slice(0, maxResults);

    for (const place of results) {
      try {
        const details = await getPlaceDetails(place.place_id, apiKey);
        if (details) {
          const lead = convertToLead(details);
          if (lead.companyName) {
            leads.push(lead);
          }
        }

        await new Promise((resolve) => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`Failed to get details for ${place.name}:`, error);
      }
    }
  } catch (error) {
    console.error('Google Places search error:', error);
  }

  return leads;
}

async function getPlaceDetails(
  placeId: string,
  apiKey: string
): Promise<PlaceDetailsResponse['result'] | null> {
  try {
    const detailsUrl = `${GOOGLE_PLACES_BASE_URL}/details/json`;
    const params = new URLSearchParams({
      place_id: placeId,
      key: apiKey,
      fields: 'name,formatted_address,formatted_phone_number,website,address_components',
      language: 'de',
    });

    const response = await axios.get<PlaceDetailsResponse>(
      `${detailsUrl}?${params.toString()}`
    );

    if (response.data.status === 'OK') {
      return response.data.result;
    }
  } catch (error) {
    console.error('Place details error:', error);
  }

  return null;
}

function convertToLead(place: PlaceDetailsResponse['result']): Lead {
  const city = extractCity(place.address_components || []);

  return {
    companyName: place.name,
    website: place.website,
    phone: place.formatted_phone_number,
    city: city || place.formatted_address?.split(',')[0],
  };
}

function extractCity(
  addressComponents: Array<{ types: string[]; long_name: string }>
): string | undefined {
  const cityComponent = addressComponents.find((component) =>
    component.types.includes('locality')
  );
  return cityComponent?.long_name;
}

export async function searchMultipleRegions(
  keywords: string[],
  regions: string[]
): Promise<Lead[]> {
  const allLeads: Lead[] = [];

  for (const keyword of keywords) {
    for (const region of regions) {
      try {
        const leads = await searchGooglePlaces(keyword, region);
        allLeads.push(...leads);

        await new Promise((resolve) => setTimeout(resolve, 200));
      } catch (error) {
        console.error(`Error searching ${keyword} in ${region}:`, error);
      }
    }
  }

  return allLeads;
}

