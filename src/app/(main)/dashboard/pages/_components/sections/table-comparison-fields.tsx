"use client";

import { type Control, Controller } from "react-hook-form";

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { CtaWhatsappFields } from "../fields/cta-whatsapp-fields";
import { SingleImageField } from "../fields/single-image-field";
import type { PageEditorFormValues } from "../page-editor-form-schema";

export function TableComparisonFields({ control }: { control: Control<PageEditorFormValues> }) {
  return (
    <FieldGroup className="gap-4">
      <Controller
        control={control}
        name="sections.tableComparison.title"
        render={({ field }) => (
          <Field className="gap-1.5">
            <FieldLabel>Title</FieldLabel>
            <Input {...field} placeholder="Table comparison title" />
          </Field>
        )}
      />
      <SingleImageField control={control} name="sections.tableComparison.image" label="Image" />
      <CtaWhatsappFields control={control} name="sections.tableComparison.cta" />
    </FieldGroup>
  );
}
