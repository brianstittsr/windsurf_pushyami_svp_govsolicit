"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Eye,
  EyeOff,
  Save,
  TestTube,
  CheckCircle,
  XCircle,
  AlertCircle,
  MessageSquare,
  Zap,
  Video,
  Brain,
  Server,
  Webhook,
  Key,
  RefreshCw,
  Send,
  User,
  Loader2,
  FileSignature,
  Bell,
  BellRing,
  Volume2,
  VolumeX,
  Monitor,
  Linkedin,
  Twitter,
  Youtube,
  Facebook,
  Instagram,
  Globe,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { WEBHOOK_EVENTS, testWebhookConnection, sendToBrianStitt, type WebhookEventType } from "@/lib/mattermost";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { COLLECTIONS, type PlatformSettingsDoc } from "@/lib/schema";
import { logSettingsUpdated } from "@/lib/activity-logger";
import { useUserProfile } from "@/contexts/user-profile-context";
import Link from "next/link";
import { 
  showInAppNotification, 
  requestNotificationPermission, 
  getBrowserNotificationStatus 
} from "@/lib/notifications";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { RotateCcw } from "lucide-react";
import { toast } from "sonner";

// Feature Visibility Types and Data
type UserRole = "superadmin" | "admin" | "team" | "affiliate" | "consultant" | "viewer";

interface FeatureVisibility {
  id: string;
  name: string;
  description: string;
  category: "main" | "work" | "ai" | "admin" | "initiatives";
  requiresSubscription?: boolean;
}

interface RoleFeatureSettings {
  [featureId: string]: boolean;
}

interface AllRoleFeatureSettings {
  [role: string]: RoleFeatureSettings;
}

const ROLES: { id: UserRole; name: string; description: string }[] = [
  { id: "superadmin", name: "SuperAdmin", description: "Full platform access and control" },
  { id: "admin", name: "Admin", description: "Administrative access without delete permissions" },
  { id: "team", name: "Team Member", description: "Internal team member access" },
  { id: "affiliate", name: "Affiliate", description: "External affiliate partner access" },
  { id: "consultant", name: "Consultant", description: "Consultant access" },
  { id: "viewer", name: "Viewer", description: "Read-only access" },
];

const DEFAULT_FEATURES: FeatureVisibility[] = [
  // Main Navigation
  { id: "command-center", name: "Command Center", description: "Dashboard and overview", category: "main" },
  { id: "opportunities", name: "Opportunities", description: "Business opportunities tracking", category: "main" },
  { id: "projects", name: "Projects", description: "Project management", category: "main" },
  { id: "affiliates", name: "Affiliates", description: "Affiliate network management", category: "main" },
  { id: "customers", name: "Customers", description: "Customer relationship management", category: "main" },
  
  // Work Items
  { id: "gov-solicitations", name: "Gov Solicitations", description: "Government contract opportunities", category: "work" },
  { id: "fpds-search", name: "FPDS Search", description: "Federal procurement data search", category: "work" },
  { id: "apollo-search", name: "Apollo Search", description: "Contact and company search", category: "work", requiresSubscription: true },
  { id: "supplier-search", name: "Supplier Search", description: "Supplier database search", category: "work", requiresSubscription: true },
  { id: "documents", name: "Documents", description: "Document management", category: "work" },
  { id: "calendar", name: "Calendar", description: "Calendar and scheduling", category: "work" },
  { id: "availability", name: "Availability", description: "Team availability tracking", category: "work" },
  { id: "meetings", name: "Meetings", description: "Meeting management", category: "work" },
  { id: "rocks", name: "Rocks", description: "EOS Rocks tracking", category: "work" },
  { id: "networking", name: "Networking", description: "Professional networking", category: "work" },
  { id: "deals", name: "Deals", description: "Deal pipeline management", category: "work" },
  { id: "linkedin-content", name: "LinkedIn Content", description: "LinkedIn content creation", category: "work" },
  { id: "eos2", name: "EOS2 Dashboard", description: "EOS traction tools", category: "work" },
  { id: "docuseal", name: "DocuSeal", description: "Document signing", category: "work" },
  { id: "bug-tracker", name: "Bug Tracker", description: "Issue tracking", category: "work" },
  { id: "xprotege-tools", name: "XProtege Tools", description: "Platform utilities", category: "work" },
  { id: "careers", name: "Careers", description: "Job listings management", category: "work" },
  
  // AI Tools
  { id: "ai-workforce", name: "AI Workforce", description: "AI agent management", category: "ai", requiresSubscription: true },
  { id: "proposals", name: "Proposal Creator", description: "AI-powered proposal generation", category: "ai", requiresSubscription: true },
  { id: "ask", name: "Ask IntellEDGE", description: "AI assistant", category: "ai" },
  
  // Admin
  { id: "book-call-leads", name: "Book Call Leads", description: "Lead management", category: "admin" },
  { id: "team-members", name: "Team Members", description: "User management", category: "admin" },
  { id: "strategic-partners", name: "Strategic Partners", description: "Partner management", category: "admin" },
  { id: "gohighlevel", name: "GoHighLevel", description: "CRM integration", category: "admin", requiresSubscription: true },
  { id: "platform-settings", name: "Platform Settings", description: "System configuration", category: "admin" },
  
  // Initiatives
  { id: "initiatives", name: "Initiatives", description: "Strategic initiatives", category: "initiatives" },
  { id: "tbmnc", name: "TBMNC Suppliers", description: "TBMNC supplier database", category: "initiatives" },
];

