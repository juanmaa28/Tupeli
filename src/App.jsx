import { useState, useEffect } from 'react'
import './index.css'

/* ── Navbar ───────────────────────────────────── */
function Navbar() {
  const [solid, setSolid] = useState(false)
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <nav className={`navbar ${solid ? 'solid' : ''}`}>
      <div className="container nav-inner">
        <a href="#" className="nav-logo">
          <span className="nav-logo-icon">🎬</span>
          <span className="nav-logo-text">Tu<em>Peli</em></span>
        </a>
        <a href="#cta" className="btn-primary nav-cta">Únete — es gratis</a>
      </div>
    </nav>
  )
}

/* ── Hero ─────────────────────────────────────── */
function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-bg">
        <img src="/hero_bg.png" alt="" />
      </div>
      <div className="orb orb1" />
      <div className="orb orb2" />

      <div className="container">
        <div className="hero-inner">
          <div className="hero-badge">
            <div className="chip">
              <span className="badge-dot" style={{marginRight:8}} />
              Próximamente
            </div>
          </div>

          <h1 className="hero-headline">
            El cine que<br/>
            <span className="gradient-text">te mereces</span>,<br/>
            en un lugar.
          </h1>

          <p className="hero-desc">
            <strong>Tu Peli</strong> será la guía cinematográfica definitiva en español.
            Reseñas detalladas, calificaciones reales, búsqueda avanzada y
            una comunidad que ama el cine tanto como tú.
          </p>

          <div className="hero-actions">
            <a href="#cta" className="btn-primary">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Avísame cuando lance
            </a>
            <a href="#que-sera" className="btn-ghost">¿Qué será Tu Peli?</a>
          </div>

          {/* Stats */}
          <div className="hero-stats">
            {[
              ['10K+', 'Películas'],
              ['50+',  'Géneros'],
              ['100%', 'Gratis'],
            ].map(([n, l], i, arr) => (
              <>
                <div className="stat" key={n}>
                  <span className="stat-n">{n}</span>
                  <span className="stat-l">{l}</span>
                </div>
                {i < arr.length - 1 && <div className="stat-sep" key={`sep-${i}`} />}
              </>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Features ─────────────────────────────────── */
const FEATURES = [
  { icon: '🎯', title: 'Reseñas detalladas',   desc: 'Análisis profundos de cada película: argumento, dirección, actuaciones y mucho más, sin spoilers.' },
  { icon: '⭐', title: 'Calificaciones reales', desc: 'Puntuaciones honestas de la comunidad. Sin bots, sin pagos, solo la opinión real de los espectadores.' },
  { icon: '🔍', title: 'Búsqueda avanzada',    desc: 'Filtra por título, género, director, año de estreno, duración o calificación. Encuentra justo lo que buscas.' },
  { icon: '🌍', title: 'Cine de todo el mundo', desc: 'Desde blockbusters de Hollywood hasta cine latinoamericano, europeo, asiático y de autor.' },
  { icon: '📋', title: 'Tu lista personal',    desc: 'Guarda las películas que quieres ver, marca las que ya viste y arma tu colección de favoritas.' },
  { icon: '💬', title: 'Comunidad cinéfila',   desc: 'Comenta, debate y comparte tu perspectiva. Descubre qué piensan otros amantes del cine.' },
]

function Features() {
  return (
    <section className="features-section" id="que-sera">
      <div className="container">
        <div className="features-header">
          <div className="chip">Lo que tendrás</div>
          <h2 className="section-title">
            Hecho para los que<br/>
            <span className="gradient-text">aman el cine de verdad</span>
          </h2>
          <p className="section-sub">
            Tu Peli reunirá todo lo que necesitas para elegir bien, descubrir
            nuevas joyas y compartir tu pasión por el cine.
          </p>
        </div>

        <div className="features-grid">
          {FEATURES.map(f => (
            <div className="feat-card glass" key={f.title}>
              <div className="feat-icon">{f.icon}</div>
              <div className="feat-title">{f.title}</div>
              <div className="feat-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── How it will work ─────────────────────────── */
const STEPS = [
  { num:'01', emoji:'🔎', title:'Busca tu película',     desc:'Escribe el nombre, el género o el estado de ánimo y Tu Peli te mostrará las mejores opciones.' },
  { num:'02', emoji:'📖', title:'Lee la ficha completa', desc:'Sinopsis, reparto, director, duración, tráiler y la opinión resumida de la comunidad.' },
  { num:'03', emoji:'⭐', title:'Califica y reseña',      desc:'Dale tu puntuación personal y escribe tu reseña para ayudar a otros a decidir.' },
  { num:'04', emoji:'📋', title:'Organiza tus listas',   desc:'Pendientes, vistas, favoritas. Tu historial cinematográfico siempre a la mano.' },
]

function HowItWorks() {
  return (
    <section className="how-section" id="como-funciona">
      <div className="container">
        <div className="how-header">
          <div className="chip">Así funcionará</div>
          <h2 className="section-title">
            Simple y sin<br/>
            <span className="gradient-text">complicaciones</span>
          </h2>
          <p className="section-sub">
            Cuatro pasos para nunca más perder tiempo eligiendo la
            película equivocada.
          </p>
        </div>

        <div className="how-grid">
          {STEPS.map(s => (
            <div className="how-card glass" key={s.num}>
              <div className="how-num">{s.num}</div>
              <div className="how-emoji">{s.emoji}</div>
              <div className="how-title">{s.title}</div>
              <div className="how-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── CTA ──────────────────────────────────────── */
function CTA() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  const submit = e => {
    e.preventDefault()
    if (email) setDone(true)
  }

  return (
    <section className="cta-section" id="cta">
      <div className="container">
        <div className="cta-box glass">
          <div className="cta-orb1" /><div className="cta-orb2" />
          <div className="chip">¡No te lo pierdas!</div>
          <h2 className="cta-title">
            Sé el primero en<br/>
            <span className="gradient-text">saber cuándo lanzamos</span>
          </h2>
          <p className="cta-sub">
            Déjanos tu correo y te avisamos en cuanto Tu Peli esté lista.
            Sin spam, gratis para siempre.
          </p>

          {done ? (
            <div style={{display:'flex',alignItems:'center',gap:14,background:'rgba(34,197,94,.1)',border:'1px solid rgba(34,197,94,.22)',borderRadius:14,padding:'18px 28px'}}>
              <span style={{fontSize:'2rem'}}>🎬</span>
              <div>
                <strong style={{display:'block',color:'#4ade80',marginBottom:4}}>¡Genial, ya estás en la lista!</strong>
                <span style={{fontSize:'0.88rem',color:'var(--t2)'}}>Te avisaremos en cuanto lancemos. Gracias por tu apoyo.</span>
              </div>
            </div>
          ) : (
            <form className="cta-actions" onSubmit={submit} style={{gap:10}}>
              <input
                type="email"
                required
                placeholder="tu@correo.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{
                  padding:'14px 22px', borderRadius:99, border:'1.5px solid var(--border)',
                  background:'rgba(255,255,255,.05)', color:'var(--t1)',
                  fontSize:'0.95rem', fontFamily:'inherit', outline:'none', minWidth:260,
                  transition:'border-color .25s',
                }}
                onFocus={e => e.target.style.borderColor='var(--purple)'}
                onBlur={e  => e.target.style.borderColor='var(--border)'}
              />
              <button type="submit" className="btn-primary">Avísame →</button>
            </form>
          )}
          <p className="cta-note">🔒 Sin spam. Cancela cuando quieras.</p>
        </div>
      </div>
    </section>
  )
}

/* ── Footer ───────────────────────────────────── */
function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="foot-brand">
          <span>🎬</span>
          <span>Tu<em>Peli</em></span>
        </div>
        <p className="foot-note">© 2025 Tu Peli · Hecho con ❤️ para cinéfilos</p>
      </div>
    </footer>
  )
}

/* ── App ──────────────────────────────────────── */
export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <CTA />
      <Footer />
    </>
  )
}
