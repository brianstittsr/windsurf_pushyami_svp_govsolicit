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
import { Plus, Pencil, Trash2, Loader2, ExternalLink, Settings, FileText } from "lucide-react";
import Link from "next/link";
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
import { COLLECTIONS, type GovernmentSolicitationDoc } from "@/lib/schema";

type SolicitationStatus = GovernmentSolicitationDoc["status"];

interface FormState {
  title: string;
  solicitationNumber: string;
  agency: string;
  setAside: string;
  naicsCsv: string;
  postedDate: string;
  dueDate: string;
  status: SolicitationStatus;
  url: string;
  description: string;
  notes: string;
}

const emptyForm: FormState = {
  title: "",
  solicitationNumber: "",
  agency: "",
  setAside: "",
  naicsCsv: "",
  postedDate: "",
  dueDate: "",
  status: "draft",
  url: "",
  description: "",
  notes: "",
};

function toOptionalTimestamp(dateStr: string): Timestamp | undefined {
  if (!dateStr) return undefined;
  const d = new Date(dateStr + "T00:00:00");
  if (Number.isNaN(d.getTime())) return undefined;
  return Timestamp.fromDate(d);
}

export default function GovernmentSolicitationsAdminPage() {
  const [items, setItems] = useState<GovernmentSolicitationDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingItem, setEditingItem] = useState<GovernmentSolicitationDoc | null>(null);
  const [itemToDelete, setItemToDelete] = useState<GovernmentSolicitationDoc | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);

  useEffect(() => {
    const fetchItems = async () => {
      if (!db) {
        setLoading(false);
        return;
      }

      try {
        const q = query(collection(db, COLLECTIONS.GOVERNMENT_SOLICITATIONS), orderBy("updatedAt", "desc"));
        const snapshot = await getDocs(q);
        const list: GovernmentSolicitationDoc[] = [];
        snapshot.forEach((d) => list.push({ id: d.id, ...(d.data() as Omit<GovernmentSolicitationDoc, "id">) }));
        setItems(list);
      } catch (e) {
        console.error(e);
        toast.error("Failed to load solicitations");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const sorted = useMemo(() => {
    return [...items].sort((a, b) => {
      const ad = a.dueDate?.toMillis?.() ?? 0;
      const bd = b.dueDate?.toMillis?.() ?? 0;
      return bd - ad;
    });
  }, [items]);

  const openDialog = (item?: GovernmentSolicitationDoc) => {
    if (item) {
      setEditingItem(item);
      setForm({
        title: item.title,
        solicitationNumber: item.solicitationNumber || "",
        agency: item.agency || "",
        setAside: item.setAside || "",
        naicsCsv: item.naics?.join(", ") || "",
        postedDate: item.postedDate ? item.postedDate.toDate().toISOString().slice(0, 10) : "",
        dueDate: item.dueDate ? item.dueDate.toDate().toISOString().slice(0, 10) : "",
        status: item.status,
        url: item.url || "",
        description: item.description || "",
        notes: item.notes || "",
      });
    } else {
      setEditingItem(null);
      setForm(emptyForm);
    }

    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!db) {
      toast.error("Database not configured");
      return;
    }

    if (!form.title.trim()) {
      toast.error("Title is required");
      return;
    }

    setSaving(true);

    try {
      const now = Timestamp.now();
      const payload: Omit<GovernmentSolicitationDoc, "id"> = {
        title: form.title.trim(),
        solicitationNumber: form.solicitationNumber.trim() || undefined,
        agency: form.agency.trim() || undefined,
        setAside: form.setAside.trim() || undefined,
        naics: form.naicsCsv
          ? form.naicsCsv
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : undefined,
        postedDate: toOptionalTimestamp(form.postedDate),
        dueDate: toOptionalTimestamp(form.dueDate),
        status: form.status,
        url: form.url.trim() || undefined,
        description: form.description.trim() || undefined,
        notes: form.notes.trim() || undefined,
        createdAt: editingItem?.createdAt || now,
        updatedAt: now,
      };

      if (editingItem) {
        await updateDoc(doc(db, COLLECTIONS.GOVERNMENT_SOLICITATIONS, editingItem.id), payload);
        setItems((prev) => prev.map((i) => (i.id === editingItem.id ? { ...payload, id: editingItem.id } : i)));
        toast.success("Solicitation updated");
      } else {
        const ref = await addDoc(collection(db, COLLECTIONS.GOVERNMENT_SOLICITATIONS), payload);
        setItems((prev) => [{ ...payload, id: ref.id }, ...prev]);
        toast.success("Solicitation created");
      }

      setDialogOpen(false);
    } catch (e) {
      console.error(e);
      toast.error("Failed to save solicitation");
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = (item: GovernmentSolicitationDoc) => {
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!db || !itemToDelete) return;

    try {
      await deleteDoc(doc(db, COLLECTIONS.GOVERNMENT_SOLICITATIONS, itemToDelete.id));
      setItems((prev) => prev.filter((i) => i.id !== itemToDelete.id));
      toast.success("Solicitation deleted");
    } catch (e) {
      console.error(e);
      toast.error("Failed to delete solicitation");
    } finally {
      setDeleteDialogOpen(false);
      setItemToDelete(null);
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
          <h1 className="text-3xl font-bold tracking-tight">Government Solicitations</h1>
          <p className="text-muted-foreground">Track opportunities, due dates, and notes.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/portal/work/sam-gov-migration">
              <FileText className="h-4 w-4 mr-2" />
              SAM.gov Guide
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/portal/settings/sam-gov">
              <Settings className="h-4 w-4 mr-2" />
              Configure SAM.gov
            </Link>
          </Button>
          <Button onClick={() => openDialog()}>
            <Plus className="h-4 w-4 mr-2" />
            Add Solicitation
          </Button>
        </div>
      </div>

      {sorted.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center">
            <p className="text-muted-foreground">No solicitations yet.</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Solicitations</CardTitle>
            <CardDescription>Internal tracking (draft/open/submitted/awarded/archived).</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {sorted.map((s) => (
              <div key={s.id} className="flex items-center justify-between gap-4 border rounded-lg p-4">
                <div className="min-w-0">
                  <div className="font-medium truncate">{s.title}</div>
                  <div className="text-sm text-muted-foreground truncate">
                    {s.agency ? `${s.agency} • ` : ""}
                    {s.solicitationNumber || ""}
                    {s.dueDate ? ` • Due ${s.dueDate.toDate().toLocaleDateString()}` : ""}
                    {` • ${s.status}`}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {s.url ? (
                    <Button variant="ghost" size="icon" asChild>
                      <a href={s.url} target="_blank" rel="noreferrer" title="Open link">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  ) : null}
                  <Button variant="ghost" size="icon" onClick={() => openDialog(s)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive" onClick={() => confirmDelete(s)}>
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
            <DialogTitle>{editingItem ? "Edit Solicitation" : "Create Solicitation"}</DialogTitle>
            <DialogDescription>Store tracking info, key dates, and a source URL.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input id="title" value={form.title} onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="solNumber">Solicitation Number</Label>
                <Input id="solNumber" value={form.solicitationNumber} onChange={(e) => setForm((s) => ({ ...s, solicitationNumber: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={form.status} onValueChange={(v) => setForm((s) => ({ ...s, status: v as SolicitationStatus }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="submitted">Submitted</SelectItem>
                    <SelectItem value="awarded">Awarded</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="agency">Agency</Label>
                <Input id="agency" value={form.agency} onChange={(e) => setForm((s) => ({ ...s, agency: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="setAside">Set-Aside</Label>
                <Input id="setAside" value={form.setAside} onChange={(e) => setForm((s) => ({ ...s, setAside: e.target.value }))} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="naics">NAICS (comma-separated)</Label>
              <Input id="naics" value={form.naicsCsv} onChange={(e) => setForm((s) => ({ ...s, naicsCsv: e.target.value }))} placeholder="541611, 541512" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="postedDate">Posted Date</Label>
                <Input id="postedDate" type="date" value={form.postedDate} onChange={(e) => setForm((s) => ({ ...s, postedDate: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input id="dueDate" type="date" value={form.dueDate} onChange={(e) => setForm((s) => ({ ...s, dueDate: e.target.value }))} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="url">Source URL</Label>
              <Input id="url" value={form.url} onChange={(e) => setForm((s) => ({ ...s, url: e.target.value }))} placeholder="https://sam.gov/..." />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" value={form.description} onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))} rows={4} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Internal Notes</Label>
              <Textarea id="notes" value={form.notes} onChange={(e) => setForm((s) => ({ ...s, notes: e.target.value }))} rows={4} />
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
            <AlertDialogTitle>Delete solicitation?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {itemToDelete?.title ? `“${itemToDelete.title}”` : "this solicitation"}.
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
