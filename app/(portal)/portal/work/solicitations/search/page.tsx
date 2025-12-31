"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Filter,
  Download,
  ExternalLink,
  Calendar,
  DollarSign,
  Building2,
  FileText,
  Loader2,
  BarChart3,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

interface SearchFilters {
  keyword?: string;
  agency?: string;
  naicsCode?: string;
  postedAfter?: string;
  postedBefore?: string;
  minAmount?: string;
  maxAmount?: string;
  setAside?: string;
  source?: string;
}

interface Solicitation {
  id: string;
  title: string;
  agency: string;
  office: string;
  postedDate: string;
  responseDate: string;
  amount?: string;
  naicsCode: string;
  source: string;
  url: string;
  status: "open" | "closed";
}

export default function SolicitationSearchPage() {
  const [filters, setFilters] = useState<SearchFilters>({
    keyword: "",
    source: "all",
  });
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<Solicitation[]>([]);
  const [showFilters, setShowFilters] = useState(true);

  const handleSearch = async () => {
    setSearching(true);
    toast.info("Searching government solicitations...");

    // Simulate API call
    setTimeout(() => {
      const mockResults: Solicitation[] = [
        {
          id: "1",
          title: "IT Infrastructure Modernization Services",
          agency: "Department of Housing and Urban Development",
          office: "Office of the Chief Information Officer",
          postedDate: "2024-12-15",
          responseDate: "2025-01-30",
          amount: "$2,500,000",
          naicsCode: "541512",
          source: "SAM.gov",
          url: "https://sam.gov/opp/123456/view",
          status: "open",
        },
        {
          id: "2",
          title: "Cloud Migration and Data Analytics Platform",
          agency: "Department of Homeland Security",
          office: "Transportation Security Administration",
          postedDate: "2024-12-10",
          responseDate: "2025-02-15",
          amount: "$5,000,000",
          naicsCode: "541511",
          source: "SAM.gov",
          url: "https://sam.gov/opp/234567/view",
          status: "open",
        },
        {
          id: "3",
          title: "Cybersecurity Assessment and Monitoring Services",
          agency: "Department of Defense",
          office: "Defense Information Systems Agency",
          postedDate: "2024-12-05",
          responseDate: "2025-01-20",
          amount: "$3,750,000",
          naicsCode: "541512",
          source: "FPDS.gov",
          url: "https://fpds.gov/contract/123",
          status: "open",
        },
        {
          id: "4",
          title: "Enterprise Resource Planning System Implementation",
          agency: "General Services Administration",
          office: "Federal Acquisition Service",
          postedDate: "2024-11-28",
          responseDate: "2025-01-15",
          amount: "$1,800,000",
          naicsCode: "541511",
          source: "SAM.gov",
          url: "https://sam.gov/opp/345678/view",
          status: "open",
        },
        {
          id: "5",
          title: "IT Portfolio Management Consulting",
          agency: "Department of Veterans Affairs",
          office: "Office of Information Technology",
          postedDate: "2024-11-20",
          responseDate: "2024-12-31",
          amount: "$950,000",
          naicsCode: "541618",
          source: "DC Contracts",
          url: "https://contracts.ocp.dc.gov/solicitations/456",
          status: "closed",
        },
      ];

      setResults(mockResults);
      setSearching(false);
      toast.success(`Found ${mockResults.length} solicitations`);
    }, 1500);
  };

  const handleExportCSV = () => {
    toast.success("Exporting results to CSV...");
  };

  const handleSaveSearch = () => {
    toast.success("Search saved to history");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Search Solicitations</h1>
          <p className="text-muted-foreground mt-2">
            Search across multiple government contract data sources
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/portal/work/solicitations/dashboard">
            <BarChart3 className="h-4 w-4 mr-2" />
            View Dashboard
          </Link>
        </Button>
      </div>

      {/* Search Form */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Search Criteria
              </CardTitle>
              <CardDescription>
                Enter search criteria to find relevant government solicitations
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              {showFilters ? "Hide" : "Show"} Filters
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Basic Search */}
          <div className="space-y-2">
            <Label htmlFor="keyword">Keyword Search</Label>
            <div className="flex gap-2">
              <Input
                id="keyword"
                placeholder="e.g., IT services, cloud computing, cybersecurity"
                value={filters.keyword}
                onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <Button onClick={handleSearch} disabled={searching}>
                {searching ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="agency">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    Agency & Organization
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="agency">Agency</Label>
                      <Input
                        id="agency"
                        placeholder="e.g., HUD, DHS, DOD"
                        value={filters.agency}
                        onChange={(e) => setFilters({ ...filters, agency: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="naics">NAICS Code</Label>
                      <Input
                        id="naics"
                        placeholder="e.g., 541512, 541511"
                        value={filters.naicsCode}
                        onChange={(e) => setFilters({ ...filters, naicsCode: e.target.value })}
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="dates">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Date Range
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="postedAfter">Posted After</Label>
                      <Input
                        id="postedAfter"
                        type="date"
                        value={filters.postedAfter}
                        onChange={(e) => setFilters({ ...filters, postedAfter: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postedBefore">Posted Before</Label>
                      <Input
                        id="postedBefore"
                        type="date"
                        value={filters.postedBefore}
                        onChange={(e) => setFilters({ ...filters, postedBefore: e.target.value })}
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="financial">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Financial Criteria
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="minAmount">Minimum Amount</Label>
                      <Input
                        id="minAmount"
                        type="number"
                        placeholder="0"
                        value={filters.minAmount}
                        onChange={(e) => setFilters({ ...filters, minAmount: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxAmount">Maximum Amount</Label>
                      <Input
                        id="maxAmount"
                        type="number"
                        placeholder="10000000"
                        value={filters.maxAmount}
                        onChange={(e) => setFilters({ ...filters, maxAmount: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="setAside">Set-Aside Type</Label>
                    <Select
                      value={filters.setAside}
                      onValueChange={(value) => setFilters({ ...filters, setAside: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select set-aside type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="8a">8(a) Small Business</SelectItem>
                        <SelectItem value="sdvosb">Service-Disabled Veteran-Owned</SelectItem>
                        <SelectItem value="wosb">Woman-Owned Small Business</SelectItem>
                        <SelectItem value="hubzone">HUBZone</SelectItem>
                        <SelectItem value="none">No Set-Aside</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="source">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Data Source
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="source">Search In</Label>
                    <Select
                      value={filters.source}
                      onValueChange={(value) => setFilters({ ...filters, source: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Sources</SelectItem>
                        <SelectItem value="sam-gov">SAM.gov Only</SelectItem>
                        <SelectItem value="fpds">FPDS.gov Only</SelectItem>
                        <SelectItem value="dc-contracts">DC Contracts Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4 border-t">
            <Button variant="outline" onClick={handleSaveSearch}>
              Save Search
            </Button>
            <Button variant="outline" onClick={() => setFilters({ keyword: "", source: "all" })}>
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {results.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Search Results</CardTitle>
                <CardDescription>
                  Found {results.length} solicitations matching your criteria
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={handleExportCSV}>
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Agency</TableHead>
                  <TableHead>Posted</TableHead>
                  <TableHead>Response Due</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((result) => (
                  <TableRow key={result.id}>
                    <TableCell>
                      <div className="max-w-md">
                        <div className="font-medium">{result.title}</div>
                        <div className="text-sm text-muted-foreground">{result.office}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{result.agency}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {new Date(result.postedDate).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {new Date(result.responseDate).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{result.amount || "N/A"}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{result.source}</Badge>
                    </TableCell>
                    <TableCell>
                      {result.status === "open" ? (
                        <Badge variant="default" className="bg-green-600">Open</Badge>
                      ) : (
                        <Badge variant="secondary">Closed</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <a href={result.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
