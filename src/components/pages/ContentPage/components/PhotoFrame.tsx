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
        <div className="flex min-h-[3.0rem] items-center justify-center border-t border-[#ddd2c4]/70 bg-white/82 bg-gradient-to-b from-white/80 to-[#faf7f1]/65 px-4 py-2 text-center text-[12px] font-medium uppercase tracking-[0.20em] text-ink-900 shadow-[0_-10px_24px_-22px_rgba(43,42,38,0.36)] backdrop-blur-sm">
          {caption}
        </div>
      </div>
    </div>
  );
}
