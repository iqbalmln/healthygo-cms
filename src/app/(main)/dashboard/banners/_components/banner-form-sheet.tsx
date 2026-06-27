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
import { Switch } from "@/components/ui/switch";
import { getPromoSlotId, PROMO_PAGE_SLOTS } from "@/lib/promo-pages";

import type { BannerRow } from "./data";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
  imageUrl: z.string().min(1, { message: "Banner image is required." }),
  pageId: z.string().min(1, { message: "Page is required." }),
  order: z.number().min(1),
  active: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

interface BannerFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  banner?: BannerRow;
  onSubmit: (
    values: Omit<FormValues, "pageId"> & {
      category: BannerRow["category"];
      variant: BannerRow["variant"];
      linkUrl: string;
    },
  ) => void;
}

export function BannerFormSheet({ open, onOpenChange, banner, onSubmit }: BannerFormSheetProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "", imageUrl: "", pageId: "", order: 1, active: true },
  });

  React.useEffect(() => {
    if (open) {
      form.reset(
        banner
          ? {
              title: banner.title,
              imageUrl: banner.imageUrl,
              pageId: getPromoSlotId(banner.category, banner.variant),
              order: banner.order,
              active: banner.active,
            }
          : { title: "", imageUrl: "", pageId: "", order: 1, active: true },
      );
    }
  }, [open, banner, form]);

  function handleSubmit(values: FormValues) {
    const slot = PROMO_PAGE_SLOTS.find((s) => s.id === values.pageId);
    if (!slot) return;
    const { pageId: _pageId, ...rest } = values;
    onSubmit({ ...rest, category: slot.category, variant: slot.variant, linkUrl: slot.path });
    onOpenChange(false);
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>{banner ? "Edit Banner" : "New Banner"}</SheetTitle>
          <SheetDescription>Hero slider banners shown on the homepage.</SheetDescription>
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
                  <FieldLabel>Banner image</FieldLabel>
                  {field.value ? (
                    // biome-ignore lint/performance/noImgElement: preview comes from blob/external URLs not configured in next/image
                    <img
                      src={field.value}
                      alt="Banner preview"
                      className="aspect-video w-full rounded-md object-cover"
                    />
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
              name="title"
              render={({ field, fieldState }) => (
                <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="banner-title">Title</FieldLabel>
                  <Input {...field} id="banner-title" aria-invalid={fieldState.invalid} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="pageId"
              render={({ field, fieldState }) => (
                <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="banner-page">Page</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="banner-page" className="w-full" aria-invalid={fieldState.invalid}>
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
                  <FieldLabel htmlFor="banner-order">Order</FieldLabel>
                  <Input
                    {...field}
                    id="banner-order"
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
              name="active"
              render={({ field }) => (
                <Field className="flex-row items-center justify-between gap-1.5">
                  <FieldLabel htmlFor="banner-active">Active</FieldLabel>
                  <Switch id="banner-active" checked={field.value} onCheckedChange={field.onChange} />
                </Field>
              )}
            />
          </FieldGroup>

          <SheetFooter className="px-0">
            <Button type="submit">{banner ? "Save changes" : "Create banner"}</Button>
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
