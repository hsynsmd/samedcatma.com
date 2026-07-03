import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

/**
 * SectionTransition — bir bölümü scroll'a bağlı, YUMUŞAK geçişle sarar.
 * Nazik bir belirme + hafif yukarı süzülme. Sert sıçrama/ölçek yok ki
 * hero'nun erime efektiyle çakışıp bozuk görünmesin.
 *
 * Ölçen dış sarmalayıcı (ref) ile hareket eden iç motion.div ayrı tutulur.
 */
function SectionTransition({ children, className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.22, 0.95, 1], [0, 1, 1, 0.7])
  const y = useTransform(scrollYProgress, [0, 0.22], [50, 0])

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ opacity, y }}>{children}</motion.div>
    </div>
  )
}

export default SectionTransition
