import { NextRequest, NextResponse } from 'next/server';
import * as fs from 'fs/promises';
import * as path from 'path';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, company, email, phone } = body;

    if (!name || !company || !email || !phone) {
      return NextResponse.json(
        { error: 'Alle Felder sind erforderlich' },
        { status: 400 }
      );
    }

    const isVercel = process.env.VERCEL === '1';
    const filePath = isVercel 
      ? path.join('/tmp', 'price.txt')
      : path.join(process.cwd(), 'price.txt');

    const timestamp = new Date().toISOString();
    const content = `\n--- Neue Preisvereinbarung ---\nDatum: ${timestamp}\nName: ${name}\nUnternehmen: ${company}\nE-Mail: ${email}\nTelefon: ${phone}\n---`;

    try {
      await fs.access(filePath);
      await fs.appendFile(filePath, content, 'utf-8');
    } catch {
      await fs.writeFile(filePath, `Preisvereinbarungen\n${content}`, 'utf-8');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving pricing form:', error);
    return NextResponse.json(
      { error: 'Fehler beim Speichern der Daten' },
      { status: 500 }
    );
  }
}

