import { supabase } from './supabase';

// Type-definisjon for en artikkel
export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  author: string;
  date: string; // Vi lagrer som string for enkelhets skyld, eller DateTime
  hero_image: string;
  hero_alt: string;
  sections: any[]; // JSON array med avsnitt, bilder, sitater
  created_at: string;
}

/**
 * Henter en enkelt artikkel basert på "slug" (URL-navn).
 * Dette brukes i app/journal/[slug]/page.tsx
 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Feil ved henting av artikkel:', error);
    return null;
  }

  return data as Article;
}

/**
 * Henter alle artikler (sortert etter dato, nyeste først).
 * Dette brukes i app/journal/page.tsx for å vise listen.
 */
export async function getAllArticles(): Promise<Article[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('date', { ascending: false }); // Sorter etter dato

  if (error) {
    console.error('Feil ved henting av artikler:', error);
    return [];
  }

  return data as Article[];
}