// Default role permissions - SuperAdmin gets all, others get limited
const getDefaultRoleSettings = (): AllRoleFeatureSettings => {
  const settings: AllRoleFeatureSettings = {};
  
  ROLES.forEach(role => {
    settings[role.id] = {};
    DEFAULT_FEATURES.forEach(feature => {
      // SuperAdmin gets everything
      if (role.id === "superadmin") {
        settings[role.id][feature.id] = true;
      }
      // Admin gets most things except some admin features
      else if (role.id === "admin") {
        settings[role.id][feature.id] = true;
      }
      // Team members get work features
      else if (role.id === "team") {
        settings[role.id][feature.id] = feature.category !== "admin" || feature.id === "platform-settings";
      }
      // Affiliates get limited features
      else if (role.id === "affiliate" || role.id === "consultant") {
        settings[role.id][feature.id] = ["main", "work"].includes(feature.category) && 
          !["team-members", "strategic-partners", "book-call-leads", "gohighlevel", "platform-settings"].includes(feature.id);
      }
      // Viewers get read-only main features
      else if (role.id === "viewer") {
        settings[role.id][feature.id] = feature.category === "main" || feature.id === "command-center";
      }
    });
  });
  
  return settings;
};

const FEATURE_CATEGORIES = [
  { id: "main", name: "Main Navigation", icon: "📊" },
  { id: "work", name: "Work Items", icon: "💼" },
  { id: "ai", name: "AI Tools", icon: "🤖" },
  { id: "admin", name: "Admin", icon: "⚙️" },
  { id: "initiatives", name: "Initiatives", icon: "🚀" },
];

