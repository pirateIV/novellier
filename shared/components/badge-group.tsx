import { Badge } from "@/components/ui/badge";
import React from "react";

const BadgeGroup = ({ list, ...props }: { list: any[] | undefined }) => {
  return (
    <div className="*:not-first:border-l *:not-first:border-l-background *:dark:not-first:border-l-background">
      {list?.slice(0, 3).map((item: string, i: number) => (
        <Badge
          key={i}
          variant="secondary"
          className="rounded-none first-of-type:rounded-l-sm last-of-type:rounded-e-sm"
          {...props}
        >
          {item}
        </Badge>
      ))}
    </div>
  );
};

export default BadgeGroup;
