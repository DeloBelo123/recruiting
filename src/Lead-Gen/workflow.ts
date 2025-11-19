import { scrapeMultipleUrls } from './scraper';
import {
  processLeads,
  removeDuplicates,
  filterValidLeads,
} from './processor';
import { createHubSpotContacts } from './hubspot';
import { sendEmails } from './mail-logik';
import { discoverLeads } from './discovery';
import type { ProcessedLead, Lead } from './types';
import { logger } from '../../BackendLib/utils/pino-logger';

export interface WorkflowResult {
  totalScraped: number;
  validLeads: number;
  hubspotContactsCreated: number;
  emailsSent: number;
  errors: string[];
}

export async function runLeadGenWorkflow(urls: string[]): Promise<WorkflowResult> {
  const result: WorkflowResult = {
    totalScraped: 0,
    validLeads: 0,
    hubspotContactsCreated: 0,
    emailsSent: 0,
    errors: [],
  };

  try {
    console.log(`Starting workflow for ${urls.length} URL(s)...`);

    const scrapingResults = await scrapeMultipleUrls(urls);
    const allLeads = scrapingResults.flatMap((r) => r.leads);
    result.totalScraped = allLeads.length;

    console.log(`Scraped ${result.totalScraped} leads`);

    let processedLeads = processLeads(allLeads);
    processedLeads = removeDuplicates(processedLeads);
    processedLeads = filterValidLeads(processedLeads);

    result.validLeads = processedLeads.length;
    console.log(`Valid leads after processing: ${result.validLeads}`);

    if (processedLeads.length === 0) {
      result.errors.push('No valid leads found');
      return result;
    }

    const hubspotContactIds = await createHubSpotContacts(processedLeads);
    result.hubspotContactsCreated = hubspotContactIds.length;
    console.log(`Created ${result.hubspotContactsCreated} HubSpot contacts`);

    const emailsSent = await sendEmails(processedLeads);
    result.emailsSent = emailsSent;
    console.log(`Sent ${result.emailsSent} emails`);

    console.log('Workflow completed successfully');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    result.errors.push(errorMessage);
    console.error('Workflow error:', errorMessage);
  }

  return result;
}

export async function runLeadGenWorkflowForLeads(
  leads: ProcessedLead[]
): Promise<WorkflowResult> {
  const result: WorkflowResult = {
    totalScraped: leads.length,
    validLeads: 0,
    hubspotContactsCreated: 0,
    emailsSent: 0,
    errors: [],
  };

  try {
    console.log(`Starting workflow for ${leads.length} lead(s)...`);

    let processedLeads = removeDuplicates(leads);
    processedLeads = filterValidLeads(processedLeads);

    result.validLeads = processedLeads.length;
    console.log(`Valid leads after processing: ${result.validLeads}`);

    if (processedLeads.length === 0) {
      result.errors.push('No valid leads found');
      return result;
    }

    const hubspotContactIds = await createHubSpotContacts(processedLeads);
    result.hubspotContactsCreated = hubspotContactIds.length;
    console.log(`Created ${result.hubspotContactsCreated} HubSpot contacts`);

    const emailsSent = await sendEmails(processedLeads);
    result.emailsSent = emailsSent;
    console.log(`Sent ${result.emailsSent} emails`);

    console.log('Workflow completed successfully');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    result.errors.push(errorMessage);
    console.error('Workflow error:', errorMessage);
  }

  return result;
}

export async function runAutomaticLeadGen(sendMail:boolean): Promise<WorkflowResult> {
  const result: WorkflowResult = {
    totalScraped: 0,
    validLeads: 0,
    hubspotContactsCreated: 0,
    emailsSent: 0,
    errors: [],
  };

  try {
    logger.info('🚀 Starting automatic lead generation workflow...');

    const discoveryResults = await discoverLeads();
    const allLeads: Lead[] = discoveryResults.flatMap((r) => r.leads);
    result.totalScraped = allLeads.length;

    logger.info(`📊 Discovered ${result.totalScraped} leads from ${discoveryResults.length} source(s)`);
    discoveryResults.forEach((r) => {
      logger.info(`  - ${r.source}: ${r.leads.length} leads`);
    });

    if (allLeads.length === 0) {
      result.errors.push('No leads discovered');
      logger.warn('⚠️ No leads discovered');
      return result;
    }

    logger.info('🔍 Processing leads...');
    let processedLeads = processLeads(allLeads);
    
    const invalidLeads = processedLeads.filter((l) => !l.isValid);
    const invalidReasons = invalidLeads.reduce((acc, lead) => {
      lead.errors.forEach((error) => {
        acc[error] = (acc[error] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);
    
    logger.info(`📋 Processing results: ${processedLeads.length} total, ${invalidLeads.length} invalid`);
    if (Object.keys(invalidReasons).length > 0) {
      logger.info('❌ Invalid lead reasons:');
      Object.entries(invalidReasons).forEach(([reason, count]) => {
        logger.info(`  - ${reason}: ${count} leads`);
      });
    }

    processedLeads = removeDuplicates(processedLeads);
    logger.info(`🔄 After duplicate removal: ${processedLeads.length} unique leads`);

    processedLeads = filterValidLeads(processedLeads);
    result.validLeads = processedLeads.length;
    logger.info(`✅ Valid leads after processing: ${result.validLeads}`);

    if (processedLeads.length === 0) {
      result.errors.push('No valid leads found after processing');
      logger.warn('⚠️ No valid leads found after processing');
      return result;
    }

    logger.info('📤 Creating HubSpot contacts...');
    const hubspotContactIds = await createHubSpotContacts(processedLeads);
    result.hubspotContactsCreated = hubspotContactIds.length;
    logger.info(`✅ Created ${result.hubspotContactsCreated} HubSpot contacts`);

    if (sendMail) {
      logger.info('📧 Sending emails...');
      const emailsSent = await sendEmails(processedLeads);
      result.emailsSent = emailsSent;
      logger.info(`✅ Sent ${result.emailsSent} emails`);
    }

    logger.info('✨ Automatic lead generation workflow completed successfully');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    result.errors.push(errorMessage);
    logger.error({ error }, '❌ Automatic lead generation error');
  }

  return result;
}

async function main(){
    await runAutomaticLeadGen(false)
}

main()