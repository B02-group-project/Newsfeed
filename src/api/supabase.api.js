import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = import.meta.env.VITE_PROJECT_URL;
// const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;

const SUPABSE_PROJECT_URL = "https://gpsgbozbtdkzjixxhdar.supabase.co";
const SUPABASE_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdwc2dib3pidGRremppeHhoZGFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTczNDM4MDMsImV4cCI6MjAzMjkxOTgwM30.UKtxqSCefOX0IPHfm4dGreuanVwsF6ZI9slFH_Y-YDc";
const supabase = createClient(SUPABSE_PROJECT_URL, SUPABASE_API_KEY);

export default supabase;
