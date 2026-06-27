import { type SimpleColumn, SimpleDataTable } from "@/components/cms/simple-data-table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface MessageRow {
  id: string;
  name: string;
  email: string;
  subject: string;
  receivedAt: string;
  read: boolean;
}

const messages: MessageRow[] = [
  {
    id: "1",
    name: "Sarah Putri",
    email: "sarah.putri@mail.com",
    subject: "Penawaran kerjasama",
    receivedAt: "22 Jun 2026, 9:12 AM",
    read: false,
  },
  {
    id: "2",
    name: "Budi Santoso",
    email: "budi.santoso@mail.com",
    subject: "Pertanyaan layanan",
    receivedAt: "21 Jun 2026, 4:40 PM",
    read: false,
  },
  {
    id: "3",
    name: "Maria Lestari",
    email: "maria.lestari@mail.com",
    subject: "Permintaan demo produk",
    receivedAt: "21 Jun 2026, 11:05 AM",
    read: true,
  },
  {
    id: "4",
    name: "Andi Wijaya",
    email: "andi.wijaya@mail.com",
    subject: "Lowongan kerja",
    receivedAt: "20 Jun 2026, 2:30 PM",
    read: true,
  },
  {
    id: "5",
    name: "Citra Dewi",
    email: "citra.dewi@mail.com",
    subject: "Feedback website",
    receivedAt: "19 Jun 2026, 8:15 AM",
    read: false,
  },
];

const columns: SimpleColumn<MessageRow>[] = [
  {
    id: "from",
    header: "From",
    cell: (row) => (
      <div className="min-w-0">
        <div className="truncate font-medium text-sm">{row.name}</div>
        <div className="truncate text-muted-foreground text-sm">{row.email}</div>
      </div>
    ),
  },
  { id: "subject", header: "Subject", cell: (row) => <span className="text-sm">{row.subject}</span> },
  {
    id: "receivedAt",
    header: "Received",
    cell: (row) => <span className="text-muted-foreground text-sm">{row.receivedAt}</span>,
  },
  {
    id: "status",
    header: "Status",
    cell: (row) =>
      row.read ? (
        <Badge variant="outline">Read</Badge>
      ) : (
        <Badge className="border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400" variant="outline">
          Unread
        </Badge>
      ),
  },
];

export function RecentMessages() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="leading-none">Recent Messages</CardTitle>
        <CardDescription>Latest submissions from the public contact form.</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <SimpleDataTable columns={columns} rows={messages} getRowId={(row) => row.id} />
      </CardContent>
    </Card>
  );
}
