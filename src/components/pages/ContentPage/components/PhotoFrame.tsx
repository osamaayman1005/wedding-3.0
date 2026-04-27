export function PhotoFrame({
  src,
  alt,
  caption,
  objectPosition = "center",
}: {
  src: string;
  alt: string;
  caption: string;
  objectPosition?: string;
}) {
  return (
    <div className="relative aspect-[4/5.1] overflow-hidden rounded-[24px] border border-[#ddd2c4]/70 shadow-soft">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
        style={{ objectPosition }}
      />
      <div className="absolute inset-x-0 bottom-0">
        <div className="glass-caption-overlay flex min-h-[3.0rem] items-center justify-center px-4 py-2 text-center text-[12px] font-medium uppercase tracking-[0.20em]">
          {caption}
        </div>
      </div>
    </div>
  );
}
