"use client";

import { type Control, Controller } from "react-hook-form";

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { SingleImageField } from "../fields/single-image-field";
import type { PageEditorFormValues } from "../page-editor-form-schema";

export function RekorFields({ control }: { control: Control<PageEditorFormValues> }) {
  return (
    <FieldGroup className="gap-4">
      <Controller
        control={control}
        name="sections.rekor.title"
        render={({ field }) => (
          <Field className="gap-1.5">
            <FieldLabel>Title</FieldLabel>
            <Input {...field} placeholder="Rekor title" />
          </Field>
        )}
      />
      <Controller
        control={control}
        name="sections.rekor.subtitle"
        render={({ field }) => (
          <Field className="gap-1.5">
            <FieldLabel>Subtitle</FieldLabel>
            <Input {...field} placeholder="Rekor subtitle" />
          </Field>
        )}
      />
      <Controller
        control={control}
        name="sections.rekor.description"
        render={({ field }) => (
          <Field className="gap-1.5">
            <FieldLabel>Description</FieldLabel>
            <Textarea {...field} placeholder="Rekor description" />
          </Field>
        )}
      />
      <SingleImageField control={control} name="sections.rekor.image" label="Image" />
    </FieldGroup>
  );
}
