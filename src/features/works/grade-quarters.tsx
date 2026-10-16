import { Link, Navigate, useParams } from 'react-router-dom'
import { FolderOpen } from 'lucide-react'

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { QUARTERS } from '@/data/academic-calendar'
import type { Grade, WorkSubject } from '@/data/works-catalog'
import { countWorks } from '@/lib/works/query'

type GradeQuartersProps = {
  subject: WorkSubject
}

function parseGrade(value: string | undefined): Grade | null {
  if (!value) return null
  const n = Number(value)
  if (n === 2 || n === 3 || n === 4 || n === 5) return n
  return null
}

export function GradeQuarters({ subject }: GradeQuartersProps) {
  const { grade: gradeParam } = useParams()
  const grade = parseGrade(gradeParam)

  if (!grade) {
    return <Navigate to={`/${subject}`} replace />
  }

  if (subject === 'math' && grade !== 5) {
    return <Navigate to="/math" replace />
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">
          {grade} класс
        </h2>
        <p className="text-sm text-muted-foreground">
          Выберите четверть учебного года 2026/27
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {QUARTERS.map((q) => {
          const count = countWorks(subject, grade, q.quarter)
          return (
            <Link
              key={q.quarter}
              to={`/${subject}/${grade}/q${q.quarter}`}
              className="text-left"
            >
              <Card className="h-full transition-colors hover:bg-muted/40">
                <CardHeader>
                  <div className="mb-2 flex size-9 items-center justify-center rounded-lg bg-muted">
                    <FolderOpen className="size-4" />
                  </div>
                  <CardTitle>
                    {q.quarter}. {q.title}
                  </CardTitle>
                  <CardDescription>
                    {q.startLabel} — {q.endLabel}
                    <br />
                    {count === 0 ? 'Нет работ' : `${count} работ`}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
