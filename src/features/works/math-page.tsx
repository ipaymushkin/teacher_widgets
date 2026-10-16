import { Link } from 'react-router-dom'
import { Folder } from 'lucide-react'

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { countWorks } from '@/lib/works/query'

export function MathPage() {
  const total = countWorks('math', 5)

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">
        Выберите класс — внутри материалы по четвертям.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <Link to="/math/5" className="text-left">
          <Card className="h-full transition-colors hover:bg-muted/40">
            <CardHeader>
              <div className="mb-2 flex size-9 items-center justify-center rounded-lg bg-muted">
                <Folder className="size-4" />
              </div>
              <CardTitle>5 класс</CardTitle>
              <CardDescription>{total} работ</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  )
}
