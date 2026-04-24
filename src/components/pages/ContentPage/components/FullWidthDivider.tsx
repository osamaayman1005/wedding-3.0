import floralDivider from "../../../../assets/content/floral-divider.png";

export function FullWidthDivider() {
  return (
    <div className="px-4 py-6 md:py-8">
      <div className="mx-auto max-w-[1120px] flex items-center justify-center">
        <img
          src={floralDivider}
          alt=""
          aria-hidden="true"
          className="w-full max-w-md opacity-80 select-none pointer-events-none"
        />
      </div>
    </div>
  );
}
