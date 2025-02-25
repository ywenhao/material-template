import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { glob } from 'tinyglobby'
import { At_PKG_NAME, PKG_NAME, distPath } from '../utils/path.js'

export async function replaceAlias() {
  const files = await glob(join(distPath, '**/*.ts'), { deep: true })
  const promises = files.map(async (path) => {
    const content = await readFile(path, 'utf-8', { cwd: process.cwd() })
    if (!content.includes(At_PKG_NAME)) return
    const newContent = content.replace(new RegExp(`from '${At_PKG_NAME}`, 'g'), `from '${PKG_NAME}`)
    await writeFile(path, newContent, 'utf-8')
  })

  await Promise.all(promises)
}

replaceAlias()
