import { Navigate, useParams } from 'react-router-dom'

import { QUARTERS } from '@/data/academic-calendar'
import type { Grade, Quarter, WorkSubject } from '@/data/works-catalog'
import { WorkCard } from '@/features/works/work-card'
import { getWorks } from '@/lib/works/query'

type QuarterViewProps = {
  subject: WorkSubject
}

function parseGrade(value: string | undefined): Grade | null {
  if (!value) return null
  const n = Number(value)
  if (n === 2 || n === 3 || n === 4 || n === 5) return n
  return null
}

function parseQuarter(value: string | undefined): Quarter | null {
  if (!value || !/^q[1-4]$/.test(value)) return null
  return Number(value.slice(1)) as Quarter
}

export function QuarterView({ subject }: QuarterViewProps) {
  const { grade: gradeParam, quarter: quarterParam } = useParams()
  const grade = parseGrade(gradeParam)
  const quarter = parseQuarter(quarterParam)

  if (!grade) {
    return <Navigate to={`/${subject}`} replace />
  }

  if (!quarter) {
    return <Navigate to={`/${subject}/${grade}`} replace />
  }

  if (subject === 'math' && grade !== 5) {
    return <Navigate to="/math" replace />
  }

  const info = QUARTERS.find((q) => q.quarter === quarter)
  const works = getWorks(subject, grade, quarter)

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">
          {info?.title ?? `${quarter}-я четверть`}
        </h2>
        <p className="text-sm text-muted-foreground">
          {info ? `${info.startLabel} — ${info.endLabel}` : null}
          {` · ${works.length} работ`}
        </p>
      </div>

      {works.length === 0 ? (
        <p className="rounded-lg border border-dashed px-4 py-10 text-center text-sm text-muted-foreground">
          В этой четверти пока нет работ
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {works.map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>
      )}
    </div>
  )
}
