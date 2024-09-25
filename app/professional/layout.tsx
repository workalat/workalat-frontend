"use client"
import { ReactNode } from 'react'

import AuthNavbar from '@/components/navbar/auth_navbar';

export default function ProfessionalLayout(
  { children }:
    { children: ReactNode }
) {


  return (
    <>
      <AuthNavbar />

      {children}
    </>
  )
}
