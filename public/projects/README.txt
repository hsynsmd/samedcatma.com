Proje önizleme görselleri buraya konur (Vite bunları / kök yolundan servis eder).

FORMAT: WebP (max ~1920px genişlik, kalite ~82). Orijinal PNG'ler proje kökündeki
image-backup/ klasöründe yedeklidir — kaliteden memnun kalmazsan oradan geri alınır.

Beklenen dosya adları (Projects.jsx içindeki `image`/`gallery` yollarıyla eşleşir):

  market-zinciri.webp    -> Market Zinciri (amiral gemi kapağı, sohbet ekranı)
  market-zinciri-2.webp  -> Orkestrasyon paneli  (modal galeri)
  market-zinciri-3.webp  -> Katalog & akış        (modal galeri)
  market-zinciri-4.webp  -> Raporlama             (modal galeri)
  gundem-ai.webp         -> Gündem AI     (kapak: Keşfet / günün AI özeti)
  gundem-ai-2.webp       -> Bana Anlat — AI ile sohbet       (modal galeri)
  gundem-ai-3.webp       -> Makale detayı — Bunu Bana Anlat  (modal galeri)
  gundem-ai-4.webp       -> Kütüphane — kaydedilen haberler  (modal galeri)
  gundem-ai-5.webp       -> Profil & kişiselleştirme         (modal galeri)
  (görseller Temmuz 2026 güncel arayüz — image-backup/ altında jpeg yedekleri var)
  smartvision.webp       -> SmartVisionAssist (kapak: yaya geçidi, çoklu tespit)
  smartvision-2.webp     -> Merdiven algılama — tehlike        (modal galeri)
  smartvision-3.webp     -> Cadde — araç tespiti               (modal galeri)
  smartvision-4.webp     -> Yaya + yol tespiti                 (modal galeri)
  smartvision-5.webp     -> Güvenli yol yönlendirmesi          (modal galeri)
  (kareler ProjeSon-main videosundan YOLOv8 ile üretildi; png yedekleri image-backup/)
  makale.webp            -> Makale Platformu (kapak: anasayfa / makale akışı)
  makale-2.webp          -> Makale detayı & yorumlar            (modal galeri)
  makale-3.webp          -> Kontrol paneli — makale yönetimi    (modal galeri)
  makale-4.webp          -> Giriş ekranı                        (modal galeri)
  (arayüz tasarım mockup'ı — SVG'den üretildi; png yedekleri image-backup/)

Yeni görsel eklerken: WebP'ye çevir (ekran görüntüleri için cover, diyagramlar için
contain), ~1920px genişliğe indir; sonra Projects.jsx'te ilgili `image`/`gallery`
yolunun mevcut olduğundan emin ol. Görsel yoksa kart otomatik placeholder gösterir.
