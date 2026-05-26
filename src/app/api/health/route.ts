export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export function GET() {
  return Response.json(
    { ok: true, service: "bday-next", ready: true },
    {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    }
  );
}

export function HEAD() {
  return new Response(null, { status: 200 });
}
