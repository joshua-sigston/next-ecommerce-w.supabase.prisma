'use client';

import Link from 'next/link';

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from '@/components/ui/card';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { signup } from '../actions';
import { useFormState } from 'react-dom';
import { ZodErrors } from '../_components/zodErrors';
import { Button } from '@/components/ui/button';

const INITIAL_STATE = {
  data: null,
};

export default function SignupForm({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const [formState, formAction] = useFormState(signup, INITIAL_STATE);
  console.log(formState);
  return (
    <div>
      <form action={formAction}>
        {searchParams.message && (
          <div className="text-sm font-medium text-destructive">
            {searchParams.message}
          </div>
        )}
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold">Sign Up</CardTitle>
            <CardDescription>
              Enter your details to create a new account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
              />
              <ZodErrors error={formState?.zodErrors?.email} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="password"
              />
              <ZodErrors error={formState?.zodErrors?.password} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="confirmPassword"
              />
              <ZodErrors error={formState?.zodErrors?.confirmPassword} />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full">Sign Up</Button>
          </CardFooter>
        </Card>
        <div className="mt-4 text-center text-sm">
          Have an account?
          <Link className="underline ml-2" href="signin">
            Sing In
          </Link>
        </div>
      </form>
    </div>
  );
}
