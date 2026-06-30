import { create } from "zustand";

import { getPromoSlotId } from "@/lib/promo-pages";

import { createEmptySections, type PageRow } from "./data";

type PagesState = {
  pages: PageRow[];
  addPage: (page: PageRow) => void;
  updatePage: (id: string, patch: Partial<Omit<PageRow, "id">>) => void;
  removePage: (id: string) => void;
  getPage: (id: string) => PageRow | undefined;
};

function makeSeedPage(
  category: PageRow["category"],
  variant: PageRow["variant"],
  title: string,
  status: PageRow["status"],
): PageRow {
  return {
    id: getPromoSlotId(category, variant),
    title,
    category,
    variant,
    status,
    updatedAt: "18 Jun 2026, 10:00 AM",
    sections: createEmptySections(),
  };
}

export const usePagesStore = create<PagesState>((set, get) => ({
  pages: [
    makeSeedPage("home", "main", "Home Page", "Published"),
    makeSeedPage("fatloss", "main", "Fat Loss", "Published"),
    makeSeedPage("fatloss", "1", "Fat Loss - Variant 1", "Draft"),
  ],
  addPage: (page) => set((state) => ({ pages: [...state.pages, page] })),
  updatePage: (id, patch) =>
    set((state) => ({
      pages: state.pages.map((page) =>
        page.id === id ? { ...page, ...patch, updatedAt: new Date().toLocaleString("en-US") } : page,
      ),
    })),
  removePage: (id) => set((state) => ({ pages: state.pages.filter((page) => page.id !== id) })),
  getPage: (id) => get().pages.find((page) => page.id === id),
}));
