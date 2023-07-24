import { getGraphRevenue } from '@/actions/get-graph-revenue'
import { getInStockCount } from '@/actions/get-in-stock-count'
import { getSalesCount } from '@/actions/get-sales-count'
import { getTotalRevenue } from '@/actions/get-total-revenue'
import Overview from '@/components/overview'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { formatter } from '@/lib/utils'
import { CreditCardIcon, DollarSignIcon, PackageIcon } from 'lucide-react'

export default async function DashboardPage({
  params,
}: {
  params: { storeId: string }
}) {
  const totalRevenue = await getTotalRevenue(params.storeId)
  const salesCount = await getSalesCount(params.storeId)
  const inStockCount = await getInStockCount(params.storeId)
  const graphData = await getGraphRevenue(params.storeId)

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard" description="Overview of your store" />

        <Separator />

        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>

              <DollarSignIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold">
                {formatter.format(totalRevenue)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>

              <CreditCardIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold">+{salesCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Products In Stock
              </CardTitle>

              <PackageIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold">{inStockCount}</div>
            </CardContent>
          </Card>
        </div>

        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>

            <CardContent className="pl-2">
              <Overview data={graphData} />
            </CardContent>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}
