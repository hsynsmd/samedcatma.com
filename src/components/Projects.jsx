import { useState, useEffect, useCallback, useRef } from 'react'
import { FiGithub, FiArrowUpRight, FiX, FiExternalLink, FiChevronLeft, FiChevronRight, FiMaximize2 } from 'react-icons/fi'
import { FaApple } from 'react-icons/fa'
import Reveal from './Reveal'
import GradientText from './GradientText'
import { notify } from '../lib/notify'
import './Projects.css'

const GH = 'https://github.com/hsynsmd'

const projects = [
  {
    id: 'market-zinciri',
    featured: true,
    tag: 'Multi-Agent',
    accent: 'indigo',
    status: 'Tamamlandı',
    title: 'Market Zinciri Otomasyonu',
    summary:
      'LLM tabanlı çok ajanlı market zinciri otomasyon sistemi — uçtan uca akıllı tedarik akışı.',
    detail:
      'Sekiz uzman LLM ajanı ve bir orkestratör ile market tedarik zincirini uçtan uca otonomlaştıran hiyerarşik çok ajanlı sistem. Ajanlar; talep tahmini, stok, sipariş, mal kabul, raf, piyasa istihbaratı, kişiselleştirme ve raporlama süreçlerini yönetir.',
    highlights: [
      'LangChain + Gemini orchestrator ile chain & parallel execution',
      '10 FastAPI mikroservisi; agent-to-agent (httpx) çok adımlı iş akışları',
      '50+ özel tool ile ajanların dış sistem ve veri erişimi',
      'CatBoost tabanlı bağımsız ML servisi ile sayısal talep tahmini',
      'Tavily RAG ile piyasa istihbaratı; RBAC ve çoklu format raporlama',
    ],
    metrics: [
      { value: '10', label: 'FastAPI mikroservisi' },
      { value: '8', label: 'uzman LLM ajanı' },
      { value: '50+', label: 'özel tool' },
    ],
    tech: ['Python', 'LangChain', 'Gemini', 'FastAPI', 'CatBoost', 'Tavily', 'httpx'],
    image: '/projects/market-zinciri.webp',
    fit: 'cover',
    pos: 'top',
    gallery: [
      { src: '/projects/market-zinciri.webp', label: 'Sohbet arayüzü' },
      { src: '/projects/market-zinciri-2.webp', label: 'Orkestrasyon paneli' },
      { src: '/projects/market-zinciri-3.webp', label: 'Katalog & akış' },
      { src: '/projects/market-zinciri-4.webp', label: 'Raporlama' },
    ],
    url: GH,
  },
  {
    id: 'gundem-ai',
    tag: 'Full-Stack AI',
    accent: 'amber',
    status: "App Store'da Yayında",
    title: 'Gündem AI',
    summary: 'Kişiselleştirilmiş AI haber uygulaması — gerçek zamanlı LLM özetleme.',
    detail:
      'Kullanıcının ilgi alanlarına göre haber akışını kişiselleştiren, gerçek zamanlı LLM özetleme sunan full-stack mobil uygulama. "Bana Anlat" özelliği SSE streaming ile canlı özet üretir. App Store\'da yayında.',
    storeUrl: 'https://apps.apple.com/tr/app/id6787883391',
    highlights: [
      'LLM SSE streaming "Bana Anlat" + Gemini ile otonom Türkçe özetleme',
      '9 AI kaynağından kazıma, node-cron pipeline, staging tekilleştirme',
      'Express 23 endpoint REST API; JWT + ağırlıklı kişiselleştirme algoritması',
      'React Native + Expo mobil; Supabase 9 migration, RLS, FTS',
    ],
    tech: ['Node.js', 'TypeScript', 'Gemini', 'PostgreSQL', 'React Native', 'Expo', 'Supabase'],
    image: '/projects/gundem-ai.webp',
    fit: 'cover',
    pos: 'top',
    gallery: [
      { src: '/projects/gundem-ai.webp', label: 'Keşfet — günün AI özeti' },
      { src: '/projects/gundem-ai-2.webp', label: 'Bana Anlat — AI ile sohbet' },
      { src: '/projects/gundem-ai-3.webp', label: 'Makale detayı — Bunu Bana Anlat' },
      { src: '/projects/gundem-ai-4.webp', label: 'Kütüphane — kaydedilen haberler' },
      { src: '/projects/gundem-ai-5.webp', label: 'Profil & kişiselleştirme' },
    ],
    url: GH,
  },
  {
    id: 'smartvision',
    tag: 'Computer Vision',
    accent: 'teal',
    status: 'Tamamlandı',
    title: 'SmartVisionAssist',
    summary: 'Görme engelliler için gerçek zamanlı sesli yönlendirme sistemi.',
    detail:
      'Kamera akışını gerçek zamanlı işleyerek nesneleri tespit eden, konumlarını ve mesafelerini sese çeviren yardımcı görü sistemi. Tehlike düzeyine göre öncelikli sesli bildirim verir.',
    highlights: [
      'YOLOv8 nesne tespiti; 3x3 konum ızgarası ve pinhole mesafe tahmini',
      'Tehlike düzeyine göre sınıflandırma (dangerous / safe / info)',
      'Çoklu thread + kuyruk ile akışı bloklamayan asenkron sesli bildirim',
    ],
    tech: ['Python', 'OpenCV', 'YOLOv8', 'pyttsx3', 'pygame'],
    image: '/projects/smartvision.webp',
    fit: 'cover',
    gallery: [
      { src: '/projects/smartvision.webp', label: 'Yaya geçidi — çoklu nesne tespiti' },
      { src: '/projects/smartvision-2.webp', label: 'Merdiven algılama — tehlike uyarısı' },
      { src: '/projects/smartvision-3.webp', label: 'Cadde — araç tespiti ve mesafe' },
      { src: '/projects/smartvision-4.webp', label: 'Yaya + yol tespiti' },
      { src: '/projects/smartvision-5.webp', label: 'Güvenli yol yönlendirmesi' },
    ],
    url: 'https://github.com/Goruntu-Isleme-Projesi/SmartVision-v2',
  },
  {
    id: 'makale',
    tag: 'Full-Stack',
    accent: 'violet',
    status: 'Tamamlandı',
    title: 'Makale Yönetim Platformu',
    summary: 'Makale yönetimi ve topluluk platformu — ilişkisel veri modeli.',
    detail:
      'Makalelerin yönetildiği, kategorize edildiği ve yorumlandığı topluluk platformu. Güvenli kimlik doğrulama ve ilişkisel veri modeli üzerine kurulu full-stack uygulama.',
    highlights: [
      'React + TypeScript frontend, Flask backend, 20 endpoint REST API',
      'SQLAlchemy ORM ile 5 tablolu Many-to-Many ilişkisel model',
      'JWT auth, password hashing, CORS; CRUD + yorum + kategori modülleri',
    ],
    tech: ['React', 'TypeScript', 'Flask', 'JWT', 'SQLAlchemy'],
    image: '/projects/makale.webp',
    fit: 'cover',
    pos: 'top',
    gallery: [
      { src: '/projects/makale.webp', label: 'Anasayfa — makale akışı' },
      { src: '/projects/makale-2.webp', label: 'Makale detayı & yorumlar' },
      { src: '/projects/makale-3.webp', label: 'Kontrol paneli — makale yönetimi' },
      { src: '/projects/makale-4.webp', label: 'Giriş ekranı' },
    ],
    url: 'https://github.com/hsynsmd/makale_sitesi',
  },
]

