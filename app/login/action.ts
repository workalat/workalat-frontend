"use server";
import { signIn } from "@/auth";

export async function loginWithGoogle() {
    await signIn("google");
}

export async function loginWithLinkedin() {
    await signIn("linkedin");
}
  