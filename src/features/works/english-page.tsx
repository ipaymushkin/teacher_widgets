import { Link } from 'react-router-dom'
import { Folder } from 'lucide-react'

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { Grade } from '@/data/works-catalog'
import { countWorks } from '@/lib/works/query'

const GRADES: { grade: Grade; label: string; hint: string }[] = [
  { grade: 2, label: '2 класс', hint: 'Spotlight 2' },
  { grade: 3, label: '3 класс', hint: 'Spotlight 3' },
  { grade: 4, label: '4 класс', hint: 'Spotlight 4' },
  { grade: 5, label: '5 класс', hint: 'Spotlight 5' },
]

export function EnglishPage() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">
        Учебник Spotlight. Выберите класс — внутри материалы по четвертям.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {GRADES.map((g) => {
          const total = countWorks('english', g.grade)
          return (
            <Link
              key={g.grade}
              to={`/english/${g.grade}`}
              className="text-left"
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
            </Link>
          )
        })}
      </div>
    </div>
  )
}
