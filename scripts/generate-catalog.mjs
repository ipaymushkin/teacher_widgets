import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const raw = fs
  .readFileSync(path.join(__dirname, 'works-import.json'), 'utf8')
  .replace(/^\uFEFF/, '')
const data = JSON.parse(raw)

const nicerTitles = {
  'spotlight-4-wb': 'Spotlight 4 — Workbook (PDF)',
  kim_4: 'Spotlight 4 — КИМ (PDF)',
}

const body = data
  .map((w) => {
    const title = nicerTitles[w.title] ?? w.title
    return `  {
    id: ${JSON.stringify(w.id)},
    subject: ${JSON.stringify(w.subject)},
    grade: ${w.grade},
    quarter: ${w.quarter},
    title: ${JSON.stringify(title)},
    createdAt: ${JSON.stringify(w.createdAt)},
    path: ${JSON.stringify(w.path)},
    kind: ${JSON.stringify(w.kind)},
  }`
  })
  .join(',\n')

const out = `export type WorkSubject = 'math' | 'english'
export type WorkKind = 'html' | 'pdf'
export type Quarter = 1 | 2 | 3 | 4
export type Grade = 2 | 3 | 4 | 5

export type WorkItem = {
  id: string
  subject: WorkSubject
  grade: Grade
  quarter: Quarter
  title: string
  createdAt: string
  path: string
  kind: WorkKind
}

export const worksCatalog: WorkItem[] = [
${body},
]
`

const dest = path.join(__dirname, '..', 'src', 'data', 'works-catalog.ts')
fs.mkdirSync(path.dirname(dest), { recursive: true })
fs.writeFileSync(dest, out)
console.log(`wrote ${data.length} items → ${dest}`)
