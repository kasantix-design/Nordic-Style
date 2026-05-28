import Footer from "components/layout/footer";
import Link from "next/link";
import { notFound } from "next/navigation";

// Midlertidig data. Senere henter vi dette fra databasen.
const articles: Record<string, {
  title: string;
  subtitle: string;
  author: string;
  date: string;
  heroImage: string;
  heroAlt: string;
  sections: {
    type: "paragraph" | "image" | "quote" | "process";
    content?: string;
    src?: string;
    alt?: string;
    caption?: string;
    steps?: { title: string; description: string }[];
  }[];
}> = {
  "valget-av-ull": {
    title: "Valget av ull",
    subtitle: "Hvorfor kvalitet er en nødvendighet",
    author: "Designerteamet",
    date: "12. Mai 2026",
    heroImage: "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?q=80&w=2070&auto=format&fit=crop",
    heroAlt: "Ullfiber i naturlig lys",
    sections: [
      {
        type: "paragraph",
        content: "Vi reiste til fjellene for å finne den rette fiberen. Ikke fordi det var enkelt, men fordi det var nødvendig. I en tid hvor rask produksjon er normen, velger vi å gå motsatt vei — mot tregere, mer bevisste valg."
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1558171813-4c088b3a3a44?q=80&w=2070&auto=format&fit=crop",
        alt: "Fjellandskap med sau",
        caption: "Fjellbeite på Hardangervidda, 1200 meter over havet."
      },
      {
        type: "paragraph",
        content: "Ullen vi bruker kommer fra norske saueraser som har levd i fjellet i generasjoner. Fibrene er lengre, sterkere og mer vannavstøtende enn hva du finner i konvensjonelt produsert ull. Dette er ikke en tilfeldighet — det er et resultat av århundrer med naturlig seleksjon."
      },
      {
        type: "quote",
        content: "Kvalitet er ikke et valg vi tar i det øyeblikket vi syr. Det er en beslutning som starter lenge før, i valget av råmaterialet."
      },
      {
        type: "process",
        steps: [
          {
            title: "Fiberutvelgelse",
            description: "Vi tester hver batch ull for fiberlengde, tykkelse og elastisitet. Kun ull med fiberlengde over 80mm godkjennes."
          },
          {
            title: "Spinning",
            description: "Ullen spines til garn på en lokal spinneri i Vestland. Prosessen tar 3 uker per batch."
          },
          {
            title: "Garveri",
            description: "Garnet garves med plantebaserte farger. Ingen syntetiske kjemikalier brukes i prosessen."
          },
          {
            title: "Vevning",
            description: "Stoffet veves på tradisjonelle shuttle-vever for å bevare fibrens naturlige struktur og bevegelse."
          }
        ]
      },
      {
        type: "paragraph",
        content: "Resultatet er et stoff som puster, isolerer og eldes med nåde. Et plagg i denne ullen vil ikke bare vare i sesonger — det vil bli bedre med tiden. Og det er, i vår mening, den eneste acceptable standarden."
      }
    ]
  },
  "mønstertegning-geometri": {
    title: "Mønstertegning",
    subtitle: "Geometri i bevegelse",
    author: "Anna Nordahl",
    date: "05. Mai 2026",
    heroImage: "https://images.unsplash.com/photo-1605218427306-022ba8c6f690?q=80&w=2070&auto=format&fit=crop",
    heroAlt: "Mønsterskisse på papir",
    sections: [
      {
        type: "paragraph",
        content: "Hvordan transformerer man en idé til et plagg? Svaret ligger i mønstertegningen — det øyeblikket hvor abstraksjon møter presisjon, og hvor en enkel linje kan definere hele silhuetten."
      },
      {
        type: "quote",
        content: "En god mønstertegning er som et arkitektonisk blåkopi. Hver millimeter har en hensikt."
      },
      {
        type: "paragraph",
        content: "Vi tegner mønstre manuelt før vi digitaliserer. Dette gir oss en forståelse av proporsjoner som et dataprogram aldri kan replikere. Hånden vet noe hodet ennå ikke har formulert."
      }
    ]
  }
};

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const article = articles[params.slug];

  if (!article) return { title: "Artikkel ikke funnet" };

  return {
    title: `${article.title} | Journal | Nordic Style`,
    description: article.subtitle,
  };
}

export default async function JournalArticlePage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const article = articles[params.slug];

  if (!article) return notFound();

  return (
    <>
      {/* HERO: Fullskjerm med bilde og tittel */}
      <section className="relative h-[85vh] w-full overflow-hidden bg-neutral-900">
        <img 
          src={article.heroImage} 
          alt={article.heroAlt} 
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
          {article.sections.map((section, index) => {
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
                    {section.steps.map((step, stepIndex) => (
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
