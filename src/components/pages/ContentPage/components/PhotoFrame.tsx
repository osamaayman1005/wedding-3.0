export function PhotoFrame({
  src,
  alt,
  caption,
  onClick,
  objectPosition = "center",
}: {
  src: string;
  alt: string;
  caption: string;
  onClick?: () => void;
  objectPosition?: string;
}) {
  const content = (
    <div className="group relative aspect-[4/5] overflow-hidden rounded-[24px] border border-[#ddd2c4]/70 bg-white/90 shadow-soft transition duration-700 hover:-translate-y-0.5">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition duration-1000 group-hover:scale-[1.04]"
        style={{ objectPosition }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(49,41,33,0.24))] opacity-0 transition duration-700 group-hover:opacity-100" />
      <div className="absolute inset-x-0 bottom-0 px-4 py-3">
        <div className="inline-flex rounded-full bg-white/86 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-ink-700 shadow-soft">
          {caption}
        </div>
      </div>
    </div>
  );

  if (!onClick) return content;

  return (
    <button
      type="button"
      onClick={onClick}
      className="text-start transition duration-700 hover:-translate-y-0.5"
      aria-label={caption}
    >
      {content}
    </button>
  );
}
