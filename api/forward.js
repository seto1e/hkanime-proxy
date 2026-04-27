export default async function handler(req, res) {
  const path = req.url.replace('/api/forward', '')
  const target = 'https://hkanime.hjcqvfntxw.workers.dev' + path

  const proxyRes = await fetch(target, {
    headers: { 'Content-Type': 'application/json' }
  })

  const data = await proxyRes.json()
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Content-Type', 'application/json;charset=utf-8')
  res.status(200).json(data)
}
