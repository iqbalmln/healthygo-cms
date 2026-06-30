"use client";

import { X } from "lucide-react";
import { type Control, Controller, type FieldPath, type FieldValues, useFieldArray } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface TextListFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  addLabel?: string;
}

export function TextListField<T extends FieldValues>({
  control,
  name,
  label,
  addLabel = "Add item",
}: TextListFieldProps<T>) {
  const { fields, append, remove } = useFieldArray({ control, name: name as never });

  return (
    <Field className="gap-2">
      <FieldLabel>{label}</FieldLabel>
      <div className="flex flex-col gap-3">
        {fields.map((item, index) => (
          <div key={item.id} className="flex items-center gap-3">
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
      <Button type="button" variant="outline" size="sm" onClick={() => append({ text: "" } as never)}>
        {addLabel}
      </Button>
    </Field>
  );
}
