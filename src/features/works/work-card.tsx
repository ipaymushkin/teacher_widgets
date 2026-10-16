import { useEffect, useRef, useState } from 'react'

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { WorkItem } from '@/data/works-catalog'
import { formatWorkDate } from '@/lib/works/query'

/** A4 landscape at 96dpi — matches printable sheets used in content. */
const SHEET_WIDTH = 1123
const SHEET_HEIGHT = 794

type WorkCardProps = {
  work: WorkItem
}

export function WorkCard({ work }: WorkCardProps) {
  const frameRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.25)

  useEffect(() => {
    const el = frameRef.current
    if (!el) return

    const update = () => {
      const width = el.clientWidth
      if (width > 0) setScale(width / SHEET_WIDTH)
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <a
      href={work.path}
      target="_blank"
      rel="noreferrer"
      className="block h-full text-left"
    >
      <Card className="h-full overflow-hidden transition-colors hover:bg-muted/30">
        <div
          ref={frameRef}
          className="relative aspect-[4/3] overflow-hidden border-b bg-white"
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <iframe
              title={work.title}
              src={work.path}
              sandbox=""
              loading="lazy"
              style={{
                width: SHEET_WIDTH,
                height: SHEET_HEIGHT,
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
              }}
              className="border-0 bg-white"
            />
          </div>
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
