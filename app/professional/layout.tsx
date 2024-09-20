"use client"
import { ReactNode } from 'react'

import { Navbar } from '@/components/navbar/navbar'
import { useUserContext } from '@/context/user_context'
import AuthNavbar from '@/components/navbar/auth_navbar';

export default function ProfessionalLayout(
    { children } :
    { children: ReactNode }
) {
    
    const { user } = useUserContext();
    
  return (
    <>
        {
            user ? <AuthNavbar /> : <Navbar mode="light" />
        }
        {children}
    </>
  )
}
