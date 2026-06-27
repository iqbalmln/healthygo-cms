"use client";

import * as React from "react";

import { Trash2 } from "lucide-react";

import { UploadDropzone } from "@/components/cms/upload-dropzone";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { initialMedia, type MediaItem } from "./data";

export function Gallery() {
  const [media, setMedia] = React.useState<MediaItem[]>(initialMedia);

  function handleUpload(file: File) {
    const url = URL.createObjectURL(file);
    const item: MediaItem = {
      id: crypto.randomUUID(),
      url,
      type: file.type.startsWith("video") ? "video" : "image",
      caption: file.name,
      uploadedAt: new Date().toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" }),
    };
    setMedia((prev) => [item, ...prev]);
  }

  function handleDelete(id: string) {
    setMedia((prev) => prev.filter((item) => item.id !== id));
  }

  function handleCaptionChange(id: string, caption: string) {
    setMedia((prev) => prev.map((item) => (item.id === id ? { ...item, caption } : item)));
  }

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle className="text-xl leading-none">Gallery</CardTitle>
        <CardDescription className="max-w-sm leading-snug">
          Upload and manage photos & videos used across the public site.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <UploadDropzone onFileSelected={handleUpload} />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {media.map((item) => (
            <div key={item.id} className="overflow-hidden rounded-lg border">
              <div className="relative aspect-video bg-muted">
                {item.type === "video" ? (
                  // biome-ignore lint/a11y/useMediaCaption: no caption track available for admin-uploaded media previews
                  <video src={item.url} className="h-full w-full object-cover" controls />
                ) : (
                  // biome-ignore lint/performance/noImgElement: previews come from blob/external URLs not configured in next/image
                  <img src={item.url} alt={item.caption} className="h-full w-full object-cover" />
                )}
              </div>
              <div className="flex items-center gap-2 p-2">
                <Field className="flex-1 gap-0">
                  <FieldLabel htmlFor={`caption-${item.id}`} className="sr-only">
                    Caption
                  </FieldLabel>
                  <Input
                    id={`caption-${item.id}`}
                    value={item.caption}
                    onChange={(event) => handleCaptionChange(item.id, event.target.value)}
                    className="h-8 text-sm"
                  />
                </Field>
                <button
                  type="button"
                  aria-label={`Delete ${item.caption}`}
                  onClick={() => handleDelete(item.id)}
                  className="flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-destructive"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          ))}

          {media.length === 0 && (
            <p className="col-span-full py-8 text-center text-muted-foreground text-sm">No media uploaded yet.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
