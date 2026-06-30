"use client";

import { type Control, Controller, type FieldPath, type FieldValues } from "react-hook-form";

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import type { CtaWhatsapp } from "../data";

interface CtaWhatsappFieldsProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
}

export function CtaWhatsappFields<T extends FieldValues>({ control, name }: CtaWhatsappFieldsProps<T>) {
  return (
    <FieldGroup className="gap-3">
      <Controller
        control={control}
        name={`${name}.text` as FieldPath<T>}
        render={({ field }) => (
          <Field className="gap-1.5">
            <FieldLabel>WhatsApp CTA text</FieldLabel>
            <Input
              value={(field.value as CtaWhatsapp["text"]) ?? ""}
              onChange={field.onChange}
              placeholder="Chat via WhatsApp"
            />
          </Field>
        )}
      />
      <Controller
        control={control}
        name={`${name}.link` as FieldPath<T>}
        render={({ field }) => (
          <Field className="gap-1.5">
            <FieldLabel>WhatsApp link</FieldLabel>
            <Input
              value={(field.value as CtaWhatsapp["link"]) ?? ""}
              onChange={field.onChange}
              placeholder="https://wa.me/62..."
            />
          </Field>
        )}
      />
    </FieldGroup>
  );
}
