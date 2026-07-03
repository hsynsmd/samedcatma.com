import { createContext, useContext, useEffect, useRef, useCallback } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

const TransitionContext = createContext(() => {})
export const useTransition = () => useContext(TransitionContext)

/**
 * TransitionProvider — tüm sayfaya yumuşak, eylemsizlikli kaydırma (Lenis) verir.
 * Hem fare tekerleği hem de menü tıklamaları akıcı, birbirine bağlı hissettirir.
 */
export function TransitionProvider({ children }) {
  const lenisRef = useRef(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      // Yumuşak, doğal yavaşlama eğrisi
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })
    lenisRef.current = lenis

    // Açılışta en üstte başla
    lenis.scrollTo(0, { immediate: true })

    let rafId
    const raf = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  const navigate = useCallback((id) => {
    const el = document.getElementById(id)
    if (!el) return
    const lenis = lenisRef.current
    if (lenis) {
      lenis.scrollTo(el, { offset: -70, duration: 1.4 })
    } else {
      // Hareket hassasiyeti açıksa sade kaydırma
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  return (
    <TransitionContext.Provider value={navigate}>
      {children}
    </TransitionContext.Provider>
  )
}
