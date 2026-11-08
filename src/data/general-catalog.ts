export type GeneralItem = {
  id: string
  title: string
  createdAt: string
  path: string
}

export const generalCatalog: GeneralItem[] = [
  {
    id: 'class-journals-print',
    title: 'Классные журналы — для печати',
    createdAt: '2026-10-16T00:00:00',
    path: '/content/general/class-journals-print.html',
  },
  {
    id: 'class-5v-portrait',
    title: 'Список учеников 5В класса',
    createdAt: '2026-11-08T23:01:00',
    path: '/content/general/class-5v-portrait.html',
  },
  {
    id: 'passes-5v-print',
    title: 'Пропуска 5В — для печати',
    createdAt: '2026-11-08T23:16:00',
    path: '/content/general/passes-5v.html',
  },
]
