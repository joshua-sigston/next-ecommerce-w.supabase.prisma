import React, { Suspense } from 'react';
import SignInForm from '../_components/sign-in-form';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import SkeletonCard from '../_components/SkeletonCard';

export default async function SingInPage({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // console.log(user);
  if (user) {
    return redirect('/');
  }
  return (
    <div className="flex items-center justify-center h-screen">
      <SignInForm searchParams={searchParams} />
    </div>
  );
}
