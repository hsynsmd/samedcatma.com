import { FiShield, FiGitBranch, FiLayers, FiTarget } from 'react-icons/fi'
import Reveal from './Reveal'
import WordReveal from './WordReveal'
import MagicBento from './MagicBento'
import './About.css'

const principles = [
  { Icon: FiShield, glow: '91, 108, 255', title: 'Yapay Zeka Odaklı Geliştirme', description: 'ML, deep learning, NLP ve computer vision alanlarında model ve uygulama odaklı çalışmalar yapıyorum.' },
  { Icon: FiGitBranch, glow: '91, 214, 176', title: 'LLM & Agent Sistemleri', description: 'RAG, tool calling ve orchestrator pattern ile LLM tabanlı akıllı iş akışları geliştiriyorum.' },
  { Icon: FiLayers, glow: '242, 178, 92', title: 'AI Destekli Mobil Ürünler', description: 'React Native ve Expo ile Gündem AI gibi yapay zeka destekli mobil uygulamalar geliştiriyorum.' },
  { Icon: FiTarget, glow: '139, 155, 255', title: 'Uçtan Uca Sistem Kurma', description: 'Backend, API, veritabanı, web/mobil arayüz ve yapay zeka katmanlarını entegre ederek çalışan ürünler geliştiriyorum.' },
]

function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <Reveal as="div" className="about__kicker">
          <span className="about__line" />
          HAKKIMDA
        </Reveal>

        <h2 className="about__statement">
          <WordReveal
            as="span"
            text="Yapay zeka, makine öğrenmesi ve akıllı sistemler üzerine çalışan bir bilgisayar mühendisliği öğrencisiyim."
          />
        </h2>

        <Reveal as="p" className="about__sub" delay={0.15}>
          Makine öğrenmesi, derin öğrenme, doğal dil işleme, görüntü işleme ve LLM tabanlı
          ajan sistemleri üzerine çalışıyorum. Python, FastAPI, LangChain, Google Gemini,
          React Native ve modern backend teknolojileriyle yapay zeka modellerini gerçek
          dünya problemlerine uygulanabilir sistemlere dönüştürmeye odaklanıyorum.
        </Reveal>

        <Reveal as="p" className="about__sub about__sub--second" delay={0.2}>
          Özellikle talep tahmini, karar destek sistemleri, RAG tabanlı uygulamalar, çok
          ajanlı mimariler, AI destekli mobil uygulamalar ve akıllı otomasyon çözümleri
          geliştiriyorum. Amacım, yapay zekâyı yalnızca model seviyesinde bırakmadan; veri,
          backend, web/mobil arayüz ve otomasyon katmanlarıyla birlikte uçtan uca çalışan
          ürünlere dönüştürmek.
        </Reveal>

        <Reveal className="about__bento" delay={0.15}>
          <MagicBento
            cards={principles}
            numbered
            glowColor="91, 108, 255"
            textAutoHide={false}
            enableStars
            enableSpotlight
            enableBorderGlow
            enableMagnetism
            clickEffect
            spotlightRadius={280}
            particleCount={10}
          />
        </Reveal>
      </div>
    </section>
  )
}

export default About
