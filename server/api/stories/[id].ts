// 特定の投稿を削除
import { supabase } from '@/utils/supabaseClient'

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id

  const { data, error } = await supabase
    .from('stories')
    .delete()
    .eq('id', id)

  return { data, error }
})
