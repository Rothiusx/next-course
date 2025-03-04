import { Loader2 } from 'lucide-react'

export default function UsersLoading() {
  return (
    <div className="text-background flex h-full items-center justify-center">
      <Loader2 className="size-8 animate-spin" />
    </div>
  )
}
