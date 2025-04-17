"use client";
import Features4 from "@/components/sections/features/Features4";
import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";
import React from "react";
import { useTranslations } from "@/hooks/useTranslate";
import ForgetPasswordPrimary from "@/components/sections/forget-password/ForgetPasswordPrimary";

const ForgetPasswordMain = () => {
  const t = useTranslations("common");
  
  return (
    <main>
      <HeroPrimary title={t("Reset Password")} text={t("Reset Password")} />
      <ForgetPasswordPrimary />
    </main>
  );
};

export default ForgetPasswordMain;
