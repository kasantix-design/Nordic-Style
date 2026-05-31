import Footer from "components/layout/footer";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getProduct } from "lib/products";

// --- 1. SEO Metadata ---
export async function generateMetadata(props: {
  params: Promise<{ handle: string }>;
}) {
  const params = await props.params;
  const product = await getProduct(params.handle);

  if (!product) return { title: "Produkt ikke funnet" };

  return {
    title: product.seo_title || `${product.title} | Nordic Style`,
    description: product.seo_description || product.description,
    openGraph: {
      images: product.images && product.images.length > 0 
        ? [{ url: product.images[0].src || product.images[0], width: 1200, height: 800, alt: product.title }] 
        : [],
    },
  };
}

// --- 2. Hovedkomponent ---
export default async function ProductPage(props: {
  params: Promise<{ handle: string }>;
}) {
  const params = await props.params;
  
  // HENT DATA FRA DATABASEN (IKKE HARDKODED)
  const product = await getProduct(params.handle);

  // Hvis produktet ikke finnes, vis 404
  if (!product) return notFound();

  // Sikre at arrays finnes for å unngå feil
  const images = Array.isArray(product.images) ? product.images : [];
  const variants = Array.isArray(product.variants) ? product.variants : [];
  const constructionPoints = Array.isArray(product.construction_points) ? product.construction_points : [];

  return (
    <>
      {/* 1. THE PHILOSOPHY: "The Why" */}
      <section className="bg-neutral-50 py-24 px-6 md:px-20 lg:px-40">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-8 text-4xl font-light tracking-tight text-neutral-900 md:text-6xl">
            {product.title}
          </h1>
          <p className="text-xl font-light leading-relaxed text-neutral-700">
            {product.philosophy}
          </p>
        </div>
      </section>

      {/* 2. THE CONSTRUCTION & MATERIAL */}
      <section className="bg-white py-24 px-6 md:px-20 lg:px-40">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 md:grid-cols-2">
          <div>
            <h2 className="mb-8 text-2xl font-medium text-neutral-900">{product.construction_title}</h2>
            <ul className="space-y-6">
              {constructionPoints.map((point: any, i: number) => (
                <li key={i} className="flex gap-4">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-neutral-300 text-xs text-neutral-500">{i + 1}</span>
                  <span className="text-base font-light leading-relaxed text-neutral-700">{typeof point === 'string' ? point : point.text || point}</span>
                </li>
              ))}
            </ul>
          </div>
          {images.length > 1 && (
            <div className="relative h-full min-h-[400px] overflow-hidden">
              <Image 
                src={images[1].src || images[1]} 
                alt={images[1].alt || "Detalj"} 
                fill 
                className="object-cover" 
                sizes="(min-width: 768px) 50vw, 100vw" 
              />
            </div>
          )}
        </div>
        
        {/* Material Seksjon */}
        <div className="mt-24 border-t border-neutral-200 pt-16">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-xs uppercase tracking-widest text-neutral-400">Materialet</h2>
            <h3 className="mb-4 text-3xl font-medium text-neutral-900">{product.material_name}</h3>
            <p className="mb-8 text-sm text-neutral-500">{product.material_origin}</p>
            <p className="mx-auto max-w-2xl text-lg font-light leading-relaxed text-neutral-700">{product.material_story}</p>
          </div>
        </div>
      </section>

      {/* 3. THE OBJECT: Bilder, Pris, Kjøp */}
      <section className="bg-neutral-50 py-24 px-6 md:px-20 lg:px-40">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2">
          
          {/* Galleri */}
          <div className="space-y-4">
            {images.map((img: any, i: number) => (
              <div key={i} className={`relative aspect-[3/4] overflow-hidden bg-neutral-200 ${i === 0 ? 'h-[600px]' : 'h-[300px]'}`}>
                <Image 
                  src={img.src || img} 
                  alt={img.alt || "Produktbilde"} 
                  fill 
                  className="object-cover" 
                  sizes="(min-width: 1024px) 50vw, 100vw" 
                />
              </div>
            ))}
          </div>

          {/* Kjøp-blokk */}
          <div className="flex flex-col justify-start">
            <div className="mb-8">
              <h2 className="text-3xl font-light text-neutral-900">{product.title}</h2>
              <p className="mt-2 text-2xl font-medium text-neutral-900">
                {product.price} {product.currency}
              </p>
            </div>

            <div className="mb-8">
              <h3 className="mb-4 text-sm uppercase tracking-widest text-neutral-500">Størrelse</h3>
              <div className="flex flex-wrap gap-3">
                {variants.map((variant: any, i: number) => (
                  <button
                    key={i}
                    disabled={!variant.inStock}
                    className={`h-12 w-16 border text-sm font-medium transition-colors
                      ${variant.inStock 
                        ? 'border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white' 
                        : 'border-neutral-200 text-neutral-400 cursor-not-allowed'}`}
                  >
                    {variant.size}
                  </button>
                ))}
              </div>
              {variants.length === 0 && <p className="mt-2 text-sm text-neutral-500">Ingen størrelser tilgjengelig.</p>}
            </div>

            <div className="mb-8 space-y-4">
              <button className="w-full bg-neutral-900 py-4 text-sm uppercase tracking-widest text-white transition-colors hover:bg-neutral-700">
                Legg i handlekurv
              </button>
              <div className="flex justify-center gap-4 text-xs text-neutral-500">
                <span>Gratis frakt over 2000,-</span>
                <span>•</span>
                <span>30 dagers retur</span>
              </div>
            </div>

            <div className="border-t border-neutral-200 pt-8">
              <h4 className="mb-4 text-sm font-medium text-neutral-900">Om dette plagget</h4>
              <p className="text-sm font-light leading-relaxed text-neutral-600">{product.description}</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
