import axios from 'axios';
import * as cheerio from 'cheerio';
import type { Lead, ScrapingResult } from './types';
import { logger } from '../../BackendLib/utils/pino-logger';

type CheerioElement = ReturnType<ReturnType<typeof cheerio.load>>;

export async function scrapeFromUrl(url: string): Promise<ScrapingResult> {
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'de-DE,de;q=0.9,en;q=0.8',
      },
      timeout: 10000,
    });

    const $ = cheerio.load(response.data);
    const leads: Lead[] = [];

    const isBranchenbuch = url.includes('branchenbuch.me');
    const isGelbeSeiten = url.includes('gelbeseiten.de');

    let selectors: string[] = [];
    if (isBranchenbuch) {
      selectors = [
        '.result-item',
        '.listing-item',
        '[class*="result"]',
        '[class*="listing"]',
        'div[data-id]',
      ];
    } else if (isGelbeSeiten) {
      selectors = [
        '.mod-Treffer',
        '.mod-TrefferListeTreffer',
        '[class*="Treffer"]',
        '.gs_result',
      ];
    } else {
      selectors = [
        'article',
        '.company',
        '.business',
        '[class*="company"]',
        '[class*="business"]',
        '[class*="result"]',
        '[class*="listing"]',
      ];
    }

    $(selectors.join(', ')).each((_, element) => {
      const $el = $(element);
      const html = $el.html() || '';

      const companyName = extractCompanyName($el, isBranchenbuch, isGelbeSeiten);
      if (!companyName || companyName.length < 2) return;

      const email = extractEmail(html);
      const website = extractWebsite($el);
      const phone = extractPhone(html);
      const city = extractCity($el, html, isBranchenbuch, isGelbeSeiten);

      const lead: Lead = {
        companyName: companyName.trim(),
        email: email || undefined,
        website: website || undefined,
        phone: phone || undefined,
        city: city || undefined,
      };

      leads.push(lead);
    });

    logger.debug({ url, leadsFound: leads.length }, `📥 Scraped ${leads.length} leads from ${url}`);

    return {
      leads,
      source: url,
      timestamp: new Date(),
    };
  } catch (error) {
    logger.error({ url, error }, `❌ Scraping failed for ${url}`);
    throw new Error(`Scraping failed for ${url}: ${error}`);
  }
}

function extractCompanyName($el: CheerioElement, isBranchenbuch: boolean, isGelbeSeiten: boolean): string {
  const selectors: string[] = [];
  
  if (isBranchenbuch) {
    selectors.push('h2', 'h3', '.company-name', '[class*="name"]', 'a[href*="/firmen/"]');
  } else if (isGelbeSeiten) {
    selectors.push('h2', 'h3', '.mod-TrefferName', '[class*="Name"]', 'a[href*="/firmen/"]');
  } else {
    selectors.push('h1', 'h2', 'h3', '.company-name', '[class*="name"]', 'a[href*="http"]');
  }

  for (const selector of selectors) {
    const text = $el.find(selector).first().text().trim();
    if (text && text.length > 1) return text;
  }

  const allText = $el.text().trim();
  const firstLine = allText.split('\n')[0].trim();
  if (firstLine && firstLine.length > 1 && firstLine.length < 100) {
    return firstLine;
  }

  return '';
}

function extractEmail(html: string): string | null {
  const emailRegex = /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/g;
  const matches = html.match(emailRegex);
  if (!matches) return null;

  for (const match of matches) {
    if (!match.includes('example.com') && !match.includes('test.com') && !match.includes('domain.com')) {
      return match.toLowerCase();
    }
  }

  return matches[0].toLowerCase();
}

function extractWebsite($el: CheerioElement): string | null {
  const links = $el.find('a[href^="http"]');
  
  for (let i = 0; i < links.length; i++) {
    const link = links.eq(i);
    const href = link.attr('href');
    if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
      const url = href.split('?')[0].split('#')[0];
      if (!url.includes('gelbeseiten.de') && !url.includes('branchenbuch.me') && !url.includes('google.com')) {
        return url;
      }
    }
  }

  return null;
}

function extractPhone(html: string): string | null {
  const phonePatterns = [
    /(\+49|0049|0)[\s.-]?(\d{2,4}[\s.-]?\d{6,10})/g,
    /(\+49|0049|0)[\s.-]?(\d{1,4}[\s.-]?\d{1,4}[\s.-]?\d{4,9})/g,
    /(\+?\d{1,3}[\s.-]?)?\(?\d{2,4}\)?[\s.-]?\d{2,4}[\s.-]?\d{4,9}/g,
  ];

  for (const pattern of phonePatterns) {
    const matches = html.match(pattern);
    if (matches) {
      for (const match of matches) {
        const cleaned = match.replace(/[^\d+]/g, '');
        if (cleaned.length >= 10 && cleaned.length <= 15) {
          return match.trim();
        }
      }
    }
  }

  return null;
}

function extractCity($el: CheerioElement, html: string, isBranchenbuch: boolean, isGelbeSeiten: boolean): string | null {
  const selectors: string[] = [];
  
  if (isBranchenbuch) {
    selectors.push('[class*="city"]', '[class*="location"]', '[class*="address"]', '[class*="ort"]', '.city', '.location');
  } else if (isGelbeSeiten) {
    selectors.push('[class*="Ort"]', '[class*="Stadt"]', '[class*="location"]', '[class*="address"]');
  } else {
    selectors.push('[class*="city"]', '[class*="location"]', '[class*="address"]', '.city', '.location');
  }

  for (const selector of selectors) {
    const text = $el.find(selector).first().text().trim();
    if (text && text.length > 1 && text.length < 50) {
      return text;
    }
  }

  const addressMatch = html.match(/\d{5}\s+([A-ZÄÖÜ][a-zäöüß]+(?:\s+[A-ZÄÖÜ][a-zäöüß]+)*)/);
  if (addressMatch && addressMatch[1]) {
    return addressMatch[1];
  }

  return null;
}

export async function scrapeMultipleUrls(urls: string[]): Promise<ScrapingResult[]> {
  const results: ScrapingResult[] = [];

  for (const url of urls) {
    try {
      const result = await scrapeFromUrl(url);
      results.push(result);
    } catch (error) {
      console.error(`Failed to scrape ${url}:`, error);
    }
  }

  return results;
}

