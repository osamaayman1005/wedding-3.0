export function SectionDivider() {
  return (
    <div
      aria-hidden="true"
      className="flex items-center justify-center gap-4 my-8"
    >
      {/* Left Gradient Line */}
      <span className="h-px w-12 bg-gradient-to-r from-transparent via-[#cdbfae] to-transparent md:w-20" />

      {/* The Dot (Replacing the image) */}
      <span className="h-1.5 w-1.5 rounded-full bg-[#969e8b] opacity-80 md:h-2 md:w-2" />

      {/* Right Gradient Line */}
      <span className="h-px w-12 bg-gradient-to-r from-transparent via-[#cdbfae] to-transparent md:w-20" />
    </div>
  );
}
