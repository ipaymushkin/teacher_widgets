import { Link } from 'react-router-dom'

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { utilitiesCatalog } from '@/data/utilities-catalog'

export function UtilitiesPage() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">
        Выберите утилиту — откроется форма настройки.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {utilitiesCatalog.map((utility) => (
          <Link
            key={utility.id}
            to={`/utilities/${utility.id}`}
            className="text-left"
          >
            <Card className="h-full transition-colors hover:bg-muted/40">
              <CardHeader>
                <div className="mb-2 flex size-9 items-center justify-center rounded-lg bg-muted">
                  <utility.icon className="size-4" />
                </div>
                <CardTitle>{utility.title}</CardTitle>
                <CardDescription>{utility.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
