"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";

type UserRole = "superadmin" | "admin" | "team" | "affiliate" | "consultant" | "viewer";

interface RoleFeatureSettings {
  [featureId: string]: boolean;
}

interface AllRoleFeatureSettings {
  [role: string]: RoleFeatureSettings;
}

// Feature ID mapping from sidebar items to feature visibility IDs
const FEATURE_ID_MAP: { [key: string]: string } = {
  // Main Navigation
  "Command Center": "command-center",
  "Opportunities": "opportunities",
  "Projects": "projects",
  "Affiliates": "affiliates",
  "Customers": "customers",
  
  // Work Items
  "Gov Solicitations": "gov-solicitations",
  "FPDS Search": "fpds-search",
  "Apollo Search": "apollo-search",
  "Supplier Search": "supplier-search",
  "Documents": "documents",
  "Calendar": "calendar",
  "Availability": "availability",
  "Meetings": "meetings",
  "Rocks": "rocks",
  "Networking": "networking",
  "Deals": "deals",
  "LinkedIn Content": "linkedin-content",
  "EOS2 Dashboard": "eos2",
  "DocuSeal": "docuseal",
  "AI Workforce": "ai-workforce",
  "Proposal Creator": "proposals",
  "GoHighLevel": "gohighlevel",
  "Bug Tracker": "bug-tracker",
  "XProtege Tools": "xprotege-tools",
  "Careers": "careers",
  
  // AI
  "Ask IntellEDGE": "ask",
  
  // Admin
  "Book Call Leads": "book-call-leads",
  "Team Members": "team-members",
  "Strategic Partners": "strategic-partners",
  "Platform Settings": "platform-settings",
  
  // Initiatives
  "Initiatives": "initiatives",
  "TBMNC Suppliers": "tbmnc",
};

// Default settings when nothing is saved
const getDefaultRoleSettings = (): AllRoleFeatureSettings => {
  const featureIds = Object.values(FEATURE_ID_MAP);
  const settings: AllRoleFeatureSettings = {};
  
  const roles: UserRole[] = ["superadmin", "admin", "team", "affiliate", "consultant", "viewer"];
  
  roles.forEach(role => {
    settings[role] = {};
    featureIds.forEach(featureId => {
      // SuperAdmin and Admin get everything
      if (role === "superadmin" || role === "admin") {
        settings[role][featureId] = true;
      }
      // Team members get most things except some admin features
      else if (role === "team") {
        settings[role][featureId] = !["team-members", "strategic-partners", "book-call-leads", "gohighlevel"].includes(featureId);
      }
      // Affiliates get limited features
      else if (role === "affiliate" || role === "consultant") {
        settings[role][featureId] = ![
          "team-members", "strategic-partners", "book-call-leads", 
          "gohighlevel", "platform-settings", "initiatives", "tbmnc"
        ].includes(featureId);
      }
      // Viewers get read-only main features
      else if (role === "viewer") {
        settings[role][featureId] = ["command-center", "opportunities", "projects", "affiliates", "customers"].includes(featureId);
      }
    });
  });
  
  return settings;
};

let cachedSettings: AllRoleFeatureSettings | null = null;
let settingsListeners: ((settings: AllRoleFeatureSettings) => void)[] = [];

// Initialize listener for real-time updates
export function initFeatureVisibilityListener() {
  if (!db) return () => {};
  
  const settingsRef = doc(db, "platformSettings", "featureVisibilityByRole");
  
  const unsubscribe = onSnapshot(settingsRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.data();
      if (data.roleSettings) {
        // Merge with defaults
        const merged = getDefaultRoleSettings();
        Object.keys(data.roleSettings).forEach(role => {
          if (merged[role]) {
            Object.keys(data.roleSettings[role]).forEach(featureId => {
              merged[role][featureId] = data.roleSettings[role][featureId];
            });
          }
        });
        cachedSettings = merged;
        settingsListeners.forEach(listener => listener(merged));
      }
    } else {
      cachedSettings = getDefaultRoleSettings();
      settingsListeners.forEach(listener => listener(cachedSettings!));
    }
  });
  
  return unsubscribe;
}

// Hook to use feature visibility
export function useFeatureVisibility(userRole: string) {
  const [settings, setSettings] = useState<AllRoleFeatureSettings>(cachedSettings || getDefaultRoleSettings());
  
  useEffect(() => {
    // Subscribe to settings changes
    const listener = (newSettings: AllRoleFeatureSettings) => {
      setSettings(newSettings);
    };
    settingsListeners.push(listener);
    
    // Initialize listener if not already done
    if (!cachedSettings) {
      initFeatureVisibilityListener();
    } else {
      setSettings(cachedSettings);
    }
    
    return () => {
      settingsListeners = settingsListeners.filter(l => l !== listener);
    };
  }, []);
  
  // Check if a feature is visible for the current role
  const isFeatureVisible = (featureName: string): boolean => {
    const featureId = FEATURE_ID_MAP[featureName];
    if (!featureId) return true; // If not mapped, show by default
    
    const normalizedRole = userRole?.toLowerCase() || "viewer";
    const roleSettings = settings[normalizedRole];
    
    if (!roleSettings) return true; // If role not found, show by default
    
    return roleSettings[featureId] !== false; // Show if true or undefined
  };
  
  // Check if a feature is visible by ID
  const isFeatureVisibleById = (featureId: string): boolean => {
    const normalizedRole = userRole?.toLowerCase() || "viewer";
    const roleSettings = settings[normalizedRole];
    
    if (!roleSettings) return true;
    
    return roleSettings[featureId] !== false;
  };
  
  return {
    isFeatureVisible,
    isFeatureVisibleById,
    settings,
  };
}

// Synchronous check for feature visibility (uses cached settings)
export function checkFeatureVisibility(featureName: string, userRole: string): boolean {
  const featureId = FEATURE_ID_MAP[featureName];
  if (!featureId) return true;
  
  const settings = cachedSettings || getDefaultRoleSettings();
  const normalizedRole = userRole?.toLowerCase() || "viewer";
  const roleSettings = settings[normalizedRole];
  
  if (!roleSettings) return true;
  
  return roleSettings[featureId] !== false;
}
