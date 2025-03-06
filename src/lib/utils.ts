import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { toast } from 'sonner'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function actionToast(response: ActionResponse) {
  if (response.message) {
    if (response.success) {
      toast.success(response.message)
    } else {
      toast.error(response.message)
    }
  }
}
