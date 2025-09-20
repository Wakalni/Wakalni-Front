// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "super-secret-key"
);

async function getRoleFromToken(token?: string): Promise<string | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload.role as string;
  } catch {
    return null;
  }
}

export async function middleware(req: NextRequest) {
  // const token = req.cookies.get("token")?.value;
  // const role = "user";

  // console.log({ role });

  // if (!role) {
  //   return NextResponse.redirect(new URL("/auth/login", req.url));
  // }

  // const redirect = roleRoutes[role];
  // console.log({ redirect });

  // if (redirect && !req.nextUrl.pathname.startsWith(redirect)) {
  //   return NextResponse.redirect(new URL(redirect, req.url));
  // }

  return NextResponse.next();
}
const roleRoutes: Record<string, string> = {
  user: "/recipes",
  admin: "/admin/dashboard",
  superadmin: "/superadmin/dashboard",
};
export const config = {
  matcher: ["/recipes", "/admin/:path*", "/superadmin/:path*"],
};
