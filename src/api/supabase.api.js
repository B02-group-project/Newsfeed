import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = import.meta.env.VITE_PROJECT_URL;
// const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;

const superbase_project_url = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const superbase_api_key = import.meta.env.VITE_SUPABASE_API_KEY;

const supabase = createClient(superbase_project_url, superbase_api_key);

export default supabase;
