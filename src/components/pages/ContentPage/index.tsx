import {
  useEffect,
  useState,
  type FormEvent,
} from "react";
import { useCountdown } from "../../../hooks/useCountdown";
import { useGuestName } from "../../../hooks/useGuestName";
import { useI18n } from "../../../context/I18nContext";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { Reveal } from "../../shared/Reveal";
import { Lightbox } from "../../shared/Lightbox";
import { WEDDING } from "../../../config/event";
// assets used by extracted components (imported in their own files)
import weddingLogo from "../../../assets/content/wedding-logo.jpeg";
import weddingPortraitArch from "../../../assets/mosque/wedding-portrait-arch.jpg";
import weddingPortraitCourtyard from "../../../assets/mosque/wedding-portrait-courtyard.jpg";
import weddingPortraitInterior from "../../../assets/mosque/wedding-portrait-interior.jpg";
import weddingPortraitStairs from "../../../assets/mosque/wedding-portrait-stairs.jpg";
import {
  CornerFlower,
  SectionDivider,
  FullWidthDivider,
  SectionFrame,
  StatCard,
  PhotoFrame,
  InvitationButton,
  CopyButton,
} from "./components";

type RSVPState = {
  name: string;
  attending: "yes" | "no";
  guests: number;
  savedAtISO: string;
};

type Lang = "en" | "ar";

