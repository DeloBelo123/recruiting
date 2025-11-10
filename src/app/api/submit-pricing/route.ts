import { NextRequest, NextResponse } from 'next/server';
import { add_to_file, does_file_exist, create_file } from '../../../../BackendLib/utils/file-utils';
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

    const projectRoot = path.resolve(process.cwd());
    const filePath = path.join(projectRoot, 'price.txt');

    const timestamp = new Date().toISOString();
    const content = `\n--- Neue Preisvereinbarung ---\nDatum: ${timestamp}\nName: ${name}\nUnternehmen: ${company}\nE-Mail: ${email}\nTelefon: ${phone}\n---`;

    const fileExists = await does_file_exist(filePath);
    if (!fileExists) {
      await create_file(filePath, 'Preisvereinbarungen\n');
    }

    await add_to_file(filePath, content);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving pricing form:', error);
    return NextResponse.json(
      { error: 'Fehler beim Speichern der Daten' },
      { status: 500 }
    );
  }
}

