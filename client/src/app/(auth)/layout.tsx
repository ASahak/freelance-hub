import type { Metadata } from 'next';
import { IChildren } from '@/common/types/global';
import NudeLayout from '@/components/layout/nude';

export const metadata: Metadata = {
  title: 'FreelanceHub | SignIn',
  description: 'FreelanceHub' /* todo */,
};

export default function AuthLayout({ children }: Readonly<IChildren>) {
  return <NudeLayout>{children}</NudeLayout>;
}
