import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://nordic-style.vercel.app"; // Bytt ut med din faktiske Vercel-URL hvis forskjellig

  // Fast liste over sider som alltid finnes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/journal`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/journal/valget-av-ull`, // Eksempel på en artikkel (kan fjernes eller oppdateres senere)
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  // Merk: For å inkludere alle produkter dynamisk, må vi koble til Supabase her.
  // Foreløpig returnerer vi kun de faste sidene for å unngå byggefeil.
  
  return staticRoutes;
}
