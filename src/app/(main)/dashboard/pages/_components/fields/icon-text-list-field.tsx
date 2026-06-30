"use client";

import { X } from "lucide-react";
import { type Control, Controller, type FieldPath, type FieldValues, useFieldArray } from "react-hook-form";

import { UploadDropzone } from "@/components/cms/upload-dropzone";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface IconTextListFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  addLabel?: string;
}

export function IconTextListField<T extends FieldValues>({
  control,
  name,
  label,
  addLabel = "Add item",
}: IconTextListFieldProps<T>) {
  const { fields, append, remove } = useFieldArray({ control, name: name as never });

  return (
    <Field className="gap-2">
      <FieldLabel>{label}</FieldLabel>
      <div className="flex flex-col gap-3">
        {fields.map((item, index) => (
          <div key={item.id} className="flex items-start gap-3 rounded-md border p-3">
            <Controller
              control={control}
              name={`${name}.${index}.icon` as FieldPath<T>}
              render={({ field }) => (
                <div className="w-32 shrink-0">
                  {field.value ? (
                    // biome-ignore lint/performance/noImgElement: preview comes from blob/external URLs not configured in next/image
                    <img src={field.value} alt="Icon" className="mb-2 size-12 rounded-md object-cover" />
                  ) : null}
                  <UploadDropzone
                    accept="image/*"
                    label="Icon"
                    className="p-3 text-xs"
                    onFileSelected={(file) => field.onChange(URL.createObjectURL(file))}
                  />
                </div>
              )}
            />
            <Controller
              control={control}
              name={`${name}.${index}.text` as FieldPath<T>}
              render={({ field }) => <Input {...field} placeholder="Text" className="flex-1" />}
            />
            <Button type="button" variant="ghost" size="icon-sm" onClick={() => remove(index)}>
              <X className="size-4" />
            </Button>
          </div>
        ))}
      </div>
      <Button type="button" variant="outline" size="sm" onClick={() => append({ icon: "", text: "" } as never)}>
        {addLabel}
      </Button>
    </Field>
  );
}
