// app/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

// 우리가 .env.local에 적어둔 주소와 키를 가져옵니다.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// 진짜 열쇠(supabase)를 조립해서 내보냅니다.
export const supabase = createClient(supabaseUrl, supabaseAnonKey)