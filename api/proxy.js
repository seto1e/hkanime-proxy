export default async function handler(req, res) {
  const target = decodeURIComponent(req.query.url || '')
  if (!target.startsWith('https://www.hkanime.com/')) {
    return res.status(400).json({ error: 'invalid url' })
  }

  const proxyRes = await fetch(target, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/142.0.0.0 Safari/537.36',
      'Referer': 'https://www.hkanime.com/',
      'Origin': 'https://www.hkanime.com'
    }
  })

  const contentType = proxyRes.headers.get('Content-Type') || 'application/octet-stream'
  res.setHeader('Content-Type', contentType)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.status(proxyRes.status)

  const buffer = await proxyRes.arrayBuffer()
  res.send(Buffer.from(buffer))
}
