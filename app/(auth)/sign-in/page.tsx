import { type Metadata } from 'next';
import Link from 'next/link';

import { SignInForm } from '~/components/sign-in-form';

import { PAGES } from '~/lib/constants';

import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Auth / Sign in',
  description: 'Sign in to your account'
};

export default function SignInPage() {
  return (
    <div className='grid h-screen place-items-center'>
      <div className='flex w-full max-w-[400px] flex-col gap-12 px-4 sm:px-0'>
        <div className='flex flex-col items-center justify-center space-y-3 text-center'>
          <Image src='/logo_matrox.dev.svg' alt='' width={200} height={100} />
          <p className='text-sm'>
            Enter your credentials to sign in to your account
          </p>
        </div>
        <SignInForm />
        <div className='flex justify-center gap-3 text-sm'>
          <span>Don&apos;t have an account?</span>
          <Link href={PAGES.SIGN_UP} className='text-neutral-500 underline'>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
