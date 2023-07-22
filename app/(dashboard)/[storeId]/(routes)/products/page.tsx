import prismadb from '@/lib/prismadb'
import { format } from 'date-fns'

import { formatter } from '@/lib/utils'
import ProductClient from './components/client'
import { ProductColumn } from './components/columns'

export default async function ProductsPage({
  params,
}: {
  params: { storeId: string }
}) {
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      color: true,
      size: true,
      category: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    price: formatter.format(item.price.toNumber()),
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    category: item.category.name,
    size: item.size.name,
    color: item.color.value,
    createdAt: format(item.createdAt, 'yyyy Mo, dd'),
  }))

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  )
}
