"use client"
import React from 'react'

import { useUserContext } from '@/context/user_context'
import ClientSettings from '@/components/Settings/ClientSettings';
import ProfessionalSettingsPage from '@/components/Settings/ProfessionalSettings';

const SettingsPage = () => {
  
  const user = useUserContext().user;
  
  return (
    <>
      {
        user?.role === "client" ? (
          <ClientSettings />
        ) : (
          <ProfessionalSettingsPage />
        )
      }
    </>
  )
}

export default SettingsPage
