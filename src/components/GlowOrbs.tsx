export function GlowOrbs() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute -top-24 left-[-140px] h-[420px] w-[420px] rounded-full bg-sage-100/15 blur-3xl motion-safe:animate-shimmer" />
      <div className="absolute top-[30%] right-[-180px] h-[520px] w-[520px] rounded-full bg-champagne/18 blur-3xl motion-safe:animate-shimmer" />
      <div className="absolute bottom-[-220px] left-[20%] h-[520px] w-[520px] rounded-full bg-sage-50/20 blur-3xl motion-safe:animate-shimmer" />
    </div>
  )
}
