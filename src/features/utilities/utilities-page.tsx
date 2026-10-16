import { useState } from 'react'
import { Ticket } from 'lucide-react'

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { MealTicketsForm } from '@/features/utilities/meal-tickets-form'

type UtilityId = 'meal-tickets'

const utilities: {
  id: UtilityId
  title: string
  description: string
  icon: typeof Ticket
}[] = [
  {
    id: 'meal-tickets',
    title: 'Генерация талонов',
    description:
      'Талоны на разовое питание для печати на A4 (завтрак / обед).',
    icon: Ticket,
  },
]

export function UtilitiesPage() {
  const [activeUtility, setActiveUtility] = useState<UtilityId | null>(null)

  if (activeUtility === 'meal-tickets') {
    return <MealTicketsForm onBack={() => setActiveUtility(null)} />
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">
        Выберите утилиту — откроется форма настройки.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {utilities.map((utility) => (
          <button
            key={utility.id}
            type="button"
            className="text-left"
            onClick={() => setActiveUtility(utility.id)}
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
          </button>
        ))}
      </div>
    </div>
  )
}
