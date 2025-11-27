'use client';

import { memo } from 'react';
import {
  FormControl,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';
import { RxAvatar } from 'react-icons/rx';
import { ErrorMessage } from '@hookform/error-message';

export const FullName = memo(() => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl>
      <FormLabel htmlFor="name" fontSize="1.4rem">
        FullName
      </FormLabel>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <InputGroup>
            <InputLeftElement pointerEvents="none" left={2} bottom={0} m="auto">
              <Icon as={RxAvatar} color="gray.400" fontSize="2rem" />
            </InputLeftElement>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              variant="base"
              pl={14}
              {...field}
            />
          </InputGroup>
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
