export type PageStatus = "Published" | "Draft";

export type PageRow = {
  id: string;
  title: string;
  slug: string;
  status: PageStatus;
  updatedAt: string;
  content: string;
};

export const initialPages: PageRow[] = [
  {
    id: "about-us",
    title: "About Us",
    slug: "about-us",
    status: "Published",
    updatedAt: "18 Jun 2026, 10:00 AM",
    content: "<h2>About Us</h2><p>We are a company dedicated to building great products.</p>",
  },
  {
    id: "visi-misi",
    title: "Visi & Misi",
    slug: "visi-misi",
    status: "Published",
    updatedAt: "15 Jun 2026, 3:20 PM",
    content:
      "<h2>Visi</h2><p>Menjadi perusahaan terdepan di bidangnya.</p><h2>Misi</h2><ul><li>Inovasi berkelanjutan</li><li>Pelayanan terbaik</li></ul>",
  },
  {
    id: "contact",
    title: "Contact",
    slug: "contact",
    status: "Draft",
    updatedAt: "10 Jun 2026, 9:45 AM",
    content: "<p>Hubungi kami melalui formulir di bawah ini.</p>",
  },
];
