export const WEDDING = {
  couple: {
    en: { groom: 'Osama', bride: 'Farah' },
    ar: { groom: 'أسامة', bride: 'فرح' },
  },
  venue: {
    name: {
      en: 'Al Aly Al Azeem Mosque, Almaza',
      ar: 'مسجد العلي العظيم، ألماظة',
    },
    // Used for the map and directions. You can replace this with a more precise address or Plus Code.
    mapQuery: 'Al Aly Al Azeem Mosque, Almaza, Cairo',
    mapUrl: 'https://maps.app.goo.gl/nCZMfe9SKei71zaw8',
    shortNote: {
      en: 'A contemporary mosque with ceremonial halls and calm, community-focused architecture.',
      ar: 'مسجد حديث بطابع احتفالي وقاعات مناسبة وأجواء هادئة ومجتمعية.',
    },
  },
  // Cairo is commonly used for Egypt weddings; adjust to your exact start time.
  // June 5, 2026 (Friday)
  startISO: '2026-06-05T19:30:00+03:00',
  dateLabel: {
    en: 'Friday, June 5, 2026',
    ar: 'الجمعة ٥ يونيو ٢٠٢٦',
  },
  timeLabel: {
    en: '7:30 PM',
    ar: '٧:٣٠ مساءً',
  },
  dressCode: {
    en: 'Elegant, soft tones (optional)',
    ar: 'أنيق بألوان هادئة (اختياري)',
  },
} as const
