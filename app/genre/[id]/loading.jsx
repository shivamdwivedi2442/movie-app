import GridSkeleton from "@/components/GridSkeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="skeleton mb-6 h-9 w-56 rounded" />
      <div className="mb-8 flex gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton h-8 w-20 rounded-full" />
        ))}
      </div>
      <GridSkeleton count={10} />
    </div>
  );
}