function handleSpotlight(e) {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${e.clientX - r.left}px`)
  el.style.setProperty('--my', `${e.clientY - r.top}px`)
}

function Thumb({ project, className }) {
  const [ok, setOk] = useState(true)
  return (
    <div className={`proj-thumb ${className || ''}`} data-fit={project.fit}>
      {ok && (
        <img
          src={project.image}
          alt={`${project.title} önizleme`}
          onError={() => setOk(false)}
          style={{ objectFit: project.fit, objectPosition: project.pos || 'center' }}
        />
      )}
      {!ok && <span className="proj-thumb__ph">{project.tag}</span>}
      <span className="proj-thumb__status">
        <span className="proj-thumb__status-dot" />
        {project.status}
      </span>
    </div>
  )
}

function TechRow({ items, max }) {
  const shown = max ? items.slice(0, max) : items
  const rest = max ? items.length - shown.length : 0
  return (
    <div className="proj-card__tech">
      {shown.map((t) => (
        <span key={t}>{t}</span>
      ))}
      {rest > 0 && <span className="proj-card__tech-more">+{rest}</span>}
    </div>
  )
}

function GithubLink({ title, url }) {
  return (
    <a
      className="proj-card__link"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${title} — GitHub`}
      onClick={(e) => e.stopPropagation()}
    >
      <FiGithub /> GitHub <FiArrowUpRight className="proj-card__link-arrow" />
    </a>
  )
}

