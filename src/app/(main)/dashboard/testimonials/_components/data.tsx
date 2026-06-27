import type { PromoCategory, PromoVariant } from "@/lib/promo-pages";

export type TestimonialStatus = "Published" | "Hidden";

export type TestimonialRow = {
  id: string;
  imageUrl: string;
  category: PromoCategory;
  variant: PromoVariant;
  order: number;
  status: TestimonialStatus;
};

export const initialTestimonials: TestimonialRow[] = [
  {
    id: "1",
    imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=60",
    category: "fatloss",
    variant: "main",
    order: 1,
    status: "Published",
  },
  {
    id: "2",
    imageUrl: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=600&q=60",
    category: "lean-muscle",
    variant: "1",
    order: 2,
    status: "Published",
  },
  {
    id: "3",
    imageUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&q=60",
    category: "pregnancy",
    variant: "main",
    order: 3,
    status: "Hidden",
  },
];
