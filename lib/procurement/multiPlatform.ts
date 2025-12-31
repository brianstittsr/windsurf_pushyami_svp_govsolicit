import type { SearchFilters } from "./types";
import type { PlatformId, PlatformSolicitation } from "./platforms";
import { searchSamGov } from "./samGov";
import { searchDcContracts } from "./dcContracts";
import { searchFpds } from "./fpds";

function removeDuplicates(solicitations: PlatformSolicitation[]): PlatformSolicitation[] {
  const seen = new Set<string>();
  return solicitations.filter((s) => {
    const key = `${(s.title || "").toLowerCase()}-${(s.agency || "").toLowerCase()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export async function searchPlatforms(filters: SearchFilters, platforms: PlatformId[]): Promise<PlatformSolicitation[]> {
  const tasks = platforms.map(async (platformId) => {
    switch (platformId) {
      case "sam-gov":
        return searchSamGov(filters);
      case "dc-contracts":
        return searchDcContracts(filters);
      case "fpds":
        return searchFpds(filters);
      default:
        return [];
    }
  });

  const settled = await Promise.allSettled(tasks);
  const merged: PlatformSolicitation[] = [];

  settled.forEach((r) => {
    if (r.status === "fulfilled") merged.push(...r.value);
  });

  return removeDuplicates(merged);
}
