import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'רות רוזנברג | קליניקה לריפוי בעיסוק',
  description: 'ריפוי בעיסוק התפתחותי לילדים — בגישה טבעית, חמה ומקצועית.',
  keywords: 'ריפוי בעיסוק, ריפוי בעיסוק ילדים, טיפול סנסורי, מוטוריקה עדינה, בית שמש',
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="he" dir="rtl"><body style={{ margin: 0, padding: 0 }}>{children}</body></html>)
}
