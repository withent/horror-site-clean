import { readdir } from 'fs/promises'
import { join } from 'path'

export default defineEventHandler(async () => {
  const dir = join(process.cwd(), 'public/horror')
  const files = await readdir(dir)
  const images = files
    .filter((f) => f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg'))
    .map((f) => `/horror/${f}`)
  return images
})
