import { supabase } from './supabase';

// Type-definisjon for et produkt (må matche databasen din)
export interface Product {
  id: string;
  handle: string;
  title: string;
  price: number;
  currency: string;
  description: string;
  philosophy: string;
  construction_title: string;
  construction_points: any[]; // JSON array
  material_name: string;
  material_origin: string;
  material_story: string;
  images: any[]; // JSON array med { src, alt }
  variants: any[]; // JSON array med { size, inStock }
  seo_title: string;
  seo_description: string;
  created_at: string;
}

/**
 * Henter et enkelt produkt basert på "handle" (URL-navn).
 * Dette brukes i app/product/[handle]/page.tsx
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
 * Henter alle produkter (for fremtidig bruk, f.eks. i en kolleksjonsside).
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