const copy = {
  en: {
    welcome: "Welcome, dear guest",
    celebration: "In celebration of love",
    couple: "Osama & Farah",
    tagline: "An elegant ivory evening of vows, florals, and quiet joy.",
    scroll: "Scroll to discover",
    saveTheDate: "Save the Date",
    countdownTitle: "Counting the moments",
    countdownLead: "A gentle countdown to a graceful evening.",
    detailsEyebrow: "Event Details",
    detailsTitle: "Ceremony & Celebration",
    detailsLead:
      "We would be honored by your presence. The evening is styled in soft ivory, sage, and champagne tones.",
    scheduleEyebrow: "Order of Eventssss",
    scheduleTitle: "Order of Eventsas",
    scheduleLead:
      "A calm sequence for the evening, from arrival to celebration.",
    locationEyebrow: "Location",
    locationTitle: "Masged Al Aly Al Azeem",
    locationLead:
      "A contemporary mosque with ceremonial halls and a serene, community-focused atmosphere.",
    galleryEyebrow: "Our Story in Frames",
    galleryTitle: "Our Story in Frames",
    galleryLead:
      "A few portraits and moments that echo the same soft, floral mood as the invitation card.",
    rsvpEyebrow: "Kindly Respond",
    rsvpTitle: "Kindly Respond",
    rsvpLead: "Your presence is the greatest gift. Please confirm by May 20th.",
    fullName: "Full Name",
    willYouAttend: "Will you attend?",
    numberGuests: "Number of Guests",
    yes: "Yes, joyfully",
    no: "Regretfully declines",
    sendResponse: "Send Response",
    saved: "Thank you. Your response is saved on this device.",
    savedAt: "Last saved",
    directions: "Get Directions",
    backToEnvelope: "Return to envelope",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    arrival: "Arrival",
    ceremony: "Ceremony",
    congratulations: "Congratulations",
    refreshments: "Refreshments",
    arrivalNote: "Guests are welcomed in a soft, unhurried flow.",
    ceremonyNote: "The vows begin beneath a calm and elegant setting.",
    congratulationsNote: "A brief pause for blessings and portraits.",
    refreshmentsNote: "The evening settles into warm conversation.",
    dateLabel: "Friday, June 5, 2026",
    locationLabel: "Almaza, Cairo",
    timeLabel: "7:30 PM",
    dressLabel: "Elegant, soft tones",
    ceremonyNoteLabel: "Doors open at 7:00 PM",
    receptionLabel: "A quiet beginning",
    heroJumpDetails: "Details",
    heroJumpLocation: "Location",
    heroJumpRsvp: "RSVP",
    footerLove: "With love, Osama & Farah",
    footerDate: "05 · 06 · 2026",
    frameOne: "Stair portrait",
    frameTwo: "Courtyard light",
    frameThree: "Interior glow",
    frameFour: "Arch portrait",
    frameFive: "Evening walk",
    frameSix: "Quiet moment",
  },
  ar: {
    welcome: "أهلاً وسهلاً، يا ضيفنا العزيز",
    celebration: "احتفال بالحب",
    couple: "أسامة وفرح",
    tagline: "أمسية عاجية هادئة من الوعود والزهور والفرح الهادئ.",
    scroll: "مرر لتكتشف التفاصيل",
    saveTheDate: "احفظوا الموعد",
    countdownTitle: "نعدّ اللحظات",
    countdownLead: "عدٌّ هادئ حتى أمسيـة أنيقة ومريحة.",
    detailsEyebrow: "تفاصيل الحفل",
    detailsTitle: "الاحتفال والموعد",
    detailsLead:
      "يسعدنا حضوركم. صُممت الأمسية بدرجات العاجي والمريمي والشمبانيا لتبقى هادئة ومتناسقة.",
    scheduleEyebrow: "ترتيب الأمسية",
    scheduleTitle: "ترتيب الأمسية",
    scheduleLead: "تسلسل هادئ للأمسية من الوصول حتى الاحتفال.",
    locationEyebrow: "المكان",
    locationTitle: "مسجد العلي العظيم",
    locationLead: "مسجد معاصر بقاعة احتفال وأجواء مجتمعية هادئة ومريحة.",
    galleryEyebrow: "ذكريات في إطارات",
    galleryTitle: "ذكريات في إطارات",
    galleryLead:
      "بعض اللقطات واللحظات التي تعكس نفس روح البطاقة: هادئة، زهرية، ومضيئة.",
    rsvpEyebrow: "تأكيد الحضور",
    rsvpTitle: "تأكيد الحضور",
    rsvpLead: "وجودك هو أجمل هدية. يرجى التأكيد قبل 20 مايو.",
    fullName: "الاسم بالكامل",
    willYouAttend: "هل ستحضر؟",
    numberGuests: "عدد المرافقين",
    yes: "نعم، بكل سرور",
    no: "لن أتمكن من الحضور",
    sendResponse: "إرسال الرد",
    saved: "شكراً لك. تم حفظ ردك على هذا الجهاز.",
    savedAt: "آخر حفظ",
    directions: "الحصول على الاتجاهات",
    backToEnvelope: "العودة إلى الظرف",
    days: "أيام",
    hours: "ساعات",
    minutes: "دقائق",
    seconds: "ثوانٍ",
    arrival: "الوصول",
    ceremony: "العقد",
    congratulations: "التهاني",
    refreshments: "الضيافة",
    arrivalNote: "يستقبل الضيوف بهدوء ومن دون استعجال.",
    ceremonyNote: "تبدأ المراسم في أجواء هادئة وأنيقة.",
    congratulationsNote: "لحظة قصيرة للتهاني والصور.",
    refreshmentsNote: "تتواصل الأمسية بأحاديث دافئة ومريحة.",
    dateLabel: "الجمعة، 5 يونيو 2026",
    locationLabel: "المعادي، القاهرة",
    timeLabel: "7:30 مساءً",
    dressLabel: "أنـيق بدرجات هادئة",
    ceremonyNoteLabel: "يفتح الباب الساعة 7:00 مساءً",
    receptionLabel: "بداية هادئة",
    heroJumpDetails: "التفاصيل",
    heroJumpLocation: "المكان",
    heroJumpRsvp: "تأكيد الحضور",
    footerLove: "بكل الحب، أسامة وفرح",
    footerDate: "05 · 06 · 2026",
    frameOne: "على الدرج",
    frameTwo: "ضوء الساحة",
    frameThree: "توهج داخلي",
    frameFour: "تحت القوس",
    frameFive: "مساء هادئ",
    frameSix: "لحظة رقيقة",
  },
} as const;

