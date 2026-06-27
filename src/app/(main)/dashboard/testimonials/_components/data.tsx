export type TestimonialStatus = "Published" | "Hidden";

export type TestimonialRow = {
  id: string;
  clientName: string;
  company: string;
  rating: number;
  quote: string;
  status: TestimonialStatus;
};

export const initialTestimonials: TestimonialRow[] = [
  {
    id: "1",
    clientName: "Sarah Putri",
    company: "PT Maju Bersama",
    rating: 5,
    quote: "Pelayanan sangat profesional dan hasil kerja melebihi ekspektasi kami.",
    status: "Published",
  },
  {
    id: "2",
    clientName: "Budi Santoso",
    company: "CV Karya Abadi",
    rating: 4,
    quote: "Tim yang responsif dan komunikatif sepanjang proyek berjalan.",
    status: "Published",
  },
  {
    id: "3",
    clientName: "Maria Lestari",
    company: "Lestari Group",
    rating: 5,
    quote: "Kami sangat puas dengan hasil akhir dan dukungan after-sales.",
    status: "Hidden",
  },
];
