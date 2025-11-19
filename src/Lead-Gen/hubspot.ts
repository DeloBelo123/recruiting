import axios from 'axios';
import type { ProcessedLead, HubSpotContact } from './types';
import { logger } from '../../BackendLib/utils/pino-logger';

const HUBSPOT_API_KEY = process.env.HUBSPOT;
const HUBSPOT_BASE_URL = 'https://api.hubapi.com';

export async function contactExistsInHubSpot(email: string): Promise<boolean> {
  if (!HUBSPOT_API_KEY) {
    return false;
  }

  if (!email) {
    return false;
  }

  try {
    const response = await axios.post(
      `${HUBSPOT_BASE_URL}/crm/v3/objects/contacts/search`,
      {
        filterGroups: [
          {
            filters: [
              {
                propertyName: 'email',
                operator: 'EQ',
                value: email,
              },
            ],
          },
        ],
        limit: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${HUBSPOT_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.results && response.data.results.length > 0;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('HubSpot search error:', error.response?.data || error.message);
    }
    return false;
  }
}

export async function createHubSpotContact(lead: ProcessedLead): Promise<string | null> {
  if (!HUBSPOT_API_KEY) {
    logger.warn('⚠️ HUBSPOT API key not configured - skipping contact creation');
    return null;
  }

  if (!lead.isValid) {
    return null;
  }

  const contact: HubSpotContact = {
    properties: {},
  };

  if (lead.companyName) {
    contact.properties.company = lead.companyName;
  }
  if (lead.email) {
    contact.properties.email = lead.email;
  }
  if (lead.website) {
    contact.properties.website = lead.website;
  }
  if (lead.phone) {
    contact.properties.phone = lead.phone;
  }
  if (lead.city) {
    contact.properties.city = lead.city;
  }

  try {
    const response = await axios.post(
      `${HUBSPOT_BASE_URL}/crm/v3/objects/contacts`,
      contact,
      {
        headers: {
          Authorization: `Bearer ${HUBSPOT_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.id || null;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('HubSpot API error:', error.response?.data || error.message);
    }
    throw new Error(`Failed to create HubSpot contact: ${error}`);
  }
}

export async function createHubSpotContacts(leads: ProcessedLead[]): Promise<string[]> {
  const contactIds: string[] = [];

  for (const lead of leads) {
    try {
      if (lead.email) {
        const exists = await contactExistsInHubSpot(lead.email);
        if (exists) {
          logger.debug(`⏭️ Contact with email ${lead.email} already exists in HubSpot, skipping...`);
          continue;
        }
      }

      logger.debug(`📝 Creating contact for ${lead.companyName} (${lead.email || 'no email'})`);
      const contactId = await createHubSpotContact(lead);
      if (contactId) {
        contactIds.push(contactId);
        logger.debug(`✅ Created HubSpot contact: ${contactId} for ${lead.companyName}`);
      } else {
        logger.debug(`⚠️ Failed to create contact for ${lead.companyName} (no API key or invalid)`);
      }
    } catch (error) {
      logger.error({ error, lead: lead.companyName }, `❌ Failed to create contact for ${lead.companyName}`);
    }
  }

  return contactIds;
}

