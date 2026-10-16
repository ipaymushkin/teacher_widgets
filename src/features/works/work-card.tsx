import { FileText } from 'lucide-react'

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { WorkItem } from '@/data/works-catalog'
import { formatWorkDate } from '@/lib/works/query'
import { PdfPreview } from '@/features/works/pdf-preview'

type WorkCardProps = {
  work: WorkItem
}

export function WorkCard({ work }: WorkCardProps) {
  return (
    <a
      href={work.path}
      target="_blank"
      rel="noreferrer"
      className="block h-full text-left"
    >
      <Card className="h-full overflow-hidden transition-colors hover:bg-muted/30">
        <div className="relative aspect-[4/3] border-b bg-muted/20">
          {work.kind === 'html' ? (
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <iframe
                title={work.title}
                src={work.path}
                sandbox=""
                loading="lazy"
                className="h-[300%] w-[300%] origin-top-left scale-[0.333] border-0 bg-white"
              />
            </div>
          ) : (
            <PdfPreview src={work.path} />
          )}
          <span className="absolute right-2 top-2 rounded-md bg-background/90 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground shadow-sm">
            {work.kind === 'pdf' ? (
              <span className="inline-flex items-center gap-1">
                <FileText className="size-3" />
                pdf
              </span>
            ) : (
              'html'
            )}
          </span>
        </div>
        <CardHeader className="gap-1.5">
          <CardTitle className="line-clamp-2 text-sm leading-snug">
            {work.title}
          </CardTitle>
          <CardDescription>{formatWorkDate(work.createdAt)}</CardDescription>
        </CardHeader>
      </Card>
    </a>
  )
}
