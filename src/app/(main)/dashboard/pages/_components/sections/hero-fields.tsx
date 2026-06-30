"use client";

import { type Control, Controller } from "react-hook-form";

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { TextListField } from "../fields/text-list-field";
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
      <Controller
        control={control}
        name="sections.hero.price"
        render={({ field }) => (
          <Field className="gap-1.5">
            <FieldLabel>Price</FieldLabel>
            <Input
              {...field}
              inputMode="numeric"
              placeholder="e.g. 46"
              onChange={(e) => field.onChange(e.target.value.replace(/\D/g, ""))}
            />
          </Field>
        )}
      />
      <TextListField control={control} name="sections.hero.advantages" label="Advantages" addLabel="Add advantage" />
    </FieldGroup>
  );
}
