import React from "react";

import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LucideIcon } from "lucide-react";

interface FormInputProps {
  label: string;
  icon: LucideIcon;
  children: React.ReactNode;
}

const FormInput = ({ icon: Icon, label, children }: FormInputProps) => {
  return (
    <FormItem className="relative">
      <FormLabel>
        {label} *
      </FormLabel>
      <FormControl>
        <div className="group flex rounded-md overflow-hidden border focus-within:ring-2 focus-within:ring-zinc-900 dark:focus-within:ring-zinc-100">
          <div className="p-3 flex items-center justify-center bg-zinc-200  dark:bg-zinc-800 h-full group-focus-within:text-white dark:group-focus-within:text-zinc-950 group-focus-within:bg-zinc-900 dark:group-focus-within:bg-zinc-100">
            <Icon className="size-4" />
          </div>
          {children}
        </div>
      </FormControl>
      <FormMessage className="absolute -bottom-5 text-[12px]" />
    </FormItem>
  );
};

export default FormInput;
