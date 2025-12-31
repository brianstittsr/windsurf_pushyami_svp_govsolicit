"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserProfile } from "@/contexts/user-profile-context";
import { toast } from "sonner";

interface AdminGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectTo?: string;
  showToast?: boolean;
}

export function AdminGuard({ 
  children, 
  fallback = null, 
  redirectTo = "/portal/command-center",
  showToast = true 
}: AdminGuardProps) {
  const { isAdmin, isLoading, isAuthenticated } = useUserProfile();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated && !isAdmin()) {
      if (showToast) {
        toast.error("Access Denied", {
          description: "You don't have permission to access this page.",
        });
      }
      if (redirectTo) {
        router.push(redirectTo);
      }
    }
  }, [isAdmin, isLoading, isAuthenticated, router, redirectTo, showToast]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (!isAdmin()) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

export function useAdminGuard() {
  const { isAdmin, isLoading, isAuthenticated } = useUserProfile();
  
  return {
    isAdmin: isAdmin(),
    isLoading,
    isAuthenticated,
    canAccess: isAuthenticated && isAdmin(),
  };
}
