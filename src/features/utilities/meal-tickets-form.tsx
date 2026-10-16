import { useMemo, useState } from 'react'
import { Printer } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { StudentListEditor } from '@/features/utilities/student-list-editor'
import {
  addDays,
  addMonths,
  parseInputDate,
  toInputDate,
} from '@/lib/meal-tickets/date'
import {
  generateMealTicketsHtml,
  openPrintHtml,
} from '@/lib/meal-tickets/generate'

function getDefaultDates() {
  const from = addDays(new Date(), 1)
  const to = addMonths(from, 1)
  return { from: toInputDate(from), to: toInputDate(to) }
}

export function MealTicketsForm() {
  const defaults = useMemo(() => getDefaultDates(), [])
  const [dateFrom, setDateFrom] = useState(defaults.from)
  const [dateTo, setDateTo] = useState(defaults.to)
  const [includeSaturday, setIncludeSaturday] = useState(false)
  const [className, setClassName] = useState('5В')
  const [breakfastNames, setBreakfastNames] = useState<string[]>([])
  const [lunchNames, setLunchNames] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const [lastStats, setLastStats] = useState<{
    cards: number
    pages: number
    days: number
  } | null>(null)

  const handleGenerate = () => {
    setError(null)

    const from = parseInputDate(dateFrom)
    const to = parseInputDate(dateTo)
    if (!from || !to) {
      setError('Укажите корректный период дат.')
      return
    }
    if (from > to) {
      setError('Дата «с» не может быть позже даты «по».')
      return
    }

    const trimmedClass = className.trim()
    if (!trimmedClass) {
      setError('Укажите класс.')
      return
    }

    if (breakfastNames.length === 0 && lunchNames.length === 0) {
      setError('Добавьте хотя бы одного ученика в завтрак или обед.')
      return
    }

    try {
      const result = generateMealTicketsHtml({
        dateFrom: from,
        dateTo: to,
        includeSaturday,
        className: trimmedClass,
        breakfastNames,
        lunchNames,
      })

      if (result.cardCount === 0) {
        setError(
          'В выбранном периоде нет учебных дней. Проверьте даты и опцию субботы.',
        )
        return
      }

      openPrintHtml(result.html)
      setLastStats({
        cards: result.cardCount,
        pages: result.pageCount,
        days: result.schoolDayCount,
      })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Не удалось сгенерировать HTML.')
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Генерация талонов на питание</CardTitle>
          <CardDescription>
            Укажите период, класс и списки учеников. По кнопке откроется HTML
            для печати (A4 горизонтально, 18 талонов на лист).
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="date-from">Дата с</Label>
              <Input
                id="date-from"
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="date-to">Дата по</Label>
              <Input
                id="date-to"
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex flex-1 flex-col gap-2">
              <Label htmlFor="class-name">Класс</Label>
              <Input
                id="class-name"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                placeholder="5В"
              />
            </div>
            <label className="flex h-8 items-center gap-2 text-sm">
              <Checkbox
                checked={includeSaturday}
                onCheckedChange={(checked) =>
                  setIncludeSaturday(checked === true)
                }
              />
              Рабочая суббота
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <StudentListEditor
              id="breakfast"
              label="Завтрак"
              students={breakfastNames}
              onChange={setBreakfastNames}
            />
            <StudentListEditor
              id="lunch"
              label="Обед"
              students={lunchNames}
              onChange={setLunchNames}
            />
          </div>

          {error ? (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          ) : null}

          {lastStats ? (
            <p className="text-sm text-muted-foreground">
              Сгенерировано: {lastStats.cards} талонов · {lastStats.pages} стр. ·{' '}
              {lastStats.days} уч. дней
            </p>
          ) : null}

          <div>
            <Button onClick={handleGenerate}>
              <Printer />
              Сгенерировать
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
