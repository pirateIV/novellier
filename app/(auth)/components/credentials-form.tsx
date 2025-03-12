import type React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Lock } from "lucide-react";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SubmitButton from "@/shared/components/submit-button";
import { CredentialsFormData, credentialsFormSchema } from "../auth/sign-up";
import FormInput from "./form-input";

interface CredentialsFormProps {
  onSubmit: (data: CredentialsFormData) => Promise<void>;
  onBack: () => void;
}

export const CredentialsForm: React.FC<CredentialsFormProps> = ({
  onSubmit,
  onBack,
}) => {
  const form = useForm<CredentialsFormData>({
    resolver: zodResolver(credentialsFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-9 *:w-full"
      >
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
            <FormInput label="First Name" icon={User}>
                <Input
                  placeholder="John"
                  className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none h-full custom"
                  {...field}
                />
              </FormInput>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormInput label="Last Name" icon={User}>
                <Input
                  placeholder="Doe"
                  className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none h-full custom"
                  {...field}
                />
              </FormInput>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormInput label="Password" icon={Lock}>
              <Input
                type="password"
                className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none h-full custom"
                placeholder="••••••••"
                {...field}
              />
            </FormInput>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormInput label="Confirm Password" icon={Lock}>
              <Input
                type="password"
                className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none h-full custom"
                placeholder="••••••••"
                {...field}
              />
            </FormInput>
          )}
        />

        <div className="flex gap-4">
          <Button type="button" onClick={onBack} variant="outline">
            Back
          </Button>
          <SubmitButton
            loading={form.formState.isSubmitting}
            className="flex-1"
          >
            Create Account
          </SubmitButton>
        </div>
      </form>
    </Form>
  );
};

export default CredentialsForm;
