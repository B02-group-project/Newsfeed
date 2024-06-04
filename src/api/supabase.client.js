import { createClient } from "@supabase/supabase-js";

const supabase_project_url = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabase_api_key = import.meta.env.VITE_SUPABASE_API_KEY;
const supabase = createClient(supabase_project_url, supabase_api_key);

export default supabase;
