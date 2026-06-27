"use client";

import * as React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { UploadDropzone } from "@/components/cms/upload-dropzone";
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
import { getPromoSlotId, PROMO_PAGE_SLOTS } from "@/lib/promo-pages";

import type { TestimonialRow } from "./data";

const formSchema = z.object({
  imageUrl: z.string().min(1, { message: "Testimonial image is required." }),
  pageId: z.string().min(1, { message: "Page is required." }),
  order: z.number().min(1),
  status: z.enum(["Published", "Hidden"]),
});

type FormValues = z.infer<typeof formSchema>;

interface TestimonialFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  testimonial?: TestimonialRow;
  onSubmit: (
    values: Omit<FormValues, "pageId"> & { category: TestimonialRow["category"]; variant: TestimonialRow["variant"] },
  ) => void;
}

export function TestimonialFormSheet({ open, onOpenChange, testimonial, onSubmit }: TestimonialFormSheetProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { imageUrl: "", pageId: "", order: 1, status: "Published" },
  });

  React.useEffect(() => {
    if (open) {
      form.reset(
        testimonial
          ? {
              imageUrl: testimonial.imageUrl,
              pageId: getPromoSlotId(testimonial.category, testimonial.variant),
              order: testimonial.order,
              status: testimonial.status,
            }
          : { imageUrl: "", pageId: "", order: 1, status: "Published" },
      );
    }
  }, [open, testimonial, form]);

  function handleSubmit(values: FormValues) {
    const slot = PROMO_PAGE_SLOTS.find((s) => s.id === values.pageId);
    if (!slot) return;
    const { pageId: _pageId, ...rest } = values;
    onSubmit({ ...rest, category: slot.category, variant: slot.variant });
    onOpenChange(false);
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>{testimonial ? "Edit Testimonial" : "New Testimonial"}</SheetTitle>
          <SheetDescription>
            Upload a testimonial image (screenshot of the review, rating, and client info).
          </SheetDescription>
        </SheetHeader>

        <form
          noValidate
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-1 flex-col gap-4 overflow-y-auto px-4"
        >
          <FieldGroup className="gap-4">
            <Controller
              control={form.control}
              name="imageUrl"
              render={({ field, fieldState }) => (
                <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                  <FieldLabel>Testimonial image</FieldLabel>
                  {field.value ? (
                    // biome-ignore lint/performance/noImgElement: preview comes from blob/external URLs not configured in next/image
                    <img src={field.value} alt="Testimonial" className="w-full rounded-md object-cover" />
                  ) : null}
                  <UploadDropzone
                    accept="image/*"
                    label={field.value ? "Click to replace image" : "Click to upload or drag and drop"}
                    onFileSelected={(file) => field.onChange(URL.createObjectURL(file))}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="pageId"
              render={({ field, fieldState }) => (
                <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="testimonial-page">Page</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="testimonial-page" className="w-full" aria-invalid={fieldState.invalid}>
                      <SelectValue placeholder="Select a page" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectOptionGroup>
                        {PROMO_PAGE_SLOTS.map((slot) => (
                          <SelectItem key={slot.id} value={slot.id}>
                            {slot.label}
                          </SelectItem>
                        ))}
                      </SelectOptionGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="order"
              render={({ field, fieldState }) => (
                <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="testimonial-order">Order</FieldLabel>
                  <Input
                    {...field}
                    id="testimonial-order"
                    type="number"
                    min={1}
                    onChange={(event) => field.onChange(Number(event.target.value))}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="status"
              render={({ field }) => (
                <Field className="gap-1.5">
                  <FieldLabel htmlFor="testimonial-status">Status</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="testimonial-status" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectOptionGroup>
                        <SelectItem value="Published">Published</SelectItem>
                        <SelectItem value="Hidden">Hidden</SelectItem>
                      </SelectOptionGroup>
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />
          </FieldGroup>

          <SheetFooter className="px-0">
            <Button type="submit">{testimonial ? "Save changes" : "Add testimonial"}</Button>
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
