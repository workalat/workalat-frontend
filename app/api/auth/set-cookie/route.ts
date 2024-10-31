// app/api/auth/set-cookie/route.ts

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { token } : any = await request.json();

  // Create a response and set the HTTP-only cookie
  const response : any  = NextResponse.json({ message: "Cookie set successfully" });
  

   // Set the cookie securely with all attributes
   response.cookies.set("token", token, {
    httpOnly: true, // Set to false only for debugging if needed
    secure: true, // Use true only in production
    sameSite: "none", // or "none"
    path: "/", // Cookie is accessible throughout the site
    maxAge: 60 * 60 * 24 * 7, // 1 week expiration
  });

  return response;

}
