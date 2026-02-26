import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'רות רוזנברג | קליניקה לריפוי בעיסוק לילדים — בית שמש',
  description: 'ריפוי בעיסוק התפתחותי לילדים בבית שמש. טיפול סנסורי, מוטוריקה, קשב וריכוז. גישה חמה, טבעית ומקצועית. לתיאום פגישת היכרות ראשונה.',
  keywords: 'ריפוי בעיסוק, ריפוי בעיסוק ילדים, טיפול סנסורי, מוטוריקה עדינה, קשב וריכוז, התפתחות ילדים, בית שמש',
  openGraph: {
    title: 'רות רוזנברג — ריפוי בעיסוק לילדים',
    description: 'הילד שלך יכול לפרוח — צריך רק את הסביבה הנכונה. גישה חמה ומקצועית, בית שמש.',
    locale: 'he_IL',
    type: 'website',
  },
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700&family=Secular+One&family=Caveat:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
