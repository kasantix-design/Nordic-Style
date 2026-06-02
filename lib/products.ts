import { supabase } from '@/lib/supabase';

// Type-definisjon for et produkt
export interface Product {
  id: string;
  handle: string;
  title: string;
  price: number;
  currency: string;
  description: string;
  philosophy: string;
  construction_title: string;
  construction_points: any[];
  material_name: string;
  material_origin: string;
  material_story: string;
  images: any[];
  variants: any[];
  seo_title: string;
  seo_description: string;
  created_at: string;
}

/**
 * Henter et enkelt produkt basert på "handle".
 */
export async function getProduct(handle: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('handle', handle)
    .single();

  if (error) {
    console.error('Feil ved henting av produkt:', error);
    return null;
  }

  return data as Product;
}

/**
 * Henter alle produkter.
 */
export async function getAllProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Feil ved henting av produkter:', error);
    return [];
  }

  return data as Product[];
}
