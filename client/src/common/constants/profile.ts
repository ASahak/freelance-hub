import { AvailabilityStatus } from '@libs/types/profile.type';

export const AvailableBadgeColor = {
  [AvailabilityStatus.available]: 'green.300',
  [AvailabilityStatus.open]: 'gray.200',
  [AvailabilityStatus.busy]: 'red.300',
};
