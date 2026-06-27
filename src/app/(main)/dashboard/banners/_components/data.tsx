import { getPromoPagePath, type PromoCategory, type PromoVariant } from "@/lib/promo-pages";

export type BannerRow = {
  id: string;
  title: string;
  imageUrl: string;
  category: PromoCategory;
  variant: PromoVariant;
  linkUrl: string;
  order: number;
  active: boolean;
};

export const initialBanners: BannerRow[] = [
  {
    id: "1",
    title: "New Product Launch",
    imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=60",
    category: "fatloss",
    variant: "main",
    linkUrl: getPromoPagePath("fatloss", "main"),
    order: 1,
    active: true,
  },
  {
    id: "2",
    title: "Company Anniversary",
    imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=60",
    category: "home",
    variant: "main",
    linkUrl: getPromoPagePath("home", "main"),
    order: 2,
    active: true,
  },
  {
    id: "3",
    title: "Year End Promo",
    imageUrl: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=800&q=60",
    category: "weight-maintenance",
    variant: "1",
    linkUrl: getPromoPagePath("weight-maintenance", "1"),
    order: 3,
    active: false,
  },
];
