'use client'

import { ImagePlusIcon, TrashIcon } from 'lucide-react'
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import React from 'react'

import { Button } from '@/components/ui/button'

interface ImageUploadProps {
  disabled?: boolean
  value: string[]
  onChange: (value: string) => void
  onRemove: (value: string) => void
}

export default function ImageUpload({
  disabled,
  value,
  onChange,
  onRemove,
}: ImageUploadProps) {
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  const onUpload = (result: any) => {
    onChange(result.info.secure_url)
  }

  // this is to ensure there's no hydration mismatch error
  if (!isMounted) return

  return (
    <div>
      <div className="flex mb-4 items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="absolute top-2 right-2 z-10">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                size="icon"
                variant="destructive"
              >
                <TrashIcon className="h-4 w-4" />
              </Button>
            </div>

            <Image src={url} className="object-cover" alt="Image" fill />
          </div>
        ))}
      </div>

      <CldUploadWidget onUpload={onUpload} uploadPreset="gae1joaz">
        {({ open }) => {
          const onClick = () => {
            open()
          }

          return (
            <Button
              type="button"
              variant="secondary"
              disabled={disabled}
              onClick={onClick}
            >
              <ImagePlusIcon className="h-4 w-4 mr-2" />
              Upload an image
            </Button>
          )
        }}
      </CldUploadWidget>
    </div>
  )
}
