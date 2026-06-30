export const PROMO_CATEGORIES = [
  { value: "home", label: "Home Page" },
  { value: "dk", label: "DK" },
  { value: "fatloss", label: "Fat Loss" },
  { value: "lean-muscle", label: "Lean Muscle" },
  { value: "pregnancy", label: "Pregnancy" },
  { value: "weight-maintenance", label: "Weight Maintenance" },
] as const;

export type PromoCategory = (typeof PROMO_CATEGORIES)[number]["value"];

// "main" is a reserved sentinel meaning "no slug suffix" — the bare category page
// (e.g. /fatloss). Any other value is a free-form slug, e.g. /fatloss/promo-juni.
export const MAIN_VARIANT = "main";
export type PromoVariant = string;

export function getCategoryLabel(category: PromoCategory) {
  return PROMO_CATEGORIES.find((c) => c.value === category)?.label ?? category;
}

export function getVariantLabel(variant: PromoVariant) {
  return variant === MAIN_VARIANT ? "Main" : variant;
}

export function getPromoPagePath(category: PromoCategory, variant: PromoVariant) {
  if (category === "home") return "/";
  return variant === MAIN_VARIANT ? `/${category}` : `/${category}/${variant}`;
}

export function getPromoSlotId(category: PromoCategory, variant: PromoVariant) {
  return `${category}-${variant}`;
}
