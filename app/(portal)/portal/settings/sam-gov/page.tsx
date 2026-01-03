"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Eye,
  EyeOff,
  Save,
  TestTube,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
  ExternalLink,
  Server,
  Key,
  Globe,
  FileText,
  ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { COLLECTIONS } from "@/lib/schema";
import Link from "next/link";

interface SamGovSettings {
  apiKey: string;
  enabled: boolean;
  llmProvider: "openai" | "anthropic";
  llmModel: string;
  llmApiKey: string;
  baseUrl: string;
  status: "connected" | "disconnected" | "error";
  lastTested?: string;
}

const defaultSettings: SamGovSettings = {
  apiKey: "",
  enabled: false,
  llmProvider: "openai",
  llmModel: "gpt-4o",
  llmApiKey: "",
  baseUrl: "https://api.sam.gov/opportunities/v2",
  status: "disconnected",
};

const llmProviders = [
  { id: "openai", name: "OpenAI", models: ["gpt-4o", "gpt-4-turbo", "gpt-3.5-turbo"] },
  { id: "anthropic", name: "Anthropic", models: ["claude-3-opus", "claude-3-sonnet", "claude-3-haiku"] },
];

export default function SamGovSettingsPage() {
  const [settings, setSettings] = useState<SamGovSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [showLlmKey, setShowLlmKey] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    if (!db) {
      setLoading(false);
      return;
    }

    try {
      const docRef = doc(db, COLLECTIONS.PLATFORM_SETTINGS, "samGovIntegration");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data() as SamGovSettings;
        setSettings({ ...defaultSettings, ...data });
      }
    } catch (error) {
      console.error("Error loading SAM.gov settings:", error);
      toast.error("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    if (!db) {
      toast.error("Database not initialized");
      return;
    }

    setSaving(true);
    try {
      const docRef = doc(db, COLLECTIONS.PLATFORM_SETTINGS, "samGovIntegration");
      await setDoc(docRef, {
        ...settings,
        updatedAt: Timestamp.now(),
      });
      setHasChanges(false);
      toast.success("SAM.gov settings saved successfully");
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const testConnection = async () => {
    if (!settings.apiKey) {
      toast.error("Please enter an API key first");
      return;
    }

    setTesting(true);
    try {
      // Test the SAM.gov API connection
      const response = await fetch("/api/sam-gov/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey: settings.apiKey }),
      });

      const result = await response.json();

      if (result.success) {
        setSettings((prev) => ({
          ...prev,
          status: "connected",
          lastTested: new Date().toISOString(),
        }));
        setHasChanges(true);
        toast.success("Connection successful!");
      } else {
        setSettings((prev) => ({ ...prev, status: "error" }));
        toast.error(result.error || "Connection failed");
      }
    } catch (error) {
      console.error("Error testing connection:", error);
      setSettings((prev) => ({ ...prev, status: "error" }));
      toast.error("Connection test failed");
    } finally {
      setTesting(false);
    }
  };

  const updateSetting = <K extends keyof SamGovSettings>(key: K, value: SamGovSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const selectedProvider = llmProviders.find((p) => p.id === settings.llmProvider);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/portal/settings">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">SAM.gov Integration</h1>
          <p className="text-muted-foreground">
            Configure SAM.gov API connection for government contract opportunity search
          </p>
        </div>
      </div>

      {/* Status Banner */}
      <Card className={settings.status === "connected" ? "border-green-200 bg-green-50" : "border-yellow-200 bg-yellow-50"}>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {settings.status === "connected" ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : settings.status === "error" ? (
                <XCircle className="h-5 w-5 text-red-600" />
              ) : (
                <AlertCircle className="h-5 w-5 text-yellow-600" />
              )}
              <div>
                <p className="font-medium">
                  {settings.status === "connected"
                    ? "SAM.gov API Connected"
                    : settings.status === "error"
                    ? "Connection Error"
                    : "Not Connected"}
                </p>
                {settings.lastTested && (
                  <p className="text-sm text-muted-foreground">
                    Last tested: {new Date(settings.lastTested).toLocaleString()}
                  </p>
                )}
              </div>
            </div>
            <Badge variant={settings.enabled ? "default" : "secondary"}>
              {settings.enabled ? "Enabled" : "Disabled"}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Enable/Disable Toggle */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            Integration Status
          </CardTitle>
          <CardDescription>Enable or disable the SAM.gov integration</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Enable SAM.gov Search</p>
              <p className="text-sm text-muted-foreground">
                When enabled, users can search for government contract opportunities
              </p>
            </div>
            <Switch
              checked={settings.enabled}
              onCheckedChange={(checked) => updateSetting("enabled", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* API Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            SAM.gov API Configuration
          </CardTitle>
          <CardDescription>
            Enter your SAM.gov API credentials.{" "}
            <a
              href="https://sam.gov/content/entity-information"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline inline-flex items-center gap-1"
            >
              Get API Key <ExternalLink className="h-3 w-3" />
            </a>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey">SAM.gov API Key</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  id="apiKey"
                  type={showApiKey ? "text" : "password"}
                  value={settings.apiKey}
                  onChange={(e) => updateSetting("apiKey", e.target.value)}
                  placeholder="Enter your SAM.gov API key"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full"
                  onClick={() => setShowApiKey(!showApiKey)}
                >
                  {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              <Button variant="outline" onClick={testConnection} disabled={testing || !settings.apiKey}>
                {testing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <TestTube className="h-4 w-4" />
                )}
                <span className="ml-2">Test</span>
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="baseUrl">API Base URL</Label>
            <Input
              id="baseUrl"
              value={settings.baseUrl}
              onChange={(e) => updateSetting("baseUrl", e.target.value)}
              placeholder="https://api.sam.gov/opportunities/v2"
            />
            <p className="text-xs text-muted-foreground">
              Default: https://api.sam.gov/opportunities/v2
            </p>
          </div>
        </CardContent>
      </Card>

      {/* LLM Configuration for Natural Language Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Natural Language Search (LLM)
          </CardTitle>
          <CardDescription>
            Configure AI provider for natural language query parsing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>LLM Provider</Label>
              <Select
                value={settings.llmProvider}
                onValueChange={(value) => updateSetting("llmProvider", value as "openai" | "anthropic")}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {llmProviders.map((provider) => (
                    <SelectItem key={provider.id} value={provider.id}>
                      {provider.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Model</Label>
              <Select
                value={settings.llmModel}
                onValueChange={(value) => updateSetting("llmModel", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {selectedProvider?.models.map((model) => (
                    <SelectItem key={model} value={model}>
                      {model}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="llmApiKey">LLM API Key</Label>
            <div className="relative">
              <Input
                id="llmApiKey"
                type={showLlmKey ? "text" : "password"}
                value={settings.llmApiKey}
                onChange={(e) => updateSetting("llmApiKey", e.target.value)}
                placeholder={`Enter your ${selectedProvider?.name || "LLM"} API key`}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full"
                onClick={() => setShowLlmKey(!showLlmKey)}
              >
                {showLlmKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Required for natural language search queries like "Find IT contracts in California"
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Documentation Link */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Integration Documentation
          </CardTitle>
          <CardDescription>
            View the full migration guide and API documentation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" asChild>
              <Link href="/portal/work/sam-gov-migration">
                <FileText className="h-4 w-4 mr-2" />
                View Migration Guide
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <a
                href="https://sam.gov/content/opportunities-api"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                SAM.gov API Docs
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a
                href="https://github.com/brianstittsr/CGray_samgovapiserver.git"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Source Repository
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      {hasChanges && (
        <Card className="border-primary bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-primary" />
                <p className="font-medium">You have unsaved changes</p>
              </div>
              <Button onClick={saveSettings} disabled={saving}>
                {saving ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
