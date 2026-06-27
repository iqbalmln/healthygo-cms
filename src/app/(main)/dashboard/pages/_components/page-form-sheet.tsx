"use client";

import * as React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { RichTextEditor } from "@/components/cms/rich-text-editor";
import { Button } from "@/components/ui/button";
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
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { getVariantsForCategory, PROMO_CATEGORIES, type PromoCategory, type PromoVariant } from "@/lib/promo-pages";

import type { PageRow } from "./data";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
  category: z.enum(PROMO_CATEGORIES.map((c) => c.value) as [PromoCategory, ...PromoCategory[]]),
  variant: z.enum(["main", "1", "2"] as [PromoVariant, ...PromoVariant[]]),
  status: z.enum(["Published", "Draft"]),
  content: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

interface PageFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  page?: PageRow;
  onSubmit: (values: FormValues) => void;
  error?: string;
}

export function PageFormSheet({ open, onOpenChange, page, onSubmit, error }: PageFormSheetProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "", category: "home", variant: "main", status: "Draft", content: "" },
  });

  React.useEffect(() => {
    if (open) {
      form.reset(
        page
          ? {
              title: page.title,
              category: page.category,
              variant: page.variant,
              status: page.status,
              content: page.content,
            }
          : { title: "", category: "home", variant: "main", status: "Draft", content: "" },
      );
    }
  }, [open, page, form]);

  function handleSubmit(values: FormValues) {
    onSubmit(values);
  }

  const category = form.watch("category");
  const availableVariants = getVariantsForCategory(category);

  React.useEffect(() => {
    if (!availableVariants.some((v) => v.value === form.getValues("variant"))) {
      form.setValue("variant", availableVariants[0].value);
    }
  }, [availableVariants, form]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>{page ? "Edit Page" : "New Page"}</SheetTitle>
          <SheetDescription>Pick the promo category and variant this page content belongs to.</SheetDescription>
        </SheetHeader>

        <form
          noValidate
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-1 flex-col gap-4 overflow-y-auto px-4"
        >
          <FieldGroup className="gap-4">
            <Controller
              control={form.control}
              name="title"
              render={({ field, fieldState }) => (
                <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="page-title">Title</FieldLabel>
                  <Input {...field} id="page-title" placeholder="About Us" aria-invalid={fieldState.invalid} />
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
                  <Select value={field.value} onValueChange={field.onChange}>
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
                  <Select value={field.value} onValueChange={field.onChange} disabled={availableVariants.length === 1}>
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

            <Controller
              control={form.control}
              name="content"
              render={({ field }) => (
                <Field className="gap-1.5">
                  <FieldLabel>Content</FieldLabel>
                  <RichTextEditor value={field.value} onChange={field.onChange} placeholder="Write page content..." />
                </Field>
              )}
            />

            {error ? <p className="text-destructive text-sm">{error}</p> : null}
          </FieldGroup>

          <SheetFooter className="px-0">
            <Button type="submit">{page ? "Save changes" : "Create page"}</Button>
            <SheetClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
