import { useState } from 'react'

import {
  AppSidebar,
  sectionTitles,
  type NavSection,
} from '@/components/app-sidebar'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { EnglishPage } from '@/features/works/english-page'
import { MathPage } from '@/features/works/math-page'
import { UtilitiesPage } from '@/features/utilities/utilities-page'

function App() {
  const [activeSection, setActiveSection] = useState<NavSection>('math')

  return (
    <SidebarProvider>
      <AppSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <h1 className="text-sm font-medium">
            {sectionTitles[activeSection]}
          </h1>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-6">
          {activeSection === 'math' ? (
            <MathPage />
          ) : activeSection === 'english' ? (
            <EnglishPage />
          ) : (
            <UtilitiesPage />
          )}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default App