// Feature Visibility Content Component
function FeatureVisibilityContent() {
  const { profile } = useUserProfile();
  const [roleSettings, setRoleSettings] = useState<AllRoleFeatureSettings>(getDefaultRoleSettings());
  const [selectedRole, setSelectedRole] = useState<UserRole>("superadmin");
  const [featureLoading, setFeatureLoading] = useState(true);
  const [featureSaving, setFeatureSaving] = useState(false);
  const [featureHasChanges, setFeatureHasChanges] = useState(false);

  useEffect(() => {
    loadFeatureSettings();
  }, []);

  const loadFeatureSettings = async () => {
    try {
      if (!db) return;
      const settingsRef = doc(db, "platformSettings", "featureVisibilityByRole");
      const settingsDoc = await getDoc(settingsRef);
      
      if (settingsDoc.exists()) {
        const savedSettings = settingsDoc.data().roleSettings as AllRoleFeatureSettings;
        if (savedSettings) {
          // Merge with defaults to handle new features
          const merged = getDefaultRoleSettings();
          Object.keys(savedSettings).forEach(role => {
            if (merged[role]) {
              Object.keys(savedSettings[role]).forEach(featureId => {
                merged[role][featureId] = savedSettings[role][featureId];
              });
            }
          });
          setRoleSettings(merged);
        }
      }
    } catch (error) {
      console.error("Error loading feature settings:", error);
    } finally {
      setFeatureLoading(false);
    }
  };

  const handleToggleFeature = (featureId: string) => {
    setRoleSettings((prev) => ({
      ...prev,
      [selectedRole]: {
        ...prev[selectedRole],
        [featureId]: !prev[selectedRole][featureId],
      },
    }));
    setFeatureHasChanges(true);
  };

  const handleToggleCategory = (category: string, visible: boolean) => {
    const featuresToToggle = category === "all" 
      ? DEFAULT_FEATURES 
      : DEFAULT_FEATURES.filter(f => f.category === category);
    
    setRoleSettings((prev) => {
      const newRoleSettings = { ...prev[selectedRole] };
      featuresToToggle.forEach(f => {
        newRoleSettings[f.id] = visible;
      });
      return {
        ...prev,
        [selectedRole]: newRoleSettings,
      };
    });
    setFeatureHasChanges(true);
  };

  const handleCopyFromRole = (sourceRole: UserRole) => {
    setRoleSettings((prev) => ({
      ...prev,
      [selectedRole]: { ...prev[sourceRole] },
    }));
    setFeatureHasChanges(true);
    toast.info(`Copied settings from ${ROLES.find(r => r.id === sourceRole)?.name}`);
  };

  const handleSaveFeatures = async () => {
    setFeatureSaving(true);
    try {
      if (!db) {
        toast.error("Database not initialized");
        return;
      }
      const settingsRef = doc(db, "platformSettings", "featureVisibilityByRole");
      await setDoc(settingsRef, {
        roleSettings,
        updatedAt: new Date(),
        updatedBy: profile.email,
      });
      
      setFeatureHasChanges(false);
      toast.success("Feature visibility settings saved successfully");
    } catch (error) {
      console.error("Error saving feature settings:", error);
      toast.error("Failed to save feature settings");
    } finally {
      setFeatureSaving(false);
    }
  };

  const handleResetFeatures = () => {
    setRoleSettings(getDefaultRoleSettings());
    setFeatureHasChanges(true);
    toast.info("Reset all roles to default settings");
  };

  const handleResetCurrentRole = () => {
    const defaults = getDefaultRoleSettings();
    setRoleSettings((prev) => ({
      ...prev,
      [selectedRole]: defaults[selectedRole],
    }));
    setFeatureHasChanges(true);
    toast.info(`Reset ${ROLES.find(r => r.id === selectedRole)?.name} to default settings`);
  };

  const getVisibleCount = (category: string) => {
    return DEFAULT_FEATURES.filter(
      (f) => f.category === category && roleSettings[selectedRole]?.[f.id]
    ).length;
  };

  const getTotalCount = (category: string) => {
    return DEFAULT_FEATURES.filter((f) => f.category === category).length;
  };

  const currentRoleSettings = roleSettings[selectedRole] || {};

  if (featureLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Alert */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-medium text-yellow-900">Role-Based Feature Visibility</p>
              <p className="text-sm text-yellow-700">
                Configure which features each role can access. Select a role below to customize their navigation panel.
                Changes affect users with that role immediately after saving.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Role Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Select Role to Configure
          </CardTitle>
          <CardDescription>
            Choose a role to view and modify its feature access
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {ROLES.map((role) => (
              <Button
                key={role.id}
                variant={selectedRole === role.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedRole(role.id)}
                className="flex items-center gap-2"
              >
                {role.name}
                <Badge variant="secondary" className="ml-1">
                  {Object.values(roleSettings[role.id] || {}).filter(Boolean).length}/{DEFAULT_FEATURES.length}
                </Badge>
              </Button>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            {ROLES.find(r => r.id === selectedRole)?.description}
          </p>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleToggleCategory("all", true)}
          >
            <Eye className="h-4 w-4 mr-2" />
            Show All
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleToggleCategory("all", false)}
          >
            <EyeOff className="h-4 w-4 mr-2" />
            Hide All
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleResetCurrentRole}
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset This Role
          </Button>
          <Select onValueChange={(value) => handleCopyFromRole(value as UserRole)}>
            <SelectTrigger className="w-[180px] h-9">
              <SelectValue placeholder="Copy from role..." />
            </SelectTrigger>
            <SelectContent>
              {ROLES.filter(r => r.id !== selectedRole).map((role) => (
                <SelectItem key={role.id} value={role.id}>
                  {role.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          onClick={handleSaveFeatures}
          disabled={!featureHasChanges || featureSaving}
        >
          {featureSaving ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save All Changes
            </>
          )}
        </Button>
      </div>

      {/* Feature Categories */}
      {FEATURE_CATEGORIES.map((category) => {
        const categoryFeatures = DEFAULT_FEATURES.filter((f) => f.category === category.id);
        const visibleCount = getVisibleCount(category.id);
        const totalCount = getTotalCount(category.id);

        return (
          <Card key={category.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{category.icon}</span>
                  <div>
                    <CardTitle>{category.name}</CardTitle>
                    <CardDescription>
                      {visibleCount} of {totalCount} features enabled for {ROLES.find(r => r.id === selectedRole)?.name}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleToggleCategory(category.id, true)}
                  >
                    Enable All
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleToggleCategory(category.id, false)}
                  >
                    Disable All
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Feature</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Enabled</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categoryFeatures.map((feature) => (
                    <TableRow key={feature.id}>
                      <TableCell>
                        <div className="font-medium">{feature.name}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-muted-foreground">
                          {feature.description}
                        </div>
                      </TableCell>
                      <TableCell>
                        {feature.requiresSubscription && (
                          <Badge variant="outline" className="text-xs">
                            Requires Subscription
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          {currentRoleSettings[feature.id] ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          )}
                          <Switch
                            checked={currentRoleSettings[feature.id] || false}
                            onCheckedChange={() => handleToggleFeature(feature.id)}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        );
      })}

      {/* Save Reminder */}
      {featureHasChanges && (
        <Card className="border-primary bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-primary" />
                <p className="font-medium">You have unsaved changes</p>
              </div>
              <Button onClick={handleSaveFeatures} disabled={featureSaving}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

interface ApiKeyConfig {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  keyField: string;
  webhookField?: string;
  additionalFields?: { name: string; label: string; placeholder: string }[];
  status: "connected" | "disconnected" | "error";
  lastTested?: string;
}

const apiConfigs: ApiKeyConfig[] = [
  {
    id: "gohighlevel",
    name: "GoHighLevel",
    description: "All-in-one marketing and CRM platform",
    icon: Zap,
    keyField: "Private API Key",
    additionalFields: [
      { name: "locationId", label: "Location ID", placeholder: "location-id" },
      { name: "agencyId", label: "Agency ID", placeholder: "agency-id" },
    ],
    status: "disconnected",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    description: "Professional networking and content publishing",
    icon: Zap,
    keyField: "Access Token",
    additionalFields: [
      { name: "clientId", label: "Client ID", placeholder: "your-client-id" },
      { name: "clientSecret", label: "Client Secret", placeholder: "your-client-secret" },
      { name: "organizationId", label: "Organization ID (optional)", placeholder: "organization-urn" },
    ],
    status: "disconnected",
  },
];

const llmProviders = [
  { id: "openai", name: "OpenAI", models: ["gpt-4o", "gpt-4-turbo", "gpt-3.5-turbo"] },
  { id: "anthropic", name: "Anthropic", models: ["claude-3-opus", "claude-3-sonnet", "claude-3-haiku"] },
  { id: "google", name: "Google AI", models: ["gemini-pro", "gemini-ultra"] },
  { id: "mistral", name: "Mistral AI", models: ["mistral-large", "mistral-medium", "mistral-small"] },
  { id: "ollama", name: "Ollama (Local)", models: ["llama2", "codellama", "mistral", "mixtral"] },
];

const SETTINGS_DOC_ID = "global";

function SettingsPageContent() {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("tab") || "integrations";
  const [activeTab, setActiveTab] = useState(defaultTab);
  const { profile } = useUserProfile();
  const isSuperAdmin = profile.role === "superadmin" as any;
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [apiKeys, setApiKeys] = useState<Record<string, Record<string, string>>>({});
  const [testingStatus, setTestingStatus] = useState<Record<string, "testing" | "success" | "error" | null>>({});
  const [webhookEvents, setWebhookEvents] = useState<Record<WebhookEventType, boolean>>(
    WEBHOOK_EVENTS.reduce((acc, event) => ({ ...acc, [event.type]: event.enabled }), {} as Record<WebhookEventType, boolean>)
  );
  const [brianStittMessage, setBrianStittMessage] = useState("");
  const [brianStittDialogOpen, setBrianStittDialogOpen] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);
  const [llmConfig, setLlmConfig] = useState({
    provider: "openai",
    model: "gpt-4o",
    apiKey: "",
    ollamaUrl: "http://localhost:11434",
    useOllama: false,
  });
  
  // Social links settings
  const [socialLinks, setSocialLinks] = useState({
    linkedin: { url: "", visible: true },
    twitter: { url: "", visible: true },
    youtube: { url: "", visible: true },
    facebook: { url: "", visible: false },
    instagram: { url: "", visible: false },
  });
  
  // Notification sync settings
  const [notificationSettings, setNotificationSettings] = useState({
    syncWithMattermost: true,
    inAppEnabled: true,
    browserEnabled: false,
    soundEnabled: false,
  });
  const [browserPermission, setBrowserPermission] = useState<string>("default");

  // Load settings from Firebase on mount
  useEffect(() => {
    const loadSettings = async () => {
      if (!db) {
        console.error("Firebase not initialized");
        setLoading(false);
        return;
      }
      try {
        const docRef = doc(db, COLLECTIONS.PLATFORM_SETTINGS, SETTINGS_DOC_ID);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data() as PlatformSettingsDoc;
          
          // Load integrations into apiKeys state
          if (data.integrations) {
            const loadedApiKeys: Record<string, Record<string, string>> = {};
            
            if (data.integrations.mattermost) {
              loadedApiKeys.mattermost = {
                apiKey: data.integrations.mattermost.apiKey || "",
                webhook: data.integrations.mattermost.webhookUrl || "",
                serverUrl: data.integrations.mattermost.serverUrl || "",
                teamId: data.integrations.mattermost.teamId || "",
              };
            }
            if (data.integrations.apollo) {
              loadedApiKeys.apollo = {
                apiKey: data.integrations.apollo.apiKey || "",
                accountId: data.integrations.apollo.accountId || "",
              };
            }
            if (data.integrations.gohighlevel) {
              loadedApiKeys.gohighlevel = {
                apiKey: data.integrations.gohighlevel.apiKey || "",
                locationId: data.integrations.gohighlevel.locationId || "",
                agencyId: data.integrations.gohighlevel.agencyId || "",
              };
            }
            if (data.integrations.zoom) {
              loadedApiKeys.zoom = {
                apiKey: data.integrations.zoom.apiKey || "",
                apiSecret: data.integrations.zoom.apiSecret || "",
                accountId: data.integrations.zoom.accountId || "",
              };
            }
            if (data.integrations.docuseal) {
              loadedApiKeys.docuseal = {
                apiKey: data.integrations.docuseal.apiKey || "",
                webhookSecret: data.integrations.docuseal.webhookSecret || "",
              };
            }
            
            setApiKeys(loadedApiKeys);
          }
          
          // Load LLM config
          if (data.llmConfig) {
            setLlmConfig({
              provider: data.llmConfig.provider || "openai",
              model: data.llmConfig.model || "gpt-4o",
              apiKey: data.llmConfig.apiKey || "",
              ollamaUrl: data.llmConfig.ollamaUrl || "http://localhost:11434",
              useOllama: data.llmConfig.useOllama || false,
            });
          }
          
          // Load webhook events
          if (data.webhookEvents) {
            setWebhookEvents(prev => ({ ...prev, ...data.webhookEvents }));
          }
          
          // Load notification settings
          if (data.notificationSettings) {
            setNotificationSettings(prev => ({ ...prev, ...data.notificationSettings }));
          }
          
          // Load social links
          if (data.socialLinks) {
            setSocialLinks(prev => ({ ...prev, ...data.socialLinks }));
          }
        }
      } catch (error) {
        console.error("Error loading settings:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadSettings();
    
    // Check browser notification permission
    setBrowserPermission(getBrowserNotificationStatus());
  }, []);

  // Save settings to Firebase
  const saveSettings = async () => {
    if (!db) {
      alert("Firebase not initialized. Check your environment variables.");
      return;
    }
    setSaving(true);
    try {
      const docRef = doc(db, COLLECTIONS.PLATFORM_SETTINGS, SETTINGS_DOC_ID);
      
      // Build settings data, using empty strings instead of undefined
      const settingsData = {
        id: SETTINGS_DOC_ID,
        integrations: {
          mattermost: {
            apiKey: apiKeys.mattermost?.apiKey || "",
            webhookUrl: apiKeys.mattermost?.webhook || "",
            serverUrl: apiKeys.mattermost?.serverUrl || "",
            teamId: apiKeys.mattermost?.teamId || "",
            status: testingStatus.mattermost === "success" ? "connected" : "disconnected",
          },
          apollo: {
            apiKey: apiKeys.apollo?.apiKey || "",
            accountId: apiKeys.apollo?.accountId || "",
            status: testingStatus.apollo === "success" ? "connected" : "disconnected",
          },
          gohighlevel: {
            apiKey: apiKeys.gohighlevel?.apiKey || "",
            locationId: apiKeys.gohighlevel?.locationId || "",
            agencyId: apiKeys.gohighlevel?.agencyId || "",
            status: testingStatus.gohighlevel === "success" ? "connected" : "disconnected",
          },
          zoom: {
            apiKey: apiKeys.zoom?.apiKey || "",
            apiSecret: apiKeys.zoom?.apiSecret || "",
            accountId: apiKeys.zoom?.accountId || "",
            status: testingStatus.zoom === "success" ? "connected" : "disconnected",
          },
          docuseal: {
            apiKey: apiKeys.docuseal?.apiKey || "",
            webhookSecret: apiKeys.docuseal?.webhookSecret || "",
            status: testingStatus.docuseal === "success" ? "connected" : "disconnected",
          },
        },
        llmConfig: {
          provider: llmConfig.provider,
          model: llmConfig.model,
          apiKey: llmConfig.apiKey || "",
          ollamaUrl: llmConfig.ollamaUrl,
          useOllama: llmConfig.useOllama,
        },
        webhookEvents: webhookEvents as Record<string, boolean>,
        notificationSettings: notificationSettings,
        socialLinks: socialLinks,
        updatedAt: Timestamp.now(),
      };
      
      await setDoc(docRef, settingsData, { merge: true });
      setHasChanges(false);
      // Log activity
      await logSettingsUpdated("Platform Settings");
      alert("Settings saved successfully!");
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Error saving settings. Check console for details.");
    } finally {
      setSaving(false);
    }
  };

  const toggleShowKey = (id: string) => {
    setShowKeys(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const updateApiKey = (configId: string, field: string, value: string) => {
    setApiKeys(prev => ({
      ...prev,
      [configId]: { ...prev[configId], [field]: value },
    }));
    setHasChanges(true);
  };

  const testConnection = async (configId: string) => {
    setTestingStatus(prev => ({ ...prev, [configId]: "testing" }));
    
    if (configId === "webhook" || configId === "mattermost") {
      // Test actual Mattermost webhook
      const webhookUrl = apiKeys["mattermost"]?.webhook || apiKeys["webhook"]?.url;
      if (webhookUrl) {
        const result = await testWebhookConnection(webhookUrl);
        setTestingStatus(prev => ({ 
          ...prev, 
          [configId]: result.success ? "success" : "error" 
        }));
        if (!result.success) {
          alert(`Webhook test failed: ${result.error}`);
        }
        return;
      }
    }
    
    // Simulate API test for other integrations
    await new Promise(resolve => setTimeout(resolve, 2000));
    setTestingStatus(prev => ({ 
      ...prev, 
      [configId]: Math.random() > 0.3 ? "success" : "error" 
    }));
  };

  const handleSendToBrianStitt = async () => {
    const webhookUrl = apiKeys["mattermost"]?.webhook;
    if (!webhookUrl) {
      alert("Please configure the Mattermost webhook URL first in the Integrations tab.");
      return;
    }
    if (!brianStittMessage.trim()) {
      alert("Please enter a message.");
      return;
    }

    setSendingMessage(true);
    const result = await sendToBrianStitt(webhookUrl, brianStittMessage, {
      "Sent By": "SVP Platform User",
      "Timestamp": new Date().toLocaleString(),
    });
    setSendingMessage(false);

    if (result.success) {
      alert("Message sent to Brian Stitt successfully!");
      setBrianStittMessage("");
      setBrianStittDialogOpen(false);
    } else {
      alert(`Failed to send message: ${result.error}`);
    }
  };

  const toggleWebhookEvent = (eventType: WebhookEventType) => {
    setWebhookEvents(prev => ({ ...prev, [eventType]: !prev[eventType] }));
    setHasChanges(true);
  };

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage API keys, webhooks, and integrations
          </p>
        </div>
        <Button onClick={saveSettings} disabled={saving}>
          {saving ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          {saving ? "Saving..." : hasChanges ? "Save Changes" : "Save All Settings"}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="llm">LLM Configuration</TabsTrigger>
          <TabsTrigger value="social">Social Links</TabsTrigger>
          {isSuperAdmin && (
            <TabsTrigger value="features">
              <Shield className="h-4 w-4 mr-2" />
              Feature Visibility
            </TabsTrigger>
          )}
        </TabsList>

        {/* Integrations Tab */}
        <TabsContent value="integrations" className="space-y-6">
          <div className="grid gap-6">
            {apiConfigs.map((config) => (
              <Card key={config.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <config.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {config.name}
                          <Badge
                            variant={
                              testingStatus[config.id] === "success"
                                ? "default"
                                : testingStatus[config.id] === "error"
                                ? "destructive"
                                : "secondary"
                            }
                          >
                            {testingStatus[config.id] === "success"
                              ? "Connected"
                              : testingStatus[config.id] === "error"
                              ? "Error"
                              : "Not Connected"}
                          </Badge>
                        </CardTitle>
                        <CardDescription>{config.description}</CardDescription>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => testConnection(config.id)}
                      disabled={testingStatus[config.id] === "testing"}
                    >
                      {testingStatus[config.id] === "testing" ? (
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <TestTube className="mr-2 h-4 w-4" />
                      )}
                      Test Connection
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor={`${config.id}-key`}>{config.keyField}</Label>
                      <div className="relative">
                        <Input
                          id={`${config.id}-key`}
                          type={showKeys[config.id] ? "text" : "password"}
                          placeholder={`Enter your ${config.keyField.toLowerCase()}`}
                          value={apiKeys[config.id]?.apiKey || ""}
                          onChange={(e) => updateApiKey(config.id, "apiKey", e.target.value)}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full"
                          onClick={() => toggleShowKey(config.id)}
                        >
                          {showKeys[config.id] ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    {config.webhookField && (
                      <div className="space-y-2">
                        <Label htmlFor={`${config.id}-webhook`}>{config.webhookField}</Label>
                        <Input
                          id={`${config.id}-webhook`}
                          placeholder={`Enter your ${config.webhookField.toLowerCase()}`}
                          value={apiKeys[config.id]?.webhook || ""}
                          onChange={(e) => updateApiKey(config.id, "webhook", e.target.value)}
                        />
                      </div>
                    )}

                    {config.additionalFields?.map((field) => (
                      <div key={field.name} className="space-y-2">
                        <Label htmlFor={`${config.id}-${field.name}`}>{field.label}</Label>
                        <Input
                          id={`${config.id}-${field.name}`}
                          placeholder={field.placeholder}
                          value={apiKeys[config.id]?.[field.name] || ""}
                          onChange={(e) => updateApiKey(config.id, field.name, e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* LLM Configuration Tab */}
        <TabsContent value="llm" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>LLM Provider Configuration</CardTitle>
                  <CardDescription>
                    Configure your preferred Large Language Model provider
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Server className="h-5 w-5 text-primary" />
                  <div>
                    <Label>Use Ollama (Local LLM)</Label>
                    <p className="text-sm text-muted-foreground">
                      Run models locally without API costs
                    </p>
                  </div>
                </div>
                <Switch
                  checked={llmConfig.useOllama}
                  onCheckedChange={(checked) =>
                    setLlmConfig({ ...llmConfig, useOllama: checked, provider: checked ? "ollama" : "openai" })
                  }
                />
              </div>

              {llmConfig.useOllama ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="ollamaUrl">Ollama Server URL</Label>
                    <Input
                      id="ollamaUrl"
                      placeholder="http://localhost:11434"
                      value={llmConfig.ollamaUrl}
                      onChange={(e) => setLlmConfig({ ...llmConfig, ollamaUrl: e.target.value })}
                    />
                    <p className="text-sm text-muted-foreground">
                      Default: http://localhost:11434
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ollamaModel">Model</Label>
                    <Select
                      value={llmConfig.model}
                      onValueChange={(value) => setLlmConfig({ ...llmConfig, model: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a model" />
                      </SelectTrigger>
                      <SelectContent>
                        {llmProviders.find(p => p.id === "ollama")?.models.map((model) => (
                          <SelectItem key={model} value={model}>
                            {model}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-medium mb-2">Ollama Setup Instructions</h4>
                    <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                      <li>Install Ollama from <a href="https://ollama.ai" className="text-primary underline" target="_blank">ollama.ai</a></li>
                      <li>Run: <code className="bg-background px-1 rounded">ollama pull llama2</code></li>
                      <li>Start Ollama: <code className="bg-background px-1 rounded">ollama serve</code></li>
                      <li>Test connection above</li>
                    </ol>
                  </div>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="llmProvider">Provider</Label>
                    <Select
                      value={llmConfig.provider}
                      onValueChange={(value) => {
                        const provider = llmProviders.find(p => p.id === value);
                        setLlmConfig({
                          ...llmConfig,
                          provider: value,
                          model: provider?.models[0] || "",
                        });
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a provider" />
                      </SelectTrigger>
                      <SelectContent>
                        {llmProviders.filter(p => p.id !== "ollama").map((provider) => (
                          <SelectItem key={provider.id} value={provider.id}>
                            {provider.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="llmModel">Model</Label>
                    <Select
                      value={llmConfig.model}
                      onValueChange={(value) => setLlmConfig({ ...llmConfig, model: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a model" />
                      </SelectTrigger>
                      <SelectContent>
                        {llmProviders.find(p => p.id === llmConfig.provider)?.models.map((model) => (
                          <SelectItem key={model} value={model}>
                            {model}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="llmApiKey">API Key</Label>
                    <div className="relative">
                      <Input
                        id="llmApiKey"
                        type={showKeys["llm"] ? "text" : "password"}
                        placeholder="Enter your API key"
                        value={llmConfig.apiKey}
                        onChange={(e) => setLlmConfig({ ...llmConfig, apiKey: e.target.value })}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full"
                        onClick={() => toggleShowKey("llm")}
                      >
                        {showKeys["llm"] ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              <Button
                variant="outline"
                onClick={() => testConnection("llm")}
                disabled={testingStatus["llm"] === "testing"}
              >
                {testingStatus["llm"] === "testing" ? (
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                ) : testingStatus["llm"] === "success" ? (
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                ) : testingStatus["llm"] === "error" ? (
                  <XCircle className="mr-2 h-4 w-4 text-red-500" />
                ) : (
                  <TestTube className="mr-2 h-4 w-4" />
                )}
                Test LLM Connection
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social Links Tab */}
        <TabsContent value="social" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Social Media Links</CardTitle>
                  <CardDescription>
                    Configure social media links displayed in the footer. Links are only visible when a URL is provided and visibility is enabled.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* LinkedIn */}
              <div className="flex items-center gap-4 p-4 border rounded-lg">
                <div className="p-2 rounded-lg bg-[#0077B5]/10">
                  <Linkedin className="h-5 w-5 text-[#0077B5]" />
                </div>
                <div className="flex-1 space-y-2">
                  <Label htmlFor="linkedin-url">LinkedIn</Label>
                  <Input
                    id="linkedin-url"
                    placeholder="https://linkedin.com/company/your-company"
                    value={socialLinks.linkedin.url}
                    onChange={(e) => {
                      setSocialLinks(prev => ({ ...prev, linkedin: { ...prev.linkedin, url: e.target.value } }));
                      setHasChanges(true);
                    }}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="linkedin-visible" className="text-sm">Visible</Label>
                  <Switch
                    id="linkedin-visible"
                    checked={socialLinks.linkedin.visible}
                    onCheckedChange={(checked) => {
                      setSocialLinks(prev => ({ ...prev, linkedin: { ...prev.linkedin, visible: checked } }));
                      setHasChanges(true);
                    }}
                  />
                </div>
              </div>

              {/* Twitter/X */}
              <div className="flex items-center gap-4 p-4 border rounded-lg">
                <div className="p-2 rounded-lg bg-black/10">
                  <Twitter className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-2">
                  <Label htmlFor="twitter-url">Twitter / X</Label>
                  <Input
                    id="twitter-url"
                    placeholder="https://twitter.com/your-company"
                    value={socialLinks.twitter.url}
                    onChange={(e) => {
                      setSocialLinks(prev => ({ ...prev, twitter: { ...prev.twitter, url: e.target.value } }));
                      setHasChanges(true);
                    }}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="twitter-visible" className="text-sm">Visible</Label>
                  <Switch
                    id="twitter-visible"
                    checked={socialLinks.twitter.visible}
                    onCheckedChange={(checked) => {
                      setSocialLinks(prev => ({ ...prev, twitter: { ...prev.twitter, visible: checked } }));
                      setHasChanges(true);
                    }}
                  />
                </div>
              </div>

              {/* YouTube */}
              <div className="flex items-center gap-4 p-4 border rounded-lg">
                <div className="p-2 rounded-lg bg-[#FF0000]/10">
                  <Youtube className="h-5 w-5 text-[#FF0000]" />
                </div>
                <div className="flex-1 space-y-2">
                  <Label htmlFor="youtube-url">YouTube</Label>
                  <Input
                    id="youtube-url"
                    placeholder="https://youtube.com/@your-channel"
                    value={socialLinks.youtube.url}
                    onChange={(e) => {
                      setSocialLinks(prev => ({ ...prev, youtube: { ...prev.youtube, url: e.target.value } }));
                      setHasChanges(true);
                    }}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="youtube-visible" className="text-sm">Visible</Label>
                  <Switch
                    id="youtube-visible"
                    checked={socialLinks.youtube.visible}
                    onCheckedChange={(checked) => {
                      setSocialLinks(prev => ({ ...prev, youtube: { ...prev.youtube, visible: checked } }));
                      setHasChanges(true);
                    }}
                  />
                </div>
              </div>

              {/* Facebook */}
              <div className="flex items-center gap-4 p-4 border rounded-lg">
                <div className="p-2 rounded-lg bg-[#1877F2]/10">
                  <Facebook className="h-5 w-5 text-[#1877F2]" />
                </div>
                <div className="flex-1 space-y-2">
                  <Label htmlFor="facebook-url">Facebook</Label>
                  <Input
                    id="facebook-url"
                    placeholder="https://facebook.com/your-page"
                    value={socialLinks.facebook.url}
                    onChange={(e) => {
                      setSocialLinks(prev => ({ ...prev, facebook: { ...prev.facebook, url: e.target.value } }));
                      setHasChanges(true);
                    }}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="facebook-visible" className="text-sm">Visible</Label>
                  <Switch
                    id="facebook-visible"
                    checked={socialLinks.facebook.visible}
                    onCheckedChange={(checked) => {
                      setSocialLinks(prev => ({ ...prev, facebook: { ...prev.facebook, visible: checked } }));
                      setHasChanges(true);
                    }}
                  />
                </div>
              </div>

              {/* Instagram */}
              <div className="flex items-center gap-4 p-4 border rounded-lg">
                <div className="p-2 rounded-lg bg-gradient-to-br from-[#833AB4]/10 via-[#FD1D1D]/10 to-[#F77737]/10">
                  <Instagram className="h-5 w-5 text-[#E4405F]" />
                </div>
                <div className="flex-1 space-y-2">
                  <Label htmlFor="instagram-url">Instagram</Label>
                  <Input
                    id="instagram-url"
                    placeholder="https://instagram.com/your-account"
                    value={socialLinks.instagram.url}
                    onChange={(e) => {
                      setSocialLinks(prev => ({ ...prev, instagram: { ...prev.instagram, url: e.target.value } }));
                      setHasChanges(true);
                    }}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="instagram-visible" className="text-sm">Visible</Label>
                  <Switch
                    id="instagram-visible"
                    checked={socialLinks.instagram.visible}
                    onCheckedChange={(checked) => {
                      setSocialLinks(prev => ({ ...prev, instagram: { ...prev.instagram, visible: checked } }));
                      setHasChanges(true);
                    }}
                  />
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">How it works</h4>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Social links appear in the website footer</li>
                  <li>Links are only shown when both a URL is provided AND visibility is enabled</li>
                  <li>Empty URLs will hide the icon regardless of visibility setting</li>
                  <li>Changes take effect after saving</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Feature Visibility Tab - SuperAdmin Only */}
        {isSuperAdmin && (
          <TabsContent value="features" className="space-y-6">
            <FeatureVisibilityContent />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
      <SettingsPageContent />
    </Suspense>
  );
}
