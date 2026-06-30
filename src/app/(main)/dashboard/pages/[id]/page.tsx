"use client";

import { useParams } from "next/navigation";

import { PageEditor } from "../_components/page-editor";
import { usePagesStore } from "../_components/pages-store";

export default function PageDetailPage() {
  const { id } = useParams<{ id: string }>();
  const page = usePagesStore((state) => state.pages.find((p) => p.id === id));

  if (!page) {
    return <p className="text-muted-foreground text-sm">Page not found.</p>;
  }

  return <PageEditor mode="edit" page={page} />;
}
