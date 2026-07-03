import { FiShare2, FiServer, FiCpu, FiDatabase, FiCode, FiTool } from 'react-icons/fi'
import {
  SiLangchain, SiGooglegemini, SiFastapi, SiFlask, SiNodedotjs, SiExpress, SiSqlalchemy,
  SiOpencv, SiScikitlearn, SiPandas, SiPostgresql, SiSupabase, SiSqlite, SiMysql,
  SiPython, SiTypescript, SiJavascript, SiC, SiReact, SiExpo, SiVite,
  SiGit, SiPostman, SiPycharm, SiWebstorm, SiGooglecolab, SiJsonwebtokens,
} from 'react-icons/si'
import Reveal from './Reveal'
import GradientText from './GradientText'
import './Skills.css'

/* Marka logoları + resmî renkler (koyu zeminde okunur tonlar) */
const BRAND = {
  'LangChain': [SiLangchain, '#2ECC9B'],
  'Google Gemini': [SiGooglegemini, '#8AB4F8'],
  'FastAPI': [SiFastapi, '#2EC4B6'],
  'Flask': [SiFlask, '#E8EAF0'],
  'Node.js': [SiNodedotjs, '#7FC267'],
  'Express.js': [SiExpress, '#C9D1E0'],
  'SQLAlchemy ORM': [SiSqlalchemy, '#D0563B'],
  'JWT': [SiJsonwebtokens, '#FB60C4'],
  'OpenCV': [SiOpencv, '#7C6BFF'],
  'YOLOv8': null,
  'scikit-learn': [SiScikitlearn, '#F89939'],
  'pandas': [SiPandas, '#C77DD6'],
  'PostgreSQL': [SiPostgresql, '#5BA3D0'],
  'Supabase': [SiSupabase, '#3ECF8E'],
  'SQLite': [SiSqlite, '#5BC0EB'],
  'MySQL': [SiMysql, '#4DB6D0'],
  'Python': [SiPython, '#FFD43B'],
  'TypeScript': [SiTypescript, '#4D9BE6'],
  'JavaScript': [SiJavascript, '#F7DF1E'],
  'C': [SiC, '#8AB4D8'],
  'React.js': [SiReact, '#61DAFB'],
  'React Native': [SiReact, '#61DAFB'],
  'Expo': [SiExpo, '#E8EAF0'],
  'Vite': [SiVite, '#B16BF0'],
  'Git': [SiGit, '#F05133'],
  'Postman': [SiPostman, '#FF6C37'],
  'PyCharm': [SiPycharm, '#34D399'],
  'WebStorm': [SiWebstorm, '#38BDF8'],
  'Google Colab': [SiGooglecolab, '#F9AB00'],
}

const groups = [
  {
    key: 'ml',
    label: 'Yapay Zekâ & ML',
    Icon: FiCpu,
    items: ['Makine Öğrenmesi', 'Derin Öğrenme', 'NLP', 'Görüntü İşleme', 'OpenCV', 'YOLOv8', 'CatBoost', 'scikit-learn', 'pandas'],
  },
  {
    key: 'agent',
    label: 'LLM & Agent Sistemleri',
    Icon: FiShare2,
    items: ['LangChain', 'Google Gemini', 'Multi-Agent Architecture', 'Orchestrator Pattern', 'Tool Calling', 'Agent-to-Agent Communication', 'RAG', 'SSE Streaming'],
  },
  {
    key: 'backend',
    label: 'Backend & API',
    Icon: FiServer,
    items: ['FastAPI', 'Flask', 'Node.js', 'Express.js', 'REST API', 'JWT', 'SQLAlchemy ORM', 'Mikroservis Mimarisi', 'Server-Sent Events'],
  },
  {
    key: 'db',
    label: 'Veritabanı',
    Icon: FiDatabase,
    items: ['PostgreSQL', 'Supabase', 'SQLite', 'MySQL', 'Full-Text Search', 'Row Level Security'],
  },
  {
    key: 'lang',
    label: 'Programlama, Web & Mobil',
    Icon: FiCode,
    items: ['Python', 'TypeScript', 'JavaScript', 'SQL', 'C', 'React.js', 'React Native', 'Expo', 'Vite'],
  },
  {
    key: 'tools',
    label: 'Araçlar',
    Icon: FiTool,
    items: ['Git', 'APScheduler', 'node-cron', 'Postman', 'PyCharm', 'WebStorm', 'Google Colab', 'MATLAB'],
  },
]

function Skills() {
  return (
    <section className="skills" id="skills">
      <div className="container">
        <Reveal as="div" className="skills__kicker">
          <span className="skills__line" />
          YETENEKLER
        </Reveal>
        <Reveal as="h2" className="skills__title" delay={0.05}>
          <GradientText className="grad-title" colors={['#5B6CFF', '#8B9BFF', '#F2B25C']} animationSpeed={10}>
            Teknik Yetenekler
          </GradientText>
        </Reveal>
        <Reveal as="p" className="skills__lead" delay={0.1}>
          Ajan sistemlerinden veri katmanına — uçtan uca kullandığım teknolojiler.
        </Reveal>

        <div className="skills__rows">
          {groups.map((g, gi) => (
            <Reveal className="skill-row" key={g.key} delay={0.1 + gi * 0.06}>
              <div className="skill-row__head">
                <span className="skill-row__icon"><g.Icon /></span>
                <span className="skill-row__label">{g.label}</span>
              </div>
              <div className="skill-row__tags">
                {g.items.map((it) => {
                  const brand = BRAND[it]
                  const Logo = brand ? brand[0] : null
                  return (
                    <span
                      className={`skill-tag ${Logo ? 'skill-tag--brand' : 'skill-tag--concept'}`}
                      key={it}
                      style={Logo ? { '--brand': brand[1] } : undefined}
                    >
                      {Logo
                        ? <Logo className="skill-tag__logo" aria-hidden="true" />
                        : <span className="skill-tag__dot" aria-hidden="true" />}
                      {it}
                    </span>
                  )
                })}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
