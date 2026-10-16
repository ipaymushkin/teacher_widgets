import { useState } from 'react'
import { Folder } from 'lucide-react'

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { Quarter } from '@/data/works-catalog'
import { GradeQuarters } from '@/features/works/grade-quarters'
import { QuarterView } from '@/features/works/quarter-view'
import { countWorks } from '@/lib/works/query'

type MathView = 'grades' | 'quarters' | 'works'

export function MathPage() {
  const [view, setView] = useState<MathView>('grades')
  const [quarter, setQuarter] = useState<Quarter | null>(null)
  const total = countWorks('math', 5)

  if (view === 'works' && quarter) {
    return (
      <QuarterView
        subject="math"
        grade={5}
        quarter={quarter}
        onBack={() => {
          setView('quarters')
          setQuarter(null)
        }}
      />
    )
  }

  if (view === 'quarters') {
    return (
      <GradeQuarters
        subject="math"
        grade={5}
        gradeLabel="5 класс"
        onBack={() => setView('grades')}
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
        Выберите класс — внутри материалы по четвертям.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <button
          type="button"
          className="text-left"
          onClick={() => setView('quarters')}
        >
          <Card className="h-full transition-colors hover:bg-muted/40">
            <CardHeader>
              <div className="mb-2 flex size-9 items-center justify-center rounded-lg bg-muted">
                <Folder className="size-4" />
              </div>
              <CardTitle>5 класс</CardTitle>
              <CardDescription>{total} работ</CardDescription>
            </CardHeader>
          </Card>
        </button>
      </div>
    </div>
  )
}
