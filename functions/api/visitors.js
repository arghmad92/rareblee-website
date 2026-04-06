export async function onRequest(context) {
  const { env } = context;

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-cache',
  };

  try {
    const kv = env.VISITORS;
    if (!kv) {
      return new Response(JSON.stringify({ count: 0 }), { headers });
    }

    const current = parseInt(await kv.get('count') || '0', 10);
    const newCount = current + 1;
    await kv.put('count', String(newCount));

    return new Response(JSON.stringify({ count: newCount }), { headers });
  } catch {
    return new Response(JSON.stringify({ count: 0 }), { headers });
  }
}
