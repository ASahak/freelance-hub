import React, { useState, useMemo, memo, useRef } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Menu,
  MenuButton,
  MenuList,
  Text,
  HStack,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Controller, useFormContext } from 'react-hook-form';
import { countries } from 'countries-list';
import { useDebounce } from 'react-use';
import { Spinner } from '@/components/ui';

const CountryItem = memo(
  ({
    country,
    isSelected,
    onClick,
  }: {
    country: string;
    isSelected: boolean;
    onClick: () => void;
  }) => {
    return (
      <Box
        as="button"
        w="full"
        textAlign="left"
        px="1rem"
        py={3}
        fontSize="1.4rem"
        fontWeight={500}
        transition="background 0.2s"
        _hover={{ bg: 'gray.100' }}
        bg={isSelected ? 'blue.300' : 'transparent'}
        color={isSelected ? 'white' : 'inherit'}
        onMouseDown={(e: any) => e.preventDefault()}
        onClick={onClick}
      >
        {country}
      </Box>
    );
  },
);

export const Location = memo(({ isLoading }: { isLoading: boolean }) => {
  const { control, watch } = useFormContext();
  const inputRef = useRef(null);

  // State for the local search filter inside the Menu
  const [countrySearch, setCountrySearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useDebounce(
    () => {
      setDebouncedSearch(countrySearch);
    },
    300,
    [countrySearch],
  );

  // Watch country to display it on the MenuButton
  const selectedCountry = watch('country');

  const filteredCountries = useMemo(() => {
    if (!debouncedSearch) return Object.values(countries);

    return Object.values(countries).filter((c) =>
      c.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
    );
  }, [debouncedSearch]);

  return (
    <>
      <FormControl>
        <FormLabel htmlFor="country" fontSize="1.4rem">
          Country
        </FormLabel>
        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <Menu
              variant="base"
              closeOnSelect={false}
              initialFocusRef={inputRef}
              onClose={() => setCountrySearch('')}
            >
              {({ onClose }) => (
                <>
                  <MenuButton
                    as={Button}
                    variant="input"
                    w="full"
                    isDisabled={isLoading}
                  >
                    <HStack justifyContent="space-between" alignItems="center">
                      <Text isTruncated>
                        {field.value || 'Select a country...'}
                      </Text>
                      {isLoading ? (
                        <Spinner
                          w="2rem"
                          h="2rem"
                          size="2px"
                          color="blue.300"
                        />
                      ) : (
                        <ChevronDownIcon fontSize="1.6rem" />
                      )}
                    </HStack>
                  </MenuButton>

                  <MenuList w="30rem" p={0} overflow="hidden">
                    <Box
                      p="1rem"
                      borderBottom="1px solid"
                      borderColor="gray.100"
                    >
                      <Input
                        ref={inputRef}
                        variant="base"
                        size="sm"
                        placeholder="Search country..."
                        value={countrySearch}
                        onChange={(e) => setCountrySearch(e.target.value)}
                        // Stop click propagation
                        onClick={(e) => e.stopPropagation()}
                      />
                    </Box>

                    <Box maxH="25rem" overflowY="auto" overflowX="hidden">
                      {filteredCountries.map((country) => (
                        <CountryItem
                          key={country.name}
                          country={country.name}
                          isSelected={selectedCountry === country.name}
                          onClick={() => {
                            field.onChange(country.name);
                            onClose();
                            setCountrySearch('');
                          }}
                        />
                      ))}

                      {filteredCountries.length === 0 && (
                        <Box
                          p={4}
                          color="gray.500"
                          fontSize="sm"
                          textAlign="center"
                        >
                          No country found
                        </Box>
                      )}
                    </Box>
                  </MenuList>
                </>
              )}
            </Menu>
          )}
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="city" fontSize="1.4rem">
          City
        </FormLabel>
        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <Input variant="base" placeholder="Yerevan" {...field} />
          )}
        />
      </FormControl>
    </>
  );
});
