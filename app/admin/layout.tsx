import Link from "next/link";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Ignore if we are in a browser context
          }
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen flex-col bg-neutral-50">
      <header className="border-b bg-white px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/admin" className="text-xl font-medium text-neutral-900">
            Nordic Style Admin
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/admin/products" className="text-sm text-neutral-600 hover:text-neutral-900">
              Produkter
            </Link>
            <Link href="/admin/articles" className="text-sm text-neutral-600 hover:text-neutral-900">
              Artikler
            </Link>
            <form action="/admin/logout" method="post">
              <button type="submit" className="text-sm text-red-600 hover:text-red-800">
                Logg ut
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="flex-1 px-6 py-8">
        <div className="mx-auto max-w-7xl">{children}</div>
      </main>
    </div>
  );
}
