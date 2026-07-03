import './Aurora.css'

/**
 * Aurora — yavaşça süzülen ışık bulutlarından oluşan animasyonlu arka plan.
 * Tamamen CSS ile çalışır (performanslı, ek kütüphane gerektirmez).
 */
function Aurora() {
  return (
    <div className="aurora" aria-hidden="true">
      <div className="aurora__blob aurora__blob--1" />
      <div className="aurora__blob aurora__blob--2" />
      <div className="aurora__blob aurora__blob--3" />
      <div className="aurora__grid" />
    </div>
  )
}

export default Aurora
