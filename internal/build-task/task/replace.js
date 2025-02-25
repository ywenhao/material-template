import { readFile, writeFile } from 'node:fs/promises'
import { glob } from 'tinyglobby'
import { At_PKG_NAME, PKG_NAME, distPath } from '../utils/path.js'

export async function replaceAlias() {
  const files = await glob('**/*.ts', { cwd: distPath, deep: true, absolute: true, onlyFiles: true })
  const promises = files.map(async (path) => {
    const content = await readFile(path, 'utf-8', { cwd: process.cwd() })
    if (!content.includes(At_PKG_NAME)) return
    const newContent = content.replace(new RegExp(`'${At_PKG_NAME}`, 'g'), `'${PKG_NAME}`)
    await writeFile(path, newContent, 'utf-8')
  })

  await Promise.all(promises)
}

replaceAlias()
