import prismadb from '@/lib/prismadb'
import { format } from 'date-fns'

import BillboardClient from './components/client'
import { BillboardColumn } from './components/columns'

export default async function BillboardsPage({
  params,
}: {
  params: { storeId: string }
}) {
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    createdAt: format(item.createdAt, 'yyyy Mo, dd'),
    label: item.label,
  }))

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  )
}
