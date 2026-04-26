export const WEDDING = {
  couple: {
    en: { groom: "Osama", bride: "Farah" },
    ar: { groom: "أسامة", bride: "فرح" },
  },
  venue: {
    name: {
      en: "Al Aly Al Azeem Mosque, Almaza",
      ar: "مسجد العلي العظيم، ألماظة",
    },
  },
  // Cairo is commonly used for Egypt weddings; adjust to your exact start time.
  // June 5, 2026 (Friday)
  startISO: "2026-06-05T20:00:00+03:00",
  dateLabel: {
    en: "Friday, June 5, 2026",
    ar: "الجمعة ٥ يونيو ٢٠٢٦",
  },
  timeLabel: {
    en: "8:00 PM",
    ar: "٨:٠٠ مساءً",
  },
  dressCode: {
    en: "Formal and Soiree",
    ar: "رسمية وسواريه",
  },
} as const;
