import Link from "next/link";
import { Clapperboard } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-32 text-center">
      <Clapperboard className="mb-4 h-10 w-10 text-velvet-500" aria-hidden />
      <h1 className="font-display text-5xl tracking-wide text-mist-100">Scene missing</h1>
      <p className="mt-3 max-w-md text-mist-400">
        We couldn&apos;t find that page. It may have been cut in the final edit.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-velvet-500 px-6 py-3 text-sm font-semibold text-white hover:bg-velvet-400"
      >
        Back to CINE HUB
      </Link>
    </div>
  );
}