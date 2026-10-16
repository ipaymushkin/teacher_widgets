import { formatRuShort, startOfLocalDay } from './date'
import { MEAL_TICKET_STYLES } from './styles'

export const CARDS_PER_PAGE = 18

const MONTHS_GEN: Record<number, string> = {
  1: 'января',
  2: 'февраля',
  3: 'марта',
  4: 'апреля',
  5: 'мая',
  6: 'июня',
  7: 'июля',
  8: 'августа',
  9: 'сентября',
  10: 'октября',
  11: 'ноября',
  12: 'декабря',
}

export type MealKind = 'ЗАВТРАК' | 'ОБЕД'

export type MealTicketCard = {
  meal: MealKind
  name: string
  dayNum: string
  month: string
  year: number
}

export type MealTicketsInput = {
  dateFrom: Date
  dateTo: Date
  includeSaturday: boolean
  className: string
  breakfastNames: string[]
  lunchNames: string[]
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function formatName(name: string): string {
  const i = name.indexOf(' ')
  if (i === -1) return escapeHtml(name)
  return (
    escapeHtml(name.slice(0, i)) +
    '\u2009\u00A0' +
    escapeHtml(name.slice(i + 1))
  )
}

export function getSchoolDays(
  dateFrom: Date,
  dateTo: Date,
  includeSaturday: boolean,
): Date[] {
  const days: Date[] = []
  const cursor = startOfLocalDay(dateFrom)
  const end = startOfLocalDay(dateTo)

  while (cursor <= end) {
    const weekday = cursor.getDay()
    const isWeekday = weekday >= 1 && weekday <= 5
    const isSaturday = weekday === 6
    if (isWeekday || (includeSaturday && isSaturday)) {
      days.push(new Date(cursor.getTime()))
    }
    cursor.setDate(cursor.getDate() + 1)
  }

  return days
}

export function buildCards(input: MealTicketsInput): MealTicketCard[] {
  const cards: MealTicketCard[] = []

  for (const day of getSchoolDays(
    input.dateFrom,
    input.dateTo,
    input.includeSaturday,
  )) {
    const dayNum = String(day.getDate())
    const month = MONTHS_GEN[day.getMonth() + 1]
    const year = day.getFullYear()

    for (const name of input.breakfastNames) {
      cards.push({ meal: 'ЗАВТРАК', name, dayNum, month, year })
    }
    for (const name of input.lunchNames) {
      cards.push({ meal: 'ОБЕД', name, dayNum, month, year })
    }
  }

  return cards
}

function cardHtml(card: MealTicketCard, className: string): string {
  const mealClass = card.meal === 'ОБЕД' ? 'meal obed' : 'meal'
  return `
        <article class="card">
          <div class="main">
            <div class="school">МОУ СОШ № 3<br>ЦО «Гимназия»</div>
            <div class="title">ТАЛОН<br>НА ПОЛУЧЕНИЕ<br>РАЗОВОГО ПИТАНИЯ</div>

            <div class="fields">
              <div class="class-row field">
                <span class="label">Класс</span>
                <span class="underline"><span class="hand fill-class">${escapeHtml(className)}</span></span>
              </div>

              <div class="name-block">
                <div class="field name-label">Фамилия, имя</div>
                <div class="underline name-line">
                  <span class="hand fill-name">${formatName(card.name)}</span>
                </div>
              </div>

              <div class="date-row field">
                Дата «<span class="date-blank"><span class="hand fill-day">${escapeHtml(card.dayNum)}</span></span>»
                <span class="date-month-blank"><span class="hand fill-month">${escapeHtml(card.month)}</span></span>
                ${card.year} г.
              </div>

              <div class="sig-block">
                <div class="field sig-label">Подпись кл. руководителя</div>
                <div class="underline sig-line"></div>
              </div>
            </div>
          </div>
          <div class="meal-col">
            <div class="${mealClass}">${card.meal}</div>
          </div>
        </article>
      `
}

export function generateMealTicketsHtml(input: MealTicketsInput): {
  html: string
  cardCount: number
  pageCount: number
  schoolDayCount: number
} {
  const cards = buildCards(input)
  const pageCount = cards.length === 0 ? 0 : Math.ceil(cards.length / CARDS_PER_PAGE)
  const schoolDayCount = getSchoolDays(
    input.dateFrom,
    input.dateTo,
    input.includeSaturday,
  ).length

  const pages: string[] = []
  for (let p = 0; p < pageCount; p++) {
    const slice = cards.slice(p * CARDS_PER_PAGE, (p + 1) * CARDS_PER_PAGE)
    pages.push(
      `<section class="page">${slice.map((c) => cardHtml(c, input.className)).join('')}</section>`,
    )
  }

  const period = `${formatRuShort(input.dateFrom)}–${formatRuShort(input.dateTo)}`
  const saturdayNote = input.includeSaturday
    ? ', с рабочими субботами'
    : ', без выходных'
  const title = `Талоны на питание — ${escapeHtml(input.className)} · ${period}`

  const html = `<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@600&display=swap" rel="stylesheet">
  <style>
${MEAL_TICKET_STYLES}
  </style>
</head>
<body>
  <div class="screen-hint">
    <div><strong>Талоны на питание ${escapeHtml(input.className)}</strong> — ${period}${saturdayNote}.</div>
    <div>На листе: <strong>18</strong> карточек (6×3). Всего: <strong>${cards.length}</strong> шт. / <strong>${pageCount}</strong> стр. Печать: A4 горизонтально, масштаб 100%, поля «по умолчанию».</div>
  </div>
  ${pages.join('\n')}
</body>
</html>
`

  return {
    html,
    cardCount: cards.length,
    pageCount,
    schoolDayCount,
  }
}

export function openPrintHtml(html: string): void {
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const win = window.open(url, '_blank')
  if (!win) {
    URL.revokeObjectURL(url)
    throw new Error('Не удалось открыть окно. Разрешите всплывающие окна для сайта.')
  }
  window.setTimeout(() => URL.revokeObjectURL(url), 60_000)
}
