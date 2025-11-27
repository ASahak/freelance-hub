'use client';

import { memo, useMemo } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { UserRole } from '@libs/types/user.type';

const roles = [
  { label: 'Client', value: UserRole.client },
  { label: 'Geek', value: UserRole.geek },
];
export const Role = memo(() => {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext();
  const roleValue = watch('role');

  const role = useMemo(
    () => roles.find((e) => e.value === roleValue)?.label || '',
    [roleValue],
  );

  return (
    <FormControl>
      <FormLabel htmlFor="role" fontSize="1.4rem">
        Role
      </FormLabel>
      <Controller
        name="role"
        control={control}
        render={({ field }) => (
          <Menu variant="base" closeOnSelect>
            <MenuButton as={Button} variant="input" w="full">
              <HStack justifyContent="space-between" alignItems="center">
                <Text isTruncated>{role}</Text>
                <ChevronDownIcon fontSize="1.6rem" />
              </HStack>
            </MenuButton>
            <MenuList w="20rem">
              {roles.map((role) => (
                <MenuItem
                  key={role.value}
                  fontSize="1.4rem"
                  fontWeight={500}
                  onClick={() => {
                    field.onChange(role.value);
                  }}
                  {...(roleValue === role.value && {
                    bgColor: 'blue.300 !important',
                    color: '#fff !important',
                  })}
                >
                  {role.label}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        )}
      />
      <ErrorMessage
        errors={errors}
        name="name"
        render={({ message }) => (
          <Text w="full" color="red.300" fontSize="1.3rem">
            {message}
          </Text>
        )}
      />
    </FormControl>
  );
});
