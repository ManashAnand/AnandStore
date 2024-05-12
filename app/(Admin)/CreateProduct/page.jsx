"use client";
import React from 'react'

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const CreateProduct = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/Cart");
    },
  });
  return (
    <div>CreateProduct</div>
  )
}

export default CreateProduct