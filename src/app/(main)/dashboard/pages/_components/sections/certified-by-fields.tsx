"use client";

import { type Control, Controller } from "react-hook-form";

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { MultiImageField } from "../fields/multi-image-field";
import type { PageEditorFormValues } from "../page-editor-form-schema";

export function CertifiedByFields({ control }: { control: Control<PageEditorFormValues> }) {
  return (
    <FieldGroup className="gap-4">
      <Controller
        control={control}
        name="sections.certifiedBy.title"
        render={({ field }) => (
          <Field className="gap-1.5">
            <FieldLabel>Title</FieldLabel>
            <Input {...field} placeholder="Certified By title" />
          </Field>
        )}
      />
      <MultiImageField control={control} name="sections.certifiedBy.images" label="Logos / images" />
    </FieldGroup>
  );
}
