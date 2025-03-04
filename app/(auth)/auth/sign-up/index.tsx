"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

import { apiClient } from "@/lib/axios";
import EmailVerficationForm from "../../components/email-verification-form";
import CredentialsForm from "../../components/credentials-form";
import Quotes from "@/app/shared/components/quotes";

export const emailFormSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 character(s)")
    .max(20, "Username must be at least 20 character(s)"),
  email: z.string().email("Invalid email address"),
});

export const credentialsFormSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type EmailFormData = z.infer<typeof emailFormSchema>;
export type CredentialsFormData = z.infer<typeof credentialsFormSchema>;

const CreateAccount = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [emailData, setEmailData] = useState<EmailFormData | null>(null);

  const router = useRouter();
  const emailForm = useForm<EmailFormData>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  });

  const credentialsForm = useForm<CredentialsFormData>({
    resolver: zodResolver(credentialsFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleEmailVerification = async (data: EmailFormData) => {
    try {
      const response = await apiClient.post("/validate-email", data);

      if (response.data.error) {
        emailForm.setError("username", { message: response.data.error });
        emailForm.setError("email", { message: response.data.error });
        return;
      }
      setEmailData(data);
      setIsVerified(true);
      localStorage.setItem("user", JSON.stringify(data));
    } catch (error: any) {
      toast("Verification failed", {
        description: error.response.data.error,
        duration: 5000,
      });
    }
  };

  const handleCredentialsVerification = async (data: CredentialsFormData) => {
    try {
      if (!emailData) {
        setIsVerified(false);
        return;
      }

      await apiClient.post("/create-account", {
        ...emailData,
        ...data,
      });

      router.push("/auth/sign-in");
    } catch (error) {
      toast("Verification failed", {
        description: "Something went wrong. Please try again later.",
        duration: 5000,
      });
    }
  };

  return (
    <>
      {isVerified ? (
        <CredentialsForm
          onSubmit={handleCredentialsVerification}
          onBack={() => setIsVerified(false)}
        />
      ) : (
        <EmailVerficationForm onSubmit={handleEmailVerification} />
      )}
    </>
  );
};

export default CreateAccount;
