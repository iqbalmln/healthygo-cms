export type BannerRow = {
  id: string;
  title: string;
  imageUrl: string;
  linkUrl: string;
  order: number;
  active: boolean;
};

export const initialBanners: BannerRow[] = [
  {
    id: "1",
    title: "New Product Launch",
    imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=60",
    linkUrl: "/products/new",
    order: 1,
    active: true,
  },
  {
    id: "2",
    title: "Company Anniversary",
    imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=60",
    linkUrl: "/about-us",
    order: 2,
    active: true,
  },
  {
    id: "3",
    title: "Year End Promo",
    imageUrl: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=800&q=60",
    linkUrl: "/promo",
    order: 3,
    active: false,
  },
];
