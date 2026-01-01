"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Search,
  Building,
  MapPin,
  Users,
  MoreHorizontal,
  Eye,
  Edit,
  FolderKanban,
  Mail,
  Phone,
} from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { COLLECTIONS } from "@/lib/schema";
import { useUserProfile } from "@/contexts/user-profile-context";
import { filterDataByRole } from "@/lib/role-permissions";

interface CustomerDisplay {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: string;
  location: string;
  projectCount: number;
  ownerId?: string;
  assignedTo?: string[];
  affiliateId?: string;
}

function getStatusBadge(status: string) {
  switch (status) {
    case "active":
      return <Badge className="bg-green-100 text-green-800">Active</Badge>;
    case "prospect":
      return <Badge className="bg-blue-100 text-blue-800">Prospect</Badge>;
    case "completed":
      return <Badge className="bg-gray-100 text-gray-800">Completed</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
}

export default function CustomersPage() {
  const { profile, getEffectiveRole } = useUserProfile();
  const currentUserRole = getEffectiveRole();
  const userId = profile?.id || "";
  
  const [customers, setCustomers] = useState<CustomerDisplay[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchCustomers() {
      if (!db) {
        setIsLoading(false);
        return;
      }
      
      try {
        const customersRef = collection(db, "customers");
        const customersQuery = query(customersRef, orderBy("createdAt", "desc"));
        const snapshot = await getDocs(customersQuery);
        
        const allCustomers: CustomerDisplay[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name || data.contactName || "Unknown",
            company: data.company || data.organizationName || "",
            email: data.email || data.emailPrimary || "",
            phone: data.phone || data.mobile || "",
            status: data.status || "active",
            location: data.location || data.city || "",
            projectCount: data.projectCount || 0,
            ownerId: data.ownerId || data.createdBy || "",
            assignedTo: data.assignedTo || [],
            affiliateId: data.affiliateId || "",
          };
        });
        
        // Filter customers based on user role
        const filteredCustomers = filterDataByRole(
          allCustomers as unknown as Record<string, unknown>[],
          currentUserRole,
          userId,
          "assignedTo",
          "ownerId"
        ) as unknown as CustomerDisplay[];
        
        setCustomers(filteredCustomers);
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchCustomers();
  }, [currentUserRole, userId]);

  const activeCustomers = customers.filter(c => c.status === "active").length;
  const prospects = customers.filter(c => c.status === "prospect").length;
  const totalProjects = customers.reduce((sum, c) => sum + c.projectCount, 0);
  
  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground">
            Manage customer relationships and track engagements
          </p>
        </div>
        <Button asChild>
          <Link href="/portal/customers/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Customer
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeCustomers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Prospects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{prospects}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProjects}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search customers..." className="pl-9" />
          </div>
        </CardContent>
      </Card>

      {/* Empty State */}
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Building className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No customers yet</h3>
          <p className="text-muted-foreground mb-4 text-center max-w-md">
            Add your first customer to start tracking relationships and engagements.
          </p>
          <Button asChild>
            <Link href="/portal/customers/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Customer
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