const galleryFramesByLang: Record<
  Lang,
  Array<{
    src: string;
    alt: string;
    caption: string;
    objectPosition?: string;
    span?: string;
  }>
> = {
  en: [
    {
      src: weddingPortraitStairs,
      alt: "Bride and groom portrait on the mosque stairs",
      caption: copy.en.frameOne,
      objectPosition: "center 40%",
    },
    {
      src: weddingPortraitCourtyard,
      alt: "Bride and groom portrait in the mosque courtyard",
      caption: copy.en.frameTwo,
      objectPosition: "center 35%",
    },
    {
      src: weddingPortraitInterior,
      alt: "Bride and groom portrait inside the mosque",
      caption: copy.en.frameThree,
      objectPosition: "center 32%",
    },
    {
      src: weddingPortraitArch,
      alt: "Bride and groom portrait under the mosque arch",
      caption: copy.en.frameFour,
      objectPosition: "center 38%",
    },
    {
      src: weddingPortraitCourtyard,
      alt: "Bride and groom portrait in the mosque courtyard",
      caption: copy.en.frameFive,
      objectPosition: "center 18%",
    },
    {
      src: weddingPortraitStairs,
      alt: "Bride and groom portrait on the mosque stairs",
      caption: copy.en.frameSix,
      objectPosition: "center 58%",
    },
  ],
  ar: [
    {
      src: weddingPortraitStairs,
      alt: "صورة للعروسين على الدرج",
      caption: copy.ar.frameOne,
      objectPosition: "center 40%",
    },
    {
      src: weddingPortraitCourtyard,
      alt: "صورة للعروسين في الساحة",
      caption: copy.ar.frameTwo,
      objectPosition: "center 35%",
    },
    {
      src: weddingPortraitInterior,
      alt: "صورة للعروسين داخل المسجد",
      caption: copy.ar.frameThree,
      objectPosition: "center 32%",
    },
    {
      src: weddingPortraitArch,
      alt: "صورة للعروسين تحت القوس",
      caption: copy.ar.frameFour,
      objectPosition: "center 38%",
    },
    {
      src: weddingPortraitCourtyard,
      alt: "صورة للعروسين في الساحة",
      caption: copy.ar.frameFive,
      objectPosition: "center 18%",
    },
    {
      src: weddingPortraitStairs,
      alt: "صورة للعروسين على الدرج",
      caption: copy.ar.frameSix,
      objectPosition: "center 58%",
    },
  ],
};

function formatCounter(value: number) {
  return String(value).padStart(2, "0");
}

