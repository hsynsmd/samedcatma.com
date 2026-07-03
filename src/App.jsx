import { useState, useEffect } from 'react'
import { TransitionProvider } from './components/PageTransition'
import ClickSpark from './components/ClickSpark'
import SplashCursor from './components/SplashCursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import './App.css'

function App() {
  // SplashCursor yalnızca masaüstü + ince imleç + hareket azaltma kapalıyken (perf/erişilebilirlik)
  const [fluid, setFluid] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 769px) and (pointer: fine)')
    const update = () => setFluid(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return (
    <TransitionProvider>
      {fluid && (
        <SplashCursor
          RAINBOW_MODE={false}
          COLOR="#5B6CFF"
          SPLAT_RADIUS={0.13}
          DENSITY_DISSIPATION={4.5}
          VELOCITY_DISSIPATION={2.8}
          SPLAT_FORCE={3500}
          CURL={2}
        />
      )}
      <ClickSpark sparkColor="#F2B25C" sparkCount={10} sparkRadius={18} sparkSize={11} duration={500}>
        <div className="app">
          <Navbar />
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Experience />
          <Contact />
        </div>
      </ClickSpark>
    </TransitionProvider>
  )
}

export default App
