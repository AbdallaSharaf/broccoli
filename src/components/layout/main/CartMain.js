"use client"
import CartPrimary from "@/components/sections/cart/CartPrimary";
import Features4 from "@/components/sections/features/Features4";
import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";
import React from "react";
import { useTranslations } from "@/hooks/useTranslate";


const CartMain = () => {
  const t = useTranslations("common");
  return (
    <main>
      <HeroPrimary title={t("Cart")} text={t("Cart")} />
      <CartPrimary />
      <Features4 />
    </main>
  );
};

export default CartMain;
