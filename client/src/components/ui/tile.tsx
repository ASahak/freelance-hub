import { Box } from '@chakra-ui/react';
import { IWithChildren } from '@/common/types/global';

export const Tile = ({ children, ...rest }: Readonly<IWithChildren<any>>) => (
  <Box
    p={6}
    rounded="md"
    border="1px solid"
    borderColor="gray.150"
    bgColor="gray.60"
    w="full"
    {...rest}
  >
    {children}
  </Box>
);
