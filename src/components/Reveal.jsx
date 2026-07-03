import { useEffect, useRef, useState } from 'react'
import './Reveal.css'

/**
 * Reveal — içine konulan içeriği, ekrana girdiğinde
 * yumuşakça (fade + yukarı kayma) gösterir.
 *
 * Kullanım:
 *   <Reveal>içerik</Reveal>
 *   <Reveal delay={0.1}>içerik</Reveal>
 *   <Reveal as="h2">Başlık</Reveal>
 */
function Reveal({ children, delay = 0, as: Tag = 'div', className = '', ...rest }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'reveal--in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export default Reveal
