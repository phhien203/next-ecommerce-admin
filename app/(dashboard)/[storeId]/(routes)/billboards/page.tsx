import BillboardClient from './components/client'

export default async function BillboardsPage({
  params,
}: {
  params: { storeId: string }
}) {
  // const res = await axios.get(`/api/${params.storeId}/billboards`)
  // const billboards = res.data

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient />
        {/* {billboards.map((billboard) => (
          <div>{billboard.label}</div>
        ))} */}
      </div>
    </div>
  )
}
