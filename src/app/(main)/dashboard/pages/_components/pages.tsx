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
import { getCategoryLabel, getPromoSlotId } from "@/lib/promo-pages";

import { getPagePath, initialPages, type PageRow } from "./data";
import { PageFormSheet } from "./page-form-sheet";

export function Pages() {
  const [pages, setPages] = React.useState<PageRow[]>(initialPages);
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [editingPage, setEditingPage] = React.useState<PageRow | undefined>(undefined);
  const [error, setError] = React.useState<string | undefined>(undefined);

  function openCreate() {
    setEditingPage(undefined);
    setError(undefined);
    setSheetOpen(true);
  }

  function openEdit(page: PageRow) {
    setEditingPage(page);
    setError(undefined);
    setSheetOpen(true);
  }

  function handleSubmit(values: Omit<PageRow, "id" | "updatedAt">) {
    const id = getPromoSlotId(values.category, values.variant);
    const conflict = pages.some((page) => page.id === id && page.id !== editingPage?.id);
    if (conflict) {
      setError("A page for this category and variant already exists.");
      return;
    }

    const updatedAt = new Date().toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });

    if (editingPage) {
      setPages((prev) =>
        prev.map((page) => (page.id === editingPage.id ? { ...page, ...values, id, updatedAt } : page)),
      );
    } else {
      setPages((prev) => [...prev, { ...values, id, updatedAt }]);
    }
    setError(undefined);
    setSheetOpen(false);
  }

  function handleDelete(id: string) {
    setPages((prev) => prev.filter((page) => page.id !== id));
  }

  const columns: SimpleColumn<PageRow>[] = [
    {
      id: "title",
      header: "Title",
      cell: (row) => (
        <div className="min-w-0">
          <div className="truncate font-medium text-sm">{row.title}</div>
          <div className="truncate text-muted-foreground text-sm">{getPagePath(row)}</div>
        </div>
      ),
    },
    {
      id: "category",
      header: "Category",
      cell: (row) => (
        <Badge variant="outline">
          {getCategoryLabel(row.category)}
          {row.category !== "home" ? ` — ${row.variant === "main" ? "Main" : `Variant ${row.variant}`}` : ""}
        </Badge>
      ),
    },
    {
      id: "status",
      header: "Status",
      cell: (row) => <Badge variant={row.status === "Published" ? "default" : "outline"}>{row.status}</Badge>,
    },
    {
      id: "updatedAt",
      header: "Updated",
      cell: (row) => <span className="text-muted-foreground text-sm">{row.updatedAt}</span>,
    },
    {
      id: "actions",
      header: <div className="text-right">Actions</div>,
      cell: (row) => (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                aria-label={`Open actions for ${row.title}`}
                className="size-8 rounded-md text-muted-foreground hover:bg-muted/50"
                size="icon-sm"
                variant="ghost"
              >
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => openEdit(row)}>Edit page</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" onClick={() => handleDelete(row.id)}>
                Delete page
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
        <CardTitle className="text-xl leading-none">Pages</CardTitle>
        <CardDescription className="max-w-sm leading-snug">
          Manage content for the 16 fixed promo pages (home + 5 categories x 3 variants).
        </CardDescription>
        <CardAction>
          <Button size="sm" onClick={openCreate}>
            <Plus /> New Page
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="px-0">
        <SimpleDataTable columns={columns} rows={pages} getRowId={(row) => row.id} />
      </CardContent>

      <PageFormSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        page={editingPage}
        onSubmit={handleSubmit}
        error={error}
      />
    </Card>
  );
}
