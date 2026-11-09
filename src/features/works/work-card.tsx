import { useEffect, useRef, useState } from 'react'
import { Printer } from 'lucide-react'

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { formatWorkDate } from '@/lib/works/query'

/** A4 landscape at 96dpi — matches printable sheets used in content. */
const SHEET_WIDTH = 1123
const SHEET_HEIGHT = 794

export type ContentCardItem = {
  id: string
  title: string
  createdAt: string
  path: string
  answersPath?: string
}

type WorkCardProps = {
  work: ContentCardItem
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
    <Card className="h-full gap-0 overflow-hidden py-0">
      <a
        href={work.path}
        target="_blank"
        rel="noreferrer"
        className="block text-left"
      >
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
      </a>
      <CardHeader className="gap-1.5">
        <a
          href={work.path}
          target="_blank"
          rel="noreferrer"
          className="text-left"
        >
          <CardTitle className="line-clamp-2 text-sm leading-snug hover:underline">
            {work.title}
          </CardTitle>
        </a>
        <CardDescription>{formatWorkDate(work.createdAt)}</CardDescription>
        {work.answersPath ? (
          <a
            href={work.answersPath}
            target="_blank"
            rel="noreferrer"
            className="mt-0.5 inline-flex w-fit items-center gap-1.5 rounded-md border bg-background px-2 py-1 text-xs font-medium hover:bg-muted"
          >
            <Printer className="size-3.5" />
            Печать ответов
          </a>
        ) : null}
      </CardHeader>
    </Card>
  )
}
