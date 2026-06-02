import { supabase } from '@/lib/supabase';

// Type-definisjon for en artikkel
export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  author: string;
  date: string;
  hero_image: string;
  hero_alt: string;
  sections: any[];
  created_at: string;
}

/**
 * Henter en enkelt artikkel basert på "slug".
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
 */
export async function getAllArticles(): Promise<Article[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    console.error('Feil ved henting av artikler:', error);
    return [];
  }

  return data as Article[];
}
