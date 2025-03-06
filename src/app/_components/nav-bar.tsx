import { getSession } from '@/auth'
import { ShieldUser, UserPen } from 'lucide-react'
import { ModeToggle } from './mode-toggle'
import { NavLinks } from './nav-links'
import { UserMenu } from './user-menu'

export async function NavBar() {
  const session = await getSession()

  const links = session
    ? [
        {
          href: '/users',
          label: 'Users',
          icon: <UserPen className="size-4" />,
        },
        ...(session.user.role === 'admin'
          ? [
              {
                href: '/admin',
                label: 'Admin',
                icon: <ShieldUser className="size-4" />,
              },
            ]
          : []),
      ]
    : []

  return (
    <nav className="bg-secondary bo text-secondary-foreground flex h-12 items-center border-b px-4 md:px-6">
      <NavLinks links={links} />
      <div className="ml-auto flex items-center space-x-4">
        <ModeToggle />
        <UserMenu />
      </div>
    </nav>
  )
}
