import { memo } from 'react'
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
  Icon
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { RxExit, RxPerson } from 'react-icons/rx'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/common/constants/routes'

export const User = memo(() => {
  const router = useRouter()

  return (
    <Menu variant="base">
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
      >
        <HStack>
          <Avatar size={'md'} />
          <Text>John Doe</Text>
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
        <MenuItem fontSize="1.4rem" fontWeight={500} gap={3}>
          <Icon as={RxExit} fontSize="1.8rem" />
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  )
})
