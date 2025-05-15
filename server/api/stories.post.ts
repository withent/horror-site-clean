import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'
import { randomUUID } from 'crypto'

export default defineEventHandler(async (event) => {
  const { title, content } = await readBody(event)
  const path = join(process.cwd(), 'data/stories.json')

  const stories = JSON.parse(await readFile(path, 'utf-8').catch(() => '[]'))
  const newStory = { id: randomUUID(), title, content, createdAt: Date.now() }
  stories.unshift(newStory)
  await writeFile(path, JSON.stringify(stories, null, 2))
  return newStory
})
