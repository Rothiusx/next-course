import { getSession } from '@/auth'
import { redirect } from 'next/navigation'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()

  if (session?.user.role !== 'admin') {
    redirect('/')
  }

  console.warn('Accessing admin layout')

  return <>{children}</>
}
