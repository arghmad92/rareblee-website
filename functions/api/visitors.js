// Simple visitor counter using Cloudflare Pages KV-like approach
// Falls back gracefully if no storage is available
export async function onRequest(context) {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-cache',
  };

  try {
    const kv = context.env.VISITORS;

    // If KV is bound, use it
    if (kv) {
      const current = parseInt(await kv.get('count') || '0', 10);
      const newCount = current + 1;
      await kv.put('count', String(newCount));
      return new Response(JSON.stringify({ count: newCount }), { headers });
    }

    // No KV — return a simple page-view estimate based on date
    // This is a placeholder until KV is set up
    return new Response(JSON.stringify({ count: 0 }), { headers });
  } catch {
    return new Response(JSON.stringify({ count: 0 }), { headers });
  }
}
