import Footer from "components/layout/footer";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

// --- 1. DATA (Midlertidig - erstattes senere med din database) ---
const products: Record<string, {
  handle: string;
  title: string;
  price: string;
  currency: string;
  description: string;
  philosophy: string;
  construction: { title: string; points: string[] };
  material: { name: string; origin: string; story: string };
  images: { src: string; alt: string }[];
  variants: { size: string; inStock: boolean }[];
  seo: { title: string; description: string };
}> = {
  "bunad-skjorte-modern": {
    handle: "bunad-skjorte-modern",
    title: "Skjorten: Hyllest til Silhuetten",
    price: "2.490",
    currency: "NOK",
    description: "En moderne tolkning av den tradisjonelle skjorten.",
    philosophy: "Skjorten er designet med en markert midje fordi vi tror at silhuetten skal være en hyllest til den norske bunaden, men med en moderne, friere bevegelse.",
    construction: {
      title: "Konstruksjon & Detaljer",
      points: ["Markert midje", "Smykket søm langs skuldre", "Friere bevegelse i armene", "Forlenget nederkant"]
    },
    material: {
      name: "Organisk Linne-Ull Blanding",
      origin: "Vestlandet, Norge",
      story: "Stoffet er vevd på en gammel veveri-maskin i Voss. Blandingen gir stoffet en unik fall."
    },
    images: [
      { src: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1935&auto=format&fit=crop", alt: "Skjorte foran" },
      { src: "https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=2072&auto=format&fit=crop", alt: "Detalj søm" },
      { src: "https://images.unsplash.com/photo-1550614000-4b9519e02a48?q=80&w=1974&auto=format&fit=crop", alt: "Stoff tekstur" },
      { src: "https://images.unsplash.com/photo-1589465885857-44edb59ef526?q=80&w=1974&auto=format&fit=crop", alt: "Modell i bevegelse" }
    ],
    variants: [{ size: "XS", inStock: true }, { size: "S", inStock: true }, { size: "M", inStock: false }, { size: "L", inStock: true }],
    seo: { title: "Skjorten: Hyllest til Silhuetten | Nordic Style", description: "En moderne tolkning av den tradisjonelle skjorten." }
  }
};

// --- 2. SEO METADATA (Fra Vercel-koden) ---
export async function generateMetadata(props: {
  params: Promise<{ handle: string }>;
}) {
  const params = await props.params;
  const product = products[params.handle];

  if (!product) return notFound();

  return {
    title: product.seo.title,
    description: product.seo.description,
    openGraph: {
      images: [{ url: product.images[0].src, width: 1200, height: 800, alt: product.title }],
    },
  };
}

// --- 3. Hovedkomponent ---
export default async function ProductPage(props: {
  params: Promise<{ handle: string }>;
}) {
  const params = await props.params;
  const product = products[params.handle];

  if (!product) return notFound();

  // Schema.org JSON-LD (Fra Vercel-koden - viktig for Google)
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.images[0].src,
    offers: {
      "@type": "AggregateOffer",
      availability: product.variants.some(v => v.inStock) ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      priceCurrency: product.currency,
      highPrice: product.price,
      lowPrice: product.price,
    },
  };

  return (
    <>
      {/* SEO Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

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
            <h2 className="mb-8 text-2xl font-medium text-neutral-900">{product.construction.title}</h2>
            <ul className="space-y-6">
              {product.construction.points.map((point, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-neutral-300 text-xs text-neutral-500">{i + 1}</span>
                  <span className="text-base font-light leading-relaxed text-neutral-700">{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-full min-h-[400px] overflow-hidden">
            <Image src={product.images[1].src} alt={product.images[1].alt} fill className="object-cover" sizes="(min-width: 768px) 50vw, 100vw" />
          </div>
        </div>
        
        {/* Material Seksjon */}
        <div className="mt-24 border-t border-neutral-200 pt-16">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-xs uppercase tracking-widest text-neutral-400">Materialet</h2>
            <h3 className="mb-4 text-3xl font-medium text-neutral-900">{product.material.name}</h3>
            <p className="mb-8 text-sm text-neutral-500">{product.material.origin}</p>
            <p className="mx-auto max-w-2xl text-lg font-light leading-relaxed text-neutral-700">{product.material.story}</p>
          </div>
        </div>
      </section>

      {/* 3. THE OBJECT: Bilder, Pris, Kjøp (Inspirert av Vercel) */}
      <section className="bg-neutral-50 py-24 px-6 md:px-20 lg:px-40">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2">
          
          {/* Galleri (Simulert - vi bruker Image komponenten direkte for nå) */}
          <div className="space-y-4">
            {product.images.map((img, i) => (
              <div key={i} className={`relative aspect-[3/4] overflow-hidden bg-neutral-200 ${i === 0 ? 'h-[600px]' : 'h-[300px]'}`}>
                <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
              </div>
            ))}
          </div>

          {/* Kjøp-blokk */}
          <div className="flex flex-col justify-start">
            <div className="mb-8">
              <h2 className="text-3xl font-light text-neutral-900">{product.title}</h2>
              <p className="mt-2 text-2xl font-medium text-neutral-900">{product.price} {product.currency}</p>
            </div>

            <div className="mb-8">
              <h3 className="mb-4 text-sm uppercase tracking-widest text-neutral-500">Størrelse</h3>
              <div className="flex flex-wrap gap-3">
                {product.variants.map((variant) => (
                  <button
                    key={variant.size}
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

      {/* 4. RELATED PRODUCTS (Fra Vercel-koden) */}
      <div className="mx-auto max-w-(--breakpoint-2xl) px-4 py-12">
        <h2 className="mb-8 text-2xl font-light tracking-tight text-neutral-900">Relaterte Produkter</h2>
        <ul className="flex w-full gap-4 overflow-x-auto pb-4">
          {/* Her ville vi hentet relaterte produkter fra databasen din */}
          <li className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5">
            <Link href="/product/bunad-skjorte-modern" className="relative h-full w-full">
              <div className="h-full w-full bg-neutral-200">
                <Image src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1935&auto=format&fit=crop" alt="Relatert" fill className="object-cover" />
              </div>
            </Link>
          </li>
          {/* Flere produkter kan legges til her */}
        </ul>
      </div>

      <Footer />
    </>
  );
}
