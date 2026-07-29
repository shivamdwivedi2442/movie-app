"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import SectionHeader from "@/components/SectionHeader";
import MovieGrid from "@/components/MovieGrid";

export default function FavoritesPage() {
  const { user, ready, favorites } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (ready && !user) router.push("/login");
  }, [ready, user, router]);

  if (!ready || !user) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Account"
        title="Your favorites"
        description="Titles you've saved with the heart button."
      />
      <MovieGrid
        movies={favorites}
        emptyMessage="No favorites yet — tap the heart icon on any movie card to save it here."
      />
    </div>
  );
}