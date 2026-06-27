export const PROMO_CATEGORIES = [
  { value: "home", label: "Home Page" },
  { value: "dk", label: "DK" },
  { value: "fatloss", label: "Fat Loss" },
  { value: "lean-muscle", label: "Lean Muscle" },
  { value: "pregnancy", label: "Pregnancy" },
  { value: "weight-maintenance", label: "Weight Maintenance" },
] as const;

export const PROMO_VARIANTS = [
  { value: "main", label: "Main" },
  { value: "1", label: "Variant 1" },
  { value: "2", label: "Variant 2" },
] as const;

export type PromoCategory = (typeof PROMO_CATEGORIES)[number]["value"];
export type PromoVariant = (typeof PROMO_VARIANTS)[number]["value"];

export function getCategoryLabel(category: PromoCategory) {
  return PROMO_CATEGORIES.find((c) => c.value === category)?.label ?? category;
}

export function getVariantLabel(variant: PromoVariant) {
  return PROMO_VARIANTS.find((v) => v.value === variant)?.label ?? variant;
}

// "home" only ever has the "main" variant — there is no /home/1 or /home/2.
export function getVariantsForCategory(category: PromoCategory) {
  return category === "home" ? PROMO_VARIANTS.filter((v) => v.value === "main") : PROMO_VARIANTS;
}

export function getPromoPagePath(category: PromoCategory, variant: PromoVariant) {
  if (category === "home") return "/";
  return variant === "main" ? `/${category}` : `/${category}/${variant}`;
}

export function getPromoSlotId(category: PromoCategory, variant: PromoVariant) {
  return `${category}-${variant}`;
}

export type PromoPageSlot = {
  id: string;
  category: PromoCategory;
  variant: PromoVariant;
  path: string;
  label: string;
};

export const PROMO_PAGE_SLOTS: PromoPageSlot[] = PROMO_CATEGORIES.flatMap((category) =>
  getVariantsForCategory(category.value).map((variant) => ({
    id: getPromoSlotId(category.value, variant.value),
    category: category.value,
    variant: variant.value,
    path: getPromoPagePath(category.value, variant.value),
    label: category.value === "home" ? category.label : `${category.label} — ${variant.label}`,
  })),
);
