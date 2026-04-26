import { useMemo } from "react";

function sanitizeGuestName(raw: string) {
  const trimmed = raw.trim().slice(0, 40);
  // Keep letters/numbers/spaces and basic Arabic range.
  const safe = trimmed.replace(/[^\p{L}\p{N}\s\u0600-\u06FF'-]/gu, "");
  return safe || "";
}

export function useGuestName() {
  return useMemo(() => {
    const url = new URL(window.location.href);
    const guest =
      url.searchParams.get("guest") || url.searchParams.get("g") || "";
    return sanitizeGuestName(guest);
  }, []);
}
