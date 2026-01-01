"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Eye,
  EyeOff,
  Save,
  RotateCcw,
  Shield,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";
import { useUserProfile } from "@/contexts/user-profile-context";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

interface FeatureVisibility {
  id: string;
  name: string;
  description: string;
  category: "main" | "work" | "ai" | "admin" | "initiatives";
  visible: boolean;
  requiresSubscription?: boolean;
}

const DEFAULT_FEATURES: FeatureVisibility[] = [
  // Main Navigation
  { id: "command-center", name: "Command Center", description: "Dashboard and overview", category: "main", visible: true },
  { id: "opportunities", name: "Opportunities", description: "Business opportunities tracking", category: "main", visible: true },
  { id: "projects", name: "Projects", description: "Project management", category: "main", visible: true },
  { id: "affiliates", name: "Affiliates", description: "Affiliate network management", category: "main", visible: true },
  { id: "customers", name: "Customers", description: "Customer relationship management", category: "main", visible: true },
  
  // Work Items
  { id: "gov-solicitations", name: "Gov Solicitations", description: "Government contract opportunities", category: "work", visible: true },
  { id: "apollo-search", name: "Apollo Search", description: "Contact and company search", category: "work", visible: true, requiresSubscription: true },
  { id: "supplier-search", name: "Supplier Search", description: "Supplier database search", category: "work", visible: true, requiresSubscription: true },
  { id: "documents", name: "Documents", description: "Document management", category: "work", visible: true },
  { id: "calendar", name: "Calendar", description: "Calendar and scheduling", category: "work", visible: true },
  { id: "availability", name: "Availability", description: "Team availability tracking", category: "work", visible: true },
  { id: "meetings", name: "Meetings", description: "Meeting management", category: "work", visible: true },
  { id: "rocks", name: "Rocks", description: "EOS Rocks tracking", category: "work", visible: true },
  { id: "networking", name: "Networking", description: "Professional networking", category: "work", visible: true },
  { id: "deals", name: "Deals", description: "Deal pipeline management", category: "work", visible: true },
  { id: "linkedin-content", name: "LinkedIn Content", description: "LinkedIn content creation", category: "work", visible: true },
  { id: "eos2", name: "EOS2 Dashboard", description: "EOS traction tools", category: "work", visible: true },
  { id: "docuseal", name: "DocuSeal", description: "Document signing", category: "work", visible: true },
  { id: "bug-tracker", name: "Bug Tracker", description: "Issue tracking", category: "work", visible: true },
  
  // AI Tools
  { id: "ai-workforce", name: "AI Workforce", description: "AI agent management", category: "ai", visible: true, requiresSubscription: true },
  { id: "proposals", name: "Proposal Creator", description: "AI-powered proposal generation", category: "ai", visible: true, requiresSubscription: true },
  { id: "ask", name: "Ask AI", description: "AI assistant", category: "ai", visible: true },
  
  // Admin
  { id: "team-members", name: "Team Members", description: "User management", category: "admin", visible: true },
  { id: "strategic-partners", name: "Strategic Partners", description: "Partner management", category: "admin", visible: true },
  { id: "gohighlevel", name: "GoHighLevel", description: "CRM integration", category: "admin", visible: true, requiresSubscription: true },
  { id: "platform-settings", name: "Platform Settings", description: "System configuration", category: "admin", visible: true },
  
  // Initiatives
  { id: "initiatives", name: "Initiatives", description: "Strategic initiatives", category: "initiatives", visible: true },
];

