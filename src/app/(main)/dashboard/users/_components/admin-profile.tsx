"use client";

import * as React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { getInitials } from "@/lib/utils";

const formSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    avatarUrl: z.string().optional(),
    newPassword: z.string().min(6, { message: "Password must be at least 6 characters." }).or(z.literal("")),
    confirmPassword: z.string().or(z.literal("")),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

const initialAdmin = {
  name: "Iqbal Maulana",
  email: "miqblmaulana@gmail.com",
  avatarUrl: "",
};

export function AdminProfile() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { ...initialAdmin, newPassword: "", confirmPassword: "" },
  });

  const avatarUrl = form.watch("avatarUrl");
  const name = form.watch("name");
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  function handleAvatarSelect(file: File | undefined) {
    if (file) form.setValue("avatarUrl", URL.createObjectURL(file));
  }

  function onSubmit(values: FormValues) {
    toast("Profile updated", {
      description: `Saved changes for ${values.name}.`,
    });
    form.reset({ ...values, newPassword: "", confirmPassword: "" });
  }

  return (
    <Card className="max-w-2xl">
      <CardHeader className="border-b">
        <CardTitle className="text-xl leading-none">Admin Profile</CardTitle>
        <CardDescription>Manage your account information and password.</CardDescription>
      </CardHeader>
      <CardContent>
        <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FieldGroup className="gap-4">
            <Field className="flex-row items-center gap-4">
              <Avatar size="lg" className="size-16">
                <AvatarImage src={avatarUrl} alt={name} />
                <AvatarFallback>{getInitials(name || "Admin")}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1">
                <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                  Change avatar
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(event) => handleAvatarSelect(event.target.files?.[0])}
                />
              </div>
            </Field>

            <Controller
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="admin-name">Name</FieldLabel>
                  <Input {...field} id="admin-name" aria-invalid={fieldState.invalid} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="admin-email">Email</FieldLabel>
                  <Input {...field} id="admin-email" type="email" aria-invalid={fieldState.invalid} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <FieldSeparator>Change password</FieldSeparator>

            <Controller
              control={form.control}
              name="newPassword"
              render={({ field, fieldState }) => (
                <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="admin-new-password">New password</FieldLabel>
                  <Input
                    {...field}
                    id="admin-new-password"
                    type="password"
                    placeholder="••••••••"
                    autoComplete="new-password"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="confirmPassword"
              render={({ field, fieldState }) => (
                <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="admin-confirm-password">Confirm new password</FieldLabel>
                  <Input
                    {...field}
                    id="admin-confirm-password"
                    type="password"
                    placeholder="••••••••"
                    autoComplete="new-password"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>

          <Button type="submit" className="self-start">
            Save changes
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
