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

import { BannerFormSheet } from "./banner-form-sheet";
import { type BannerRow, initialBanners } from "./data";

export function Banners() {
  const [banners, setBanners] = React.useState<BannerRow[]>([...initialBanners].sort((a, b) => a.order - b.order));
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<BannerRow | undefined>(undefined);

  function openCreate() {
    setEditing(undefined);
    setSheetOpen(true);
  }

  function openEdit(row: BannerRow) {
    setEditing(row);
    setSheetOpen(true);
  }

  function handleSubmit(values: Omit<BannerRow, "id">) {
    if (editing) {
      setBanners((prev) =>
        prev.map((row) => (row.id === editing.id ? { ...row, ...values } : row)).sort((a, b) => a.order - b.order),
      );
    } else {
      setBanners((prev) => [...prev, { ...values, id: crypto.randomUUID() }].sort((a, b) => a.order - b.order));
    }
  }

  function handleDelete(id: string) {
    setBanners((prev) => prev.filter((row) => row.id !== id));
  }

  const columns: SimpleColumn<BannerRow>[] = [
    {
      id: "image",
      header: "Banner",
      cell: (row) => (
        // biome-ignore lint/performance/noImgElement: preview comes from blob/external URLs not configured in next/image
        <img src={row.imageUrl} alt={row.title} className="h-12 w-20 rounded-md object-cover" />
      ),
    },
    {
      id: "title",
      header: "Title",
      cell: (row) => (
        <div className="min-w-0">
          <div className="truncate font-medium text-sm">{row.title}</div>
          <div className="truncate text-muted-foreground text-sm">{row.linkUrl}</div>
        </div>
      ),
    },
    { id: "order", header: "Order", cell: (row) => <span className="text-sm">{row.order}</span> },
    {
      id: "active",
      header: "Status",
      cell: (row) => <Badge variant={row.active ? "default" : "outline"}>{row.active ? "Active" : "Inactive"}</Badge>,
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
              <DropdownMenuItem onClick={() => openEdit(row)}>Edit banner</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" onClick={() => handleDelete(row.id)}>
                Delete banner
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
        <CardTitle className="text-xl leading-none">Banners</CardTitle>
        <CardDescription className="max-w-sm leading-snug">Hero slider banners on the homepage.</CardDescription>
        <CardAction>
          <Button size="sm" onClick={openCreate}>
            <Plus /> New Banner
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="px-0">
        <SimpleDataTable columns={columns} rows={banners} getRowId={(row) => row.id} />
      </CardContent>

      <BannerFormSheet open={sheetOpen} onOpenChange={setSheetOpen} banner={editing} onSubmit={handleSubmit} />
    </Card>
  );
}
