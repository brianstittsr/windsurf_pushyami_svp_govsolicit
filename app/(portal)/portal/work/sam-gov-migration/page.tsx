"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  ExternalLink,
  Copy,
  Check,
  Server,
  Code,
  FileText,
  Settings,
  Zap,
  Database,
  Globe,
  Terminal,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function SamGovMigrationPage() {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const migrationPrompt = `I need to integrate a SAM.gov Opportunity Search Agent into my existing application. The agent provides natural language search for federal government contract opportunities with the following capabilities:

### Core Features to Migrate:
1. **Natural Language Search** - Users can search using plain English queries like "Find software development opportunities with NAICS code 541511"
2. **Advanced Filters** - NAICS code, PSC code, Set-Aside type, Notice Type, State, Status (Active/Inactive), Response Deadline date range, Posted Date
3. **Paginated Results** - Client-side pagination with configurable page sizes (10, 25, 50, 100)
4. **Opportunity Detail View** - Full details including description, contacts, attachments, dates, classification codes
5. **Excel Export** - Automatic export of search results to Excel spreadsheets
6. **LLM Integration** - Uses OpenAI/Anthropic for parsing natural language queries into structured API parameters`;

  const envVariables = `SAM_API_KEY=your_sam_gov_api_key
OPENAI_API_KEY=your_openai_key (optional)
ANTHROPIC_API_KEY=your_anthropic_key (optional)
PORT=3000`;

  const quickStartCode = `// 1. Copy these files:
//    - utils/samApiClient.js
//    - agents/samAgent.js
//    - utils/logger.js

// 2. Install dependencies:
//    npm install @langchain/openai @langchain/anthropic langchain axios exceljs

// 3. Import and use:
const { runSamAgent } = require('./agents/samAgent');

// 4. Call the agent:
const results = await runSamAgent("Find IT services contracts in California", {
  is_active: "true",
  pop_state: "CA"
});

console.log(results.searchResults); // Array of opportunities
console.log(results.recommendation); // AI-generated recommendation`;

  const expressRouteCode = `const express = require('express');
const { runSamAgent } = require('./agents/samAgent');

const router = express.Router();

router.post('/search', async (req, res) => {
  const { query, filters } = req.body;
  const results = await runSamAgent(query, filters);
  res.json(results);
});

app.use('/api/sam', router);`;

  const searchRequestJson = `{
  "query": "software development opportunities",
  "filters": {
    "naics": "541511",
    "psc": "D301",
    "set_aside": "SBA",
    "notice_type": "o",
    "pop_state": "CA",
    "is_active": "true",
    "response_date_from": "2024-01-01",
    "response_date_to": "2024-12-31"
  }
}`;

  const opportunityJson = `{
  "noticeId": "abc123",
  "title": "Software Development Services",
  "solicitationNumber": "W12345-24-R-0001",
  "active": "true",
  "type": "Solicitation",
  "organizationHierarchy": "DEPT OF DEFENSE.ARMY.ACC-APG",
  "postedDate": "2024-01-15",
  "responseDeadLine": "2024-02-15",
  "naicsCode": "541511",
  "classificationCode": "D301",
  "typeOfSetAside": "SBA",
  "description": "...",
  "pointOfContact": [...],
  "resourceLinks": [...],
  "uiLink": "https://sam.gov/opp/abc123/view"
}`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/portal/admin/government-solicitations">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">SAM.gov Integration Guide</h1>
            <Badge variant="outline">Work Item</Badge>
          </div>
          <p className="text-muted-foreground">
            Migration prompt and documentation for SAM.gov Opportunity Search Agent
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/portal/settings/sam-gov">
            <Settings className="h-4 w-4 mr-2" />
            Configure SAM.gov
          </Link>
        </Button>
      </div>

      {/* Quick Links */}
      <div className="flex flex-wrap gap-3">
        <Button variant="outline" size="sm" asChild>
          <a href="https://sam.gov" target="_blank" rel="noopener noreferrer">
            <Globe className="h-4 w-4 mr-2" />
            SAM.gov
          </a>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <a href="https://sam.gov/content/opportunities-api" target="_blank" rel="noopener noreferrer">
            <BookOpen className="h-4 w-4 mr-2" />
            API Documentation
          </a>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <a href="https://github.com/brianstittsr/CGray_samgovapiserver.git" target="_blank" rel="noopener noreferrer">
            <Code className="h-4 w-4 mr-2" />
            Source Repository
          </a>
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="migration">Migration Prompt</TabsTrigger>
          <TabsTrigger value="api">API Reference</TabsTrigger>
          <TabsTrigger value="code">Code Examples</TabsTrigger>
          <TabsTrigger value="data">Data Models</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Core Features
              </CardTitle>
              <CardDescription>
                Key capabilities of the SAM.gov Opportunity Search Agent
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Natural Language Search</h4>
                  <p className="text-sm text-muted-foreground">
                    Search using plain English queries like "Find software development opportunities"
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Advanced Filters</h4>
                  <p className="text-sm text-muted-foreground">
                    NAICS code, PSC code, Set-Aside type, Notice Type, State, Status, Date ranges
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Paginated Results</h4>
                  <p className="text-sm text-muted-foreground">
                    Client-side pagination with configurable page sizes (10, 25, 50, 100)
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Opportunity Details</h4>
                  <p className="text-sm text-muted-foreground">
                    Full details including description, contacts, attachments, dates
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Excel Export</h4>
                  <p className="text-sm text-muted-foreground">
                    Automatic export of search results to Excel spreadsheets
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">LLM Integration</h4>
                  <p className="text-sm text-muted-foreground">
                    OpenAI/Anthropic for parsing natural language queries
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                Technical Stack
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 md:grid-cols-2">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Backend</Badge>
                  <span className="text-sm">Node.js with Express</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Frontend</Badge>
                  <span className="text-sm">HTML with Tailwind CSS</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">APIs</Badge>
                  <span className="text-sm">SAM.gov Public API</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">LLM</Badge>
                  <span className="text-sm">OpenAI GPT-4 / Anthropic Claude</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Export</Badge>
                  <span className="text-sm">ExcelJS for spreadsheets</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Integration Options
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold text-green-600 mb-2">Option A: Full Integration</h4>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Copy all backend files into your existing Express app</li>
                  <li>Mount routes under a prefix (e.g., /sam/*)</li>
                  <li>Include frontend as views or serve as static files</li>
                  <li>Share existing authentication/session management</li>
                </ul>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold text-blue-600 mb-2">Option B: Microservice</h4>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Deploy as standalone service</li>
                  <li>Call via internal API from your main application</li>
                  <li>Use as iframe or redirect for UI</li>
                </ul>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold text-purple-600 mb-2">Option C: API Only</h4>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Integrate only the backend API endpoints</li>
                  <li>Build custom frontend in your existing framework</li>
                  <li>Use the samApiClient and samAgent modules directly</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Migration Prompt Tab */}
        <TabsContent value="migration" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Migration Prompt</CardTitle>
                  <CardDescription>
                    Copy this prompt to migrate the SAM.gov agent into your application
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(migrationPrompt, "prompt")}
                >
                  {copiedSection === "prompt" ? (
                    <Check className="h-4 w-4 mr-2" />
                  ) : (
                    <Copy className="h-4 w-4 mr-2" />
                  )}
                  Copy
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm whitespace-pre-wrap">
                {migrationPrompt}
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Environment Variables</CardTitle>
                  <CardDescription>Required environment variables for the integration</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(envVariables, "env")}
                >
                  {copiedSection === "env" ? (
                    <Check className="h-4 w-4 mr-2" />
                  ) : (
                    <Copy className="h-4 w-4 mr-2" />
                  )}
                  Copy
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                {envVariables}
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Key Files to Migrate</CardTitle>
              <CardDescription>Backend and frontend components</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Backend Components</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-0.5">1</Badge>
                    <div>
                      <code className="text-primary">utils/samApiClient.js</code>
                      <p className="text-muted-foreground">SAM.gov API client with search, details, and resource methods</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-0.5">2</Badge>
                    <div>
                      <code className="text-primary">agents/samAgent.js</code>
                      <p className="text-muted-foreground">LangGraph-style agent for natural language processing</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-0.5">3</Badge>
                    <div>
                      <code className="text-primary">routes/api.js</code>
                      <p className="text-muted-foreground">Express routes for search, details, and settings</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-0.5">4</Badge>
                    <div>
                      <code className="text-primary">utils/excelExporter.js</code>
                      <p className="text-muted-foreground">Excel export functionality</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Frontend Components</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-0.5">1</Badge>
                    <div>
                      <code className="text-primary">public/agent-ui.html</code>
                      <p className="text-muted-foreground">Main search interface with filters and pagination</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-0.5">2</Badge>
                    <div>
                      <code className="text-primary">public/opportunity-detail.html</code>
                      <p className="text-muted-foreground">Opportunity detail view</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-0.5">3</Badge>
                    <div>
                      <code className="text-primary">public/settings.html</code>
                      <p className="text-muted-foreground">LLM configuration UI</p>
                    </div>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Reference Tab */}
        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SAM.gov API Endpoints</CardTitle>
              <CardDescription>Public API endpoints used by the integration</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge>GET</Badge>
                    <span className="font-mono text-sm">Search Opportunities</span>
                  </div>
                  <code className="text-xs text-muted-foreground block">
                    https://api.sam.gov/opportunities/v2/search
                  </code>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge>GET</Badge>
                    <span className="font-mono text-sm">Opportunity Details</span>
                  </div>
                  <code className="text-xs text-muted-foreground block">
                    https://api.sam.gov/opportunities/v2/search?noticeid=&#123;id&#125;
                  </code>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge>GET</Badge>
                    <span className="font-mono text-sm">Resource Links</span>
                  </div>
                  <code className="text-xs text-muted-foreground block">
                    https://sam.gov/api/prod/opps/v3/opportunities/&#123;id&#125;/resources
                  </code>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge>GET</Badge>
                    <span className="font-mono text-sm">Download Resource</span>
                  </div>
                  <code className="text-xs text-muted-foreground block">
                    https://sam.gov/api/prod/opps/v3/opportunities/resources/files/&#123;resourceId&#125;/download
                  </code>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="secondary">UI</Badge>
                    <span className="font-mono text-sm">View Opportunity</span>
                  </div>
                  <code className="text-xs text-muted-foreground block">
                    https://sam.gov/opp/&#123;noticeId&#125;/view
                  </code>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Internal API Routes</CardTitle>
              <CardDescription>Express routes provided by the integration</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className="bg-green-600">POST</Badge>
                    <span className="font-mono text-sm">/api/agent</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Natural language search endpoint</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className="bg-green-600">POST</Badge>
                    <span className="font-mono text-sm">/api/search</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Direct API search with filters</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className="bg-green-600">POST</Badge>
                    <span className="font-mono text-sm">/api/opportunity/:id</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Get opportunity details</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge>GET</Badge>
                    <span className="font-mono text-sm">/api/settings</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Get LLM configuration</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className="bg-green-600">POST</Badge>
                    <span className="font-mono text-sm">/api/settings</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Update LLM configuration</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Code Examples Tab */}
        <TabsContent value="code" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Terminal className="h-5 w-5" />
                    Quick Start
                  </CardTitle>
                  <CardDescription>Add SAM.gov search to any Node.js app</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(quickStartCode, "quickstart")}
                >
                  {copiedSection === "quickstart" ? (
                    <Check className="h-4 w-4 mr-2" />
                  ) : (
                    <Copy className="h-4 w-4 mr-2" />
                  )}
                  Copy
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{quickStartCode}</code>
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Express Routes Example</CardTitle>
                  <CardDescription>Add as Express routes</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(expressRouteCode, "express")}
                >
                  {copiedSection === "express" ? (
                    <Check className="h-4 w-4 mr-2" />
                  ) : (
                    <Copy className="h-4 w-4 mr-2" />
                  )}
                  Copy
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{expressRouteCode}</code>
              </pre>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Data Models Tab */}
        <TabsContent value="data" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Search Request
                  </CardTitle>
                  <CardDescription>Request body for search endpoint</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(searchRequestJson, "searchreq")}
                >
                  {copiedSection === "searchreq" ? (
                    <Check className="h-4 w-4 mr-2" />
                  ) : (
                    <Copy className="h-4 w-4 mr-2" />
                  )}
                  Copy
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{searchRequestJson}</code>
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Opportunity Object</CardTitle>
                  <CardDescription>Response object structure</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(opportunityJson, "opportunity")}
                >
                  {copiedSection === "opportunity" ? (
                    <Check className="h-4 w-4 mr-2" />
                  ) : (
                    <Copy className="h-4 w-4 mr-2" />
                  )}
                  Copy
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{opportunityJson}</code>
              </pre>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
