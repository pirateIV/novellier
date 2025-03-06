"use client";
import type React from "react";
import ProfileSummary from "./_components/ProfileSummary";
import TabContents from "./_components/TabContents";
import Link from "next/link";
import { Home } from "lucide-react";

const UserPage = () => {
  return (
    <div className="relative">
      <ProfileSummary />
      <TabContents />

      <div className="flex gap-1 fixed z-50 bg-black p-10 top-0 rounded-full">
        <Link href="/">
          <Home />
        </Link>
        <button className="bg-white text-zinc-900 p-3 rounded-full">
          Add Book
        </button>
      </div>
    </div>
  );
};

export default UserPage;
