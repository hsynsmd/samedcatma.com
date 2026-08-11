// Ziyaret & etkinlik bildirimlerini Telegram'a ileten sunucu fonksiyonu.
// Vercel bu dosyayı otomatik olarak bir serverless function'a çevirir (/api/notify).
// Bot token ve chat id, Vercel ortam değişkenlerinden okunur — istemciye asla gitmez.
//
// GÜVENLİK: Bu uç nokta herkese açıktır (anonim ziyaretçiler tetikler). Bu yüzden
// gövdeden gelen HİÇBİR metin mesaja olduğu gibi yazılmaz. type/proje/kanal sabit
// beyaz listelerle doğrulanır; referrer ise tanınan alan adları için sabit bir
// etikete (Google, LinkedIn, ...) çevrilir, tanınmıyorsa "Diğer site" basılır.
// Sonuç: mesajın tamamı sunucu tarafından üretilen sabit metinlerden oluşur —
// istemcinin yazdığı tek bir karakter bile Telegram'a ulaşmaz.
// Hacim tarafında IP başına sınır + global tavan/susturma vardır.

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

// Ziyaret bildirimindeki "Kaynak" satırı da istemciden geliyordu ve serbest metindi.
// Artık ham referrer ASLA mesaja yazılmaz: tanınan bir alan adıysa sabit etiketi,
// değilse "Diğer site" basılır. Böylece mesajda istemci kaynaklı tek bir serbest
// karakter bile kalmaz.
const REFERRERS = [
  ['google.', 'Google'],
  ['bing.', 'Bing'],
  ['yandex.', 'Yandex'],
  ['duckduckgo.', 'DuckDuckGo'],
  ['linkedin.', 'LinkedIn'],
  ['lnkd.in', 'LinkedIn'],
  ['github.', 'GitHub'],
  ['instagram.', 'Instagram'],
  ['twitter.', 'X'],
  ['x.com', 'X'],
  ['t.co', 'X'],
  ['facebook.', 'Facebook'],
  ['youtube.', 'YouTube'],
  ['chatgpt.', 'ChatGPT'],
  ['openai.', 'ChatGPT'],
  ['claude.ai', 'Claude'],
  ['reddit.', 'Reddit'],
  ['medium.', 'Medium'],
  ['apps.apple.com', 'App Store'],
  ['samedcatma.com', 'Site içi'],
]
function sourceLabel(referrer) {
  if (!referrer || typeof referrer !== 'string' || referrer.length > 500) {
    return 'Doğrudan giriş'
  }
  let host
  try {
    const u = new URL(referrer)
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return 'Diğer site'
    host = u.hostname.toLowerCase()
  } catch {
    return 'Diğer site'
  }
  for (const [needle, label] of REFERRERS) {
    if (host.includes(needle)) return label
  }
  return 'Diğer site'
}

// Basit, en-iyi-çaba (best-effort) hız sınırı. Vercel örnekleri sıcak kaldığı
// sürece Map korunur. IP başına sınır IP döndürerek aşılabilir, bu yüzden asıl
// koruma GLOBAL tavan: kim tetiklerse tetiklesin belli bir süre içinde şu kadardan
// fazla bildirim gelmez, sonrasında uç nokta kendini susturur.
// (Kesin çözüm için Upstash/Vercel KV gerekir; portföy için bu tavan yeterli.)
const HITS = new Map()
const WINDOW_MS = 60_000
const MAX_PER_IP = 6

const GLOBAL_WINDOW_MS = 10 * 60_000
const MAX_GLOBAL = 20
const MUTE_MS = 30 * 60_000
let globalHits = []
let mutedUntil = 0

function ipLimited(ip) {
  const now = Date.now()
  const recent = (HITS.get(ip) || []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  HITS.set(ip, recent)
  if (HITS.size > 1000) {
    for (const [k, v] of HITS) {
      if (!v.some((t) => now - t < WINDOW_MS)) HITS.delete(k)
    }
  }
  return recent.length > MAX_PER_IP
}

// Dönüş: 'ok' | 'muted' (sessizce yut) | 'mute-now' (tek bir uyarı gönder, sonra sus)
function globalGate() {
  const now = Date.now()
  if (now < mutedUntil) return 'muted'
  globalHits = globalHits.filter((t) => now - t < GLOBAL_WINDOW_MS)
  globalHits.push(now)
  if (globalHits.length > MAX_GLOBAL) {
    mutedUntil = now + MUTE_MS
    return 'mute-now'
  }
  return 'ok'
}

function allowedOrigin(origin) {
  if (!origin) return false
  try {
    const host = new URL(origin).hostname
    // Sadece kendi alan adımız. ".vercel.app" joker kartı kaldırıldı: o kalıp
    // herkesin kendi vercel sayfasından buraya istek atmasına izin veriyordu.
    // (Yan etki: preview deploy'larından bildirim gelmez — istenen davranış.)
    return host === 'samedcatma.com' || host.endsWith('.samedcatma.com')
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

  // Vercel'in kendi doldurduğu başlıkları önce dene; x-forwarded-for son çare.
  const ip =
    h['x-vercel-forwarded-for'] ||
    h['x-real-ip'] ||
    (h['x-forwarded-for'] || '').split(',')[0].trim() ||
    'unknown'
  if (ipLimited(ip)) {
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
    text = `🔔 <b>Biri sitene baktı</b>\n\n${line2}\n🔗 Kaynak: ${sourceLabel(referrer)}`
  }

  // Global tavan: aşılırsa tek bir uyarı gönderilir, sonrası sessizce yutulur.
  const gate = globalGate()
  if (gate === 'muted') {
    res.status(429).json({ error: 'Too many requests' })
    return
  }
  if (gate === 'mute-now') {
    text =
      `🛑 <b>Bildirim seli algılandı</b>\n` +
      `Son ${GLOBAL_WINDOW_MS / 60000} dakikada ${MAX_GLOBAL}+ tetikleme geldi.\n` +
      `Bildirimler ${MUTE_MS / 60000} dakika susturuldu.`
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
