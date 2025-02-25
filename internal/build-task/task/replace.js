import { At_PKG_NAME, PKG_NAME } from '@material-template/build-constants'
import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { glob } from 'tinyglobby'

export async function replaceAlias() {
  const files = await glob('../../../dist/**/*.ts', { deep: true })
  const promises = files.map(async (file) => {
    const path = join(__dirname, file)
    const content = await readFile(path, 'utf-8', { cwd: process.cwd() })
    if (!content.includes(At_PKG_NAME)) return
    const newContent = content.replace(new RegExp(`from '${At_PKG_NAME}`, 'g'), `from '${PKG_NAME}`)
    await writeFile(path, newContent, 'utf-8')
  })

  await Promise.all(promises)
}

replaceAlias()
