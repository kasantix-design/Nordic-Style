import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// For server-side bruk (bypass RLS - admin-tilgang)
export const supabaseServer = createClient(supabaseUrl, supabaseServiceKey);
