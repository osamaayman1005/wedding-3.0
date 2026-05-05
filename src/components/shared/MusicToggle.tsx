import { useEffect, useRef, useState } from "react";
import { useI18n } from "../../context/I18nContext";
import { t } from "../../i18n/content";

const AUDIO_SRC = `${import.meta.env.BASE_URL}audio/music.mp3`;
const SESSION_KEY = "invite_music_from_envelope";

let sharedAudio: HTMLAudioElement | null = null;

function consumeLaunchMusicFlag() {
  try {
    const shouldStart = sessionStorage.getItem(SESSION_KEY) === "true";
    sessionStorage.removeItem(SESSION_KEY);
    return shouldStart;
  } catch {
    return false;
  }
}

function getSharedAudio() {
  if (!sharedAudio) {
    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0.32;
    sharedAudio = audio;
  }

  return sharedAudio;
}

export function primeInvitationMusic() {
  try {
    sessionStorage.setItem(SESSION_KEY, "true");
  } catch {
    // ignore storage failures
  }
}

export function startInvitationMusic() {
  const audio = getSharedAudio();
  return audio.play();
}

export function stopInvitationMusic() {
  sharedAudio?.pause();
}

export function MusicToggle() {
  const { lang } = useI18n();
  const [enabled, setEnabled] = useState<boolean>(() =>
    consumeLaunchMusicFlag(),
  );
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = getSharedAudio();
    audioRef.current = audio;
    return () => {
      stopInvitationMusic();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (enabled) {
      // Browsers require user gesture; if playback fails, we keep the toggle on
      // and allow retry on next interaction.
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [enabled]);

  // Reduced motion preference often correlates with reduced audio desire;
  // we still allow manual override via the toggle.
  const label = enabled ? t(lang, "musicOn") : t(lang, "musicOff");

  return (
    <button
      type="button"
      onClick={() => setEnabled((v) => !v)}
      className={`
        glass-stable inline-flex items-center rounded-full px-3 py-2 text-xs tracking-wide transition-all duration-300 backdrop-blur-sm ring-1
        ${
          enabled
            ? "btn-primary-color shadow-md ring-transparent" // Your custom Primary class
            : "bg-ivory/75 text-ink-700 ring-ink-200/70 hover:bg-ivory/95" // Original state
        }
      `}
      aria-pressed={enabled}
      aria-label={label}
    >
      {/* Visual status dot */}
      <span
        className={`me-2 h-1.5 w-1.5 rounded-full transition-colors ${
          enabled ? "bg-green-400 animate-pulse" : "bg-ink-400"
        }`}
      />

      {label}
    </button>
  );
}
