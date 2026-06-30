"use client";

import { type Control, Controller, type FieldPath, type FieldValues } from "react-hook-form";

import { UploadDropzone } from "@/components/cms/upload-dropzone";
import { Field, FieldLabel } from "@/components/ui/field";

interface SingleImageFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
}

export function SingleImageField<T extends FieldValues>({ control, name, label }: SingleImageFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Field className="gap-1.5">
          <FieldLabel>{label}</FieldLabel>
          {field.value ? (
            // biome-ignore lint/performance/noImgElement: preview comes from blob/external URLs not configured in next/image
            <img src={field.value as string} alt="" className="aspect-video w-full max-w-sm rounded-md object-cover" />
          ) : null}
          <UploadDropzone
            accept="image/*"
            label={field.value ? "Click to replace image" : "Click to upload or drag and drop"}
            onFileSelected={(file) => field.onChange(URL.createObjectURL(file))}
          />
        </Field>
      )}
    />
  );
}
