"use client";
import React from "react";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import {checkout} from '@/lib/stripePayment'

const Cart = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/Cart");
    },
  });

  return (
    <>
      <button onClick={() => checkout({lineItems:[{price:"price_1PFJNFSC0eO8q1M3x6q1CYMu",quantity:1}], customerName: "John Doe", // Pass customer name
    customerEmail: "john.doe@example.com" })}>Checkout</button>
    </>
  );
};

export default Cart;
