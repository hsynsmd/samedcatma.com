import { useRef } from 'react'

/**
 * Magnetic — içine konulan etkileşimli öğeyi (buton/link) imlece doğru
 * hafifçe çeker; imleç ayrılınca yumuşakça yerine döner.
 * Hareket azaltma tercihine saygı duyar (efekt kapanır).
 *
 * Kullanım:
 *   <Magnetic><a className="btn">...</a></Magnetic>
 */
function Magnetic({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null)

  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  const onMove = (e) => {
    if (reduced) return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - (r.left + r.width / 2)
    const y = e.clientY - (r.top + r.height / 2)
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
  }

  const onLeave = () => {
    const el = ref.current
    if (el) el.style.transform = 'translate(0, 0)'
  }

  return (
    <span
      ref={ref}
      className={`magnetic ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </span>
  )
}

export default Magnetic
