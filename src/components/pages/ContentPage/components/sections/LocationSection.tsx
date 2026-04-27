import { Reveal } from "../../../../shared/Reveal";
import { SectionFrame, InvitationButton } from "../../components";

export function LocationSection({ page, lang, WEDDING }: any) {
  return (
    <SectionFrame
      id="venue"
      eyebrow={page.locationEyebrow}
      title={page.locationTitle}
    >
      <Reveal>
        <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          {/* Map Container */}
          <div className="overflow-hidden rounded-[30px] border border-[#ddd2c4]/80 bg-white/90 shadow-soft">
            <iframe
              title={WEDDING.venue.name[lang]}
              src={`https://www.google.com/maps?q=${encodeURIComponent(WEDDING.venue.mapQuery)}&z=17&output=embed`}
              className="h-[320px] w-full md:h-[460px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Venue Details Card */}
          <div className="rounded-[30px] border border-[#ddd2c4]/80 p-6 shadow-soft bg-white/25 backdrop-blur-sm">
            <div className="text-[10px] uppercase tracking-[0.45em] text-[#8d7d67]">
              {page.locationTitle}
            </div>

            <div className="mt-3 text-3xl font-[400] tracking-[0.01em] text-ink-800">
              {WEDDING.venue.name[lang]}
            </div>

            {/* Access & Parking Mini-Cards */}
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[22px] border border-[#ddd2c4]/70 bg-[#faf7f1]/80 px-4 py-4">
                <div className="text-xs uppercase tracking-[0.32em] text-[#8d7d67]">
                  {lang === "en" ? "Access" : "الوصول"}
                </div>
                <div className="mt-2 text-sm font-[400] text-ink-800">
                  {lang === "en"
                    ? "Easy arrival via Almaza"
                    : "وصول سهل عبر ألماظة"}
                </div>
              </div>

              <div className="rounded-[22px] border border-[#ddd2c4]/70 bg-[#faf7f1]/80 px-4 py-4">
                <div className="text-xs uppercase tracking-[0.32em] text-[#8d7d67]">
                  {lang === "en" ? "Parking" : "المواقف"}
                </div>
                <div className="mt-2 text-sm font-[400] text-ink-800">
                  {lang === "en" ? "Available on site" : "متوفرة بالمكان"}
                </div>
              </div>
            </div>

            {/* Directions Button */}
            <div className="mt-6">
              <InvitationButton
                href={WEDDING.venue.mapUrl}
                target="_blank"
                rel="noreferrer"
                variant="solid"
                className="w-full"
              >
                {page.directions}
              </InvitationButton>
            </div>
          </div>
        </div>
      </Reveal>
    </SectionFrame>
  );
}
