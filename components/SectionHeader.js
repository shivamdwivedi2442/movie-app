export default function SectionHeader({
  eyebrow,
  title,
  description,
}) {
  return (
    <div className="mb-6">
      {eyebrow && (
        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-velvet-500">
          {eyebrow}
        </p>
      )}
      <h1 className="font-display text-3xl tracking-wide text-mist-100 sm:text-4xl">
        {title}
      </h1>
      {description && (
        <p className="mt-2 max-w-2xl text-sm text-mist-400">{description}</p>
      )}
    </div>
  );
}