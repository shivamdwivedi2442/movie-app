"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Heart, LogOut, Settings, User } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";

export default function ProfileMenu() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (!user) return null;

  const initial = user.name?.[0]?.toUpperCase() || <User className="h-3.5 w-3.5" />;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((s) => !s)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex items-center gap-2 rounded-full bg-stage-800 py-1.5 pl-1.5 pr-3 transition-colors hover:bg-stage-700"
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-velvet-500 text-xs font-bold text-white">
          {initial}
        </div>
        <span className="text-sm font-medium text-mist-100">{user.name}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            role="menu"
            className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-xl border border-stage-700 bg-stage-900 shadow-card"
          >
            <div className="border-b border-stage-700 px-4 py-3">
              <p className="truncate text-sm font-semibold text-mist-100">{user.name}</p>
              <p className="truncate text-xs text-mist-500">{user.email}</p>
            </div>

            <div className="py-1">
              <Link
                href="/profile"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-mist-200 hover:bg-stage-800"
                role="menuitem"
              >
                <Settings className="h-4 w-4 text-mist-400" aria-hidden />
                Personal info &amp; password
              </Link>
              <Link
                href="/profile/favorites"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-mist-200 hover:bg-stage-800"
                role="menuitem"
              >
                <Heart className="h-4 w-4 text-mist-400" aria-hidden />
                Favorites
              </Link>
              <Link
                href="/profile/history"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-mist-200 hover:bg-stage-800"
                role="menuitem"
              >
                <Clock className="h-4 w-4 text-mist-400" aria-hidden />
                Watch history
              </Link>
            </div>

            <div className="border-t border-stage-700 py-1">
              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-velvet-400 hover:bg-stage-800"
                role="menuitem"
              >
                <LogOut className="h-4 w-4" aria-hidden />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}