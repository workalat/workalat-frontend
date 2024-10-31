"use server";
import axios from "axios";
import { signIn } from "@/auth";

export async function loginWithGoogle() {
  await signIn("google");
}

export async function loginWithLinkedin() {
  await signIn("linkedin");
}

export async function verifyRecaptcha(token: string) {
  const secret  : any  = process.env.RECAPTCHA_SECRET_KEY;

  try {
    const response  : any  = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      null,
      {
        params: {
          secret,
          response: token,
        },
      }
    );

    if (response?.data?.success) {
      return true;
    } else {
      console.error("reCAPTCHA validation failed:", response?.data["error-codes"]);
      return false;
    }
  } catch (error) {
    console.error("Error verifying reCAPTCHA:", error);
    return false;
  }
}
