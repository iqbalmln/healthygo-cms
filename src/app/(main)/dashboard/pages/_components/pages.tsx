"use client";

import { useRouter } from "next/navigation";

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
import { getCategoryLabel, getPromoPagePath } from "@/lib/promo-pages";

import type { PageRow } from "./data";
import { usePagesStore } from "./pages-store";

export function Pages() {
  const router = useRouter();
  const pages = usePagesStore((state) => state.pages);
  const removePage = usePagesStore((state) => state.removePage);

  const columns: SimpleColumn<PageRow>[] = [
    {
      id: "title",
      header: "Title",
      cell: (row) => (
        <div className="min-w-0">
          <div className="truncate font-medium text-sm">{row.title}</div>
          <div className="truncate text-muted-foreground text-sm">{getPromoPagePath(row.category, row.variant)}</div>
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
              <DropdownMenuItem onClick={() => router.push(`/dashboard/pages/${row.id}`)}>Edit page</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" onClick={() => removePage(row.id)}>
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
          Manage content for the promo pages (home + 5 categories x 3 variants).
        </CardDescription>
        <CardAction>
          <Button size="sm" onClick={() => router.push("/dashboard/pages/new")}>
            <Plus /> New Page
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="px-0">
        <SimpleDataTable columns={columns} rows={pages} getRowId={(row) => row.id} />
      </CardContent>
    </Card>
  );
}
