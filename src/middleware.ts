import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Fast health responses so Render marks the service live sooner. */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/api/health" || pathname === "/api/warm") {
    return NextResponse.json(
      { ok: true, service: "bday-next", path: pathname },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/health", "/api/warm"],
};
