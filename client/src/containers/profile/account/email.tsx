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
import { ErrorMessage } from '@hookform/error-message';
import { RxEnvelopeClosed } from 'react-icons/rx';

export const Email = memo(() => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl>
      <FormLabel htmlFor="email" fontSize="1.4rem">
        Email
      </FormLabel>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <InputGroup>
            <InputLeftElement pointerEvents="none" left={2} bottom={0} m="auto">
              <Icon as={RxEnvelopeClosed} color="gray.400" fontSize="2rem" />
            </InputLeftElement>
            <Input
              id="email"
              type="email"
              placeholder="youremail@gmail.com"
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
