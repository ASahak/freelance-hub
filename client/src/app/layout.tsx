import { cookies } from 'next/headers';
import { ChakraProvider, RootProvider } from '@/providers';
import { IChildren } from '@/common/types/global';
import { User as IUser } from '@libs/types/user.type';

async function getInitialUser(): Promise<IUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;

  if (!token) {
    return null;
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      headers: {
        Cookie: `access_token=${token}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.error('Failed to fetch initial user on server:', error);
    return null;
  }
}

export default async function RootLayout({ children }: Readonly<IChildren>) {
  const cookieStore = await cookies();
  const initialUser = await getInitialUser();
  console.log(initialUser, 'initialUser');
  return (
    <html lang="en">
      <body>
        <ChakraProvider cookieStore={cookieStore.toString()}>
          <RootProvider initialUser={initialUser}>{children}</RootProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
