import Footer from "components/layout/footer";
import Link from "next/link";
import { getAllArticles } from "@/lib/articles";

export const metadata = {
  title: "Journal | Nordic Style",
  description: "Artikler om design, materialer og håndverk. Les historien bak klærne våre.",
};

export default async function JournalPage() {
  const articles = await getAllArticles();

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
          
          {articles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-neutral-500">
                Det er ennå ingen artikler publisert. Kom tilbake snart!
              </p>
            </div>
          ) : (
            <div className="grid gap-16 md:grid-cols-2">
              {articles.map((article) => (
                <Link 
                  key={article.id} 
                  href={`/journal/${article.slug}`}
                  className="group block cursor-pointer"
                >
                  <div className="mb-6 overflow-hidden">
                    <img 
                      src={article.hero_image} 
                      alt={article.hero_alt || article.title} 
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
                    {article.subtitle || "Les mer om denne historien..."}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
