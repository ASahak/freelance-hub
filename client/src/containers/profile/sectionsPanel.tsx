'use client';

import { memo } from 'react';
import { VStack, Text, Flex, Icon } from '@chakra-ui/react';
import Link from 'next/link';
import { FiShield, FiSettings, FiUser } from 'react-icons/fi';
import { usePathname } from 'next/navigation';

const sections = [
  { label: 'Public Profile', path: '/profile', icon: FiUser },
  { label: 'Account', path: '/profile/account', icon: FiSettings },
  { label: 'Security', path: '/profile/security', icon: FiShield },
];
export const SectionsPanel = memo(() => {
  const pathname = usePathname();

  return (
    <VStack spacing={3} alignItems="start" w="full">
      {sections.map((section) => {
        const isActive = pathname === section.path;

        return (
          <Link
            key={section.path}
            href={section.path}
            style={{ width: '100%' }}
          >
            <Flex
              gap={4}
              alignItems="center"
              p={3}
              rounded="md"
              transition="all 0.2s"
              bg={isActive ? 'gray.100' : 'transparent'}
            >
              <Icon as={section.icon} fontSize="1.8rem" />
              <Text fontSize="1.5rem" fontWeight={isActive ? 600 : 500}>
                {section.label}
              </Text>
            </Flex>
          </Link>
        );
      })}
    </VStack>
  );
});
