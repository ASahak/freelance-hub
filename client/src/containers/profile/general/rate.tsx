'use client';

import { memo } from 'react';
import { FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useNumberFormat } from '@react-input/number-format';

export const Rate = memo(() => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const inputRef = useNumberFormat({
    locales: 'en',
    maximumFractionDigits: 18,
    groupDisplay: false,
  });

  return (
    <FormControl w="full">
      <FormLabel htmlFor="hourlyRate" fontSize="1.4rem">
        Hourly Rate ($)
      </FormLabel>
      <Controller
        name="hourlyRate"
        control={control}
        render={({ field }) => (
          <Input
            id="hourlyRate"
            placeholder="40.00"
            variant="base"
            {...field}
            ref={inputRef}
          />
        )}
      />
      <ErrorMessage
        errors={errors}
        name="hourlyRate"
        render={({ message }) => (
          <Text w="full" color="red.300" fontSize="1.3rem">
            {message}
          </Text>
        )}
      />
    </FormControl>
  );
});
