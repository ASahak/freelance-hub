'use client'

import { useState } from 'react'
import { Box, Center } from '@chakra-ui/react'
import { Spinner } from '@/components/ui'
import NextImage, { ImageProps as NextImageProps } from 'next/image'

interface SmartImageProps extends Omit<NextImageProps, 'onLoad' | 'onError'> {
  fallbackSrc?: string
  borderRadius?: string | number
  containerProps?: React.ComponentProps<typeof Box>
}

export function SmartImage({
  fallbackSrc = '/imageFallback.jpg',
  borderRadius = '0px',
  containerProps,
  ...props
}: SmartImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const srcToRender = hasError && fallbackSrc ? fallbackSrc : props.src

  return (
    <Box
      position="relative"
      w="full"
      h="full"
      overflow="hidden"
      borderRadius={borderRadius}
      {...containerProps}
    >
      {isLoading && (
        <Center position="absolute" inset={0} zIndex={1}>
          <Spinner
            w="30px"
            h="30px"
            size="4px"
            color="var(--chakra-colors-blue-300)"
          />
        </Center>
      )}

      <NextImage
        {...props}
        key={String(srcToRender)}
        src={srcToRender}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          if (!hasError) {
            setHasError(true)
            setIsLoading(false)
          }
        }}
        style={{
          objectFit: 'cover',
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.3s ease-in-out',
          ...props.style
        }}
      />
    </Box>
  )
}
