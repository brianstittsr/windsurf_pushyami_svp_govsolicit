import { NextResponse } from "next/server";
import type { SearchFilters } from "@/lib/procurement/types";
import { searchPlatforms } from "@/lib/procurement/multiPlatform";
import type { PlatformId } from "@/lib/procurement/platforms";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      filters?: SearchFilters;
      platforms?: PlatformId[];
    };

    const filters = body.filters || {};
    const platforms = body.platforms && body.platforms.length
      ? body.platforms
      : (["sam-gov", "dc-contracts", "fpds"] as PlatformId[]);

    const results = await searchPlatforms(filters, platforms);

    return NextResponse.json({ results });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to search solicitations" }, { status: 500 });
  }
}
