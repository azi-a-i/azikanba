import { createClient, SupabaseAuthAdapter } from '@neondatabase/neon-js';

const neonAuthUrl =
  process.env.NEXT_PUBLIC_NEON_AUTH_URL ||
  'https://placeholder.neonauth.c-9.us-east-1.aws.neon.tech/neondb/auth';
const neonDataApiUrl = neonAuthUrl
  .replace('.neonauth.', '.apirest.')
  .replace(/\/auth\/?$/, '/rest/v1');

export const supabase = createClient<Database>({
  auth: {
    adapter: SupabaseAuthAdapter(),
    url: neonAuthUrl,
  },
  dataApi: {
    url: neonDataApiUrl,
  },
});

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          subscription_status: 'free' | 'pro' | null;
          stripe_customer_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          subscription_status?: 'free' | 'pro' | null;
          stripe_customer_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          subscription_status?: 'free' | 'pro' | null;
          stripe_customer_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          user_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          user_id: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          user_id?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      columns: {
        Row: {
          id: string;
          name: string;
          project_id: string;
          position: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          project_id: string;
          position: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          project_id?: string;
          position?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      tasks: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          column_id: string;
          position: number;
          priority: 'low' | 'medium' | 'high';
          due_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          column_id: string;
          position: number;
          priority?: 'low' | 'medium' | 'high';
          due_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          column_id?: string;
          position?: number;
          priority?: 'low' | 'medium' | 'high';
          due_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};
