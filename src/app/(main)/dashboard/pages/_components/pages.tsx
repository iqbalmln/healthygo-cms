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

import { initialPages, type PageRow } from "./data";
import { PageFormSheet } from "./page-form-sheet";

export function Pages() {
  const [pages, setPages] = React.useState<PageRow[]>(initialPages);
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [editingPage, setEditingPage] = React.useState<PageRow | undefined>(undefined);

  function openCreate() {
    setEditingPage(undefined);
    setSheetOpen(true);
  }

  function openEdit(page: PageRow) {
    setEditingPage(page);
    setSheetOpen(true);
  }

  function handleSubmit(values: Omit<PageRow, "id" | "updatedAt">) {
    const updatedAt = new Date().toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });

    if (editingPage) {
      setPages((prev) => prev.map((page) => (page.id === editingPage.id ? { ...page, ...values, updatedAt } : page)));
    } else {
      setPages((prev) => [...prev, { ...values, id: values.slug, updatedAt }]);
    }
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
          <div className="truncate text-muted-foreground text-sm">/{row.slug}</div>
        </div>
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
          Manage static pages for the public company profile site.
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

      <PageFormSheet open={sheetOpen} onOpenChange={setSheetOpen} page={editingPage} onSubmit={handleSubmit} />
    </Card>
  );
}
