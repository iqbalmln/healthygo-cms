"use client";

import { X } from "lucide-react";
import { type Control, Controller, type FieldPath, type FieldValues } from "react-hook-form";

import { UploadDropzone } from "@/components/cms/upload-dropzone";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";

interface MultiImageFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
}

export function MultiImageField<T extends FieldValues>({ control, name, label }: MultiImageFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const images = (field.value as string[]) ?? [];

        function addImage(file: File) {
          field.onChange([...images, URL.createObjectURL(file)]);
        }

        function removeImage(index: number) {
          field.onChange(images.filter((_, i) => i !== index));
        }

        return (
          <Field className="gap-2">
            <FieldLabel>{label}</FieldLabel>
            <div className="flex flex-wrap gap-3">
              {images.map((src, index) => (
                <div key={`${src}-${index}`} className="relative">
                  {/* biome-ignore lint/performance/noImgElement: preview comes from blob/external URLs not configured in next/image */}
                  <img src={src} alt="" className="size-24 rounded-md border object-cover" />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon-sm"
                    className="absolute -top-2 -right-2 size-6 rounded-full"
                    onClick={() => removeImage(index)}
                  >
                    <X className="size-3" />
                  </Button>
                </div>
              ))}
            </div>
            <UploadDropzone accept="image/*" label="Add image" className="max-w-xs p-4" onFileSelected={addImage} />
          </Field>
        );
      }}
    />
  );
}
