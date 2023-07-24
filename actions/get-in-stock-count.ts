import prismadb from '@/lib/prismadb'

export async function getInStockCount(storeId: string) {
  const inStockCount = await prismadb.product.count({
    where: {
      storeId: storeId,
      isArchived: false,
    },
  })

  return inStockCount
}
