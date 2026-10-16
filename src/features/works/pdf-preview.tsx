import { useEffect, useRef, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { FileText } from 'lucide-react'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString()

type PdfPreviewProps = {
  src: string
  width?: number
}

export function PdfPreview({ src, width = 280 }: PdfPreviewProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '120px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="flex h-full w-full items-center justify-center overflow-hidden bg-muted/40"
    >
      {!visible ? (
        <FileText className="size-8 text-muted-foreground" />
      ) : failed ? (
        <div className="flex flex-col items-center gap-1 text-muted-foreground">
          <FileText className="size-8" />
          <span className="text-xs">PDF</span>
        </div>
      ) : (
        <Document
          file={src}
          loading={
            <div className="flex h-full items-center justify-center">
              <FileText className="size-8 animate-pulse text-muted-foreground" />
            </div>
          }
          error={
            <div className="flex flex-col items-center gap-1 text-muted-foreground">
              <FileText className="size-8" />
              <span className="text-xs">PDF</span>
            </div>
          }
          onLoadError={() => setFailed(true)}
          suspense={false}
        >
          <Page
            pageNumber={1}
            width={width}
            renderAnnotationLayer={false}
            renderTextLayer={false}
          />
        </Document>
      )}
    </div>
  )
}
