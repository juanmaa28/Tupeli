import { useState, useEffect, useCallback, useRef } from 'react'
import {
  Film, Clapperboard, Star, Search, Globe, ListChecks, Users,
  PenLine, BookOpen, BarChart2, Pencil, ChevronRight, Mail,
  Lock, CheckCircle2, Sparkles, Tv2, X, Loader2, ArrowRight,
  ImageOff
} from 'lucide-react'
import { supabase } from './supabaseClient'
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
          <span className="nav-logo-icon"><Clapperboard size={26} strokeWidth={2.2} /></span>
          <span className="nav-logo-text">Tu<em>Peli</em></span>
        </a>
        <div className="nav-links-desktop">
          <a href="#buscar">Buscar películas</a>
          <a href="#que-sera">Características</a>
          <a href="#como-funciona">Cómo funciona</a>
        </div>
        <a href="#buscar" className="btn-primary nav-cta">
          <Search size={15} strokeWidth={2.5} />
          Explorar
        </a>
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
            <div className="chip" style={{display:'inline-flex',alignItems:'center',gap:6}}>
              <span className="badge-dot" />
              Ya disponible
            </div>
          </div>

          <h1 className="hero-headline">
            El cine que<br/>
            <span className="gradient-text">te mereces</span>,<br/>
            en un lugar.
          </h1>

          <p className="hero-desc">
            <strong>Tu Peli</strong> es tu guía cinematográfica definitiva en español.
            Busca entre miles de películas, lee reseñas detalladas, descubre
            calificaciones reales y encuentra tu próxima obsesión cinematográfica.
          </p>

          <div className="hero-actions">
            <a href="#buscar" className="btn-primary">
              <Search size={17} strokeWidth={2.5} />
              Buscar películas
            </a>
            <a href="#que-sera" className="btn-ghost">
              Ver características
              <ChevronRight size={16} strokeWidth={2.5} />
            </a>
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

/* ── Movie Search ──────────────────────────────── */
const GENRES = ['Todos','Action','Drama','Sci-Fi','Crime','Comedy','Fantasy','Thriller','Horror','Animation','Romance','War','Mystery','Adventure','History','Western','Biography']

