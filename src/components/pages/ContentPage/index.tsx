import { useState, type FormEvent } from "react";
import { useCountdown } from "../../../hooks/useCountdown";
import { useGuestName } from "../../../hooks/useGuestName";
import { useI18n } from "../../../context/I18nContext";
import { WEDDING } from "../../../config/event";
import engagementPortrait from "../../../assets/wedding/engagment.jpg";
import fathaReadingPortrait from "../../../assets/wedding/fatha-reading.jpg";
import firstMeetingPortrait from "../../../assets/wedding/First-meet.jpeg";
import justUsPortrait from "../../../assets/wedding/Just-us.jpg";
import { content } from "../../../data/Content";
import { FullWidthDivider } from "./components";
import { HeroSection } from "./components/sections/HeroSection";
import { CountDownSection } from "./components/sections/CountDownSection";
import { DetailsSection } from "./components/sections/DetailsSection";
import { LocationSection } from "./components/sections/LocationSection";
import { GallerySection } from "./components/sections/GallerySection";
import { RsvpSection } from "./components/sections/RsvpSection";
import { FooterSection } from "./components/sections/FooterSection";
import { sendRsvp } from "../../../api/rsvp";

type RSVPState = {
  name: string;
  attending: "yes" | "no";
  guests: number;
  savedAtISO: string;
  phone?: string;
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
      src: firstMeetingPortrait,
      alt: "Bride and groom portrait inside the mosque",
      caption: content.en.frameThree,
      objectPosition: "center 32%",
    },
    {
      src: justUsPortrait,
      alt: "Bride and groom portrait under the mosque arch",
      caption: content.en.frameFour,
      objectPosition: "center 38%",
    },
    {
      src: fathaReadingPortrait,
      alt: "Bride and groom portrait in the mosque courtyard",
      caption: content.en.frameFive,
      objectPosition: "center 18%",
    },
    {
      src: engagementPortrait,
      alt: "Bride and groom portrait on the mosque stairs",
      caption: content.en.frameSix,
      objectPosition: "center 58%",
    },
  ],
  ar: [
    {
      src: firstMeetingPortrait,
      alt: "صورة للعروسين داخل المسجد",
      caption: content.ar.frameThree,
      objectPosition: "center 32%",
    },
    {
      src: justUsPortrait,
      alt: "صورة للعروسين تحت القوس",
      caption: content.ar.frameFour,
      objectPosition: "center 38%",
    },
    {
      src: fathaReadingPortrait,
      alt: "صورة للعروسين في الساحة",
      caption: content.ar.frameFive,
      objectPosition: "center 18%",
    },
    {
      src: engagementPortrait,
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

  const [name, setName] = useState(guestName || "");
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [phone, setPhone] = useState("");
  const [savedMessage, setSavedMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const galleryFrames = galleryFramesByLang[lang as Lang];

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const payload: RSVPState = {
      name: name.trim(),
      attending,
      guests: 1,
      phone: phone.trim(),
      savedAtISO: new Date().toISOString(),
    };

    try {
      await sendRsvp({
        name: payload.name,
        phone: payload.phone || "",
        response: payload.attending,
      });
      setSavedMessage(page.saved);
    } catch (err) {
      // Keep UX smooth; log the error for debugging

      console.error("RSVP submission failed", err);
      // Still acknowledge the user's action (no persistent caching)
      setSavedMessage(page.saved);
    } finally {
      setIsSubmitting(false);
    }
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
          phone={phone}
          setPhone={setPhone}
          setName={setName}
          attending={attending}
          setAttending={setAttending}
          handleSubmit={handleSubmit}
          savedMessage={savedMessage}
          isSubmitting={isSubmitting}
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
