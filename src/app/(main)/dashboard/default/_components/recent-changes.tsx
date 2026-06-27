import { type SimpleColumn, SimpleDataTable } from "@/components/cms/simple-data-table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type ContentType = "Page" | "Gallery" | "Testimonial" | "Banner" | "Profile";

interface ActivityRow {
  id: string;
  admin: string;
  action: string;
  target: string;
  type: ContentType;
  changedAt: string;
}

const activity: ActivityRow[] = [
  {
    id: "1",
    admin: "Iqbal Maulana",
    action: "Updated",
    target: "About Us",
    type: "Page",
    changedAt: "27 Jun 2026, 8:10 AM",
  },
  {
    id: "2",
    admin: "Iqbal Maulana",
    action: "Added",
    target: "Year End Promo",
    type: "Banner",
    changedAt: "26 Jun 2026, 4:45 PM",
  },
  {
    id: "3",
    admin: "Iqbal Maulana",
    action: "Uploaded",
    target: "Annual company event",
    type: "Gallery",
    changedAt: "25 Jun 2026, 2:30 PM",
  },
  {
    id: "4",
    admin: "Iqbal Maulana",
    action: "Hid",
    target: "Maria Lestari's review",
    type: "Testimonial",
    changedAt: "24 Jun 2026, 11:05 AM",
  },
  {
    id: "5",
    admin: "Iqbal Maulana",
    action: "Updated",
    target: "Visi & Misi",
    type: "Page",
    changedAt: "20 Jun 2026, 9:50 AM",
  },
];

const typeBadgeClass: Record<ContentType, string> = {
  Page: "border-sky-500/20 bg-sky-500/10 text-sky-600 dark:text-sky-400",
  Gallery: "border-violet-500/20 bg-violet-500/10 text-violet-600 dark:text-violet-400",
  Testimonial: "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Banner: "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Profile: "border-border bg-muted/50 text-muted-foreground",
};

const columns: SimpleColumn<ActivityRow>[] = [
  {
    id: "change",
    header: "Change",
    cell: (row) => (
      <div className="min-w-0">
        <div className="truncate text-sm">
          <span className="font-medium">{row.admin}</span> {row.action.toLowerCase()} {row.target}
        </div>
      </div>
    ),
  },
  {
    id: "type",
    header: "Type",
    cell: (row) => (
      <Badge className={typeBadgeClass[row.type]} variant="outline">
        {row.type}
      </Badge>
    ),
  },
  {
    id: "changedAt",
    header: "Date",
    cell: (row) => <span className="text-muted-foreground text-sm">{row.changedAt}</span>,
  },
];

export function RecentChanges() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="leading-none">Recent Changes</CardTitle>
        <CardDescription>Latest content updates made by admins.</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <SimpleDataTable columns={columns} rows={activity} getRowId={(row) => row.id} />
      </CardContent>
    </Card>
  );
}
