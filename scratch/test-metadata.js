const http = require('http');

const routes = [
  '/',
  '/about',
  '/rooms',
  '/rooms/deluxe-queen-room',
  '/rooms/deluxe-twin-room',
  '/rooms/family-room',
  '/rooms/business-single-room',
  '/rooms/non-existent-room',
  '/experiences',
  '/experiences/wine-country',
  '/experiences/eat-and-drink',
  '/experiences/things-to-do',
  '/gallery',
  '/contact',
  '/privacy-policy',
  '/terms-and-conditions',
  '/admin/login'
];

async function fetchRoute(path) {
  return new Promise((resolve) => {
    http.get(`http://localhost:3005${path}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, html: data }));
    }).on('error', (err) => resolve({ status: 500, html: err.message }));
  });
}

async function main() {
  console.log('=== METADATA VERIFICATION REPORT ===\n');
  for (const route of routes) {
    const { status, html } = await fetchRoute(route);
    console.log(`Route: ${route} (HTTP ${status})`);
    
    const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
    console.log(`  Title: ${titleMatch ? titleMatch[1] : '[NONE]'}`);
    
    const kwMatch = html.match(/<meta\s+name="keywords"\s+content="([^"]*)"/i);
    console.log(`  Keywords: ${kwMatch ? kwMatch[1] : '[NONE]'}`);

    const robotsMatch = html.match(/<meta\s+name="robots"\s+content="([^"]*)"/i);
    console.log(`  Robots: ${robotsMatch ? robotsMatch[1] : '[NONE]'}`);

    const canonicalMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i);
    console.log(`  Canonical: ${canonicalMatch ? canonicalMatch[1] : '[NONE]'}`);

    const ogTitleMatch = html.match(/<meta\s+property="og:title"\s+content="([^"]*)"/i);
    console.log(`  OG Title: ${ogTitleMatch ? ogTitleMatch[1] : '[NONE]'}`);

    console.log('-'.repeat(80));
  }
}

main();
