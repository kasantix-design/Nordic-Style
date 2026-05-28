import Footer from "components/layout/footer";
import Link from "next/link";

// Dette er midlertidig data. Senere vil vi hente dette fra en database eller CMS.
const articles = [
  {
    id: 1,
    title: "Valget av ull: Hvorfor kvalitet er en nødvendighet",
    excerpt: "Vi reiste til fjellene for å finne den rette fiberen. Her er historien om prosessen, fra sau til ferdig stoff.",
    image: "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?q=80&w=2070&auto=format&fit=crop",
    date: "12. Mai 2026",
    author: "Designerteamet",
    slug: "valget-av-ull" // Dette blir lenken: /journal/valget-av-ull
  },
  {
    id: 2,
    title: "Mønstertegning: Geometri i bevegelse",
    excerpt: "Hvordan en enkel linje kan transformeres til en moderne silhuett. En dybdegående analyse av konstruksjon.",
    image: "https://images.unsplash.com/photo-1605218427306-022ba8c6f690?q=80&w=2070&auto=format&fit=crop",
    date: "05. Mai 2026",
    author: "Anna Nordahl",
    slug: "mønstertegning-geometri"
  },
  {
    id: 3,
    title: "Sydamenes håndverk: Tidens lønn",
    excerpt: "I en verden av rask produksjon velger vi å ta tiden. Møt de menneskene som syr hvert eneste sting.",
    image: "https://images.unsplash.com/photo-1528698827591-e19ccd752303?q=80&w=2070&auto=format&fit=crop",
    date: "28. April 2026",
    author: "Lars Berg",
    slug: "sydamenes-haandverk"
  },
  {
    id: 4,
    title: "Inspirasjon: Hyllest til bunaden",
    excerpt: "Den norske bunaden er ikke bare et kostyme. Det er en geometrisk perfektjon vi har lært av.",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1976&auto=format&fit=crop",
    date: "15. April 2026",
    author: "Designerteamet",
    slug: "inspirasjon-bunaden"
  }
];

export const metadata = {
  title: "Journal | Nordic Style",
  description: "Artikler om design, materialer og håndverk. Les historien bak klærne våre.",
};

export default function JournalPage() {
  return (
    <>
      {/* Header: Journal-tittel */}
      <section className="bg-neutral-50 py-24 px-6 md:px-20 lg:px-40">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-5xl font-light tracking-tight text-neutral-900 md:text-7xl">
            Journal
          </h1>
          <p className="mx-auto max-w-2xl text-lg font-light leading-relaxed text-neutral-600">
            En samling av tanker, prosesser og historier. 
            Vi deler innsikt i hvordan vi skaper klær som varer, 
            både i tid og stil.
          </p>
        </div>
      </section>

      {/* Artikkel-liste */}
      <section className="bg-white py-24 px-6 md:px-20 lg:px-40">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-16 md:grid-cols-2">
            {articles.map((article) => (
              <Link 
                key={article.id} 
                href={`/journal/${article.slug}`}
                className="group block cursor-pointer"
              >
                <div className="mb-6 overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="h-80 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center gap-4 text-xs uppercase tracking-widest text-neutral-400">
                  <span>{article.date}</span>
                  <span className="h-px w-8 bg-neutral-300"></span>
                  <span>{article.author}</span>
                </div>
                <h2 className="mt-4 text-2xl font-medium text-neutral-900 group-hover:underline decoration-1 underline-offset-4">
                  {article.title}
                </h2>
                <p className="mt-4 text-base font-light leading-relaxed text-neutral-600">
                  {article.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
