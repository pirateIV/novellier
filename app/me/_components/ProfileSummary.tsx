"use client";

import React, { useState } from "react";
import { Edit3 } from "lucide-react";
import { User } from "@/shared/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UserDetails from "./UserDetails";
import { z } from "zod";

interface ProfileSummaryProps {
  user: User;
  // onUpdateUser?: (updatedUser: Partial<User>) => void;
}

const updateCredentialsSchema = z.object({
  email: z.string().email("Invalid email address"),

})
const ProfileSummary = ({ user }: ProfileSummaryProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    // Add other fields as needed based on your User type
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // onUpdateUser?.(formData);
    setIsOpen(false);
  };

  return (
    <div className="bg-gradient-to-r bg-white dark:bg-[#0f0f0f] pt-8 pb-16 flex items-start justify-between">
      <div className="size-full mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-center md:justify-between">
        <UserDetails user={user} />

        <div className="flex flex-col sm:flex-row gap-2 justify-center md:justify-start md:mt-0 mt-6">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="text-[13px] py-4 !rounded-sm">
                <Edit3 className="size-[14px] mr-0.5" />
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    placeholder="Tell us about yourself"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Save Changes</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default ProfileSummary;