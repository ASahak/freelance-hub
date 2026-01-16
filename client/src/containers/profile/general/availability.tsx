'use client';

import React, { memo } from 'react';
import {
  Badge,
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
import { AvailabilityStatus } from '@libs/types/profile.type';
import { capitalize } from '@/utils/helpers/global';
import { AvailableBadgeColor } from '@/common/constants/profile';

export const Availability = memo(({ isLoading }: { isLoading: boolean }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl w="full">
      <FormLabel htmlFor="availabilityStatus" fontSize="1.4rem">
        Availability Status
      </FormLabel>
      <Controller
        name="availabilityStatus"
        control={control}
        render={({ field }) => (
          <Menu variant="base" closeOnSelect={false}>
            {({ onClose }) => (
              <>
                <MenuButton as={Button} variant="input" w="full">
                  <HStack justifyContent="space-between" alignItems="center">
                    <Text isTruncated>
                      {capitalize(field.value || 'Select a status...')}
                    </Text>
                    {isLoading ? (
                      <Spinner w="2rem" h="2rem" size="2px" color="blue.300" />
                    ) : (
                      <ChevronDownIcon fontSize="1.6rem" />
                    )}
                  </HStack>
                </MenuButton>

                <MenuList w="30rem">
                  {Object.values(AvailabilityStatus).map(
                    (status: AvailabilityStatus) => (
                      <MenuItem
                        key={status}
                        fontSize="1.4rem"
                        fontWeight={500}
                        onClick={() => {
                          field.onChange(status);
                          onClose();
                        }}
                        {...(status === field.value && {
                          bgColor: 'blue.300 !important',
                          color: '#fff !important',
                        })}
                      >
                        <Badge
                          w="2rem"
                          h="2rem"
                          rounded="full"
                          bgColor={AvailableBadgeColor[status]}
                          marginInlineEnd={4}
                        />
                        {capitalize(status)}
                      </MenuItem>
                    ),
                  )}
                </MenuList>
              </>
            )}
          </Menu>
        )}
      />
      <ErrorMessage
        errors={errors}
        name="availabilityStatus"
        render={({ message }) => (
          <Text w="full" color="red.300" fontSize="1.3rem">
            {message}
          </Text>
        )}
      />
    </FormControl>
  );
});
