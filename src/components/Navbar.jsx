import { useEffect, useState } from 'react'
import GooeyNav from './GooeyNav'
import { useTransition } from './PageTransition'
import './Navbar.css'

const links = [
  { id: 'home', label: 'Ana Sayfa' },
  { id: 'about', label: 'Hakkımda' },
  { id: 'projects', label: 'Projeler' },
  { id: 'skills', label: 'Yetenekler' },
  { id: 'experience', label: 'Deneyim' },
  { id: 'contact', label: 'İletişim' },
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState(false)
  const navigate = useTransition()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll-spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = links.findIndex((l) => l.id === entry.target.id)
            if (idx >= 0) setActive(idx)
          }
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    )
    links.forEach((l) => {
      const el = document.getElementById(l.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const goMobile = (id) => {
    setOpen(false)
    navigate(id)
  }

  return (
    <>
      <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
        <div className="nav__inner">
          <a
            href="#home"
            className="nav__logo"
            onClick={(e) => { e.preventDefault(); navigate('home') }}
            aria-label="HSÇ — Ana sayfa"
          >
            <span className="nav__badge">
              HSÇ
              <span className="nav__badge-node" aria-hidden="true" />
            </span>
          </a>

          <div className="nav__desktop">
            <GooeyNav
              items={links.map((l) => ({ label: l.label, href: `#${l.id}` }))}
              colors={[1, 2, 3, 4, 1, 2, 3, 4]}
              particleCount={15}
              animationTime={600}
              activeIndex={active}
              onSelect={(index) => navigate(links[index].id)}
            />
          </div>

          <button
            className={`nav__burger ${open ? 'nav__burger--open' : ''}`}
            aria-label="Menü"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* Mobil menü — sabit menü çubuğunun overflow'undan etkilenmesin diye dışarıda */}
      <div className={`nav-mobile ${open ? 'nav-mobile--open' : ''}`}>
        <nav className="nav-mobile__panel">
          {links.map((l, i) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={active === i ? 'is-active' : ''}
              onClick={(e) => { e.preventDefault(); goMobile(l.id) }}
            >
              <span className="nav-mobile__idx">0{i + 1}</span>
              {l.label}
            </a>
          ))}
        </nav>
      </div>
      <div
        className={`nav-mobile__scrim ${open ? 'nav-mobile__scrim--on' : ''}`}
        onClick={() => setOpen(false)}
      />
    </>
  )
}

export default Navbar
