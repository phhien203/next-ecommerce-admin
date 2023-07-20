'use client'

import { StoreModal } from '@/components/modals/store-modal'
import React from 'react'

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  // this is to ensure there's no hydration mismatch error
  if (!isMounted) {
    return null
  }

  return (
    <>
      <StoreModal />
    </>
  )
}
