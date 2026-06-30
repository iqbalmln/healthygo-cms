import type { PromoCategory, PromoVariant } from "@/lib/promo-pages";

export type PageStatus = "Published" | "Draft";

export type CtaWhatsapp = { text: string; link: string };
export type IconTextItem = { icon: string; text: string };
export type TextItem = { text: string };

export type PageSections = {
  hero: { enabled: boolean; title: string; subtitle: string; price: string; advantages: TextItem[] };
  testimonial: { enabled: boolean; title: string; subtitle: string; cta: CtaWhatsapp; images: string[] };
  ourProgram: { enabled: boolean; images: string[] };
  rekor: { enabled: boolean; title: string; subtitle: string; description: string; image: string };
  programList: { enabled: boolean; items: IconTextItem[]; cta: CtaWhatsapp; image: string };
  tableComparison: { enabled: boolean; title: string; image: string; cta: CtaWhatsapp };
  certifiedBy: { enabled: boolean; title: string; images: string[] };
  promo: { enabled: boolean; image: string; cta: CtaWhatsapp };
};

export type PageRow = {
  id: string;
  title: string;
  category: PromoCategory;
  variant: PromoVariant;
  status: PageStatus;
  updatedAt: string;
  sections: PageSections;
};

export function createEmptySections(): PageSections {
  return {
    hero: { enabled: false, title: "", subtitle: "", price: "", advantages: [] },
    testimonial: { enabled: false, title: "", subtitle: "", cta: { text: "", link: "" }, images: [] },
    ourProgram: { enabled: false, images: [] },
    rekor: { enabled: false, title: "", subtitle: "", description: "", image: "" },
    programList: { enabled: false, items: [], cta: { text: "", link: "" }, image: "" },
    tableComparison: { enabled: false, title: "", image: "", cta: { text: "", link: "" } },
    certifiedBy: { enabled: false, title: "", images: [] },
    promo: { enabled: false, image: "", cta: { text: "", link: "" } },
  };
}

export const SECTION_LABELS: Record<keyof PageSections, string> = {
  hero: "Hero",
  testimonial: "Testimonial",
  ourProgram: "Our Program",
  rekor: "Rekor",
  programList: "Program List",
  tableComparison: "Table Comparison",
  certifiedBy: "Certified By",
  promo: "Promo",
};
