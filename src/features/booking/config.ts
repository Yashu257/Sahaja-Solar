export const BOOKING_CONFIG = {
  timezone: 'Asia/Kolkata',
  timezoneLabel: 'IST (Indian Standard Time)',
  workingDays: [1, 2, 3, 4, 5, 6], // 1=Mon, 6=Sat
  workingHours: {
    startHour: 9, // 09:00 AM
    endHour: 18, // 06:00 PM
  },
  slotDurationMins: 60,
  minimumNoticeHours: 4,
  maximumAdvanceDays: 30,
  blockedDates: [] as string[], // YYYY-MM-DD format
  notificationEmail: 'sahajasolar@gmail.com',
  consultationTypes: [
    {
      id: 'phone' as const,
      title: 'PHONE CONSULTATION',
      description: 'Speak directly with a Sahaja Solar technical advisor about your rooftop requirements.',
      note: 'Ideal for initial feasibility and estimate discussions.',
    },
    {
      id: 'site_visit' as const,
      title: 'SITE VISIT REQUEST',
      description: 'Request a discussion about arranging an on-site rooftop measurement and engineering evaluation.',
      note: 'Arrangements will be reviewed and confirmed by our engineering team.',
    },
  ],
};
