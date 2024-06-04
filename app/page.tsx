import db from '@/lib/db';
import { createClient } from '@/utils/supabase/server';
import { PrismaClient } from '@prisma/client';
import { redirect } from 'next/navigation';

export default async function Home() {
  const supabase = await createClient();
  const prisma = new PrismaClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(user?.email);

  if (!user) return redirect('/sign-in');

  await prisma.user.create({
    data: {
      id: user.id,
      email: user.email ?? '',
      role: 'customer',
      mailingAddress: '',
    },
  });

  // const { error } = await supabase.from('User').insert({
  //   id: user.id,
  //   email: user.email,
  //   role: 'customer',
  //   mailingAddress: '',
  // });

  // console.log(dbUser);

  return <div>Home</div>;
}
