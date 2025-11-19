export interface Lead {
  companyName: string;
  email?: string;
  website?: string;
  phone?: string;
  city?: string;
}

export interface ProcessedLead extends Lead {
  isValid: boolean;
  errors: string[];
}

export interface ScrapingResult {
  leads: Lead[];
  source: string;
  timestamp: Date;
}

export interface HubSpotContact {
  properties: {
    company?: string;
    email?: string;
    website?: string;
    phone?: string;
    city?: string;
  };
}

export interface MailChimpMessage {
  to: string;
  subject: string;
  html: string;
}

