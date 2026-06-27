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

import type { PageRow } from "./data";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
  slug: z
    .string()
    .min(1, { message: "Slug is required." })
    .regex(/^[a-z0-9-]+$/, { message: "Slug may only contain lowercase letters, numbers, and dashes." }),
  status: z.enum(["Published", "Draft"]),
  content: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

interface PageFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  page?: PageRow;
  onSubmit: (values: FormValues) => void;
}

export function PageFormSheet({ open, onOpenChange, page, onSubmit }: PageFormSheetProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "", slug: "", status: "Draft", content: "" },
  });

  React.useEffect(() => {
    if (open) {
      form.reset(
        page
          ? { title: page.title, slug: page.slug, status: page.status, content: page.content }
          : { title: "", slug: "", status: "Draft", content: "" },
      );
    }
  }, [open, page, form]);

  function handleSubmit(values: FormValues) {
    onSubmit(values);
    onOpenChange(false);
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>{page ? "Edit Page" : "New Page"}</SheetTitle>
          <SheetDescription>Static page content for the public company profile site.</SheetDescription>
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
              name="slug"
              render={({ field, fieldState }) => (
                <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="page-slug">Slug</FieldLabel>
                  <Input {...field} id="page-slug" placeholder="about-us" aria-invalid={fieldState.invalid} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
