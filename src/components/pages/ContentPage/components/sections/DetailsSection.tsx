import { Reveal } from "../../../../shared/Reveal";
import { SectionFrame } from "../../components";

export function DetailsSection({ page, lang, WEDDING }: any) {
  const glassyClassName =
    "glass-stable rounded-[22px] border border-[#ddd2c4]/50 px-4 py-4 md:p-8 backdrop-blur-sm shadow-soft";
  return (
    <SectionFrame
      id="details"
      eyebrow={page.detailsEyebrow}
      title={page.detailsTitle}
    >
      <Reveal>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {/* Venue Card */}
          <div className={glassyClassName}>
            <div className="text-xs uppercase tracking-[0.32em] text-[#8d7d67]">
              {lang === "en" ? "Venue" : "المكان"}
            </div>
            <div className="mt-2 text-sm font-[400] text-ink-800">
              {WEDDING.venue.name[lang]}
            </div>
          </div>

          {/* Time Card */}
          <div className={glassyClassName}>
            <div className="text-xs uppercase tracking-[0.32em] text-[#8d7d67]">
              {lang === "en" ? "Time" : "الوقت"}
            </div>
            <div className="mt-2 text-sm font-[400] text-ink-800">
              {WEDDING.timeLabel[lang]}
            </div>
          </div>
          <div className={glassyClassName}>
            <div className="text-xs uppercase tracking-[0.32em] text-[#8d7d67]">
              {lang === "en" ? "Date" : "التاريخ"}
            </div>
            <div className="mt-2 text-sm font-[400] text-ink-800">
              {WEDDING.dateLabel[lang]}
            </div>
          </div>
          <div className={glassyClassName}>
            <div className="text-xs uppercase tracking-[0.32em] text-[#8d7d67]">
              {lang === "en" ? "Dress" : "الزي"}
            </div>
            <div className="mt-2 text-sm font-[400] text-ink-800">
              {WEDDING.dressCode[lang]}
            </div>
          </div>
        </div>
      </Reveal>
    </SectionFrame>
  );
}
