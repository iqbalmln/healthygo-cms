"use client";

import * as React from "react";

import { MoreHorizontal, Plus, Star } from "lucide-react";

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
import { cn } from "@/lib/utils";

import { initialTestimonials, type TestimonialRow } from "./data";
import { TestimonialFormSheet } from "./testimonial-form-sheet";

function RatingCell({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {["one", "two", "three", "four", "five"].map((position, index) => (
        <Star
          key={position}
          className={cn("size-3.5", index < rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground")}
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  const [testimonials, setTestimonials] = React.useState<TestimonialRow[]>(initialTestimonials);
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
      setTestimonials((prev) => prev.map((row) => (row.id === editing.id ? { ...row, ...values } : row)));
    } else {
      setTestimonials((prev) => [...prev, { ...values, id: crypto.randomUUID() }]);
    }
  }

  function handleDelete(id: string) {
    setTestimonials((prev) => prev.filter((row) => row.id !== id));
  }

  const columns: SimpleColumn<TestimonialRow>[] = [
    {
      id: "client",
      header: "Client",
      cell: (row) => (
        <div className="min-w-0">
          <div className="truncate font-medium text-sm">{row.clientName}</div>
          <div className="truncate text-muted-foreground text-sm">{row.company}</div>
        </div>
      ),
    },
    { id: "rating", header: "Rating", cell: (row) => <RatingCell rating={row.rating} /> },
    {
      id: "quote",
      header: "Quote",
      cell: (row) => <p className="max-w-sm truncate text-sm">{row.quote}</p>,
    },
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
                aria-label={`Open actions for ${row.clientName}`}
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
        <CardDescription className="max-w-sm leading-snug">Client reviews shown on the public site.</CardDescription>
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
