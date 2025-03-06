import { Loader2 } from 'lucide-react'

export default function UsersLoading() {
  return (
    <div className="text-foreground flex items-center justify-center">
      <Loader2 className="size-16 animate-spin" />
    </div>
  )
}
