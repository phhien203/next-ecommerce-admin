'use client'

import axios from 'axios'
import { CopyIcon, EditIcon, MoreHorizontalIcon, TrashIcon } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useToast } from '@/components/ui/use-toast'

import AlertModal from '@/components/modals/alert-modal'
import { CategoryColumn } from './columns'

export default function CellAction({ data }: { data: CategoryColumn }) {
  const { toast } = useToast()
  const router = useRouter()
  const params = useParams()

  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id)
    toast({
      description: 'Billboard ID copied to the clipboard.',
    })
  }

  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/${params.storeId}/billboards/${data.id}`)
      router.refresh()
      toast({
        description: 'Billboard deleted.',
      })
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
        loading={loading}
        onClose={() => setOpen(false)}
        onConfirm={() => onDelete()}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-8 h-8 p-0">
            <span className="sr-only">Open Menu</span>
            <MoreHorizontalIcon className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => onCopy(data.id)}
          >
            <CopyIcon className="mr-2 w-4 h-4" />
            Copy ID
          </DropdownMenuItem>

          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() =>
              router.push(`/${params.storeId}/billboards/${data.id}`)
            }
          >
            <EditIcon className="mr-2 w-4 h-4" />
            Update
          </DropdownMenuItem>

          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <TrashIcon className="mr-2 w-4 h-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
