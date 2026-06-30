"use client";

import { FileText, Images } from "lucide-react";

import { initialMedia } from "@/app/(main)/dashboard/gallery/_components/data";
import { usePagesStore } from "@/app/(main)/dashboard/pages/_components/pages-store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function MetricCards() {
  const totalPages = usePagesStore((state) => state.pages.length);
  const totalImages = initialMedia.length;

  const metrics = [
    {
      icon: FileText,
      label: "Total Pages",
      value: `${totalPages}`,
      description: "Promo pages created",
    },
    {
      icon: Images,
      label: "Total Images",
      value: `${totalImages}`,
      description: "Gallery items",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs sm:grid-cols-2 dark:*:data-[slot=card]:bg-card">
      {metrics.map((metric) => (
        <Card key={metric.label}>
          <CardHeader>
            <CardTitle>
              <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
                <metric.icon className="size-4" />
              </div>
            </CardTitle>
            <CardDescription>{metric.label}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-1">
            <div className="font-medium text-3xl tabular-nums leading-none tracking-tight">{metric.value}</div>
            <p className="text-muted-foreground text-sm">{metric.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
