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
          <div className="glass-stable rounded-[30px] border border-[#ddd2c4]/80 bg-white/25 p-6 shadow-soft backdrop-blur-sm">
            <div className="rtl-ios-safe-text text-[10px] uppercase tracking-[0.45em] text-[#8d7d67] flex flex-col items-center">
              {page.venueEyebrow}
            </div>

            <div className="rtl-ios-safe-text mt-3 w-full text-center text-3xl font-[400] tracking-[0.01em] text-ink-800">
              {WEDDING.venue.name[lang]}
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[22px] border border-[#ddd2c4]/70 bg-[#faf7f1]/80 px-4 py-4">
                <div className="rtl-ios-safe-text text-xs uppercase tracking-[0.32em] text-[#8d7d67]">
                  {lang === "en" ? "Address" : "العنوان"}
                </div>
                <div className="rtl-ios-safe-text mt-2 text-sm font-[400] text-ink-800">
                  {lang === "en"
                    ? "Almazah area, Heliopolis, Cairo"
                    : "منطقة ألماظة، مصر الجديدة، القاهرة"}
                </div>
              </div>

              <div className="rounded-[22px] border border-[#ddd2c4]/70 bg-[#faf7f1]/80 px-4 py-4">
                <div className="rtl-ios-safe-text text-xs uppercase tracking-[0.32em] text-[#8d7d67]">
                  {lang === "en" ? "Parking" : "المواقف"}
                </div>
                <div className="rtl-ios-safe-text mt-2 text-sm font-[400] text-ink-800">
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
