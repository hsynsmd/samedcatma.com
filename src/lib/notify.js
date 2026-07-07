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

// Aynı olayı bir oturumda yalnızca bir kez bildirir (örn. CV indirme)
export function notifyOnce(key, payload) {
  if (typeof window === 'undefined') return
  try {
    if (sessionStorage.getItem(key)) return
    sessionStorage.setItem(key, '1')
  } catch {
    /* sessionStorage engelliyse yine de bildir */
  }
  notify(payload)
}
