"use client";
import React from "react";

import { Lock, Mail } from "lucide-react";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/shared/components/submit-button";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../../components/form-input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { apiClient } from "@/lib/axios";
import { toast } from "sonner";
const signInFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type SignInFormData = z.infer<typeof signInFormSchema>;

const SignIn = () => {
  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      // username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (credentials: SignInFormData) => {
    try {
      const response = await apiClient.post("/signin", credentials);

      console.log(response)
       
    } catch (error: any) {
      console.log(error);
      toast("Failed to Sign in", {
        description: error.response.data.error,
        duration: 5000,
      });
    }
    // await signIn(credentials)
    //   .then(async (data) => {
    //     console.log(data);
    //   })
    //   .catch((e) => {
    //     toast("Failed to Sign in", {
    //       description: e,
    //       duration: 5000,
    //     });
    //   });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-9 *:w-full"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormInput label="Email" icon={Mail}>
              <Input
                type="email"
                placeholder="Enter your email address"
                className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none h-full"
                {...field}
              />
            </FormInput>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormInput label="Password" icon={Lock}>
              <Input
                type="password"
                placeholder="••••••••••••"
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

export default SignIn;
