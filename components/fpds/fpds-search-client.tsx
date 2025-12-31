"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Download, Loader2, Search, History, RotateCcw } from "lucide-react";
import { searchFpds } from "@/lib/fpds/fpds-service";
import type { FpdsContractRecord, FpdsSearchParams, FpdsSearchResult } from "@/lib/fpds/fpds-types";

const HISTORY_KEY = "fpds_search_history_v1";

function downloadCsv(rows: FpdsContractRecord[]) {
  const headers = [
    "title",
    "agencyName",
    "agencyId",
    "piid",
    "modNumber",
    "transactionNumber",
    "signedDate",
    "modified",
    "obligatedAmount",
    "link",
  ];

  const escape = (v: unknown) => {
    const s = v == null ? "" : String(v);
    if (s.includes(",") || s.includes("\n") || s.includes('"')) return `"${s.replace(/"/g, '""')}"`;
    return s;
  };

  const lines = [headers.join(",")].concat(
    rows.map((r) => headers.map((h) => escape((r as any)[h])).join(","))
  );

  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `fpds-results-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function FpdsSearchClient() {
  const [params, setParams] = useState<FpdsSearchParams>({
    maxRecords: 25,
    sortField: "LAST_MOD_DATE",
    sortDirection: "desc",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FpdsSearchResult | null>(null);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [history, setHistory] = useState<Array<{ id: string; label: string; params: FpdsSearchParams }>>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      if (raw) setHistory(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  const historyLabel = useMemo(() => {
    const bits: string[] = [];
    if (params.vendorName) bits.push(`Vendor: ${params.vendorName}`);
    if (params.piid) bits.push(`PIID: ${params.piid}`);
    if (params.naics) bits.push(`NAICS: ${params.naics}`);
    if (params.psc) bits.push(`PSC: ${params.psc}`);
    if (params.agencyName) bits.push(`Agency: ${params.agencyName}`);
    if (!bits.length && params.descriptionKeywords) bits.push(params.descriptionKeywords);
    return bits.slice(0, 3).join(" • ") || "FPDS Search";
  }, [params]);

  const saveHistory = (p: FpdsSearchParams) => {
    const entry = {
      id: String(Date.now()),
      label: historyLabel,
      params: p,
    };

    const next = [entry, ...history].slice(0, 25);
    setHistory(next);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
  };

  const runSearch = async (p: FpdsSearchParams) => {
    setLoading(true);
    setResult(null);
    try {
      const r = await searchFpds(p);
      setResult(r);
      saveHistory(p);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setParams({ maxRecords: 25, sortField: "LAST_MOD_DATE", sortDirection: "desc" });
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">FPDS Search</h1>
          <p className="text-muted-foreground">
            Search FPDS via server-side proxy (CORS-safe). Fielded query is generated automatically.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setHistoryOpen(true)}>
            <History className="h-4 w-4 mr-2" />
            History
          </Button>
          <Button variant="outline" onClick={reset}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button onClick={() => runSearch(params)} disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Search className="h-4 w-4 mr-2" />}
            Search
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Start with vendor + date range. Add NAICS/PSC/PIID as needed.</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" defaultValue={["basic"]}>
            <AccordionItem value="basic">
              <AccordionTrigger>Basic</AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Vendor Name</Label>
                    <Input value={params.vendorName || ""} onChange={(e) => setParams((p) => ({ ...p, vendorName: e.target.value }))} />
                  </div>
                  <div className="space-y-2">
                    <Label>PIID / Contract #</Label>
                    <Input value={params.piid || ""} onChange={(e) => setParams((p) => ({ ...p, piid: e.target.value }))} />
                  </div>
                  <div className="space-y-2">
                    <Label>Description Keywords</Label>
                    <Input value={params.descriptionKeywords || ""} onChange={(e) => setParams((p) => ({ ...p, descriptionKeywords: e.target.value }))} />
                  </div>

                  <div className="space-y-2">
                    <Label>NAICS</Label>
                    <Input value={params.naics || ""} onChange={(e) => setParams((p) => ({ ...p, naics: e.target.value }))} placeholder="541611" />
                  </div>
                  <div className="space-y-2">
                    <Label>PSC</Label>
                    <Input value={params.psc || ""} onChange={(e) => setParams((p) => ({ ...p, psc: e.target.value }))} placeholder="D399" />
                  </div>
                  <div className="space-y-2">
                    <Label>Agency Name</Label>
                    <Input value={params.agencyName || ""} onChange={(e) => setParams((p) => ({ ...p, agencyName: e.target.value }))} />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="dates">
              <AccordionTrigger>Date Ranges</AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Signed Date Start</Label>
                      <Input type="date" value={params.signedDateStart || ""} onChange={(e) => setParams((p) => ({ ...p, signedDateStart: e.target.value }))} />
                    </div>
                    <div className="space-y-2">
                      <Label>Signed Date End</Label>
                      <Input type="date" value={params.signedDateEnd || ""} onChange={(e) => setParams((p) => ({ ...p, signedDateEnd: e.target.value }))} />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Last Modified Start</Label>
                      <Input type="date" value={params.lastModifiedStart || ""} onChange={(e) => setParams((p) => ({ ...p, lastModifiedStart: e.target.value }))} />
                    </div>
                    <div className="space-y-2">
                      <Label>Last Modified End</Label>
                      <Input type="date" value={params.lastModifiedEnd || ""} onChange={(e) => setParams((p) => ({ ...p, lastModifiedEnd: e.target.value }))} />
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="money">
              <AccordionTrigger>Financial</AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Min Obligated ($)</Label>
                    <Input
                      type="number"
                      value={params.minObligated ?? ""}
                      onChange={(e) => setParams((p) => ({ ...p, minObligated: e.target.value ? Number(e.target.value) : undefined }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Max Obligated ($)</Label>
                    <Input
                      type="number"
                      value={params.maxObligated ?? ""}
                      onChange={(e) => setParams((p) => ({ ...p, maxObligated: e.target.value ? Number(e.target.value) : undefined }))}
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="output">
              <AccordionTrigger>Output</AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Max Records</Label>
                    <Select
                      value={String(params.maxRecords ?? 25)}
                      onValueChange={(v) => setParams((p) => ({ ...p, maxRecords: Number(v) }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[10, 25, 50, 100].map((n) => (
                          <SelectItem key={n} value={String(n)}>
                            {n}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Sort Field</Label>
                    <Select
                      value={params.sortField || "LAST_MOD_DATE"}
                      onValueChange={(v) => setParams((p) => ({ ...p, sortField: v as any }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="LAST_MOD_DATE">Last Modified</SelectItem>
                        <SelectItem value="SIGNED_DATE">Signed Date</SelectItem>
                        <SelectItem value="OBLIGATED_AMOUNT">Obligated Amount</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Sort Direction</Label>
                    <Select
                      value={params.sortDirection || "desc"}
                      onValueChange={(v) => setParams((p) => ({ ...p, sortDirection: v as any }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="desc">Desc</SelectItem>
                        <SelectItem value="asc">Asc</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle>Results</CardTitle>
              <CardDescription>
                {result?.query?.q ? (
                  <span>
                    Query: <code className="text-xs">{result.query.q}</code>
                  </span>
                ) : (
                  "Run a search to see results."
                )}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {result?.isDemo ? <Badge variant="secondary">Demo</Badge> : null}
              {result?.records?.length ? (
                <Button variant="outline" onClick={() => downloadCsv(result.records)}>
                  <Download className="h-4 w-4 mr-2" />
                  CSV
                </Button>
              ) : null}
            </div>
          </div>
          {result?.message ? <p className="text-sm text-muted-foreground">{result.message}</p> : null}
        </CardHeader>
        <CardContent>
          {!result?.records?.length ? (
            <div className="text-sm text-muted-foreground">No results.</div>
          ) : (
            <div className="border rounded-lg overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Agency</TableHead>
                    <TableHead>PIID</TableHead>
                    <TableHead>Signed</TableHead>
                    <TableHead>Obligated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {result.records.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="min-w-[420px]">
                        {r.link ? (
                          <a className="font-medium hover:underline" href={r.link} target="_blank" rel="noreferrer">
                            {r.title || "(no title)"}
                          </a>
                        ) : (
                          <span className="font-medium">{r.title || "(no title)"}</span>
                        )}
                      </TableCell>
                      <TableCell className="min-w-[180px]">{r.agencyName || r.agencyId || ""}</TableCell>
                      <TableCell className="min-w-[160px]">{r.piid || ""}</TableCell>
                      <TableCell className="min-w-[180px]">{r.signedDate || ""}</TableCell>
                      <TableCell className="min-w-[140px]">
                        {typeof r.obligatedAmount === "number" ? r.obligatedAmount.toLocaleString(undefined, { style: "currency", currency: "USD" }) : ""}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={historyOpen} onOpenChange={setHistoryOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Search History</DialogTitle>
            <DialogDescription>Re-run previous searches (stored in localStorage).</DialogDescription>
          </DialogHeader>

          {history.length === 0 ? (
            <div className="text-sm text-muted-foreground">No history yet.</div>
          ) : (
            <div className="space-y-2">
              {history.map((h) => (
                <div key={h.id} className="flex items-center justify-between gap-3 border rounded-lg p-3">
                  <div className="min-w-0">
                    <div className="font-medium truncate">{h.label}</div>
                    <div className="text-xs text-muted-foreground truncate">{JSON.stringify(h.params)}</div>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setParams(h.params);
                      setHistoryOpen(false);
                      runSearch(h.params);
                    }}
                  >
                    Run
                  </Button>
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
