import type { ReactNode } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { AppSidebar } from '@/components/app-sidebar'
import { AppBreadcrumbs } from '@/components/app-breadcrumbs'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { EnglishPage } from '@/features/works/english-page'
import { MathPage } from '@/features/works/math-page'
import { GradeQuarters } from '@/features/works/grade-quarters'
import { QuarterView } from '@/features/works/quarter-view'
import { UtilitiesPage } from '@/features/utilities/utilities-page'

function AppShell({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <AppBreadcrumbs />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}

function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Navigate to="/math" replace />} />
        <Route path="/math" element={<MathPage />} />
        <Route
          path="/math/:grade"
          element={<GradeQuarters subject="math" />}
        />
        <Route
          path="/math/:grade/:quarter"
          element={<QuarterView subject="math" />}
        />
        <Route path="/english" element={<EnglishPage />} />
        <Route
          path="/english/:grade"
          element={<GradeQuarters subject="english" />}
        />
        <Route
          path="/english/:grade/:quarter"
          element={<QuarterView subject="english" />}
        />
        <Route path="/utilities" element={<UtilitiesPage />} />
        <Route path="*" element={<Navigate to="/math" replace />} />
      </Routes>
    </AppShell>
  )
}

export default App
