"use client";

import * as React from "react";

import { UploadCloud } from "lucide-react";

import { cn } from "@/lib/utils";

interface UploadDropzoneProps {
  accept?: string;
  onFileSelected: (file: File) => void;
  className?: string;
  label?: string;
}

export function UploadDropzone({ accept = "image/*,video/*", onFileSelected, className, label }: UploadDropzoneProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);

  const acceptsVideo = accept.includes("video");
  const acceptsImage = accept.includes("image");
  const hint = acceptsImage && acceptsVideo ? "Images or videos" : acceptsVideo ? "Videos only" : "Images only";

  function handleFiles(files: FileList | null) {
    const file = files?.[0];
    if (file) onFileSelected(file);
  }

  return (
    <button
      type="button"
      onClick={() => inputRef.current?.click()}
      onDragOver={(event) => {
        event.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(event) => {
        event.preventDefault();
        setIsDragging(false);
        handleFiles(event.dataTransfer.files);
      }}
      className={cn(
        "flex w-full flex-col items-center justify-center gap-2 rounded-md border border-dashed p-8 text-center transition-colors",
        isDragging ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50",
        className,
      )}
    >
      <UploadCloud className="size-6 text-muted-foreground" />
      <p className="text-foreground text-sm">{label ?? "Click to upload or drag and drop"}</p>
      <p className="text-muted-foreground text-xs">{hint}</p>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(event) => handleFiles(event.target.files)}
      />
    </button>
  );
}
