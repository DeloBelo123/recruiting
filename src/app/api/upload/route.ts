import { NextRequest, NextResponse } from "next/server"
import sendMailToMe from "../mail"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const candidatesCountStr = formData.get("candidatesCount") as string | null
    const jobRequirementsCountStr = formData.get("jobRequirementsCount") as string | null

    if (!candidatesCountStr || !jobRequirementsCountStr) {
      return NextResponse.json(
        { error: "Datei-Anzahl fehlt" },
        { status: 400 }
      )
    }

    const candidatesCount = parseInt(candidatesCountStr)
    const jobRequirementsCount = parseInt(jobRequirementsCountStr)

    if (isNaN(candidatesCount) || isNaN(jobRequirementsCount) || candidatesCount === 0 || jobRequirementsCount === 0) {
      return NextResponse.json(
        { error: "Beide Dateien sind erforderlich" },
        { status: 400 }
      )
    }

    const attachments: { filename: string; content: Buffer }[] = []
    const candidateNames: string[] = []
    const jobRequirementNames: string[] = []

    for (let i = 0; i < candidatesCount; i++) {
      const file = formData.get(`candidates_${i}`) as File | null
      if (file) {
        const buffer = Buffer.from(await file.arrayBuffer())
        attachments.push({
          filename: file.name,
          content: buffer,
        })
        candidateNames.push(file.name)
      } else {
        console.warn(`Kandidaten-Datei ${i} fehlt`)
      }
    }

    for (let i = 0; i < jobRequirementsCount; i++) {
      const file = formData.get(`jobRequirements_${i}`) as File | null
      if (file) {
        const buffer = Buffer.from(await file.arrayBuffer())
        attachments.push({
          filename: file.name,
          content: buffer,
        })
        jobRequirementNames.push(file.name)
      } else {
        console.warn(`Job-Requirements-Datei ${i} fehlt`)
      }
    }

    if (attachments.length === 0) {
      return NextResponse.json(
        { error: "Keine Dateien gefunden" },
        { status: 400 }
      )
    }

    await sendMailToMe({
      subject: "Neue CSV-Dateien hochgeladen",
      text: `Es wurden neue CSV-Dateien hochgeladen:\n\n- Kandidaten Liste (${candidatesCount} Datei${candidatesCount > 1 ? "en" : ""}): ${candidateNames.join(", ")}\n- Job Requirements (${jobRequirementsCount} Datei${jobRequirementsCount > 1 ? "en" : ""}): ${jobRequirementNames.join(", ")}`,
      attachments,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Upload error:", error)
    const errorMessage = error instanceof Error ? error.message : "Fehler beim Hochladen der Dateien"
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}

