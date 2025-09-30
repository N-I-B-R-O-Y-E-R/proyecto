// lib/supabase.client.js

import { createClient } from '@supabase/supabase-js';

// Usar una función para inicializar y exportar directamente el cliente.
// Esto ayuda a evitar problemas de inicialización parcial.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment variables! Check .env.local");
  // Aquí podemos retornar un objeto vacío o nulo para manejar el error,
  // pero lanzaremos un error para que falle al inicio si faltan las claves.
  throw new Error('Supabase client failed to initialize: Missing URL or Key.');
}

// Exportación directa
export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);