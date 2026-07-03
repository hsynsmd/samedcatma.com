import { useEffect, useRef, useState } from 'react'
import './WordReveal.css'

/**
 * WordReveal — bir metni kelime kelime, blur'dan netleşerek
 * ve yukarıdan süzülerek gösterir (ekrana girince tetiklenir).
 */
function WordReveal({ text, as: Tag = 'p', className = '', stagger = 0.045, start = 0 }) {
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
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const words = text.split(' ')

  return (
    <Tag ref={ref} className={`word-reveal ${visible ? 'in' : ''} ${className}`}>
      {words.map((w, i) => (
        <span
          className="word-reveal__w"
          key={i}
          style={{ transitionDelay: `${start + i * stagger}s` }}
        >
          {w}
        </span>
      ))}
    </Tag>
  )
}

export default WordReveal
