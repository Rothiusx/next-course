import { getSession } from '@/auth'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { redirect } from 'next/navigation'

export default async function AdminPage() {
  const session = await getSession()

  if (!session || session.user.role !== 'admin') {
    redirect('/')
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-6 text-3xl font-bold">Admin Dashboard</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>Manage user accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Total users: 0</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Roles</CardTitle>
            <CardDescription>Manage user roles</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Available roles: user, admin</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>System settings</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Configure application settings</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
