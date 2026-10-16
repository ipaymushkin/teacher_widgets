import {
  Calculator,
  Languages,
  Moon,
  Sun,
  Wrench,
  type LucideIcon,
} from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { useNow } from '@/hooks/use-now'
import { useTheme } from '@/hooks/use-theme'

export type NavSection = 'math' | 'english' | 'utilities'

const navItems: { id: NavSection; title: string; icon: LucideIcon }[] = [
  { id: 'math', title: 'Математика', icon: Calculator },
  { id: 'english', title: 'Английский язык', icon: Languages },
  { id: 'utilities', title: 'Утилиты', icon: Wrench },
]

function formatDateTime(date: Date) {
  const datePart = date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const timePart = date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
  return { datePart, timePart }
}

export function AppSidebar() {
  const { theme, toggleTheme } = useTheme()
  const now = useNow()
  const location = useLocation()
  const { datePart, timePart } = formatDateTime(now)

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border px-4 py-3">
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-semibold tracking-tight">
            Teacher Widgets
          </span>
          <span className="text-xs text-muted-foreground">
            Инструменты для учителей
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Разделы</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const to = `/${item.id}`
                const isActive = location.pathname.startsWith(to)
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                    >
                      <NavLink to={to}>
                        <item.icon />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border gap-3 p-3">
        <div className="px-1">
          <p className="text-xs text-muted-foreground capitalize">{datePart}</p>
          <p className="text-sm font-medium tabular-nums">{timePart}</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-start gap-2"
          onClick={toggleTheme}
        >
          {theme === 'dark' ? <Sun /> : <Moon />}
          <span>{theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'}</span>
        </Button>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}

export const sectionTitles: Record<NavSection, string> = {
  math: 'Математика',
  english: 'Английский язык',
  utilities: 'Утилиты',
}
