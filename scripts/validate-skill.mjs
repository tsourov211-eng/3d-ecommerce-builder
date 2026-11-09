import { existsSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const requiredFiles = ['SKILL.md', 'README.md']
const markdownFiles = ['SKILL.md', 'README.md']

function fail(message) {
  console.error('Skill validation failed:', message)
  process.exitCode = 1
}

for (const file of requiredFiles) {
  if (!existsSync(resolve(root, file))) fail('Missing required file: ' + file)
}

if (process.exitCode) process.exit()

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

for (const file of markdownFiles) {
  const absoluteFile = resolve(root, file)
  if (!existsSync(absoluteFile)) continue

  const content = readFileSync(absoluteFile, 'utf8')
  const links = content.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)

  for (const match of links) {
    const rawTarget = match[1].trim()
    if (!rawTarget || /^(https?:|mailto:|#)/i.test(rawTarget)) continue

    const target = rawTarget.split('#')[0]
    if (!target) continue

    checkedLinks += 1
    const resolvedTarget = resolve(dirname(absoluteFile), decodeURIComponent(target))

    if (!existsSync(resolvedTarget)) fail(file + ' contains a broken relative link: ' + rawTarget)
  }
}

if (!process.exitCode) {
  console.log('Skill validation passed. Checked ' + checkedLinks + ' relative Markdown links.')
}
