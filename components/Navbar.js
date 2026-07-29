"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Clapperboard, Clock, Heart, LogIn, LogOut, Menu, Search, Settings, UserPlus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "./SearchBar";
import ProfileMenu from "./ProfileMenu";
import { useAuth } from "@/lib/AuthContext";

const LINKS = [
  { href: "/", label: "Now Trending" },
  { href: "/indian", label: "Indian Cinema" },
  { href: "/top-rated", label: "Top Rated" },
  { href: "/upcoming", label: "Upcoming" },
  { href: "/genres", label: "Genres" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout, ready } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-stage-700/60 bg-stage-950/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-2xl tracking-wide text-mist-100"
        >
          <Clapperboard className="h-6 w-6 text-velvet-500" aria-hidden />
          <span>
            REEL<span className="text-velvet-500">HOUSE</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                  active ? "text-brass-400" : "text-mist-300 hover:text-mist-100"
                }`}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-3 -bottom-[1px] h-[2px] rounded-full bg-brass-400"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setSearchOpen((s) => !s)}
            aria-label={searchOpen ? "Close search" : "Open search"}
            aria-expanded={searchOpen}
            className="rounded-full p-2 text-mist-300 transition-colors hover:bg-stage-800 hover:text-mist-100"
          >
            {searchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
          </button>

          {/* Auth area — desktop only; skip rendering until localStorage is
              checked (ready) so we don't flash "Login" before it loads. */}
          <div className="hidden items-center gap-2 pl-2 md:flex">
            {!ready ? null : user ? (
              <ProfileMenu />
            ) : (
              <>
                <Link
                  href="/login"
                  className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-mist-300 transition-colors hover:text-mist-100"
                >
                  <LogIn className="h-4 w-4" aria-hidden />
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="flex items-center gap-1.5 rounded-full bg-velvet-500 px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-velvet-400"
                >
                  <UserPlus className="h-4 w-4" aria-hidden />
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setOpen((s) => !s)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="rounded-full p-2 text-mist-300 transition-colors hover:bg-stage-800 hover:text-mist-100 md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-stage-700/60 bg-stage-900"
          >
            <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
              <SearchBar autoFocus onSubmitted={() => setSearchOpen(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-stage-700/60 bg-stage-900 md:hidden"
            aria-label="Mobile"
          >
            <ul className="mx-auto max-w-7xl px-4 py-2 sm:px-6">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block border-b border-stage-800 py-3 text-sm font-medium ${
                      pathname === link.href ? "text-brass-400" : "text-mist-300"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Auth area — mobile menu */}
            <div className="mx-auto max-w-7xl px-4 pb-4 pt-1 sm:px-6">
              {ready && user ? (
                <div className="space-y-1">
                  <div className="mb-2 flex items-center gap-2 rounded-full bg-stage-800 py-2 pl-2 pr-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-velvet-500 text-xs font-bold text-white">
                      {user.name?.[0]?.toUpperCase() || "U"}
                    </div>
                    <span className="text-sm font-medium text-mist-100">{user.name}</span>
                  </div>
                  <Link
                    href="/profile"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 border-b border-stage-800 py-3 text-sm text-mist-200"
                  >
                    <Settings className="h-4 w-4 text-mist-400" aria-hidden />
                    Personal info &amp; password
                  </Link>
                  <Link
                    href="/profile/favorites"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 border-b border-stage-800 py-3 text-sm text-mist-200"
                  >
                    <Heart className="h-4 w-4 text-mist-400" aria-hidden />
                    Favorites
                  </Link>
                  <Link
                    href="/profile/history"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 border-b border-stage-800 py-3 text-sm text-mist-200"
                  >
                    <Clock className="h-4 w-4 text-mist-400" aria-hidden />
                    Watch history
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                    className="flex w-full items-center gap-3 py-3 text-left text-sm text-velvet-400"
                  >
                    <LogOut className="h-4 w-4" aria-hidden />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex gap-3">
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-stage-600 py-2.5 text-sm font-medium text-mist-200"
                  >
                    <LogIn className="h-4 w-4" aria-hidden />
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setOpen(false)}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-velvet-500 py-2.5 text-sm font-semibold text-white"
                  >
                    <UserPlus className="h-4 w-4" aria-hidden />
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}