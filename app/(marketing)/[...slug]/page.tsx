"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { COLLECTIONS, type MarketingPageDoc, type MarketingPageSection } from "@/lib/schema";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function renderSection(section: MarketingPageSection) {
  switch (section.type) {
    case "hero":
      return (
        <section className="py-16 md:py-24 bg-black text-white">
          <div className="container">
            {section.subtitle ? (
              <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
                {section.subtitle}
              </Badge>
            ) : null}
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">{section.title}</h1>
            {section.body ? <p className="mt-6 text-lg text-gray-300 max-w-3xl">{section.body}</p> : null}
            {section.ctas?.length ? (
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                {section.ctas.map((cta) => (
                  <Button key={cta.href + cta.label} asChild>
                    <Link href={cta.href}>{cta.label}</Link>
                  </Button>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      );

    case "bullets":
      return (
        <section className="py-12 md:py-16">
          <div className="container">
            {section.title ? <h2 className="text-2xl md:text-3xl font-bold">{section.title}</h2> : null}
            {section.body ? <p className="mt-3 text-muted-foreground max-w-3xl">{section.body}</p> : null}
            {section.bullets?.length ? (
              <ul className="mt-6 grid gap-3 md:grid-cols-2">
                {section.bullets.map((b, idx) => (
                  <li key={idx} className="border rounded-lg p-4">{b}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </section>
      );

    case "cta":
      return (
        <section className="py-12 md:py-16 bg-primary text-primary-foreground">
          <div className="container">
            <div className="max-w-3xl">
              {section.title ? <h2 className="text-2xl md:text-3xl font-bold">{section.title}</h2> : null}
              {section.body ? <p className="mt-4 opacity-90">{section.body}</p> : null}
              {section.ctas?.length ? (
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  {section.ctas.map((cta) => (
                    <Button key={cta.href + cta.label} variant="secondary" asChild>
                      <Link href={cta.href}>{cta.label}</Link>
                    </Button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </section>
      );

    case "content":
    default:
      return (
        <section className="py-12 md:py-16">
          <div className="container">
            {section.title ? <h2 className="text-2xl md:text-3xl font-bold">{section.title}</h2> : null}
            {section.body ? (
              <div className="mt-4 prose prose-slate max-w-none">
                <p>{section.body}</p>
              </div>
            ) : null}
          </div>
        </section>
      );
  }
}

export default function MarketingCmsPage() {
  const pathname = usePathname();
  const [page, setPage] = useState<MarketingPageDoc | null>(null);
  const [loading, setLoading] = useState(true);

  const slug = useMemo(() => {
    const s = pathname.replace(/^\//, "");
    return s || "home";
  }, [pathname]);

  useEffect(() => {
    const fetchPage = async () => {
      if (!db) {
        setLoading(false);
        return;
      }

      try {
        const normalizedSlug = slug.replace(/^\//, "");
        const q = query(
          collection(db, COLLECTIONS.MARKETING_PAGES),
          where("slug", "==", normalizedSlug),
          limit(1)
        );
        const snapshot = await getDocs(q);
        if (snapshot.empty) {
          setPage(null);
          return;
        }

        const d = snapshot.docs[0];
        setPage({ id: d.id, ...(d.data() as Omit<MarketingPageDoc, "id">) });
      } catch (e) {
        console.error(e);
        setPage(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug]);

  if (loading) {
    return (
      <div className="container py-20">
        <Card>
          <CardContent className="py-16 text-center text-muted-foreground">Loading…</CardContent>
        </Card>
      </div>
    );
  }

  if (!page || page.status !== "published") {
    return (
      <div className="container py-20">
        <Card>
          <CardContent className="py-16 text-center">
            <div className="text-lg font-semibold">Page not found</div>
            <p className="mt-2 text-muted-foreground">This page doesn’t exist yet, or it is not published.</p>
            <div className="mt-6">
              <Button asChild>
                <Link href="/">Go to homepage</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const sections = [...(page.sections || [])]
    .filter((s) => s.enabled)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return (
    <div>
      {sections.map((s) => (
        <div key={s.id}>{renderSection(s)}</div>
      ))}
    </div>
  );
}
