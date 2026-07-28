export default function Loading() {
  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-14 sm:px-6 md:grid-cols-[260px_1fr] lg:px-8">
      <div className="skeleton mx-auto aspect-[2/3] w-48 rounded-xl md:w-full" />
      <div className="space-y-4">
        <div className="skeleton h-10 w-2/3 rounded" />
        <div className="skeleton h-4 w-1/3 rounded" />
        <div className="skeleton h-24 w-full max-w-2xl rounded" />
      </div>
    </div>
  );
}