import { FiBookOpen, FiAward, FiStar, FiBriefcase } from 'react-icons/fi'
import Reveal from './Reveal'
import GradientText from './GradientText'
import './Experience.css'

const items = [
  {
    Icon: FiBriefcase,
    kind: 'Staj',
    title: 'Zorunlu Yaz Stajı (Staj-1)',
    org: 'Denizli Orman Bölge Müdürlüğü',
    date: '29 Haz 2026 – 10 Ağu 2026',
    meta: 'Yaz stajı · Süreç analizi & yazılım projesi · Denizli',
    desc: 'Kurumun operasyonel süreçlerindeki sorunları inceleyip, çözüme yönelik bir yazılım projesi geliştiriyorum.',
    accent: 'violet',
    ongoing: true,
  },
  {
    Icon: FiStar,
    kind: 'Ödül',
    title: 'Bitirme Tezi — Bölüm 2.’lik Ödülü',
    org: 'Pamukkale Üniversitesi · Bilgisayar Mühendisliği',
    date: '2026',
    meta: 'LLM tabanlı çok ajanlı market zinciri otomasyonu',
    desc: 'Lisans bitirme tezim, bölüm çapında düzenlenen değerlendirmede ikincilik ödülüne layık görüldü.',
    accent: 'teal',
  },
  {
    Icon: FiAward,
    kind: 'Sertifika',
    title: 'Yapay Zekâ Uzmanlık Programı',
    org: 'Milli Teknoloji Akademisi — T.C. Sanayi ve Teknoloji Bakanlığı',
    date: 'Oca 2026 – Şub 2026',
    meta: 'Temel Eğitim Sertifikası · 10 oturum',
    desc: 'Bakanlık destekli programda yapay zekâ temelleri ve uygulamalı oturumları tamamlayarak sertifika aldım.',
    accent: 'amber',
  },
  {
    Icon: FiBookOpen,
    kind: 'Eğitim',
    title: 'Bilgisayar Mühendisliği',
    org: 'Pamukkale Üniversitesi',
    date: 'Eyl 2022 – Tem 2026',
    meta: '4. Sınıf · GPA 3.23 / 4.00 · Denizli',
    desc: 'Çok ajanlı LLM sistemleri, makine öğrenmesi ve yazılım mühendisliği üzerine yoğunlaşarak lisans eğitimimi sürdürüyorum.',
    accent: 'indigo',
    ongoing: true,
  },
]

function Experience() {
  return (
    <section className="experience" id="experience">
      <div className="container">
        <Reveal as="div" className="experience__kicker">
          <span className="experience__line" />
          DENEYİM & EĞİTİM
        </Reveal>
        <Reveal as="h2" className="experience__title" delay={0.05}>
          <GradientText className="grad-title" colors={['#5B6CFF', '#8B9BFF', '#F2B25C']} animationSpeed={10}>
            Yolculuğum
          </GradientText>
        </Reveal>

        <div className="timeline">
          {items.map((it, i) => (
            <Reveal className="tl-item" key={it.title} delay={0.1 + i * 0.1}>
              <span className={`tl-dot tl-dot--${it.accent}`} />
              <div className={`tl-card tl-card--${it.accent}`}>
                <div className="tl-top">
                  <div className="tl-head">
                    <span className={`tl-icon tl-icon--${it.accent}`}><it.Icon /></span>
                    <div className="tl-headtext">
                      <div className="tl-titlerow">
                        <span className="tl-kind">{it.kind}</span>
                        {it.ongoing && (
                          <span className="tl-live">
                            <span className="tl-live__dot" />
                            Devam ediyor
                          </span>
                        )}
                      </div>
                      <h3>{it.title}</h3>
                      <span className="tl-org">{it.org}</span>
                    </div>
                  </div>
                  <span className="tl-date">{it.date}</span>
                </div>
                <div className="tl-meta">
                  <span className="tl-sub">{it.meta}</span>
                </div>
                <p className="tl-desc">{it.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
