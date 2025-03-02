import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CreateUserForm } from '../_components/create-user-form'

export default function CreateUserPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New User</CardTitle>
      </CardHeader>
      <CardContent className="w-[400px]">
        <CreateUserForm />
      </CardContent>
    </Card>
  )
}
