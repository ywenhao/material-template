import { copyFile, cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const distPath = fileURLToPath(new URL('../../dist/', import.meta.url))
const manifestPath = fileURLToPath(new URL('../../packages/main/package.json', import.meta.url))

async function prepareDeclarations() {
  const typesPath = join(distPath, 'types')
  const mainTypesPath = join(typesPath, 'packages/main')

  // Flatten the main declarations before copying the remaining package directories.
  await cp(mainTypesPath, distPath, { recursive: true })
  await rm(mainTypesPath, { recursive: true, force: true })
  await cp(join(typesPath, 'packages'), distPath, { recursive: true })
  await rm(typesPath, { recursive: true, force: true })
}

async function replaceAliases() {
  const entries = await readdir(distPath, { recursive: true, withFileTypes: true })
  const files = entries.filter((entry) => entry.isFile() && entry.name.endsWith('.ts'))

  await Promise.all(
    files.map(async (entry) => {
      const path = join(entry.parentPath, entry.name)
      const content = await readFile(path, 'utf-8')
      const updated = content.replaceAll("'@material-template", "'material-template")
      if (updated !== content) await writeFile(path, updated, 'utf-8')
    }),
  )
}

async function cleanBuildInfo() {
  const entries = await readdir(distPath, { withFileTypes: true })
  const files = entries.filter((entry) => entry.isFile() && entry.name.endsWith('.tsbuildinfo'))

  await Promise.all(files.map((entry) => rm(join(distPath, entry.name))))
}

await mkdir(distPath, { recursive: true })

// These branches write separate files; declaration preparation preserves its own order.
await Promise.all([copyFile(manifestPath, join(distPath, 'package.json')), prepareDeclarations()])

// Wait for all copies before rewriting aliases, then remove temporary build info.
await replaceAliases()
await cleanBuildInfo()
