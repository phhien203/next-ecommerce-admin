import prismadb from '@/lib/prismadb'
import { format } from 'date-fns'

import SizeClient from './components/client'
import { SizeColumn } from './components/columns'

export default async function SizesPage({
  params,
}: {
  params: { storeId: string }
}) {
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  const formattedSizes: SizeColumn[] = sizes.map((item) => ({
    id: item.id,
    createdAt: format(item.createdAt, 'yyyy Mo, dd'),
    name: item.name,
    value: item.value,
  }))

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeClient data={formattedSizes} />
      </div>
    </div>
  )
}
