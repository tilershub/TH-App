// supabase/functions/moderate-review/index.ts
// deno-lint-ignore-file no-explicit-any
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { cors, preflight } from "../_shared/cors.ts";

const BANNED = ["scam", "fraud", "hate", "threat"]; // demo list — replace with a real service

Deno.serve(async (req) => {
  const pre = preflight(req);
  if (pre) return pre;

  const url = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(url, serviceKey);

  try {
    const { reviewId, text } = await req.json();
    if (!reviewId) throw new Error("Missing reviewId");

    const lower = (text || "").toLowerCase();
    const flagged = BANNED.some((w) => lower.includes(w));
    const approved = !flagged;

    const { error } = await supabase.from("reviews").update({ approved }).eq("id", reviewId);
    if (error) throw error;

    return cors(new Response(JSON.stringify({ ok: true, approved }), { headers: { "Content-Type": "application/json" } }));
  } catch (e) {
    return cors(new Response(JSON.stringify({ ok: false, error: String(e.message || e) }), { status: 400, headers: { "Content-Type": "application/json" } }));
  }
});
