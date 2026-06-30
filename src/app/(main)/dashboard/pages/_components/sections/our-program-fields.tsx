"use client";

import type { Control } from "react-hook-form";

import { FieldGroup } from "@/components/ui/field";

import { MultiImageField } from "../fields/multi-image-field";
import type { PageEditorFormValues } from "../page-editor-form-schema";

export function OurProgramFields({ control }: { control: Control<PageEditorFormValues> }) {
  return (
    <FieldGroup className="gap-4">
      <MultiImageField control={control} name="sections.ourProgram.images" label="Program images" />
    </FieldGroup>
  );
}
