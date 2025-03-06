'use client'

import { cn } from '@/lib/utils'
import { Home } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function NavLinks({
  links,
}: {
  links: { href: string; label: string; icon: React.ReactNode }[]
}) {
  const pathname = usePathname()

  return (
    <ul className="flex items-center space-x-4 lg:space-x-6">
      <li>
        <Link href="/" className="mr-6 flex items-center">
          <Home className="size-8" />
        </Link>
      </li>
      {links.map(({ href, label, icon }) => (
        <li key={href}>
          <Link
            href={href}
            className={cn(
              'hover:text-primary flex items-center gap-2 text-lg font-medium transition-colors',
              pathname.startsWith(href)
                ? 'text-foreground'
                : 'text-muted-foreground',
            )}
          >
            {icon}
            {label}
          </Link>
        </li>
      ))}
    </ul>
  )
}
