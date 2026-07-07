import { FiArrowRight, FiDownload, FiGithub, FiLinkedin, FiMail, FiChevronDown } from 'react-icons/fi'
import AgentOrchestra from './AgentOrchestra'
import DotField from './DotField'
import Magnetic from './Magnetic'
import DecryptedText from './DecryptedText'
import ShinyText from './ShinyText'
import StarBorder from './StarBorder'
import { useTransition } from './PageTransition'
import { notifyOnce } from '../lib/notify'
import './Hero.css'

const NAME = 'Hüseyin Samed Çatma'

function Hero() {
  const navigate = useTransition()

  return (
    <section className="hero" id="home">
      <div className="hero__bg">
        <DotField
          dotRadius={1.5}
          dotSpacing={16}
          bulgeStrength={60}
          glowRadius={160}
          sparkle={false}
          waveAmplitude={0}
          gradientFrom="rgba(91, 108, 255, 0.40)"
          gradientTo="rgba(242, 178, 92, 0.22)"
        />
      </div>

      <div className="hero__grid">
        <div className="hero__copy">
          <p className="hero__eyebrow">
            <span className="hero__pulse" /> AI · ML/DL · NLP · LLM AGENTS
          </p>
          <h1 className="hero__name">
            <ShinyText text={NAME} speed={4} spread={80} color="#ECEEF6" shineColor="#7C8CFF" />
          </h1>
          <p className="hero__role">
            <DecryptedText
              text="AI & Intelligent Systems Developer"
              animateOn="view"
              sequential
              revealDirection="start"
              speed={42}
              maxIterations={14}
              className="hero__role-on"
              encryptedClassName="hero__role-enc"
            />
          </p>
          <p className="hero__tagline">
            Makine öğrenmesi, derin öğrenme, doğal dil işleme, görüntü işleme ve LLM
            tabanlı ajan sistemleri üzerine çalışan bilgisayar mühendisliği öğrencisiyim.
            Yapay zekâyı; veri, backend, web/mobil arayüz ve otomasyon katmanlarıyla
            birleştirerek gerçek dünya problemlerine uygulanabilir akıllı sistemler
            geliştirmeye odaklanıyorum.
          </p>
          <div className="hero__cta">
            <Magnetic>
              <StarBorder
                as="a"
                href="#projects"
                className="cta-star"
                color="#F2B25C"
                speed="5s"
                onClick={(e) => { e.preventDefault(); navigate('projects') }}
              >
                Projelerim <FiArrowRight />
              </StarBorder>
            </Magnetic>
            <Magnetic>
              <a href="/Huseyin_Samed_Catma_CV.pdf" className="btn btn--ghost btn--lg"
                 target="_blank" rel="noopener noreferrer"
                 onClick={() => notifyOnce('notified-cv', { type: 'cv' })}><FiDownload /> CV İndir</a>
            </Magnetic>
          </div>

          <div className="hero__meta">
            <span className="hero__available">
              <span className="hero__available-dot" /> Müsait
            </span>
            <div className="hero__socials">
              <a href="https://github.com/hsynsmd" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                 onClick={() => notifyOnce('notified-contact-GitHub', { type: 'contact', channel: 'GitHub' })}>
                <FiGithub /><span className="hero__social-label">GitHub</span>
              </a>
              <a href="https://linkedin.com/in/hsynsmd" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                 onClick={() => notifyOnce('notified-contact-LinkedIn', { type: 'contact', channel: 'LinkedIn' })}>
                <FiLinkedin /><span className="hero__social-label">LinkedIn</span>
              </a>
              <a href="mailto:hsynsamed@gmail.com" aria-label="E-posta"
                 onClick={() => notifyOnce('notified-contact-E-posta', { type: 'contact', channel: 'E-posta' })}>
                <FiMail /><span className="hero__social-label">E-posta</span>
              </a>
            </div>
          </div>
        </div>

        <div className="hero__visual">
          <AgentOrchestra />
        </div>
      </div>

      <a
        href="#about"
        className="hero__scroll"
        onClick={(e) => { e.preventDefault(); navigate('about') }}
        aria-label="Aşağı kaydır"
      >
        <span className="hero__scroll-line" />
        <FiChevronDown className="hero__scroll-chevron" />
      </a>
    </section>
  )
}

export default Hero
