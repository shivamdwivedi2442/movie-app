"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchBar({
  autoFocus = false,
  onSubmitted,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("q") ?? "");

  function handleSubmit(e) {
    e.preventDefault();
    if (!value.trim()) return;
    router.push(`/search?q=${encodeURIComponent(value.trim())}`);
    onSubmitted?.();
  }

  return (
    <form onSubmit={handleSubmit} role="search" className="relative">
      <label htmlFor="site-search" className="sr-only">
        Search movies
      </label>
      <Search
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mist-500"
        aria-hidden
      />
      <input
        id="site-search"
        type="search"
        name="q"
        autoFocus={autoFocus}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search titles, e.g. Ember Road"
        className="w-full rounded-full border border-stage-600 bg-stage-800 py-2.5 pl-9 pr-4 text-sm text-mist-100 placeholder:text-mist-500 focus:border-velvet-500 focus:outline-none focus:ring-1 focus:ring-velvet-500"
      />
    </form>
  );
}