import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="mb-8 text-3xl font-medium text-neutral-900">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Link href="/admin/products" className="rounded-lg border bg-white p-6 hover:shadow-md transition-shadow">
          <h2 className="text-xl font-medium text-neutral-900">Produkter</h2>
          <p className="mt-2 text-sm text-neutral-600">Administrer produkter, priser og bilder.</p>
        </Link>
        <Link href="/admin/articles" className="rounded-lg border bg-white p-6 hover:shadow-md transition-shadow">
          <h2 className="text-xl font-medium text-neutral-900">Artikler</h2>
          <p className="mt-2 text-sm text-neutral-600">Skriv og publiser journal-artikler.</p>
        </Link>
      </div>
    </div>
  );
}
