import GridSkeleton from "@/components/GridSkeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="skeleton mb-6 h-9 w-56 rounded" />
      <GridSkeleton count={10} />
    </div>
  );
}