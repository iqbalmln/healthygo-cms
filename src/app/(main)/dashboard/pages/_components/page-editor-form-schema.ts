import { z } from "zod";

import { PROMO_CATEGORIES, type PromoCategory, type PromoVariant } from "@/lib/promo-pages";

import { createEmptySections, type PageRow } from "./data";

const ctaSchema = z.object({ text: z.string(), link: z.string() });
const iconTextItemSchema = z.object({ icon: z.string(), text: z.string() });

const sectionsSchema = z.object({
  hero: z.object({
    enabled: z.boolean(),
    title: z.string(),
    subtitle: z.string(),
    advantages: z.array(iconTextItemSchema),
  }),
  testimonial: z.object({
    enabled: z.boolean(),
    title: z.string(),
    subtitle: z.string(),
    cta: ctaSchema,
    images: z.array(z.string()),
  }),
  ourProgram: z.object({ enabled: z.boolean(), images: z.array(z.string()) }),
  rekor: z.object({
    enabled: z.boolean(),
    title: z.string(),
    subtitle: z.string(),
    description: z.string(),
    image: z.string(),
  }),
  programList: z.object({
    enabled: z.boolean(),
    items: z.array(iconTextItemSchema),
    cta: ctaSchema,
    image: z.string(),
  }),
  tableComparison: z.object({ enabled: z.boolean(), title: z.string(), image: z.string(), cta: ctaSchema }),
  certifiedBy: z.object({ enabled: z.boolean(), title: z.string(), images: z.array(z.string()) }),
  promo: z.object({ enabled: z.boolean(), image: z.string(), cta: ctaSchema }),
});

export const pageEditorFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
  category: z.enum(PROMO_CATEGORIES.map((c) => c.value) as [PromoCategory, ...PromoCategory[]]),
  variant: z.enum(["main", "1", "2"] as [PromoVariant, ...PromoVariant[]]),
  status: z.enum(["Published", "Draft"]),
  sections: sectionsSchema,
});

export type PageEditorFormValues = z.infer<typeof pageEditorFormSchema>;

export function pageToFormValues(page?: PageRow): PageEditorFormValues {
  return page
    ? {
        title: page.title,
        category: page.category,
        variant: page.variant,
        status: page.status,
        sections: page.sections,
      }
    : { title: "", category: "home", variant: "main", status: "Draft", sections: createEmptySections() };
}
