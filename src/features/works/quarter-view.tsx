import { ArrowLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { QUARTERS } from '@/data/academic-calendar'
import type { Grade, Quarter, WorkSubject } from '@/data/works-catalog'
import { WorkCard } from '@/features/works/work-card'
import { getWorks } from '@/lib/works/query'

type QuarterViewProps = {
  subject: WorkSubject
  grade: Grade
  quarter: Quarter
  onBack: () => void
}

export function QuarterView({
  subject,
  grade,
  quarter,
  onBack,
}: QuarterViewProps) {
  const info = QUARTERS.find((q) => q.quarter === quarter)
  const works = getWorks(subject, grade, quarter)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft />
          Назад
        </Button>
      </div>

      <div>
        <h2 className="text-lg font-semibold tracking-tight">
          {info?.title ?? `${quarter}-я четверть`}
        </h2>
        <p className="text-sm text-muted-foreground">
          {info
            ? `${info.startLabel} — ${info.endLabel}`
            : null}
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
