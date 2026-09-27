const http = require('node:http');

function json(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(data));
}

async function body(req) {
  let raw = '';
  for await (const chunk of req) raw += chunk;
  if (!raw) return {};
  try { return JSON.parse(raw); } catch { return {}; }
}

function startServer(port, handler) {
  const server = http.createServer(async (req, res) => {
    try {
      if (req.method === 'OPTIONS') return json(res, 204, {});
      await handler(req, res, await body(req));
    } catch (err) {
      json(res, 500, { error: err.message });
    }
  });
  server.listen(port, () => console.log(`Service listening on http://localhost:${port}`));
}

module.exports = { json, body, startServer };
