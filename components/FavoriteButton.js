"use client";

import { Heart } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";

export default function FavoriteButton({ movie, size = "sm", className = "" }) {
  const { user, favorites, toggleFavorite, isFavorite, ready } = useAuth();

  if (!ready) return null;

  const active = isFavorite(movie.id);
  const dimensions = size === "lg" ? "h-10 w-10" : "h-8 w-8";
  const iconSize = size === "lg" ? "h-5 w-5" : "h-4 w-4";

  function handleClick(e) {
    e.preventDefault(); // don't navigate when the button sits inside a card <Link>
    e.stopPropagation();
    if (!user) {
      window.location.href = "/login";
      return;
    }
    toggleFavorite(movie);
  }

  return (
    <button
      onClick={handleClick}
      aria-label={active ? "Remove from favorites" : "Add to favorites"}
      aria-pressed={active}
      className={`flex ${dimensions} items-center justify-center rounded-full bg-stage-950/80 backdrop-blur-sm transition-colors hover:bg-stage-900 ${className}`}
    >
      <Heart
        className={`${iconSize} transition-colors ${
          active ? "fill-velvet-500 text-velvet-500" : "text-mist-200"
        }`}
      />
    </button>
  );
}