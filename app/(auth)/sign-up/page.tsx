import React from 'react';
import SignupForm from '../_components/sign-up-form';

export default function SignUpPage({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <div className="h-screen flex items-center justify-center">
      <SignupForm searchParams={searchParams} />
    </div>
  );
}
