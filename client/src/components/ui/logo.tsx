import { memo } from 'react';
import { Text, Flex } from '@chakra-ui/react';
import Link from 'next/link';
import { ROUTES } from '@/common/constants/routes';

type IProps = {
  isSmall?: boolean;
  color?: string;
};
export const Logo = memo(({ isSmall, color = 'blue.300' }: IProps) => {
  const logo = (
    <Flex
      w="4rem"
      h="4rem"
      rounded=".8rem"
      bgColor="blue.300"
      alignItems="center"
      justifyContent="center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        <rect width="20" height="14" x="2" y="6" rx="2"></rect>
      </svg>
    </Flex>
  );
  return (
    <Link href={ROUTES.HOME}>
      <Flex alignItems="center" gap={3}>
        {logo}
        <Text
          fontSize="2rem"
          fontWeight="700"
          color={color}
          display={isSmall ? 'none' : { base: 'none', md: 'block' }}
        >
          FreelanceHub
        </Text>
      </Flex>
    </Link>
  );
});
