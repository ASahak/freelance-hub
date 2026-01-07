'use client';

import React, { memo } from 'react';
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
import { Spinner } from '@/components/ui';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Gender as GenderEnum } from '@libs/types/profile.type';

export const Gender = memo(({ isLoading }: { isLoading: boolean }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl w="full">
      <FormLabel htmlFor="gender" fontSize="1.4rem">
        Gender
      </FormLabel>
      <Controller
        name="gender"
        control={control}
        render={({ field }) => (
          <Menu variant="base" closeOnSelect={false}>
            {({ onClose }) => (
              <>
                <MenuButton as={Button} variant="input" w="full">
                  <HStack justifyContent="space-between" alignItems="center">
                    <Text isTruncated>
                      {field.value?.toUpperCase() || 'Select a gender...'}
                    </Text>
                    {isLoading ? (
                      <Spinner w="2rem" h="2rem" size="2px" color="blue.300" />
                    ) : (
                      <ChevronDownIcon fontSize="1.6rem" />
                    )}
                  </HStack>
                </MenuButton>

                <MenuList w="30rem">
                  {Object.values(GenderEnum).map((gender: string) => (
                    <MenuItem
                      key={gender}
                      fontSize="1.4rem"
                      fontWeight={500}
                      onClick={() => {
                        field.onChange(gender);
                        onClose();
                      }}
                      {...(gender === field.value && {
                        bgColor: 'blue.300 !important',
                        color: '#fff !important',
                      })}
                    >
                      {gender.toUpperCase()}
                    </MenuItem>
                  ))}
                </MenuList>
              </>
            )}
          </Menu>
        )}
      />
      <ErrorMessage
        errors={errors}
        name="gender"
        render={({ message }) => (
          <Text w="full" color="red.300" fontSize="1.3rem">
            {message}
          </Text>
        )}
      />
    </FormControl>
  );
});
