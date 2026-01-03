import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { apiKey } = body;

    if (!apiKey) {
      return NextResponse.json({ success: false, error: "API key is required" }, { status: 400 });
    }

    // Test the SAM.gov API connection with a simple search
    const testUrl = `https://api.sam.gov/opportunities/v2/search?api_key=${apiKey}&limit=1&postedFrom=01/01/2024&postedTo=12/31/2024`;

    const response = await fetch(testUrl, {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      return NextResponse.json({
        success: true,
        message: "Connection successful",
        totalRecords: data.totalRecords || 0,
      });
    } else {
      const errorText = await response.text();
      return NextResponse.json({
        success: false,
        error: `API returned ${response.status}: ${errorText}`,
      });
    }
  } catch (error) {
    console.error("Error testing SAM.gov connection:", error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Connection test failed",
    }, { status: 500 });
  }
}
