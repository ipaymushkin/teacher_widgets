import { worksCatalog, type Grade, type Quarter, type WorkItem, type WorkSubject } from '@/data/works-catalog'

export function getWorks(subject: WorkSubject, grade: Grade, quarter?: Quarter): WorkItem[] {
  return worksCatalog
    .filter(
      (w) =>
        w.subject === subject &&
        w.grade === grade &&
        (quarter === undefined || w.quarter === quarter),
    )
    .sort(
      (a, b) =>
        a.createdAt.localeCompare(b.createdAt) || a.title.localeCompare(b.title, 'ru'),
    )
}

export function countWorks(subject: WorkSubject, grade: Grade, quarter?: Quarter): number {
  return getWorks(subject, grade, quarter).length
}

export function formatWorkDate(iso: string): string {
  const date = new Date(iso)
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