export default function FeatureVisibilityPage() {
  const { profile, isSuperAdmin: checkIsSuperAdmin, isLoading: profileLoading } = useUserProfile();
  const [features, setFeatures] = useState<FeatureVisibility[]>(DEFAULT_FEATURES);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const isSuperAdmin = checkIsSuperAdmin();

  useEffect(() => {
    if (!profileLoading) {
      loadFeatureSettings();
    }
  }, [profileLoading]);

  const loadFeatureSettings = async () => {
    try {
      if (!db) {
        toast.error("Database not initialized");
        return;
      }
      const settingsRef = doc(db, "platformSettings", "featureVisibility");
      const settingsDoc = await getDoc(settingsRef);
      
      if (settingsDoc.exists()) {
        const savedFeatures = settingsDoc.data().features as FeatureVisibility[];
        setFeatures(savedFeatures);
      }
    } catch (error) {
      console.error("Error loading feature settings:", error);
      toast.error("Failed to load feature settings");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFeature = (featureId: string) => {
    setFeatures((prev) =>
      prev.map((f) =>
        f.id === featureId ? { ...f, visible: !f.visible } : f
      )
    );
    setHasChanges(true);
  };

  const handleToggleCategory = (category: string, visible: boolean) => {
    setFeatures((prev) =>
      prev.map((f) =>
        f.category === category ? { ...f, visible } : f
      )
    );
    setHasChanges(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (!db) {
        toast.error("Database not initialized");
        return;
      }
      const settingsRef = doc(db, "platformSettings", "featureVisibility");
      await setDoc(settingsRef, {
        features,
        updatedAt: new Date(),
        updatedBy: profile.email,
      });
      
      setHasChanges(false);
      toast.success("Feature visibility settings saved successfully");
    } catch (error) {
      console.error("Error saving feature settings:", error);
      toast.error("Failed to save feature settings");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setFeatures(DEFAULT_FEATURES);
    setHasChanges(true);
    toast.info("Reset to default settings");
  };

  // Show loading while profile is loading
  if (profileLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="h-8 w-8 mx-auto animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-muted-foreground">Loading feature settings...</p>
        </div>
      </div>
    );
  }

  if (!isSuperAdmin) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="max-w-md">
          <CardHeader>
            <div className="flex items-center gap-2 text-destructive">
              <Shield className="h-5 w-5" />
              <CardTitle>Access Denied</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Only SuperAdmin users can access feature visibility settings.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Current role: {profile.role}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const categories = [
    { id: "main", name: "Main Navigation", icon: "📊" },
    { id: "work", name: "Work Items", icon: "💼" },
    { id: "ai", name: "AI Tools", icon: "🤖" },
    { id: "admin", name: "Admin", icon: "⚙️" },
    { id: "initiatives", name: "Initiatives", icon: "🚀" },
  ];

  const getVisibleCount = (category: string) => {
    return features.filter((f) => f.category === category && f.visible).length;
  };

  const getTotalCount = (category: string) => {
    return features.filter((f) => f.category === category).length;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Feature Visibility</h1>
          <p className="text-muted-foreground mt-2">
            Control which features are visible in the navigation panel
          </p>
        </div>
        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
          <Shield className="h-3 w-3 mr-1" />
          SuperAdmin Only
        </Badge>
      </div>

      {/* Alert */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-medium text-yellow-900">Important</p>
              <p className="text-sm text-yellow-700">
                Hidden features will not appear in the navigation panel for any users. Use this to hide features
                that are not paid for or not yet ready for production. Changes affect all users immediately after saving.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
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
            onClick={handleReset}
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset to Default
          </Button>
        </div>
        <Button
          onClick={handleSave}
          disabled={!hasChanges || saving}
        >
          {saving ? (
            <>
              <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      {/* Feature Categories */}
      {categories.map((category) => {
        const categoryFeatures = features.filter((f) => f.category === category.id);
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
                      {visibleCount} of {totalCount} features visible
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleToggleCategory(category.id, true)}
                  >
                    Show All
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleToggleCategory(category.id, false)}
                  >
                    Hide All
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
                    <TableHead className="text-right">Visible</TableHead>
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
                          {feature.visible ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          )}
                          <Switch
                            checked={feature.visible}
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
      {hasChanges && (
        <Card className="border-primary bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-primary" />
                <p className="font-medium">You have unsaved changes</p>
              </div>
              <Button onClick={handleSave} disabled={saving}>
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
