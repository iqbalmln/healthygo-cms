"use client";

import { type Control, Controller } from "react-hook-form";

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { IconTextListField } from "../fields/icon-text-list-field";
import type { PageEditorFormValues } from "../page-editor-form-schema";

export function HeroFields({ control }: { control: Control<PageEditorFormValues> }) {
  return (
    <FieldGroup className="gap-4">
      <Controller
        control={control}
        name="sections.hero.title"
        render={({ field }) => (
          <Field className="gap-1.5">
            <FieldLabel>Title</FieldLabel>
            <Input {...field} placeholder="Hero title" />
          </Field>
        )}
      />
      <Controller
        control={control}
        name="sections.hero.subtitle"
        render={({ field }) => (
          <Field className="gap-1.5">
            <FieldLabel>Subtitle</FieldLabel>
            <Input {...field} placeholder="Hero subtitle" />
          </Field>
        )}
      />
      <IconTextListField
        control={control}
        name="sections.hero.advantages"
        label="Advantages"
        addLabel="Add advantage"
      />
    </FieldGroup>
  );
}
