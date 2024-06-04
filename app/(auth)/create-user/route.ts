// import prisma from "@/lib/db";
// import { createClient } from "@/utils/supabase/server";
// import { NextResponse } from "next/server";

// export async function createUser() {
//   const supabase = createClient()

//   const {data : {user}} = await supabase.auth.getUser()
  

//   if (!user || user == null) {
//     throw new Error('You must log in.')
//   }

//   const dbUser = await prisma.user.findUnique({
//     where: {id: user.id}
//   })

//   if (!dbUser) {
//     const newUser = await prisma.user.create({
//       data: {
//         id: user.id,
//         email: user.email ?? "",
//         role: 'member',
//         mailingAddress: ''
//       }
//     })
//   }

// }