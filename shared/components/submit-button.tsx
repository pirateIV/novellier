import React from "react";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";

type SubmitButtonProps = React.ComponentProps<"button"> & { loading: boolean };

const SubmitButton = ({ children, loading, ...props }: SubmitButtonProps) => {
  return (
    <Button
      type="submit"
      className="relative btn-gradient dark:text-white"
      disabled={loading}
      {...props}
    >
      {loading ? <Loader className="animate-spin" /> : children}
    </Button>
  );
};

export default SubmitButton;
