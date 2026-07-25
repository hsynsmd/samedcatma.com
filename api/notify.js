// Ziyaret & etkinlik bildirimlerini Telegram'a ileten sunucu fonksiyonu.
// Vercel bu dosyayı otomatik olarak bir serverless function'a çevirir (/api/notify).
// Bot token ve chat id, Vercel ortam değişkenlerinden okunur — istemciye asla gitmez.
//
// GÜVENLİK: Bu uç nokta herkese açıktır (anonim ziyaretçiler tetikler). Bu yüzden
// gövdeden gelen HİÇBİR metne güvenilmez: değerler HTML-escape edilir, uzunlukları
// sınırlanır ve serbest metin alanları (proje/kanal) sabit bir beyaz listeyle
// doğrulanır. Böylece istemci yalnızca önceden tanımlı bildirimleri tetikleyebilir,
// kendi yazdığı metni Telegram'a enjekte edemez.

// Telegram parse_mode: 'HTML' kullandığı için özel karakterler kaçırılmalı.
function escapeHtml(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

// Kontrol karakterlerini (satır sonu dahil) boşluğa çevir, kırp, uzunluğu sınırla, escape et.
function clean(s, max = 80) {
  let out = ''
  for (const ch of String(s == null ? '' : s)) {
    const c = ch.codePointAt(0)
    out += c < 32 || c === 127 ? ' ' : ch
  }
  return escapeHtml(out.replace(/\s+/g, ' ').trim().slice(0, max))
}

// İstemcinin tetikleyebileceği tek geçerli değerler — Projects.jsx / Contact.jsx ile
// senkron tutulmalı. Buraya uymayan proje/kanal isimleri reddedilir.
const PROJECTS = new Set([
  'Market Zinciri Otomasyonu',
  'Gündem AI',
  'SmartVisionAssist',
  'Makale Yönetim Platformu',
])
const CHANNELS = new Set([
  'E-posta',
  'E-posta (Merhaba De)',
  'GitHub',
  'LinkedIn',
  'Telefon',
])
const TYPES = new Set(['visit', 'cv', 'contact', 'project'])

// Basit, en-iyi-çaba (best-effort) IP bazlı hız sınırı. Vercel örnekleri sıcak
// kaldığı sürece Map korunur; bir spam patlamasının çoğunu yakalar. Kesin bir
// çözüm için Upstash/Vercel KV gerekir, ama portföy için bu yeterli.
const HITS = new Map()
const WINDOW_MS = 60_000
const MAX_HITS = 12
function rateLimited(ip) {
  const now = Date.now()
  const recent = (HITS.get(ip) || []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  HITS.set(ip, recent)
  if (HITS.size > 1000) {
    for (const [k, v] of HITS) {
      if (!v.some((t) => now - t < WINDOW_MS)) HITS.delete(k)
    }
  }
  return recent.length > MAX_HITS
}

function allowedOrigin(origin) {
  if (!origin) return false
  try {
    const host = new URL(origin).hostname
    return (
      host === 'samedcatma.com' ||
      host.endsWith('.samedcatma.com') ||
      host.endsWith('.vercel.app')
    )
  } catch {
    return false
  }
}

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

  // Yalnızca kendi sitemizden gelen istekleri kabul et. Origin başlığı tarayıcı
  // tarafından POST isteklerinde her zaman gönderilir; eksikse veya eşleşmiyorsa
  // reddet. (Origin taklit edilebilir, bu yüzden tek savunma değil — aşağıdaki
  // beyaz liste + escape asıl korumadır.)
  if (!allowedOrigin(h['origin'] || '')) {
    res.status(403).json({ error: 'Forbidden' })
    return
  }

  const ip =
    (h['x-forwarded-for'] || '').split(',')[0].trim() ||
    h['x-real-ip'] ||
    'unknown'
  if (rateLimited(ip)) {
    res.status(429).json({ error: 'Too many requests' })
    return
  }

  let body
  try {
    const raw = req.body || {}
    body = typeof raw === 'string' ? JSON.parse(raw || '{}') : raw
  } catch {
    res.status(400).json({ error: 'Bad request' })
    return
  }

  const { type = 'visit', project = '', channel = '', referrer = '' } = body

  // type beyaz listede olmalı
  if (!TYPES.has(type)) {
    res.status(400).json({ error: 'Bad request' })
    return
  }
  // Serbest metin alanları yalnızca önceden tanımlı değerlerden olabilir.
  // Bu, istemcinin Telegram'a keyfi metin enjekte etmesini engeller.
  if (type === 'project' && !PROJECTS.has(project)) {
    res.status(400).json({ error: 'Bad request' })
    return
  }
  if (type === 'contact' && !CHANNELS.has(channel)) {
    res.status(400).json({ error: 'Bad request' })
    return
  }

  const country = h['x-vercel-ip-country'] || ''
  const cityRaw = h['x-vercel-ip-city'] || ''
  let city = ''
  try {
    city = cityRaw ? decodeURIComponent(cityRaw) : ''
  } catch {
    city = cityRaw
  }
  const { device, browser, os } = parseUA(h['user-agent'] || '')

  const loc = clean([city, country].filter(Boolean).join(', '), 60) || 'Konum bilinmiyor'
  const line2 = `📍 ${flag(country)} ${loc}\n💻 ${device} · ${browser} · ${os}`

  let text
  if (type === 'cv') {
    text = `📄 <b>Biri CV'ni indirdi!</b>\n\n${line2}`
  } else if (type === 'contact') {
    text = `🤝 <b>Biri iletişime yöneldi</b>\n«${clean(channel)}»\n\n${line2}`
  } else if (type === 'project') {
    text = `👀 <b>Projene bakıldı</b>\n«${clean(project)}»\n\n${line2}`
  } else {
    let src = 'Doğrudan giriş'
    if (referrer) {
      try {
        src = new URL(referrer).hostname.replace(/^www\./, '')
      } catch {
        src = referrer
      }
    }
    text = `🔔 <b>Biri sitene baktı</b>\n\n${line2}\n🔗 Kaynak: ${clean(src, 60)}`
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
