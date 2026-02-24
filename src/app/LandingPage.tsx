"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"

/* ═══════════════════════════════════════════════════════
   רות רוזנברג — קליניקה לריפוי בעיסוק
   Design: Soft pastels, nature tones, child-friendly,
   warm & authentic — NOT corporate
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
      icon: "🧩",
      title: "טיפול סנסורי",
      desc: "עבודה על עיבוד חושי — מגע, תנועה, שיווי משקל. עוזר לילדים שמרגישים מוצפים או שמחפשים גירויים.",
    },
    {
      icon: "✋",
      title: "מוטוריקה עדינה",
      desc: "חיזוק שרירי כף היד, שיפור כתיבה, גזירה ומיומנויות יומיומיות — דרך משחק ויצירה.",
    },
    {
      icon: "🎯",
      title: "קשב וריכוז",
      desc: "כלים מעשיים לשיפור יכולת הקשב, ארגון והתמודדות עם משימות — בבית ובכיתה.",
    },
    {
      icon: "🤸",
      title: "מוטוריקה גסה",
      desc: "שיפור תנועה, קואורדינציה ותכנון מוטורי — דרך פעילויות תנועתיות מהנות.",
    },
    {
      icon: "👶",
      title: "התפתחות כללית",
      desc: "הערכה וטיפול בעיכובים התפתחותיים — הבנת הצרכים הייחודיים של כל ילד.",
    },
    {
      icon: "👨‍👩‍👧",
      title: "הדרכת הורים",
      desc: "כלים מעשיים להורים — איך להמשיך את העבודה בבית, בטבעיות ובלי לחץ.",
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
  testimonials: [
    { text: "תוך חודש וחצי ראינו שינוי משמעותי בכתיבה. הילד שלי סוף סוף רוצה לצייר!", name: "מ., אמא לבן 5" },
    { text: "רות פשוט מבינה ילדים. הבת שלי ממש מחכה לטיפול כל שבוע.", name: "ש., אמא לבת 6" },
    { text: "ההדרכה שקיבלנו כהורים שינתה לנו את הבית. פתאום הבנו מה הילד צריך.", name: "י., אבא לבן 4" },
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

// ── Colors — Soft pastels, nature tones ──
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
      // TODO: webhook URL
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
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700&family=Secular+One&display=swap');
      `}</style>

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
          <div style={{
            width: 32, height: 32, borderRadius: 10,
            background: `linear-gradient(135deg, ${clr.sage}, ${clr.sky})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16,
          }}>🌱</div>
          <div>
            <span style={{ fontSize: 14, fontWeight: 600, color: clr.textDark }}>{C.name}</span>
            <span style={{ fontSize: 11, color: clr.textMuted, display: "block", marginTop: -2 }}>{C.title}</span>
          </div>
        </div>
        <button onClick={() => scrollTo("contact")} style={{
          background: clr.sage, color: clr.white, border: "none",
          padding: "9px 22px", borderRadius: 20, fontSize: 13,
          fontWeight: 500, cursor: "pointer", fontFamily: "inherit",
        }}>
          {C.ctaText}
        </button>
      </motion.header>

      {/* ════════ HERO ════════ */}
      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        background: `linear-gradient(170deg, ${clr.warmWhite} 0%, ${clr.cream} 50%, ${clr.sageLight}30 100%)`,
        padding: "110px 24px 80px", position: "relative", overflow: "hidden",
      }}>
        {/* Soft decorative shapes */}
        <div style={{ position: "absolute", top: "8%", right: "-8%", width: 450, height: 450, borderRadius: "50%", background: `${clr.lavenderLight}50` }} />
        <div style={{ position: "absolute", bottom: "5%", left: "-6%", width: 350, height: 350, borderRadius: "50%", background: `${clr.skyLight}40` }} />
        <div style={{ position: "absolute", top: "40%", left: "15%", width: 200, height: 200, borderRadius: "50%", background: `${clr.peach}20` }} />

        <Wrap style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 60, alignItems: "center", position: "relative", zIndex: 2 }}>
          <div>
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "7px 18px", borderRadius: 20,
                background: `${clr.sage}12`, border: `1px solid ${clr.sage}25`,
                fontSize: 12, color: clr.sageDark, marginBottom: 24,
              }}>
              <span>🌿</span> {C.heroLabel}
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.7 }}
              style={{
                fontFamily: "'Secular One', 'Heebo', sans-serif",
                fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
                fontWeight: 400, lineHeight: 1.25, margin: "0 0 20px 0",
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
              <button onClick={() => scrollTo("contact")} style={{
                background: clr.sage, color: clr.white, border: "none",
                padding: "13px 32px", borderRadius: 24, fontSize: 15,
                fontWeight: 500, cursor: "pointer", fontFamily: "inherit",
                boxShadow: `0 4px 16px ${clr.sage}30`, transition: "all 0.3s",
              }}
                onMouseOver={(e) => (e.currentTarget.style.background = clr.sageDark)}
                onMouseOut={(e) => (e.currentTarget.style.background = clr.sage)}
              >
                {C.ctaText} 🌸
              </button>
              <a href={`https://wa.me/${C.whatsapp}?text=${encodeURIComponent("היי, אשמח לשמוע עוד על הקליניקה")}`}
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "13px 24px", borderRadius: 24,
                  border: `1.5px solid ${clr.border}`, background: clr.white,
                  color: clr.textDark, fontSize: 14, fontWeight: 500,
                  textDecoration: "none", fontFamily: "inherit",
                }}>
                💬 WhatsApp
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.5 }}
              style={{ marginTop: 32, display: "flex", gap: 20, fontSize: 12, color: clr.textLight }}>
              {["טיפול בגישה טבעית", "תכנית אישית לכל ילד", "הדרכת הורים"].map((t) => (
                <span key={t} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <span style={{ color: clr.sage }}>✓</span> {t}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Portrait — small, to the side, authentic. NOT centered/corporate */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.8 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <div style={{
              width: "85%", maxWidth: 320, aspectRatio: "3/4",
              borderRadius: 24, overflow: "hidden",
              background: `linear-gradient(135deg, ${clr.sageLight}, ${clr.skyLight})`,
              boxShadow: `0 16px 40px ${clr.sage}15`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: clr.textLight, fontSize: 13,
            }}>
              {/* Replace: <img src={C.portrait} alt="רות בטיפול" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> */}
              📸 תמונת רות באמצע טיפול
            </div>
            <span style={{ fontSize: 12, color: clr.textLight, fontStyle: "italic" }}>באמצע מפגש — כי זה מה שמשנה 💛</span>
          </motion.div>
        </Wrap>
      </section>

      {/* ════════ SERVICES ════════ */}
      <Section id="services" style={{ background: clr.white }}>
        <Wrap>
          <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: 50 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: clr.sage, letterSpacing: "0.06em" }}>תחומי טיפול</span>
            <h2 style={{ fontFamily: "'Secular One', sans-serif", fontSize: "clamp(1.7rem, 3vw, 2.4rem)", fontWeight: 400, color: clr.textDark, margin: "10px 0 0 0" }}>
              איך אני יכולה לעזור?
            </h2>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {C.services.map((s, i) => (
              <motion.div key={i} variants={scaleIn} custom={i} whileHover={{ y: -4 }}
                style={{
                  padding: "30px 24px", borderRadius: 20,
                  background: clr.cream, border: `1px solid ${clr.border}`,
                  transition: "all 0.3s",
                }}>
                <span style={{ fontSize: 28 }}>{s.icon}</span>
                <h3 style={{ fontSize: 17, fontWeight: 600, color: clr.textDark, margin: "14px 0 8px 0" }}>{s.title}</h3>
                <p style={{ fontSize: 13.5, lineHeight: 1.7, color: clr.textMuted, margin: 0 }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </Wrap>
      </Section>

      {/* ════════ ABOUT ════════ */}
      <Section id="about" style={{ background: clr.cream }}>
        <Wrap style={{ maxWidth: 760, textAlign: "center" }}>
          <motion.div variants={fadeUp}>
            <span style={{ fontSize: 12, fontWeight: 600, color: clr.lavender, letterSpacing: "0.06em" }}>קצת עליי</span>
            <h2 style={{ fontFamily: "'Secular One', sans-serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 400, color: clr.textDark, margin: "10px 0 20px 0" }}>
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

      {/* ════════ TESTIMONIALS ════════ */}
      <Section style={{ background: clr.white }}>
        <Wrap>
          <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: 40 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: clr.sky, letterSpacing: "0.06em" }}>מה אומרים ההורים</span>
            <h2 style={{ fontFamily: "'Secular One', sans-serif", fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 400, color: clr.textDark, margin: "10px 0 0 0" }}>
              קולות מהקליניקה 💬
            </h2>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {C.testimonials.map((t, i) => (
              <motion.div key={i} variants={scaleIn} custom={i}
                style={{
                  padding: "28px 24px", borderRadius: 20,
                  background: i === 1 ? `${clr.sageLight}40` : clr.cream,
                  border: `1px solid ${clr.border}`,
                }}>
                <p style={{ fontSize: 14.5, lineHeight: 1.75, color: clr.textDark, margin: "0 0 16px 0", fontStyle: "italic" }}>
                  ״{t.text}״
                </p>
                <span style={{ fontSize: 12, color: clr.textLight }}>{t.name}</span>
              </motion.div>
            ))}
          </div>
        </Wrap>
      </Section>

      {/* ════════ CONTACT ════════ */}
      <Section id="contact" style={{ background: clr.cream }}>
        <Wrap>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 50, alignItems: "start" }}>
            <motion.div variants={fadeUp}>
              <span style={{ fontSize: 12, fontWeight: 600, color: clr.sage, letterSpacing: "0.06em" }}>יצירת קשר</span>
              <h2 style={{ fontFamily: "'Secular One', sans-serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 400, color: clr.textDark, margin: "10px 0 16px 0" }}>
                בואו נדבר על הילד שלכם.
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: clr.textMuted, margin: "0 0 32px 0" }}>
                השאירו פרטים ואחזור אליכם לשיחת היכרות קצרה — בלי התחייבות.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { icon: "📞", label: C.phone },
                  { icon: "✉️", label: C.email },
                  { icon: "📍", label: C.address },
                ].map(({ icon, label }) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: clr.white, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, border: `1px solid ${clr.border}` }}>{icon}</div>
                    <span style={{ fontSize: 14, color: clr.textDark }}>{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeUp} custom={1}>
              {sent ? (
                <div style={{ padding: 50, textAlign: "center", borderRadius: 24, background: clr.white, border: `1px solid ${clr.border}` }}>
                  <div style={{ fontSize: 42, marginBottom: 12 }}>🌸</div>
                  <h3 style={{ fontSize: 20, fontWeight: 600, color: clr.textDark, margin: "0 0 8px 0" }}>תודה! הפרטים נשלחו.</h3>
                  <p style={{ color: clr.textMuted, fontSize: 14 }}>אחזור אליכם בהקדם.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{
                  padding: "36px 32px", borderRadius: 24,
                  background: clr.white, border: `1px solid ${clr.border}`,
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
                          border: `1.5px solid ${clr.border}`, background: clr.warmWhite,
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
                      style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: `1.5px solid ${clr.border}`, background: clr.warmWhite, fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box", cursor: "pointer" }}>
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
                    שליחה 🌿
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
          width: 52, height: 52, borderRadius: "50%",
          background: "#25D366", color: clr.white,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 24, textDecoration: "none",
          boxShadow: "0 4px 14px rgba(37,211,102,0.3)",
        }}>
        💬
      </motion.a>

      {/* ════════ RESPONSIVE ════════ */}
      <style jsx global>{`
        @media (max-width: 768px) {
          section > div > div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          section { padding: 60px 18px !important; }
          h1 { font-size: 1.9rem !important; }
        }
      `}</style>
    </div>
  )
}
