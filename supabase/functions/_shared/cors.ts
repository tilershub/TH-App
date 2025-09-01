// supabase/functions/_shared/cors.ts
export function cors(res: Response, origin = "*") {
  const headers = new Headers(res.headers);
  headers.set("Access-Control-Allow-Origin", origin);
  headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  headers.set("Access-Control-Allow-Headers", "authorization, x-client-info, apikey, content-type");
  return new Response(res.body, { status: res.status, headers });
}

export function preflight(req: Request) {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
      },
    });
  }
  return null;
}
