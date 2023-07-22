'use client'

import { PlusIcon } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

import ApiList from '@/components/ui/api-list'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'

import { ProductColumn, columns } from './columns'

export default function ProductClient({ data }: { data: ProductColumn[] }) {
  const router = useRouter()
  const params = useParams()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Products (${data.length})`}
          description="Manage products for your store"
        />
        <Button
          onClick={() => {
            router.push(`/${params.storeId}/products/new`)
          }}
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />

      <DataTable filterKey="name" columns={columns} data={data} />

      <Heading title="API" description="API calls for Products" />

      <Separator />

      <ApiList entityName="products" entityIdName="productId" />
    </>
  )
}
