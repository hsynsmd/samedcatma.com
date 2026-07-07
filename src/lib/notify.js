// Bildirim gönderme yardımcısı — /api/notify sunucu fonksiyonunu çağırır.
// Localhost'ta (geliştirme) sessizdir; yalnızca canlı sitede tetiklenir.

export function notify(payload) {
  if (typeof window === 'undefined') return
  const host = window.location.hostname
  if (host === 'localhost' || host === '127.0.0.1') return
  try {
    fetch('/api/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {})
  } catch {
    /* bildirim başarısız olsa bile siteyi etkilemesin */
  }
}
