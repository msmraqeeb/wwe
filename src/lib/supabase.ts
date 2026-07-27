import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || 'https://ktitkqrusecvnuuulurf.supabase.co';
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || 'sb_publishable_17GLKGxmlx8j9vhPaAbaqQ_Max4lhD5';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const SUPABASE_TABLE = 'wwe_universe_data';

// Helper to save state to Supabase
export async function saveUniverseToSupabase(state: any) {
  try {
    const { data, error } = await supabase
      .from(SUPABASE_TABLE)
      .upsert(
        {
          id: 'default_universe',
          state,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'id' }
      );

    if (error) {
      console.warn('Supabase save error (table may need creation or RLS permissions):', error.message);
      return { success: false, error: error.message };
    }
    return { success: true, data };
  } catch (err: any) {
    console.warn('Supabase request failed:', err);
    return { success: false, error: err?.message || 'Unknown error' };
  }
}

// Helper to load state from Supabase
export async function loadUniverseFromSupabase() {
  try {
    const { data, error } = await supabase
      .from(SUPABASE_TABLE)
      .select('state')
      .eq('id', 'default_universe')
      .single();

    if (error) {
      console.warn('Supabase load error:', error.message);
      return { success: false, error: error.message, data: null };
    }
    return { success: true, data: data?.state };
  } catch (err: any) {
    console.warn('Supabase fetch failed:', err);
    return { success: false, error: err?.message || 'Unknown error', data: null };
  }
}
