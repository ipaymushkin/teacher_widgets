import { Ticket, type LucideIcon } from 'lucide-react'

export type UtilityId = 'meal-tickets'

export type UtilityItem = {
  id: UtilityId
  title: string
  description: string
  icon: LucideIcon
}

export const utilitiesCatalog: UtilityItem[] = [
  {
    id: 'meal-tickets',
    title: 'Генерация талонов',
    description:
      'Талоны на разовое питание для печати на A4 (завтрак / обед).',
    icon: Ticket,
  },
]

export function getUtility(id: string | undefined): UtilityItem | undefined {
  return utilitiesCatalog.find((item) => item.id === id)
}
