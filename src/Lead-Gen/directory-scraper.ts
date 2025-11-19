import { scrapeFromUrl } from './scraper';
import type { Lead } from './types';
import { getConfig } from './config';

const GELBE_SEITEN_BASE = 'https://www.gelbeseiten.de';
const BRANCHENBUCH_BASE = 'https://www.branchenbuch.me';

export async function scrapeGelbeSeiten(
  keyword: string,
  location?: string
): Promise<Lead[]> {
  const searchQuery = location
    ? `${keyword} ${location}`
    : keyword;

  const searchUrl = `${GELBE_SEITEN_BASE}/Suche/${encodeURIComponent(
    searchQuery
  )}`;

  try {
    const result = await scrapeFromUrl(searchUrl);
    return result.leads;
  } catch (error) {
    console.error(`Failed to scrape Gelbe Seiten for ${searchQuery}:`, error);
    return [];
  }
}

export async function scrapeBranchenbuch(
  keyword: string,
  location?: string
): Promise<Lead[]> {
  const searchQuery = location
    ? `${keyword} ${location}`
    : keyword;

  const searchUrl = `${BRANCHENBUCH_BASE}/s/${encodeURIComponent(searchQuery)}`;

  try {
    const result = await scrapeFromUrl(searchUrl);
    return result.leads;
  } catch (error) {
    console.error(`Failed to scrape Branchenbuch for ${searchQuery}:`, error);
    return [];
  }
}

export async function scrapeDirectories(
  keywords: string[],
  regions: string[]
): Promise<Lead[]> {
  const allLeads: Lead[] = [];

  for (const keyword of keywords) {
    for (const region of regions) {
      try {
        const gelbeSeitenLeads = await scrapeGelbeSeiten(keyword, region);
        allLeads.push(...gelbeSeitenLeads);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        const branchenbuchLeads = await scrapeBranchenbuch(keyword, region);
        allLeads.push(...branchenbuchLeads);

        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`Error scraping directories for ${keyword} in ${region}:`, error);
      }
    }
  }

  return allLeads;
}

export async function generateDirectoryUrls(
  keywords: string[],
  regions: string[]
): Promise<string[]> {
  const urls: string[] = [];

  for (const keyword of keywords) {
    for (const region of regions) {
      const gelbeSeitenUrl = `${GELBE_SEITEN_BASE}/Suche/${encodeURIComponent(
        `${keyword} ${region}`
      )}`;
      urls.push(gelbeSeitenUrl);

      const branchenbuchUrl = `${BRANCHENBUCH_BASE}/s/${encodeURIComponent(
        `${keyword} ${region}`
      )}`;
      urls.push(branchenbuchUrl);
    }
  }

  return urls;
}

