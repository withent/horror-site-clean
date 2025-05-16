// server/api/stories/index.ts

import { supabase } from '@/utils/supabaseClient'

export default defineEventHandler(async (event) => {
  console.log('🧪 [API確認] GET or POSTが呼ばれました！')  // ← ★ これ追加！

  if (event.req.method === 'GET') {
    console.log('📦 stories/index.ts の GET 実行中...') // ★ 追加！

    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .order('created_at', { ascending: false })

    return { data, error }
  }

  if (event.req.method === 'POST') {
    console.log('📝 stories/index.ts の POST 実行中...') // ★ 追加！

    const body = await readBody(event)
 const { nickname, title, content } = body

const { data, error } = await supabase
  .from('stories')
  .insert([{ nickname, title, content }])

    return { data, error }
  }
})
