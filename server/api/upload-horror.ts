import formidable from 'formidable'
import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  const form = formidable({ uploadDir: '/tmp', keepExtensions: true })
  const [fields, files] = await form.parse(event.node.req)

  const file = files.file?.[0]
  if (!file || !file.filepath || !file.originalFilename) {
    return { status: 'error', message: 'ファイルが見つかりません' }
  }

  const data = await readFile(file.filepath)
  const savePath = join('public/horror', file.originalFilename)
  await writeFile(savePath, data)

  return { status: 'ok', path: `/horror/${file.originalFilename}` }
})

export const config = {
  api: {
    bodyParser: false,
  },
}
