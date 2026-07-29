"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { KeyRound, Save, User } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import SectionHeader from "@/components/SectionHeader";

export default function ProfilePage() {
  const { user, ready, updateProfile, changePassword } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Redirect to login if not authenticated (once we've checked localStorage)
  useEffect(() => {
    if (ready && !user) router.push("/login");
  }, [ready, user, router]);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  if (!ready || !user) return null;

  function handleInfoSubmit(e) {
    e.preventDefault();
    updateProfile({ name, email });
    setInfoMessage("Profile updated.");
    setTimeout(() => setInfoMessage(""), 3000);
  }

  async function handlePasswordSubmit(e) {
    e.preventDefault();
    setPasswordError("");
    setPasswordMessage("");

    if (newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirmation don't match.");
      return;
    }

    try {
      await changePassword(currentPassword, newPassword);
      setPasswordMessage("Password changed successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setPasswordMessage(""), 3000);
    } catch (err) {
      setPasswordError(err.message || "Could not change password.");
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="Account" title="Personal info & password" />

      {/* Personal info */}
      <form
        onSubmit={handleInfoSubmit}
        className="mb-10 rounded-2xl border border-stage-700/60 bg-stage-900 p-6"
      >
        <div className="mb-5 flex items-center gap-2 text-mist-100">
          <User className="h-5 w-5 text-velvet-500" aria-hidden />
          <h2 className="font-display text-xl tracking-wide">Personal information</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm text-mist-400">
              Full name
            </label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-stage-600 bg-stage-800 px-3.5 py-2.5 text-sm text-mist-100 focus:border-velvet-500 focus:outline-none focus:ring-1 focus:ring-velvet-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm text-mist-400">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-stage-600 bg-stage-800 px-3.5 py-2.5 text-sm text-mist-100 focus:border-velvet-500 focus:outline-none focus:ring-1 focus:ring-velvet-500"
            />
          </div>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-full bg-velvet-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-velvet-400"
          >
            <Save className="h-4 w-4" aria-hidden />
            Save changes
          </button>
          {infoMessage && <span className="text-sm text-brass-400">{infoMessage}</span>}
        </div>
      </form>

      {/* Change password */}
      <form
        onSubmit={handlePasswordSubmit}
        className="rounded-2xl border border-stage-700/60 bg-stage-900 p-6"
      >
        <div className="mb-5 flex items-center gap-2 text-mist-100">
          <KeyRound className="h-5 w-5 text-velvet-500" aria-hidden />
          <h2 className="font-display text-xl tracking-wide">Change password</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="current-password" className="mb-1.5 block text-sm text-mist-400">
              Current password
            </label>
            <input
              id="current-password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full rounded-lg border border-stage-600 bg-stage-800 px-3.5 py-2.5 text-sm text-mist-100 focus:border-velvet-500 focus:outline-none focus:ring-1 focus:ring-velvet-500"
            />
          </div>
          <div>
            <label htmlFor="new-password" className="mb-1.5 block text-sm text-mist-400">
              New password
            </label>
            <input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full rounded-lg border border-stage-600 bg-stage-800 px-3.5 py-2.5 text-sm text-mist-100 focus:border-velvet-500 focus:outline-none focus:ring-1 focus:ring-velvet-500"
            />
          </div>
          <div>
            <label htmlFor="confirm-password" className="mb-1.5 block text-sm text-mist-400">
              Confirm new password
            </label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-lg border border-stage-600 bg-stage-800 px-3.5 py-2.5 text-sm text-mist-100 focus:border-velvet-500 focus:outline-none focus:ring-1 focus:ring-velvet-500"
            />
          </div>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-full bg-velvet-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-velvet-400"
          >
            <KeyRound className="h-4 w-4" aria-hidden />
            Update password
          </button>
          {passwordMessage && <span className="text-sm text-brass-400">{passwordMessage}</span>}
          {passwordError && <span className="text-sm text-velvet-400">{passwordError}</span>}
        </div>

        <p className="mt-4 text-xs text-mist-500">
          Forgot your current password? Log out and use the "Forgot password" link on the login page instead.
        </p>
      </form>
    </div>
  );
}