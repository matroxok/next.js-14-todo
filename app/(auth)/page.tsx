import { type Metadata } from 'next';
import Link from 'next/link';

import { Button } from '~/components/ui/button';

import { PAGES } from '~/lib/constants';

import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Root page 🌳'
};

export default function RootPage() {
  return (
    <div className='grid h-screen place-items-center'>
      <div className='border-c flex flex-col items-center gap-3 text-center'>
        <Image src='/logo_matrox.dev.svg' alt='' width={200} height={100} />
        <p className='text-sm'>To use the app you need to sign in</p>
        <Button asChild>
          <Link href={PAGES.SIGN_IN}>Go to the sign in page</Link>
        </Button>
      </div>
    </div>
  );
}
