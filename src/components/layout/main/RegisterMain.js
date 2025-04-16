"use client";
import Features4 from "@/components/sections/features/Features4";
import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";
import RegisterPrimary from "@/components/sections/register/RegisterPrimary";
import React from "react";
import { useTranslations } from "@/hooks/useTranslate";

const RegisterMain = () => {
  const t = useTranslations("header");
  
  return (
    <main>
      <HeroPrimary title={t("register")} text={t("register")} />
      <RegisterPrimary />
      <Features4 />
    </main>
  );
};

export default RegisterMain;
