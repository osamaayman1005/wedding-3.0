import { LanguageToggle } from "./LanguageToggle";
import { MusicToggle } from "./MusicToggle";

export function TopBar() {
  return (
    <div className="fixed left-0 right-0 top-3 z-40 px-4 sm:top-4">
      <div className="mx-auto flex max-w-[1120px] justify-end">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#ddd2c4]/80 bg-white/78 px-2 py-2 shadow-soft backdrop-blur-xl">
          <MusicToggle />
          <LanguageToggle />
        </div>
      </div>
    </div>
  );
}
