import type { Metadata } from 'next';
import { IWithChildren } from '@/common/types/global';
import NudeLayout from '@/components/layout/nude';

export const metadata: Metadata = {
  title: 'FreelanceHub | SignIn',
  description: 'FreelanceHub' /* todo */,
};

export default function AuthLayout({
  children,
}: Readonly<IWithChildren<never>>) {
  return <NudeLayout>{children}</NudeLayout>;
}
