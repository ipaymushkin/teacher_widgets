import { ArrowLeft, FolderOpen } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { QUARTERS } from '@/data/academic-calendar'
import type { Grade, Quarter, WorkSubject } from '@/data/works-catalog'
import { countWorks } from '@/lib/works/query'

type GradeQuartersProps = {
  subject: WorkSubject
  grade: Grade
  gradeLabel: string
  onBack: () => void
  onSelectQuarter: (quarter: Quarter) => void
}

export function GradeQuarters({
  subject,
  grade,
  gradeLabel,
  onBack,
  onSelectQuarter,
}: GradeQuartersProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft />
          Назад
        </Button>
      </div>

      <div>
        <h2 className="text-lg font-semibold tracking-tight">{gradeLabel}</h2>
        <p className="text-sm text-muted-foreground">
          Выберите четверть учебного года 2026/27
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {QUARTERS.map((q) => {
          const count = countWorks(subject, grade, q.quarter)
          return (
            <button
              key={q.quarter}
              type="button"
              className="text-left"
              onClick={() => onSelectQuarter(q.quarter)}
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
            </button>
          )
        })}
      </div>
    </div>
  )
}
