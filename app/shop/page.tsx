import { getAllProducts } from "@/lib/products";
import Link from "next/link";
import Image from "next/image";

// Henter query-parametere for kategori (f.eks. /shop?category=jakker)
export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const category = params.category;

  // Hent alle produkter fra Supabase
  const allProducts = await getAllProducts();

  // Midlertidig filtrering: Vis alle (vi legger til 'category' felt i DB senere)
  // Hvis du vil filtrere nå, må du legge til en 'category' kolonne i Supabase.
  const filteredProducts = allProducts; 

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <h1 className="text-4xl font-light tracking-tight text-neutral-900">
          {category ? `${category.charAt(0).toUpperCase() + category.slice(1)}` : "Alle Produkter"}
        </h1>
        <p className="mt-4 text-lg font-light text-neutral-600">
          Utforsk vår kolleksjon av moderne nordisk tailoring.
        </p>
      </div>

      {/* Produkt Grid */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-neutral-500">
              Det er ennå ingen produkter lagt til i butikken.
            </p>
            <p className="mt-2 text-sm text-neutral-400">
              (Logg inn på /admin for å legge til produkter)
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {filteredProducts.map((product) => (
              <Link key={product.id} href={`/product/${product.handle}`} className="group">
                <div className="aspect-[3/4] w-full overflow-hidden rounded-lg bg-neutral-100 relative">
                  {product.images && product.images.length > 0 ? (
                    <Image
                      src={product.images[0].src || product.images[0]}
                      alt={product.images[0].alt || product.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-neutral-400 text-sm">
                      Ingen bilde
                    </div>
                  )}
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-neutral-900">
                      {product.title}
                    </h3>
                    <p className="mt-1 text-sm text-neutral-500">{product.material_name || "Ukjent materiale"}</p>
                  </div>
                  <p className="text-sm font-medium text-neutral-900">
                    {product.price} {product.currency}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
