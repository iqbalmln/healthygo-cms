"use client";

import { type Control, Controller } from "react-hook-form";

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { CtaWhatsappFields } from "../fields/cta-whatsapp-fields";
import { MultiImageField } from "../fields/multi-image-field";
import type { PageEditorFormValues } from "../page-editor-form-schema";

export function TestimonialFields({ control }: { control: Control<PageEditorFormValues> }) {
  return (
    <FieldGroup className="gap-4">
      <Controller
        control={control}
        name="sections.testimonial.title"
        render={({ field }) => (
          <Field className="gap-1.5">
            <FieldLabel>Title</FieldLabel>
            <Input {...field} placeholder="Testimonial title" />
          </Field>
        )}
      />
      <Controller
        control={control}
        name="sections.testimonial.subtitle"
        render={({ field }) => (
          <Field className="gap-1.5">
            <FieldLabel>Subtitle</FieldLabel>
            <Input {...field} placeholder="Testimonial subtitle" />
          </Field>
        )}
      />
      <CtaWhatsappFields control={control} name="sections.testimonial.cta" />
      <MultiImageField control={control} name="sections.testimonial.images" label="Testimonial images" />
    </FieldGroup>
  );
}
