// supabase/functions/push-token-sync/index.ts
// deno-lint-ignore-file no-explicit-any
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { cors, preflight } from "../_shared/cors.ts";

Deno.serve(async (req) => {
  const pre = preflight(req);
  if (pre) return pre;

  const url = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(url, serviceKey);

  try {
    const payload = await req.json();
    const jwt = req.headers.get("Authorization")?.replace("Bearer ", "") ?? "";
    let userId: string | undefined = payload.userId;
    if (!userId && jwt) {
      const { data } = await supabase.auth.getUser(jwt);
      userId = data.user?.id;
    }
    if (!userId) throw new Error("Missing userId");

    const token = payload.token as string | undefined;
    if (!token) throw new Error("Missing token");

    const { error } = await supabase.from("profiles").update({ push_token: token }).eq("id", userId);
    if (error) throw error;
    return cors(new Response(JSON.stringify({ ok: true }), { headers: { "Content-Type": "application/json" } }));
  } catch (e) {
    return cors(new Response(JSON.stringify({ ok: false, error: String(e.message || e) }), { status: 400, headers: { "Content-Type": "application/json" } }));
  }
});
