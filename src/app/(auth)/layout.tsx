import type { Metadata } from 'next'
import { IChildren } from '@/common/types/global'

export const metadata: Metadata = {
  title: 'FreelanceHub | SignIn',
  description: 'FreelanceHub' /* todo */
}

export default function AuthLayout({ children }: Readonly<IChildren>) {
  return children
}
