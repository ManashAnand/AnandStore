"use client";
import React, { useEffect } from 'react'

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const AdminDashboard = () => {
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
          redirect("/api/auth/signin?callbackUrl=/AdminDashboard");
        },
      });

      useEffect(() => {
            const checkAdmin = () => {
                if(session?.user?.role != "admin"){
                        redirect('/api/auth/signout?callbackUrl=/')
                }
            }
            checkAdmin();
      },[])

  return (
    <div>AdminDashboard</div>
  )
}

export default AdminDashboard