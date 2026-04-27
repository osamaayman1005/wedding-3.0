import { useEffect, useRef } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useI18n } from "../../context/I18nContext";
import { t } from "../../i18n/content";

const AUDIO_SRC = `${import.meta.env.BASE_URL}audio/ambient.wav`;

export function MusicToggle() {
  const { lang } = useI18n();
  const [enabled, setEnabled] = useLocalStorage<boolean>("invite_music", false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0.32;
    audioRef.current = audio;
    return () => {
      audio.pause();
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
        inline-flex items-center rounded-full px-3 py-2 text-xs tracking-wide transition-all duration-300 backdrop-blur-sm ring-1
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
