import Link from "next/link";
import { Genre } from "@/lib/types";

export default function GenreList({
  genres,
  activeId,
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {genres.map((genre) => {
        const active = genre.id === activeId;
        return (
          <Link
            key={genre.id}
            href={`/genre/${genre.id}`}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              active
                ? "border-velvet-500 bg-velvet-500 text-white"
                : "border-stage-600 bg-stage-800 text-mist-300 hover:border-velvet-500/60 hover:text-mist-100"
            }`}
          >
            {genre.name}
          </Link>
        );
      })}
    </div>
  );
}