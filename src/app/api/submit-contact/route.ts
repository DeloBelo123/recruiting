import { NextRequest, NextResponse } from 'next/server';
import * as fs from 'fs/promises';
import * as path from 'path';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Alle Felder sind erforderlich' },
        { status: 400 }
      );
    }

    const isVercel = process.env.VERCEL === '1';
    const filePath = isVercel 
      ? path.join('/tmp', 'message.txt')
      : path.join(process.cwd(), 'message.txt');

    const timestamp = new Date().toISOString();
    const content = `\n--- Neue Nachricht ---\nDatum: ${timestamp}\nName: ${name}\nE-Mail: ${email}\nNachricht: ${message}\n---`;

    try {
      await fs.access(filePath);
      await fs.appendFile(filePath, content, 'utf-8');
    } catch {
      await fs.writeFile(filePath, `Nachrichten\n${content}`, 'utf-8');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving contact form:', error);
    return NextResponse.json(
      { error: 'Fehler beim Speichern der Nachricht' },
      { status: 500 }
    );
  }
}

