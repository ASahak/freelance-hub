import React from 'react';
import CreatableSelect from 'react-select/creatable';
import { Controller, useFormContext } from 'react-hook-form';
import { FormControl, FormLabel, VStack } from '@chakra-ui/react';
import TECH_SKILLS from '@/common/constants/skills';

const SKILL_OPTIONS = TECH_SKILLS.map((skill) => ({
  label: skill,
  value: skill,
}));

export const Skills = () => {
  const { control } = useFormContext();

  return (
    <VStack spacing={4}>
      <FormControl mt={4} w="full">
        <FormLabel htmlFor="skills" fontSize="1.4rem">Skills</FormLabel>
        <Controller
          name="skills"
          control={control}
          render={({ field: { onChange, value, ref } }) => (
            <CreatableSelect
              ref={ref}
              isMulti
              options={SKILL_OPTIONS}
              value={value?.map((s: string) => ({ label: s, value: s })) || []}
              onChange={(selectedOptions) => {
                const skillsAsStrings = selectedOptions.map((opt) => opt.value);
                onChange(skillsAsStrings);
              }}

              placeholder="Select skills or type to create..."
              closeMenuOnSelect={false}
              styles={{
                control: (base) => ({
                  ...base,
                  borderColor: '#E2E8F0', // Chakra gray.200
                  minHeight: '40px',
                  fontSize: '1.4rem',
                }),
                menu: (base) => ({
                  ...base,
                  zIndex: 9999, // Ensure it floats above everything
                }),
                multiValue: (base) => ({
                  ...base,
                  backgroundColor: '#BEE3F8', // Chakra blue.100
                }),
              }}
            />
          )}
        />
      </FormControl>
    </VStack>
  );
};