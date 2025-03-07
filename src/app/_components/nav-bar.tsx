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
          icon: <UserPen className="size-6" />,
        },
        ...(session.user.role === 'admin'
          ? [
              {
                href: '/admin',
                label: 'Admin',
                icon: <ShieldUser className="size-6" />,
              },
            ]
          : []),
      ]
    : []

  return (
    <nav className="bg-secondary text-secondary-foreground m-1 flex h-12 items-center rounded-sm border-b px-4 shadow-lg md:px-6">
      <NavLinks links={links} />
      <div className="ml-auto flex items-center space-x-4">
        <ModeToggle />
        <UserMenu user={session?.user} />
      </div>
    </nav>
  )
}
