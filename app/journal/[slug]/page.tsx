import Footer from "components/layout/footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleBySlug } from "lib/articles";

// --- 1. SEO Metadata ---
export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const article = await getArticleBySlug(params.slug);

  if (!article) return { title: "Artikkel ikke funnet" };

  return {
    title: `${article.title} | Journal | Nordic Style`,
    description: article.subtitle,
  };
}

// --- 2. Hovedkomponent ---
export default async function JournalArticlePage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  
  // HENT DATA FRA DATABASEN ISTEDET FOR FASTKODING
  const article = await getArticleBySlug(params.slug);

  // Hvis artikkelen ikke finnes, vis 404-siden
  if (!article) return notFound();

  return (
    <>
      {/* HERO: Fullskjerm med bilde og tittel */}
      <section className="relative h-[85vh] w-full overflow-hidden bg-neutral-900">
        <img 
          src={article.hero_image} 
          alt={article.hero_alt} 
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-16 md:px-20 lg:px-40">
          <div className="mx-auto w-full max-w-3xl">
            <div className="mb-6 flex items-center gap-4 text-xs uppercase tracking-widest text-gray-300">
              <span>{article.date}</span>
              <span className="h-px w-8 bg-gray-500"></span>
              <span>{article.author}</span>
            </div>
            <h1 className="text-5xl font-light leading-tight tracking-tight text-white md:text-7xl">
              {article.title}
            </h1>
            <p className="mt-4 text-xl font-light text-gray-200">
              {article.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* ARTIKKELKROPP: Magasin-stil med god lesbarhet */}
      <section className="bg-white py-24 px-6 md:px-20 lg:px-40">
        <div className="mx-auto max-w-2xl">
          {article.sections.map((section: any, index: number) => {
            // Avsnitt
            if (section.type === "paragraph") {
              return (
                <p 
                  key={index} 
                  className="mb-10 text-lg font-light leading-relaxed text-neutral-700"
                >
                  {section.content}
                </p>
              );
            }

            // Bilde med bildetekst
            if (section.type === "image") {
              return (
                <figure key={index} className="mb-16 -mx-6 md:-mx-20 lg:-mx-40">
                  <img 
                    src={section.src} 
                    alt={section.alt || ""} 
                    className="w-full object-cover"
                  />
                  {section.caption && (
                    <figcaption className="mt-3 px-6 md:px-20 lg:px-40 text-xs uppercase tracking-widest text-neutral-400">
                      {section.caption}
                    </figcaption>
                  )}
                </figure>
              );
            }

            // Sitat
            if (section.type === "quote") {
              return (
                <blockquote 
                  key={index} 
                  className="my-16 border-l-2 border-neutral-900 pl-8"
                >
                  <p className="text-2xl font-light italic leading-relaxed text-neutral-800 md:text-3xl">
                    &ldquo;{section.content}&rdquo;
                  </p>
                </blockquote>
              );
            }

            // Prosess-tidslinje (Behind the Scenes)
            if (section.type === "process" && section.steps) {
              return (
                <div key={index} className="my-16 border-t border-neutral-200 pt-16">
                  <h3 className="mb-12 text-xs uppercase tracking-widest text-neutral-400">
                    Prosessen
                  </h3>
                  <ol className="space-y-12">
                    {section.steps.map((step: any, stepIndex: number) => (
                      <li key={stepIndex} className="flex gap-8">
                        <span className="flex-shrink-0 text-4xl font-extralight text-neutral-200">
                          {String(stepIndex + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <h4 className="mb-2 text-lg font-medium text-neutral-900">
                            {step.title}
                          </h4>
                          <p className="text-base font-light leading-relaxed text-neutral-600">
                            {step.description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              );
            }

            return null;
          })}
        </div>
      </section>

      {/* TILBAKE TIL JOURNAL */}
      <section className="border-t border-neutral-200 bg-neutral-50 py-16 px-6 text-center">
        <Link 
          href="/journal" 
          className="text-sm uppercase tracking-widest text-neutral-900 underline decoration-1 underline-offset-4 hover:text-neutral-600"
        >
          ← Tilbake til Journal
        </Link>
      </section>

      <Footer />
    </>
  );
}
