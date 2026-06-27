import { Eye, FileText, MessagesSquare, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const metrics = [
  {
    icon: FileText,
    label: "Total Pages",
    value: "8",
    description: "Static pages published",
  },
  {
    icon: MessagesSquare,
    label: "Unread Messages",
    value: "5",
    description: "New contact form submissions",
  },
  {
    icon: Eye,
    label: "Visitors Today",
    value: "342",
    description: "Unique visitors on the public site",
  },
  {
    icon: Star,
    label: "Total Testimonials",
    value: "12",
    description: "Client reviews collected",
  },
];

export function MetricCards() {
  return (
    <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs xl:grid-cols-4 dark:*:data-[slot=card]:bg-card">
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
            <div className="flex flex-wrap items-center gap-2">
              <div className="font-medium text-3xl tabular-nums leading-none tracking-tight">{metric.value}</div>
              <Badge variant="outline">Mock data</Badge>
            </div>
            <p className="text-muted-foreground text-sm">{metric.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
