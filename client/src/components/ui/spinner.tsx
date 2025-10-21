'use client';

import { Box } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';

const spin = keyframes({
  from: {
    transform: 'rotate(0deg)',
  },
  to: {
    transform: 'rotate(360deg)',
  },
});

export const Spinner = ({
  w,
  h,
  size,
  color,
  ...rest
}: {
  size: string | number;
  w: string | number;
  h: string | number;
  color: string;
} & Record<string, any>) => {
  return (
    <Box
      w={w}
      h={h}
      display="flex"
      justifyContent="center"
      alignItems="center"
      rounded="full"
      animation={`${spin} .7s linear infinite`}
      {...rest}
      _before={{
        content: '""',
        width: '100%',
        height: '100%',
        borderRadius: '100%',
        backgroundImage: `conic-gradient(transparent 72deg, ${color} 360deg)`,
        mask: `radial-gradient(farthest-side, transparent calc(100% - ${size}), ${color} 0)`,
      }}
    />
  );
};
