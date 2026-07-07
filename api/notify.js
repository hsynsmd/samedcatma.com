// Ziyaret & etkinlik bildirimlerini Telegram'a ileten sunucu fonksiyonu.
// Vercel bu dosyayı otomatik olarak bir serverless function'a çevirir (/api/notify).
// Bot token ve chat id, Vercel ortam değişkenlerinden okunur — istemciye asla gitmez.

function flag(cc) {
  if (!cc || cc.length !== 2) return '🌍'
  return String.fromCodePoint(
    ...[...cc.toUpperCase()].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65)
  )
}

function parseUA(ua = '') {
  const mobile = /Mobile|Android|iPhone|iPad|iPod/i.test(ua)
  let browser = 'Bilinmeyen tarayıcı'
  if (/Edg\//.test(ua)) browser = 'Edge'
  else if (/OPR\/|Opera/.test(ua)) browser = 'Opera'
  else if (/Chrome\//.test(ua)) browser = 'Chrome'
  else if (/Firefox\//.test(ua)) browser = 'Firefox'
  else if (/Safari\//.test(ua)) browser = 'Safari'
  let os = 'Bilinmeyen sistem'
  if (/Windows/.test(ua)) os = 'Windows'
  else if (/Android/.test(ua)) os = 'Android'
  else if (/iPhone|iPad|iPod/.test(ua)) os = 'iOS'
  else if (/Mac OS X/.test(ua)) os = 'macOS'
  else if (/Linux/.test(ua)) os = 'Linux'
  return { device: mobile ? 'Mobil' : 'Masaüstü', browser, os }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) {
    res.status(500).json({ error: 'Bot yapılandırılmamış' })
    return
  }

  const h = req.headers

  // Yalnızca kendi sitemizden gelen istekleri kabul et (basit spam koruması)
  const origin = h['origin'] || ''
  if (origin && !/samedcatma\.com$|\.vercel\.app$/.test(new URL(origin).hostname)) {
    res.status(403).json({ error: 'Forbidden' })
    return
  }

  const raw = req.body || {}
  const body = typeof raw === 'string' ? JSON.parse(raw || '{}') : raw
  const { type = 'visit', project = '', referrer = '' } = body

  const country = h['x-vercel-ip-country'] || ''
  const cityRaw = h['x-vercel-ip-city'] || ''
  let city = ''
  try {
    city = cityRaw ? decodeURIComponent(cityRaw) : ''
  } catch {
    city = cityRaw
  }
  const { device, browser, os } = parseUA(h['user-agent'] || '')

  const loc = [city, country].filter(Boolean).join(', ') || 'Konum bilinmiyor'
  const line2 = `📍 ${flag(country)} ${loc}\n💻 ${device} · ${browser} · ${os}`

  let text
  if (type === 'project') {
    text = `👀 <b>Projene bakıldı</b>\n«${project}»\n\n${line2}`
  } else {
    let src = 'Doğrudan giriş'
    if (referrer) {
      try {
        src = new URL(referrer).hostname.replace(/^www\./, '')
      } catch {
        src = referrer
      }
    }
    text = `🔔 <b>Biri sitene baktı</b>\n\n${line2}\n🔗 Kaynak: ${src}`
  }

  try {
    const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    })
    if (!tg.ok) {
      res.status(502).json({ error: 'Telegram hatası', detail: await tg.text() })
      return
    }
    res.status(200).json({ ok: true })
  } catch (e) {
    res.status(500).json({ error: String(e) })
  }
}
