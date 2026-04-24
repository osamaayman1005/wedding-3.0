import floralCorner from "../../../../assets/content/floral-corner.png";

export function CornerFlower({
  className = "",
  mirrored = false,
}: {
  className?: string;
  mirrored?: boolean;
}) {
  return (
    <img
      src={floralCorner}
      alt=""
      aria-hidden="true"
      className={`pointer-events-none absolute select-none object-contain ${className} ${
        mirrored ? "scale-x-[-1]" : ""
      }`}
    />
  );
}
