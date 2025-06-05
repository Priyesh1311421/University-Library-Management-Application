"use server";

import { hash } from "bcryptjs";
import { signIn } from "@/auth";
import { prisma } from "@/databases/db";
import { headers } from "next/headers";
import ratelimit from "../ratelimit";
import { redirect } from "next/navigation";

export const signInWithCredentials = async (
  params: Pick<AuthCredentials, "email" | "password">
) => {
  const { email, password } = params;

  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);
  if(!success) {
    redirect('/too-fast');
  }

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return { success: false, error: result.error };
    }

    return { success: true };
  } catch (error) {
    console.error("Signin error", error);
    return { success: false, error: "Signin error" };
  }
};

export const signUp = async (params: AuthCredentials) => {
    
  const { fullName, email, universityId, password, universityCard } = params;

  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);
  if(!success) {
    redirect('/too-fast');
  }


  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { success: false, error: "User already exists" };
  }

  const hashedPassword = await hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        fullName,
        email,
        universityId,
        password: hashedPassword,
        universityCard,
      },
    });

    await signInWithCredentials({ email, password });

    return { success: true };
  } catch (error) {
    console.error("Signup error", error);
    return { success: false, error: "Signup error" };
  }
};
