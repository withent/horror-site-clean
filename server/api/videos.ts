import { readdirSync } from 'fs'
import { join } from 'path'

export default defineEventHandler(() => {
  const videoDir = join(process.cwd(), 'public', 'media', 'Video')
  const files = readdirSync(videoDir).filter(f => f.endsWith('.mp4'))

  return files.map(filename => ({
    title: filename.replace('.mp4', ''),
    path: `/media/Video/${filename}`
  }))
})
