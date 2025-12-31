"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2, Search } from "lucide-react";
import { useSolicitationSearch } from "@/hooks/useSolicitationSearch";
import type { PlatformId } from "@/lib/procurement/platforms";

const DEFAULT_PLATFORMS: PlatformId[] = ["sam-gov", "dc-contracts", "fpds"];

export default function SolicitationsPage() {
  const { loading, results, error, search } = useSolicitationSearch();
  const [keyword, setKeyword] = useState("information technology");
  const [platform, setPlatform] = useState<PlatformId | "all">("all");
  const [naics, setNaics] = useState("");

  const platforms = useMemo<PlatformId[]>(() => {
    return platform === "all" ? DEFAULT_PLATFORMS : [platform];
  }, [platform]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Solicitation Search</h1>
        <p className="text-muted-foreground">Aggregated search across SAM.gov, DC Contracts, and FPDS.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search</CardTitle>
          <CardDescription>API keys are server-side only. If SAM.gov key is missing, it will return SAM results as empty.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-4">
          <div className="space-y-2 md:col-span-2">
            <Label>Keyword</Label>
            <Input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="information technology" />
          </div>
          <div className="space-y-2">
            <Label>NAICS</Label>
            <Input value={naics} onChange={(e) => setNaics(e.target.value)} placeholder="541611" />
          </div>
          <div className="space-y-2">
            <Label>Platform</Label>
            <Select value={platform} onValueChange={(v) => setPlatform(v as any)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="sam-gov">SAM.gov</SelectItem>
                <SelectItem value="dc-contracts">DC Contracts</SelectItem>
                <SelectItem value="fpds">FPDS</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-4">
            <Button
              onClick={() => search({ keyword, naicsCode: naics || undefined }, platforms)}
              disabled={loading}
            >
              {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Search className="h-4 w-4 mr-2" />}
              Search
            </Button>
          </div>

          {error ? <div className="md:col-span-4 text-sm text-destructive">{error}</div> : null}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <div>
              <CardTitle>Results</CardTitle>
              <CardDescription>Showing {results.length} results.</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {platforms.map((p) => (
                <Badge key={p} variant="secondary">{p}</Badge>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {results.length === 0 ? (
            <div className="text-sm text-muted-foreground">No results yet. Run a search.</div>
          ) : (
            <div className="border rounded-lg overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Platform</TableHead>
                    <TableHead>Agency</TableHead>
                    <TableHead>Posted</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="min-w-[520px]">
                        <a className="font-medium hover:underline" href={r.url} target="_blank" rel="noreferrer">
                          {r.title}
                        </a>
                        <div className="text-xs text-muted-foreground line-clamp-2">{r.description}</div>
                      </TableCell>
                      <TableCell className="min-w-[140px]">{r.platformName}</TableCell>
                      <TableCell className="min-w-[200px]">{r.agency}</TableCell>
                      <TableCell className="min-w-[180px]">{r.postedDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          <div className="mt-4 text-sm text-muted-foreground">
            Tip: set <code>SAM_GOV_API_KEY</code> in <code>.env.local</code> to enable SAM.gov results.
          </div>

          <div className="mt-2 text-sm">
            <Link className="underline" href="/fpds-search">Go to FPDS Search</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
