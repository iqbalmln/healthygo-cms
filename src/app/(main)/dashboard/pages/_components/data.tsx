import { getPromoPagePath, getPromoSlotId, type PromoCategory, type PromoVariant } from "@/lib/promo-pages";

export type PageStatus = "Published" | "Draft";

export type PageRow = {
  id: string;
  title: string;
  category: PromoCategory;
  variant: PromoVariant;
  status: PageStatus;
  updatedAt: string;
  content: string;
};

function makePage(
  category: PromoCategory,
  variant: PromoVariant,
  title: string,
  status: PageStatus,
  updatedAt: string,
  content: string,
): PageRow {
  return { id: getPromoSlotId(category, variant), category, variant, title, status, updatedAt, content };
}

export const initialPages: PageRow[] = [
  makePage(
    "home",
    "main",
    "Home Page",
    "Published",
    "18 Jun 2026, 10:00 AM",
    "<h2>Welcome</h2><p>Your health journey starts here.</p>",
  ),
  makePage("dk", "main", "DK", "Published", "18 Jun 2026, 10:00 AM", "<h2>DK Program</h2><p>Main landing page.</p>"),
  makePage("dk", "1", "DK - Variant 1", "Draft", "18 Jun 2026, 10:00 AM", ""),
  makePage("dk", "2", "DK - Variant 2", "Draft", "18 Jun 2026, 10:00 AM", ""),
  makePage(
    "fatloss",
    "main",
    "Fat Loss",
    "Published",
    "15 Jun 2026, 3:20 PM",
    "<h2>Fat Loss Program</h2><p>Main landing page.</p>",
  ),
  makePage("fatloss", "1", "Fat Loss - Variant 1", "Draft", "15 Jun 2026, 3:20 PM", ""),
  makePage("fatloss", "2", "Fat Loss - Variant 2", "Draft", "15 Jun 2026, 3:20 PM", ""),
  makePage(
    "lean-muscle",
    "main",
    "Lean Muscle",
    "Published",
    "10 Jun 2026, 9:45 AM",
    "<h2>Lean Muscle Program</h2><p>Main landing page.</p>",
  ),
  makePage("lean-muscle", "1", "Lean Muscle - Variant 1", "Draft", "10 Jun 2026, 9:45 AM", ""),
  makePage("lean-muscle", "2", "Lean Muscle - Variant 2", "Draft", "10 Jun 2026, 9:45 AM", ""),
  makePage(
    "pregnancy",
    "main",
    "Pregnancy",
    "Published",
    "10 Jun 2026, 9:45 AM",
    "<h2>Pregnancy Program</h2><p>Main landing page.</p>",
  ),
  makePage("pregnancy", "1", "Pregnancy - Variant 1", "Draft", "10 Jun 2026, 9:45 AM", ""),
  makePage("pregnancy", "2", "Pregnancy - Variant 2", "Draft", "10 Jun 2026, 9:45 AM", ""),
  makePage(
    "weight-maintenance",
    "main",
    "Weight Maintenance",
    "Published",
    "10 Jun 2026, 9:45 AM",
    "<h2>Weight Maintenance Program</h2><p>Main landing page.</p>",
  ),
  makePage("weight-maintenance", "1", "Weight Maintenance - Variant 1", "Draft", "10 Jun 2026, 9:45 AM", ""),
  makePage("weight-maintenance", "2", "Weight Maintenance - Variant 2", "Draft", "10 Jun 2026, 9:45 AM", ""),
];

export function getPagePath(page: PageRow) {
  return getPromoPagePath(page.category, page.variant);
}
