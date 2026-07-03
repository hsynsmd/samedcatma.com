# Projedeki Animasyonlar & Bileşenler (Yeni Oturum İçin Not)

Proje: **Vite + React** — `C:\Users\ASUS\Desktop\web-site`
Çalıştırma: `npm run dev` (port 5173)

## Kurulu npm paketleri
`ogl` · `motion` · `react-icons` · `gsap` · `lenis`

---

## React Bits bileşenleri (dosyaları projede mevcut)

| Bileşen | Ne yapar | Bağımlılık | Şu anki durum | Dosya |
|---------|----------|-----------|---------------|-------|
| **DotField** | Fareyle etkileşen nokta ızgarası (noktalar imleçten şişerek kaçar) | yok (canvas) | ✅ Hero arka planı | `src/components/DotField.jsx` |
| **Strands** | Akışkan, parlayan dalgalı ışık şeridi (WebGL) | `ogl` | ✅ İletişim arka planı | `src/components/Strands.jsx` |
| **GooeyNav** | Yapışkan baloncuk (metaball) menü | yok | ✅ Üst menü (masaüstü) | `src/components/GooeyNav.jsx` |
| **ChromaGrid** | Spot ışıklı kart ızgarası (gri → fareyle renkli) | `gsap` | 💤 Yedekte | `src/components/ChromaGrid.jsx` |
| **Carousel** | 3B dönerek kayan kart galerisi | `motion` | 💤 Yedekte | `src/components/Carousel.jsx` |
| **CardNav** | Hamburger'a basınca açılan kartlı menü | `gsap`, `react-icons` | 💤 Yedekte | `src/components/CardNav.jsx` |

## Bizim özel yaptıklarımız

| Bileşen | Ne yapar | Durum | Dosya |
|---------|----------|-------|-------|
| **AgentOrchestra** | Ajan ağı imzası — merkez orchestrator + 6 ajan, mesaj darbeleri (SVG) | ✅ Hero sağ taraf | `src/components/AgentOrchestra.jsx` |
| **Reveal / WordReveal** | Kaydırınca beliren / kelime kelime beliren animasyon | ✅ Her bölümde | `src/components/Reveal.jsx`, `WordReveal.jsx` |
| **PageTransition** | Lenis yumuşak (eylemsizlikli) kaydırma + menü tıklama kaydırması | ✅ Tüm sayfa | `src/components/PageTransition.jsx` |
| **SectionTransition** | Scroll'a bağlı bölüm geçişi (fade + süzülme) | ⏸️ Şu an KULLANILMIYOR (profesyonel görünüm için kaldırıldı), dosya duruyor | `src/components/SectionTransition.jsx` |

---

## Yeni oturumda AI'ya söyleyebileceğin örnek mesaj

> "Bu proje Vite + React (`C:\Users\ASUS\Desktop\web-site`). İçinde React Bits'ten DotField, Strands, GooeyNav (aktif) ve ChromaGrid, Carousel, CardNav (yedekte) bileşenleri var; ayrıca AgentOrchestra, Reveal/WordReveal, Lenis tabanlı PageTransition var. Kurulu paketler: ogl, motion, react-icons, gsap, lenis. `ui-ux-pro-max` becerisiyle tasarımı cilala; yedekteki ChromaGrid'i gerçek proje ekran görüntüleriyle geri getirmeyi ve SectionTransition geçişlerini profesyonel biçimde yeniden değerlendirmeyi düşün."

## React Bits'ten beğendiklerimiz (istenirse tekrar alınabilir)
- Strands, DotField, Carousel, ChromaGrid, GooeyNav, CardNav — hepsi entegre edildi.
- Kaynak: https://reactbits.dev
