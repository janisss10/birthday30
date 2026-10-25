import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

if (!supabaseUrl || !supabaseSecretKey) {
  console.error("Supabase environment check:", {
    hasUrl: Boolean(supabaseUrl),
    hasSecretKey: Boolean(supabaseSecretKey),
    nodeEnv: process.env.NODE_ENV,
  });

  throw new Error(
    "Missing SUPABASE_URL or SUPABASE_SECRET_KEY in backend environment variables",
  );
}

export const supabase = createClient(supabaseUrl, supabaseSecretKey);
