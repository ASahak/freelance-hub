'use client';

import { useCallback, useEffect, useState } from 'react';
import { Box, Center } from '@chakra-ui/react';
import { Spinner } from '@/components/ui';
import NextImage, { ImageProps as NextImageProps } from 'next/image';

interface SmartImageProps extends Omit<NextImageProps, 'onLoad' | 'onError'> {
  fallbackSrc?: string;
  spinnerSize?: number;
  borderRadius?: string | number;
  containerProps?: React.ComponentProps<typeof Box>;
  maxRetries?: number;
  retryDelay?: number;
  hasLoading?: boolean;
}

export function SmartImage({
  fallbackSrc = '/imageFallback.jpg',
  spinnerSize = 30,
  borderRadius = '0px',
  containerProps,
  hasLoading = true,
  src,
  maxRetries = 0,
  retryDelay = 5000,
  ...props
}: SmartImageProps) {
  const [isLoading, setIsLoading] = useState(hasLoading);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const baseSrc = hasError && fallbackSrc ? fallbackSrc : src;

  const srcToRender =
    retryCount > 0 &&
    typeof baseSrc === 'string' &&
    !baseSrc.startsWith('data:')
      ? `${baseSrc}${baseSrc.includes('?') ? '&' : '?'}retry=${retryCount}`
      : baseSrc;

  const imageKey = `${String(baseSrc)}-${retryCount}`;

  const handleOnError = useCallback(() => {
    if (retryCount < maxRetries) {
      console.log(
        `Image load failed. Retrying (${retryCount + 1}/${maxRetries})...`,
      );

      setTimeout(() => {
        setRetryCount((prev) => prev + 1);
        setIsLoading(true);
      }, retryDelay);
    } else {
      if (!hasError) {
        setHasError(true);
        if (fallbackSrc) setIsLoading(false);
      }
    }
  }, [retryCount, maxRetries, retryDelay, hasError, fallbackSrc]);

  useEffect(() => {
    setHasError(false);
    setIsLoading(hasLoading);
    setRetryCount(0);
  }, [src, hasLoading]);

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
            w={`${spinnerSize}px`}
            h={`${spinnerSize}px`}
            size={`${spinnerSize / 10}px`}
            color="var(--chakra-colors-blue-300)"
          />
        </Center>
      )}

      <NextImage
        {...props}
        key={imageKey}
        src={srcToRender || fallbackSrc}
        onLoad={() => setIsLoading(false)}
        onError={handleOnError}
        style={{
          objectFit: 'cover',
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.3s ease-in-out',
          ...props.style,
        }}
      />
    </Box>
  );
}
