import { memo } from 'react';
import {
  Avatar,
  Button,
  Divider,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Icon,
  Flex,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { RxExit, RxPerson } from 'react-icons/rx';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/common/constants/routes';
import { User as IUser } from '@libs/types/user.type';
import { useAuth } from '@/providers/authProvider';
import { Spinner } from '@/components/ui';

type IProps = {
  data: IUser;
};
export const User = memo(({ data }: IProps) => {
  const router = useRouter();
  const { logout, isLoggingOut } = useAuth();

  return (
    <Menu variant="base" closeOnSelect={false}>
      <MenuButton
        as={Button}
        rounded={'full'}
        variant={'link'}
        cursor={'pointer'}
        _hover={{ borderColor: 'gray.200' }}
        h="4rem"
        px={4}
        minW={0}
        textDecoration="none !important"
        maxW="20rem"
      >
        <HStack>
          <Avatar size={'md'} src={data.avatarUrl || ''} />
          <Text isTruncated>{data.name}</Text>
          <ChevronDownIcon fontSize="1.6rem" />
        </HStack>
      </MenuButton>
      <MenuList w="20rem">
        <MenuItem
          fontSize="1.4rem"
          fontWeight={500}
          onClick={() => router.push(ROUTES.PROFILE)}
          gap={3}
        >
          <Icon as={RxPerson} fontSize="1.8rem" />
          Profile
        </MenuItem>
        <Divider />
        <MenuItem
          fontSize="1.4rem"
          fontWeight={500}
          onClick={logout}
          isDisabled={isLoggingOut}
        >
          <HStack spacing={2} justifyContent="space-between" w="full">
            <Flex gap={3} align="center">
              <Icon as={RxExit} fontSize="1.8rem" />
              Logout
            </Flex>
            {isLoggingOut ? (
              <Spinner
                w="20px"
                h="20px"
                size="2px"
                color="var(--chakra-colors-blue-300)"
              />
            ) : null}
          </HStack>
        </MenuItem>
      </MenuList>
    </Menu>
  );
});
