"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"

/* ═══════════════════════════════════════════════════════
   רות רוזנברג — קליניקה לריפוי בעיסוק
   Design: Painterly / hand-drawn — SVG brushstrokes,
   Caveat handwriting font, wave dividers, organic shapes.
   No emojis. Inline styles only.
   ═══════════════════════════════════════════════════════ */

const C = {
  name: "רות רוזנברג",
  title: "קליניקה לריפוי בעיסוק",
  tagline: "לגדול בקצב שלהם.\nבדרך שלהם.",
  subtitle: "ריפוי בעיסוק התפתחותי לילדים — בגישה טבעית, חמה ומקצועית. כי כל ילד מתפתח בדרך הייחודית שלו.",
  heroLabel: "ריפוי בעיסוק | התפתחות הילד | טיפול סנסורי",
  phone: "050-0000000",
  whatsapp: "972500000000",
  email: "ruth@example.com",
  address: "בית שמש",
  ctaText: "לקביעת פגישת היכרות",
  portrait: "/images/ruth-treatment.jpg",
  services: [
    {
      dot: "#B5EAD7",
      bg: "#E8F8F2",
      border: "#B5EAD7",
      title: "טיפול סנסורי",
      desc: "עבודה על עיבוד חושי — מגע, תנועה, שיווי משקל. עוזר לילדים שמרגישים מוצפים או שמחפשים גירויים.",
      iconKey: "wave",
    },
    {
      dot: "#FFDDE1",
      bg: "#FFF0F2",
      border: "#FFDDE1",
      title: "מוטוריקה עדינה",
      desc: "חיזוק שרירי כף היד, שיפור כתיבה, גזירה ומיומנויות יומיומיות — דרך משחק ויצירה.",
      iconKey: "star",
    },
    {
      dot: "#FFF1C1",
      bg: "#FFFBEB",
      border: "#FFF1C1",
      title: "קשב וריכוז",
      desc: "כלים מעשיים לשיפור יכולת הקשב, ארגון והתמודדות עם משימות — בבית ובכיתה.",
      iconKey: "circle",
    },
    {
      dot: "#E4DEFF",
      bg: "#F4F1FF",
      border: "#E4DEFF",
      title: "מוטוריקה גסה",
      desc: "שיפור תנועה, קואורדינציה ותכנון מוטורי — דרך פעילויות תנועתיות מהנות.",
      iconKey: "arrow",
    },
    {
      dot: "#A8C8D8",
      bg: "#DBE9F0",
      border: "#A8C8D8",
      title: "התפתחות כללית",
      desc: "הערכה וטיפול בעיכובים התפתחותיים — הבנת הצרכים הייחודיים של כל ילד.",
      iconKey: "heart",
    },
    {
      dot: "#B8A9C9",
      bg: "#E8E0F0",
      border: "#B8A9C9",
      title: "הדרכת הורים",
      desc: "כלים מעשיים להורים — איך להמשיך את העבודה בבית, בטבעיות ובלי לחץ.",
      iconKey: "house",
    },
  ],
  about: {
    headline: "הטיפול שמתחיל בהקשבה.",
    text: "אני מאמינה שכל ילד מגיע עם הכוחות שלו. התפקיד שלי הוא לא ״לתקן״ — אלא להבין מה הילד צריך כדי להרגיש בטוח, מסוגל ושמח. בקליניקה שלי העבודה נעשית דרך משחק, יצירה ותנועה — כי ככה ילדים לומדים הכי טוב.",
    bullets: [
      "גישה טבעית ולא רשמית — ילדים מרגישים בבית",
      "תכנית טיפול מותאמת אישית לכל ילד",
      "שיתוף פעולה צמוד עם ההורים והגננת/מורה",
      "קליניקה חמה ומאובזרת בציוד מקצועי",
    ],
  },
  tips: [
    {
      label: "וויסות",
      title: "וויסות רגשי — איך מתחילים",
      desc: "כלים פרקטיים לעזור לילד לזהות ולנהל את הרגשות שלו, בשגרה ובמצבי לחץ.",
    },
    {
      label: "הרגלים",
      title: "רכישת הרגלים בגיל הרך",
      desc: "כיצד בונים שגרות יציבות שמחזקות עצמאות ובטחון — בלי כפייה ובלי מאבקי כוח.",
    },
    {
      label: "עצמאות",
      title: "לתת לילד להוביל",
      desc: "למה ״להרפות\" ולאפשר לילד לנסות בעצמו — זו אחת ההשקעות הטובות ביותר בהתפתחות.",
    },
  ],
  formServices: [
    "הערכה התפתחותית",
    "טיפול סנסורי",
    "מוטוריקה עדינה / כתיבה",
    "קשב וריכוז",
    "הדרכת הורים",
    "אחר",
  ],
}

