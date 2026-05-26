export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/** Lightweight endpoint for uptime pings (keeps free-tier service warm). */
export function GET() {
  return Response.json(
    { ok: true, warmed: true, ts: Date.now() },
    {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    }
  );
}

export function HEAD() {
  return new Response(null, { status: 200 });
}
