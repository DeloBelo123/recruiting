import { searchMultipleRegions } from './google-places';
import { scrapeDirectories } from './directory-scraper';
import { getConfig } from './config';
import type { Lead } from './types';
import { logger } from '../../BackendLib/utils/pino-logger';

export interface DiscoveryResult {
  source: string;
  leads: Lead[];
  timestamp: Date;
}

export async function discoverLeads(): Promise<DiscoveryResult[]> {
  const config = getConfig();
  const results: DiscoveryResult[] = [];

  logger.info('🔍 Starting automatic lead discovery...');
  logger.info(`📝 Keywords: ${config.keywords.join(', ')}`);
  logger.info(`📍 Regions: ${config.regions.join(', ')}`);

  if (config.googlePlacesApiKey) {
    try {
      logger.info('🌐 Searching Google Places...');
      const googleLeads = await searchMultipleRegions(
        config.keywords,
        config.regions
      );
      results.push({
        source: 'Google Places',
        leads: googleLeads,
        timestamp: new Date(),
      });
      logger.info(`✅ Found ${googleLeads.length} leads from Google Places`);
    } catch (error) {
      logger.error({ error }, '❌ Google Places discovery error');
    }
  } else {
    logger.info('⏭️ Google Places API key not configured, skipping...');
  }

  try {
    logger.info('📚 Scraping directories...');
    const directoryLeads = await scrapeDirectories(
      config.keywords,
      config.regions
    );
    results.push({
      source: 'Directories',
      leads: directoryLeads,
      timestamp: new Date(),
    });
    logger.info(`✅ Found ${directoryLeads.length} leads from directories`);
  } catch (error) {
    logger.error({ error }, '❌ Directory scraping error');
  }

  return results;
}

export async function discoverLeadsFromSource(
  source: 'google' | 'directories' | 'all'
): Promise<Lead[]> {
  const config = getConfig();
  const allLeads: Lead[] = [];

  if (source === 'google' || source === 'all') {
    if (config.googlePlacesApiKey) {
      const googleLeads = await searchMultipleRegions(
        config.keywords,
        config.regions
      );
      allLeads.push(...googleLeads);
    }
  }

  if (source === 'directories' || source === 'all') {
    const directoryLeads = await scrapeDirectories(
      config.keywords,
      config.regions
    );
    allLeads.push(...directoryLeads);
  }

  return allLeads;
}

