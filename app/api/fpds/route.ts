import { NextRequest, NextResponse } from "next/server";

const FPDS_ATOM_BASE = "https://www.fpds.gov/ezsearch/FEEDS/ATOM";

function buildFpdsAtomUrl(params: URLSearchParams) {
  const q = params.get("q")?.trim() || "";
  const start = params.get("start") || "0";
  const feedName = params.get("feed") || "PUBLIC";
  const s = params.get("s") || "FPDS";

  const url = new URL(FPDS_ATOM_BASE);
  url.searchParams.set("s", s);
  url.searchParams.set("FEEDNAME", feedName);
  url.searchParams.set("q", q);
  url.searchParams.set("start", start);

  // Optional params for parity / future
  const version = params.get("version");
  if (version) url.searchParams.set("VERSION", version);

  return url;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // Safer contract: we only accept structured `q` and a couple paging params.
    // We do NOT accept arbitrary `url` to avoid open-proxy vulnerabilities.
    const q = searchParams.get("q")?.trim();
    if (!q) {
      return NextResponse.json({ success: false, error: "Missing required query param: q" }, { status: 400 });
    }

    const fpdsUrl = buildFpdsAtomUrl(searchParams);

    const resp = await fetch(fpdsUrl.toString(), {
      method: "GET",
      headers: {
        "Accept": "application/atom+xml, application/xml, text/xml, */*",
      },
      cache: "no-store",
    });

    const xml = await resp.text();

    return new NextResponse(xml, {
      status: resp.status,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        // small cache to reduce repeated hits; can be tuned
        "Cache-Control": "public, max-age=60",
      },
    });
  } catch (error) {
    console.error("FPDS proxy error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch FPDS feed" }, { status: 500 });
  }
}
