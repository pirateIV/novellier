"use client";

import React, { useState, useEffect, FormEvent } from "react";
import {
  Settings,
  User,
  Mail,
  LogOut,
  Trash2,
  Save,
  AlertCircle,
  Loader2,
  CheckCircle,
  XCircle
} from "lucide-react";
import { useRouter } from "next/navigation";
// import { useToast } from "@/components/ui/use-toast";
import { toast } from "sonner";
import { apiClient } from "@/lib/axios";

const SettingsTab = ({ initialUserData }) => {
console.log(initialUserData)
  const router = useRouter();

  // User information state with initial data
  const [userInfo, setUserInfo] = useState({
    firstName: initialUserData?.firstName || "",
    lastName: initialUserData?.lastName || "",
    email: initialUserData?.email || ""
  });

  // Form validation state
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: ""
  });

  // Loading states
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Confirmation dialogs
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Validate form fields
  const validateForm = () => {
    const newErrors = {
      firstName: "",
      lastName: "",
      email: ""
    };

    let isValid = true;

    if (!userInfo.firstName.trim()) {
      newErrors.firstName = "First name is required";
      isValid = false;
    }

    if (!userInfo.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    }

    if (!userInfo.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userInfo.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle input changes with validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  // Handle profile update
  const handleUpdateProfile = async (e: React.SyntheticEvent<FormEvent>) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      await apiClient.post("/auth/me/update", userInfo)
    } catch (error) {
      console.error(error)
    }
  }

  // Handle account deletion
  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== "DELETE") {
      toast({
        title: "Confirmation required",
        description: 'Please type "DELETE" to confirm account deletion',
        variant: "destructive",
      });
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch("/api/user", {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete account");
      }

      toast({
        title: "Account deleted",
        description: "Your account and all associated data have been permanently removed",
      });

      // Redirect to home page after deletion
      setTimeout(() => router.push("/"), 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete account",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to logout");
      }

      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });

      // Redirect to login page
      router.push("/login");
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to logout",
        variant: "destructive",
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="space-y-6 p-4 md:p-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Settings className="size-6 text-primary" />
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      {/* Profile Information Section */}
      <div className="bg-neutral-900 rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
        <form onSubmit={handleUpdateProfile}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-neutral-400 mb-1">
                First Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <User className="size-4 text-gray-400" />
                </span>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={userInfo.firstName}
                  onChange={handleChange}
                  className={`pl-10 w-full text-sm rounded-md border ${errors.firstName ? "border-red-500" : "border-gray-600"} py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-neutral-400 mb-1">
                Last Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <User className="size-4 text-gray-400" />
                </span>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={userInfo.lastName}
                  onChange={handleChange}
                  className={`pl-10 w-full text-sm rounded-md border ${errors.lastName ? "border-red-500" : "border-gray-600"} py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
              )}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-neutral-400 mb-1">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Mail className="size-4 text-gray-400" />
              </span>
              <input
                type="email"
                id="email"
                name="email"
                value={userInfo.email}
                onChange={handleChange}
                className={`pl-10 w-full text-sm rounded-md border ${errors.email ? "border-red-500" : "border-gray-600"} py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isUpdating}
              className="flex items-center gap-2 text-sm bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isUpdating ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="size-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Account Actions Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Account Actions</h2>
        
        {/* Logout Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowLogoutConfirm(true)}
            disabled={isLoggingOut}
            className="flex items-center text-sm gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md transition-colors w-full md:w-auto disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoggingOut ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <LogOut className="size-4" />
            )}
            {isLoggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>

        {/* Logout Confirmation Dialog */}
        {showLogoutConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-neutral-900 rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-medium mb-4">Confirm Logout</h3>
              <p className="mb-6">Are you sure you want to log out? Any unsaved changes will be lost.</p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  disabled={isLoggingOut}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md disabled:opacity-70"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center gap-2 disabled:opacity-70"
                >
                  {isLoggingOut && <Loader2 className="size-4 animate-spin" />}
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Account Section */}
        <div className="border-t pt-6 mt-6">
          <h3 className="text-lg font-medium text-red-600 mb-2">Danger Zone</h3>
          <div className="bg-red-50 border border-red-100 rounded-md p-4 mb-4">
            <p className="text-gray-700 mb-2">
              <strong>Warning:</strong> Deleting your account will permanently remove:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Your profile information</li>
              <li>All your book reviews</li>
              <li>Your reading lists and saved books</li>
              <li>Any other associated data</li>
            </ul>
          </div>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors"
          >
            <Trash2 className="size-4" />
            Delete Account
          </button>
        </div>

        {/* Delete Account Confirmation Dialog */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <div className="flex items-center gap-2 text-red-600 mb-4">
                <AlertCircle className="size-5" />
                <h3 className="text-lg font-medium">Delete Account</h3>
              </div>
              <p className="mb-4">This action cannot be undone. This will permanently:</p>
              <ul className="list-disc list-inside mb-4 text-gray-700 space-y-1">
                <li>Delete your account</li>
                <li>Remove all your book reviews</li>
                <li>Delete your reading lists</li>
                <li>Erase all your data from our servers</li>
              </ul>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-neutral-400 mb-1">
                  To confirm, type <span className="font-mono bg-gray-100 px-2 py-1 rounded">DELETE</span> below:
                </label>
                <input
                  type="text"
                  value={deleteConfirmText}
                  onChange={(e) => setDeleteConfirmText(e.target.value)}
                  className="w-full rounded-md border border-gray-600 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="DELETE"
                  autoFocus
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setDeleteConfirmText("");
                  }}
                  disabled={isDeleting}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md disabled:opacity-70"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={deleteConfirmText !== "DELETE" || isDeleting}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isDeleting && <Loader2 className="size-4 animate-spin" />}
                  {isDeleting ? "Deleting..." : "Delete Account"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsTab;