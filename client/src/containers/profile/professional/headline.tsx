'use client';

import { memo } from 'react';
import { FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

export const Headline = memo(() => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl w="full">
      <FormLabel htmlFor="headline" fontSize="1.4rem">
        Headline
      </FormLabel>
      <Controller
        name="headline"
        control={control}
        render={({ field }) => (
          <Input
            id="headline"
            type="text"
            placeholder="Senior Software Engineer eg."
            variant="base"
            {...field}
          />
        )}
      />
      <ErrorMessage
        errors={errors}
        name="headline"
        render={({ message }) => (
          <Text w="full" color="red.300" fontSize="1.3rem">
            {message}
          </Text>
        )}
      />
    </FormControl>
  );
});
