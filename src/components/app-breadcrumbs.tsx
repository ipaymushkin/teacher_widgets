import { Fragment } from 'react'
import { Link, useLocation } from 'react-router-dom'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { sectionTitles, type NavSection } from '@/components/app-sidebar'
import type { Grade, Quarter } from '@/data/works-catalog'

type Crumb = {
  label: string
  href?: string
}

function parsePath(pathname: string): {
  section: NavSection | null
  grade: Grade | null
  quarter: Quarter | null
} {
  const parts = pathname.split('/').filter(Boolean)
  const sectionPart = parts[0]
  const section: NavSection | null =
    sectionPart === 'math' ||
    sectionPart === 'english' ||
    sectionPart === 'utilities'
      ? sectionPart
      : null

  if (!section || section === 'utilities') {
    return { section, grade: null, quarter: null }
  }

  const gradeNum = Number(parts[1])
  const grade: Grade | null =
    gradeNum === 2 || gradeNum === 3 || gradeNum === 4 || gradeNum === 5
      ? gradeNum
      : null

  const quarterPart = parts[2]
  const quarter: Quarter | null =
    quarterPart && /^q[1-4]$/.test(quarterPart)
      ? (Number(quarterPart.slice(1)) as Quarter)
      : null

  return { section, grade, quarter }
}

export function AppBreadcrumbs() {
  const { pathname } = useLocation()
  const { section, grade, quarter } = parsePath(pathname)

  if (!section) return null

  const sectionTitle = sectionTitles[section]
  const sectionPath = `/${section}`

  if (section === 'utilities') {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>{sectionTitle}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )
  }

  const crumbs: Crumb[] = [
    {
      label: sectionTitle,
      href: grade || quarter ? sectionPath : undefined,
    },
  ]

  if (grade) {
    crumbs.push({
      label: `${grade} класс`,
      href: quarter ? `${sectionPath}/${grade}` : undefined,
    })
  }

  if (quarter) {
    crumbs.push({
      label: `${quarter} четверть`,
    })
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1
          return (
            <Fragment key={`${crumb.label}-${index}`}>
              {index > 0 ? <BreadcrumbSeparator /> : null}
              <BreadcrumbItem>
                {isLast || !crumb.href ? (
                  <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={crumb.href}>{crumb.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
