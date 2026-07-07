import { FiMail, FiGithub, FiLinkedin, FiMapPin, FiPhone, FiArrowRight, FiDownload } from 'react-icons/fi'
import Strands from './Strands'
import Reveal from './Reveal'
import Magnetic from './Magnetic'
import GradientText from './GradientText'
import ProfileCard from './ProfileCard'
import { notifyOnce } from '../lib/notify'
import portraitImg from '../assets/portrait.jpg'
import './Contact.css'

const channels = [
  { Icon: FiMail, label: 'E-posta', value: 'hsynsamed@gmail.com', href: 'mailto:hsynsamed@gmail.com' },
  { Icon: FiGithub, label: 'GitHub', value: 'github.com/hsynsmd', href: 'https://github.com/hsynsmd' },
  { Icon: FiLinkedin, label: 'LinkedIn', value: 'linkedin.com/in/hsynsmd', href: 'https://linkedin.com/in/hsynsmd' },
]

function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact__bg">
        <Strands
          colors={['#5B6CFF', '#8B9BFF', '#F2B25C']}
          count={3}
          speed={0.4}
          amplitude={1}
          waviness={1}
          thickness={0.6}
          glow={2.4}
          taper={3}
          spread={1}
          intensity={0.5}
          saturation={1.3}
          opacity={0.9}
          scale={1.6}
        />
      </div>

      <div className="container">
        <div className="contact__layout">
          <div className="contact__info">
            <Reveal as="div" className="contact__kicker">
              <span className="contact__line" />
              İLETİŞİM
            </Reveal>
            <Reveal as="h2" className="contact__title" delay={0.05}>
              <GradientText className="grad-title" colors={['#5B6CFF', '#8B9BFF', '#F2B25C']} animationSpeed={10}>
                Birlikte üretelim
              </GradientText>
            </Reveal>
            <Reveal as="p" className="contact__lead" delay={0.1}>
              Staj, proje veya iş birliği için bana ulaşabilirsin. Genelde 1 gün içinde dönüş yaparım.
            </Reveal>

            <Reveal className="contact__channels" delay={0.14}>
              {channels.map((c) => (
                <a
                  className="contact-link"
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${c.label}: ${c.value}`}
                >
                  <span className="contact-link__icon"><c.Icon /></span>
                  <span className="contact-link__text">
                    <span className="contact-link__label">{c.label}</span>
                    <span className="contact-link__value">{c.value}</span>
                  </span>
                </a>
              ))}
            </Reveal>

            <Reveal as="div" className="contact__meta" delay={0.18}>
              <span><FiMapPin /> İstanbul, Türkiye</span>
              <span className="contact__sep">·</span>
              <a href="tel:+905539890306"><FiPhone /> 0553 989 03 06</a>
            </Reveal>

            <Reveal as="div" className="contact__cta" delay={0.22}>
              <Magnetic>
                <a href="mailto:hsynsamed@gmail.com" className="btn btn--primary">Merhaba De <FiArrowRight /></a>
              </Magnetic>
              <Magnetic>
                <a href="/Huseyin_Samed_Catma_CV.pdf" className="btn btn--ghost"
                   target="_blank" rel="noopener noreferrer"
                   onClick={() => notifyOnce('notified-cv', { type: 'cv' })}><FiDownload /> CV İndir</a>
              </Magnetic>
            </Reveal>
          </div>

          <Reveal className="contact__profile" delay={0.15}>
            <ProfileCard
              avatarUrl={portraitImg}
              miniAvatarUrl={portraitImg}
              name="Hüseyin Samed Çatma"
              title="AI & Intelligent Systems Developer"
              showUserInfo={false}
              behindGlowColor="rgba(91, 108, 255, 0.35)"
              innerGradient="linear-gradient(145deg, rgba(91,108,255,0.18) 0%, rgba(242,178,92,0.16) 100%)"
            />
          </Reveal>
        </div>
      </div>

      <footer className="contact__footer">
        <span className="contact__logo">HSÇ<span>.</span></span>
        <p>© <span>{new Date().getFullYear()}</span> Hüseyin Samed Çatma</p>
      </footer>
    </section>
  )
}

export default Contact
