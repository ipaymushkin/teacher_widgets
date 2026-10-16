import type { Quarter } from '@/data/works-catalog'

export type QuarterInfo = {
  quarter: Quarter
  title: string
  startLabel: string
  endLabel: string
}

/** Учебный год 2026/27 — четверти для группировки работ */
export const QUARTERS: QuarterInfo[] = [
  {
    quarter: 1,
    title: 'Первая четверть',
    startLabel: '1 сентября 2026',
    endLabel: '25 октября 2026',
  },
  {
    quarter: 2,
    title: 'Вторая четверть',
    startLabel: '4 ноября 2026',
    endLabel: '30 декабря 2026',
  },
  {
    quarter: 3,
    title: 'Третья четверть',
    startLabel: '11 января 2027',
    endLabel: '26 марта 2027',
  },
  {
    quarter: 4,
    title: 'Четвёртая четверть',
    startLabel: '5 апреля 2027',
    endLabel: '26 мая 2027',
  },
]
