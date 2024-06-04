"use server"

import prisma from '@/lib/db';
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation';

import { z } from 'zod';
const schemaRegister = z
  .object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 8 characters long'),
    confirmPassword: z.string(),
    // street: z.string().nonempty('Street is required'),
    // city: z.string().nonempty('City is required'),
    // state: z.string().nonempty('State is required'),
    // postalCode: z
    //   .string()
    //   .nonempty('Postal code is required')
    //   .regex(/^\d{5}(-\d{4})?$/, 'Invalid postal code'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });



export async function signup(prevState: any, formData: any) {

  const validatedFields = schemaRegister.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword")
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Register.",
    };
  }

  const supabase = createClient()
  console.log(validatedFields.data)

  const { error } = await supabase.auth.signUp(validatedFields.data)
  console.log(error)

  if (error) {
    redirect('/login?message=Could not create user!')
  }
  
  redirect('/')
}

export async function emailLogin(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }
  console.log(data)
  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/login?message=Could not authenticate user')
  }


  redirect('/')
}