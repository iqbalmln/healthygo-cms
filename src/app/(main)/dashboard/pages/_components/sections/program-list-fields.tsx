"use client";

import type { Control } from "react-hook-form";

import { FieldGroup } from "@/components/ui/field";

import { CtaWhatsappFields } from "../fields/cta-whatsapp-fields";
import { IconTextListField } from "../fields/icon-text-list-field";
import { SingleImageField } from "../fields/single-image-field";
import type { PageEditorFormValues } from "../page-editor-form-schema";

export function ProgramListFields({ control }: { control: Control<PageEditorFormValues> }) {
  return (
    <FieldGroup className="gap-4">
      <IconTextListField control={control} name="sections.programList.items" label="Programs" addLabel="Add program" />
      <CtaWhatsappFields control={control} name="sections.programList.cta" />
      <SingleImageField control={control} name="sections.programList.image" label="Image" />
    </FieldGroup>
  );
}
