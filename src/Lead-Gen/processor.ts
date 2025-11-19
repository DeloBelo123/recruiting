import type { Lead, ProcessedLead } from './types';
import { logger } from '../../BackendLib/utils/pino-logger';

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateWebsite(website: string): boolean {
  try {
    const url = new URL(website.startsWith('http') ? website : `https://${website}`);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

export function cleanPhone(phone: string): string {
  return phone.replace(/[^\d+]/g, '');
}

export function processLead(lead: Lead): ProcessedLead {
  const errors: string[] = [];

  if (!lead.companyName || lead.companyName.trim().length === 0) {
    errors.push('Company name is required');
  }

  if (lead.email && !validateEmail(lead.email)) {
    errors.push('Invalid email format');
    lead.email = undefined;
  }

  if (lead.website && !validateWebsite(lead.website)) {
    errors.push('Invalid website format');
    lead.website = undefined;
  }

  if (lead.phone) {
    const cleanedPhone = cleanPhone(lead.phone);
    if (cleanedPhone.length >= 10 && cleanedPhone.length <= 15) {
      lead.phone = cleanedPhone;
    } else {
      lead.phone = undefined;
    }
  }

  const isValid = errors.length === 0 && lead.companyName.trim().length > 0;

  return {
    ...lead,
    companyName: lead.companyName.trim(),
    email: lead.email?.trim().toLowerCase(),
    website: lead.website?.trim().toLowerCase(),
    isValid,
    errors,
  };
}

export function processLeads(leads: Lead[]): ProcessedLead[] {
  return leads.map(processLead);
}

export function removeDuplicates(leads: ProcessedLead[]): ProcessedLead[] {
  const seen = new Set<string>();
  const unique: ProcessedLead[] = [];

  for (const lead of leads) {
    const key = lead.email || lead.companyName.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(lead);
    }
  }

  return unique;
}

export function filterValidLeads(leads: ProcessedLead[]): ProcessedLead[] {
  return leads.filter((lead) => lead.isValid);
}

