import { readdir } from 'fs/promises'
import { join } from 'path'

export default defineEventHandler(async () => {
  const videoDir = join(process.cwd(), 'public/video')
  const files = await readdir(videoDir)

  const videos = files
    .filter((f) => f.endsWith('.mp4'))
    .map((file) => {
      return {
        path: `/video/${file}`,
        title: file.replace('.mp4', '')
      }
    })

  return videos
})
