// utils/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

// 🔽 ここはあなたのSupabaseプロジェクトに合わせて変更！
const supabaseUrl = 'https://oqziqtokwromikbewsnq.supabase.co/'        // ← 自分のURL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xemlxdG9rd3JvbWlrYmV3c25xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczMDU3NDksImV4cCI6MjA2Mjg4MTc0OX0.dWG0upVf7ddxRX2KDLdbgLprFz61_m9bb6b-dGEZ3uU'     // ← anon key

export const supabase = createClient(supabaseUrl, supabaseKey)
