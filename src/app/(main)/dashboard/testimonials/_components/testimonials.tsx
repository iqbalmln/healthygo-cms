"use client";

import * as React from "react";

import { MoreHorizontal, Plus } from "lucide-react";

import { type SimpleColumn, SimpleDataTable } from "@/components/cms/simple-data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getPromoSlotId, PROMO_PAGE_SLOTS } from "@/lib/promo-pages";

import { initialTestimonials, type TestimonialRow } from "./data";
import { TestimonialFormSheet } from "./testimonial-form-sheet";

function getPageLabel(row: TestimonialRow) {
  const id = getPromoSlotId(row.category, row.variant);
  return PROMO_PAGE_SLOTS.find((slot) => slot.id === id)?.label ?? id;
}

export function Testimonials() {
  const [testimonials, setTestimonials] = React.useState<TestimonialRow[]>(
    [...initialTestimonials].sort((a, b) => a.order - b.order),
  );
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<TestimonialRow | undefined>(undefined);

  function openCreate() {
    setEditing(undefined);
    setSheetOpen(true);
  }

  function openEdit(row: TestimonialRow) {
    setEditing(row);
    setSheetOpen(true);
  }

  function handleSubmit(values: Omit<TestimonialRow, "id">) {
    if (editing) {
      setTestimonials((prev) =>
        prev.map((row) => (row.id === editing.id ? { ...row, ...values } : row)).sort((a, b) => a.order - b.order),
      );
    } else {
      setTestimonials((prev) => [...prev, { ...values, id: crypto.randomUUID() }].sort((a, b) => a.order - b.order));
    }
  }

  function handleDelete(id: string) {
    setTestimonials((prev) => prev.filter((row) => row.id !== id));
  }

  const columns: SimpleColumn<TestimonialRow>[] = [
    {
      id: "image",
      header: "Testimonial",
      cell: (row) => (
        // biome-ignore lint/performance/noImgElement: preview comes from blob/external URLs not configured in next/image
        <img src={row.imageUrl} alt="Testimonial" className="h-16 w-28 rounded-md object-cover" />
      ),
    },
    {
      id: "page",
      header: "Page",
      cell: (row) => <Badge variant="outline">{getPageLabel(row)}</Badge>,
    },
    { id: "order", header: "Order", cell: (row) => <span className="text-sm">{row.order}</span> },
    {
      id: "status",
      header: "Status",
      cell: (row) => <Badge variant={row.status === "Published" ? "default" : "outline"}>{row.status}</Badge>,
    },
    {
      id: "actions",
      header: <div className="text-right">Actions</div>,
      cell: (row) => (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                aria-label="Open actions"
                className="size-8 rounded-md text-muted-foreground hover:bg-muted/50"
                size="icon-sm"
                variant="ghost"
              >
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => openEdit(row)}>Edit testimonial</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" onClick={() => handleDelete(row.id)}>
                Delete testimonial
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
      className: "w-24",
    },
  ];

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle className="text-xl leading-none">Testimonials</CardTitle>
        <CardDescription className="max-w-sm leading-snug">
          Testimonial images shown on the public site.
        </CardDescription>
        <CardAction>
          <Button size="sm" onClick={openCreate}>
            <Plus /> New Testimonial
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="px-0">
        <SimpleDataTable columns={columns} rows={testimonials} getRowId={(row) => row.id} />
      </CardContent>

      <TestimonialFormSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        testimonial={editing}
        onSubmit={handleSubmit}
      />
    </Card>
  );
}
