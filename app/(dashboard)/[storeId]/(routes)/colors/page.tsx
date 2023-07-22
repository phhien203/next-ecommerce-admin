import prismadb from '@/lib/prismadb'
import { format } from 'date-fns'

import ColorClient from './components/client'
import { ColorColumn } from './components/columns'

export default async function ColorsPage({
  params,
}: {
  params: { storeId: string }
}) {
  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  const formattedColors: ColorColumn[] = colors.map((item) => ({
    id: item.id,
    createdAt: format(item.createdAt, 'yyyy Mo, dd'),
    name: item.name,
    value: item.value,
  }))

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorClient data={formattedColors} />
      </div>
    </div>
  )
}
