"use client";

import React from "react";
import {
  Settings,
  User,
  Shield,
  Bell,
  Mail,
  CreditCard,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const SettingsTab = () => {
  return (
    <div className="space-y-6 p-4 md:p-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-3">
        <Settings className="size-6 text-primary" />
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      <div className="space-y-8">
        {/* Account Settings */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <User className="size-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold">Account</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SettingCard
              title="Profile Information"
              description="Update your name, email, and profile picture"
              actionText="Edit Profile"
              onAction={() => console.log("Edit Profile")}
            />
            <SettingCard
              title="Change Password"
              description="Update your account password"
              actionText="Change"
              onAction={() => console.log("Change Password")}
            />
          </div>
        </div>

        <Separator />

        {/* Privacy & Security */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Shield className="size-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold">Privacy & Security</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SettingCard
              title="Privacy Settings"
              description="Control what others can see"
              actionText="Configure"
              onAction={() => console.log("Privacy Settings")}
            />
            <SettingCard
              title="Two-Factor Authentication"
              description="Add extra security to your account"
              actionText="Enable"
              variant="secondary"
              onAction={() => console.log("2FA")}
            />
          </div>
        </div>

        <Separator />

        {/* Notifications */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Bell className="size-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold">Notifications</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SettingCard
              title="Email Notifications"
              description="Manage email preferences"
              actionText="Manage"
              onAction={() => console.log("Email Notifications")}
            />
            <SettingCard
              title="Push Notifications"
              description="Control app notifications"
              actionText="Configure"
              onAction={() => console.log("Push Notifications")}
            />
          </div>
        </div>

        <Separator />

        {/* Billing */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <CreditCard className="size-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold">Billing</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SettingCard
              title="Payment Methods"
              description="Add or update payment options"
              actionText="Manage"
              onAction={() => console.log("Payment Methods")}
            />
            <SettingCard
              title="Billing History"
              description="View past transactions"
              actionText="View"
              onAction={() => console.log("Billing History")}
            />
          </div>
        </div>

        <Separator />

        {/* Support & Actions */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <HelpCircle className="size-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold">Support & Actions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SettingCard
              title="Help Center"
              description="Get help with your account"
              actionText="Contact"
              variant="ghost"
              onAction={() => console.log("Help Center")}
            />
            <SettingCard
              title="Log Out"
              description="Sign out of your account"
              actionText="Log Out"
              variant="destructive"
              icon={<LogOut className="size-4" />}
              onAction={() => console.log("Log Out")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable SettingCard component
interface SettingCardProps {
  title: string;
  description: string;
  actionText: string;
  onAction: () => void;
  variant?: "default" | "secondary" | "ghost" | "destructive";
  icon?: React.ReactNode;
}

const SettingCard: React.FC<SettingCardProps> = ({
  title,
  description,
  actionText,
  onAction,
  variant = "default",
  icon,
}) => {
  return (
    <div className="flex flex-col justify-between p-4 border rounded-lg">
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
      <Button
        variant={variant}
        size="sm"
        className="mt-4 w-fit"
        onClick={onAction}
      >
        {icon || null}
        {icon && <span className="ml-2">{actionText}</span>}
        {!icon && actionText}
      </Button>
    </div>
  );
};

export default SettingsTab;