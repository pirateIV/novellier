"use client";
import type React from "react";
import ProfileSummary from "./_components/ProfileSummary";
import TabContents from "./_components/TabContents";
import Link from "next/link";
import { Home } from "lucide-react";

const UserPage = () => {
  return (
    <div className="relative pb-5">
      <ProfileSummary />
      <TabContents />

     
    </div>
  );
};

export default UserPage;
