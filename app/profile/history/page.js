"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import SectionHeader from "@/components/SectionHeader";
import MovieGrid from "@/components/MovieGrid";

export default function HistoryPage() {
  const { user, ready, history, clearHistory } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (ready && !user) router.push("/login");
  }, [ready, user, router]);

  if (!ready || !user) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <SectionHeader
          eyebrow="Account"
          title="Watch history"
          description="Titles you've recently viewed, most recent first."
        />
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="mb-6 flex items-center gap-1.5 rounded-full border border-stage-600 px-4 py-2 text-sm font-medium text-mist-300 hover:border-velvet-500/60 hover:text-mist-100"
          >
            <Trash2 className="h-4 w-4" aria-hidden />
            Clear history
          </button>
        )}
      </div>
      <MovieGrid
        movies={history}
        emptyMessage="No history yet — movies and shows you open will show up here."
      />
    </div>
  );
}