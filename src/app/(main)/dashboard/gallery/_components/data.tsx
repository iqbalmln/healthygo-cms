export type MediaType = "image" | "video";

export type MediaItem = {
  id: string;
  url: string;
  type: MediaType;
  caption: string;
  uploadedAt: string;
};

export const initialMedia: MediaItem[] = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&q=60",
    type: "image",
    caption: "Office team meeting",
    uploadedAt: "18 Jun 2026",
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=60",
    type: "image",
    caption: "Workspace overview",
    uploadedAt: "15 Jun 2026",
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1556761175-129418cb2dfe?w=600&q=60",
    type: "image",
    caption: "Annual company event",
    uploadedAt: "10 Jun 2026",
  },
];
