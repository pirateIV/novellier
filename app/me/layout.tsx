"use client";
import type React from "react";
import ProfileSummary from "./_components/ProfileSummary";
import TabContents from "./_components/TabContents";

const DashboardLayout = () => {
  return (
    <div className="relative">
      <ProfileSummary />
      <TabContents />
    </div>
  );
};

export default DashboardLayout;
