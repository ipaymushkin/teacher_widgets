import { Fragment } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'

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

function parseSection(pathname: string): NavSection | null {
  if (pathname.startsWith('/math')) return 'math'
  if (pathname.startsWith('/english')) return 'english'
  if (pathname.startsWith('/utilities')) return 'utilities'
  return null
}

function parseQuarter(segment: string | undefined): Quarter | null {
  if (!segment || !/^q[1-4]$/.test(segment)) return null
  return Number(segment.slice(1)) as Quarter
}

function parseGrade(value: string | undefined): Grade | null {
  if (!value) return null
  const n = Number(value)
  if (n === 2 || n === 3 || n === 4 || n === 5) return n
  return null
}

export function AppBreadcrumbs() {
  const location = useLocation()
  const params = useParams()
  const section = parseSection(location.pathname)
  if (!section) return null

  const grade = parseGrade(params.grade)
  const quarter = parseQuarter(params.quarter)
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

  const crumbs: { label: string; href?: string }[] = [
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