// ── Colors ──
const clr = {
  sage: "#8BA888",
  sageDark: "#6B8B69",
  sageLight: "#D4E4D1",
  lavender: "#B8A9C9",
  lavenderLight: "#E8E0F0",
  sand: "#D4C5A9",
  sandLight: "#F0EBE0",
  sky: "#A8C8D8",
  skyLight: "#DBE9F0",
  warmWhite: "#FDFAF6",
  cream: "#F7F3ED",
  peach: "#E8D0C0",
  mint: "#B5EAD7",
  mintLight: "#E8F8F2",
  blush: "#FFDDE1",
  blushLight: "#FFF0F2",
  butter: "#FFF1C1",
  butterLight: "#FFFBEB",
  lilac: "#E4DEFF",
  lilacLight: "#F4F1FF",
  textDark: "#3D3D3D",
  textMuted: "#6B7280",
  textLight: "#9CA3AF",
  white: "#FFFFFF",
  border: "#E8E2DA",
}

// ── Animations ──
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
}
const scaleIn = {
  hidden: { opacity: 0, scale: 0.93 },
  visible: (i: number = 0) => ({
    opacity: 1, scale: 1,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
}

// ── SVG Decorative Components ──

function Brushstroke({ style }: { style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 420 90" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ position: "absolute", pointerEvents: "none", ...style }}>
      <path
        d="M10 55 C 60 20, 120 70, 200 45 C 280 20, 340 60, 410 38"
        stroke={clr.sage} strokeWidth="38" strokeLinecap="round"
        strokeLinejoin="round" opacity="0.10"
      />
      <path
        d="M30 62 C 90 30, 160 65, 230 48 C 300 30, 360 55, 400 44"
        stroke={clr.mint} strokeWidth="16" strokeLinecap="round"
        strokeLinejoin="round" opacity="0.07"
      />
    </svg>
  )
}

function StarDoodle({ size = 36, color = clr.lavender, style }: { size?: number; color?: string; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none"
      xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", pointerEvents: "none", ...style }}>
      <path
        d="M18 4 L20.2 13.8 L30 12 L22.5 19.2 L26 29 L18 23.4 L10 29 L13.5 19.2 L6 12 L15.8 13.8 Z"
        stroke={color} strokeWidth="1.5" fill="none" opacity="0.55"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CircleDoodle({ size = 44, color = clr.sage, style }: { size?: number; color?: string; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none"
      xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", pointerEvents: "none", ...style }}>
      <ellipse cx="22" cy="22" rx="18" ry="16" stroke={color} strokeWidth="1.5"
        strokeDasharray="4 3" opacity="0.45" transform="rotate(-10 22 22)" />
    </svg>
  )
}

/* ── Animated brushstroke frame around the entire Hero ──
   4 layered paths drawn in sequence:
   1. peach  — the "body" of the brush, thick + visible (the main star)
   2. sage   — adds earthy depth behind the peach
   3. mint   — delicate shimmer on top
   4. lavender — fine leading edge, drawn last
   ease [0.25,0.1,0.25,1] = slow start, accelerate, slow finish = brush feel. */
function HeroFrame() {
  const d = [
    "M 55,45",
    "C 280,22  700,18  980,28",
    "C 1120,33 1270,38 1345,55",
    "C 1368,65 1372,120 1365,260",
    "C 1360,420 1368,620 1355,780",
    "C 1348,870 1340,910 1310,930",
    "C 1150,948  760,952  420,946",
    "C 230,943  90,938   45,918",
    "C 22,908   16,860   18,720",
    "C 20,560   14,330   55,45",
    "Z",
  ].join(" ")

  const common = {
    d,
    fill: "none",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  }

  const brushEase: [number, number, number, number] = [0.25, 0.1, 0.25, 1]

  return (
    <svg
      viewBox="0 0 1400 960"
      preserveAspectRatio="none"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      {/* ★ Layer 0 — PEACH — the prominent brush body, draws first */}
      <motion.path
        {...common}
        stroke="#E8D0C0"
        strokeWidth="14"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.58 }}
        transition={{ duration: 2.2, ease: brushEase, delay: 0.1 }}
      />
      {/* Layer 1 — sage, earthy depth */}
      <motion.path
        {...common}
        stroke="#8BA888"
        strokeWidth="7"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.30 }}
        transition={{ duration: 2.5, ease: brushEase, delay: 0.5 }}
      />
      {/* Layer 2 — mint, shimmer */}
      <motion.path
        {...common}
        stroke="#B5EAD7"
        strokeWidth="3.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.42 }}
        transition={{ duration: 2.8, ease: brushEase, delay: 0.8 }}
      />
      {/* Layer 3 — lavender, fine leading edge drawn last */}
      <motion.path
        {...common}
        stroke="#B8A9C9"
        strokeWidth="1.6"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.72 }}
        transition={{ duration: 3.1, ease: brushEase, delay: 1.1 }}
      />
    </svg>
  )
}

/* ── AnimatedBrushstroke — replaces static Brushstroke in Hero ──
   Two motion.path per stroke: thick peach body + thin sage edge,
   drawing left-to-right with a gentle easeOut. */
