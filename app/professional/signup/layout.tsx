"use client"
import ProfessionalSignupForm from "./signup-form";

import { Navbar } from "@/components/navbar/navbar";
import { useTheme } from "@/context/navbar_theme";


export default function ProfessionalSignupLayout ({ children }: { children: React.ReactNode }) {
    
    const theme = useTheme()
    
  return (
    <>
        <Navbar mode={theme.theme.type} />
        <ProfessionalSignupForm />
        {children}
    </>
  )
}
