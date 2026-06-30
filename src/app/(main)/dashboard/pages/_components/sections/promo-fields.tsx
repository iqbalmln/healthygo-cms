"use client";

import type { Control } from "react-hook-form";

import { FieldGroup } from "@/components/ui/field";

import { CtaWhatsappFields } from "../fields/cta-whatsapp-fields";
import { SingleImageField } from "../fields/single-image-field";
import type { PageEditorFormValues } from "../page-editor-form-schema";

export function PromoFields({ control }: { control: Control<PageEditorFormValues> }) {
  return (
    <FieldGroup className="gap-4">
      <SingleImageField control={control} name="sections.promo.image" label="Image" />
      <CtaWhatsappFields control={control} name="sections.promo.cta" />
    </FieldGroup>
  );
}
