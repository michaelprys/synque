import { createClient } from '@supabase/supabase-js';
import type { Database } from 'app/database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseApiKey = import.meta.env.VITE_SUPABASE_API_KEY;
const supabaseApi = createClient<Database>(supabaseUrl, supabaseApiKey);

export default supabaseApi;
