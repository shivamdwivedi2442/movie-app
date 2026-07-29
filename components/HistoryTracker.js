"use client";

import { useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";

// Drop this into any movie/tv detail page (client-side, renders nothing).
// It logs the item to the logged-in user's watch history on mount.
export default function HistoryTracker({ movie }) {
  const { user, addHistory, ready } = useAuth();

  useEffect(() => {
    if (ready && user) {
      addHistory(movie);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, user, movie.id]);

  return null;
}