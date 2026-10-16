import { generalCatalog } from '@/data/general-catalog'
import { WorkCard } from '@/features/works/work-card'

export function GeneralPage() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">
        Общие материалы для печати и работы с классами.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {generalCatalog.map((item) => (
          <WorkCard key={item.id} work={item} />
        ))}
      </div>
    </div>
  )
}
