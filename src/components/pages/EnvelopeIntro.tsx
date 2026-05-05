import { useEffect, useState } from "react";
import envelopeImage from "../../assets/envelope.png";
import { GlowOrbs } from "../shared/GlowOrbs";
import { ParticlesCanvas } from "../shared/ParticlesCanvas";

type Props = {
  opening: boolean;
  onOpen: () => void;
  onDismiss: () => void;
};

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);

    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  return reducedMotion;
}

export function EnvelopeIntro({ opening, onOpen, onDismiss }: Props) {
  const reducedMotion = useReducedMotion();
  const openDurationMs = reducedMotion ? 200 : 2600;

  useEffect(() => {
    if (opening) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [opening]);

  useEffect(() => {
    if (!opening) return;

    const dismissTimeout = window.setTimeout(onDismiss, openDurationMs);

    return () => {
      window.clearTimeout(dismissTimeout);
    };
  }, [opening, onDismiss, openDurationMs]);

  const openEnvelope = () => {
    if (!opening) onOpen();
  };

  const motionStyle = {
    transitionDuration: `${openDurationMs}ms`,
    transitionTimingFunction: "cubic-bezier(0.16, 0.9, 0.22, 1)",
  } as const;
  const envelopeMaskStyle = opening
    ? {
        WebkitMaskImage:
          "radial-gradient(circle at center, rgba(0,0,0,1) 0 90%, rgba(0,0,0,0) 100%)",
        maskImage:
          "radial-gradient(circle at center, rgba(0,0,0,1) 0 90%, rgba(0,0,0,0) 100%)",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: "100% 100%",
        maskSize: "100% 100%",
      }
    : undefined;

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden bg-transparent text-[#4f4336] transition-opacity ${
        opening ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      style={motionStyle}
    >
      <div className="absolute inset-0 paper-bg" />
      <div className="absolute inset-0 section-wash opacity-80" />
      <div className="absolute inset-0" />
      <GlowOrbs />
      <ParticlesCanvas />

      <div className="relative z-10 flex min-h-svh items-center justify-center px-4 py-8 sm:px-8">
        <button
          type="button"
          onClick={openEnvelope}
          disabled={opening}
          aria-label="Open the wedding invitation"
          className="group relative w-full max-w-[980px] outline-none"
        >
          <div
            className={`relative mx-auto origin-center w-full transform-gpu transition-[transform,opacity,filter] ${
              opening ? "scale-[1.34] -translate-y-2" : "scale-100"
            }`}
            style={motionStyle}
          >
            <div className="blur-stable absolute left-1/2 top-[80%] h-44 w-[78%] -translate-x-1/2 rounded-full bg-[#3f2d1c]/46 blur-[52px] mix-blend-multiply" />
            <div className="blur-stable absolute left-1/2 top-[84%] h-24 w-[62%] -translate-x-1/2 rounded-full bg-[#3f2d1c]/30 blur-[28px] mix-blend-multiply" />
            <div className="blur-stable absolute left-1/2 top-[87%] h-12 w-[44%] -translate-x-1/2 rounded-full bg-[#24180f]/18 blur-[14px]" />

            <img
              src={envelopeImage}
              alt=""
              className="blur-stable block h-auto w-full rounded-[34px] object-cover shadow-[0_34px_120px_-28px_rgba(70,52,30,0.34),0_52px_130px_-20px_rgba(72,52,28,0.56)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.01] sm:rounded-[40px] mt-7"
              style={{
                filter: "drop-shadow(0 36px 28px rgba(66, 46, 28, 0.26))",
                willChange: "transform, filter",
                ...envelopeMaskStyle,
              }}
            />
          </div>

          <div
            className="mx-auto mt-5 max-w-md text-center transition-all"
            style={motionStyle}
          >
            <div className="transition-all">
              <div className="h-8" />
              <div className="text-[14px] uppercase tracking-[0.35em] text-[#3f3823]">
                Tap the seal to open
              </div>
              <div className="mt-3 font-display text-xl italic text-[#3f3823]"></div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