function StoreLink({ title, url }) {
  return (
    <a
      className="proj-card__link"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${title} — App Store`}
      onClick={(e) => e.stopPropagation()}
    >
      <FaApple /> App Store <FiArrowUpRight className="proj-card__link-arrow" />
    </a>
  )
}

function ProjectModal({ project, onClose }) {
  const [ok, setOk] = useState(true)
  const [idx, setIdx] = useState(0)
  const [zoom, setZoom] = useState(false)

  const slides = project?.gallery?.length
    ? project.gallery
    : project
      ? [{ src: project.image, label: project.tag }]
      : []

  const go = useCallback(
    (dir) => setIdx((i) => (i + dir + slides.length) % slides.length),
    [slides.length]
  )

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') zoom ? setZoom(false) : onClose()
      else if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, go, zoom])

  useEffect(() => setOk(true), [idx])

  if (!project) return null

  const active = slides[idx] || slides[0]
  const hasGallery = slides.length > 1
  const mainFit = hasGallery ? 'contain' : project.fit
  const mainPos = hasGallery ? 'center' : project.pos || 'center'

  return (
    <div className="proj-modal" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className={`proj-modal__panel proj-card--${project.accent}`}
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent
      >
        <button className="proj-modal__close" onClick={onClose} aria-label="Kapat">
          <FiX />
        </button>

        <div className="proj-modal__media" data-fit={hasGallery ? 'contain' : project.fit}>
          {ok ? (
            <img
              key={idx}
              src={active.src}
              alt={`${project.title} — ${active.label}`}
              onError={() => setOk(false)}
              onClick={() => setZoom(true)}
              style={{ objectFit: mainFit, objectPosition: mainPos, cursor: 'zoom-in' }}
            />
          ) : (
            <span className="proj-thumb__ph">{project.tag}</span>
          )}

          {ok && (
            <button
              type="button"
              className="proj-modal__zoom"
              onClick={() => setZoom(true)}
              aria-label="Görseli büyüt"
            >
              <FiMaximize2 />
            </button>
          )}

          {hasGallery && (
            <>
              <button
                type="button"
                className="proj-modal__nav proj-modal__nav--prev"
                onClick={() => go(-1)}
                aria-label="Önceki görsel"
              >
                <FiChevronLeft />
              </button>
              <button
                type="button"
                className="proj-modal__nav proj-modal__nav--next"
                onClick={() => go(1)}
                aria-label="Sonraki görsel"
              >
                <FiChevronRight />
              </button>
              <span className="proj-modal__counter">
                {idx + 1} / {slides.length}
              </span>
            </>
          )}
        </div>

        {hasGallery && (
          <div className="proj-modal__gallery">
            <span className="proj-modal__gallery-cap">{active.label}</span>
            <div className="proj-modal__thumbs">
              {slides.map((s, i) => (
                <button
                  key={s.src}
                  type="button"
                  className={`proj-modal__thumb${i === idx ? ' is-active' : ''}`}
                  onClick={() => setIdx(i)}
                  aria-label={s.label}
                  aria-current={i === idx}
                  title={s.label}
                >
                  <img src={s.src} alt={s.label} />
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="proj-modal__body">
          <div className="proj-modal__meta">
            <span className="proj-card__tag">
              <span className="proj-card__tag-dot" />
              {project.tag}
            </span>
            <span className="proj-thumb__status proj-thumb__status--inline">
              <span className="proj-thumb__status-dot" />
              {project.status}
            </span>
          </div>

          <h3 className="proj-modal__title">{project.title}</h3>
          <p className="proj-modal__lead">{project.detail}</p>

          {project.metrics && (
            <div className="proj-modal__metrics">
              {project.metrics.map((m) => (
                <div className="proj-metric" key={m.label}>
                  <span className="proj-metric__value">{m.value}</span>
                  <span className="proj-metric__label">{m.label}</span>
                </div>
              ))}
            </div>
          )}

          <span className="proj-modal__section">Öne çıkan noktalar</span>
          <ul className="proj-card__highlights">
            {project.highlights.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>

          <TechRow items={project.tech} />

          <div className="proj-modal__links">
            {project.storeUrl && (
              <a
                className="proj-modal__link proj-modal__link--primary"
                href={project.storeUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaApple /> App Store'da İncele
              </a>
            )}
            {project.liveUrl && (
              <a
                className="proj-modal__link proj-modal__link--primary"
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiExternalLink /> Siteyi Ziyaret Et
              </a>
            )}
            <a
              className="proj-modal__link"
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiGithub /> GitHub <FiArrowUpRight className="proj-card__link-arrow" />
            </a>
          </div>
        </div>
      </div>

      {zoom && ok && (
        <div
          className="proj-lightbox"
          onClick={(e) => {
            e.stopPropagation()
            setZoom(false)
          }}
        >
          <button
            type="button"
            className="proj-lightbox__close"
            onClick={(e) => {
              e.stopPropagation()
              setZoom(false)
            }}
            aria-label="Kapat"
          >
            <FiX />
          </button>

          {hasGallery && (
            <button
              type="button"
              className="proj-lightbox__nav proj-lightbox__nav--prev"
              onClick={(e) => {
                e.stopPropagation()
                go(-1)
              }}
              aria-label="Önceki görsel"
            >
              <FiChevronLeft />
            </button>
          )}

          <img
            className="proj-lightbox__img"
            src={active.src}
            alt={`${project.title} — ${active.label}`}
            onClick={(e) => e.stopPropagation()}
          />

          {hasGallery && (
            <button
              type="button"
              className="proj-lightbox__nav proj-lightbox__nav--next"
              onClick={(e) => {
                e.stopPropagation()
                go(1)
              }}
              aria-label="Sonraki görsel"
            >
              <FiChevronRight />
            </button>
          )}

          <div className="proj-lightbox__cap" onClick={(e) => e.stopPropagation()}>
            <span>{active.label}</span>
            {hasGallery && (
              <span className="proj-lightbox__count">
                {idx + 1} / {slides.length}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function Projects() {
  const [active, setActive] = useState(null)
  const notified = useRef(new Set())
  const open = useCallback((p) => {
    setActive(p)
    // Aynı projeyi bir oturumda yalnızca bir kez bildir
    if (!notified.current.has(p.id)) {
      notified.current.add(p.id)
      notify({ type: 'project', project: p.title })
    }
  }, [])
  const close = useCallback(() => setActive(null), [])

  const onCardKey = (p) => (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      open(p)
    }
  }

  const [flagship, ...rest] = projects

  return (
    <section className="projects" id="projects">
      <div className="container">
        <Reveal as="div" className="projects__kicker">
          <span className="projects__line" />
          PROJELER
        </Reveal>
        <Reveal as="h2" className="projects__title" delay={0.05}>
          <GradientText className="grad-title" colors={['#5B6CFF', '#8B9BFF', '#F2B25C']} animationSpeed={10}>
            Projeler
          </GradientText>
        </Reveal>
        <Reveal as="p" className="projects__lead" delay={0.1}>
          Çok ajanlı sistemlerden bilgisayarlı görüye — geliştirdiğim uçtan uca projeler.
          <span className="projects__hint">Detay için karta tıkla.</span>
        </Reveal>

        {/* Flagship */}
        <Reveal
          className={`proj-flag proj-card--${flagship.accent}`}
          delay={0.12}
          onMouseMove={handleSpotlight}
          onClick={() => open(flagship)}
          role="button"
          tabIndex={0}
          onKeyDown={onCardKey(flagship)}
          aria-label={`${flagship.title} — detay`}
        >
          <Thumb project={flagship} className="proj-flag__thumb" />
          <div className="proj-flag__body">
            <div className="proj-flag__main">
              <div className="proj-card__top">
                <span className="proj-card__tag">
                  <span className="proj-card__tag-dot" />
                  {flagship.tag}
                </span>
                <GithubLink title={flagship.title} url={flagship.url} />
              </div>
              <h3 className="proj-flag__title">{flagship.title}</h3>
              <p className="proj-card__summary">{flagship.summary}</p>
              <TechRow items={flagship.tech} max={5} />
              <span className="proj-card__detail-hint">
                Detayı gör <FiArrowUpRight />
              </span>
            </div>

            <div className="proj-flag__metrics">
              <span className="proj-flag__metrics-label">SİSTEM ÖLÇEĞİ</span>
              {flagship.metrics.map((m) => (
                <div className="proj-metric" key={m.label}>
                  <span className="proj-metric__value">{m.value}</span>
                  <span className="proj-metric__label">{m.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Secondary grid */}
        <div className="proj-grid">
          {rest.map((p, i) => (
            <Reveal
              className={`proj-card proj-card--${p.accent}`}
              key={p.id}
              delay={0.16 + i * 0.08}
              onMouseMove={handleSpotlight}
              onClick={() => open(p)}
              role="button"
              tabIndex={0}
              onKeyDown={onCardKey(p)}
              aria-label={`${p.title} — detay`}
            >
              <Thumb project={p} />
              <div className="proj-card__content">
                <div className="proj-card__top">
                  <span className="proj-card__tag">
                    <span className="proj-card__tag-dot" />
                    {p.tag}
                  </span>
                  {p.storeUrl ? (
                    <StoreLink title={p.title} url={p.storeUrl} />
                  ) : (
                    <GithubLink title={p.title} url={p.url} />
                  )}
                </div>
                <h3 className="proj-card__title">{p.title}</h3>
                <p className="proj-card__summary">{p.summary}</p>
                <TechRow items={p.tech} max={4} />
                <span className="proj-card__detail-hint">
                  Detayı gör <FiArrowUpRight />
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {active && <ProjectModal project={active} onClose={close} />}
    </section>
  )
}

export default Projects
