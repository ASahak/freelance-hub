import { type ReactNode } from 'react';

import { Box } from '@chakra-ui/react';

export const Container = ({
  children,
  px = '1.6rem',
  ...rest
}: { children: ReactNode; px?: string } & Record<string, any>) => (
  <Box
    maxW={{
      base: `calc(1352px + ${px})`,
      '4xl': `max(calc(1352px + ${px}), 90vw)`,
    }}
    mx="auto"
    px={px}
    w="full"
    {...rest}
  >
    {children}
  </Box>
);
