'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Billboard } from '@prisma/client'
import axios from 'axios'
import { TrashIcon } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import AlertModal from '@/components/modals/alert-modal'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import Heading from '@/components/ui/heading'
import ImageUpload from '@/components/ui/image-upload'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/components/ui/use-toast'

const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
})

type BillboardFormValues = z.infer<typeof formSchema>

interface BillboardFormProps {
  initialData: Billboard | null
}

export default function BillboardForm({ initialData }: BillboardFormProps) {
  const params = useParams()
  const router = useRouter()

  const title = initialData ? 'Edit Billboard' : 'Create Billboard'
  const description = initialData
    ? 'Edit a billboard'
    : 'Create a new billboard'
  const toastMessage = initialData ? 'Billboard updated.' : 'Billboard created.'
  const action = initialData ? 'Save changes' : 'Create'

  const { toast } = useToast()
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: '',
      imageUrl: '',
    },
  })

  const onSubmit = async (data: BillboardFormValues) => {
    try {
      setLoading(true)

      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/billboards/${params.billboardId}`,
          data,
        )
      } else {
        await axios.post(`/api/${params.storeId}/billboards`, data)
      }
      router.refresh()
      router.push(`/${params.storeId}/billboards`)
      toast({
        description: toastMessage,
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'Something went wrong',
      })
    } finally {
      setLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(
        `/api/${params.storeId}/billboards/${params.billboardId}`,
      )
      router.refresh()
      router.push(`/${params.storeId}/billboards`)
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Cannot remove store',
        description:
          'Make sure you removed all categories using this billboard first.',
      })
    } finally {
      setOpen(false)
      setLoading(false)
    }
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />

        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="icon"
            onClick={() => {
              setOpen(true)
            }}
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        )}
      </div>

      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange('')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Billboard label"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" disabled={loading}>
            {action}
          </Button>
        </form>
      </Form>

      <Separator />
    </>
  )
}
