import floralDivider from "../../../../assets/content/floral-divider.png";

export function SectionDivider() {
  return (
    <div aria-hidden="true" className="flex items-center justify-center gap-4">
      <span className="h-px w-12 bg-gradient-to-r from-transparent via-[#cdbfae] to-transparent md:w-20" />
      <img
        src={floralDivider}
        alt=""
        aria-hidden="true"
        className="h-6 w-auto opacity-85 md:h-7"
      />
      <span className="h-px w-12 bg-gradient-to-r from-transparent via-[#cdbfae] to-transparent md:w-20" />
    </div>
  );
}
