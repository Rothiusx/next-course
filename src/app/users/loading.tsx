import { Loader2 } from 'lucide-react'

export default function UsersLoading() {
  return (
    <div className="flex justify-center items-center h-full text-background">
      <Loader2 className="size-8 animate-spin" />
    </div>
  )
}
