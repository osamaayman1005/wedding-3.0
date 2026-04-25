import { useEffect, useState, type FormEvent } from "react";
import { useCountdown } from "../../../hooks/useCountdown";
import { useGuestName } from "../../../hooks/useGuestName";
import { useI18n } from "../../../context/I18nContext";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { WEDDING } from "../../../config/event";
import weddingPortraitArch from "../../../assets/mosque/wedding-portrait-arch.jpg";
import weddingPortraitCourtyard from "../../../assets/mosque/wedding-portrait-courtyard.jpg";
import weddingPortraitInterior from "../../../assets/mosque/wedding-portrait-interior.jpg";
import weddingPortraitStairs from "../../../assets/mosque/wedding-portrait-stairs.jpg";
import { content } from "../../../data/Content";
import { FullWidthDivider } from "./components";
import { HeroSection } from "./components/sections/HeroSection";
import { CountDownSection } from "./components/sections/CountDownSection";
import { DetailsSection } from "./components/sections/DetailsSection";
import { LocationSection } from "./components/sections/LocationSection";
import { GallerySection } from "./components/sections/GallerySection";
import { RsvpSection } from "./components/sections/RsvpSection";
import { FooterSection } from "./components/sections/FooterSection";
import  background  from "../../../assets/Invitation-background.jpeg";

type RSVPState = {
  name: string;
  attending: "yes" | "no";
  guests: number;
  savedAtISO: string;
};

type Lang = "en" | "ar";

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
      caption: content.en.frameOne,
      objectPosition: "center 40%",
    },
    {
      src: weddingPortraitCourtyard,
      alt: "Bride and groom portrait in the mosque courtyard",
      caption: content.en.frameTwo,
      objectPosition: "center 35%",
    },
    {
      src: weddingPortraitInterior,
      alt: "Bride and groom portrait inside the mosque",
      caption: content.en.frameThree,
      objectPosition: "center 32%",
    },
    {
      src: weddingPortraitArch,
      alt: "Bride and groom portrait under the mosque arch",
      caption: content.en.frameFour,
      objectPosition: "center 38%",
    },
    {
      src: weddingPortraitCourtyard,
      alt: "Bride and groom portrait in the mosque courtyard",
      caption: content.en.frameFive,
      objectPosition: "center 18%",
    },
    {
      src: weddingPortraitStairs,
      alt: "Bride and groom portrait on the mosque stairs",
      caption: content.en.frameSix,
      objectPosition: "center 58%",
    },
  ],
  ar: [
    {
      src: weddingPortraitStairs,
      alt: "صورة للعروسين على الدرج",
      caption: content.ar.frameOne,
      objectPosition: "center 40%",
    },
    {
      src: weddingPortraitCourtyard,
      alt: "صورة للعروسين في الساحة",
      caption: content.ar.frameTwo,
      objectPosition: "center 35%",
    },
    {
      src: weddingPortraitInterior,
      alt: "صورة للعروسين داخل المسجد",
      caption: content.ar.frameThree,
      objectPosition: "center 32%",
    },
    {
      src: weddingPortraitArch,
      alt: "صورة للعروسين تحت القوس",
      caption: content.ar.frameFour,
      objectPosition: "center 38%",
    },
    {
      src: weddingPortraitCourtyard,
      alt: "صورة للعروسين في الساحة",
      caption: content.ar.frameFive,
      objectPosition: "center 18%",
    },
    {
      src: weddingPortraitStairs,
      alt: "صورة للعروسين على الدرج",
      caption: content.ar.frameSix,
      objectPosition: "center 58%",
    },
  ],
};

export function ContentPage({
  onReturnToEnvelope,
}: {
  onReturnToEnvelope: () => void;
}) {
  const { lang, dir } = useI18n();
  const page = content[lang as Lang];
  const guestName = useGuestName();
  const countdown = useCountdown(WEDDING.startISO);
  const [setOpenFrame] = useState<{
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
      <main className="relative z-10 pb-20">
        <HeroSection page={page} />

        <FullWidthDivider />

        <CountDownSection page={page} countdown={countdown} lang={lang} />

        <FullWidthDivider />

        <DetailsSection page={page} lang={lang} WEDDING={WEDDING} />

        <FullWidthDivider />

        <LocationSection page={page} lang={lang} WEDDING={WEDDING} />

        <FullWidthDivider />

        <GallerySection
          page={page}
          galleryFrames={galleryFrames}
          onOpenFrame={setOpenFrame}
        />

        <FullWidthDivider />

        <RsvpSection
          page={page}
          name={name}
          setName={setName}
          attending={attending}
          setAttending={setAttending}
          handleSubmit={handleSubmit}
          savedMessage={savedMessage}
          storedRsvp={storedRsvp}
          lang={lang}
        />

        <FooterSection
          page={page}
          onReturnToEnvelope={onReturnToEnvelope}
          lang={lang}
        />
      </main>
    </div>
  );
}
