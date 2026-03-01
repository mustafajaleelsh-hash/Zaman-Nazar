import { createClient } from "@supabase/supabase-js";
import { Product } from "@/types";
import localProducts from "@/data/products.json";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Initialize Supabase only if keys exist. This prevents errors if the user hasn't added .env.local yet.
export const supabase = supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

/**
 * Fetches all products. Tries Supabase first, falls back to local JSON if unconfigured.
 */
export async function getProducts(): Promise<Product[]> {
    if (supabase) {
        try {
            const { data, error } = await supabase.from("products").select("*");
            if (!error && data && data.length > 0) {
                return data as Product[];
            }
        } catch (err) {
            console.error("Supabase fetch error, falling back to local JSON:", err);
        }
    }
    // Deep copy stringify/parse to simulate network delay and guarantee clean object references
    return JSON.parse(JSON.stringify(localProducts)) as Product[];
}

/**
 * Fetches a single product by ID.
 */
export async function getProductById(id: string): Promise<Product | null> {
    if (supabase) {
        try {
            const { data, error } = await supabase
                .from("products")
                .select("*")
                .eq("id", id)
                .single();
            if (!error && data) {
                return data as Product;
            }
        } catch (err) {
            console.error("Supabase fetch error for product, falling back to local JSON:", err);
        }
    }
    const product = (localProducts as Product[]).find(p => p.id === id);
    return product || null;
}
