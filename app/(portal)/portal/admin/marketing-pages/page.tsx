"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2, Loader2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { COLLECTIONS, type MarketingPageDoc } from "@/lib/schema";

type PageStatus = MarketingPageDoc["status"];

interface FormState {
  slug: string;
  title: string;
  description: string;
  status: PageStatus;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  sectionsJson: string;
}

const emptyForm: FormState = {
  slug: "",
  title: "",
  description: "",
  status: "draft",
  primaryCtaLabel: "",
  primaryCtaHref: "",
  sectionsJson: "[]",
};

function safeParseSections(json: string) {
  const parsed = JSON.parse(json);
  if (!Array.isArray(parsed)) throw new Error("Sections must be a JSON array");
  return parsed;
}

export default function MarketingPagesAdminPage() {
  const [pages, setPages] = useState<MarketingPageDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingPage, setEditingPage] = useState<MarketingPageDoc | null>(null);
  const [pageToDelete, setPageToDelete] = useState<MarketingPageDoc | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);

  useEffect(() => {
    const fetchPages = async () => {
      if (!db) {
        setLoading(false);
        return;
      }

      try {
        const q = query(collection(db, COLLECTIONS.MARKETING_PAGES), orderBy("updatedAt", "desc"));
        const snapshot = await getDocs(q);
        const list: MarketingPageDoc[] = [];
        snapshot.forEach((d) => list.push({ id: d.id, ...(d.data() as Omit<MarketingPageDoc, "id">) }));
        setPages(list);
      } catch (e) {
        console.error(e);
        toast.error("Failed to load marketing pages");
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, []);

  const sortedPages = useMemo(() => {
    return [...pages].sort((a, b) => a.slug.localeCompare(b.slug));
  }, [pages]);

  const openDialog = (page?: MarketingPageDoc) => {
    if (page) {
      setEditingPage(page);
      setForm({
        slug: page.slug,
        title: page.title,
        description: page.description || "",
        status: page.status,
        primaryCtaLabel: page.primaryCta?.label || "",
        primaryCtaHref: page.primaryCta?.href || "",
        sectionsJson: JSON.stringify(page.sections || [], null, 2),
      });
    } else {
      setEditingPage(null);
      setForm(emptyForm);
    }

    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!db) {
      toast.error("Database not configured");
      return;
    }

    if (!form.slug.trim() || !form.title.trim()) {
      toast.error("Slug and title are required");
      return;
    }

    setSaving(true);

    try {
      const sections = safeParseSections(form.sectionsJson);
      const now = Timestamp.now();
      const payload: Omit<MarketingPageDoc, "id"> = {
        slug: form.slug.trim().replace(/^\//, ""),
        title: form.title.trim(),
        description: form.description.trim() || undefined,
        status: form.status,
        sections,
        primaryCta:
          form.primaryCtaLabel.trim() && form.primaryCtaHref.trim()
            ? { label: form.primaryCtaLabel.trim(), href: form.primaryCtaHref.trim() }
            : undefined,
        createdAt: editingPage?.createdAt || now,
        updatedAt: now,
      };

      if (editingPage) {
        await updateDoc(doc(db, COLLECTIONS.MARKETING_PAGES, editingPage.id), payload);
        setPages((prev) => prev.map((p) => (p.id === editingPage.id ? { ...payload, id: editingPage.id } : p)));
        toast.success("Marketing page updated");
      } else {
        const ref = await addDoc(collection(db, COLLECTIONS.MARKETING_PAGES), payload);
        setPages((prev) => [{ ...payload, id: ref.id }, ...prev]);
        toast.success("Marketing page created");
      }

      setDialogOpen(false);
    } catch (e: any) {
      console.error(e);
      toast.error(e?.message || "Failed to save marketing page");
    } finally {
      setSaving(false);
    }
  };

  const toggleStatus = async (page: MarketingPageDoc) => {
    if (!db) return;

    const nextStatus: PageStatus = page.status === "published" ? "draft" : "published";
    try {
      await updateDoc(doc(db, COLLECTIONS.MARKETING_PAGES, page.id), {
        status: nextStatus,
        updatedAt: Timestamp.now(),
      });
      setPages((prev) => prev.map((p) => (p.id === page.id ? { ...p, status: nextStatus } : p)));
      toast.success(nextStatus === "published" ? "Published" : "Unpublished");
    } catch (e) {
      console.error(e);
      toast.error("Failed to update status");
    }
  };

  const confirmDelete = (page: MarketingPageDoc) => {
    setPageToDelete(page);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!db || !pageToDelete) return;

    try {
      await deleteDoc(doc(db, COLLECTIONS.MARKETING_PAGES, pageToDelete.id));
      setPages((prev) => prev.filter((p) => p.id !== pageToDelete.id));
      toast.success("Marketing page deleted");
    } catch (e) {
      console.error(e);
      toast.error("Failed to delete marketing page");
    } finally {
      setDeleteDialogOpen(false);
      setPageToDelete(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Marketing Pages</h1>
          <p className="text-muted-foreground">Manage CMS-driven marketing pages and their CTAs.</p>
        </div>
        <Button onClick={() => openDialog()}>
          <Plus className="h-4 w-4 mr-2" />
          Add Page
        </Button>
      </div>

      {sortedPages.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center">
            <p className="text-muted-foreground">No marketing pages yet.</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Pages</CardTitle>
            <CardDescription>These pages render publicly via the marketing catch-all route.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {sortedPages.map((p) => (
              <div key={p.id} className="flex items-center justify-between gap-3 border rounded-lg p-4">
                <div className="min-w-0">
                  <div className="font-medium truncate">{p.title}</div>
                  <div className="text-sm text-muted-foreground truncate">/{p.slug}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={() => toggleStatus(p)} title={p.status === "published" ? "Unpublish" : "Publish"}>
                    {p.status === "published" ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => openDialog(p)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive" onClick={() => confirmDelete(p)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingPage ? "Edit Marketing Page" : "Create Marketing Page"}</DialogTitle>
            <DialogDescription>
              Use `slug` values like `about-us`, `services`, `capability-statement`, `contract-vehicles`.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="slug">Slug *</Label>
                <Input id="slug" value={form.slug} onChange={(e) => setForm((s) => ({ ...s, slug: e.target.value }))} placeholder="services" />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={form.status} onValueChange={(v) => setForm((s) => ({ ...s, status: v as PageStatus }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input id="title" value={form.title} onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Meta Description</Label>
              <Textarea id="description" value={form.description} onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))} rows={2} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="primaryCtaLabel">Primary CTA Label</Label>
                <Input
                  id="primaryCtaLabel"
                  value={form.primaryCtaLabel}
                  onChange={(e) => setForm((s) => ({ ...s, primaryCtaLabel: e.target.value }))}
                  placeholder="Request Information"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="primaryCtaHref">Primary CTA Link</Label>
                <Input
                  id="primaryCtaHref"
                  value={form.primaryCtaHref}
                  onChange={(e) => setForm((s) => ({ ...s, primaryCtaHref: e.target.value }))}
                  placeholder="/contact-us"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sections">Sections (JSON) *</Label>
              <Textarea
                id="sections"
                value={form.sectionsJson}
                onChange={(e) => setForm((s) => ({ ...s, sectionsJson: e.target.value }))}
                rows={12}
              />
              <p className="text-xs text-muted-foreground">
                Each section should include: `id`, `type`, `enabled`, `order`. Optional: `title`, `subtitle`, `body`, `bullets`, `ctas`.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete marketing page?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {pageToDelete?.title ? `“${pageToDelete.title}”` : "this page"}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
