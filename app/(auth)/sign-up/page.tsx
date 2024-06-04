import React from 'react';
import SignupForm from '../_components/sign-up-form';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function SignUpPage({
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
    <div className="h-screen flex items-center justify-center">
      <SignupForm searchParams={searchParams} />
    </div>
  );
}
