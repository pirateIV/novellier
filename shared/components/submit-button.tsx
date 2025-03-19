import React from "react";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";

type SubmitButtonProps = React.ComponentProps<"button"> & {
  loading: boolean;
  signedIn?: boolean;
};

const SubmitButton = ({
  children,
  loading,
  signedIn,
  ...props
}: SubmitButtonProps) => {
  return (
    <Button
      type="submit"
      className="relative btn-gradient dark:text-white disabled:!cursor-not-allowed"
      disabled={loading || signedIn}
      {...props}
    >
      {loading ? <Loader className="animate-spin" /> : children}
    </Button>
  );
};

export default SubmitButton;