function MovieSearch() {
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState('Todos')
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [initial, setInitial] = useState(true)
  const [selectedMovie, setSelectedMovie] = useState(null)
  const debounceRef = useRef(null)

  const fetchMovies = useCallback(async (searchQuery, selectedGenre) => {
    setLoading(true)
    setInitial(false)
    try {
      let q = supabase.from('movies').select('*')
      if (searchQuery.trim()) {
        q = q.ilike('title', `%${searchQuery.trim()}%`)
      }
      if (selectedGenre !== 'Todos') {
        q = q.ilike('genre', `%${selectedGenre}%`)
      }
      q = q.order('rating', { ascending: false }).limit(30)
      const { data, error } = await q
      if (error) throw error
      setMovies(data || [])
    } catch (err) {
      console.error('Error fetching movies:', err)
      setMovies([])
    } finally {
      setLoading(false)
    }
  }, [])

  // Load popular movies on mount
  useEffect(() => {
    fetchMovies('', 'Todos')
  }, [fetchMovies])

  // Debounced search
  const handleSearchChange = (val) => {
    setQuery(val)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      fetchMovies(val, genre)
    }, 350)
  }

  const handleGenreChange = (g) => {
    setGenre(g)
    fetchMovies(query, g)
  }

  const renderStars = (rating) => {
    const stars = Math.round(Number(rating) / 2)
    return (
      <div className="movie-stars">
        {[1,2,3,4,5].map(i => (
          <Star key={i} size={13} strokeWidth={0} fill={i <= stars ? '#F59E0B' : '#2A2A40'} />
        ))}
      </div>
    )
  }

  return (
    <section className="search-section" id="buscar">
      <div className="container">
        <div className="search-header">
          <div className="chip">Explorar</div>
          <h2 className="section-title">
            Busca tu próxima<br/>
            <span className="gradient-text">película favorita</span>
          </h2>
          <p className="section-sub">
            Explora nuestra base de datos con miles de películas.
            Filtra por nombre o género para encontrar exactamente lo que quieres.
          </p>
        </div>

        {/* Search bar */}
        <div className="search-bar-wrapper">
          <div className="search-bar glass">
            <Search size={20} strokeWidth={2} className="search-bar-icon" />
            <input
              type="text"
              placeholder="Busca por título... ej: Inception, Dune, Parasite"
              value={query}
              onChange={e => handleSearchChange(e.target.value)}
              className="search-input"
            />
            {query && (
              <button className="search-clear" onClick={() => { setQuery(''); fetchMovies('', genre) }}>
                <X size={16} strokeWidth={2.5} />
              </button>
            )}
          </div>
        </div>

        {/* Genre pills */}
        <div className="genre-pills">
          {GENRES.map(g => (
            <button
              key={g}
              className={`genre-pill ${genre === g ? 'active' : ''}`}
              onClick={() => handleGenreChange(g)}
            >
              {g === 'Todos' ? 'Todos' : g}
            </button>
          ))}
        </div>

        {/* Results */}
        {loading ? (
          <div className="search-loading">
            <Loader2 size={32} strokeWidth={2} className="spin" />
            <span>Buscando películas...</span>
          </div>
        ) : movies.length === 0 && !initial ? (
          <div className="search-empty">
            <Film size={48} strokeWidth={1.2} style={{opacity:0.3}} />
            <h3>No encontramos resultados</h3>
            <p>Intenta con otro título o cambia el filtro de género.</p>
          </div>
        ) : (
          <div className="movies-grid">
            {movies.map(movie => (
              <div className="movie-card glass" key={movie.id} onClick={() => setSelectedMovie(movie)}>
                <div className="movie-poster">
                  {movie.image_url ? (
                    <img
                      src={movie.image_url}
                      alt={movie.title}
                      loading="lazy"
                      onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex' }}
                    />
                  ) : null}
                  <div className="movie-poster-fallback" style={movie.image_url ? {display:'none'} : {}}>
                    <Film size={36} strokeWidth={1.2} />
                  </div>
                  <div className="movie-poster-overlay">
                    <span className="movie-see-more">
                      <ArrowRight size={18} strokeWidth={2.5} />
                      Ver detalle
                    </span>
                  </div>
                  <div className="movie-genre-badge">{movie.genre}</div>
                </div>
                <div className="movie-info">
                  <div className="movie-rating-row">
                    {renderStars(movie.rating)}
                    <span className="movie-rating-num">{Number(movie.rating).toFixed(1)}</span>
                  </div>
                  <h3 className="movie-card-title">{movie.title}</h3>
                  <p className="movie-card-desc">{movie.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Movie detail modal */}
      {selectedMovie && (
        <div className="modal-backdrop" onClick={() => setSelectedMovie(null)}>
          <div className="modal-content glass" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedMovie(null)}>
              <X size={22} strokeWidth={2.5} />
            </button>
            <div className="modal-body">
              <div className="modal-poster">
                {selectedMovie.image_url ? (
                  <img src={selectedMovie.image_url} alt={selectedMovie.title} />
                ) : (
                  <div className="modal-poster-fallback"><Film size={64} strokeWidth={1} /></div>
                )}
              </div>
              <div className="modal-info">
                <div className="modal-genre-chip">{selectedMovie.genre}</div>
                <h2 className="modal-title">{selectedMovie.title}</h2>
                <div className="modal-rating">
                  {renderStars(selectedMovie.rating)}
                  <span className="modal-rating-num">{Number(selectedMovie.rating).toFixed(1)}<span style={{color:'var(--t3)',fontWeight:400}}>/10</span></span>
                </div>
                <p className="modal-desc">{selectedMovie.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

/* ── Features ─────────────────────────────────── */
const FEATURES = [
  { icon: <PenLine  size={22} strokeWidth={1.8} />, title: 'Reseñas detalladas',    desc: 'Análisis profundos de cada película: argumento, dirección, actuaciones y mucho más, sin spoilers.' },
  { icon: <Star     size={22} strokeWidth={1.8} />, title: 'Calificaciones reales',  desc: 'Puntuaciones honestas de la comunidad. Sin bots, sin pagos, solo la opinión real de los espectadores.' },
  { icon: <Search   size={22} strokeWidth={1.8} />, title: 'Búsqueda avanzada',      desc: 'Filtra por título, género, director, año de estreno, duración o calificación. Encuentra justo lo que buscas.' },
  { icon: <Globe    size={22} strokeWidth={1.8} />, title: 'Cine de todo el mundo',  desc: 'Desde blockbusters de Hollywood hasta cine latinoamericano, europeo, asiático y de autor.' },
  { icon: <ListChecks size={22} strokeWidth={1.8} />, title: 'Tu lista personal',   desc: 'Guarda las películas que quieres ver, marca las que ya viste y arma tu colección de favoritas.' },
  { icon: <Users    size={22} strokeWidth={1.8} />, title: 'Comunidad cinéfila',     desc: 'Comenta, debate y comparte tu perspectiva. Descubre qué piensan otros amantes del cine.' },
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
  { num:'01', icon: <Search      size={24} strokeWidth={1.8} />, title:'Busca tu película',     desc:'Escribe el nombre, el género o el estado de ánimo y Tu Peli te mostrará las mejores opciones.' },
  { num:'02', icon: <Film        size={24} strokeWidth={1.8} />, title:'Lee la ficha completa', desc:'Sinopsis, reparto, director, duración, tráiler y la opinión resumida de la comunidad.' },
  { num:'03', icon: <Star        size={24} strokeWidth={1.8} />, title:'Califica y reseña',      desc:'Dale tu puntuación personal y escribe tu reseña para ayudar a otros a decidir.' },
  { num:'04', icon: <ListChecks  size={24} strokeWidth={1.8} />, title:'Organiza tus listas',   desc:'Pendientes, vistas, favoritas. Tu historial cinematográfico siempre a la mano.' },
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
              <div className="how-icon">{s.icon}</div>
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
              <CheckCircle2 size={36} color="#4ade80" strokeWidth={1.8} />
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
              <button type="submit" className="btn-primary">
                Avísame
                <ChevronRight size={17} strokeWidth={2.5} />
              </button>
            </form>
          )}
          <p className="cta-note" style={{display:'flex',alignItems:'center',gap:6,justifyContent:'center'}}>
            <Lock size={13} strokeWidth={2.5} style={{opacity:0.6}} /> Sin spam. Cancela cuando quieras.
          </p>
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
          <Clapperboard size={20} strokeWidth={2} style={{color:'var(--purple-light)'}} />
          <span>Tu<em>Peli</em></span>
        </div>
        <p className="foot-note">© 2025 Tu Peli · Hecho con <span style={{color:'#f87171'}}>♥</span> para cinéfilos</p>
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
      <MovieSearch />
      <Features />
      <HowItWorks />
      <CTA />
      <Footer />
    </>
  )
}
