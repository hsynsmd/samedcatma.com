import { FiGitBranch, FiUploadCloud, FiCheckCircle, FiCompass } from 'react-icons/fi'
import Reveal from './Reveal'
import WordReveal from './WordReveal'
import MagicBento from './MagicBento'
import './About.css'

const principles = [
  { Icon: FiGitBranch, glow: '91, 108, 255', title: 'LLM & Ajan Sistemleri', description: 'Tool calling, agent orchestration ve çok adımlı iş akışları geliştiriyorum. Bitirme projemizde sekiz uzman LLM ajanını merkezi bir orkestratör altında koordine eden bir mimari kurduk.' },
  { Icon: FiUploadCloud, glow: '91, 214, 176', title: 'Gerçek Kullanıma Çıkan Ürünler', description: "Gündem AI'ı App Store'a taşıdım; müşteri web projelerini production ortamına aldım. Deployment, otomatik yayın hatları (CD) ve Sentry tabanlı hata izleme süreçlerinde deneyim kazandım." },
  { Icon: FiCheckCircle, glow: '242, 178, 92', title: 'Mühendislik Disiplini', description: "MiniEBYS'te 36 otomatik test, Radar'da 353 maddelik kabul sınaması ve AARU için tehdit modeliyle geliştirdiğim sistemleri test ve doğrulama süreçleriyle destekliyorum." },
  { Icon: FiCompass, glow: '139, 155, 255', title: 'Şu Anki Odağım', description: "RAG sistemlerinde retrieval ve evaluation, LangGraph ile durum bilgili ajan akışları, MCP entegrasyonları ve yerelde çalışan açık kaynak LLM/SLM'ler üzerine derinleşiyorum." },
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
            text="Yapay zekâyı prototipten gerçek kullanım senaryolarına taşıyan sistemler geliştiriyorum."
          />
        </h2>

        <Reveal as="p" className="about__sub" delay={0.15}>
          Makine öğrenmesi ve görüntü işleme temeliyle başladığım yapay zekâ yolculuğumu bugün
          LLM ve agentic sistemler üzerine sürdürüyorum.
        </Reveal>

        <Reveal as="p" className="about__sub about__sub--second" delay={0.2}>
          Şu an odağımı LLM mühendisliği, RAG ve agentic AI sistemlerinde derinleştiriyorum.
          LangGraph ve MCP ile durum bilgili ajan mimarileri, retrieval sistemleri ve araç
          entegrasyonları üzerinde ilerlerken; açık kaynak modeller, model serving ve production
          AI konularını da teknik yol haritamın bir sonraki aşaması olarak ele alıyorum.
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
