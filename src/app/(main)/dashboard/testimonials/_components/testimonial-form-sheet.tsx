"use client";

import * as React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

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
import { Textarea } from "@/components/ui/textarea";

import type { TestimonialRow } from "./data";

const formSchema = z.object({
  clientName: z.string().min(1, { message: "Client name is required." }),
  company: z.string().min(1, { message: "Company is required." }),
  rating: z.number().min(1).max(5),
  quote: z.string().min(1, { message: "Quote is required." }),
  status: z.enum(["Published", "Hidden"]),
});

type FormValues = z.infer<typeof formSchema>;

interface TestimonialFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  testimonial?: TestimonialRow;
  onSubmit: (values: FormValues) => void;
}

export function TestimonialFormSheet({ open, onOpenChange, testimonial, onSubmit }: TestimonialFormSheetProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { clientName: "", company: "", rating: 5, quote: "", status: "Published" },
  });

  React.useEffect(() => {
    if (open) {
      form.reset(
        testimonial
          ? {
              clientName: testimonial.clientName,
              company: testimonial.company,
              rating: testimonial.rating,
              quote: testimonial.quote,
              status: testimonial.status,
            }
          : { clientName: "", company: "", rating: 5, quote: "", status: "Published" },
      );
    }
  }, [open, testimonial, form]);

  function handleSubmit(values: FormValues) {
    onSubmit(values);
    onOpenChange(false);
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>{testimonial ? "Edit Testimonial" : "New Testimonial"}</SheetTitle>
          <SheetDescription>Client reviews displayed on the public site.</SheetDescription>
        </SheetHeader>

        <form
          noValidate
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-1 flex-col gap-4 overflow-y-auto px-4"
        >
          <FieldGroup className="gap-4">
            <Controller
              control={form.control}
              name="clientName"
              render={({ field, fieldState }) => (
                <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="testimonial-client">Client name</FieldLabel>
                  <Input {...field} id="testimonial-client" aria-invalid={fieldState.invalid} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="company"
              render={({ field, fieldState }) => (
                <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="testimonial-company">Company</FieldLabel>
                  <Input {...field} id="testimonial-company" aria-invalid={fieldState.invalid} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="rating"
              render={({ field }) => (
                <Field className="gap-1.5">
                  <FieldLabel htmlFor="testimonial-rating">Rating</FieldLabel>
                  <Select value={`${field.value}`} onValueChange={(value) => field.onChange(Number(value))}>
                    <SelectTrigger id="testimonial-rating" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectOptionGroup>
                        {[5, 4, 3, 2, 1].map((value) => (
                          <SelectItem key={value} value={`${value}`}>
                            {value} star{value > 1 ? "s" : ""}
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
              name="quote"
              render={({ field, fieldState }) => (
                <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="testimonial-quote">Quote</FieldLabel>
                  <Textarea {...field} id="testimonial-quote" rows={4} aria-invalid={fieldState.invalid} />
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
