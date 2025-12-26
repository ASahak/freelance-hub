import React from 'react';
import CreatableSelect from 'react-select/creatable';
import { Controller, useFormContext } from 'react-hook-form';
import { Box, FormControl, FormLabel } from '@chakra-ui/react';
import TECH_SKILLS from '@/common/constants/skills';
import { OptionProps } from 'react-select';

type IValue = {
  label: string;
  value: string;
};
const SKILL_OPTIONS = TECH_SKILLS.map((skill) => ({
  label: skill,
  value: skill,
}));

const CustomOption = ({
  innerProps,
  isDisabled,
  isSelected,
  isFocused,
  label,
}: OptionProps) =>
  !isDisabled ? (
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
      bg={isSelected ? 'blue.300' : isFocused ? 'gray.100' : 'transparent'}
      color={isSelected ? 'white' : 'inherit'}
      onMouseDown={(e: any) => e.preventDefault()}
      onClick={innerProps.onClick}
    >
      {label}
    </Box>
  ) : null;

export const Skills = () => {
  const { control } = useFormContext();

  return (
    <FormControl mt={4} w="full">
      <FormLabel htmlFor="skills" fontSize="1.4rem">
        Skills
      </FormLabel>
      <Controller
        name="skills"
        control={control}
        render={({ field: { onChange, value, ref } }) => (
          <CreatableSelect
            ref={ref}
            components={{ Option: CustomOption }}
            isMulti
            options={SKILL_OPTIONS}
            value={value?.map((s: string) => ({ label: s, value: s })) || []}
            onChange={(selectedOptions) => {
              const skillsAsStrings: string[] = selectedOptions.map(
                (opt) => (opt as IValue).value,
              );
              onChange(skillsAsStrings);
            }}
            placeholder="Select skills or type to create..."
            closeMenuOnSelect={false}
            styles={{
              control: (base, state) => ({
                ...base,
                borderRadius: '0.8rem',
                borderWidth: '1px',
                borderColor: state.isFocused
                  ? 'var(--chakra-colors-blue-300)'
                  : 'var(--chakra-colors-gray-150)',
                boxShadow: 'none',
                minHeight: '4rem',
                fontSize: '1.4rem',
                width: '100%',
              }),
              menu: (base) => ({
                ...base,
                width: '100%',
                zIndex: 9999, // Ensure it floats above everything
              }),
              multiValue: (base) => ({
                ...base,
                backgroundColor: 'var(--chakra-colors-blue-200)',
              }),
            }}
          />
        )}
      />
    </FormControl>
  );
};
