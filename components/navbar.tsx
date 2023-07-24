import { UserButton, auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import ThemeToggle from '@/components/theme-toggle'
import prismadb from '@/lib/prismadb'
import MainNav from './main-nav'
import StoreSwitcher from './store-switcher'

export default async function Navbar() {
  const { userId } = auth()

  if (!userId) {
    redirect('/sign-in')
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  })

  return (
    <div className="border-b">
      <div className="flex items-center h-16 px-4">
        <StoreSwitcher items={stores} />
        <MainNav className="mx-4" />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  )
}
