import { useState } from 'react'
import { Folder } from 'lucide-react'

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { Grade, Quarter } from '@/data/works-catalog'
import { GradeQuarters } from '@/features/works/grade-quarters'
import { QuarterView } from '@/features/works/quarter-view'
import { countWorks } from '@/lib/works/query'

const GRADES: { grade: Grade; label: string; hint: string }[] = [
  { grade: 2, label: '2 класс', hint: 'Spotlight 2' },
  { grade: 3, label: '3 класс', hint: 'Spotlight 3' },
  { grade: 4, label: '4 класс', hint: 'Spotlight 4' },
  { grade: 5, label: '5 класс', hint: 'Spotlight 5' },
]

type EnglishView = 'grades' | 'quarters' | 'works'

export function EnglishPage() {
  const [view, setView] = useState<EnglishView>('grades')
  const [grade, setGrade] = useState<Grade | null>(null)
  const [quarter, setQuarter] = useState<Quarter | null>(null)

  if (view === 'works' && grade && quarter) {
    return (
      <QuarterView
        subject="english"
        grade={grade}
        quarter={quarter}
        onBack={() => {
          setView('quarters')
          setQuarter(null)
        }}
      />
    )
  }

  if (view === 'quarters' && grade) {
    const meta = GRADES.find((g) => g.grade === grade)
    return (
      <GradeQuarters
        subject="english"
        grade={grade}
        gradeLabel={`${meta?.label ?? `${grade} класс`} · ${meta?.hint ?? 'Spotlight'}`}
        onBack={() => {
          setView('grades')
          setGrade(null)
        }}
        onSelectQuarter={(q) => {
          setQuarter(q)
          setView('works')
        }}
      />
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">
        Учебник Spotlight. Выберите класс — внутри материалы по четвертям.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {GRADES.map((g) => {
          const total = countWorks('english', g.grade)
          return (
            <button
              key={g.grade}
              type="button"
              className="text-left"
              onClick={() => {
                setGrade(g.grade)
                setView('quarters')
              }}
            >
              <Card className="h-full transition-colors hover:bg-muted/40">
                <CardHeader>
                  <div className="mb-2 flex size-9 items-center justify-center rounded-lg bg-muted">
                    <Folder className="size-4" />
                  </div>
                  <CardTitle>{g.label}</CardTitle>
                  <CardDescription>
                    {g.hint}
                    <br />
                    {total} работ
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
