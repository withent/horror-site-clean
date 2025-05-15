import { readFile } from 'fs/promises'
import { join } from 'path'

export default defineEventHandler(async () => {
  const path = join(process.cwd(), 'data/stories.json')
  try {
    const json = await readFile(path, 'utf-8')
    return JSON.parse(json)
  } catch {
    return []
  }
})
