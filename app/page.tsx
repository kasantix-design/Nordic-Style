import Footer from "components/layout/footer";
// Vi fjerner produkt-komponentene for nå. 
// I fremtiden kan vi lage nye komponenter for "HeroVideo" eller "StoryBlock".

export const metadata = {
  title: "Nordic Style | Manifest",
  description: "En fortelling om form, materiale og bevegelse. Hyllest til den norske bunaden med moderne frihet.",
  openGraph: {
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      {/* HERO SECTION: Fortellingen starter her */}
      <section className="relative h-screen w-full overflow-hidden bg-neutral-900 text-white">
        {/* Bakgrunn: Her kan du legge inn en video eller et stort bilde senere */}
        <div className="absolute inset-0 z-0">
          {/* Placeholder for video/bilde - erstatt src med din egen */}
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" 
            alt="Minimalistisk tekstil" 
            className="h-full w-full object-cover opacity-60"
          />
        </div>

        {/* Innhold: Tekst og fortelling */}
        <div className="relative z-10 flex h-full flex-col justify-center px-6 md:px-20 lg:px-40">
          <h1 className="mb-6 max-w-3xl text-5xl font-light leading-tight tracking-tight md:text-7xl lg:text-8xl">
            Form. Materiale. <br />
            <span className="italic font-serif">Bevegelse.</span>
          </h1>
          
          <p className="max-w-xl text-lg font-light leading-relaxed text-gray-200 md:text-xl">
            Vi tror ikke på klær som bare dekker kroppen. 
            Vi tror på klær som er en hyllest til silhuetten, 
            inspirert av den norske bunaden, men med en moderne, friere bevegelse.
            Hvert sting er en del av en større fortelling.
          </p>

          <div className="mt-12">
            <a 
              href="/journal" 
              className="inline-block border-b border-white pb-1 text-sm uppercase tracking-widest transition-colors hover:border-gray-400 hover:text-gray-300"
            >
              Les historien
            </a>
          </div>
        </div>
      </section>

      {/* JOURNAL TEASER: En liten smakebit på innholdet */}
      <section className="bg-white py-24 px-6 md:px-20 lg:px-40">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-3xl font-light tracking-tight text-neutral-900">
            Fra Atelieret
          </h2>
          <div className="grid gap-12 md:grid-cols-2">
            {/* Artikkelsnutt 1 */}
            <article className="group cursor-pointer">
              <div className="mb-4 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?q=80&w=2070&auto=format&fit=crop" 
                  alt="Stoffvalg" 
                  className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="mb-2 text-xl font-medium text-neutral-900 group-hover:underline">
                Valget av ull: Hvorfor kvalitet er en nødvendighet
              </h3>
              <p className="text-sm text-neutral-600">
                Vi reiste til fjellene for å finne den rette fiberen. Her er historien om prosessen.
              </p>
            </article>

            {/* Artikkelsnutt 2 */}
            <article className="group cursor-pointer">
              <div className="mb-4 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1605218427306-022ba8c6f690?q=80&w=2070&auto=format&fit=crop" 
                  alt="Sydame" 
                  className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="mb-2 text-xl font-medium text-neutral-900 group-hover:underline">
                Mønstertegning: Geometri i bevegelse
              </h3>
              <p className="text-sm text-neutral-600">
                Hvordan en enkel linje kan transformeres til en moderne silhuett.
              </p>
            </article>
          </div>
          
          <div className="mt-16 text-center">
            <a 
              href="/journal" 
              className="text-sm uppercase tracking-widest text-neutral-900 underline decoration-1 underline-offset-4 hover:text-neutral-600"
            >
              Se alle artikler
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