function AnimatedBrushstroke({ style, delay = 0 }: { style?: React.CSSProperties; delay?: number }) {
  return (
    <svg viewBox="0 0 420 90" fill="none"
      style={{ position: "absolute", pointerEvents: "none", ...style }}>
      {/* Wide peach body — the visible brushstroke */}
      <motion.path
        d="M10 55 C 60 20, 120 70, 200 45 C 280 20, 340 60, 410 38"
        stroke="#E8D0C0" strokeWidth="38" strokeLinecap="round" fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.28 }}
        transition={{ duration: 1.8, ease: "easeOut", delay }}
      />
      {/* Thin sage edge — painted on top for texture */}
      <motion.path
        d="M30 52 C 90 28, 160 62, 230 46 C 300 28, 360 52, 400 42"
        stroke="#8BA888" strokeWidth="9" strokeLinecap="round" fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.32 }}
        transition={{ duration: 2.0, ease: "easeOut", delay: delay + 0.3 }}
      />
    </svg>
  )
}

function WaveDivider({ flip = false, topColor, bottomColor }: { flip?: boolean; topColor: string; bottomColor: string }) {
  return (
    <div style={{ lineHeight: 0, background: topColor, transform: flip ? "scaleY(-1)" : "none" }}>
      <svg viewBox="0 0 1440 54" xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block", width: "100%" }} preserveAspectRatio="none">
        <path
          d="M0 27 C 180 54, 360 0, 540 27 C 720 54, 900 0, 1080 27 C 1260 54, 1380 10, 1440 27 L1440 54 L0 54 Z"
          fill={bottomColor}
        />
      </svg>
    </div>
  )
}

// ── Hand-drawn SVG icons per service ──
const ServiceIcons: Record<string, React.ReactNode> = {
  wave: (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <path d="M4 18 C8 10, 14 26, 18 18 C22 10, 28 26, 32 18"
        stroke={clr.sage} strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M4 26 C8 18, 14 34, 18 26 C22 18, 28 34, 32 26"
        stroke={clr.mint} strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.5" />
    </svg>
  ),
  star: (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <path d="M18 5 L20.5 14 L30 13 L23 19.5 L26 29 L18 24 L10 29 L13 19.5 L6 13 L15.5 14 Z"
        stroke="#E8829A" strokeWidth="1.8" strokeLinejoin="round" fill="none" />
    </svg>
  ),
  circle: (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <ellipse cx="18" cy="18" rx="12" ry="11" stroke={clr.butter} strokeWidth="2"
        strokeDasharray="5 3" transform="rotate(-8 18 18)" />
      <circle cx="18" cy="18" r="4" fill={clr.butter} opacity="0.5" />
    </svg>
  ),
  arrow: (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <path d="M8 22 C12 14, 20 10, 28 14" stroke={clr.lavender} strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M23 9 L28 14 L22 17" stroke={clr.lavender} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  ),
  heart: (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <path d="M18 28 C18 28, 6 20, 6 13 C6 9, 9 7, 12 7 C14.5 7, 16.5 8.5, 18 10.5 C19.5 8.5, 21.5 7, 24 7 C27 7, 30 9, 30 13 C30 20, 18 28, 18 28 Z"
        stroke={clr.sky} strokeWidth="1.8" fill="none" strokeLinejoin="round" />
    </svg>
  ),
  house: (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <path d="M6 18 L18 8 L30 18" stroke={clr.lavender} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <rect x="10" y="18" width="16" height="12" rx="2" stroke={clr.lavender} strokeWidth="1.8" fill="none" />
      <rect x="15" y="23" width="6" height="7" rx="1" stroke={clr.lavender} strokeWidth="1.4" fill="none" />
    </svg>
  ),
}

function Section({ children, id, style }: { children: React.ReactNode; id?: string; style?: React.CSSProperties }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <motion.section ref={ref} id={id} initial="hidden" animate={inView ? "visible" : "hidden"}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
      style={{ padding: "90px 24px", ...style }}>
      {children}
    </motion.section>
  )
}

function Wrap({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ maxWidth: 1060, margin: "0 auto", ...style }}>{children}</div>
}

/* ═══════════════════════════════════════
   MAIN
   ═══════════════════════════════════════ */
