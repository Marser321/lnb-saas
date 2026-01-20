import { createClient, SupabaseClient } from '@supabase/supabase-js'

const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const envKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if we have valid Supabase credentials
const hasValidCredentials = envUrl && envUrl.startsWith('https://') && envKey && envKey.length > 10;

// Mock client that returns empty arrays and does nothing (for demos / local dev without Supabase)
const mockSupabase = {
    from: () => ({
        select: () => ({
            order: () => Promise.resolve({ data: [], error: null }),
            eq: () => Promise.resolve({ data: [], error: null }),
        }),
        insert: () => Promise.resolve({ data: null, error: { message: 'Mock client: No Supabase credentials configured.' } }),
        update: () => ({
            eq: () => Promise.resolve({ data: null, error: { message: 'Mock client: No Supabase credentials configured.' } }),
        }),
        delete: () => ({
            eq: () => Promise.resolve({ data: null, error: { message: 'Mock client: No Supabase credentials configured.' } }),
        }),
    }),
    storage: {
        from: () => ({
            upload: () => Promise.resolve({ data: null, error: { message: 'Mock client: No Supabase credentials configured.' } }),
            getPublicUrl: () => ({ data: { publicUrl: 'https://placehold.co/400x400?text=Mock' } }),
        }),
    },
} as unknown as SupabaseClient;

// Return real client if credentials exist, otherwise return mock
export const supabase = hasValidCredentials
    ? createClient(envUrl!, envKey!)
    : mockSupabase;
