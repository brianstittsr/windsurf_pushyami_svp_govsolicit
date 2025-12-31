"use client";

import { useCallback, useState } from "react";
import type { SearchFilters } from "@/lib/procurement/types";
import type { PlatformId, PlatformSolicitation } from "@/lib/procurement/platforms";

export function useSolicitationSearch() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<PlatformSolicitation[]>([]);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (filters: SearchFilters, platforms: PlatformId[]) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/solicitations/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filters, platforms }),
      });

      if (!res.ok) {
        setError("Search failed");
        setResults([]);
        return;
      }

      const data = await res.json();
      setResults(data.results || []);
    } catch {
      setError("Search failed");
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, results, error, search };
}