export function ContentPage({
  onReturnToEnvelope,
}: {
  onReturnToEnvelope: () => void;
}) {
  const { lang, dir } = useI18n();
  const page = copy[lang as Lang];
  const guestName = useGuestName();
  const countdown = useCountdown(WEDDING.startISO);
  const [openFrame, setOpenFrame] = useState<{
    src: string;
    caption: string;
  } | null>(null);
  const [storedRsvp, setStoredRsvp] = useLocalStorage<RSVPState | null>(
    "invite_rsvp",
    null,
  );

  const [name, setName] = useState(storedRsvp?.name || guestName || "");
  const [attending, setAttending] = useState<"yes" | "no">(
    storedRsvp?.attending || "yes",
  );
  const [savedMessage, setSavedMessage] = useState<string | null>(
    storedRsvp ? page.saved : null,
  );
  const heroMessage = page.welcome;

  useEffect(() => {
    if (storedRsvp) {
      setSavedMessage(page.saved);
    }
  }, [page.saved, storedRsvp]);

  const galleryFrames = galleryFramesByLang[lang as Lang];

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload: RSVPState = {
      name: name.trim(),
      attending,
      guests: 1,
      savedAtISO: new Date().toISOString(),
    };
    setStoredRsvp(payload);
    setSavedMessage(page.saved);
  };

  return (
    <div
      id="top"
      dir={dir}
      className="relative isolate overflow-x-hidden text-ink-800"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bgc" />

      <main className="relative z-10 pb-20">
        <section className="px-4 pb-6 pt-20 md:pb-10 md:pt-24">
          <div className="mx-auto max-w-[1120px]">
            <div className="">
              <CornerFlower className="-left-8 -top-8 h-36 w-36 opacity-45 md:-left-10 md:-top-10 md:h-44 md:w-44" />
              <CornerFlower
                mirrored
                className="-right-8 -top-8 h-36 w-36 opacity-45 md:-right-10 md:-top-10 md:h-44 md:w-44"
              />
              <CornerFlower className="-left-8 -bottom-8 h-36 w-36 opacity-28 md:-left-10 md:-bottom-10 md:h-44 md:w-44" />
              <CornerFlower
                mirrored
                className="-right-8 -bottom-8 h-36 w-36 opacity-28 md:-right-10 md:-bottom-10 md:h-44 md:w-44"
              />

              <div className="absolute inset-0 " />

              <div className="relative px-5 py-10 md:px-10 md:py-14">
                <Reveal>
                  <div className="mx-auto max-w-4xl text-center">
                    <p className="text-[10px] uppercase tracking-[0.55em] text-[#8d7d67]">
                      {heroMessage}
                    </p>
                      <div className="mt-6 flex justify-center">
                        <div className="rounded-full border border-[#d8cdbf]/80 bg-white/76 p-4 shadow-[0_24px_60px_-30px_rgba(92,74,55,0.42)] overflow-hidden">
                          <img
                            src={weddingLogo}
                            alt="Wedding Logo"
                            className="w-52 md:w-64 aspect-square object-cover rounded-full select-none"
                          />
                        </div>
                      </div>

                    <p className="mt-6 text-xs uppercase tracking-[0.45em] text-[#8d7d67]">
                      {page.celebration}
                    </p>
                    <h1 className="mt-4 font-script text-5xl leading-none text-ink-800 md:text-7xl">
                      {page.couple}
                    </h1>

                    <div className="mt-5 flex items-center justify-center gap-3">
                      <span className="h-px w-14 bg-gradient-to-r from-transparent via-[#c9bbab] to-transparent md:w-20" />
                      <span className="text-xs uppercase tracking-[0.35em] text-ink-500 md:text-sm">
                        {page.dateLabel}
                      </span>
                      <span className="h-px w-14 bg-gradient-to-r from-transparent via-[#c9bbab] to-transparent md:w-20" />
                    </div>

                    <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-ink-600 md:text-base">
                      {page.tagline}
                    </p>

                    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                      <InvitationButton href="#details">
                        {page.heroJumpDetails}
                      </InvitationButton>
                      <InvitationButton href="#venue">
                        {page.heroJumpLocation}
                      </InvitationButton>
                      <InvitationButton href="#rsvp" variant="solid">
                        {page.heroJumpRsvp}
                      </InvitationButton>
                    </div>

                    <div className="mt-8 flex justify-center">
                      <SectionDivider />
                    </div>
                    <p className="mt-4 text-[11px] uppercase tracking-[0.42em] text-[#9c8d79]">
                      {page.scroll}
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        <FullWidthDivider />

        <SectionFrame
          eyebrow={page.saveTheDate}
          title={page.countdownTitle}
          subtitle={page.countdownLead}
        >
          {countdown.isPast ? (
            <Reveal>
              <div className="mx-auto max-w-xl rounded-[28px] border border-[#ddd2c4]/80 bg-white/92 px-6 py-8 text-center">
                <div className="text-2xl font-[400] tracking-[0.03em] text-ink-800">
                  {lang === "en" ? "It's time" : "حان الموعد"}
                </div>
              </div>
            </Reveal>
          ) : (
            <Reveal>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
                <StatCard
                  value={formatCounter(countdown.days)}
                  label={page.days}
                />
                <StatCard
                  value={formatCounter(countdown.hours)}
                  label={page.hours}
                />
                <StatCard
                  value={formatCounter(countdown.minutes)}
                  label={page.minutes}
                />
                <StatCard
                  value={formatCounter(countdown.seconds)}
                  label={page.seconds}
                />
              </div>
            </Reveal>
          )}
        </SectionFrame>

        <FullWidthDivider />

        <SectionFrame id="details" eyebrow={page.detailsEyebrow} title={page.detailsTitle}>
          <Reveal>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[22px] border border-[#ddd2c4]/70 bg-white/88 px-4 py-4">
                <div className="text-xs uppercase tracking-[0.32em] text-[#8d7d67]">
                  {lang === "en" ? "Venue" : "المكان"}
                </div>
                <div className="mt-2 text-sm font-[400] text-ink-800">
                  {WEDDING.venue.name[lang]}
                </div>
              </div>
              <div className="rounded-[22px] border border-[#ddd2c4]/70 bg-white/88 px-4 py-4">
                <div className="text-xs uppercase tracking-[0.32em] text-[#8d7d67]">
                  {lang === "en" ? "Time" : "الوقت"}
                </div>
                <div className="mt-2 text-sm font-[400] text-ink-800">
                  {WEDDING.timeLabel[lang]}
                </div>
              </div>
              <div className="rounded-[22px] border border-[#ddd2c4]/70 bg-white/88 px-4 py-4">
                <div className="text-xs uppercase tracking-[0.32em] text-[#8d7d67]">
                  {lang === "en" ? "Dress" : "الزي"}
                </div>
                <div className="mt-2 text-sm font-[400] text-ink-800">
                  {WEDDING.dressCode[lang]}
                </div>
              </div>
              <div className="rounded-[22px] border border-[#ddd2c4]/70 bg-white/88 px-4 py-4">
                <div className="text-xs uppercase tracking-[0.32em] text-[#8d7d67]">
                  {lang === "en" ? "Date" : "التاريخ"}
                </div>
                <div className="mt-2 text-sm font-[400] text-ink-800">
                  {WEDDING.dateLabel[lang]}
                </div>
              </div>
            </div>
          </Reveal>
        </SectionFrame>

        <FullWidthDivider />

        <SectionFrame
          id="venue"
          eyebrow={page.locationEyebrow}
          title={page.locationTitle}
          subtitle={page.locationLead}
        >
          <Reveal>
            <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
              <div className="overflow-hidden rounded-[30px] border border-[#ddd2c4]/80 bg-white/90 shadow-soft">
                <iframe
                  title={WEDDING.venue.name[lang]}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(WEDDING.venue.mapQuery)}&z=17&output=embed`}
                  className="h-[320px] w-full md:h-[460px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="rounded-[30px] border border-[#ddd2c4]/80 p-6 shadow-soft ">
                <div className="text-[10px] uppercase tracking-[0.45em] text-[#8d7d67]">
                  {page.locationTitle}
                </div>
                <div className="mt-3 text-3xl font-[400] tracking-[0.01em] text-ink-800">
                  {WEDDING.venue.name[lang]}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-ink-600 md:text-base">
                  {WEDDING.venue.shortNote[lang]}
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[22px] border border-[#ddd2c4]/70 bg-[#faf7f1] px-4 py-4">
                    <div className="text-xs uppercase tracking-[0.32em] text-[#8d7d67]">
                      {lang === "en" ? "Access" : "الوصول"}
                    </div>
                    <div className="mt-2 text-sm font-[400] text-ink-800">
                      {lang === "en"
                        ? "Easy arrival via Almaza"
                        : "وصول سهل عبر ألماظة"}
                    </div>
                  </div>
                  <div className="rounded-[22px] border border-[#ddd2c4]/70 bg-[#faf7f1] px-4 py-4">
                    <div className="text-xs uppercase tracking-[0.32em] text-[#8d7d67]">
                      {lang === "en" ? "Parking" : "المواقف"}
                    </div>
                    <div className="mt-2 text-sm font-[400] text-ink-800">
                      {lang === "en" ? "Available on site" : "متوفرة بالمكان"}
                    </div>
                  </div>
                </div>

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

        <FullWidthDivider />

        <SectionFrame
          eyebrow={page.galleryEyebrow}
          title={page.galleryTitle}
          subtitle={page.galleryLead}
        >
          <Reveal>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
              {galleryFrames.map((frame) => (
                <PhotoFrame
                  key={frame.caption}
                  src={frame.src}
                  alt={frame.alt}
                  caption={frame.caption}
                  onClick={() =>
                    setOpenFrame({ src: frame.src, caption: frame.caption })
                  }
                  objectPosition={frame.objectPosition}
                />
              ))}
            </div>
          </Reveal>
        </SectionFrame>

        <FullWidthDivider />

        <SectionFrame
          id="rsvp"
          eyebrow={page.rsvpEyebrow}
          title={page.rsvpTitle}
          subtitle={page.rsvpLead}
        >
          <Reveal>
            <div className="mx-auto max-w-2xl">
              <form
                onSubmit={handleSubmit}
                className="space-y-4 rounded-[30px] border border-[#ddd2c4]/80 bg-white/92 p-6 shadow-soft md:p-8"
              >
                <div className="grid gap-2 text-start">
                  <label className="text-xs uppercase tracking-[0.32em] text-[#8d7d67]">
                    {page.fullName}
                  </label>
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                    dir={dir}
                    placeholder={page.fullName}
                    className="w-full rounded-[18px] border border-[#ddd2c4]/80 bg-[#faf7f1] px-4 py-3 text-sm text-ink-800 outline-none transition focus:border-[#b9ab98] focus:ring-2 focus:ring-[#b9ab98]/20"
                  />
                </div>

                <div className="grid gap-2 text-start">
                  <div className="text-xs uppercase tracking-[0.32em] text-[#8d7d67]">
                    {page.willYouAttend}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <InvitationButton
                      type="button"
                      onClick={() => setAttending("yes")}
                      variant={attending === "yes" ? "solid" : "ghost"}
                    >
                      {page.yes}
                    </InvitationButton>
                    <InvitationButton
                      type="button"
                      onClick={() => setAttending("no")}
                      variant={attending === "no" ? "solid" : "ghost"}
                    >
                      {page.no}
                    </InvitationButton>
                  </div>
                </div>

                <div className="pt-2">
                  <CopyButton type="submit">{page.sendResponse}</CopyButton>
                </div>

                {savedMessage ? (
                  <div className="rounded-[22px] border border-[#ddd2c4]/70 bg-[#faf7f1] px-4 py-3 text-sm text-ink-700">
                    {savedMessage}
                  </div>
                ) : null}

                {storedRsvp ? (
                  <div className="text-xs tracking-wide text-ink-400">
                    {page.savedAt}:{" "}
                    {lang === "en"
                      ? new Date(storedRsvp.savedAtISO).toLocaleString()
                      : new Date(storedRsvp.savedAtISO).toLocaleString("ar-EG")}
                  </div>
                ) : null}
              </form>
            </div>
          </Reveal>
        </SectionFrame>

        <footer className="px-4 pt-6">
          <div className="mx-auto max-w-[1120px]">
            <div className="rounded-[36px] px-5 py-8 text-center">
              <SectionDivider />
              <p className="mt-5 text-lg font-[400] text-ink-800">
                {page.footerLove}
              </p>
              <p className="mt-2 text-[11px] uppercase tracking-[0.45em] text-[#8d7d67]">
                {page.footerDate}
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <CopyButton onClick={onReturnToEnvelope}>
                  {lang === "en" ? "Close the Envelope" : "أغلق الظرف"}
                </CopyButton>
              </div>
            </div>
          </div>
        </footer>
      </main>

      <Lightbox
        open={!!openFrame}
        src={openFrame?.src}
        alt={openFrame?.caption || ""}
        onClose={() => setOpenFrame(null)}
        closeLabel={lang === "en" ? "Close" : "إغلاق"}
      />
    </div>
  );
}
