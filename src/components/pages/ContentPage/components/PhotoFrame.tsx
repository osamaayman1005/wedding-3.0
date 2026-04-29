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
    <div className="relative isolate aspect-[4/5.1] overflow-hidden rounded-[20px] bg-[#faf7f166] shadow-soft">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="block h-full w-full object-cover"
        style={{ objectPosition }}
      />
      <div className="glass-stable absolute inset-x-0 bottom-0 h-[3.0rem] border-t border-[#ddd2c4]/70 bg-white/72 bg-gradient-to-b from-white/60 via-white/45 to-[#faf7f1]/50 px-4 backdrop-blur-[3.6px]">
        <div className="flex h-full items-center justify-center text-center text-[12px] font-medium uppercase tracking-[0.10em] text-ink-900">
          {caption}
        </div>
      </div>
    </div>
  );
}
