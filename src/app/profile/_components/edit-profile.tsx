'use client'

import type { Session } from '@/auth'
import type { StatusMessageProps } from '@/components/ui/status-message'
import type { UserProfile } from '@/schemas/profile'
import { updateProfile } from '@/actions/profile'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { StatusMessage } from '@/components/ui/status-message'
import { userProfileSchema } from '@/schemas/profile'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export function EditProfile({ user }: { user: Session['user'] }) {
  const [message, setMessage] = useState<StatusMessageProps>({
    message: '',
  })

  const form = useForm<UserProfile>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      age: user.age,
      city: user.city,
    },
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (data) => {
          const response = await updateProfile(data)
          if (response?.success) {
            form.reset(data)
            toast.success(response.message)
            setMessage({
              message: response.message,
              variant: 'success',
            })
          } else {
            toast.error(response?.message)
            setMessage({
              message: response?.message,
              variant: 'error',
            })
          }
        })}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormDescription>
                Your name as it will appear on the website
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  inputMode="numeric"
                  placeholder="18"
                  {...field}
                  value={field.value ?? ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input
                  placeholder="Třinec"
                  {...field}
                  value={field.value ?? ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john.doe@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <StatusMessage {...message} />
        <Button
          className="float-right min-w-32"
          type="submit"
          disabled={!form.formState.isDirty}
        >
          Save
        </Button>
      </form>
    </Form>
  )
}
