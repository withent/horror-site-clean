import formidable from 'formidable'
import { readFile, writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  // 一時フォルダの準備
  const tmpDir = './.tmp'
  await mkdir(tmpDir, { recursive: true })

  // formidable の設定（容量制限あり）
  const form = formidable({
    uploadDir: tmpDir,
    keepExtensions: true,
    maxFileSize: 500 * 1024 * 1024,         // 単一ファイルの最大サイズ：500MB
    maxTotalFileSize: 1000 * 1024 * 1024,   // 合計アップロードサイズ：1GB
  })

  // アップロード解析
  const [fields, files] = await form.parse(event.node.req)

  const file = files.file?.[0]
  if (!file || !file.filepath || !file.originalFilename) {
    return { status: 'error', message: 'ファイルが見つかりません' }
  }

  // ファイル読み込み
  const data = await readFile(file.filepath)

  // 保存先パス作成
  const savePath = join('public/video', file.originalFilename)

  // 保存
  await writeFile(savePath, data)

  // クライアントへ返す
  return {
    status: 'ok',
    path: `/video/${file.originalFilename}`,
  }
})

// Nuxt 3 で bodyParser を無効にする必要あり
export const config = {
  api: {
    bodyParser: false,
  },
}
