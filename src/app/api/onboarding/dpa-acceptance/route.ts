import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { customerName, accepted, timestamp } = body

    if (!accepted) {
      return NextResponse.json(
        { error: "DPA acceptance is required" },
        { status: 400 }
      )
    }

    // Here you could save to database
    // For now, we'll just log it and return success
    console.log("DPA Acceptance:", {
      customerName: customerName || "Unknown",
      accepted,
      timestamp: timestamp || new Date().toISOString(),
    })

    // TODO: Save to database if needed
    // Example:
    // await saveDPAAcceptance({
    //   customerName,
    //   accepted,
    //   timestamp: new Date().toISOString(),
    // })

    return NextResponse.json({
      success: true,
      message: "DPA acceptance recorded",
    })
  } catch (error) {
    console.error("Error recording DPA acceptance:", error)
    return NextResponse.json(
      { error: "Failed to record DPA acceptance" },
      { status: 500 }
    )
  }
}

