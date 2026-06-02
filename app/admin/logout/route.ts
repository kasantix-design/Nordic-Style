import { createServerRouteHandler } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const POST = createServerRouteHandler(async () => {
  const supabase = createServerRouteHandler({ cookies });
  await supabase.auth.signOut();
  return NextResponse.redirect(new URL("/admin/login", process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000"));
});
