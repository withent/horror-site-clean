import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  const { id } = await readBody(event)
  const path = join(process.cwd(), 'data/stories.json')

  const stories = JSON.parse(await readFile(path, 'utf-8').catch(() => '[]'))
  const updated = stories.filter((story) => story.id !== id)
  await writeFile(path, JSON.stringify(updated, null, 2))
  return { status: 'ok' }
})
