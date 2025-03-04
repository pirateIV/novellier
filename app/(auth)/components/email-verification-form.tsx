import React from "react";

import { AtSign, Mail } from "lucide-react";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/shared/components/submit-button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type EmailFormData, emailFormSchema } from "../auth/sign-up";
import FormInput from "./form-input";

interface EmailVerficationFormProps {
  onSubmit: (data: EmailFormData) => Promise<void>;
}

const EmailVerficationForm = ({ onSubmit }: EmailVerficationFormProps) => {
  const form = useForm<EmailFormData>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-9 *:w-full"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormInput label="Username" icon={AtSign}>
              <Input
                placeholder="johndoe"
                className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none h-full"
                {...field}
              />
            </FormInput>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormInput label="Email" icon={Mail}>
              <Input
                placeholder="Enter your email address"
                className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none h-full"
                {...field}
              />
            </FormInput>
          )}
        />
        <SubmitButton loading={form.formState.isSubmitting}>
          Verify account
        </SubmitButton>
      </form>
    </Form>
  );
};

export default EmailVerficationForm;
