import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function ProductsPage() {
  const cookieStore = await cookies(); // <-- MÅ VÆRE HER!
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: any[]) { // <-- MÅ VÆRE HER!
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Ignore
          }
        },
      },
    }
  );

  const { data: products } = await supabase
    .from("products")
    .select("id, title, handle, price, created_at")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-medium text-neutral-900">Produkter</h1>
        <Link
          href="/admin/products/new"
          className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
        >
          Nytt produkt
        </Link>
      </div>

      <div className="overflow-hidden rounded-lg border bg-white">
        <table className="min-w-full divide-y divide-neutral-200">
          <thead className="bg-neutral-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">Tittel</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">Handle</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">Pris</th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-neutral-500">Handlinger</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 bg-white">
            {products?.map((product) => (
              <tr key={product.id}>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-neutral-900">{product.title}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-500">{product.handle}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-500">{product.price} NOK</td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                  <Link href={`/admin/products/${product.id}/edit`} className="text-indigo-600 hover:text-indigo-900 mr-4">
                    Rediger
                  </Link>
                </td>
              </tr>
            ))}
            {(!products || products.length === 0) && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-sm text-neutral-500">
                  Ingen produkter funnet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
