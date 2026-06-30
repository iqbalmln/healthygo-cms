"use client";

import * as React from "react";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { type Control, Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup as SelectOptionGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { getPromoSlotId, getVariantsForCategory, PROMO_CATEGORIES } from "@/lib/promo-pages";

import { type PageRow, type PageSections, SECTION_LABELS } from "./data";
import { type PageEditorFormValues, pageEditorFormSchema, pageToFormValues } from "./page-editor-form-schema";
import { usePagesStore } from "./pages-store";
import { CertifiedByFields } from "./sections/certified-by-fields";
import { HeroFields } from "./sections/hero-fields";
import { OurProgramFields } from "./sections/our-program-fields";
import { ProgramListFields } from "./sections/program-list-fields";
import { PromoFields } from "./sections/promo-fields";
import { RekorFields } from "./sections/rekor-fields";
import { TableComparisonFields } from "./sections/table-comparison-fields";
import { TestimonialFields } from "./sections/testimonial-fields";

const SECTION_FIELDS: Record<keyof PageSections, React.ComponentType<{ control: Control<PageEditorFormValues> }>> = {
  hero: HeroFields,
  testimonial: TestimonialFields,
  ourProgram: OurProgramFields,
  rekor: RekorFields,
  programList: ProgramListFields,
  tableComparison: TableComparisonFields,
  certifiedBy: CertifiedByFields,
  promo: PromoFields,
};

interface PageEditorProps {
  mode: "create" | "edit";
  page?: PageRow;
}

export function PageEditor({ mode, page }: PageEditorProps) {
  const router = useRouter();
  const pages = usePagesStore((state) => state.pages);
  const addPage = usePagesStore((state) => state.addPage);
  const updatePage = usePagesStore((state) => state.updatePage);
  const [slotError, setSlotError] = React.useState<string | undefined>(undefined);

  const form = useForm<PageEditorFormValues>({
    resolver: zodResolver(pageEditorFormSchema),
    defaultValues: pageToFormValues(page),
  });

  const category = form.watch("category");
  const availableVariants = getVariantsForCategory(category);

  React.useEffect(() => {
    if (mode === "create" && !availableVariants.some((v) => v.value === form.getValues("variant"))) {
      form.setValue("variant", availableVariants[0].value);
    }
  }, [availableVariants, form, mode]);

  function handleSubmit(values: PageEditorFormValues) {
    const id = getPromoSlotId(values.category, values.variant);

    if (mode === "create") {
      const conflict = pages.some((p) => p.id === id);
      if (conflict) {
        setSlotError("A page for this category and variant already exists.");
        return;
      }
      setSlotError(undefined);
      addPage({ id, updatedAt: new Date().toLocaleString("en-US"), ...values });
      toast.success("Page created");
      router.push(`/dashboard/pages/${id}`);
      return;
    }

    if (page) {
      updatePage(page.id, values);
      toast.success("Page saved");
    }
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-6">
      <Card>
        <CardHeader className="border-b">
          <CardTitle className="text-lg leading-none">Page details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <Controller
            control={form.control}
            name="title"
            render={({ field, fieldState }) => (
              <Field className="gap-1.5 sm:col-span-2" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="page-title">Title</FieldLabel>
                <Input {...field} id="page-title" placeholder="Fat Loss" aria-invalid={fieldState.invalid} />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="category"
            render={({ field }) => (
              <Field className="gap-1.5">
                <FieldLabel htmlFor="page-category">Category</FieldLabel>
                <Select value={field.value} onValueChange={field.onChange} disabled={mode === "edit"}>
                  <SelectTrigger id="page-category" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectOptionGroup>
                      {PROMO_CATEGORIES.map((c) => (
                        <SelectItem key={c.value} value={c.value}>
                          {c.label}
                        </SelectItem>
                      ))}
                    </SelectOptionGroup>
                  </SelectContent>
                </Select>
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="variant"
            render={({ field }) => (
              <Field className="gap-1.5">
                <FieldLabel htmlFor="page-variant">Variant</FieldLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={mode === "edit" || availableVariants.length === 1}
                >
                  <SelectTrigger id="page-variant" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectOptionGroup>
                      {availableVariants.map((v) => (
                        <SelectItem key={v.value} value={v.value}>
                          {v.label}
                        </SelectItem>
                      ))}
                    </SelectOptionGroup>
                  </SelectContent>
                </Select>
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="status"
            render={({ field }) => (
              <Field className="gap-1.5">
                <FieldLabel htmlFor="page-status">Status</FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="page-status" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectOptionGroup>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Published">Published</SelectItem>
                    </SelectOptionGroup>
                  </SelectContent>
                </Select>
              </Field>
            )}
          />

          {slotError ? <p className="text-destructive text-sm sm:col-span-2">{slotError}</p> : null}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="border-b">
          <CardTitle className="text-lg leading-none">Sections</CardTitle>
        </CardHeader>
        <CardContent className="px-4">
          <Accordion type="multiple">
            {(Object.keys(SECTION_LABELS) as (keyof PageSections)[]).map((sectionKey) => {
              const SectionFields = SECTION_FIELDS[sectionKey];
              return (
                <AccordionItem key={sectionKey} value={sectionKey}>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <AccordionTrigger>{SECTION_LABELS[sectionKey]}</AccordionTrigger>
                    </div>
                    <Controller
                      control={form.control}
                      name={`sections.${sectionKey}.enabled`}
                      render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />}
                    />
                  </div>
                  <AccordionContent>
                    <FieldGroup className="gap-4 px-1">
                      <SectionFields control={form.control} />
                    </FieldGroup>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => router.push("/dashboard/pages")}>
          Cancel
        </Button>
        <Button type="submit">{mode === "create" ? "Create page" : "Save changes"}</Button>
      </div>
    </form>
  );
}
