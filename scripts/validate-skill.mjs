import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { dirname, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const requiredFiles = [
  'SKILL.md',
  'README.md',
  'references/sneaker-showroom/floating-shelf-layout.md',
  'references/sneaker-showroom/cinematic-camera-focus.md',
  'references/sneaker-showroom/sneaker-model-presentation.md',
  'references/sneaker-showroom/interactive-shelf-lighting.md',
  'references/sneaker-showroom/product-inspection.md',
  'references/sneaker-showroom/sneaker-hud-interface.md',
]

function fail(message) {
  console.error('Skill validation failed:', message)
  process.exitCode = 1
}

function collectMarkdown(directory) {
  const files = []

  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const fullPath = resolve(directory, entry.name)

    if (entry.isDirectory()) {
      files.push(...collectMarkdown(fullPath))
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.md')) {
      files.push(fullPath)
    }
  }

  return files
}

for (const file of requiredFiles) {
  if (!existsSync(resolve(root, file))) fail('Missing required file: ' + file)
}

if (process.exitCode) process.exit(1)

const skill = readFileSync(resolve(root, 'SKILL.md'), 'utf8')
if (!skill.startsWith('---\n')) fail('SKILL.md must start with YAML frontmatter.')

const frontmatter = skill.match(/^---\n([\s\S]*?)\n---\n/)
if (!frontmatter) {
  fail('SKILL.md frontmatter is not closed.')
} else {
  if (!/^name:\s*.+$/m.test(frontmatter[1])) fail('Frontmatter is missing name.')
  if (!/^description:\s*.+$/m.test(frontmatter[1])) fail('Frontmatter is missing description.')
}

let checkedLinks = 0
const markdownFiles = collectMarkdown(root)

for (const absoluteFile of markdownFiles) {
  const content = readFileSync(absoluteFile, 'utf8')
  const links = content.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)

  for (const match of links) {
    const rawTarget = match[1].trim()
    if (!rawTarget || /^(https?:|mailto:|#)/i.test(rawTarget)) continue

    const pathPart = decodeURIComponent(rawTarget.split('#')[0].split('?')[0])
    if (!pathPart) continue

    checkedLinks += 1
    const resolvedTarget = resolve(dirname(absoluteFile), pathPart)
    const relativeTarget = relative(root, resolvedTarget)

    if (relativeTarget.startsWith('..') || !existsSync(resolvedTarget)) {
      fail(relative(root, absoluteFile) + ' contains an invalid relative link: ' + rawTarget)
    }
  }
}

if (!process.exitCode) {
  console.log(
    'Skill validation passed. Checked ' +
    requiredFiles.length +
    ' required files and ' +
    checkedLinks +
    ' relative Markdown links across ' +
    markdownFiles.length +
    ' Markdown files.'
  )
}
