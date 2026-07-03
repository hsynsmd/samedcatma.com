Proje önizleme görselleri buraya konur (Vite bunları / kök yolundan servis eder).

FORMAT: WebP (max ~1920px genişlik, kalite ~82). Orijinal PNG'ler proje kökündeki
image-backup/ klasöründe yedeklidir — kaliteden memnun kalmazsan oradan geri alınır.

Beklenen dosya adları (Projects.jsx içindeki `image`/`gallery` yollarıyla eşleşir):

  market-zinciri.webp    -> Market Zinciri (amiral gemi kapağı, sohbet ekranı)
  market-zinciri-2.webp  -> Orkestrasyon paneli  (modal galeri)
  market-zinciri-3.webp  -> Katalog & akış        (modal galeri)
  market-zinciri-4.webp  -> Raporlama             (modal galeri)
  gundem-ai.webp         -> Gündem AI     (HENÜZ YOK - placeholder gösteriliyor)
  smartvision.webp       -> SmartVisionAssist (HENÜZ YOK)
  makale.webp            -> Makale Yönetim Platformu (HENÜZ YOK)

Yeni görsel eklerken: WebP'ye çevir (ekran görüntüleri için cover, diyagramlar için
contain), ~1920px genişliğe indir; sonra Projects.jsx'te ilgili `image`/`gallery`
yolunun mevcut olduğundan emin ol. Görsel yoksa kart otomatik placeholder gösterir.