export default function LandingPage() {
  const [formData, setFormData] = useState({ name: "", phone: "", service: "" })
  const [sent, setSent] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", h)
    return () => window.removeEventListener("scroll", h)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.phone) return alert("נא למלא שם וטלפון")
    try {
      // @ts-ignore
      if (typeof window !== "undefined" && window.fbq) { // @ts-ignore
        window.fbq("track", "Lead")
      }
      setSent(true)
    } catch { alert("שגיאה, נסו שנית") }
  }

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })

  return (
    <div dir="rtl" style={{ fontFamily: "'Heebo', system-ui, sans-serif", color: clr.textDark, background: clr.warmWhite, overflowX: "hidden" }}>

      {/* ════════ HEADER ════════ */}
      <motion.header
        initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          padding: "0 28px", height: 64,
          background: scrolled ? `${clr.warmWhite}f0` : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? `1px solid ${clr.border}` : "none",
          transition: "all 0.3s", display: "flex", alignItems: "center", justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Hand-drawn logo mark */}
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
            <ellipse cx="17" cy="17" rx="13" ry="12" stroke={clr.sage} strokeWidth="2"
              strokeDasharray="6 3" transform="rotate(-6 17 17)" />
            <circle cx="17" cy="17" r="5" fill={clr.mint} opacity="0.7" />
          </svg>
          <div>
            <span style={{ fontSize: 14, fontWeight: 600, color: clr.textDark }}>{C.name}</span>
            <span style={{ fontSize: 11, color: clr.textMuted, display: "block", marginTop: -2 }}>{C.title}</span>
          </div>
        </div>
        <button onClick={() => scrollTo("contact")} style={{
          background: clr.sage, color: clr.white, border: "none",
          padding: "9px 22px", borderRadius: 20, fontSize: 13,
          fontWeight: 500, cursor: "pointer", fontFamily: "inherit",
          transition: "background 0.2s",
        }}
          onMouseOver={(e) => (e.currentTarget.style.background = clr.sageDark)}
          onMouseOut={(e) => (e.currentTarget.style.background = clr.sage)}
        >
          {C.ctaText}
        </button>
      </motion.header>

      {/* ════════ HERO ════════ */}
      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        background: `linear-gradient(160deg, #FFF0F2 0%, #E8F8F2 35%, #F4F1FF 65%, #FFFBEB 100%)`,
        padding: "110px 24px 0", position: "relative", overflow: "hidden",
      }}>
        {/* ── Animated brushstroke frame ── */}
        <HeroFrame />

        {/* ── Animated brushstrokes (replace static ones) ── */}
        <AnimatedBrushstroke style={{ top: "18%", right: "-4%", width: "55%" }} delay={1.2} />
        <AnimatedBrushstroke style={{ bottom: "22%", left: "-6%", width: "40%", transform: "scaleX(-1) rotate(12deg)" }} delay={1.6} />

        {/* ── Doodle decorations — animated, appear after frame finishes ── */}
        <motion.div
          style={{ position: "absolute", top: "22%", left: "8%", pointerEvents: "none" }}
          initial={{ opacity: 0, scale: 0.4, rotate: -28 }}
          animate={{ opacity: 1, scale: 1, rotate: -15 }}
          transition={{ duration: 1.1, ease: [0.34, 1.56, 0.64, 1], delay: 2.0 }}
        >
          <StarDoodle size={40} color={clr.lavender} style={{}} />
        </motion.div>

        <motion.div
          style={{ position: "absolute", top: "65%", right: "12%", pointerEvents: "none" }}
          initial={{ opacity: 0, scale: 0.4, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 20 }}
          transition={{ duration: 1.1, ease: [0.34, 1.56, 0.64, 1], delay: 2.4 }}
        >
          <StarDoodle size={28} color={clr.sage} style={{}} />
        </motion.div>

        <motion.div
          style={{ position: "absolute", bottom: "18%", left: "28%", pointerEvents: "none" }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 1.0, ease: "easeOut", delay: 2.2 }}
        >
          <CircleDoodle size={56} color={clr.blush} style={{}} />
        </motion.div>

        <motion.div
          style={{ position: "absolute", top: "30%", right: "30%", pointerEvents: "none" }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 1.0, ease: "easeOut", delay: 2.6 }}
        >
          <CircleDoodle size={38} color={clr.butter} style={{}} />
        </motion.div>

        {/* Soft blobs */}
        <div style={{ position: "absolute", top: "8%", right: "-8%", width: 450, height: 450, borderRadius: "50%", background: `${clr.lilacLight}80` }} />
        <div style={{ position: "absolute", bottom: "5%", left: "-6%", width: 350, height: 350, borderRadius: "50%", background: `${clr.mintLight}80` }} />

        <Wrap style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 60, alignItems: "center", position: "relative", zIndex: 2, paddingBottom: 80 }}>
          <div>
            {/* Badge — sticker style */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "7px 18px", borderRadius: "40% 60% 55% 45% / 50% 50% 60% 40%",
                background: `${clr.sage}14`, border: `1.5px solid ${clr.sage}30`,
                fontSize: 12, color: clr.sageDark, marginBottom: 24,
              }}>
              {C.heroLabel}
            </motion.div>

            {/* Tagline — Caveat handwriting font */}
            <motion.h1 initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.7 }}
              style={{
                fontFamily: "'Caveat', 'Secular One', sans-serif",
                fontSize: "clamp(2.6rem, 5vw, 4rem)",
                fontWeight: 700, lineHeight: 1.2, margin: "0 0 20px 0",
                color: clr.textDark, whiteSpace: "pre-line",
              }}>
              {C.tagline}
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }}
              style={{ fontSize: 17, lineHeight: 1.75, color: clr.textMuted, margin: "0 0 32px 0", maxWidth: 500 }}>
              {C.subtitle}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.5 }}
              style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <div style={{ position: "relative", display: "inline-block" }}>
                <button onClick={() => scrollTo("contact")} style={{
                  background: clr.sage, color: clr.white, border: "none",
                  padding: "13px 32px", borderRadius: 24, fontSize: 15,
                  fontWeight: 500, cursor: "pointer", fontFamily: "inherit",
                  boxShadow: `0 4px 16px ${clr.sage}30`, transition: "all 0.3s",
                  position: "relative", zIndex: 1,
                }}
                  onMouseOver={(e) => (e.currentTarget.style.background = clr.sageDark)}
                  onMouseOut={(e) => (e.currentTarget.style.background = clr.sage)}
                >
                  {C.ctaText}
                </button>
                {/* Wavy underline SVG */}
                <svg viewBox="0 0 160 10" style={{ position: "absolute", bottom: -10, right: 16, width: 130, pointerEvents: "none" }}>
                  <path d="M0 5 C20 1, 40 9, 60 5 C80 1, 100 9, 120 5 C135 2, 148 7, 160 5"
                    stroke={clr.sage} strokeWidth="2.2" fill="none" strokeLinecap="round" opacity="0.45" />
                </svg>
              </div>
              <a href={`https://wa.me/${C.whatsapp}?text=${encodeURIComponent("היי, אשמח לשמוע עוד על הקליניקה")}`}
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "13px 24px", borderRadius: 24,
                  border: `1.5px solid ${clr.border}`, background: clr.white,
                  color: clr.textDark, fontSize: 14, fontWeight: 500,
                  textDecoration: "none", fontFamily: "inherit",
                }}>
                WhatsApp
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.5 }}
              style={{ marginTop: 36, display: "flex", gap: 20, fontSize: 12, color: clr.textLight }}>
              {["טיפול בגישה טבעית", "תכנית אישית לכל ילד", "הדרכת הורים"].map((t) => (
                <span key={t} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <span style={{ color: clr.sage, fontSize: 14 }}>✓</span> {t}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Portrait — organic shape */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.8 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <div style={{ position: "relative" }}>
              {/* Decorative ring behind portrait */}
              <div style={{
                position: "absolute", inset: -12,
                borderRadius: "60% 40% 55% 45% / 45% 55% 40% 60%",
                border: `2px dashed ${clr.sage}30`,
              }} />
              <div style={{
                width: 280, maxWidth: "90%", aspectRatio: "3/4",
                borderRadius: "60% 40% 55% 45% / 45% 55% 40% 60%",
                overflow: "hidden",
                background: `linear-gradient(135deg, ${clr.mintLight}, ${clr.lilacLight})`,
                boxShadow: `0 16px 40px ${clr.sage}20`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: clr.textLight, fontSize: 13,
              }}>
                {/* Replace with: <img src={C.portrait} alt="רות בטיפול" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> */}
                תמונת רות
              </div>
            </div>
            <span style={{ fontSize: 12, color: clr.textLight, fontStyle: "italic" }}>באמצע מפגש — כי זה מה שמשנה</span>
          </motion.div>
        </Wrap>
      </section>

      {/* ── WAVE DIVIDER: hero → services ── */}
      <WaveDivider topColor={`linear-gradient(160deg, #FFF0F2 0%, #FFFBEB 100%)`} bottomColor={clr.white} />

      {/* ════════ SERVICES ════════ */}
      <Section id="services" style={{ background: clr.white, position: "relative", overflow: "hidden" }}>
        {/* Faint doodles in background */}
        <StarDoodle size={52} color={clr.butter} style={{ top: 30, left: 40, opacity: 0.4 }} />
        <CircleDoodle size={70} color={clr.mint} style={{ bottom: 40, right: 50, opacity: 0.3 }} />

        <Wrap>
          <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: 50 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: clr.sage, letterSpacing: "0.06em" }}>תחומי טיפול</span>
            <h2 style={{
              fontFamily: "'Caveat', 'Secular One', sans-serif",
              fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)",
              fontWeight: 700, color: clr.textDark, margin: "8px 0 0 0",
            }}>
              איך אני יכולה לעזור?
            </h2>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {C.services.map((s, i) => (
              <motion.div key={i} variants={scaleIn} custom={i} whileHover={{ y: -5, boxShadow: `0 8px 24px ${s.dot}60` }}
                style={{
                  padding: "30px 24px", borderRadius: 20,
                  background: s.bg,
                  border: `1.5px solid ${s.border}`,
                  transition: "all 0.3s",
                }}>
                <div style={{ marginBottom: 14 }}>
                  {ServiceIcons[s.iconKey]}
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: clr.textDark, margin: "0 0 8px 0" }}>{s.title}</h3>
                <p style={{ fontSize: 13.5, lineHeight: 1.7, color: clr.textMuted, margin: 0 }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </Wrap>
      </Section>

      {/* ── WAVE DIVIDER: services → about ── */}
      <WaveDivider topColor={clr.white} bottomColor={clr.cream} />

      {/* ════════ ABOUT ════════ */}
      <Section id="about" style={{ background: clr.cream, position: "relative", overflow: "hidden" }}>
        <Brushstroke style={{ top: "10%", left: "-5%", width: "50%", opacity: 0.6, transform: "rotate(-6deg) scaleX(-1)" }} />
        <StarDoodle size={32} color={clr.lavender} style={{ top: 60, right: 80 }} />

        <Wrap style={{ maxWidth: 760, textAlign: "center", position: "relative", zIndex: 2 }}>
          <motion.div variants={fadeUp}>
            <span style={{ fontSize: 12, fontWeight: 600, color: clr.lavender, letterSpacing: "0.06em" }}>קצת עליי</span>
            <h2 style={{
              fontFamily: "'Caveat', 'Secular One', sans-serif",
              fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
              fontWeight: 700, color: clr.textDark, margin: "8px 0 20px 0",
            }}>
              {C.about.headline}
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: clr.textMuted, margin: "0 0 30px 0" }}>
              {C.about.text}
            </p>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, textAlign: "right" }}>
            {C.about.bullets.map((b, i) => (
              <motion.div key={i} variants={fadeUp} custom={i + 1}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "14px 18px", borderRadius: 14,
                  background: clr.white, border: `1px solid ${clr.border}`,
                }}>
                <div style={{
                  width: 26, height: 26, borderRadius: 8, flexShrink: 0,
                  background: `${clr.sage}15`, display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ color: clr.sage, fontSize: 11 }}>✓</span>
                </div>
                <span style={{ fontSize: 13.5, color: clr.textDark }}>{b}</span>
              </motion.div>
            ))}
          </div>
        </Wrap>
      </Section>

      {/* ── WAVE DIVIDER: about → testimonials (coming soon) ── */}
      <WaveDivider topColor={clr.cream} bottomColor={clr.white} />

      {/* ════════ TESTIMONIALS — COMING SOON ════════ */}
      <Section style={{ background: clr.white, position: "relative", overflow: "hidden" }}>
        <CircleDoodle size={90} color={clr.mint} style={{ top: 20, left: 60, opacity: 0.25 }} />
        <StarDoodle size={44} color={clr.blush} style={{ bottom: 30, right: 80, opacity: 0.4 }} />

        <Wrap style={{ position: "relative", zIndex: 2 }}>
          <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: 40 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: clr.sky, letterSpacing: "0.06em" }}>מה אומרים ההורים</span>
            <h2 style={{
              fontFamily: "'Caveat', 'Secular One', sans-serif",
              fontSize: "clamp(1.7rem, 3vw, 2.4rem)",
              fontWeight: 700, color: clr.textDark, margin: "8px 0 0 0",
            }}>
              קולות מהקליניקה
            </h2>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {[
              { icon: "wave", bg: clr.mintLight, border: clr.mint, text: "עדויות מהורים יתווספו עם פתיחת הקליניקה", sub: "הקליניקה בדרך — בקרוב!" },
              { icon: "heart", bg: clr.blushLight, border: clr.blush, text: "רוצים להיות בין הראשונים? השאירו פרטים ונחזור אליכם.", sub: "משפחות ראשונות — בקדימות" },
              { icon: "star", bg: clr.butterLight, border: clr.butter, text: "כל ילד הוא עולם שלם. נחכה לשמוע על הילד שלכם.", sub: "שיחת היכרות ללא עלות" },
            ].map((card, i) => (
              <motion.div key={i} variants={scaleIn} custom={i}
                style={{
                  padding: "36px 28px", borderRadius: 24,
                  background: card.bg, border: `1.5px solid ${card.border}`,
                  textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
                }}>
                <div style={{ marginBottom: 4 }}>
                  {ServiceIcons[card.icon]}
                </div>
                <p style={{ fontSize: 14.5, lineHeight: 1.75, color: clr.textDark, margin: 0 }}>
                  {card.text}
                </p>
                <span style={{
                  display: "inline-block", padding: "5px 14px", borderRadius: 20,
                  background: clr.white, fontSize: 11.5, color: clr.textMuted,
                  fontWeight: 500, border: `1px solid ${clr.border}`,
                }}>
                  {card.sub}
                </span>
              </motion.div>
            ))}
          </div>
          {/* CTA beneath */}
          <motion.div variants={fadeUp} custom={4} style={{ textAlign: "center", marginTop: 36 }}>
            <button onClick={() => scrollTo("contact")} style={{
              background: "transparent", color: clr.sageDark, border: `2px solid ${clr.sage}`,
              padding: "11px 30px", borderRadius: 24, fontSize: 14,
              fontWeight: 500, cursor: "pointer", fontFamily: "inherit",
              transition: "all 0.3s",
            }}
              onMouseOver={(e) => { e.currentTarget.style.background = clr.sage; e.currentTarget.style.color = clr.white }}
              onMouseOut={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = clr.sageDark }}
            >
              להיות בין הראשונים
            </button>
          </motion.div>
        </Wrap>
      </Section>

      {/* ── WAVE DIVIDER: testimonials → tips ── */}
      <WaveDivider topColor={clr.white} bottomColor={clr.cream} />

      {/* ════════ TIPS ════════ */}
      <Section id="tips" style={{ background: clr.cream, position: "relative", overflow: "hidden" }}>
        <Brushstroke style={{ bottom: "5%", right: "-8%", width: "45%", opacity: 0.55, transform: "rotate(8deg)" }} />
        <CircleDoodle size={48} color={clr.lavender} style={{ top: 40, left: 100, opacity: 0.35 }} />

        <Wrap style={{ position: "relative", zIndex: 2 }}>
          <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: clr.lavender, letterSpacing: "0.06em" }}>מהקליניקה</span>
            <h2 style={{
              fontFamily: "'Caveat', 'Secular One', sans-serif",
              fontSize: "clamp(1.7rem, 3vw, 2.4rem)",
              fontWeight: 700, color: clr.textDark, margin: "8px 0 0 0",
            }}>
              טיפים ומאמרים
            </h2>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {C.tips.map((tip, i) => (
              <motion.div key={i} variants={scaleIn} custom={i} whileHover={{ y: -4 }}
                style={{
                  padding: "32px 28px", borderRadius: 20,
                  background: clr.white, border: `1px solid ${clr.border}`,
                  display: "flex", flexDirection: "column", gap: 12,
                  transition: "all 0.3s", cursor: "default",
                }}>
                <span style={{
                  fontSize: 11, fontWeight: 700, color: clr.sage,
                  letterSpacing: "0.08em", textTransform: "uppercase",
                }}>
                  {tip.label}
                </span>
                <h3 style={{
                  fontFamily: "'Caveat', sans-serif",
                  fontSize: 20, fontWeight: 700, color: clr.textDark, margin: 0, lineHeight: 1.3,
                }}>
                  {tip.title}
                </h3>
                <p style={{ fontSize: 13.5, lineHeight: 1.7, color: clr.textMuted, margin: 0 }}>
                  {tip.desc}
                </p>
                <span style={{
                  fontSize: 12, color: clr.sage, marginTop: 4, fontWeight: 500,
                  display: "flex", alignItems: "center", gap: 5,
                }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="5.5" stroke={clr.sage} strokeWidth="1.3" />
                    <path d="M7 4.5 V7 L8.5 8.5" stroke={clr.sage} strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                  בקרוב
                </span>
              </motion.div>
            ))}
          </div>
        </Wrap>
      </Section>

      {/* ── WAVE DIVIDER: tips → contact ── */}
      <WaveDivider topColor={clr.cream} bottomColor={clr.white} />

      {/* ════════ CONTACT ════════ */}
      <Section id="contact" style={{ background: clr.white, position: "relative", overflow: "hidden" }}>
        <StarDoodle size={36} color={clr.sage} style={{ top: 40, left: 60, opacity: 0.35 }} />
        <CircleDoodle size={60} color={clr.blush} style={{ bottom: 50, right: 60, opacity: 0.3 }} />

        <Wrap style={{ position: "relative", zIndex: 2 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 50, alignItems: "start" }}>
            <motion.div variants={fadeUp}>
              <span style={{ fontSize: 12, fontWeight: 600, color: clr.sage, letterSpacing: "0.06em" }}>יצירת קשר</span>
              <h2 style={{
                fontFamily: "'Caveat', 'Secular One', sans-serif",
                fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                fontWeight: 700, color: clr.textDark, margin: "8px 0 16px 0",
              }}>
                בואו נדבר על הילד שלכם.
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: clr.textMuted, margin: "0 0 32px 0" }}>
                השאירו פרטים ואחזור אליכם לשיחת היכרות קצרה — בלי התחייבות.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { label: C.phone, iconPath: "M6 2C4.9 2 4 2.9 4 4v1C4 11.6 9.4 17 16 17h1c1.1 0 2-.9 2-2v-2.5c0-.4-.2-.7-.5-.9l-3-1.5c-.4-.2-.9-.1-1.2.2L13 11.5C11.5 10.8 10.2 9.5 9.5 8l1.2-1.3c.3-.3.4-.8.2-1.2L9.4 2.5C9.2 2.2 8.9 2 8.5 2H6z" },
                  { label: C.email, iconPath: "M3 5a1 1 0 011-1h12a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V5zm2 1v.5l5 3.5 5-3.5V6H5zm0 2.5V14h10V8.5l-5 3.5-5-3.5z" },
                  { label: C.address, iconPath: "M9 2C6.24 2 4 4.24 4 7c0 3.75 5 11 5 11s5-7.25 5-11c0-2.76-2.24-5-5-5zm0 6.5C8.17 8.5 7.5 7.83 7.5 7S8.17 5.5 9 5.5 10.5 6.17 10.5 7 9.83 8.5 9 8.5z" },
                ].map(({ label, iconPath }) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 12,
                      background: `${clr.sage}12`, border: `1px solid ${clr.sage}25`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d={iconPath} fill={clr.sage} />
                      </svg>
                    </div>
                    <span style={{ fontSize: 14, color: clr.textDark }}>{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeUp} custom={1}>
              {sent ? (
                <div style={{ padding: 50, textAlign: "center", borderRadius: 24, background: clr.mintLight, border: `1.5px solid ${clr.mint}` }}>
                  <div style={{ marginBottom: 16, display: "flex", justifyContent: "center" }}>
                    {ServiceIcons["heart"]}
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 600, color: clr.textDark, margin: "0 0 8px 0" }}>תודה! הפרטים נשלחו.</h3>
                  <p style={{ color: clr.textMuted, fontSize: 14 }}>אחזור אליכם בהקדם.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{
                  padding: "36px 32px", borderRadius: 24,
                  background: clr.cream, border: `1px solid ${clr.border}`,
                  display: "flex", flexDirection: "column", gap: 16,
                }}>
                  <h3 style={{ fontSize: 18, fontWeight: 600, color: clr.textDark, margin: 0 }}>פגישת היכרות ראשונית</h3>
                  {[
                    { name: "name", label: "שם ההורה", type: "text", ph: "השם שלכם" },
                    { name: "phone", label: "טלפון", type: "tel", ph: "050-0000000" },
                  ].map(({ name, label, type, ph }) => (
                    <div key={name}>
                      <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: clr.textDark, marginBottom: 5 }}>{label}</label>
                      <input type={type} placeholder={ph} value={formData[name as keyof typeof formData]}
                        onChange={(e) => setFormData((p) => ({ ...p, [name]: e.target.value }))}
                        style={{
                          width: "100%", padding: "12px 14px", borderRadius: 12,
                          border: `1.5px solid ${clr.border}`, background: clr.white,
                          fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box",
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = clr.sage)}
                        onBlur={(e) => (e.currentTarget.style.borderColor = clr.border)}
                      />
                    </div>
                  ))}
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: clr.textDark, marginBottom: 5 }}>נושא הפנייה</label>
                    <select value={formData.service} onChange={(e) => setFormData((p) => ({ ...p, service: e.target.value }))}
                      style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: `1.5px solid ${clr.border}`, background: clr.white, fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box", cursor: "pointer" }}>
                      <option value="">בחרו נושא</option>
                      {C.formServices.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <button type="submit" style={{
                    width: "100%", padding: "14px", borderRadius: 16, border: "none",
                    background: clr.sage, color: clr.white, fontSize: 15, fontWeight: 500,
                    fontFamily: "inherit", cursor: "pointer", transition: "all 0.3s",
                  }}
                    onMouseOver={(e) => (e.currentTarget.style.background = clr.sageDark)}
                    onMouseOut={(e) => (e.currentTarget.style.background = clr.sage)}>
                    שליחה
                  </button>
                  <p style={{ fontSize: 11, color: clr.textLight, textAlign: "center", margin: 0 }}>הפרטים שלכם מאובטחים ולא יועברו לגורם שלישי.</p>
                </form>
              )}
            </motion.div>
          </div>
        </Wrap>
      </Section>

      {/* ════════ FOOTER ════════ */}
      <footer style={{ padding: "32px 24px", background: clr.textDark, color: `${clr.white}70` }}>
        <Wrap style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12 }}>© {new Date().getFullYear()} {C.name} — {C.title}</span>
          <span style={{ fontSize: 12 }}>{C.phone}</span>
        </Wrap>
      </footer>

      {/* ════════ FLOATING WHATSAPP ════════ */}
      <motion.a href={`https://wa.me/${C.whatsapp}`} target="_blank" rel="noopener noreferrer"
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        style={{
          position: "fixed", bottom: 24, left: 24, zIndex: 100,
          padding: "12px 20px", borderRadius: 28,
          background: "#25D366", color: clr.white,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 600, textDecoration: "none",
          fontFamily: "inherit", letterSpacing: "0.02em",
          boxShadow: "0 4px 14px rgba(37,211,102,0.35)",
        }}>
        WhatsApp
      </motion.a>

      {/* ════════ RESPONSIVE ════════ */}
      <style jsx global>{`
        @media (max-width: 768px) {
          section > div > div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          section { padding: 60px 18px !important; }
          h1 { font-size: 2.2rem !important; }
          h2 { font-size: 1.8rem !important; }
        }
      `}</style>
    </div>
  )
}
