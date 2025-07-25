"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "../components/SubmitButton";
import { useActionState } from "react";
import { onboardUser } from "../actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { onboardingSchema } from "../utils/zodSchemas";

export default function OnboardingPage() {
  const [lastResult, action] = useActionState(onboardUser, undefined);
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: onboardingSchema,
      });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <div className="flex items-center justify-center min-h-screen w-screen">
      <Card className="px-4 max-w-sm mx-auto">
        <CardTitle className="text-xl">You are almost done!</CardTitle>
        <CardDescription>
          Enter your infomation to create an account
        </CardDescription>
        <CardContent>
          <form
            className="grid gap-4"
            action={action}
            id={form.id}
            onSubmit={form.onSubmit}
            noValidate
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label>Name</Label>
                <Input
                  name={fields.name.name}
                  key={fields.name.key}
                  defaultValue={fields.name.value}
                  placeholder="John"
                />
                <p className="text-red-500 text-sm">{fields.name.errors}</p>
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Address</Label>
              <Input
                name={fields.address.name}
                key={fields.address.name}
                defaultValue={fields.address.value}
                placeholder="Chad Street 123"
              />
              <p className="text-red-500 text-sm">{fields.address.errors}</p>
            </div>
            <SubmitButton title="Finish Onboarding" />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
