import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, TrendingUp } from "lucide-react";
import { Link } from "next-view-transitions";

const StatsCard = ({
  title,
  value,
  href = "#",
  icon,
  children,
}: {
  title: string;
  value: string | number;
  href?: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <div className="relative p-2 border rounded-[20px] bg-neutral-200/5 dark:bg-neutral-950  border-white/5 *:h-full">
      <Card className="relative overflow-hidden border dark:border-none  transition-all duration-200 bg-white dark:bg-[#0f0f0f] shadow-none">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            {icon}
            <CardTitle className="text-sm font-semibold tracking-tight">{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex-1 justify-end">{children}</CardContent>
        <span className="absolute inset-0 cursor-pointer">
          <Link href={href} />
        </span>
      </Card>
    </div>
  );
};
export default StatsCard;
